from contextvars import ContextVar
from typing import Any

from sqlalchemy import event
from sqlalchemy.orm import Session
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

from app.core.config import settings


current_tenant_id: ContextVar[str | None] = ContextVar("current_tenant_id", default=None)


class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        tenant_id = _resolve_tenant(request)
        token = current_tenant_id.set(tenant_id)
        try:
            return await call_next(request)
        finally:
            current_tenant_id.reset(token)


def _resolve_tenant(request: Request) -> str:
    if header := request.headers.get("X-Tenant-Id"):
        return header
    host = request.headers.get("host", "")
    parts = host.split(".")
    if len(parts) >= 3:
        return parts[0]
    return settings.DEFAULT_TENANT_ID


def get_current_tenant_id() -> str:
    tid = current_tenant_id.get()
    if tid is None:
        return settings.DEFAULT_TENANT_ID
    return tid


@event.listens_for(Session, "do_orm_execute")
def _auto_filter_by_tenant(execute_state: Any) -> None:
    """Auto-filter SELECT queries for models that have a tenant_id column."""
    if (
        execute_state.is_select
        and not execute_state.is_column_load
        and not execute_state.is_relationship_load
    ):
        tid = current_tenant_id.get()
        if tid is None:
            return
        mapper = execute_state.bind_mapper
        if mapper is not None and hasattr(mapper.class_, "tenant_id"):
            execute_state.statement = execute_state.statement.filter_by(tenant_id=tid)
