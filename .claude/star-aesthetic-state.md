# Star Aesthetic Centre — Project State Log
_Last updated: 2026-04-04 (session 5 — major admin panel session)_

---

## Current Phase
**Phase 3 — Backend Migration: Drop WordPress, go Supabase-native** (🔄 Near Complete)

---

## Git Status
- **Branch:** `main`
- **Last commit:** `7c3266b` — "Add Dr. Bangalee page, Contact, Legal pages, Skin Assessment & CTA"
- **Status:** Large amount of uncommitted work — commit before go-live

---

## Dev Server
- **Start command:** `cd "C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs"` then `npx next dev --port 3001`
- **Note:** `npm run dev:clean` broken — rimraf not installed globally. Always use npx command above.
- **Cache issue:** If 404s appear on treatment/shop pages, run `rmdir /s /q .next` then restart.

---

## Pages — Completed ✅

| Page | Route | Notes |
|---|---|---|
| Homepage | `/` | Hero, DoctorTrust, treatments grid, FeaturedProducts (now Supabase) |
| Dr. Rajeev Bangalee | `/dr-rajeev-bangalee` | SEO-rich, FAQs, credentials |
| Contact Us | `/contact` | Psychology-driven, testimonials, Google Map, FAQs |
| Privacy Policy | `/legal/privacy-policy` | POPIA-compliant |
| Terms & Conditions | `/legal/terms-and-conditions` | Full T&Cs |
| Returns Policy | `/legal/returns-policy` | Full returns, CPA rights |
| Skin Assessment | `/skin-assessment` | 13-step lead gen quiz |
| Shop brands | `/shop/brands/[brand]` | All 6 brands — **now Supabase-native** ✅ |
| Treatment pages | `/treatments/[category]/[slug]` | Multiple treatment detail pages |
| Cart | `/cart` | Full cart functionality |
| Checkout | `/checkout` | Checkout funnel |
| Order Confirmation | `/order-confirmation` | Post-purchase page |
| Book a Consultation | `/book` | 4-step booking wizard (Treatment → Date → Time → Details) |
| Admin Login | `/admin/login` | httpOnly cookie auth |
| Admin Products | `/admin/products` | Full product management for Nakita |
| Admin Product Edit | `/admin/products/[id]/edit` | Tabbed full editor (details/short desc/full desc) |
| Admin Treatments | `/admin/treatments` | Treatment list with active toggles |
| Admin Treatment Edit | `/admin/treatments/[slug]/edit` | Edit tagline, price, duration, downtime, active |

---

## Phase 3 Migration — Status

### Product Data (Supabase)
| Brand | Products | Images | Descriptions |
|---|---|---|---|
| Dermaceutic | ✅ 14 | ✅ in public/images | ✅ Excellent (from CSV) |
| Heliocare | ✅ 15 | ✅ in public/images + SQL seeded | ✅ All 15 descriptions done |
| ISDIN | ✅ 5 | ✅ in public/images + SQL seeded | ✅ All 5 descriptions done |
| Mesoestetic | ✅ 14 | ✅ in public/images + SQL seeded | ✅ All 14 descriptions done |
| NeoStrata | ✅ 27 (correct from Jan 2026 pricelist) | ⬜ needed | ✅ All 27 done (8-section template) |
| SkinCeuticals | ✅ 20 | 🔄 images in progress (Nakita) | ✅ Full + short descriptions done (emotional copy) |

### Shop Frontend
- ✅ `/shop/brands/[brand]` — rewired to Supabase (was WooGraphQL)
- ✅ `/shop/products/[slug]` — rewired to Supabase
- ✅ `FeaturedProducts` homepage section — rewired to Supabase (shows Dermaceutic)
- ✅ `SiteNav` Shop dropdown — all 6 brands linked
- ✅ `ProductImageGallery` — 1 primary + 3 thumbnails (grid-cols-4, fills full width)
- ✅ `brands.ts` — all 6 brands with full descriptions/whyWeStock text + subcategoryDescriptions
- ✅ All site images copied to `nextjs/public/images/` (logos, hero, treatments, Dr. Bangalee)
- ✅ Treatment pages → "Products for Your Journey" section (Phase D)
- ✅ Product pages → "Recommended for These Treatments" section (Phase E)
- ✅ Brand pages — subcategory grouping (NeoStrata ranges, SkinCeuticals pillars, etc.)

