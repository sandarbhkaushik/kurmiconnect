import random
from datetime import date

import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.core.db import async_session_factory
from app.main import app
from app.modules.match.models import Match
from app.modules.match.repository import canonical_pair
from app.modules.match.service import compute_match_score, generate_matches_for_user
from app.modules.profile.models import (
    Diet,
    Gender,
    MaritalStatus,
    PartnerManglik,
    ProfessionCategory,
    Profile,
    ProfilePreferences,
)

TENANT_HEADERS = {"X-Tenant-Id": "kurmi"}
PASSWORD = "Passw0rd"


def _unique_phone() -> str:
    first = random.choice("6789")
    rest = "".join(str(random.randint(0, 9)) for _ in range(9))
    return f"+91{first}{rest}"


def _unique_subdomain() -> str:
    return "t" + "".join(str(random.randint(0, 9)) for _ in range(10))


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


async def _register_and_login(
    client: AsyncClient, tenant_headers: dict[str, str] = TENANT_HEADERS
) -> tuple[dict[str, str], str]:
    phone = _unique_phone()
    resp = await client.post(
        "/v1/auth/register",
        json={"phone": phone, "password": PASSWORD, "profile_for": "self"},
        headers=tenant_headers,
    )
    assert resp.status_code == 201, resp.text
    user_id = resp.json()["id"]
    resp = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=tenant_headers
    )
    assert resp.status_code == 200, resp.text
    token = resp.json()["access_token"]
    return {**tenant_headers, "Authorization": f"Bearer {token}"}, user_id


async def _complete_profile(
    user_id: str,
    tenant_id: str,
    *,
    gender: Gender,
    sub_caste: str = "Patel",
    gotra: str = "Kashyap",
    same_gotra_acceptable: bool = False,
    dob: date = date(1996, 1, 1),
    city: str = "Lucknow",
    highest_qualification: str = "Graduate",
    profession_category: ProfessionCategory = ProfessionCategory.private,
    diet: Diet = Diet.veg,
    manglik_status: str = "no",
) -> str:
    """Profile completeness and several match-relevant fields (is_complete,
    manglik_status, gotra) have no PATCH endpoint yet in profile/router.py —
    onboarding-completion wiring is a later session. Tests build the row
    directly, same approach as scripts/seed_test_profiles.py."""
    async with async_session_factory() as session:
        profile = Profile(
            tenant_id=tenant_id,
            user_id=user_id,
            first_name="Test",
            last_name=sub_caste,
            gender=gender,
            date_of_birth=dob,
            marital_status=MaritalStatus.never_married,
            height_cm=165,
            sub_caste=sub_caste,
            gotra=gotra,
            same_gotra_acceptable=same_gotra_acceptable,
            mother_tongue="Hindi",
            state="Uttar Pradesh",
            district=city,
            city=city,
            highest_qualification=highest_qualification,
            profession_category=profession_category,
            specific_role="Engineer",
            diet=diet,
            hobbies=["reading"],
            manglik_status=manglik_status,
            is_complete=True,
        )
        session.add(profile)
        await session.commit()
        return profile.id


async def _set_preferences(profile_id: str, tenant_id: str, **kwargs: object) -> None:
    async with async_session_factory() as session:
        session.add(ProfilePreferences(tenant_id=tenant_id, profile_id=profile_id, **kwargs))
        await session.commit()


async def _generate(tenant_id: str, user_id: str) -> list[Match]:
    async with async_session_factory() as session:
        matches = await generate_matches_for_user(session, tenant_id, user_id)
        await session.commit()
        return matches


# ---------------------------------------------------------------------------
# Algorithm unit tests — no DB, no HTTP
# ---------------------------------------------------------------------------


def _profile(**overrides: object) -> Profile:
    defaults: dict[str, object] = dict(
        tenant_id="t1",
        user_id="u1",
        gender=Gender.male,
        date_of_birth=date(1996, 1, 1),
        sub_caste="Patel",
        gotra="Kashyap",
        same_gotra_acceptable=False,
        city="Lucknow",
        district="Lucknow",
        state="Uttar Pradesh",
        highest_qualification="Graduate",
        profession_category=ProfessionCategory.private,
        specific_role="Engineer",
        annual_income=500_000,
        diet=Diet.veg,
        manglik_status="no",
        hobbies=[],
    )
    defaults.update(overrides)
    return Profile(**defaults)


