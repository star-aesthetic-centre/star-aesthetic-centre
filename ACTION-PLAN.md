# Star Aesthetic Centre — SEO Action Plan
**Generated:** 15 May 2026  
**Overall Score:** 52/100  
**Target Score:** 78/100 (achievable in 60 days with below fixes)

---

## CRITICAL — Fix Immediately (blocks indexing)

### C1. Remove preview/password gate from production
**File:** Vercel Dashboard → Settings → Deployment Protection  
**What:** Set Deployment Protection to "None" (or "Only Preview Deployments")  
**Why:** Google, Bing, and every AI crawler currently sees a login wall. Zero organic traffic is possible while this is active.  
**Time:** 2 minutes

### C2. Fix placeholder phone number
**File:** `components/BookingCTA.tsx`  
**What:** Replace `+27000000000` with the real clinic phone number  
**Why:** Shows on every page. Destroys Local SEO trust. Real visitors can't call.  
**Time:** 5 minutes

### C3. Fix domain split (.co.za → .online)
**Files:** `app/about/dr-rajeev-bangalee/page.tsx`, `app/contact/page.tsx`, `app/legal/privacy-policy/page.tsx`, `app/legal/terms/page.tsx`, `app/layout.tsx`, `components/layout/Footer.tsx`  
**What:** Replace all `staraesthetic.co.za` references with `staraesthetic.online`  
**Run:** `grep -r "co\.za" app components` to find all occurrences  
**Why:** Splits link equity. Breaks NAP consistency for Local SEO.  
**Time:** 20 minutes

### C4. Confirm and fix address in all files
**Action:** Client to confirm: is the address "22 Ennisdale Drive, Durban North" or "4 Walter Place, Waterfall, Durban North"?  
**Files:** `app/contact/page.tsx`, `app/layout.tsx` (LocalBusiness schema), `components/layout/Footer.tsx`  
**Why:** Address mismatch destroys GBP trust and Local SEO rankings.  
**Time:** 10 minutes (after client confirms)

---

## HIGH — Fix This Week (significant ranking impact)

