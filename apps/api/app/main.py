from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.logging import setup_logging
from app.core.tenant import TenantMiddleware
from app.modules.auth.router import router as auth_router
from app.modules.health.router import router as health_router
from app.modules.match.router import router as match_router
from app.modules.profile.router import router as profile_router
from app.modules.tenant.router import router as tenant_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    setup_logging()
    yield


app = FastAPI(
    title="KurmiConnect API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",   # Expo dev
        "http://localhost:5173",   # Vite admin
        "http://localhost:19006",  # Expo web
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TenantMiddleware)

app.include_router(health_router, prefix="/v1")
app.include_router(tenant_router, prefix="/v1")
app.include_router(auth_router, prefix="/v1")
app.include_router(profile_router, prefix="/v1")
app.include_router(match_router, prefix="/v1")