### Admin Panel (`/admin/*`) — Session 5 Build
- ✅ `components/admin/AdminHeader.tsx` — sticky navy header, Products|Treatments sub-nav, logout
- ✅ `app/admin/layout.tsx` — AdminHeader in layout, shared across all admin pages
- ✅ `app/admin/products/page.tsx` — server component, fetches 109 products
- ✅ `app/admin/products/ProductsClient.tsx` — inline price + stock edit, toggle, short desc modal, Full Edit link
- ✅ `app/admin/products/actions.ts` — toggleActive, updatePrice, updateStock, updateShortDesc, updateFullProduct
- ✅ `app/admin/products/[id]/edit/page.tsx` + `EditProductClient.tsx` — tabbed full editor
- ✅ `app/admin/treatments/page.tsx` — reads from Supabase, merges with JSON titles
- ✅ `app/admin/treatments/TreatmentsClient.tsx` — active toggle, Edit button, View ↗
- ✅ `app/admin/treatments/actions.ts` — toggleTreatmentActive, updateTreatmentMeta
- ✅ `app/admin/treatments/[slug]/edit/page.tsx` + `EditTreatmentClient.tsx` — edit tagline/price/duration/downtime/active

### Image Standard (CONFIRMED)
- `sort_order 0` = primary (product card + main display)
- `sort_order 1–3` = thumbnails (clickable below main image)
- `sort_order 4+` = lifestyle/description images (landscape gallery in product description)
- All images served from `public/images/` as `/images/filename.webp`
- Processing script: `scripts/process-product-images.mjs` — auto crop/resize/convert/compress

### Migration Steps
1. ✅ Create Supabase product tables
2. ✅ Import all 6 brand CSVs (109 products)
3. ✅ Set up Supabase Storage bucket + image seeding scripts
4. ✅ Rewire shop pages to Supabase
5. ✅ Build `/admin/*` for Nakita — full product + treatment management
6. ⬜ Integrate PayFast checkout (NOT Stripe — Stripe not supported in SA)
7. ⬜ Switch off LocalWP permanently

---

## SQL Scripts Still Needed (NOT YET RUN)

| File | Purpose | Status |
|---|---|---|
| `stock-quantity-migration.sql` | Add `stock_quantity` integer column to products | ✅ RUN 2026-04-04 |
| `treatment-meta-migration.sql` | Add `is_active, tagline, price_from, duration, downtime` to treatments | ⬜ **RUN THIS NEXT** |

---

## Known Data Issues (fix before go-live)

| Issue | Status |
|---|---|
| NeoStrata wrong products | ✅ Fixed — 27 correct products from Jan 2026 pricelist now live |
| SkinCeuticals placeholder images | ⚠️ 5 old `-800.jpg` records in product_images. Need cleanup SQL |
| NeoStrata images | ⬜ No images yet — source from neostrata.com or brand rep |
| SkinCeuticals images | 🔄 In progress (Nakita uploading) |
| NeoStrata descriptions | ✅ All 27 done — run 2026-04-04 |
| SkinCeuticals full descriptions | ✅ All 20 done — run 2026-04-04 |
| SkinCeuticals short_descriptions | ✅ Emotional rewrite done — 2026-04-04 |
| NeoStrata short_descriptions | ⚠️ Emotional rewrite still needed (currently ingredient lists) |
| Triple Lipid Restore bad images | ✅ fix-triple-lipid-images.sql run 2026-04-04 |
| Booking page said "Appointment" | ✅ Fixed to "Consultation" — 2026-04-04 |

---