### H1. Add Product JSON-LD schema to product pages
**File:** `app/shop/products/[slug]/page.tsx`  
**What:** Add `<script type="application/ld+json">` block with Product schema  
**Data source:** Already available from Supabase (`product.name`, `product.price`, `product.description`, `product.images`)  
**Why:** 94 product pages have zero structured data. Google cannot show price/availability in search results. Competitors' products show rich snippets; yours don't.  
**Time:** 1 hour  
**Template:**
```tsx
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "brand": { "@type": "Brand", "name": product.brand },
  "description": product.description,
  "image": getPrimaryImage(product.images),
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "ZAR",
    "availability": "https://schema.org/InStock",
    "url": `https://staraesthetic.online/shop/products/${product.slug}`
  }
};
```

### H2. Add FAQPage schema to treatment pages
**File:** `app/treatments/[slug]/page.tsx`  
**Data source:** FAQ arrays already in `treatments.json` (confirmed present)  
**Why:** FAQ rich results appear as expandable Q&A directly in Google Search — free extra SERP real estate. High-value for medical queries.  
**Time:** 1 hour

### H3. Add `generateMetadata` to treatment pages with geo-modifiers
**File:** `app/treatments/[slug]/page.tsx`  
**Pattern:** `[Treatment Name] in Durban North | Star Aesthetic Centre`  
**Description pattern:** `Dr. Bangalee offers [treatment] at our Durban North clinic. [Key benefit]. Book a consultation today.`  
**Why:** Current title tag is probably the slug fallback. Every treatment page is missing a unique, keyword-optimised title.  
**Time:** 1.5 hours

### H4. Add `generateMetadata` to product pages
**File:** `app/shop/products/[slug]/page.tsx`  
**Pattern:** `[Product Name] — [Brand] | Buy Online | Star Aesthetic Centre`  
**Time:** 30 minutes

### H5. Remove `unoptimized` from all product/brand images
**Files:** Any component using `<Image ... unoptimized />`  
**What:** Remove the `unoptimized` prop to re-enable Next.js WebP conversion and responsive srcsets  
**Why:** Currently serving large JPEG/PNG files instead of optimised WebP. 25–40% page weight reduction expected.  
**Note:** Verify `next.config.ts` has the Supabase image hostname in `remotePatterns`. If images break after removing `unoptimized`, the domain just needs to be added there.  
**Time:** 30 minutes

### H6. Create `/llms.txt`
**File:** `public/llms.txt` (new file)  
**What:** Structured plain-text file describing the clinic for AI crawlers (ChatGPT, Perplexity, ClaudeBot)  
**Why:** AI Overviews score is 11/100. This single file is the fastest way to improve AI search citations with near-zero effort.  
**Time:** 15 minutes  
**Content template provided in FULL-AUDIT-REPORT.md Section 6**

### H7. Add HPCSA registration number to footer and Dr. Bangalee page
**Files:** `components/layout/Footer.tsx`, `app/about/dr-rajeev-bangalee/page.tsx`  
**Why:** YMYL medical site requirement. Google's quality raters check for professional credentials. Competitors display HPCSA numbers prominently.  
**Time:** 10 minutes (need client to provide the number)

### H8. Add Vercel environment variables for production
**What:** Add to Vercel Dashboard → Environment Variables:
- `ADMIN_USERNAME` = `nikita`
- `CRON_SECRET` = `star-cron-k33p4l1ve-2026`  
**Why:** These were set in `.env.local` (local only). Without them in Vercel, the admin login for Nikita won't work in production.  
**Time:** 5 minutes

---

## MEDIUM — Fix This Month (optimisation wins)

### M1. Add BreadcrumbList schema to all pages
**Files:** `app/layout.tsx` or per-page  
**What:** JSON-LD BreadcrumbList for every page  
**Why:** Breadcrumb rich results improve CTR and help Google understand site hierarchy.  
**Time:** 2 hours

### M2. Add `priority` prop to homepage hero image
**File:** `components/home/HeroSection.tsx` (or equivalent)  
**What:** `<Image priority ... />` on the first above-fold image  
**Why:** Improves LCP (Largest Contentful Paint) by preloading the hero image.  
**Time:** 5 minutes

### M3. Add Incremental Static Regeneration to product/treatment pages
**Files:** `app/shop/products/[slug]/page.tsx`, `app/treatments/[slug]/page.tsx`  
**What:** `export const revalidate = 3600;` (revalidate every hour)  
**Why:** Eliminates Supabase round-trip on every page request. Faster TTFB (~450ms → ~80ms). ISR pages are served from Vercel's edge cache.  
**Time:** 10 minutes

### M4. Fix search URL param wiring
**File:** `app/shop/page.tsx`  
**What:** Wire `?q=` URL parameter to a Supabase `ilike` filter  
**Why:** Search box exists but returns unfiltered results. Broken UX and missed keyword signals.  
**Time:** 2 hours

### M5. Fix fake pagination on /shop
**File:** `app/shop/page.tsx`  
**What:** Implement real pagination with `?page=` param and Supabase `.range()` query  
**Why:** All products load at once. As product catalogue grows this will become a performance problem.  
**Time:** 3 hours

### M6. Add author attribution and date to treatment pages
**File:** `app/treatments/[slug]/page.tsx`  
**What:** Visible "Reviewed by Dr. Rajeev Bangalee, MB, BS" + "Last updated: [date]" text  
**Why:** E-E-A-T signal. Google's quality rater guidelines explicitly value author expertise on medical content.  
**Time:** 1 hour

### M7. Add HPCSA/compliance disclaimer to treatment pages
**File:** `app/treatments/[slug]/page.tsx`  
**What:** Footer note: "Treatment results vary. All procedures performed by Dr. Rajeev Bangalee, HPCSA reg. [number]. Registered medical practitioner."  
**Why:** YMYL compliance. Legal protection.  
**Time:** 30 minutes

### M8. Add AggregateRating schema
**File:** `app/layout.tsx` (or homepage component)  
**What:** If reviews exist in Supabase or can be pulled from GBP, add `AggregateRating` to the `LocalBusiness` schema  
**Why:** Star ratings in local search results dramatically increase CTR.  
**Time:** 1 hour

---

## LOW — Backlog (strategic improvements)

### L1. Start a blog / Pillar Pages
**What:** Create `/blog` section with pillar articles:
- "Complete Guide to Botox in Durban North"
- "Dermaceutic Skincare: What Dr. Bangalee Recommends"
- "Non-Surgical Facelift Options: Fillers vs. Microneedling"
- "How to Choose an Aesthetics Clinic in South Africa"  
**Why:** Currently no blog. Competitors (Skin Renewal, The Skin Lab) rank for informational queries because they have educational content. Pillar pages build topical authority and feed internal links to treatment pages.  
**Time:** Ongoing — 1 pillar per month

### L2. Before/After Gallery
**What:** Secure patient-consented before/after image gallery, linked from treatment pages  
**Why:** Highest-converting content type for aesthetics clinics. Also a strong E-E-A-T signal.  
**Note:** Requires patient consent forms and HPCSA compliance.  
**Time:** 2 weeks (design + content)

### L3. Connect Bing Webmaster Tools
**What:** Submit sitemap to Bing Webmaster Tools  
**Why:** Perplexity AI uses Bing's index. If Bing doesn't index the site, Perplexity won't cite it.  
**Time:** 30 minutes

### L4. Connect Google Search Console
**What:** Verify `staraesthetic.online` in Google Search Console. Submit sitemap.  
**Why:** Monitor indexation, manual actions, and Core Web Vitals field data.  
**Time:** 20 minutes

### L5. Add `sameAs` to Person schema for Dr. Bangalee
**File:** `app/layout.tsx` or `app/about/dr-rajeev-bangalee/page.tsx`  
**What:** Add LinkedIn, HPCSA directory link, any medical association profiles  
**Why:** `sameAs` links help Google confirm identity and build Knowledge Graph entry.  
**Time:** 20 minutes

### L6. External citations and directory listings
**What:** Submit to:
- SA Medical Directory
- Justdial SA
- Gumtree Health (Durban)
- iDocs / Healtheon  
**Why:** Third-party mentions with consistent NAP boost both Local SEO and AI search citations.  
**Time:** 2 hours per directory

### L7. Image sitemap
**File:** `app/sitemap.ts`  
**What:** Add `<image:image>` entries for product and treatment images  
**Why:** Google Image Search can drive significant traffic for aesthetics-related queries.  
**Time:** 1 hour

### L8. YouTube channel
**What:** Create YouTube channel with 2-minute explainer videos per treatment  
**Why:** YouTube is the #1 source cited in Google AI Overviews for health queries. Video thumbnails also appear in Search.  
**Time:** Ongoing

---

## Priority Matrix

```
EFFORT LOW ←————————————→ EFFORT HIGH