def _prefs(**overrides: object) -> ProfilePreferences:
    # Column `default=list`/`default=...` only applies on flush/INSERT — an
    # unpersisted instance (as used in these pure unit tests) reads unset
    # attributes back as None, not the model's real default. Set them
    # explicitly here so these fixtures match what a DB-loaded row actually
    # looks like (never None for these columns in production).
    defaults: dict[str, object] = dict(
        tenant_id="t1",
        profile_id="p1",
        partner_marital_status=[],
        partner_manglik=PartnerManglik.doesnt_matter,
        partner_diet=[],
        partner_sub_castes=[],
        partner_same_gotra_acceptable=False,
        partner_other_castes_acceptable=False,
        partner_states=[],
        partner_languages=[],
        partner_professions=[],
        partner_want_working_professional=False,
    )
    defaults.update(overrides)
    return ProfilePreferences(**defaults)


def test_compute_match_score_is_bounded_and_breakdown_sums_to_score() -> None:
    viewer = _profile()
    candidate = _profile(user_id="u2", gender=Gender.female)
    score, breakdown = compute_match_score(viewer, _prefs(), candidate)
    assert 0 <= score <= 100
    assert sum(breakdown.values()) == score
    assert set(breakdown) == {
        "community", "age", "location", "education", "profession", "horoscope", "lifestyle",
    }


def test_compute_match_score_same_gotra_blocked_by_default() -> None:
    viewer = _profile(gotra="Kashyap", same_gotra_acceptable=False)
    prefs = _prefs(partner_same_gotra_acceptable=False)

    candidate = _profile(user_id="u2", gender=Gender.female, gotra="Kashyap")
    _, blocked = compute_match_score(viewer, prefs, candidate)

    candidate_other_gotra = _profile(user_id="u3", gender=Gender.female, gotra="Bhardwaj")
    _, allowed = compute_match_score(viewer, prefs, candidate_other_gotra)

    # Same-gotra pair loses exactly the 10 gotra points vs. an otherwise
    # identical different-gotra candidate; sub-caste portion is unaffected.
    assert blocked["community"] == allowed["community"] - 10


def test_compute_match_score_same_gotra_allowed_when_both_sides_opt_in() -> None:
    viewer = _profile(gotra="Kashyap", same_gotra_acceptable=True)
    candidate = _profile(user_id="u2", gender=Gender.female, gotra="Kashyap")
    _, breakdown = compute_match_score(
        viewer, _prefs(partner_same_gotra_acceptable=True), candidate
    )
    assert breakdown["community"] == 30  # full sub-caste + gotra credit


def test_compute_match_score_no_preferences_row_uses_neutral_defaults() -> None:
    viewer = _profile()
    candidate = _profile(user_id="u2", gender=Gender.female)
    score, _ = compute_match_score(viewer, None, candidate)
    assert 0 <= score <= 100  # doesn't raise, doesn't blow up the range


def test_compute_match_score_unrecognized_education_text_is_neutral() -> None:
    viewer = _profile()
    candidate = _profile(user_id="u2", gender=Gender.female, highest_qualification="???")
    _, breakdown = compute_match_score(
        viewer, _prefs(partner_min_education="Graduate"), candidate
    )
    assert breakdown["education"] == 5


def test_canonical_pair_is_order_independent() -> None:
    assert canonical_pair("u2", "u1") == canonical_pair("u1", "u2") == ("u1", "u2")


# ---------------------------------------------------------------------------
# Endpoint integration tests — real DB, real HTTP
# ---------------------------------------------------------------------------


async def test_todays_matches_ranked_by_score_desc(client: AsyncClient) -> None:
    viewer_headers, viewer_id = await _register_and_login(client)
    viewer_profile_id = await _complete_profile(
        viewer_id, "kurmi", gender=Gender.male, sub_caste="Patel"
    )
    await _set_preferences(
        viewer_profile_id,
        "kurmi",
        partner_sub_castes=["Patel"],
        partner_other_castes_acceptable=False,
    )

    _, strong_id = await _register_and_login(client)
    await _complete_profile(
        strong_id, "kurmi", gender=Gender.female, sub_caste="Patel", city="Lucknow"
    )

    _, weak_id = await _register_and_login(client)
    await _complete_profile(
        weak_id, "kurmi", gender=Gender.female, sub_caste="Verma", city="Kanpur Nagar"
    )

    await _generate("kurmi", viewer_id)

    # This DB is shared with scripts/seed_test_profiles.py's 24 rows and
    # whatever other tests in this run created — the candidate pool isn't
    # exclusive to this test. limit=50 comfortably covers it; identify our
    # two candidates by user_id rather than assuming an exact result count.
    resp = await client.get(
        "/v1/matches/today", params={"limit": 50}, headers=viewer_headers
    )
    assert resp.status_code == 200, resp.text
    results = resp.json()
    assert all(
        results[i]["match_score"] >= results[i + 1]["match_score"]
        for i in range(len(results) - 1)
    )

    by_user_id = {m["profile"]["user_id"]: m for m in results}
    assert strong_id in by_user_id
    assert weak_id in by_user_id
    strong_match, weak_match = by_user_id[strong_id], by_user_id[weak_id]
    assert strong_match["profile"]["sub_caste"] == "Patel"
    assert weak_match["profile"]["sub_caste"] == "Verma"
    # Same sub-caste (viewer's only preference) scores strictly higher.
    assert strong_match["match_score"] > weak_match["match_score"]


