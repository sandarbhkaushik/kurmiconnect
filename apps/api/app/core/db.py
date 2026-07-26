from collections.abc import AsyncGenerator
from datetime import datetime, timezone
import uuid

from sqlalchemy import DateTime, String, event
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from app.core.config import settings


engine = create_async_engine(settings.DATABASE_URL, echo=settings.ENVIRONMENT == "dev")
async_session_factory = async_sessionmaker(engine, expire_on_commit=False)


def _uuid7() -> str:
    return str(uuid.uuid4())  # uuid7 lib not installed — uuid4 is fine for now


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Base(DeclarativeBase):
    pass


class TenantBase(Base):
    """Base for all models that belong to a tenant (every table except tenants)."""

    __abstract__ = True

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid7)
    tenant_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now
    )
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
