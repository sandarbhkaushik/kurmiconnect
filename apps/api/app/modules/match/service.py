from datetime import UTC, date, datetime

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.match import repository
from app.modules.match.models import Match
from app.modules.match.schemas import MatchMiniProfile, MatchResponse
from app.modules.profile import repository as profile_repository
from app.modules.profile.models import Profile, ProfilePreferences

Breakdown = dict[str, int]

# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

# ASSUMPTION (confirmed with Sandarbh): highest_qualification / partner_min_education
# are free text from onboarding, not enums. v1 normalizes via this fixed ladder
# using case-insensitive substring match against common phrasings; anything
# unrecognized on either side scores a neutral 5/10 rather than 0.
EDUCATION_LADDER: list[tuple[str, list[str]]] = [
    ("below_10th", ["below 10th", "no formal"]),
    ("10th", ["10th", "matric", "ssc", "high school"]),
    ("12th", ["12th", "hsc", "intermediate", "senior secondary"]),
    ("diploma", ["diploma", "iti"]),
    (
        "graduate",
        [
            "graduate", "bachelor", "b.a", "ba ", "b.sc", "bsc", "b.com", "bcom",
            "b.tech", "btech", "be ", "b.e", "bca", "llb",
        ],
    ),
    (
        "postgraduate",
        [
            "postgraduate", "post graduate", "master", "m.a", "ma ", "m.sc", "msc",
            "m.com", "mcom", "m.tech", "mtech", "mba", "mca",
        ],
    ),
    ("doctorate", ["phd", "ph.d", "doctorate", "md ", "m.d"]),
]


def _education_rank(text: str | None) -> int | None:
    if not text:
        return None
    normalized = f" {text.strip().lower()} "
    for rank, (_, keywords) in enumerate(EDUCATION_LADDER):
        if any(keyword in normalized for keyword in keywords):
            return rank
    return None


def _age(dob: date | None) -> int | None:
    if not dob:
        return None
    today = datetime.now(UTC).date()
    years = today.year - dob.year
    if (today.month, today.day) < (dob.month, dob.day):
        years -= 1
    return years


def _pref[T](prefs: ProfilePreferences | None, field: str, default: T) -> T:
    """Typed accessor for an optional ProfilePreferences row. Generic on the
    default's type so callers get back the type they asked for, no
    `# type: ignore` needed at call sites."""
    if prefs is None:
        return default
    return getattr(prefs, field, default)


def _score_community(candidate: Profile, viewer: Profile, prefs: ProfilePreferences | None) -> int:
    preferred_sub_castes: list[str] = _pref(prefs, "partner_sub_castes", [])
    other_ok = _pref(prefs, "partner_other_castes_acceptable", False)
    candidate_sub_caste = (candidate.sub_caste or "").strip().lower()
    preferred_lower = {s.strip().lower() for s in preferred_sub_castes}

    if not preferred_lower or candidate_sub_caste in preferred_lower:
        sub_caste_score = 20
    elif other_ok:
        sub_caste_score = 10
    else:
        sub_caste_score = 0

    same_gotra_ok = _pref(prefs, "partner_same_gotra_acceptable", False)
    same_gotra = bool(
        candidate.gotra
        and viewer.gotra
        and candidate.gotra.strip().lower() == viewer.gotra.strip().lower()
    )
    if same_gotra and not (viewer.same_gotra_acceptable and same_gotra_ok):
        gotra_score = 0
    else:
        gotra_score = 10

    return sub_caste_score + gotra_score


def _score_age(candidate: Profile, viewer: Profile, prefs: ProfilePreferences | None) -> int:
    candidate_age = _age(candidate.date_of_birth)
    if candidate_age is None:
        return 8  # unknown DOB — neutral half credit

    age_min = _pref(prefs, "partner_age_min", None)
    age_max = _pref(prefs, "partner_age_max", None)

    if age_min is None or age_max is None:
        viewer_age = _age(viewer.date_of_birth)
        if viewer_age is None:
            return 8
        age_min, age_max = viewer_age - 5, viewer_age + 5

    if age_min <= candidate_age <= age_max:
        return 15
    years_outside = age_min - candidate_age if candidate_age < age_min else candidate_age - age_max
    return max(0, 15 - years_outside * 3)


def _same_place(a: str | None, b: str | None) -> bool:
    return bool(a and b and a.strip().lower() == b.strip().lower())


