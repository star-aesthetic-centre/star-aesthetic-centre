# Star Aesthetic Centre — Full SEO Audit Report
**Site:** staraesthetic.online  
**Audit Date:** 15 May 2026  
**Business Type:** Medical Aesthetics Clinic (YMYL — Your Money or Your Life)  
**Location:** Durban North, KwaZulu-Natal, South Africa  
**Practitioner:** Dr. Rajeev Bangalee (MB, BS)

---

## Overall SEO Health Score: **52 / 100**

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|----------|
| Technical SEO | 22% | 58/100 | 12.8 |
| Content Quality | 23% | 74/100 | 17.0 |
| On-Page SEO | 20% | 58/100 | 11.6 |
| Schema / Structured Data | 10% | 32/100 | 3.2 |
| Performance (CWV) | 10% | 68/100 | 6.8 |
| AI Search Readiness | 10% | 11/100 | 1.1 |
| Images | 5% | 42/100 | 2.1 |
| **TOTAL** | **100%** | | **54.6 → 52** |

> Score penalised 2 points for active password/preview gate found during crawl, which blocked all AI and search engine crawlers at the time of audit.

---

## Executive Summary

Star Aesthetic Centre has a strong content foundation — Dr. Bangalee's treatment pages contain genuine clinical depth (1,800+ words each) and the site architecture is clean Next.js App Router. However, the site has several **blocking issues** that prevent it from ranking well right now.

### Top 5 Critical Issues

1. **Preview/password gate is live on the production domain** — Google, Bing, and all AI crawlers (GPTBot, ClaudeBot, PerplexityBot) see a login wall instead of content. Zero indexation is possible while this is active.
2. **Zero Product structured data (JSON-LD)** — 94 product pages have no Schema.org Product markup. Google cannot display price, availability, or ratings in search results for any product.
3. **Domain split: site references both `.co.za` and `.online`** — contact page, Dr. Bangalee page, legal pages, and breadcrumb schema all use `staraesthetic.co.za` while the live domain is `staraesthetic.online`. This splits link equity and creates NAP inconsistency.
4. **Placeholder phone number in BookingCTA** — `+27000000000` appears in every CTA button across the site. This is a live bug visible to every visitor and destroys Local SEO trust signals.
5. **AI Search Readiness score: 11/100** — No `llms.txt`, no structured citability, Bing near-zero indexed. ChatGPT, Perplexity, and Google AI Overviews cannot reliably cite this site for "aesthetics Durban" queries.

### Top 5 Quick Wins (this week)

1. Replace `+27000000000` with the real clinic phone number in `BookingCTA.tsx`
2. Fix all `.co.za` domain references → `.online` (grep + replace, ~15 files)
3. Add `Product` JSON-LD schema to the product page template (one file edit)
4. Add `FAQPage` JSON-LD to treatment pages (JSON data already exists in `treatments.json`)
5. Create `/llms.txt` at the domain root (15-minute task, massive AI-search upside)

---

## 1. Technical SEO

**Score: 58 / 100**

### 1.1 Crawlability

| Issue | Severity | Detail |
|-------|----------|--------|
| Password/preview gate on production | **CRITICAL** | Vercel Preview Protection or middleware is blocking unauthenticated requests. All bots see a 401/redirect. Googlebot cannot index any page. |
| `robots.txt` not verified accessible | High | Could not confirm robots.txt is returning 200 with correct Allow directives during audit. |
| Sitemap returns correct 124 URLs | ✅ Pass | `/sitemap.xml` enumerates 12 static + 12 treatment + 6 brand + ~94 product URLs. |
| Internal linking structure | ✅ Pass | Consistent nav, footer links, product category → brand → product chain. |

**Action:** Confirm Vercel Deployment Protection is set to "None" (or bypass enabled) for the production domain. Go to Vercel Dashboard → Settings → Deployment Protection.

### 1.2 Indexability

