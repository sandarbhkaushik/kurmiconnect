# KurmiConnect — Claude Code Working Document

> This file is read by Claude Code at the start of every session. Keep it short, factual, and current. Project background and detailed plans live in `PROJECT_PLAN.md`.

---

## What this project is

A matrimony app for the Kurmi community in India, targeting Tier 2/3 cities. Solo developer (Sandarbh). Multi-tenant SaaS-ready from day 1.

## Stack (locked, do not switch without asking)

**Mobile:** React Native + Expo SDK 52 + expo-router + NativeWind + TanStack Query + Zustand + react-hook-form + Zod
**Admin:** React 19 + Vite + shadcn/ui + Tailwind + TanStack Router + TanStack Table + TanStack Query
**Backend:** Python 3.12 + FastAPI + SQLAlchemy 2.0 + Alembic + Pydantic v2 + arq (background jobs) + WebSockets (FastAPI native)
**DB:** PostgreSQL 16 (single instance, multi-tenant via `tenant_id` column)
**Cache + queue:** Redis 7
**Search:** Postgres full-text search at MVP; Meilisearch added at ~5K users
**Storage:** Cloudflare R2 (S3-compatible)
**Auth:** Firebase Auth for phone OTP; backend issues own JWT after Firebase token verification
**Push:** Firebase Cloud Messaging
**Crash + analytics:** Firebase Crashlytics + Firebase Analytics
**SMS fallback:** MSG91
**Payments:** Razorpay (UPI-first)
**Email:** Brevo free tier
**Hosting:** Single Hetzner CX22 VPS (Docker Compose), Cloudflare for CDN/DNS/SSL, Cloudflare Pages for admin SPA

## Folder structure

```
kurmi-matrimony/
├── apps/
│   ├── api/                  # FastAPI backend
│   │   ├── app/
│   │   │   ├── core/         # config, db, security, deps
│   │   │   ├── modules/      # business modules (one folder per module)
│   │   │   │   ├── auth/
│   │   │   │   ├── profile/
│   │   │   │   ├── match/
│   │   │   │   ├── interest/
│   │   │   │   ├── chat/
│   │   │   │   ├── subscription/
│   │   │   │   ├── payment/
│   │   │   │   ├── verification/
│   │   │   │   ├── featured/
│   │   │   │   ├── moderation/
│   │   │   │   ├── report/
│   │   │   │   ├── notification/
│   │   │   │   ├── tenant/
│   │   │   │   ├── cms/
│   │   │   │   ├── referral/
│   │   │   │   └── analytics/
│   │   │   ├── shared/       # cross-module helpers
│   │   │   └── main.py
│   │   ├── alembic/          # migrations
│   │   ├── tests/
│   │   ├── pyproject.toml
│   │   └── Dockerfile
│   ├── mobile/               # React Native + Expo
│   │   ├── app/              # expo-router screens
│   │   ├── components/
│   │   ├── lib/              # api client, auth, utils
│   │   ├── hooks/
│   │   ├── locales/          # i18n strings (hi, en)
│   │   └── package.json
│   └── admin/                # React + Vite
│       ├── src/
│       │   ├── routes/
│       │   ├── components/
│       │   ├── lib/
│       │   └── hooks/
│       └── package.json
├── packages/
│   └── shared-types/         # TypeScript types auto-generated from FastAPI OpenAPI
├── docs/
│   ├── PROJECT_PLAN.md       # the master plan (read this for context)
│   ├── SCREENS.md            # 76 screens spec
│   ├── API_CONTRACT.md       # endpoint list
│   └── DATA_MODEL.md         # schema reference
├── docker-compose.yml        # local dev infra (Postgres, Redis)
├── docker-compose.prod.yml   # production
└── README.md
```

## Module pattern in FastAPI

Every module under `app/modules/` follows the same structure:

```
modules/profile/
├── __init__.py
├── models.py          # SQLAlchemy ORM models
├── schemas.py         # Pydantic request/response schemas (also exported to TS)
├── repository.py      # DB queries (all queries here, never in routes)
├── service.py         # Business logic (all logic here, never in routes)
├── router.py          # FastAPI APIRouter, thin — calls service
├── dependencies.py    # FastAPI dependencies specific to this module
└── tests/
```

Routes are thin. Logic in `service.py`. Queries in `repository.py`. Validation in `schemas.py`. This separation is non-negotiable.

## Multi-tenancy rules (critical)

1. Every table EXCEPT `tenants` has a `tenant_id` column (UUID, NOT NULL, indexed).
2. The current tenant is resolved from the subdomain/header in middleware and stored in a `ContextVar`.
3. A SQLAlchemy event listener auto-filters every SELECT by `tenant_id`. No manual filtering in queries.
4. Every CREATE auto-sets `tenant_id` from context. Never trust client-sent `tenant_id`.
5. The dependency `get_current_tenant()` is injected into every route.
6. Cross-tenant queries are forbidden except for `super_admin` role with an explicit `with_all_tenants()` escape hatch.
7. Featured Personalities, Sub-castes, Gotras, Plans, Coupons — all tenant-scoped.

## Naming conventions

**Python:**
- snake_case for variables, functions, modules, files
- PascalCase for classes
- SCREAMING_SNAKE for constants
- Database tables: snake_case plural (`profiles`, `featured_personalities`)
- Columns: snake_case (`first_name`, `created_at`)
- Primary keys: `id` (UUID v7 for time-orderable)
- Foreign keys: `<table>_id` singular (`user_id`, `tenant_id`)
- Timestamps: `created_at`, `updated_at`, `deleted_at` (soft delete)
- Boolean columns: prefix with `is_` or `has_` (`is_verified`, `has_children`)