def _score_location(candidate: Profile, viewer: Profile, prefs: ProfilePreferences | None) -> int:
    if _same_place(candidate.city, viewer.city):
        return 15
    if _same_place(candidate.district, viewer.district):
        return 12
    if _same_place(candidate.state, viewer.state):
        return 8
    preferred_states: list[str] = _pref(prefs, "partner_states", [])
    preferred_lower = {s.strip().lower() for s in preferred_states}
    if candidate.state and candidate.state.strip().lower() in preferred_lower:
        return 6
    return 3


def _score_education(candidate: Profile, prefs: ProfilePreferences | None) -> int:
    min_education = _pref(prefs, "partner_min_education", None)
    min_rank = _education_rank(min_education)
    candidate_rank = _education_rank(candidate.highest_qualification)

    if min_rank is None or candidate_rank is None:
        return 5  # unrecognized text on either side — neutral

    if candidate_rank >= min_rank:
        return 10
    return max(0, 10 - (min_rank - candidate_rank) * 3)


def _score_profession(candidate: Profile, prefs: ProfilePreferences | None) -> int:
    preferred_professions: list[str] = _pref(prefs, "partner_professions", [])
    if not preferred_professions:
        base = 7
    else:
        role_text = candidate.profession_category.value if candidate.profession_category else None
        haystack = " ".join(filter(None, [role_text, candidate.specific_role])).lower()
        matched = any(pref.strip().lower() in haystack for pref in preferred_professions)
        base = 7 if matched else 3

    min_income = _pref(prefs, "partner_min_income", None)
    if min_income is None:
        bonus = 3  # no income preference set — neutral, don't penalize
    elif candidate.annual_income is not None and candidate.annual_income >= min_income:
        bonus = 3
    else:
        bonus = 0

    return base + bonus


def _score_horoscope(candidate: Profile, prefs: ProfilePreferences | None) -> int:
    manglik_pref = _pref(prefs, "partner_manglik", "doesnt_matter")
    manglik_pref_value = getattr(manglik_pref, "value", manglik_pref)  # enum or plain string
    candidate_status = (candidate.manglik_status or "").strip().lower()

    if manglik_pref_value == "doesnt_matter" or not candidate_status:
        return 10
    if manglik_pref_value == "no_only":
        return 10 if candidate_status == "no" else 0
    if manglik_pref_value == "anshik_ok":
        return 10 if candidate_status in ("no", "anshik") else 4
    return 7  # unrecognized preference value — neutral


def _score_lifestyle(candidate: Profile, viewer: Profile, prefs: ProfilePreferences | None) -> int:
    preferred_diet: list[str] = _pref(prefs, "partner_diet", [])
    preferred_diet_lower = {d.strip().lower() for d in preferred_diet}
    candidate_diet = candidate.diet.value if candidate.diet else None
    if not preferred_diet_lower or (candidate_diet and candidate_diet in preferred_diet_lower):
        diet_score = 5
    else:
        diet_score = 0

    viewer_hobbies = set(viewer.hobbies or [])
    candidate_hobbies = set(candidate.hobbies or [])
    union = viewer_hobbies | candidate_hobbies
    overlap = len(viewer_hobbies & candidate_hobbies) / len(union) if union else 0.0
    hobby_score = round(overlap * 5)

    return diet_score + hobby_score


def compute_match_score(
    viewer_profile: Profile,
    viewer_prefs: ProfilePreferences | None,
    candidate_profile: Profile,
) -> tuple[int, Breakdown]:
    """Score how well `candidate_profile` fits `viewer_profile`'s stated
    preferences. Directional — score(A, B) != score(B, A) in general.
    Hard eligibility gates (gender, tenant, completeness) are applied by the
    caller when building the candidate set; this only scores fit quality."""
    breakdown: Breakdown = {
        "community": _score_community(candidate_profile, viewer_profile, viewer_prefs),
        "age": _score_age(candidate_profile, viewer_profile, viewer_prefs),
        "location": _score_location(candidate_profile, viewer_profile, viewer_prefs),
        "education": _score_education(candidate_profile, viewer_prefs),
        "profession": _score_profession(candidate_profile, viewer_prefs),
        "horoscope": _score_horoscope(candidate_profile, viewer_prefs),
        "lifestyle": _score_lifestyle(candidate_profile, viewer_profile, viewer_prefs),
    }
    return sum(breakdown.values()), breakdown


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------


