# Star Aesthetic Centre — Project State Log
_Last updated: 2026-03-20_

---

## Current Phase
**Phase 2 — Core Pages & Lead Generation** (🔄 In progress)

---

## Git Status
- **Branch:** `main`
- **Remote:** `https://github.com/ignatiusack/star-aesthetic-centre.git`
- **Last commit:** `7c3266b` — "Add Dr. Bangalee page, Contact, Legal pages, Skin Assessment & CTA"
- **Status:** Clean — all work committed & pushed ✅

---

## Pages — Completed ✅

| Page | Route | Notes |
|---|---|---|
| Homepage | `/` | Hero, DoctorTrust, treatments grid, SkinAssessmentCTA, shop brands |
| Dr. Rajeev Bangalee | `/dr-rajeev-bangalee` | SEO-rich, FAQs, credentials, cross-links, dummy cert placeholders |
| Contact Us | `/contact` | Psychology-driven, testimonials, Google Map, FAQs, WhatsApp CTA |
| Privacy Policy | `/legal/privacy-policy` | POPIA-compliant, sidebar TOC |
| Terms & Conditions | `/legal/terms-and-conditions` | Full T&Cs incl. booking/cancellation |
| Returns Policy | `/legal/returns-policy` | Full returns, CPA rights, all conditions |
| Skin Assessment | `/skin-assessment` | 13-step lead gen quiz, dynamic results, email gate |
| Shop (all brands) | `/shop/brands/[brand]` | Dermaceutic, Heliocare, ISDIN, Mesoestetic, NeoStrata, SkinCeuticals |
| Treatment pages | `/treatments/[category]/[slug]` | Multiple treatment detail pages |
| Cart | `/cart` | Full cart functionality |
| Checkout | `/checkout` | Checkout funnel |
| Order Confirmation | `/order-confirmation` | Post-purchase page |

---

## Pages — Still To Build ❌

| Page | Route | Priority | Notes |
|---|---|---|---|
| About Star Aesthetic | `/about` | Medium | Practice story, team, clinic photos |
| Nikita's profile | `/nikita` or within about | Low | Staff profile |
| Individual treatment pages | Various | High | Many stubs need full content |
| Blog / Insights | `/blog` | Low | Future phase |
| Booking page | `/book` | High | Link to booking system |

---

## Components — Completed ✅

| Component | File | Notes |
|---|---|---|
| Site navigation | `components/layout/SiteNav.tsx` | Dropdowns for Treatments & Shop |
| Footer | `components/layout/Footer.tsx` | All legal links, correct treatment URLs |
| Hero section | `components/home/HeroSection.tsx` | Full-screen, stats bar |
| Doctor Trust | `components/home/DoctorTrust.tsx` | Homepage trust section |
| Skin Assessment CTA | `components/home/SkinAssessmentCTA.tsx` | Bold dark CTA block on homepage |
| Contact Form | `app/contact/ContactForm.tsx` | Client component, 5 fields, success state |
| Assessment Flow | `app/skin-assessment/AssessmentFlow.tsx` | Multi-step quiz, 13 steps, dynamic results |

---

## Known Issues / To Fix 🔧

| Issue | Status | Notes |
|---|---|---|
| Hero text colour (`text-[#E8EDF7]`) too dark on navy | ⚠️ Partial | Discussed but not yet changed to `text-white` — do this next session |
| Dr. Bangalee hero height | ⚠️ Pending | Reduce to 90–95vh, match homepage hero height |
| Dr. Bangalee name — all caps, one line | ⚠️ Pending | User requested ALL CAPS in single line |
| Page title `/dr-rajeev-bangalee` | ⚠️ Discuss | Keep as "Dr. Rajeev Bangalee" not "About Dr. Rajeev" — reserve "About" for clinic page |
| Google Maps — not showing as "Star Aesthetic Centre" | ⚠️ External | Google Business Profile needs to be claimed/verified |
| Hook feedback "[Preview Required]" message | ⚠️ Unresolved | Source not found — not in hookify local.md files, not in settings |
| Navbar Shop dropdown URLs | ✅ Fixed | `/shop/brands/dermaceutic` etc. all correct |

---

## Skin Assessment — Structure Agreed

**Part 1 — Contact capture** (name, email required · phone optional)

**Part 2 — About You** (personal profile):
1. Photo upload (optional)
2. Age range
3. Approximate weight / body type (optional / sensitive)
4. Current products in use
5. Previous professional/medical advice (yes/no + when)
6. Products recommended at that time
7. Why did / didn't you continue with those recommendations

**Part 3 — Skincare Best Practices** (10 scored yes/no questions)
- SPF daily, double cleanse, Vitamin C, retinol, sleep, water, smoke-free, etc.
- *Note: framed for people who may never have used products — don't assume*

**Part 4 — 5 Qualifying questions**
- Current situation · desired outcome (90 days) · obstacle · preferred solution · open box

**Dynamic results:** 3 tiers based on score — consultation CTA / treatment recommendation / content only

**Status:** Initial version built. Part 2 restructure agreed but NOT YET implemented in code.

