import hashlib
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_jwt,
    create_refresh_token,
    decode_jwt,
    hash_password,
    verify_password,
)
from app.modules.auth import repository
from app.modules.auth.models import User
from app.modules.auth.schemas import LoginRequest, RegisterRequest


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


async def register(db: AsyncSession, tenant_id: str, data: RegisterRequest) -> User:
    existing = await repository.get_by_phone(db, data.phone)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"error": {"code": "PHONE_TAKEN", "message": "Phone already registered"}},
        )
    password_hash = hash_password(data.password)
    return await repository.create(db, tenant_id, data.phone, password_hash, data.profile_for)


async def login(db: AsyncSession, tenant_id: str, data: LoginRequest) -> tuple[str, str, User]:
    user = await repository.get_by_phone(db, data.phone)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "INVALID_CREDENTIALS", "message": "Invalid phone or password"}},
        )

    access_token = create_jwt(user.id, tenant_id)
    refresh_token = create_refresh_token(user.id, tenant_id)
    await repository.create_session(
        db,
        tenant_id,
        user.id,
        _hash_token(refresh_token),
        datetime.now(timezone.utc) + timedelta(days=30),
    )
    await repository.update(db, user, last_login_at=datetime.now(timezone.utc))
    return access_token, refresh_token, user


async def refresh_access_token(db: AsyncSession, tenant_id: str, refresh_token: str) -> str:
    try:
        payload = decode_jwt(refresh_token)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "INVALID_TOKEN", "message": "Invalid refresh token"}},
        )
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "INVALID_TOKEN", "message": "Invalid refresh token"}},
        )

    session = await repository.get_session_by_refresh_hash(db, _hash_token(refresh_token))
    if (
        not session
        or session.revoked_at is not None
        or session.expires_at < datetime.now(timezone.utc)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "INVALID_TOKEN", "message": "Refresh token expired or revoked"}},
        )

    return create_jwt(str(payload["sub"]), tenant_id)


async def logout(db: AsyncSession, refresh_token: str) -> None:
    session = await repository.get_session_by_refresh_hash(db, _hash_token(refresh_token))
    if session and session.revoked_at is None:
        await repository.revoke_session(db, session, datetime.now(timezone.utc))


async def get_user(db: AsyncSession, user_id: str) -> User:
    user = await repository.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": {"code": "USER_NOT_FOUND", "message": "User not found"}},
        )
    return user
