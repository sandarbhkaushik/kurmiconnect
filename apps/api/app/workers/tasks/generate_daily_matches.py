from typing import Any

from app.core.db import async_session_factory
from app.core.logging import logger
from app.core.tenant import current_tenant_id
from app.modules.auth import repository as auth_repository
from app.modules.match.service import generate_matches_for_user


async def generate_daily_matches(ctx: dict[str, Any]) -> dict[str, int]:
    """Daily cron (see app/workers/main.py) — regenerates matches for every
    active user in every tenant. Runs one user per DB transaction so a
    failure on one user's data can't roll back or block anyone else's, and
    so no single transaction holds locks for the whole run."""
    users_processed = 0
    matches_generated = 0
    errors = 0

    async with async_session_factory() as db:
        active_users = await auth_repository.list_active_user_ids(db)

    logger.info("daily_match_generation.start", user_count=len(active_users))

    for tenant_id, user_id in active_users:
        token = current_tenant_id.set(tenant_id)
        try:
            async with async_session_factory() as db:
                matches = await generate_matches_for_user(db, tenant_id, user_id)
                await db.commit()
            matches_generated += len(matches)
            users_processed += 1
        except Exception:
            errors += 1
            logger.exception(
                "daily_match_generation.user_failed", tenant_id=tenant_id, user_id=user_id
            )
        finally:
            current_tenant_id.reset(token)

    logger.info(
        "daily_match_generation.done",
        users_processed=users_processed,
        matches_generated=matches_generated,
        errors=errors,
    )
    return {
        "users_processed": users_processed,
        "matches_generated": matches_generated,
        "errors": errors,
    }
