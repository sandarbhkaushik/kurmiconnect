from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.tenant import repository
from app.modules.tenant.models import Tenant
from app.modules.tenant.schemas import TenantCreate, TenantUpdate


async def create_tenant(db: AsyncSession, data: TenantCreate) -> Tenant:
    existing = await repository.get_by_subdomain(db, data.subdomain)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"error": {"code": "SUBDOMAIN_TAKEN", "message": "Subdomain already exists"}},
        )
    return await repository.create(db, data)


async def get_tenant(db: AsyncSession, tenant_id: str) -> Tenant:
    tenant = await repository.get_by_id(db, tenant_id)
    if not tenant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": {"code": "TENANT_NOT_FOUND", "message": "Tenant not found"}},
        )
    return tenant


async def update_tenant(db: AsyncSession, tenant_id: str, data: TenantUpdate) -> Tenant:
    tenant = await get_tenant(db, tenant_id)
    return await repository.update(db, tenant, data)


async def list_tenants(db: AsyncSession) -> list[Tenant]:
    return await repository.list_all(db)
