"""Run once after `alembic upgrade head`, `scripts/seed_tenant.py`, and
`scripts/seed_kurmi_lookups.py`. Creates ~24 fake, complete Kurmi profiles
(mixed sub-castes/districts, opposite genders) so app.modules.match can be
exercised end-to-end before real users exist. Idempotent — skips phones
that already exist.

All test users share the phone prefix +9199900000xx and password
"Test@1234", so they're easy to spot and clean up later."""
import asyncio
import random
from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import settings
from app.core.security import hash_password
from app.modules.auth.models import ProfileFor, User, UserStatus
from app.modules.profile.models import (
    Diet,
    Gender,
    MaritalStatus,
    PartnerManglik,
    ProfessionCategory,
    Profile,
    ProfilePreferences,
)
from app.modules.tenant.models import Tenant

random.seed(2026)  # deterministic across re-runs

# Mirrors scripts/seed_kurmi_lookups.py's SubCaste.name_en / Gotra.name_en values.
SUB_CASTES = [
    "Awadhia", "Kanaujia", "Sachan", "Katiyar", "Patel", "Patidar",
    "Kushwaha", "Maurya", "Chandrakar", "Mahato", "Verma", "Singh",
]
GOTRAS = [
    "Kashyap", "Bhardwaj", "Vatsa", "Vashishtha", "Sandilya", "Garg",
    "Atri", "Gautam", "Parashar", "Kaushik",
]
# Tier 2/3 UP districts where Kurmi population is concentrated (docs/CLAUDE.md).
DISTRICTS = [
    "Lucknow", "Kanpur Nagar", "Sitapur", "Hardoi", "Unnao", "Barabanki",
    "Raebareli", "Kanpur Dehat", "Fatehpur", "Pratapgarh", "Lakhimpur Kheri", "Sultanpur",
]
# Chosen to exercise every EDUCATION_LADDER rung in match/service.py.
EDUCATIONS = [
    "12th Pass", "Diploma", "B.A.", "B.Sc", "B.Tech / BE", "B.Com",
    "M.A.", "M.Tech", "MBA", "M.Sc", "PhD",
]
PROFESSIONS: list[tuple[ProfessionCategory, str]] = [
    (ProfessionCategory.government, "Govt Clerk"),
    (ProfessionCategory.government, "Teacher"),
    (ProfessionCategory.private, "Software Engineer"),
    (ProfessionCategory.private, "Bank Officer"),
    (ProfessionCategory.business, "Shop Owner"),
    (ProfessionCategory.agriculture, "Farmer"),
    (ProfessionCategory.professional, "Doctor"),
    (ProfessionCategory.professional, "Civil Engineer"),
]
HOBBIES_POOL = [
    "cricket", "reading", "cooking", "travel", "music",
    "yoga", "gardening", "photography", "singing", "dancing",
]
MALE_FIRST_NAMES = [
    "Rajesh", "Amit", "Vikas", "Sanjay", "Ashok", "Ramesh",
    "Suresh", "Dinesh", "Manoj", "Anil", "Pankaj", "Vivek",
]
FEMALE_FIRST_NAMES = [
    "Priya", "Sunita", "Anita", "Kavita", "Rekha", "Meena",
    "Pooja", "Neha", "Ritu", "Shalini", "Nisha", "Geeta",
]

TEST_PASSWORD_HASH = hash_password("Test@1234")


def _random_dob(min_age: int, max_age: int) -> date:
    age_days = random.randint(min_age * 365, max_age * 365)
    return date.today() - timedelta(days=age_days)


