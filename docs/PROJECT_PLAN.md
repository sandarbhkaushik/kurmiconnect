# KurmiConnect — Project Plan

> Master planning document. Read this when context is needed about *why* and *what*. For *how to code*, see `/CLAUDE.md`.

---

## 1. Product overview

**Name:** KurmiConnect
**Type:** Mobile-first matrimony app for the Kurmi community in India
**Stage:** Pre-MVP, building phase
**Target launch:** 5 months from start
**Target users:** Kurmi community families in Tier 2/3 Indian cities (UP, Bihar, MP, Chhattisgarh, Maharashtra)
**Languages:** Hindi (default), English; Marathi in Phase 2

**One-line pitch (Hindi):** भरोसेमंद कुर्मी समाज का matrimony app — verified profiles, Featured Personalities, परिवार-अनुकूल।
**One-line pitch (English):** A trust-first Kurmi community matrimony app with verified profiles, editorial Featured Personalities, and family-friendly UX.

## 2. Why this exists (the moat)

The big matrimony apps (Shaadi, BharatMatrimony, Jeevansathi) cover Kurmi as a sub-category but:
- They're English-first; our users read Hindi
- They have a fake-profile problem (~99% complaints in Play Store reviews)
- They don't have sub-caste/gotra depth
- They don't have community-curated featured profiles
- Their pricing is built for Tier 1, not Tier 2/3 wallets

KurmiConnect wins on:
1. **Hindi-first UX** with full sub-caste + gotra granularity
2. **Trust via verification** (Aadhaar, education, employer, photo) — free, mandatory feel
3. **Featured Personalities** — editorial program of respected community members (doctors, IAS, engineers, farmers). Never paid. This is the cold-start anchor.
4. **Tier 2/3 pricing** — pay-per-contact (₹99/3 contacts) anchors low, then upsell to subscriptions
5. **Family-led UX** — every screen knows whether the user is creating profile for self or family

## 3. Business model

### Revenue streams (priority order)
1. **Pay-per-contact packs** — ₹99/3, ₹249/10, ₹499/25 (anchors the Tier 2/3 buyer)
2. **Subscription plans** — Silver ₹599/3mo, Gold ₹1,499/6mo (recommended), Platinum ₹3,499/12mo
3. **Add-ons** — 24h boost ₹99, Kundli report ₹199, Premium Kundli ₹599, Biodata PDF ₹199, Video intro ₹149
4. **Wedding services marketplace** (Phase 3) — commission from photographers, banquet halls, jewellers
5. **Local advertising** (Phase 3) — geo-targeted, district-level
6. **Offline marriage bureau partnerships** (Phase 4) — partner subscription + closure cut

### Featured Personality (the moat)
- **NOT a paid tier.** It's an editorial program with hand-picked, document-verified community members.
- Categories at launch: Civil Services, Doctors, Engineers, Academia, Business, Agriculture, Sports & Arts, Social Work
- Workflow: Nomination → Editorial review → Document verification → Approval → Publish → Time-bound (default 6 months) → Renewal
- Free for the person; admin-curated; revocable.
- The trust strip in-app: "Hand-verified by our editorial team. Never paid placement."

### Unit economics (target)
- ARPU: ₹800-1,200
- Paid conversion: 5-7%
- CAC (Tier 2/3 community): ₹50-150 (mostly organic + community channels)
- LTV: ₹1,500-3,000
- Gross margin: 75%+ (digital product, low marginal cost)

## 4. Stack (final, locked)

See `/CLAUDE.md` § "Stack" for the authoritative list.

Summary:
- **Mobile:** React Native + Expo
- **Admin:** React + Vite
- **Backend:** Python + FastAPI
- **DB:** PostgreSQL (single VPS, multi-tenant via `tenant_id`)
- **Auth + Push:** Firebase Auth + FCM (services only, not Firestore)
- **Storage:** Cloudflare R2
- **Search:** Postgres FTS at MVP, Meilisearch later
- **Host:** Hetzner CX22 (~₹350/month at launch)

**Total launch infrastructure cost:** ~₹1,700/month. Plus Claude Pro ₹1,700/month for development. **All-in ~₹3,400/month.**

## 5. Modules (13 total)

Each becomes a folder under `apps/api/app/modules/`. Detailed schema in `DATA_MODEL.md`.

| # | Module | What it does | Phase |
|---|---|---|---|
| 1 | Tenant | SaaS-ready multi-tenant config (community, branding, plans) | MVP |
| 2 | Auth | Phone OTP via Firebase + own JWT issuance + role-based access | MVP |
| 3 | Profile | The big one — basic, family, education, profession, lifestyle, horoscope, photos, preferences | MVP |
| 4 | Verification | Aadhaar, education, employer, photo verification workflows | MVP |
| 5 | Featured | Editorial nominate → review → publish → expire workflow | MVP |
| 6 | Match | Match score computation, daily suggestions, Today's matches | MVP |
| 7 | Interest | Send/accept/decline interest, chat unlock | MVP |
| 8 | Chat | WebSocket-based real-time chat with safety filters | MVP |
| 9 | Subscription | Plans, add-ons, contacts-used tracking, expiry | MVP |
| 10 | Payment | Razorpay integration, webhooks, refunds | MVP |
| 11 | Moderation | Photo moderation queue, content review | MVP |
| 12 | Report | User reports, abuse handling, block/ban | MVP |
| 13 | Notification | Push (FCM) + SMS (MSG91) + WhatsApp + in-app | MVP |

