from datetime import date, datetime, time

from pydantic import BaseModel, Field

from app.modules.profile.models import (
    BodyType,
    Complexion,
    Diet,
    Drinking,
    FamilyType,
    FamilyValues,
    Gender,
    MaritalStatus,
    OwnsLand,
    PartnerManglik,
    PhotoVisibility,
    ProfessionCategory,
    Smoking,
)


class ProfileBasicsUpdate(BaseModel):
    first_name: str = Field(..., max_length=100)
    middle_name: str | None = Field(None, max_length=100)
    last_name: str = Field(..., max_length=100)
    gender: Gender
    date_of_birth: date
    marital_status: MaritalStatus


class ProfilePhysicalUpdate(BaseModel):
    height_cm: int = Field(..., ge=100, le=250)
    weight_kg: int | None = Field(None, ge=20, le=300)
    body_type: BodyType
    complexion: Complexion
    has_physical_challenge: bool = False


class ProfileCommunityUpdate(BaseModel):
    sub_caste: str = Field(..., max_length=100)
    gotra: str = Field(..., max_length=100)
    same_gotra_acceptable: bool = False
    mother_tongue: str = Field(..., max_length=50)


class ProfileLocationUpdate(BaseModel):
    country: str = Field("India", max_length=60)
    state: str = Field(..., max_length=60)
    district: str = Field(..., max_length=60)
    city: str = Field(..., max_length=60)
    residing_since: int | None = None
    is_native_place: bool = False


class ProfileNativeUpdate(BaseModel):
    native_state: str | None = Field(None, max_length=60)
    native_district: str | None = Field(None, max_length=60)
    native_village_or_town: str | None = Field(None, max_length=100)
    family_still_there: bool | None = None
    owns_land: OwnsLand | None = None


class ProfileEducationUpdate(BaseModel):
    highest_qualification: str = Field(..., max_length=100)
    specialisation: str | None = Field(None, max_length=100)
    college_university: str | None = Field(None, max_length=150)
    year_of_passing: int | None = None
    currently_studying: bool = False


class ProfileProfessionUpdate(BaseModel):
    profession_category: ProfessionCategory
    specific_role: str | None = Field(None, max_length=100)
    designation: str | None = Field(None, max_length=100)
    company: str | None = Field(None, max_length=150)
    work_location: str | None = Field(None, max_length=100)
    annual_income: int | None = Field(None, ge=0)
    income_verify_requested: bool = False


class ProfileLifestyleUpdate(BaseModel):
    diet: Diet
    drinking: Drinking
    smoking: Smoking
    hobbies: list[str] = Field(default_factory=list, max_length=6)
    languages: list[str] = Field(default_factory=list)


class ProfileFamilyUpdate(BaseModel):
    father_name: str | None = Field(None, max_length=150)
    father_occupation: str | None = Field(None, max_length=100)
    mother_name: str | None = Field(None, max_length=150)
    mother_occupation: str | None = Field(None, max_length=100)
    brothers_count: int = Field(0, ge=0)
    brothers_married_count: int = Field(0, ge=0)
    sisters_count: int = Field(0, ge=0)
    sisters_married_count: int = Field(0, ge=0)
    family_type: FamilyType | None = None
    family_values: FamilyValues | None = None


class ProfileHoroscopeUpdate(BaseModel):
    believes_in_kundli_matching: bool = False
    time_of_birth: time | None = None
    place_of_birth: str | None = Field(None, max_length=150)
    manglik_status: str | None = Field(None, max_length=30)
    nakshatra: str | None = Field(None, max_length=50)
    rashi: str | None = Field(None, max_length=50)


class ProfileAboutUpdate(BaseModel):
    about_me: str | None = Field(None, max_length=500)
    partner_expectation_summary: str | None = Field(None, max_length=500)
    photo_visibility: PhotoVisibility = PhotoVisibility.all


