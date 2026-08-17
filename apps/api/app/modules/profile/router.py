from fastapi import APIRouter, status

from app.core.deps import CurrentUserDep, DbDep, TenantDep
from app.modules.profile import service
from app.modules.profile.schemas import (
    GotraResponse,
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
    SubCasteResponse,
)

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("", response_model=ProfileFullResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(db: DbDep, tenant_id: TenantDep, user_id: CurrentUserDep) -> ProfileFullResponse:
    profile = await service.create_profile(db, tenant_id, user_id)
    return await service.build_full_response(db, profile)


@router.get("/me", response_model=ProfileFullResponse)
async def get_my_profile(db: DbDep, user_id: CurrentUserDep) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    return await service.build_full_response(db, profile)


@router.patch("/me/basics", response_model=ProfileFullResponse)
async def update_basics(
    data: ProfileBasicsUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_basics(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/physical", response_model=ProfileFullResponse)
async def update_physical(
    data: ProfilePhysicalUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_physical(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/community", response_model=ProfileFullResponse)
async def update_community(
    data: ProfileCommunityUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_community(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/location", response_model=ProfileFullResponse)
async def update_location(
    data: ProfileLocationUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_location(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/native", response_model=ProfileFullResponse)
async def update_native(
    data: ProfileNativeUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_native(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/education", response_model=ProfileFullResponse)
async def update_education(
    data: ProfileEducationUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_education(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/profession", response_model=ProfileFullResponse)
async def update_profession(
    data: ProfileProfessionUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_profession(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/lifestyle", response_model=ProfileFullResponse)
async def update_lifestyle(
    data: ProfileLifestyleUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_lifestyle(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/family", response_model=ProfileFullResponse)
async def update_family(
    data: ProfileFamilyUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_family(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/horoscope", response_model=ProfileFullResponse)
async def update_horoscope(
    data: ProfileHoroscopeUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_horoscope(db, profile, data)
    return await service.build_full_response(db, profile)


@router.patch("/me/about", response_model=ProfileFullResponse)
async def update_about(
    data: ProfileAboutUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.update_about(db, profile, data)
    return await service.build_full_response(db, profile)


@router.post("/me/complete", response_model=ProfileFullResponse)
async def complete_profile(db: DbDep, user_id: CurrentUserDep) -> ProfileFullResponse:
    profile = await service.get_own_profile(db, user_id)
    profile = await service.complete_profile(db, profile)
    return await service.build_full_response(db, profile)


@router.patch("/me/preferences", response_model=ProfilePreferencesResponse)
async def update_preferences(
    data: ProfilePreferencesUpdate, db: DbDep, user_id: CurrentUserDep
) -> ProfilePreferencesResponse:
    profile = await service.get_own_profile(db, user_id)
    return await service.upsert_preferences(db, profile, data)


@router.post("/me/photos", response_model=ProfilePhotoResponse, status_code=status.HTTP_201_CREATED)
async def add_photo(
    data: ProfilePhotoCreate, db: DbDep, user_id: CurrentUserDep
) -> ProfilePhotoResponse:
    profile = await service.get_own_profile(db, user_id)
    return await service.add_photo(db, profile, data)


@router.delete("/me/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo(photo_id: str, db: DbDep, user_id: CurrentUserDep) -> None:
    profile = await service.get_own_profile(db, user_id)
    await service.delete_photo(db, profile, photo_id)


@router.get("/lookups/sub-castes", response_model=list[SubCasteResponse])
async def get_sub_castes(db: DbDep, _user_id: CurrentUserDep) -> list[SubCasteResponse]:
    sub_castes = await service.list_sub_castes(db)
    return [SubCasteResponse.model_validate(s) for s in sub_castes]


@router.get("/lookups/gotras", response_model=list[GotraResponse])
async def get_gotras(db: DbDep, _user_id: CurrentUserDep) -> list[GotraResponse]:
    gotras = await service.list_gotras(db)
    return [GotraResponse.model_validate(g) for g in gotras]


@router.get("/{profile_id}", response_model=ProfileFullResponse)
async def get_profile(profile_id: str, db: DbDep, _user_id: CurrentUserDep) -> ProfileFullResponse:
    profile = await service.get_profile_by_id(db, profile_id)
    return await service.build_full_response(db, profile)
