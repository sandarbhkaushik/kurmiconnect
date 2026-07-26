from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.tenant.models import Tenant
from app.modules.tenant.schemas import TenantCreate, TenantUpdate


async def get_by_id(db: AsyncSession, tenant_id: str) -> Tenant | None:
    result = await db.execute(select(Tenant).where(Tenant.id == tenant_id))
    return result.scalar_one_or_none()


async def get_by_subdomain(db: AsyncSession, subdomain: str) -> Tenant | None:
    result = await db.execute(select(Tenant).where(Tenant.subdomain == subdomain))
    return result.scalar_one_or_none()


async def create(db: AsyncSession, data: TenantCreate) -> Tenant:
    tenant = Tenant(**data.model_dump())
    db.add(tenant)
    await db.flush()
    await db.refresh(tenant)
    return tenant


async def update(db: AsyncSession, tenant: Tenant, data: TenantUpdate) -> Tenant:
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(tenant, field, value)
    await db.flush()
    await db.refresh(tenant)
    return tenant


async def list_all(db: AsyncSession) -> list[Tenant]:
    result = await db.execute(select(Tenant).order_by(Tenant.created_at))
    return list(result.scalars().all())