class ProfilePreferencesUpdate(BaseModel):
    partner_age_min: int | None = Field(None, ge=18, le=100)
    partner_age_max: int | None = Field(None, ge=18, le=100)
    partner_height_min: int | None = Field(None, ge=100, le=250)
    partner_height_max: int | None = Field(None, ge=100, le=250)
    partner_marital_status: list[str] = Field(default_factory=list)
    partner_manglik: PartnerManglik = PartnerManglik.doesnt_matter
    partner_diet: list[str] = Field(default_factory=list)
    partner_sub_castes: list[str] = Field(default_factory=list)
    partner_same_gotra_acceptable: bool = False
    partner_other_castes_acceptable: bool = False
    partner_states: list[str] = Field(default_factory=list)
    partner_languages: list[str] = Field(default_factory=list)
    partner_professions: list[str] = Field(default_factory=list)
    partner_min_education: str | None = Field(None, max_length=100)
    partner_min_income: int | None = Field(None, ge=0)
    partner_want_working_professional: bool = False


class ProfilePreferencesResponse(ProfilePreferencesUpdate):
    model_config = {"from_attributes": True}


class ProfilePhotoCreate(BaseModel):
    url_thumb: str
    url_medium: str
    url_full: str
    is_main: bool = False
    display_order: int = 0


class ProfilePhotoResponse(BaseModel):
    id: str
    url_thumb: str
    url_medium: str
    url_full: str
    is_main: bool
    display_order: int

    model_config = {"from_attributes": True}


class SubCasteResponse(BaseModel):
    id: str
    name_hi: str
    name_en: str
    display_order: int

    model_config = {"from_attributes": True}


class GotraResponse(BaseModel):
    id: str
    name_hi: str
    name_en: str

    model_config = {"from_attributes": True}


class ProfileFullResponse(BaseModel):
    id: str
    tenant_id: str
    user_id: str

    # Basic
    first_name: str | None
    middle_name: str | None
    last_name: str | None
    gender: Gender | None
    date_of_birth: date | None
    marital_status: MaritalStatus | None

    # Physical
    height_cm: int | None
    weight_kg: int | None
    body_type: BodyType | None
    complexion: Complexion | None
    has_physical_challenge: bool

    # Community
    sub_caste: str | None
    gotra: str | None
    same_gotra_acceptable: bool
    mother_tongue: str | None

    # Location
    country: str
    state: str | None
    district: str | None
    city: str | None
    residing_since: int | None
    is_native_place: bool

    # Native place
    native_state: str | None
    native_district: str | None
    native_village_or_town: str | None
    family_still_there: bool | None
    owns_land: OwnsLand | None

    # Education
    highest_qualification: str | None
    specialisation: str | None
    college_university: str | None
    year_of_passing: int | None
    currently_studying: bool

    # Profession
    profession_category: ProfessionCategory | None
    specific_role: str | None
    designation: str | None
    company: str | None
    work_location: str | None
    annual_income: int | None
    income_verify_requested: bool

    # Lifestyle
    diet: Diet | None
    drinking: Drinking | None
    smoking: Smoking | None
    hobbies: list[str]
    languages: list[str]

    # Family
    father_name: str | None
    father_occupation: str | None
    mother_name: str | None
    mother_occupation: str | None
    brothers_count: int
    brothers_married_count: int
    sisters_count: int
    sisters_married_count: int
    family_type: FamilyType | None
    family_values: FamilyValues | None

    # Horoscope
    believes_in_kundli_matching: bool
    time_of_birth: time | None
    place_of_birth: str | None
    manglik_status: str | None
    nakshatra: str | None
    rashi: str | None

    # About
    about_me: str | None
    partner_expectation_summary: str | None
    photo_visibility: PhotoVisibility

    is_complete: bool

    photos: list[ProfilePhotoResponse] = Field(default_factory=list)
    preferences: ProfilePreferencesResponse | None = None

    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
