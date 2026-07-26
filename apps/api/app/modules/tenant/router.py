from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import DbDep
from app.modules.tenant import service
from app.modules.tenant.schemas import TenantCreate, TenantResponse, TenantUpdate

router = APIRouter(prefix="/admin/tenants", tags=["tenants"])


@router.post("", response_model=TenantResponse, status_code=201)
async def create_tenant(data: TenantCreate, db: DbDep) -> TenantResponse:
    return TenantResponse.model_validate(await service.create_tenant(db, data))


@router.get("", response_model=list[TenantResponse])
async def list_tenants(db: DbDep) -> list[TenantResponse]:
    tenants = await service.list_tenants(db)
    return [TenantResponse.model_validate(t) for t in tenants]


@router.get("/{tenant_id}", response_model=TenantResponse)
async def get_tenant(tenant_id: str, db: DbDep) -> TenantResponse:
    return TenantResponse.model_validate(await service.get_tenant(db, tenant_id))


@router.patch("/{tenant_id}", response_model=TenantResponse)
async def update_tenant(tenant_id: str, data: TenantUpdate, db: DbDep) -> TenantResponse:
    return TenantResponse.model_validate(await service.update_tenant(db, tenant_id, data))