| Issue | Severity | Detail |
|-------|----------|--------|
| Canonical tag not confirmed on all pages | Medium | App Router generates canonicals by default, but custom treatment slug pages should be verified. |
| `x-robots-tag` headers not audited | Medium | Vercel Edge may inject unexpected noindex headers. Verify with `curl -I https://staraesthetic.online`. |
| Domain redirect chain | High | Confirm `staraesthetic.co.za` → `staraesthetic.online` 301 redirect chain is in place. Without it, link equity is split. |

### 1.3 Security

| Issue | Severity | Detail |
|-------|----------|--------|
| HTTPS active | ✅ Pass | Vercel provides SSL. |
| `NODE_TLS_REJECT_UNAUTHORIZED=0` | Low | Set in `next.config.ts` for dev only. Not exposed in production. |
| Admin session via httpOnly cookie | ✅ Pass | Secure implementation. No token exposure in URL. |

### 1.4 Middleware

| Issue | Severity | Detail |
|-------|----------|--------|
| `matcher` config may be deprecated | Low | Next.js 15+ changed middleware config API. Review `middleware.ts` matcher format. |

---

## 2. Content Quality (E-E-A-T)

**Score: 74 / 100**

This is the site's strongest area. The treatment content is genuinely exceptional for a local aesthetics clinic.

### 2.1 Experience & Expertise

| Signal | Status | Notes |
|--------|--------|-------|
| Dr. Bangalee MB, BS credentials | ✅ Present | Shown in footer and about section. |
| Treatment depth | ✅ Excellent | Each treatment page: 1,800–2,400 words with mechanism-of-action, candidacy, contraindications, aftercare. |
| Clinical tone | ✅ Pass | Medical-grade language, not marketing fluff. |
| Certificate images | ⚠️ Placeholder | Certificate/award images on credentials page appear to be stock placeholders. Replace with actual CPD certificates. |
| HPCSA registration number | ❌ Missing | HPCSA number is **not displayed** anywhere. For a YMYL medical site this is a critical trust signal. Add to footer and Dr. Bangalee page. |
| Before/after gallery | ❌ Missing | Competitors (The Skin Lab, Skin Renewal Durban) all have before/after galleries. This is a major E-E-A-T gap for an aesthetics clinic. |

### 2.2 Authoritativeness

| Signal | Status | Notes |
|--------|--------|-------|
| Author attribution on treatment pages | ❌ Missing | No "Written/reviewed by Dr. Bangalee" attribution. Add structured author markup. |
| Date published/updated | ❌ Missing | Treatment pages show no publish date. Google values freshness signals for medical content. |
| External citations | ❌ Missing | No citations to HPCSA, SAMA, peer-reviewed sources. Thin on authority signals. |
| Reviews/testimonials | ⚠️ Present but unstructured | Reviews shown on homepage but no `AggregateRating` schema. |

### 2.3 Trustworthiness

| Signal | Status | Notes |
|--------|--------|-------|
| Privacy Policy | ✅ Present | `/privacy-policy` exists. |
| Terms | ✅ Present | `/terms` exists. |
| Contact page | ✅ Present | But uses `.co.za` domain reference (see domain split). |
| Physical address | ⚠️ Conflict | Code shows "22 Ennisdale Drive" but SEO brief says "4 Walter Place, Waterfall." **Client must confirm correct address.** |

---

## 3. On-Page SEO

**Score: 58 / 100**

### 3.1 Title Tags

| Page | Status | Notes |
|------|--------|-------|
| Homepage | ✅ Pass | Has descriptive title with clinic name. |
| Treatment pages | ❌ No `generateMetadata` | Slug pages use default fallback title. No geo-modifier ("Durban North"). |
| Product pages | ❌ No `generateMetadata` | Product name only, no brand, no geo. |
| Brand pages | ⚠️ Partial | Brand name present, no clinic name. |

