"""Run once after `alembic upgrade head` (and after scripts/seed_tenant.py) to
seed the kurmi tenant's sub-caste and gotra lookup tables. Idempotent — safe
to re-run; skips names that already exist for the tenant."""
import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import settings
from app.modules.profile.models import Gotra, SubCaste
from app.modules.tenant.models import Tenant

SUB_CASTES: list[tuple[str, str]] = [
    ("अवधिया", "Awadhia"),
    ("कनौजिया", "Kanaujia"),
    ("सचान", "Sachan"),
    ("कटियार", "Katiyar"),
    ("पटेल", "Patel"),
    ("पाटीदार", "Patidar"),
    ("कुशवाहा", "Kushwaha"),
    ("मौर्य", "Maurya"),
    ("चंद्राकर", "Chandrakar"),
    ("महतो", "Mahato"),
    ("वर्मा", "Verma"),
    ("सिंह", "Singh"),
]

GOTRAS: list[tuple[str, str]] = [
    ("कश्यप", "Kashyap"),
    ("भारद्वाज", "Bhardwaj"),
    ("वत्स", "Vatsa"),
    ("वशिष्ठ", "Vashishtha"),
    ("शांडिल्य", "Sandilya"),
    ("गर्ग", "Garg"),
    ("अत्रि", "Atri"),
    ("गौतम", "Gautam"),
    ("पराशर", "Parashar"),
    ("कौशिक", "Kaushik"),
    ("अगस्त्य", "Agastya"),
    ("विश्वामित्र", "Vishwamitra"),
    ("जमदग्नि", "Jamadagni"),
    ("कुत्स", "Kutsa"),
    ("मुद्गल", "Mudgal"),
    ("कौडिन्य", "Kaudinya"),
    ("उपमन्यु", "Upmanyu"),
    ("कात्यायन", "Katyayan"),
    ("धनञ्जय", "Dhananjay"),
    ("मौद्गल्य", "Maudgalya"),
    ("कमल", "Kamal"),
    ("सूर्यवंशी", "Suryavanshi"),
    ("चंद्रवंशी", "Chandravanshi"),
    ("सांकृत्य", "Sankrit"),
]


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

        # Tenant-scoped rows use the subdomain string as `tenant_id` (see
        # app.core.tenant._resolve_tenant / DEFAULT_TENANT_ID), NOT the
        # Tenant table's own UUID primary key — match that convention here.
        tenant_id = tenant.subdomain

        existing_sub_castes = await session.execute(
            select(SubCaste.name_en).where(SubCaste.tenant_id == tenant_id)
        )
        existing_sub_caste_names = {row[0] for row in existing_sub_castes}
        sub_castes_added = 0
        for order, (name_hi, name_en) in enumerate(SUB_CASTES, start=1):
            if name_en in existing_sub_caste_names:
                continue
            session.add(
                SubCaste(tenant_id=tenant_id, name_hi=name_hi, name_en=name_en, display_order=order)
            )
            sub_castes_added += 1

        existing_gotras = await session.execute(
            select(Gotra.name_en).where(Gotra.tenant_id == tenant_id)
        )
        existing_gotra_names = {row[0] for row in existing_gotras}
        gotras_added = 0
        for name_hi, name_en in GOTRAS:
            if name_en in existing_gotra_names:
                continue
            session.add(Gotra(tenant_id=tenant_id, name_hi=name_hi, name_en=name_en))
            gotras_added += 1

        await session.commit()
        print(
            f"Seeded {sub_castes_added} sub-castes, {gotras_added} gotras for tenant {tenant_id!r}"
        )

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