def _build_profile_kwargs(
    tenant_id: str,
    user_id: str,
    gender: Gender,
    first_name: str,
    sub_caste: str,
    dob: date,
    diet: Diet,
) -> dict[str, object]:
    district = random.choice(DISTRICTS)
    profession_category, specific_role = random.choice(PROFESSIONS)
    return dict(
        tenant_id=tenant_id,
        user_id=user_id,
        first_name=first_name,
        last_name=sub_caste,
        gender=gender,
        date_of_birth=dob,
        marital_status=MaritalStatus.never_married,
        height_cm=random.randint(155, 180),
        sub_caste=sub_caste,
        gotra=random.choice(GOTRAS),
        mother_tongue="Hindi",
        state="Uttar Pradesh",
        district=district,
        city=district,
        residing_since=2000,
        highest_qualification=random.choice(EDUCATIONS),
        profession_category=profession_category,
        specific_role=specific_role,
        annual_income=random.randint(250_000, 1_500_000),
        diet=diet,
        hobbies=random.sample(HOBBIES_POOL, k=3),
        languages=["Hindi"],
        manglik_status=random.choice(["no", "no", "no", "anshik", "yes"]),
        about_me=f"{first_name} {sub_caste}, from {district}, looking for a life partner.",
        is_complete=True,
    )


async def seed() -> None:
    engine = create_async_engine(settings.DATABASE_URL)
    factory = async_sessionmaker(engine, expire_on_commit=False)

    async with factory() as session:
        result = await session.execute(select(Tenant).where(Tenant.subdomain == "kurmi"))
        tenant = result.scalar_one_or_none()
        if not tenant:
            print("kurmi tenant not found — run scripts/seed_tenant.py first")
            await engine.dispose()
            return
        tenant_id = tenant.subdomain  # tenant-scoped rows key on subdomain, not the PK

        genders_and_names = [(Gender.male, name) for name in MALE_FIRST_NAMES] + [
            (Gender.female, name) for name in FEMALE_FIRST_NAMES
        ]

        created = 0
        for i, (gender, first_name) in enumerate(genders_and_names):
            phone = f"+9199900000{i:02d}"
            existing = await session.execute(select(User).where(User.phone == phone))
            if existing.scalar_one_or_none():
                continue

            user = User(
                tenant_id=tenant_id,
                phone=phone,
                password_hash=TEST_PASSWORD_HASH,
                profile_for=ProfileFor.self_,
                status=UserStatus.active,
            )
            session.add(user)
            await session.flush()

            sub_caste = random.choice(SUB_CASTES)
            dob = _random_dob(24, 34) if gender == Gender.male else _random_dob(22, 30)
            diet = random.choice([Diet.veg, Diet.veg, Diet.veg, Diet.egg, Diet.non_veg])
            profile = Profile(
                **_build_profile_kwargs(
                    tenant_id, user.id, gender, first_name, sub_caste, dob, diet
                )
            )
            session.add(profile)
            await session.flush()

            own_age = date.today().year - dob.year
            partner_age_min = own_age - (4 if gender == Gender.female else 0) - 2
            partner_age_max = own_age + (4 if gender == Gender.male else 0) + 2
            manglik_choices = [
                PartnerManglik.doesnt_matter,
                PartnerManglik.doesnt_matter,
                PartnerManglik.anshik_ok,
            ]
            manglik_pref = random.choice(manglik_choices)
            session.add(
                ProfilePreferences(
                    tenant_id=tenant_id,
                    profile_id=profile.id,
                    partner_age_min=max(21, partner_age_min),
                    partner_age_max=partner_age_max,
                    # 70% prefer their own sub-caste; rest have no preference —
                    # gives the match algorithm a realistic mix to score.
                    partner_sub_castes=[sub_caste] if random.random() < 0.7 else [],
                    partner_manglik=manglik_pref,
                    partner_diet=[diet.value] if random.random() < 0.5 else [],
                    partner_states=["Uttar Pradesh"],
                    partner_min_education="12th Pass",
                )
            )
            created += 1

        await session.commit()
        skipped = len(genders_and_names) - created
        print(
            f"Seeded {created} test profiles for tenant {tenant_id!r} "
            f"(skipped {skipped} already present)"
        )

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
