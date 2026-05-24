# Claude Code — First Session Handover Prompt

Paste this as your **very first message** to Claude Code after running `claude` in your empty project folder.

---

```
Hi Claude. You are joining a solo-developer project as my coding partner. Read this entire message before doing anything.

## Project: KurmiConnect
A Hindi-first matrimony app for the Kurmi community in India, targeting Tier 2/3 cities. Solo developer (me, Sandarbh — Angular dev with 5+ years experience, learning React Native and FastAPI for this project). Multi-tenant SaaS-ready from day 1.

## Your job in this session
Set up the initial monorepo scaffold. Nothing more, nothing less.

## Locked stack (do not suggest alternatives)
- Mobile: React Native + Expo SDK 52 + expo-router + NativeWind + TanStack Query + Zustand + react-hook-form + Zod
- Admin: React 19 + Vite + shadcn/ui + Tailwind + TanStack Router + TanStack Table + TanStack Query
- Backend: Python 3.12 + FastAPI + SQLAlchemy 2.0 + Alembic + Pydantic v2 + arq (jobs) + FastAPI WebSockets
- DB: PostgreSQL 16 (single instance, multi-tenant via tenant_id)
- Cache + queue: Redis 7
- Search: Postgres full-text search at MVP
- Storage: Cloudflare R2 (S3-compatible API via boto3)
- Auth: Firebase Auth for OTP, backend issues own JWT
- Push: Firebase Cloud Messaging
- SMS fallback: MSG91
- Payments: Razorpay
- Host: Hetzner CX22 with Docker Compose

## Working principles
1. Boring solutions over clever ones — I am solo and cannot afford complexity
2. Multi-tenancy: every non-tenant table has tenant_id UUID NOT NULL; SQLAlchemy event listener filters all SELECTs automatically
3. Module structure in FastAPI: every module under app/modules/<name>/ has models.py, schemas.py, repository.py, service.py, router.py, dependencies.py, tests/
4. Routes are thin. Logic in service. Queries in repository.
5. Money in paise (integer), timestamps in UTC, phone in E.164 (+91XXXXXXXXXX)
6. No commented-out code, no print/console.log in commits, no `any` or `# type: ignore`
7. Ask before adding new dependencies, changing schemas, changing auth, or touching > 5 files at once

## What I need you to do RIGHT NOW (in this exact order)

### Step 1 — Create the monorepo skeleton
Create these folders (empty, with .gitkeep where needed):

```
kurmi-matrimony/
├── apps/
│   ├── api/
│   ├── mobile/
│   └── admin/
├── packages/
│   └── shared-types/
├── docs/
│   └── decisions/
└── scripts/
```

### Step 2 — Create the foundational files
Create these files with the content I'll paste in follow-up messages:
- /CLAUDE.md (working document)
- /docs/PROJECT_PLAN.md (master plan)
- /pnpm-workspace.yaml
- /package.json (root, workspace orchestrator)
- /.gitignore (Python + Node + macOS + IDE)
- /.editorconfig
- /README.md (project intro)
- /LICENSE (MIT for now)

I will paste CLAUDE.md and PROJECT_PLAN.md content right after you confirm setup. Wait for that.

### Step 3 — Set up docker-compose.yml for local dev
Postgres 16, Redis 7, exposed on localhost. Use a named volume so data survives container restarts. Use environment variables loaded from .env. Also create .env.example with all keys.

### Step 4 — Scaffold the FastAPI backend (apps/api/)
- Use pyproject.toml (not requirements.txt) with uv as the package manager
- Python 3.12
- Install: fastapi, uvicorn[standard], sqlalchemy[asyncio], asyncpg, alembic, pydantic, pydantic-settings, python-jose[cryptography], passlib[bcrypt], firebase-admin, redis, arq, boto3, razorpay, python-multipart, httpx, pillow, structlog
- Dev deps: pytest, pytest-asyncio, httpx, ruff, mypy
- Folder structure:
  ```
  apps/api/
  ├── app/
  │   ├── __init__.py
  │   ├── main.py            # FastAPI app, middleware, routers
  │   ├── core/
  │   │   ├── config.py      # Pydantic settings
  │   │   ├── db.py          # SQLAlchemy engine, session, base
  │   │   ├── security.py    # JWT, Firebase token verify
  │   │   ├── tenant.py      # ContextVar, middleware, event listener
  │   │   ├── logging.py     # structlog setup
  │   │   └── deps.py        # common FastAPI dependencies
  │   ├── modules/
  │   │   └── health/
  │   │       ├── __init__.py
  │   │       └── router.py  # /health endpoint
  │   └── shared/
  │       └── __init__.py
  ├── alembic/
  ├── tests/
  ├── alembic.ini
  ├── pyproject.toml
  ├── Dockerfile
  ├── .env.example
  └── README.md
  ```
- main.py should: load config, set up structlog, mount tenant middleware (placeholder), include the health router, expose /v1/health returning {status: "ok", version, timestamp}
- Run alembic init alembic and set it up for async SQLAlchemy
- No models yet — we will add them per module

