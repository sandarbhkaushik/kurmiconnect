from datetime import UTC, datetime

from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.match.models import Match
from app.modules.profile.models import Gender, Profile


def _now() -> datetime:
    return datetime.now(UTC)


def canonical_pair(user_1_id: str, user_2_id: str) -> tuple[str, str]:
    """Two user ids, in the (user_a_id, user_b_id) order matches are stored in."""
    return (user_1_id, user_2_id) if user_1_id < user_2_id else (user_2_id, user_1_id)


async def get_pair(db: AsyncSession, user_a_id: str, user_b_id: str) -> Match | None:
    result = await db.execute(
        select(Match).where(Match.user_a_id == user_a_id, Match.user_b_id == user_b_id)
    )
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, match_id: str) -> Match | None:
    result = await db.execute(select(Match).where(Match.id == match_id))
    return result.scalar_one_or_none()


async def upsert_match(
    db: AsyncSession,
    tenant_id: str,
    user_a_id: str,
    user_b_id: str,
    score: int,
    breakdown: dict[str, dict[str, int]],
) -> Match:
    """Create a match row, or refresh score/breakdown on an existing pair.
    Regeneration never resets viewed/shortlisted flags — those reflect user
    action, not the freshness of the score."""
    existing = await get_pair(db, user_a_id, user_b_id)
    if existing:
        existing.match_score = score
        existing.score_breakdown = breakdown
        existing.generated_at = _now()
        await db.flush()
        await db.refresh(existing)
        return existing

    match = Match(
        tenant_id=tenant_id,
        user_a_id=user_a_id,
        user_b_id=user_b_id,
        match_score=score,
        score_breakdown=breakdown,
        generated_at=_now(),
    )
    db.add(match)
    await db.flush()
    await db.refresh(match)
    return match


async def get_todays_matches(db: AsyncSession, user_id: str, limit: int = 20) -> list[Match]:
    result = await db.execute(
        select(Match)
        .where(or_(Match.user_a_id == user_id, Match.user_b_id == user_id))
        .order_by(Match.match_score.desc(), Match.generated_at.desc())
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_shortlisted(db: AsyncSession, user_id: str) -> list[Match]:
    result = await db.execute(
        select(Match)
        .where(
            or_(
                and_(Match.user_a_id == user_id, Match.shortlisted_by_a.is_(True)),
                and_(Match.user_b_id == user_id, Match.shortlisted_by_b.is_(True)),
            )
        )
        .order_by(Match.match_score.desc())
    )
    return list(result.scalars().all())


async def mark_viewed(db: AsyncSession, match: Match, user_id: str) -> Match:
    if match.user_a_id == user_id:
        match.viewed_by_a = True
    else:
        match.viewed_by_b = True
    await db.flush()
    await db.refresh(match)
    return match


async def mark_shortlisted(db: AsyncSession, match: Match, user_id: str, value: bool) -> Match:
    if match.user_a_id == user_id:
        match.shortlisted_by_a = value
    else:
        match.shortlisted_by_b = value
    await db.flush()
    await db.refresh(match)
    return match


async def get_candidate_profiles(
    db: AsyncSession, viewer_profile: Profile, limit: int = 200
) -> list[Profile]:
    """Opposite-gender, complete profiles in the same tenant, excluding the
    viewer. Hard preference gates (age/height range) are applied in
    service.py against this candidate set — kept here as a single, simple,
    index-friendly query rather than folding every preference into SQL."""
    opposite = Gender.female if viewer_profile.gender == Gender.male else Gender.male
    result = await db.execute(
        select(Profile)
        .where(
            Profile.gender == opposite,
            Profile.is_complete.is_(True),
            Profile.id != viewer_profile.id,
        )
        .limit(limit)
    )
    return list(result.scalars().all())