Phase 2 additions: CMS, Referral, Analytics, Biodata PDF generator, Kundli compute, Video intro.

## 6. Roadmap (5 months to MVP launch)

### Month 1: Foundation
**Week 1**
- Repo setup (monorepo with pnpm workspaces)
- Docker Compose for Postgres + Redis
- FastAPI bootstrap with health endpoint
- Expo app bootstrap, runs on Sandarbh's phone
- Admin React + Vite bootstrap, runs locally
- Firebase project created, Auth + FCM enabled
- Cloudflare R2 bucket + access keys
- This `PROJECT_PLAN.md` finalised, `CLAUDE.md` committed

**Week 2**
- Tenant module + multi-tenancy infrastructure (ContextVar, middleware, SQLAlchemy event listener)
- Auth module: Firebase token verification + own JWT issuance + role guard
- User table, basic CRUD
- Mobile: Splash, Language picker, Phone OTP screens working end-to-end with Firebase

**Week 3-4**
- Profile module: all 14 onboarding screens wired to API
- Photo upload to R2 with Sharp resize (thumb/medium/full)
- Profile builder state machine — save drafts, resume on app reopen
- Onboarding completion → Home screen

### Month 2: Discovery & match
**Week 5**
- Match module: match score algorithm v1 (community + age + location + education + manglik weights)
- Daily match cron via arq
- Home screen with Today's matches working
- Profile detail screen

**Week 6**
- Search module with Postgres FTS
- Advanced filters
- Search results screen

