from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.models import User, UserSession


async def get_by_phone(db: AsyncSession, phone: str) -> User | None:
    result = await db.execute(select(User).where(User.phone == phone))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create(db: AsyncSession, tenant_id: str, phone: str, password_hash: str, profile_for: str) -> User:
    user = User(
        tenant_id=tenant_id,
        phone=phone,
        password_hash=password_hash,
        profile_for=profile_for,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def update(db: AsyncSession, user: User, **fields: object) -> User:
    for field, value in fields.items():
        setattr(user, field, value)
    await db.flush()
    await db.refresh(user)
    return user


async def create_session(
    db: AsyncSession, tenant_id: str, user_id: str, refresh_token_hash: str, expires_at: datetime
) -> UserSession:
    session = UserSession(
        tenant_id=tenant_id,
        user_id=user_id,
        refresh_token_hash=refresh_token_hash,
        expires_at=expires_at,
    )
    db.add(session)
    await db.flush()
    await db.refresh(session)
    return session


async def get_session_by_refresh_hash(db: AsyncSession, refresh_token_hash: str) -> UserSession | None:
    result = await db.execute(
        select(UserSession).where(UserSession.refresh_token_hash == refresh_token_hash)
    )
    return result.scalar_one_or_none()


async def revoke_session(db: AsyncSession, session: UserSession, revoked_at: datetime) -> UserSession:
    session.revoked_at = revoked_at
    await db.flush()
    await db.refresh(session)
    return session
