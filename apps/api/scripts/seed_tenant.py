"""Run once after `alembic upgrade head` to seed the default kurmi tenant."""
import asyncio

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import settings
from app.modules.tenant.models import LaunchState, Tenant


async def seed() -> None:
    engine = create_async_engine(settings.DATABASE_URL)
    factory = async_sessionmaker(engine, expire_on_commit=False)

    async with factory() as session:
        tenant = Tenant(
            name="KurmiConnect",
            subdomain="kurmi",
            app_name="KurmiConnect",
            primary_color="#B7531A",
            accent_color="#7C2D12",
            default_language="hi",
            launch_state=LaunchState.active,
        )
        session.add(tenant)
        await session.commit()
        print(f"Seeded tenant: {tenant.id} ({tenant.subdomain})")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