**Week 7-8**
- Featured Personality module: data model, admin nomination workflow
- Featured strip on home, Featured landing page, Featured detail screen
- Hand-collect 50 real Featured Personalities (parallel to dev — Sandarbh's offline work)

### Month 3: Interest, chat, verification
**Week 9**
- Interest module: send/accept/decline, mutual matches
- Interests screens (sent/received/accepted tabs)
- Shortlist

**Week 10**
- Chat module: FastAPI WebSocket gateway, message persistence
- Chat list, conversation screen
- Safety filters (phone number/UPI detection)

**Week 11-12**
- Verification module: Aadhaar (DigiLocker integration), education upload, employer upload
- Photo verification (selfie match)
- Verification center screen + verification queue admin screen

### Month 4: Monetization
**Week 13**
- Subscription module: plans, pay-per-contact packs
- Plans page, checkout flow
- Razorpay integration + webhooks

**Week 14**
- Add-ons: profile boost, biodata PDF generation
- Payment success/failure flows
- My subscription / order history

**Week 15-16**
- Admin: Dashboard, User list, User detail, Verification queue, Featured composer, Moderation queues, Reports, Payments, Plans, Broadcasts, Success Stories CMS

### Month 5: Polish & soft launch
**Week 17**
- Hindi localisation pass — every string in `hi.json`
- Error states, empty states, loading skeletons
- Onboarding tutorial
- Account settings, privacy settings, help & support

**Week 18**
- Performance pass (image lazy load, low-data mode, MMKV caching)
- Crashlytics + Sentry setup
- Internal QA on real phones (mid-range Android, patchy 4G simulation)

**Week 19**
- Soft launch to 3 districts: Kanpur Dehat, Nalanda, Bilaspur
- Distribute via WhatsApp groups + 1 community event
- 50 Featured Personalities published
- Daily monitoring + bug fixes

**Week 20**
- Iterate based on feedback
- Press release in 1-2 Hindi newspapers
- Plan Phase 2

## 7. The 76 screens

Full spec in `SCREENS.md`. Summary:

- **User app:** 52 screens in MVP, 14 in Phase 2 → 66 total
- **Admin panel:** 24 screens

Categories:
- Pre-auth (4)
- Onboarding & profile creation (16)
- Home & discovery (9)
- Interactions (7)
- Subscription & payments (6)
- Account & profile management (10)
- Engagement & trust (4)
- Safety (3)
- Phase 2 deferred (14)
- Admin (24)

## 8. The 7-feature MVP scope (Pareto cut)

If timeline slips, ship these 7 things first. Everything else can wait.

1. **Onboarding + profile creation** (14 steps with proper validation)
2. **Today's matches home screen**
3. **Search with sub-caste + district + age filters**
4. **Send & accept interest**
5. **Featured Personalities (with 50 launch profiles)**
6. **One subscription plan + pay-per-contact** (Gold ₹1,499 + ₹99/3 contacts)
7. **Aadhaar verification** (build user trust from day 1)

Everything in admin can be hacked via direct DB queries for the first 30 days post-launch if needed.

## 9. Data model summary

Full DDL in `DATA_MODEL.md`. Key tables (~25 total):

- `tenants` (multi-tenant root)
- `users`, `user_sessions`
- `profiles`, `profile_photos`, `profile_preferences`
- `sub_castes`, `gotras` (per-tenant lookup tables)
- `verifications`, `verification_documents`
- `featured_personalities`, `featured_categories`
- `matches`, `match_scores`
- `interests`, `shortlists`
- `chat_rooms`, `chat_messages`
- `plans`, `subscriptions`, `subscription_usage`
- `addons`, `payments`, `refunds`
- `coupons`, `coupon_usage`
- `reports`, `blocks`, `moderation_queue`
- `notifications`, `notification_templates`, `notification_logs`
- `success_stories`
- `referrals`, `wallet_transactions`
- `admin_users`, `admin_roles`, `audit_logs`
- `events` (analytics, append-only)

Every non-tenant table has `tenant_id UUID NOT NULL REFERENCES tenants(id)`.

## 10. API contract summary

Full spec in `API_CONTRACT.md`. Auto-generated from FastAPI's OpenAPI.

REST conventions:
- Base URL: `https://api.KurmiConnect.com/v1`
- Auth: `Authorization: Bearer <jwt>` header
- Tenant resolution: subdomain (`kurmi.KurmiConnect.com`) or `X-Tenant-Id` header
- Pagination: `?page=1&limit=20`, response includes `total`, `page`, `limit`, `has_more`
- Filtering: query params (`?sub_caste=Awadhia,Kanaujia&district=Lucknow`)
- Sorting: `?sort=-created_at` (minus = desc)
- Errors: `{error: {code: "PROFILE_NOT_FOUND", message: "...", details?: {}}}`

WebSocket:
- `/v1/ws/chat?token=<jwt>` — connect, receive presence + messages

## 11. Risks & how we'll handle them

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Solo dev burnout | High | High | Strict 7-feature MVP cut; Featured Personalities outreach in parallel to coding, not after |
| Fake profile invasion | Medium | High | Mandatory phone verification; encourage Aadhaar; AI photo moderation; report flow |
| Featured Personality program fails | Medium | High | Personal outreach by Sandarbh, leverage community connections; minimum 50 before launch |
| Razorpay KYC delays | Medium | Medium | Apply in Week 1, not Week 13 |
| Firebase Auth quota | Low | Medium | Free tier covers 10K OTP/month; MSG91 fallback ready |
| Hetzner outage | Low | High | Daily pg_dump to Hetzner Storage Box + monthly to R2 |
| Tier 2/3 users don't pay | Medium | High | Pay-per-contact ₹99 anchor; refund within 7 days no questions; UPI Autopay only with consent |
| Cold-start (empty app) | High | High | 50 Featured Personalities + 100 seeded real profiles before public launch |
| Legal: matrimony app regulations | Low | High | Consult lawyer on T&C, refund policy, data retention, IT Act compliance |

## 12. What "done" looks like (launch checklist)

- [ ] 50 Featured Personalities published with documents on file
- [ ] 100 seed profiles (relatives, community, paid testers) created
- [ ] All 7 MVP features working end-to-end on a real Android mid-range phone
- [ ] Hindi UI strings reviewed by a native speaker (not Sandarbh)
- [ ] Razorpay KYC approved, GST registered
- [ ] Privacy policy, T&C, refund policy live on website
- [ ] Crashlytics + Sentry receiving real events
- [ ] Daily DB backup verified by restore test
- [ ] WhatsApp Business number for support (`+91-XXXXX-XXXXX`)
- [ ] Soft-launch distribution plan: 3 districts, 5 WhatsApp groups, 1 community event
- [ ] Press release ready in Hindi for 1-2 newspapers

## 13. Where to find things

- This plan: `docs/PROJECT_PLAN.md`
- Coding rules: `/CLAUDE.md`
- Screens spec: `docs/SCREENS.md`
- Data model: `docs/DATA_MODEL.md`
- API contract: `docs/API_CONTRACT.md`
- Brand guidelines: `docs/BRAND.md`
- Decisions log (ADRs): `docs/decisions/`

## 14. Out of scope for MVP (deferred to Phase 2+)

- Video intro calls
- Kundli match report (computer-generated and astrologer-reviewed)
- Biodata PDF designer
- Wedding services marketplace
- Family co-account (multiple family members managing one profile)
- AI-assisted profile writing
- AI-powered match suggestions
- iOS app (Android-only at launch)
- Multi-tenant SaaS expansion to other communities

When tempted to scope-creep, remember: launch with 7 features in 5 months, not 76 features in 18 months.