## SQL Scripts Archive (in nextjs/scripts/output/)
| File | Purpose | Status |
|---|---|---|
| `dermaceutic-insert.sql` | 14 Dermaceutic products | ✅ Run |
| `heliocare-insert.sql` | 15 Heliocare products | ✅ Run |
| `isdin-insert.sql` | 5 ISDIN products | ✅ Run |
| `mesoestetic-insert.sql` | 14 Mesoestetic products | ✅ Run |
| `skinceuticals-insert.sql` | 20 SkinCeuticals products | ✅ Run |
| `update-image-urls.sql` | Dermaceutic/Heliocare image URLs | ✅ Run |
| `isdin-images-update.sql` | ISDIN images | ✅ Run |
| `mesoestetic-images.sql` | Mesoestetic images | ✅ Run |
| `fix-skinceuticals-names.sql` | Fixed "Neostrata" prefix in names | ✅ Run |
| `fix-skinceuticals-slugs.sql` | Fixed "neostrata-" prefix in slugs | ✅ Run |
| `neostrata-activate.sql` | Activate all NeoStrata products | ✅ Run |
| `heliocare-descriptions-update.sql` | All 15 Heliocare full descriptions | ✅ Run |
| `mesoestetic-descriptions-update.sql` | All 14 Mesoestetic full descriptions | ✅ Run |
| `phase-a-treatment-product-recommendations.sql` | Treatments table + 63 recommendation rows | ✅ Run |
| `isdin-descriptions-update.sql` | All 5 ISDIN full descriptions | ✅ Run |
| `neostrata-reimport.sql` | Replace 41 wrong products with 27 correct | ✅ Run |
| `skinceuticals-descriptions-update.sql` | All 20 SkinCeuticals full descriptions | ✅ Run |
| `neostrata-descriptions-update.sql` | All 27 NeoStrata full descriptions (8-section) | ✅ Run 2026-04-04 |
| `fix-triple-lipid-images.sql` | Remove 2 bad WhatsApp image entries | ✅ Run 2026-04-04 |
| `neostrata-subcategories.sql` | subcategory columns + assign all 27 NeoStrata | ✅ Run 2026-04-04 |
| `skinceuticals-subcategories.sql` | Assign 20 SkinCeuticals to 5 pillars | ✅ Run 2026-04-04 |
| `all-brands-subcategories.sql` | Subcategories for Dermaceutic/Heliocare/Mesoestetic | ✅ Run 2026-04-04 |
| `skinceuticals-short-descriptions-update.sql` | Emotional short descriptions for 20 SkinCeuticals | ✅ Run 2026-04-04 |
| `stock-quantity-migration.sql` | Add `stock_quantity` to products | ✅ Run 2026-04-04 |
| `treatment-meta-migration.sql` | Add editable fields to treatments table + seed | ✅ Run 2026-04-04 |

---

## Automation Scripts (in nextjs/scripts/)
| File | Purpose |
|---|---|
| `process-product-images.mjs` | Batch crop/resize/convert/compress images using Sharp |
| `copy-isdin-images.ps1` | Copy ISDIN images from E: drive to public/images |
| `copy-mesoestetic-images.ps1` | Copy Mesoestetic images from E: drive to public/images |

---

## Pages — Still To Build ❌

| Page | Route | Priority |
|---|---|---|
| About Star Aesthetic | `/about` | Medium — before go-live |

---

## Pending Polish (before go-live)

- ⬜ Fix email header: "Star Aesthetic Centre" (not "Medical Centre")
- ⬜ Fix hero text colour → `text-white`
- ⬜ Dr. Bangalee hero: 90vh, ALL CAPS name
- ⬜ Build `/about` page
- ⬜ Niki session email to Nakita via Resend
- ⬜ NeoStrata short descriptions — emotional rewrite (same as SkinCeuticals)
- ✅ Run `treatment-meta-migration.sql` in Supabase — done 2026-04-04

## Post-Launch Backlog

### Priority 1 — Rewards Programme ✅ BUILT 2026-04-07
- ✅ **Rate:** 10% on both treatments and products, rounded to nearest R10 (Math.round)
- ✅ `rewards-schema.sql` — `loyalty_accounts` + `rewards_ledger` tables (run in Supabase)
- ✅ `lib/utils/rewards.ts` — calculateReward(), formatRewardRands()
- ✅ `app/rewards/page.tsx` — public page: hero, how it works, earn table, calculator, balance checker
- ✅ `app/api/rewards/lookup/route.ts` — GET email → balance + recent ledger
- ✅ `app/admin/rewards/page.tsx` + `RewardsClient.tsx` + `actions.ts` — full Nakita panel
- ✅ Admin nav updated — Rewards tab added
- ⬜ **TODO:** Run `rewards-schema.sql` in Supabase
- ⬜ **TODO:** Link product checkout → auto-credit reward on purchase (when checkout built)
- ⬜ **TODO:** Add /rewards link to site nav + footer

