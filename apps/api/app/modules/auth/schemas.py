import re
from datetime import datetime

from pydantic import BaseModel, Field, field_validator

from app.modules.auth.models import ProfileFor, UserRole, UserStatus


PHONE_PATTERN = r"^\+91[6-9]\d{9}$"


def _validate_password_strength(password: str) -> str:
    if not re.search(r"[A-Za-z]", password) or not re.search(r"\d", password):
        raise ValueError("Password must contain at least one letter and one number")
    return password


class RegisterRequest(BaseModel):
    phone: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=8)
    profile_for: ProfileFor = ProfileFor.self_

    _validate_password = field_validator("password")(_validate_password_strength)


class LoginRequest(BaseModel):
    phone: str = Field(..., pattern=PHONE_PATTERN)
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: str
    tenant_id: str
    phone: str
    profile_for: ProfileFor
    role: UserRole
    status: UserStatus
    language_pref: str
    fcm_token: str | None
    last_login_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class AccessTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
