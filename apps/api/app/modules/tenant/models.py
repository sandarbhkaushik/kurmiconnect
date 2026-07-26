import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Enum, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base


def _uuid4() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class LaunchState(str, enum.Enum):
    draft = "draft"
    active = "active"
    suspended = "suspended"


class Tenant(Base):
    __tablename__ = "tenants"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid4)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    subdomain: Mapped[str] = mapped_column(String(63), unique=True, nullable=False, index=True)
    app_name: Mapped[str] = mapped_column(String(120), nullable=False)
    logo_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    primary_color: Mapped[str] = mapped_column(String(7), default="#B7531A")
    accent_color: Mapped[str] = mapped_column(String(7), default="#7C2D12")
    default_language: Mapped[str] = mapped_column(String(5), default="hi")
    support_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    support_whatsapp: Mapped[str | None] = mapped_column(String(20), nullable=True)
    launch_state: Mapped[LaunchState] = mapped_column(
        Enum(LaunchState), default=LaunchState.draft, nullable=False
    )
    feature_flags: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now
    )