async def generate_matches_for_user(db: AsyncSession, tenant_id: str, user_id: str) -> list[Match]:
    viewer_profile = await profile_repository.get_by_user_id(db, user_id)
    if not viewer_profile or not viewer_profile.is_complete:
        return []

    viewer_prefs = await profile_repository.get_preferences(db, viewer_profile.id)
    candidates = await repository.get_candidate_profiles(db, viewer_profile)

    results: list[Match] = []
    for candidate in candidates:
        candidate_prefs = await profile_repository.get_preferences(db, candidate.id)

        score_v2c, breakdown_v2c = compute_match_score(viewer_profile, viewer_prefs, candidate)
        score_c2v, breakdown_c2v = compute_match_score(candidate, candidate_prefs, viewer_profile)
        final_score = min(score_v2c, score_c2v)

        user_a_id, user_b_id = repository.canonical_pair(viewer_profile.user_id, candidate.user_id)
        if viewer_profile.user_id == user_a_id:
            breakdown = {"a_to_b": breakdown_v2c, "b_to_a": breakdown_c2v}
        else:
            breakdown = {"a_to_b": breakdown_c2v, "b_to_a": breakdown_v2c}

        match = await repository.upsert_match(
            db, tenant_id, user_a_id, user_b_id, final_score, breakdown
        )
        results.append(match)

    return results


# ---------------------------------------------------------------------------
# Read / action side (used by router.py)
# ---------------------------------------------------------------------------


def _other_user_id(match: Match, user_id: str) -> str:
    return match.user_b_id if match.user_a_id == user_id else match.user_a_id


def _is_viewed(match: Match, user_id: str) -> bool:
    return match.viewed_by_a if match.user_a_id == user_id else match.viewed_by_b


def _is_shortlisted(match: Match, user_id: str) -> bool:
    return match.shortlisted_by_a if match.user_a_id == user_id else match.shortlisted_by_b


async def _build_mini_profile(db: AsyncSession, user_id: str) -> MatchMiniProfile | None:
    profile = await profile_repository.get_by_user_id(db, user_id)
    if not profile:
        return None
    photos = await profile_repository.list_photos(db, profile.id)
    main_photo = next((p for p in photos if p.is_main), photos[0] if photos else None)
    return MatchMiniProfile(
        profile_id=profile.id,
        user_id=profile.user_id,
        first_name=profile.first_name,
        age=_age(profile.date_of_birth),
        city=profile.city,
        sub_caste=profile.sub_caste,
        profession_category=profile.profession_category,
        highest_qualification=profile.highest_qualification,
        main_photo_url=main_photo.url_thumb if main_photo else None,
    )


async def _to_response(db: AsyncSession, match: Match, user_id: str) -> MatchResponse | None:
    other_user_id = _other_user_id(match, user_id)
    mini_profile = await _build_mini_profile(db, other_user_id)
    if mini_profile is None:
        return None
    return MatchResponse(
        match_id=match.id,
        profile=mini_profile,
        match_score=match.match_score,
        score_breakdown=match.score_breakdown,
        is_viewed=_is_viewed(match, user_id),
        is_shortlisted=_is_shortlisted(match, user_id),
        generated_at=match.generated_at,
    )


async def get_todays_matches(
    db: AsyncSession, user_id: str, limit: int = 20
) -> list[MatchResponse]:
    matches = await repository.get_todays_matches(db, user_id, limit)
    responses = [await _to_response(db, m, user_id) for m in matches]
    return [r for r in responses if r is not None]


async def get_shortlist(db: AsyncSession, user_id: str) -> list[MatchResponse]:
    matches = await repository.get_shortlisted(db, user_id)
    responses = [await _to_response(db, m, user_id) for m in matches]
    return [r for r in responses if r is not None]


def _not_found() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail={"error": {"code": "MATCH_NOT_FOUND", "message": "Match not found"}},
    )


async def _get_owned_match(db: AsyncSession, match_id: str, user_id: str) -> Match:
    match = await repository.get_by_id(db, match_id)
    if not match or user_id not in (match.user_a_id, match.user_b_id):
        raise _not_found()
    return match


async def view_match(db: AsyncSession, match_id: str, user_id: str) -> MatchResponse:
    match = await _get_owned_match(db, match_id, user_id)
    match = await repository.mark_viewed(db, match, user_id)
    response = await _to_response(db, match, user_id)
    if response is None:
        raise _not_found()
    return response


async def set_shortlisted(
    db: AsyncSession, match_id: str, user_id: str, value: bool
) -> MatchResponse:
    match = await _get_owned_match(db, match_id, user_id)
    match = await repository.mark_shortlisted(db, match, user_id, value)
    response = await _to_response(db, match, user_id)
    if response is None:
        raise _not_found()
    return response