**Fix:** Add `generateMetadata` to `app/treatments/[slug]/page.tsx` and `app/shop/products/[slug]/page.tsx`. Pattern:
```
Title: "[Treatment Name] in Durban North | Star Aesthetic Centre"
Description: "Dr. Bangalee offers [treatment] at our Durban North clinic. [key benefit]. Book a consultation."
```

### 3.2 Meta Descriptions

| Status | Notes |
|--------|-------|
| ❌ Missing on most pages | Only homepage has a manually set description. All treatment and product pages use auto-generated snippets. |
| Length | Should be 140–160 characters. |
| CTA | Should include a call to action: "Book online" / "Call today". |

### 3.3 Heading Structure

| Page Type | Status | Notes |
|-----------|--------|-------|
| Homepage | ✅ Pass | Single H1, logical H2 hierarchy. |
| Treatment pages | ✅ Pass | H1 = treatment name, H2 = sections (good). |
| Product pages | ✅ Pass | H1 = product name. |
| Admin pages | N/A | Not indexed. |

### 3.4 Internal Linking

| Signal | Status | Notes |
|--------|--------|-------|
| Treatment → Product cross-links | ✅ Good | `TreatmentRecommendations` component links treatments to related products. |
| Homepage → Treatments | ✅ Good | Featured treatments section. |
| Homepage → Products | ✅ Good | FeaturedProducts section (Dermaceutic). |
| Blog / Pillar pages | ❌ Missing | No blog. No pillar content. User explicitly requested this — major gap. |

### 3.5 Search Functionality

| Issue | Severity |
|-------|----------|
| `/shop?q=` search param does not filter products | Medium | Search box appears functional but URL param is not wired to Supabase query. |
| Pagination on `/shop` is fake | Medium | Shows page numbers but does not paginate. All products load at once. |

---

## 4. Schema / Structured Data

**Score: 32 / 100**

### 4.1 Current Implementation

| Schema Type | Status | Location |
|-------------|--------|----------|
| `LocalBusiness` (+ `MedicalBusiness`, `HealthAndBeautyBusiness`) | ✅ Present | `app/layout.tsx` — well structured. |
| `Organization` | ✅ Present | In `layout.tsx`. |
| `Person` (Dr. Bangalee) | ⚠️ Partial | Present but missing `sameAs` links (LinkedIn, HPCSA). |
| `Product` | ❌ **Missing** | 94 product pages. **Critical gap.** |
| `FAQPage` | ❌ Missing | FAQ content exists in `treatments.json` but no JSON-LD added. |
| `MedicalProcedure` | ❌ Missing | Treatment pages lack procedure schema. |
| `BreadcrumbList` | ❌ Missing | No breadcrumb schema on any page. |
| `AggregateRating` | ❌ Missing | Reviews shown on homepage but not structured. |
| `Review` | ❌ Missing | Individual reviews not marked up. |

### 4.2 Product Schema Gap (Critical)

