import enum
from datetime import date, time

from sqlalchemy import ARRAY, Boolean, Date, Enum, ForeignKey, Index, Integer, String, Text, Time, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import TenantBase


class Gender(str, enum.Enum):
    male = "male"
    female = "female"


class MaritalStatus(str, enum.Enum):
    never_married = "never_married"
    divorced = "divorced"
    widowed = "widowed"
    awaiting_divorce = "awaiting_divorce"


class BodyType(str, enum.Enum):
    slim = "slim"
    average = "average"
    heavy = "heavy"
    athletic = "athletic"


class Complexion(str, enum.Enum):
    fair = "fair"
    wheatish = "wheatish"
    dark = "dark"


class OwnsLand(str, enum.Enum):
    yes = "yes"
    no = "no"
    skip = "skip"


class ProfessionCategory(str, enum.Enum):
    government = "government"
    private = "private"
    business = "business"
    agriculture = "agriculture"
    professional = "professional"
    student = "student"


class Diet(str, enum.Enum):
    veg = "veg"
    egg = "egg"
    non_veg = "non_veg"
    jain = "jain"


class Drinking(str, enum.Enum):
    never = "never"
    occasionally = "occasionally"
    socially = "socially"


class Smoking(str, enum.Enum):
    never = "never"
    occasionally = "occasionally"


class FamilyType(str, enum.Enum):
    joint = "joint"
    nuclear = "nuclear"


class FamilyValues(str, enum.Enum):
    orthodox = "orthodox"
    traditional = "traditional"
    moderate = "moderate"
    liberal = "liberal"


class PhotoVisibility(str, enum.Enum):
    all = "all"
    premium_only = "premium_only"
    on_request = "on_request"


class PartnerManglik(str, enum.Enum):
    no_only = "no_only"
    doesnt_matter = "doesnt_matter"
    anshik_ok = "anshik_ok"