async def test_view_and_shortlist_lifecycle(client: AsyncClient) -> None:
    viewer_headers, viewer_id = await _register_and_login(client)
    await _complete_profile(viewer_id, "kurmi", gender=Gender.male)
    _, candidate_id = await _register_and_login(client)
    await _complete_profile(candidate_id, "kurmi", gender=Gender.female)

    matches = await _generate("kurmi", viewer_id)
    match_id = matches[0].id

    resp = await client.post(f"/v1/matches/{match_id}/view", headers=viewer_headers)
    assert resp.status_code == 200
    assert resp.json()["is_viewed"] is True

    resp = await client.post(f"/v1/matches/{match_id}/shortlist", headers=viewer_headers)
    assert resp.status_code == 200
    assert resp.json()["is_shortlisted"] is True

    resp = await client.get("/v1/matches/shortlist", headers=viewer_headers)
    assert resp.status_code == 200
    assert [m["match_id"] for m in resp.json()] == [match_id]

    resp = await client.delete(f"/v1/matches/{match_id}/shortlist", headers=viewer_headers)
    assert resp.status_code == 200
    assert resp.json()["is_shortlisted"] is False

    resp = await client.get("/v1/matches/shortlist", headers=viewer_headers)
    assert resp.json() == []


async def test_action_on_someone_elses_match_returns_404(client: AsyncClient) -> None:
    viewer_headers, viewer_id = await _register_and_login(client)
    await _complete_profile(viewer_id, "kurmi", gender=Gender.male)
    _, candidate_id = await _register_and_login(client)
    await _complete_profile(candidate_id, "kurmi", gender=Gender.female)
    matches = await _generate("kurmi", viewer_id)
    match_id = matches[0].id

    outsider_headers, _ = await _register_and_login(client)
    resp = await client.post(f"/v1/matches/{match_id}/view", headers=outsider_headers)
    assert resp.status_code == 404


async def test_incomplete_profile_is_not_a_candidate(client: AsyncClient) -> None:
    viewer_headers, viewer_id = await _register_and_login(client)
    await _complete_profile(viewer_id, "kurmi", gender=Gender.male)

    _, incomplete_id = await _register_and_login(client)
    async with async_session_factory() as session:
        session.add(
            Profile(
                tenant_id="kurmi",
                user_id=incomplete_id,
                gender=Gender.female,
                is_complete=False,  # never finished onboarding
            )
        )
        await session.commit()

    # Shared DB (seed data + other tests) means the viewer legitimately
    # matches other complete profiles — assert the incomplete one specifically
    # never appears, rather than asserting an empty result set.
    matches = await _generate("kurmi", viewer_id)
    matched_user_ids = {m.user_a_id for m in matches} | {m.user_b_id for m in matches}
    assert incomplete_id not in matched_user_ids


async def test_tenant_isolation_matches_not_visible_across_tenants(client: AsyncClient) -> None:
    other_tenant = {"X-Tenant-Id": _unique_subdomain()}
    await client.post(
        "/v1/admin/tenants",
        json={
            "name": "Other Tenant",
            "subdomain": other_tenant["X-Tenant-Id"],
            "app_name": "OtherApp",
        },
    )

    viewer_headers, viewer_id = await _register_and_login(client)
    await _complete_profile(viewer_id, "kurmi", gender=Gender.male)
    _, candidate_id = await _register_and_login(client)
    await _complete_profile(candidate_id, "kurmi", gender=Gender.female)
    await _generate("kurmi", viewer_id)

    other_headers, _ = await _register_and_login(client, other_tenant)
    resp = await client.get("/v1/matches/today", headers=other_headers)
    assert resp.status_code == 200
    assert resp.json() == []