**TypeScript:**
- camelCase for variables, functions
- PascalCase for components, types, interfaces
- kebab-case for file names except components (PascalCase.tsx)
- Hooks start with `use`
- File-based routes follow expo-router and TanStack Router conventions

## Code rules

1. **Never write `# type: ignore` or `any` to silence errors.** Fix the type. If stuck, ask Sandarbh.
2. **No commented-out code in commits.** Delete or use git history.
3. **No console.log / print in committed code.** Use proper logger.
4. **Every endpoint has at least one happy-path test.**
5. **All user input validated via Pydantic (backend) and Zod (mobile/admin).** Schemas live in `schemas.py` (backend) and `lib/schemas/` (frontend).
6. **All money in paise (integer), never rupees (float).** ₹599 = 59900 paise in DB and API.
7. **All timestamps in UTC.** Convert at the edge for display.
8. **All phone numbers stored as `+91XXXXXXXXXX` (E.164).** Validate on input.
9. **All distances in kilometers, all heights in centimeters.** Convert at the edge.
10. **All error responses follow `{error: {code, message, details?}}` shape.**

## Things that are NOT allowed without asking

- Adding new dependencies (run `Sandarbh, can we add X?` first)
- Schema changes (always via Alembic migration, never raw SQL)
- New environment variables (add to `.env.example` simultaneously)
- Changes to authentication flow
- Changes to multi-tenant filtering logic
- Changes to payment webhook handling
- Changes that touch more than 5 files at once (split the PR)

## Things that are encouraged

- Refactoring duplicate code into `app/shared/`
- Adding tests for existing untested code
- Improving error messages
- Adding Hindi translations to `mobile/locales/hi.json`
- Updating `PROJECT_PLAN.md` with progress
- Suggesting better patterns (in chat, not as silent code change)

## Glossary (Kurmi community terms)

- **Gotra** — patrilineal clan, important for marriage compatibility (same gotra = same ancestor = forbidden marriage in tradition)
- **Sub-caste** — sub-grouping within Kurmi: 'Adil', 'Baghel', 'Bhonsle', 'Bhosle', 'Chandel', 'Chandnahu',
  'Chandra', 'Chandrahe', 'Chandrakar', 'Chandravanshi', 'Chandrawanshi',
  'Chaudhary', 'Chauhan', 'Chavan', 'Choudhary', 'Dayal', 'Gabel',
  'Gaharwar', 'Gangwar', 'Gowda', 'Jadhav', 'Jadon', 'Jaiswal',
  'Jaiswar', 'Kamma', 'Kanaujia', 'Kanbi', 'Kapu', 'Katiyar', 'Koeri',
  'Kulambi', 'Kulwadi', 'Kunbi', 'Kushwaha', 'Kutumbi', 'Mahanta',
  'Mahato', 'Mahto', 'Mandal', 'Mehta', 'Mohanta', 'More', 'Naidu',
  'Nirala', 'Niranjan', 'Patanwar', 'Patel', 'Patidar', 'Patil',
  'Pawar', 'Prajapati', 'Reddy', 'Sachan', 'Sahu', 'Singh', 'Singraur',
  'Sinha', 'Umrao', 'Verma', 'Vokkaliga'
- **Manglik** — astrological status based on Mars placement; matched in Kundli
- **Nakshatra** — birth star (27 total); used in Kundli matching
- **Rashi** — moon sign (12 total); derived from nakshatra
- **Kundli** — natal chart used for marriage compatibility
- **Featured Personality** — editorially curated, document-verified profile of a respected community member (doctor, IAS, engineer, FPO chair, etc.). Never paid placement. Free for the person, manual approval by admin.
- **Tier 2/3** — Indian cities outside the top 8 metros (Lucknow, Kanpur, Patna, Bhopal, Indore, Raipur, Bilaspur, etc.) where Kurmi population is concentrated

## Personas to keep in mind

1. **Sandarbh** (you, the dev/founder) — Angular dev, learning RN + FastAPI, solo
2. **Parent (Hindi-first)** — 50-year-old father in Kanpur creating profile for son, uses entry-level Android, patchy 4G, reads slowly. Cannot read English UI.
3. **Bride/Groom** — 25-year-old in same city, college-educated, can read both languages, uses app on parent's phone or own
4. **Featured Personality** — 28-year-old IAS officer, time-poor, profile created by family but verifies own credentials
5. **Admin team** — 1-2 people initially, you wear this hat. Later editorial + moderation team

## Commands you'll run often

```bash
# Local dev
docker compose up -d                    # start Postgres, Redis
cd apps/api && uvicorn app.main:app --reload --port 8000
cd apps/mobile && pnpm start
cd apps/admin && pnpm dev

# Migrations
cd apps/api && alembic revision --autogenerate -m "description"
cd apps/api && alembic upgrade head

# Tests
cd apps/api && pytest
cd apps/mobile && pnpm test
cd apps/admin && pnpm test

# Type generation (TS types from FastAPI OpenAPI)
cd apps/api && python -m app.scripts.export_openapi
cd packages/shared-types && pnpm generate
```

## When in doubt

- Read `docs/PROJECT_PLAN.md` for context
- Read `docs/SCREENS.md` for UI specs
- Read `docs/API_CONTRACT.md` for endpoint contracts
- Ask Sandarbh in chat before doing something risky
- Prefer boring solutions over clever ones (solo dev cannot afford complexity)