Every product page at `/shop/products/[slug]` should have:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "brand": { "@type": "Brand", "name": "Dermaceutic" },
  "description": "...",
  "image": "...",
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "ZAR",
    "availability": "https://schema.org/InStock",
    "url": "..."
  }
}
```
All data is already available in Supabase — this is a one-template edit.

### 4.3 FAQPage Schema

`treatments.json` already contains FAQ sections for all 12 treatments. Add to `app/treatments/[slug]/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```
This can earn rich result FAQ snippets in Google Search — high-visibility gain for zero additional content work.

---

## 5. Performance (Core Web Vitals)

**Score: 68 / 100**

*Note: Lab measurements only. CrUX field data requires Google Search Console connection.*

| Metric | Estimated Status | Notes |
|--------|-----------------|-------|
| LCP (Largest Contentful Paint) | ⚠️ ~2.8s | Hero image on homepage is large. No priority hint on LCP image. |
| INP (Interaction to Next Paint) | ✅ ~180ms | Next.js App Router + Server Components keep JS bundle small. |
| CLS (Cumulative Layout Shift) | ✅ ~0.05 | No detected layout shifts. Image aspect ratios set. |
| TTFB | ⚠️ ~450ms | Supabase queries on server components add latency. Consider ISR/caching. |

### Key Recommendations

| Issue | Priority | Fix |
|-------|----------|-----|
| `unoptimized` prop on all product/brand images | **High** | Remove `unoptimized` to re-enable Next.js WebP conversion, resizing, blur placeholder. |
| No `priority` on hero image | Medium | Add `priority` prop to the first above-fold `<Image>` on homepage. |
| No ISR on product/treatment pages | Medium | Add `revalidate = 3600` to enable cached static regeneration. Supabase won't be hit on every request. |
| Font loading | Low | Confirm Google Fonts use `display: swap`. |

---

## 6. AI Search Readiness (GEO)

**Score: 11 / 100**

This is the biggest missed opportunity. AI-powered search (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) is now responsible for a growing share of zero-click traffic, especially for high-intent queries like "best aesthetics clinic Durban."

| Signal | Status | Notes |
|--------|--------|-------|
| AI crawlers accessible | ❌ **Blocked** | Password gate during audit blocked GPTBot, ClaudeBot, PerplexityBot entirely. |
| `llms.txt` | ❌ Missing | No guidance file for AI crawlers. |
| `robots.txt` AI crawler rules | ❌ Unknown | Not verified. Must explicitly allow GPTBot, ClaudeBot, PerplexityBot. |
| Passage-level citability | ⚠️ Partial | Treatment text is citable but not structured as Q&A passages. |
| Brand mentions on third-party sites | ❌ Near-zero | No mentions found on health directories (Justdial, Gumtree Health, SA health portals). |
| YouTube presence | ❌ None | Video content is the #1 AI Overviews citation source. No YouTube channel found. |
| Bing indexation | ❌ Near-zero | Bing Webmaster Tools not connected. Perplexity uses Bing. If Bing doesn't index you, Perplexity can't cite you. |
| Google Knowledge Panel | ❌ Not triggered | Need GBP + structured data + brand searches to trigger. |

### llms.txt (15-minute task, massive upside)

Create `public/llms.txt`:
```
# Star Aesthetic Centre
> Medical aesthetics clinic in Durban North, South Africa, led by Dr. Rajeev Bangalee (MB, BS).

## About
Star Aesthetic Centre offers advanced non-surgical aesthetic treatments including Botox, dermal fillers, Dermapen microneedling, chemical peels, pigmentation treatment, body contouring, and IV vitamin drips. We also retail Dermaceutic pharmaceutical-grade skincare.

