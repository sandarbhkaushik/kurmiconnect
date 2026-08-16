import random

import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.main import app

TENANT_HEADERS = {"X-Tenant-Id": "kurmi"}
PASSWORD = "Passw0rd"


def _unique_phone() -> str:
    first = random.choice("6789")
    rest = "".join(str(random.randint(0, 9)) for _ in range(9))
    return f"+91{first}{rest}"


def _unique_subdomain() -> str:
    return "t" + "".join(str(random.randint(0, 9)) for _ in range(10))


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


async def _auth_headers(client: AsyncClient, tenant_headers: dict = TENANT_HEADERS) -> dict:
    """Register + log in a fresh user under the given tenant, return headers
    carrying both the tenant id and the resulting bearer token."""
    phone = _unique_phone()
    resp = await client.post(
        "/v1/auth/register",
        json={"phone": phone, "password": PASSWORD, "profile_for": "self"},
        headers=tenant_headers,
    )
    assert resp.status_code == 201, resp.text
    resp = await client.post(
        "/v1/auth/login", json={"phone": phone, "password": PASSWORD}, headers=tenant_headers
    )
    assert resp.status_code == 200, resp.text
    token = resp.json()["access_token"]
    return {**tenant_headers, "Authorization": f"Bearer {token}"}


async def test_create_profile_returns_empty_profile(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    resp = await client.post("/v1/profiles", headers=headers)
    assert resp.status_code == 201, resp.text
    body = resp.json()
    assert body["first_name"] is None
    assert body["is_complete"] is False
    assert body["photos"] == []
    assert body["preferences"] is None


async def test_create_profile_duplicate_returns_409(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    await client.post("/v1/profiles", headers=headers)
    resp = await client.post("/v1/profiles", headers=headers)
    assert resp.status_code == 409


async def test_get_my_profile_without_creation_returns_404(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    resp = await client.get("/v1/profiles/me", headers=headers)
    assert resp.status_code == 404


async def test_get_my_profile_after_create(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    created = await client.post("/v1/profiles", headers=headers)
    resp = await client.get("/v1/profiles/me", headers=headers)
    assert resp.status_code == 200
    assert resp.json()["id"] == created.json()["id"]


async def test_update_basics_section(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    await client.post("/v1/profiles", headers=headers)
    resp = await client.patch(
        "/v1/profiles/me/basics",
        json={
            "first_name": "Ram",
            "last_name": "Verma",
            "gender": "male",
            "date_of_birth": "1995-06-15",
            "marital_status": "never_married",
        },
        headers=headers,
    )
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["first_name"] == "Ram"
    assert body["last_name"] == "Verma"
    assert body["gender"] == "male"
    assert body["marital_status"] == "never_married"
    # Untouched sections remain null
    assert body["sub_caste"] is None


async def test_update_preferences_upserts(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    await client.post("/v1/profiles", headers=headers)
    resp = await client.patch(
        "/v1/profiles/me/preferences",
        json={"partner_age_min": 22, "partner_age_max": 30},
        headers=headers,
    )
    assert resp.status_code == 200
    assert resp.json()["partner_age_min"] == 22

    resp = await client.patch(
        "/v1/profiles/me/preferences",
        json={"partner_age_min": 24, "partner_age_max": 32},
        headers=headers,
    )
    assert resp.status_code == 200
    assert resp.json()["partner_age_min"] == 24


async def test_add_and_delete_photo(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    await client.post("/v1/profiles", headers=headers)

    resp = await client.post(
        "/v1/profiles/me/photos",
        json={
            "url_thumb": "https://example.com/t.jpg",
            "url_medium": "https://example.com/m.jpg",
            "url_full": "https://example.com/f.jpg",
            "is_main": True,
        },
        headers=headers,
    )
    assert resp.status_code == 201, resp.text
    photo_id = resp.json()["id"]
    assert resp.json()["is_main"] is True

    profile = await client.get("/v1/profiles/me", headers=headers)
    assert len(profile.json()["photos"]) == 1

    resp = await client.delete(f"/v1/profiles/me/photos/{photo_id}", headers=headers)
    assert resp.status_code == 204

    profile = await client.get("/v1/profiles/me", headers=headers)
    assert profile.json()["photos"] == []


async def test_get_sub_castes_returns_seeded_list(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    resp = await client.get("/v1/profiles/lookups/sub-castes", headers=headers)
    assert resp.status_code == 200
    names = {s["name_en"] for s in resp.json()}
    assert "Patel" in names
    assert "Kushwaha" in names


async def test_get_gotras_returns_seeded_list(client: AsyncClient) -> None:
    headers = await _auth_headers(client)
    resp = await client.get("/v1/profiles/lookups/gotras", headers=headers)
    assert resp.status_code == 200
    names = {g["name_en"] for g in resp.json()}
    assert "Kashyap" in names


async def test_tenant_isolation_profile_not_visible_across_tenants(client: AsyncClient) -> None:
    other_tenant = {"X-Tenant-Id": _unique_subdomain()}
    await client.post(
        "/v1/admin/tenants",
        json={
            "name": "Other Tenant",
            "subdomain": other_tenant["X-Tenant-Id"],
            "app_name": "OtherApp",
        },
    )

    kurmi_headers = await _auth_headers(client, TENANT_HEADERS)
    created = await client.post("/v1/profiles", headers=kurmi_headers)
    profile_id = created.json()["id"]

    other_headers = await _auth_headers(client, other_tenant)
    resp = await client.get(f"/v1/profiles/{profile_id}", headers=other_headers)
    assert resp.status_code == 404


async def test_tenant_isolation_sub_castes_are_per_tenant(client: AsyncClient) -> None:
    other_tenant = {"X-Tenant-Id": _unique_subdomain()}
    await client.post(
        "/v1/admin/tenants",
        json={
            "name": "Other Tenant",
            "subdomain": other_tenant["X-Tenant-Id"],
            "app_name": "OtherApp",
        },
    )
    other_headers = await _auth_headers(client, other_tenant)
    resp = await client.get("/v1/profiles/lookups/sub-castes", headers=other_headers)
    assert resp.status_code == 200
    assert resp.json() == []
