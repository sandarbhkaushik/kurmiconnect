from fastapi import APIRouter, status

from app.core.deps import CurrentUserDep, DbDep, TenantDep
from app.modules.auth import service
from app.modules.auth.schemas import (
    AccessTokenResponse,
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RegisterRequest,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: DbDep, tenant_id: TenantDep) -> UserResponse:
    user = await service.register(db, tenant_id, data)
    return UserResponse.model_validate(user)


@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest, db: DbDep, tenant_id: TenantDep) -> LoginResponse:
    access_token, refresh_token, user = await service.login(db, tenant_id, data)
    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user),
    )


@router.post("/refresh", response_model=AccessTokenResponse)
async def refresh(data: RefreshRequest, db: DbDep, tenant_id: TenantDep) -> AccessTokenResponse:
    access_token = await service.refresh_access_token(db, tenant_id, data.refresh_token)
    return AccessTokenResponse(access_token=access_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(data: RefreshRequest, db: DbDep, _user_id: CurrentUserDep) -> None:
    await service.logout(db, data.refresh_token)


@router.get("/me", response_model=UserResponse)
async def me(db: DbDep, user_id: CurrentUserDep) -> UserResponse:
    user = await service.get_user(db, user_id)
    return UserResponse.model_validate(user)
