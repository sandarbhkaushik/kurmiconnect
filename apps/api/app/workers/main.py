from typing import Any

from arq import cron
from arq.connections import RedisSettings

from app.core.config import settings
from app.core.logging import setup_logging
from app.workers.tasks.generate_daily_matches import generate_daily_matches


async def startup(ctx: dict[str, Any]) -> None:
    setup_logging()


class WorkerSettings:
    functions = [generate_daily_matches]
    cron_jobs = [
        # 23:30 UTC == 05:00 IST (UTC+5:30) the next day. ASSUMPTION: the
        # worker process's clock is UTC (true for the Docker base images
        # used elsewhere in this repo) — if that ever changes, this needs
        # to change with it.
        cron(generate_daily_matches, hour=23, minute=30),
    ]
    redis_settings = RedisSettings.from_dsn(settings.REDIS_URL)
    on_startup = startup

    # Run in dev commands:
    #   cd apps/api && arq app.workers.main.WorkerSettings
