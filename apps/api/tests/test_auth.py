import random

import pytest_asyncio
import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

TENANT_HEADERS = {"X-Tenant-Id": "kurmi"}
PASSWORD = "Passw0rd"


def _unique_phone() -> str:
    first = random.choice("6789")
    rest = "".join(str(random.randint(0, 9)) for _ in range(9))
    return f"+91{first}{rest}"


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


async def _register(client: AsyncClient, phone: str, password: str = PASSWORD) -> None:
    resp = await client.post(
        "/v1/auth/register",
        json={"phone": phone, "password": password, "profile_for": "self"},
        headers=TENANT_HEADERS,
    )
    assert resp.status_code == 201, resp.text


async def test_register(client: AsyncClient) -> None:
    phone = _unique_phone()
    resp = await client.post(
        "/v1/auth/register",
        json={"phone": phone, "password": PASSWORD, "profile_for": "self"},
        headers=TENANT_HEADERS,
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["phone"] == phone
    assert body["profile_for"] == "self"
    assert "password_hash" not in body


async def test_register_duplicate_phone_returns_409(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    resp = await client.post(
        "/v1/auth/register",
        json={"phone": phone, "password": PASSWORD, "profile_for": "self"},
        headers=TENANT_HEADERS,
    )
    assert resp.status_code == 409


async def test_login_success(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    resp = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=TENANT_HEADERS
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["access_token"]
    assert body["refresh_token"]
    assert body["user"]["phone"] == phone


async def test_login_wrong_password_returns_401(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    resp = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": "WrongPass1"}, headers=TENANT_HEADERS
    )
    assert resp.status_code == 401


async def test_refresh_returns_new_access_token(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    login = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=TENANT_HEADERS
    )
    refresh_token = login.json()["refresh_token"]
    resp = await client.post(
        "/v1/auth/refresh", json={"refresh_token": refresh_token}, headers=TENANT_HEADERS
    )
    assert resp.status_code == 200
    assert resp.json()["access_token"]


async def test_me_with_valid_token(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    login = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=TENANT_HEADERS
    )
    access_token = login.json()["access_token"]
    resp = await client.get(
        "/v1/auth/me",
        headers={**TENANT_HEADERS, "Authorization": f"Bearer {access_token}"},
    )
    assert resp.status_code == 200
    assert resp.json()["phone"] == phone


async def test_me_without_token_returns_401(client: AsyncClient) -> None:
    resp = await client.get("/v1/auth/me", headers=TENANT_HEADERS)
    assert resp.status_code == 401


async def test_logout_revokes_refresh_token(client: AsyncClient) -> None:
    phone = _unique_phone()
    await _register(client, phone)
    login = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=TENANT_HEADERS
    )
    access_token = login.json()["access_token"]
    refresh_token = login.json()["refresh_token"]

    logout_resp = await client.post(
        "/v1/auth/logout",
        json={"refresh_token": refresh_token},
        headers={**TENANT_HEADERS, "Authorization": f"Bearer {access_token}"},
    )
    assert logout_resp.status_code == 204

    refresh_resp = await client.post(
        "/v1/auth/refresh", json={"refresh_token": refresh_token}, headers=TENANT_HEADERS
    )
    assert refresh_resp.status_code == 401