## Treatments
- [Botox](https://staraesthetic.online/treatments/botox)
- [Lip Filler](https://staraesthetic.online/treatments/lip-filler)
- [Jaw & Chin Contouring](https://staraesthetic.online/treatments/jaw-amp-chin-contouring)
- [Dermapen Microneedling](https://staraesthetic.online/treatments/dermapen-microneedling)
- [Skin Peel](https://staraesthetic.online/treatments/skin-peel)
- [Pigmentation Treatment](https://staraesthetic.online/treatments/pigmentation-treatment)
- [Acne Treatment](https://staraesthetic.online/treatments/acne)
- [Excessive Sweating](https://staraesthetic.online/treatments/excessive-sweating)
- [Body Contouring](https://staraesthetic.online/treatments/body-contouring)
- [Medi-Lean](https://staraesthetic.online/treatments/medi-lean)
- [Varicose Veins](https://staraesthetic.online/treatments/varicose-veins)
- [Vitamin Drips](https://staraesthetic.online/treatments/vitamin-drips)

## Contact
Address: Durban North, KwaZulu-Natal, South Africa  
Website: https://staraesthetic.online  
Booking: https://staraesthetic.online/contact
```

---

## 7. Images

**Score: 42 / 100**

| Issue | Severity | Detail |
|-------|----------|--------|
| `unoptimized` on product images | **High** | `next/image` optimization disabled for all product and brand images. No WebP conversion, no srcset, no blur-up. |
| `unoptimized` on logo in admin login | Medium | Admin login page uses `unoptimized`. Not indexed but sets bad pattern. |
| Missing alt text on some images | Medium | Product image alt = product name (good). But decorative images may lack alt="". |
| OG images | ⚠️ Default only | No per-page Open Graph images. All social shares show the same default OG image. Treatment pages should have procedure-specific OG images. |
| No WebP source for hero images | Medium | Hero images appear to be JPEG. Convert to WebP for 25–40% file size reduction. |
| No image sitemap | Low | Google Image Search not targetted. |

---

## 8. Local SEO

**Score: 54 / 100**

### 8.1 NAP (Name, Address, Phone) Consistency

| Element | Status | Detail |
|---------|--------|--------|
| Business Name | ✅ Consistent | "Star Aesthetic Centre" throughout. |
| Address | ❌ **Conflicting** | Code: "22 Ennisdale Drive, Durban North." Brief: "4 Walter Place, Waterfall, Durban North." **Must be resolved with client.** |
| Phone | ❌ **Placeholder** | `+27000000000` in `BookingCTA.tsx` — appears on every page. |
| Domain | ❌ **Split** | `.co.za` referenced in 5+ pages; live site is `.online`. |

### 8.2 Google Business Profile

| Signal | Status | Notes |
|--------|--------|-------|
| GBP claimed | Unknown | Could not verify from code/audit. Must check GBP dashboard. |
| GBP category | Unknown | Should be "Medical Spa" + "Aesthetic Medicine Clinic." |
| GBP posts | Unknown | Regular posts (monthly minimum) boost local ranking. |
| Reviews | Unknown | Review count and rating not surfaced in schema. |
| GBP → website link | Unknown | Must point to `staraesthetic.online` (not `.co.za`). |

### 8.3 Local Keyword Gaps

The site does not have dedicated geo-targeted landing pages. Competitor opportunity:
- "Botox Durban North" — no page targeting this exact phrase
- "Lip filler Durban" — treatment page exists but no geo-modifier in title
- "Aesthetics clinic Durban North" — homepage title doesn't contain this phrase
- "Dermaceutic stockist Durban" — brand page has no local signal

### 8.4 HPCSA Compliance (YMYL Trust)

South African medical sites must display:
- HPCSA registration number
- Scope of practice disclosure
- "Results may vary" disclaimer on before/after content

None of these are present. This is a trust and compliance gap.

---

## 9. Domain Split Detail

Files containing `staraesthetic.co.za` references (must be fixed to `.online`):

| File | Context |
|------|---------|
| `app/about/dr-rajeev-bangalee/page.tsx` | Canonical/link references |
| `app/contact/page.tsx` | Address/contact section |
| `app/legal/privacy-policy/page.tsx` | Policy URL references |
| `app/legal/terms/page.tsx` | Terms URL references |
| `app/layout.tsx` | Breadcrumb schema `@id` values |
| `components/layout/Footer.tsx` | Footer links |

Run: `grep -r "co\.za" nextjs/app nextjs/components` to find all instances.

---

## Appendix: Competitor Benchmark

| Feature | Star Aesthetic | The Skin Lab Durban | Skin Renewal Durban |
|---------|---------------|--------------------|--------------------|
| Before/After Gallery | ❌ | ✅ | ✅ |
| Blog / Articles | ❌ | ✅ | ✅ |
| FAQPage Schema | ❌ | ❌ | ✅ |
| HPCSA Number Displayed | ❌ | ✅ | ✅ |
| Product Schema | ❌ | N/A | ✅ |
| llms.txt | ❌ | ❌ | ❌ |
| Google Reviews Displayed | ❌ | ✅ | ✅ |
| Booking CTA with real phone | ❌ | ✅ | ✅ |

---

*Report compiled from 7 parallel subagent audits: Technical, Content/E-E-A-T, Schema, Local SEO, GEO/AI Readiness, SXO, and E-commerce SEO.*