---

## Lead Generation Strategy — Agreed Direction

- **One master assessment first** (`/skin-assessment`) — "Your Skin Health Score"
- Build natively in Next.js (no ScoreApp SaaS fee, on own domain for SEO)
- Homepage CTA block added (`SkinAssessmentCTA` component)
- ScoreApp video watched & framework understood — applying to aesthetic context
- **Phase 2:** Consider category-specific assessments once master is proven

---

## Design System (confirmed)

| Token | Value |
|---|---|
| Background | `#FFFFFF` |
| Surface | `#F8F8F7` |
| Surface raised | `#F2F1EF` |
| Border | `#E5E4E0` |
| Text primary | `#1A1917` |
| Text secondary | `#6B6966` |
| Accent gold | `#C8A882` |
| Accent dark | `#A08060` |
| Navy primary | `#0F2647` |
| Navy mid | `#1B3D6E` |
| Slate accent | `#939EBA` |

---

## Stack (confirmed)

- **Frontend:** Next.js 15 App Router · TypeScript · Tailwind v4 · shadcn/ui · TanStack Query
- **Backend:** LocalWP — WordPress + WooCommerce + WPGraphQL + WooGraphQL
- **Dev server:** `localhost:3001`
- **TypeScript:** Zero errors maintained throughout ✅

---

## Key Contacts / Business Info

| Field | Value |
|---|---|
| Practice | Star Aesthetic Medical Centre |
| Doctor | Dr. Rajeev Bangalee (MB, BS · HPCSA registered) |
| Staff | Nikita (to be profiled) |
| Address | 22 Ennisdale Drive, Durban North, 4051 |
| Phone | +27 (0)31 573 1325 |
| Email | info@staraesthetic.site |
| Hours | Mon–Fri 08:00–17:00 · Sat 08:00–13:00 |

---

## Niki Voice Agent — Completed ✅ (2026-03-20)

| Feature | Status | Notes |
|---|---|---|
| Gemini Live API connection | ✅ | Model: `gemini-2.5-flash-native-audio-preview-12-2025` (expires ~Mar 19 → swap to `gemini-live-2.5-flash-native-audio` when available) |
| Real-time voice (bi-directional) | ✅ | Aoede voice, audio transcription both sides |
| Context-aware per treatment page | ✅ | System prompt includes treatment name |
| Supabase session storage | ✅ | `niki_sessions` table — transcript, contact, duration, treatment page |
| Contact extraction from transcript | ✅ | Regex-based — phone, email, name from Niki's confirmed values |
| Phone/email confirmation by Niki | ✅ | Niki repeats back and confirms before ending |
| Double/triple digit handling | ✅ | "double nine" = 99, "triple eight" = 888 etc. |
| Dr. Bangalee = male pronouns | ✅ | System prompt |
| Price pronunciation (Rand) | ✅ | "3500 Rand" not "R 3500" |
| API key proxy | ✅ | `/api/gemini-token` — key never exposed to browser |
| Email to Nikita | 🔲 Phase 3 | Resend integration — not yet built |
| Return visitor recognition | 🔲 Phase 4 | Cookie → Supabase lookup → inject prior context into system prompt |

**Supabase project:** `star-aesthetic-centre` (kprfezokgsmbizisvcrb.supabase.co)
**Keys location:** `.env.local` — `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `GEMINI_API_KEY`

---

## Booking Engine — Next Build 🔲

**Decision:** Custom-built (not SSA plugin — $99/yr too expensive)
**Stack:** Next.js `/book` page + Supabase `bookings` table + Resend email confirmations
**Appointment types:** 13 total (12 treatments + Free 15-min Assessment)
**Availability:** Mon–Fri 09:00–17:00 (last slot 16:00) · Sat 09:00–13:00 (last slot 12:00)
**Calendar:** 1 only — Dr. Bangalee
**HealthBridge:** Clinic uses HealthBridge for consultation room — check if API/iCal sync is possible before building to avoid double bookings

---

## Treatment Pages — Polish Done ✅ (2026-03-20)

- Full stops added to all `suitableFor`, `howWorks`, FAQ answer fields
- `&amp;` HTML entities replaced with `&`
- `downtimeDetail` now renders **bold** markdown correctly (RichText)
- "Ready to start?" heading now `text-white` on dark navy
- `ResultsTimeline` component: visual dot-and-line timeline for expectedResults
- Jaw & Chin Contouring entity fix applied

---

## Next Session — Suggested Priorities

1. 🏗️ **Build custom booking engine** — `/book` page, Supabase `bookings` table, availability logic, email confirmations
2. 🔍 **Check HealthBridge API** — does it support iCal or webhook sync to avoid double bookings?
3. 📧 **Resend email** — wire up Nikita email alert when Niki session ends (Phase 3)
4. ✏️ Fix hero text colour (homepage + Dr. Bangalee page) → `text-white`
5. ✏️ Dr. Bangalee hero: reduce height to 90vh, ALL CAPS single line name
6. 🏗️ Build `/about` page for Star Aesthetic Centre