class Profile(TenantBase):
    """Fields are filled section-by-section across 14 onboarding screens, so
    most columns are nullable — "required" is enforced per-section in the
    Pydantic schemas, not at the DB level."""

    __tablename__ = "profiles"
    __table_args__ = (
        UniqueConstraint("user_id", name="uq_profiles_user_id"),
        Index("ix_profiles_tenant_subcaste_district", "tenant_id", "sub_caste", "district"),
        Index("ix_profiles_tenant_gender_dob", "tenant_id", "gender", "date_of_birth"),
    )

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, index=True
    )

    # Basic
    first_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    middle_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    gender: Mapped[Gender | None] = mapped_column(Enum(Gender), nullable=True)
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    marital_status: Mapped[MaritalStatus | None] = mapped_column(Enum(MaritalStatus), nullable=True)

    # Physical
    height_cm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    weight_kg: Mapped[int | None] = mapped_column(Integer, nullable=True)
    body_type: Mapped[BodyType | None] = mapped_column(Enum(BodyType), nullable=True)
    complexion: Mapped[Complexion | None] = mapped_column(Enum(Complexion), nullable=True)
    has_physical_challenge: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Community
    sub_caste: Mapped[str | None] = mapped_column(String(100), nullable=True)
    gotra: Mapped[str | None] = mapped_column(String(100), nullable=True)
    same_gotra_acceptable: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    mother_tongue: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # Location
    country: Mapped[str] = mapped_column(String(60), default="India", nullable=False)
    state: Mapped[str | None] = mapped_column(String(60), nullable=True)
    district: Mapped[str | None] = mapped_column(String(60), nullable=True)
    city: Mapped[str | None] = mapped_column(String(60), nullable=True)
    residing_since: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_native_place: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Native place
    native_state: Mapped[str | None] = mapped_column(String(60), nullable=True)
    native_district: Mapped[str | None] = mapped_column(String(60), nullable=True)
    native_village_or_town: Mapped[str | None] = mapped_column(String(100), nullable=True)
    family_still_there: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    owns_land: Mapped[OwnsLand | None] = mapped_column(Enum(OwnsLand), nullable=True)

    # Education
    highest_qualification: Mapped[str | None] = mapped_column(String(100), nullable=True)
    specialisation: Mapped[str | None] = mapped_column(String(100), nullable=True)
    college_university: Mapped[str | None] = mapped_column(String(150), nullable=True)
    year_of_passing: Mapped[int | None] = mapped_column(Integer, nullable=True)
    currently_studying: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Profession
    profession_category: Mapped[ProfessionCategory | None] = mapped_column(
        Enum(ProfessionCategory), nullable=True
    )
    specific_role: Mapped[str | None] = mapped_column(String(100), nullable=True)
    designation: Mapped[str | None] = mapped_column(String(100), nullable=True)
    company: Mapped[str | None] = mapped_column(String(150), nullable=True)
    work_location: Mapped[str | None] = mapped_column(String(100), nullable=True)
    annual_income: Mapped[int | None] = mapped_column(Integer, nullable=True)
    income_verify_requested: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Lifestyle
    diet: Mapped[Diet | None] = mapped_column(Enum(Diet), nullable=True)
    drinking: Mapped[Drinking | None] = mapped_column(Enum(Drinking), nullable=True)
    smoking: Mapped[Smoking | None] = mapped_column(Enum(Smoking), nullable=True)
    hobbies: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    languages: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)

    # Family
    father_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    father_occupation: Mapped[str | None] = mapped_column(String(100), nullable=True)
    mother_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    mother_occupation: Mapped[str | None] = mapped_column(String(100), nullable=True)
    brothers_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    brothers_married_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    sisters_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    sisters_married_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    family_type: Mapped[FamilyType | None] = mapped_column(Enum(FamilyType), nullable=True)
    family_values: Mapped[FamilyValues | None] = mapped_column(Enum(FamilyValues), nullable=True)

    # Horoscope
    believes_in_kundli_matching: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    time_of_birth: Mapped[time | None] = mapped_column(Time, nullable=True)
    place_of_birth: Mapped[str | None] = mapped_column(String(150), nullable=True)
    manglik_status: Mapped[str | None] = mapped_column(String(30), nullable=True)
    nakshatra: Mapped[str | None] = mapped_column(String(50), nullable=True)
    rashi: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # About
    about_me: Mapped[str | None] = mapped_column(Text, nullable=True)
    partner_expectation_summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Photos
    photo_visibility: Mapped[PhotoVisibility] = mapped_column(
        Enum(PhotoVisibility), default=PhotoVisibility.all, nullable=False
    )

    is_complete: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class ProfilePhoto(TenantBase):
    __tablename__ = "profile_photos"

    profile_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("profiles.id"), nullable=False, index=True
    )
    url_thumb: Mapped[str] = mapped_column(Text, nullable=False)
    url_medium: Mapped[str] = mapped_column(Text, nullable=False)
    url_full: Mapped[str] = mapped_column(Text, nullable=False)
    is_main: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class ProfilePreferences(TenantBase):
    __tablename__ = "profile_preferences"
    __table_args__ = (UniqueConstraint("profile_id", name="uq_profile_preferences_profile_id"),)

    profile_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("profiles.id"), nullable=False, index=True
    )

    partner_age_min: Mapped[int | None] = mapped_column(Integer, nullable=True)
    partner_age_max: Mapped[int | None] = mapped_column(Integer, nullable=True)
    partner_height_min: Mapped[int | None] = mapped_column(Integer, nullable=True)
    partner_height_max: Mapped[int | None] = mapped_column(Integer, nullable=True)
    partner_marital_status: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_manglik: Mapped[PartnerManglik] = mapped_column(
        Enum(PartnerManglik), default=PartnerManglik.doesnt_matter, nullable=False
    )
    partner_diet: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_sub_castes: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_same_gotra_acceptable: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    partner_other_castes_acceptable: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    partner_states: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_languages: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_professions: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)
    partner_min_education: Mapped[str | None] = mapped_column(String(100), nullable=True)
    partner_min_income: Mapped[int | None] = mapped_column(Integer, nullable=True)
    partner_want_working_professional: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class SubCaste(TenantBase):
    __tablename__ = "sub_castes"

    name_hi: Mapped[str] = mapped_column(String(100), nullable=False)
    name_en: Mapped[str] = mapped_column(String(100), nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Gotra(TenantBase):
    __tablename__ = "gotras"

    name_hi: Mapped[str] = mapped_column(String(100), nullable=False)
    name_en: Mapped[str] = mapped_column(String(100), nullable=False)
