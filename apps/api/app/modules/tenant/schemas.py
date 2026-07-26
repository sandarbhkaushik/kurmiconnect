from datetime import datetime

from pydantic import BaseModel, Field

from app.modules.tenant.models import LaunchState


class TenantCreate(BaseModel):
    name: str = Field(..., max_length=120)
    subdomain: str = Field(..., max_length=63, pattern=r"^[a-z0-9-]+$")
    app_name: str = Field(..., max_length=120)
    logo_url: str | None = None
    primary_color: str = "#B7531A"
    accent_color: str = "#7C2D12"
    default_language: str = "hi"
    support_phone: str | None = None
    support_whatsapp: str | None = None
    feature_flags: dict = Field(default_factory=dict)  # type: ignore[type-arg]


class TenantUpdate(BaseModel):
    name: str | None = None
    app_name: str | None = None
    logo_url: str | None = None
    primary_color: str | None = None
    accent_color: str | None = None
    default_language: str | None = None
    support_phone: str | None = None
    support_whatsapp: str | None = None
    launch_state: LaunchState | None = None
    feature_flags: dict | None = None  # type: ignore[type-arg]


class TenantResponse(BaseModel):
    id: str
    name: str
    subdomain: str
    app_name: str
    logo_url: str | None
    primary_color: str
    accent_color: str
    default_language: str
    support_phone: str | None
    support_whatsapp: str | None
    launch_state: LaunchState
    feature_flags: dict  # type: ignore[type-arg]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