### Step 5 — Scaffold the Expo mobile app (apps/mobile/)
- `npx create-expo-app@latest mobile --template default --no-install` (we will install with pnpm)
- Add expo-router, NativeWind v4, TanStack Query, Zustand, react-hook-form, @hookform/resolvers, zod, react-native-mmkv, expo-image, expo-localization, i18next, react-i18next, expo-notifications, @react-native-firebase/app, @react-native-firebase/auth, @react-native-firebase/messaging, @react-native-firebase/crashlytics, lucide-react-native
- Configure tailwind.config.js + babel.config.js for NativeWind
- Set up app folder for expo-router with a placeholder index.tsx that just shows "KurmiConnect — coming soon"
- Set up locales/hi.json and locales/en.json with one test string each
- Create lib/api.ts (axios client with base URL from env)
- Create lib/auth.ts (firebase auth init + helpers)
- Create app.json with proper bundle ID com.KurmiConnect.app

### Step 6 — Scaffold the React admin (apps/admin/)
- `pnpm create vite@latest admin --template react-ts`
- Add: tailwindcss, postcss, autoprefixer, @tanstack/react-query, @tanstack/react-router, @tanstack/react-table, react-hook-form, zod, @hookform/resolvers, recharts, date-fns, lucide-react, axios
- Initialize shadcn/ui (`pnpm dlx shadcn@latest init`) with our brand colors:
  - primary: amber-600 (#D97706)
  - accent: amber-900 (#7C2D12)
  - radius: 0.75rem
- Set up TanStack Router with a placeholder /login and /dashboard route
- Create lib/api.ts (axios client)

### Step 7 — Set up the shared-types package (packages/shared-types/)
- package.json with name "@kurmi/shared-types"
- Will eventually be auto-generated from FastAPI OpenAPI; for now just an index.ts exporting a placeholder type

### Step 8 — Create scripts/dev.sh
A bash script that:
1. Starts docker-compose
2. Runs alembic migrations
3. Opens 3 terminals (or instructs to) for api, mobile, admin

### Step 9 — Commit
Initialize git, .gitignore properly, then make a single initial commit: "chore: initial monorepo scaffold"

## When you are done with Step 9
Print a summary to me with:
- What was created (file tree, depth 3)
- Any deviations from the plan and why
- The exact commands I should run next to start development

DO NOT:
- Start implementing modules beyond health
- Add features I did not ask for
- Suggest stack changes
- Skip steps or reorder them
- Run any commands beyond what's needed for scaffolding

Confirm you have read and understood by replying with "Understood. Starting Step 1." and then proceeding silently through the steps. Show me file diffs as you create them.
```

---

## Then, paste these two follow-ups in sequence

**Follow-up 1 — paste the entire content of `CLAUDE.md`** with a header:
```
Here is the content for /CLAUDE.md — write this file exactly:

[paste full CLAUDE.md here]
```

**Follow-up 2 — paste the entire content of `PROJECT_PLAN.md`** with a header:
```
Here is the content for /docs/PROJECT_PLAN.md — write this file exactly:

[paste full PROJECT_PLAN.md here]
```

---

## What happens next

After Claude Code finishes Step 9, your second session looks like:

```
Open Claude Code in the project root again. It will read CLAUDE.md and PROJECT_PLAN.md automatically.

Then say:

"Today we build the Tenant module + multi-tenancy infrastructure. Follow the multi-tenancy rules in CLAUDE.md exactly. Do these tasks in order:

1. Create the tenants table model in app/modules/tenant/models.py
2. Create the Pydantic schemas in schemas.py
3. Create repository.py with get_by_subdomain and create methods
4. Create service.py with the business logic
5. Create router.py with admin endpoints (POST /v1/admin/tenants, GET /v1/admin/tenants, GET /v1/admin/tenants/{id})
6. Create app/core/tenant.py with the ContextVar, FastAPI middleware that resolves tenant from subdomain OR X-Tenant-Id header, and the SQLAlchemy event listener
7. Generate the Alembic migration: alembic revision --autogenerate -m 'create tenants table'
8. Run the migration
9. Write tests in tests/test_tenant.py covering: create, get, multi-tenant isolation
10. Run tests, all pass

Seed a default tenant with subdomain 'kurmi' so all subsequent local dev uses it."
```

And so on, one module at a time, in the order from PROJECT_PLAN.md § Roadmap.

## Tips for working with Claude Code on this project

1. **One module per session.** Don't ask for "build all of profile + matching + chat". Solo dev attention is finite; PR-sized chunks are reviewable.

2. **Always end with tests + a migration.** "Now write tests for what you just did" should be the last line of every coding session.

3. **When something feels off, stop and check.** If Claude Code is going down a path that doesn't match `CLAUDE.md`, paste the relevant section back and say "this violates rule X, please redo".

4. **Update PROJECT_PLAN.md weekly.** Mark roadmap items as done. Add new learnings to CLAUDE.md.

5. **Commit per module, not per file.** `git add modules/profile/ && git commit -m "feat(profile): create + update + photo upload"`.

6. **Use Claude.ai (this chat) for architecture and review.** Use Claude Code for the actual building. Don't mix them — they have different jobs.
