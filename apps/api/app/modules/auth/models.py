import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import TenantBase


class UserRole(str, enum.Enum):
    user = "user"
    moderator = "moderator"
    editor = "editor"
    admin = "admin"
    super_admin = "super_admin"


class UserStatus(str, enum.Enum):
    active = "active"
    suspended = "suspended"
    deleted = "deleted"
    pending = "pending"


class ProfileFor(str, enum.Enum):
    self_ = "self"
    son = "son"
    daughter = "daughter"
    brother = "brother"
    sister = "sister"
    relative = "relative"


class User(TenantBase):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("tenant_id", "phone", name="uq_users_tenant_phone"),)

    phone: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    firebase_uid: Mapped[str | None] = mapped_column(String(128), unique=True, nullable=True)
    profile_for: Mapped[ProfileFor] = mapped_column(
        Enum(ProfileFor), default=ProfileFor.self_, nullable=False
    )
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.user, nullable=False)
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus), default=UserStatus.pending, nullable=False
    )
    language_pref: Mapped[str] = mapped_column(String(5), default="hi")
    fcm_token: Mapped[str | None] = mapped_column(String(255), nullable=True)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class UserSession(TenantBase):
    __tablename__ = "user_sessions"

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, index=True
    )
    refresh_token_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
