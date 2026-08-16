from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.profile.models import Gotra, Profile, ProfilePhoto, ProfilePreferences, SubCaste
from app.modules.profile.schemas import ProfilePhotoCreate, ProfilePreferencesUpdate


async def get_by_user_id(db: AsyncSession, user_id: str) -> Profile | None:
    result = await db.execute(select(Profile).where(Profile.user_id == user_id))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, profile_id: str) -> Profile | None:
    result = await db.execute(select(Profile).where(Profile.id == profile_id))
    return result.scalar_one_or_none()


async def create(db: AsyncSession, tenant_id: str, user_id: str) -> Profile:
    profile = Profile(tenant_id=tenant_id, user_id=user_id)
    db.add(profile)
    await db.flush()
    await db.refresh(profile)
    return profile


async def update(db: AsyncSession, profile: Profile, **fields: object) -> Profile:
    for field, value in fields.items():
        setattr(profile, field, value)
    await db.flush()
    await db.refresh(profile)
    return profile


async def list_photos(db: AsyncSession, profile_id: str) -> list[ProfilePhoto]:
    result = await db.execute(
        select(ProfilePhoto)
        .where(ProfilePhoto.profile_id == profile_id)
        .order_by(ProfilePhoto.display_order)
    )
    return list(result.scalars().all())


async def get_photo(db: AsyncSession, photo_id: str) -> ProfilePhoto | None:
    result = await db.execute(select(ProfilePhoto).where(ProfilePhoto.id == photo_id))
    return result.scalar_one_or_none()


async def add_photo(
    db: AsyncSession, tenant_id: str, profile_id: str, data: ProfilePhotoCreate
) -> ProfilePhoto:
    photo = ProfilePhoto(tenant_id=tenant_id, profile_id=profile_id, **data.model_dump())
    db.add(photo)
    await db.flush()
    await db.refresh(photo)
    return photo


async def delete_photo(db: AsyncSession, photo: ProfilePhoto) -> None:
    await db.delete(photo)
    await db.flush()


async def get_preferences(db: AsyncSession, profile_id: str) -> ProfilePreferences | None:
    result = await db.execute(
        select(ProfilePreferences).where(ProfilePreferences.profile_id == profile_id)
    )
    return result.scalar_one_or_none()


async def create_preferences(
    db: AsyncSession, tenant_id: str, profile_id: str, data: ProfilePreferencesUpdate
) -> ProfilePreferences:
    prefs = ProfilePreferences(tenant_id=tenant_id, profile_id=profile_id, **data.model_dump())
    db.add(prefs)
    await db.flush()
    await db.refresh(prefs)
    return prefs


async def update_preferences(
    db: AsyncSession, prefs: ProfilePreferences, data: ProfilePreferencesUpdate
) -> ProfilePreferences:
    for field, value in data.model_dump().items():
        setattr(prefs, field, value)
    await db.flush()
    await db.refresh(prefs)
    return prefs


async def list_sub_castes(db: AsyncSession) -> list[SubCaste]:
    result = await db.execute(select(SubCaste).order_by(SubCaste.display_order))
    return list(result.scalars().all())


async def list_gotras(db: AsyncSession) -> list[Gotra]:
    result = await db.execute(select(Gotra).order_by(Gotra.name_en))
    return list(result.scalars().all())
