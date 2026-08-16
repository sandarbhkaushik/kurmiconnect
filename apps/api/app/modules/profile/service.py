from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.profile import repository
from app.modules.profile.models import Gotra, Profile, ProfilePhoto, SubCaste
from app.modules.profile.schemas import (
    ProfileAboutUpdate,
    ProfileBasicsUpdate,
    ProfileCommunityUpdate,
    ProfileEducationUpdate,
    ProfileFamilyUpdate,
    ProfileFullResponse,
    ProfileHoroscopeUpdate,
    ProfileLifestyleUpdate,
    ProfileLocationUpdate,
    ProfileNativeUpdate,
    ProfilePhotoCreate,
    ProfilePhotoResponse,
    ProfilePhysicalUpdate,
    ProfilePreferencesResponse,
    ProfilePreferencesUpdate,
    ProfileProfessionUpdate,
)


def _not_found() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail={"error": {"code": "PROFILE_NOT_FOUND", "message": "Profile not found"}},
    )


async def create_profile(db: AsyncSession, tenant_id: str, user_id: str) -> Profile:
    existing = await repository.get_by_user_id(db, user_id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"error": {"code": "PROFILE_EXISTS", "message": "Profile already created"}},
        )
    return await repository.create(db, tenant_id, user_id)


async def get_own_profile(db: AsyncSession, user_id: str) -> Profile:
    profile = await repository.get_by_user_id(db, user_id)
    if not profile:
        raise _not_found()
    return profile


async def get_profile_by_id(db: AsyncSession, profile_id: str) -> Profile:
    profile = await repository.get_by_id(db, profile_id)
    if not profile:
        raise _not_found()
    return profile


async def _update_section(db: AsyncSession, profile: Profile, data: object) -> Profile:
    return await repository.update(db, profile, **data.model_dump())


async def update_basics(db: AsyncSession, profile: Profile, data: ProfileBasicsUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_physical(db: AsyncSession, profile: Profile, data: ProfilePhysicalUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_community(db: AsyncSession, profile: Profile, data: ProfileCommunityUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_location(db: AsyncSession, profile: Profile, data: ProfileLocationUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_native(db: AsyncSession, profile: Profile, data: ProfileNativeUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_education(db: AsyncSession, profile: Profile, data: ProfileEducationUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_profession(db: AsyncSession, profile: Profile, data: ProfileProfessionUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_lifestyle(db: AsyncSession, profile: Profile, data: ProfileLifestyleUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_family(db: AsyncSession, profile: Profile, data: ProfileFamilyUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_horoscope(db: AsyncSession, profile: Profile, data: ProfileHoroscopeUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def update_about(db: AsyncSession, profile: Profile, data: ProfileAboutUpdate) -> Profile:
    return await _update_section(db, profile, data)


async def upsert_preferences(
    db: AsyncSession, profile: Profile, data: ProfilePreferencesUpdate
) -> ProfilePreferencesResponse:
    existing = await repository.get_preferences(db, profile.id)
    if existing:
        prefs = await repository.update_preferences(db, existing, data)
    else:
        prefs = await repository.create_preferences(db, profile.tenant_id, profile.id, data)
    return ProfilePreferencesResponse.model_validate(prefs)


async def add_photo(
    db: AsyncSession, profile: Profile, data: ProfilePhotoCreate
) -> ProfilePhotoResponse:
    if data.is_main:
        for photo in await repository.list_photos(db, profile.id):
            if photo.is_main:
                photo.is_main = False
        await db.flush()
    photo = await repository.add_photo(db, profile.tenant_id, profile.id, data)
    return ProfilePhotoResponse.model_validate(photo)


async def delete_photo(db: AsyncSession, profile: Profile, photo_id: str) -> None:
    photo = await repository.get_photo(db, photo_id)
    if not photo or photo.profile_id != profile.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": {"code": "PHOTO_NOT_FOUND", "message": "Photo not found"}},
        )
    await repository.delete_photo(db, photo)


async def list_sub_castes(db: AsyncSession) -> list[SubCaste]:
    return await repository.list_sub_castes(db)


async def list_gotras(db: AsyncSession) -> list[Gotra]:
    return await repository.list_gotras(db)


async def build_full_response(db: AsyncSession, profile: Profile) -> ProfileFullResponse:
    photos: list[ProfilePhoto] = await repository.list_photos(db, profile.id)
    prefs = await repository.get_preferences(db, profile.id)
    columns = {col.name: getattr(profile, col.name) for col in Profile.__table__.columns}
    return ProfileFullResponse(
        **columns,
        photos=[ProfilePhotoResponse.model_validate(p) for p in photos],
        preferences=ProfilePreferencesResponse.model_validate(prefs) if prefs else None,
    )