IMPACT   C2 Fix phone (5 min)         H1 Product schema (1hr)
HIGH  │  C1 Remove gate (2 min)       H3 Treatment metadata (1.5hr)
      │  H6 llms.txt (15 min)         H2 FAQPage schema (1hr)
      │  C3 Domain split (20 min)     L1 Blog/Pillar pages
      │
IMPACT   H8 Vercel env vars (5 min)   M4 Fix search (2hr)
MED   │  H5 Remove unoptimized (30m)  M5 Real pagination (3hr)
      │  M2 Hero priority (5 min)     M1 BreadcrumbList (2hr)
      │  M3 ISR (10 min)
      │
IMPACT   H7 HPCSA number (10 min)     L2 Before/After gallery
LOW   │  L3 Bing Webmaster (30 min)   L8 YouTube
      │  L4 Google Search Console
```

---

## 60-Day Roadmap

### Week 1 (This Week)
- [ ] C1 Remove preview gate
- [ ] C2 Fix phone number
- [ ] C3 Fix domain split
- [ ] C4 Confirm correct address with client
- [ ] H8 Add env vars to Vercel
- [ ] H6 Create llms.txt
- [ ] H7 Get HPCSA number from Dr. Bangalee

### Week 2
- [ ] H1 Product JSON-LD schema
- [ ] H2 FAQPage schema on treatments
- [ ] H3 generateMetadata for treatment pages
- [ ] H4 generateMetadata for product pages
- [ ] H5 Remove `unoptimized` from images

### Week 3–4
- [ ] M2 Hero image priority
- [ ] M3 Add ISR to product/treatment pages
- [ ] M6 Author attribution on treatments
- [ ] M7 HPCSA disclaimer on treatments
- [ ] M8 AggregateRating schema
- [ ] L3 Connect Bing Webmaster Tools
- [ ] L4 Connect Google Search Console

### Month 2
- [ ] M1 BreadcrumbList schema
- [ ] M4 Fix search URL wiring
- [ ] M5 Real pagination
- [ ] L5 sameAs for Dr. Bangalee
- [ ] L1 First pillar page: "Botox in Durban North"
- [ ] L6 Submit to 3 local directories

---

*Expected score after Week 2 fixes: ~68/100*  
*Expected score after Month 2 roadmap: ~78/100*