### Priority 2 — Niki Chat/Voice Agent (Full)
- ⬜ Train Niki on ALL products (names, benefits, ingredients, use cases, pricing)
- ⬜ Train Niki to make appointment/treatment bookings
- ⬜ Niki handles incoming calls when Nakita is unavailable
- ⬜ Full OH (out-of-hours) handling — after-hours message + booking capture

### Priority 3 — Gift Vouchers
- ⬜ Denominations: R500, R750, R1,000
- ⬜ Shop product + redemption at checkout
- ⬜ **Mother's Day campaign — 11 May 2026** (second Sunday in May): email campaign via Resend
  - ⚡ 34 days away — campaign brief + email design needed by ~28 April

### Priority 4 — About Page + Contact Polish
- ⬜ `/about` — story, team, values, Dr. B credentials, clinic photos
- ⬜ Contact page final polish

### Priority 5 — Payment: Instant EFT + Banking Details
- ⬜ Add banking details to checkout (most banks now support Instant EFT)
- ⬜ Show banking icons on product detail pages (trust factor)
- ⬜ PayFast integration — Phase 2 (add later, easy to bolt on)

### Core Commerce Completion
- ⬜ **Delivery fees** — add to products / checkout flow
- ⬜ **Product ↔ Treatment links** — bidirectional (already partially done; audit + complete)
- ⬜ **Product testimonials** — pull from primary site until own reviews build up
- ⬜ **Booking engine sync** — FrontDesk appointment system ↔ website booking engine
- ⬜ **PayFast** — deferred to Phase 2

### SEO + AI Readiness Audit
- ⬜ Page-by-page audit: every page + every product checked against Google ranking factors + AI readiness checklist
- ⬜ Output: report card presentable to Dr. Bangalee and Nakita as proof of ranking readiness
- ⬜ Iterate on failing pages until they pass

### Phase B — Smart Search ("Find My Solution")
- ⬜ `/skin-concerns` — grid of concern tiles
- ⬜ `/concerns/[concern]` — filtered products + treatments
- ⬜ Smart search bar — Supabase full-text on name + short_description
- ⬜ "Build My Routine" quiz — 3-step selector → recommended routine

### Phase C — Glossary
- ⬜ `/glossary` page — full A–Z glossary
- ⬜ Link glossary terms inline throughout all product + treatment content

### Phase 2 — Growth
- ⬜ Product landing pages + offers + bundles (Sabri Suby 17-step)
- ⬜ Custom product videos
- ⬜ Social: Google My Business, Facebook
- ⬜ Reddit presence (boosts AI/SGE rankings — research confirmed)
- ⬜ **Industry Partners** `/partners` — Dr. B referral network
  - Concept: showcase partner practitioners/businesses who refer to Dr. Bangalee and vice versa
  - Each partner gets a profile card (logo, name, specialty, location, link)
  - Builds trust, local SEO, and mutual referral pipeline
  - **Need more detail from user** — ask about specific partners, categories, and what the referral flow looks like

---

## Brand Image Sourcing — Recommended Contacts
- Dermaceutic → Multichem / Gesundheit SA
- Heliocare → Cantabria Labs SA rep
- ISDIN → ISDIN SA distributor
- Mesoestetic → Mesoestetic SA rep
- NeoStrata → local pharma distributor
- SkinCeuticals → L'Oréal Professional Products SA

---

## Key Contacts / Business Info

| Field | Value |
|---|---|
| Practice | Star Aesthetic Centre (NOT "Medical Centre") |
| Doctor | Dr. Rajeev Bangalee (MB, BS · HPCSA registered) |
| Staff | Nakita (admin) |
| Address | 22 Ennisdale Drive, Durban North, 4051 |
| Phone | +27 (0)31 573 1325 |
| Email | info@staraesthetic.site |
| Hours | Mon–Fri 08:00–17:00 · Sat 08:00–13:00 |
| Supabase | kprfezokgsmbizisvcrb.supabase.co |

---

## Stack (confirmed)

- **Frontend:** Next.js 15 App Router · TypeScript · Tailwind v4 · shadcn/ui
- **Backend:** Supabase only (WordPress/WooCommerce dropped)
- **Payments:** PayFast (NOT Stripe — not available in SA)
- **Email:** Resend
- **Image processing:** Sharp (via scripts/process-product-images.mjs)
