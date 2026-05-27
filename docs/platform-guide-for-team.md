# Star Aesthetic Centre — Platform Guide  
## For Nakita, Dr Bangalee & the leadership team

*A living document — May 2026*  
*Companion to the new website at **staraesthetic.online** (and **staraesthetic.co.za**)*

---

## A letter to start

Dear Nakita and Dr Bangalee,

For five years you had a website. Patients found you. The clinic grew. But the site was largely a brochure — beautiful, trustworthy, yet passive. It waited for people to call.

What you have now is different. It is a **business engine**: shop, bookings, rewards, intelligent follow-up, and **Niki** — a voice consultant who can explain treatments and products in plain language, capture interest, and (in the next phase) walk someone through the entire journey as if you were beside them.

This guide is not a technical manual. It is your **map of opportunity** — what exists today, why it was built, how it earns revenue, and how Niki can become the friendly face that introduces it all. Read it once. Then open the site, click Niki, and explore together.

The ambition is simple and bold: over the next five years, **Star Aesthetic becomes a household name in KwaZulu-Natal and beyond** — known for Dr Bangalee’s clinical excellence *and* as a **trusted destination for medical-grade skincare online**, with Durban North as the heart and the website as the front door that never closes.

You are not late to e-commerce. You are early to doing it *properly* in aesthetics.

With admiration,  
*The platform team*

---

## Part 1 — The five-year vision

### Where we are heading

| Horizon | Clinical (clinic) | Digital (website) |
|--------|-------------------|-------------------|
| **Year 1** | Steady bookings; shop live; EFT orders; Niki answering questions | Revenue from products + data on what patients want |
| **Years 2–3** | Packages linking treatment + home care | Repeat purchases, Star Light Rewards habit, automated reminders |
| **Years 4–5** | Regional recognition | “Star Aesthetic” = clinic + shop in one mind; national shipping where viable |

### What “household brand” means in practice

- A patient finishes Botox and leaves with **the exact cleanser and SPF** Dr Bangalee recommends — bought online, delivered, with **5% back** in Star Lights.
- Someone at home at 9 p.m. asks Niki about pigmentation; by morning Nakita has a **lead** with name, phone, and interest.
- A cart abandoned at checkout gets a **WhatsApp nudge** — not spam, a helpful reminder with a link to finish.
- Nakita opens **one admin dashboard** and sees orders, leads, and Niki conversations — not five spreadsheets.

### The financial opportunity (why this matters)

A brochure site costs money to maintain and rarely pays it back. A connected platform:

1. **Captures margin on products** you already recommend in-clinic  
2. **Extends the treatment relationship** into daily home care (recurring need)  
3. **Reduces “I’ll buy it elsewhere”** — authentic stock, medical positioning  
4. **Feeds the clinic** — assessments, contact forms, and Niki all create **leads** for bookings  
5. **Scales without more reception hours** — checkout and confirmation emails work while you sleep  

The old site showed who you are. The new site **sells, books, remembers, and follows up**.

---

## Part 2 — Is the “Niki walks me through the website” idea mad?

**No. It is ambitious — and it is exactly the right direction.**

What you are describing is a **guided interactive demo**:

- Niki speaks in a warm, natural voice (Gemini Live).  
- She explains each part of the business — treatments, shop, checkout, funnels, admin.  
- The visitor can **interrupt**, ask a question, get an answer, and **resume** the tour.  
- In the fullest version, she **navigates the page** (“Let me show you Treatments…”) and **adds products to the cart** while explaining why.

That is not science fiction. It is how modern voice agents are evolving. You already have the hardest pieces:

| Already built | What it does |
|---------------|--------------|
| **Niki voice (Gemini Live)** | Real-time conversation; knows which product/treatment page you are on |
| **Product & treatment context** | Loaded from your database — not generic ChatGPT guesses |
| **Session transcripts** | Saved to admin — Nakita can read what visitors asked |
| **Leads & CRM** | Contact, skin assessment, bookings, Niki email capture → **Customers & Leads** in admin |
| **Full shop + EFT checkout** | Orders, confirmation emails, Star Light Rewards |
| **Post-purchase funnels** | Optional 2-step upsell after add-to-cart |
| **Cart abandonment** | WhatsApp + email if someone leaves checkout |

| Next phase (guided tour) | What we add |
|------------------------|-------------|
| **Tour mode** | A special script + FAQs injected into Niki’s instructions |
| **Navigation tools** | Niki triggers “go to Treatments”, “open this product” |
| **Cart tools** | Niki adds recommended products while explaining |
| **Pause / resume** | Checkpoints so questions do not lose the thread |

**Honest note:** Today, Niki on the live site is expert **Q&A on the current page**. She does not yet auto-click through the site or add to cart by voice — that is the **next development step**, not a fantasy. The tour script in Part 4 is written so you can use it **now** (Niki talks; a human clicks along) and **later** (Niki drives the UI).

### Gemini — has it been upgraded?

Yes. The site uses **Gemini 2.5 Flash** with the **native audio (Live)** preview model — substantially better than early 2024 voice demos: lower latency, more natural turn-taking, transcription of both sides, and support for **tools** (function calling) in the Live API. That is what we will use for “open this page” and “add to cart.”

Your API key stays on the server; sessions are logged for quality and training insights.

---

## Part 3 — How to experience the platform today (15-minute walkthrough)

*Do this once with Nakita and Dr Bangalee in the same room. One person shares screen; one person has the admin login.*

1. **Homepage** — Brand, trust, entry to Treatments and Shop.  
2. **Treatments** — Pick one (e.g. Botox or Dermapen). Read structure: what it is, downtime, pricing from.  
3. **Shop → brand → product** — Open a product. Note **Add to cart**, descriptions, Dr Bangalee positioning.  
4. **Cart → Checkout** — See reassurance copy; **Place order** (test email). No bank details on checkout — only on **confirmation + email**.  
5. **Funnel** (if enabled on that product) — Add to cart again on a product with funnel **On** in admin; see routine upsell steps.  
6. **Book** — Treatment booking form → lands in database.  
7. **Skin assessment** — Lead capture.  
8. **Rewards** — Star Light Rewards signup / balance.  
9. **Niki** — Floating button; start voice chat on a product page; ask “Is this right for sensitive skin?”  
10. **Admin** (`/admin/login`) — Dashboard, Orders, Products (funnel tab), Customers, Leads, Niki transcripts.

---

## Part 4 — Niki guided tour script  
*For voice delivery — pause after each “Checkpoint”*

**How to use this script**

- **Now:** Nakita or a colleague opens the site and navigates while Niki reads this aloud (or paraphrases) on a shared voice session.  
- **Soon:** Niki receives this as `tour mode` in her system instructions and uses tools to navigate.  
- **Checkpoint** = stop; invite questions; only continue when the listener says they are ready.

---

### Opening (2 minutes)

> “Hello — I’m Niki, your guide to the new Star Aesthetic Centre website. Everything you’re seeing was built around one idea: the same care Dr Bangalee gives in the treatment room should continue online — in how we explain products, how we take bookings, and how we follow up when someone isn’t quite ready to buy yet.
>
> This isn’t a brochure anymore. It’s a clinic that never closes. Over the next few minutes I’ll show you how treatments, the shop, checkout, and the tools behind the scenes work together. You can stop me anytime — ask anything — and we’ll pick up where we left off.
>
> Ready? Let’s start where most visitors start: how we present **treatments**.”

**Checkpoint — Any questions before we look at treatments?**

---

### Chapter 1 — Treatments (3 minutes)

*Navigate to: **Treatments** → choose **Face** or **Skin** → open one treatment*

> “Treatments are organised the way patients think — Face, Skin, Body — not the way old medical catalogues did. Each page explains what the treatment is, who it’s for, downtime, and pricing **from** — because every face is different.
>
> The thinking here is **education before pressure**. Someone researching lip filler at midnight should feel informed, not sold to. When they’re ready, they book — or they talk to me — or they buy the home-care products Dr Bangalee would recommend after that treatment.
>
> Behind these pages is a database that also powers **me** — I know which products pair with which treatment, so my answers stay consistent with what the doctor would say in clinic.”

**Checkpoint — Questions about treatment pages or booking from here?**

---

### Chapter 2 — The online shop (4 minutes)

*Navigate to: **Shop** → pick a brand (e.g. NeoStrata, Heliocare, Dermaceutic) → open one product*

> “The shop is medical-grade skincare only — brands you already trust in treatment rooms. Every product has proper descriptions, images, and VAT-inclusive pricing in Rand.
>
> When someone clicks **Add to cart**, we don’t rush them straight to payment if there’s a **routine** worth completing. That’s where **funnels** come in — I’ll explain in a moment.
>
> Star Light Rewards gives **five percent back** on qualifying purchases — credited after EFT clears — so repeat buyers build a reason to return to *you*, not a generic pharmacy site.”

**Checkpoint — Questions about brands, pricing, or rewards?**

---

### Chapter 3 — Checkout and payment (3 minutes)

*Navigate to: **Cart** → **Checkout** (you can use test details)*

> “Checkout asks for contact and delivery details once. We deliberately **don’t** show full banking details here — that reduces clutter and copy-paste errors. After they click **Place order**, they land on a confirmation page with **EFT instructions**, reference number, and what happens next. The same details go by **email** — so they can pay from their banking app without hunting for information.
>
> Orders appear in admin for Nakita to mark paid when the money arrives — then the order moves to processing and dispatch. Nothing is ‘automatically paid’ — and the language on the site says **to pay via EFT**, not ‘paid’, until you confirm.”

**Checkpoint — Questions about EFT, shipping, or order confirmation?**

---

### Chapter 4 — Funnels — completing the routine (4 minutes)

*Best shown on a product with funnel **enabled** in admin — add to cart → `/buy/...` steps*

> “A **funnel** is a gentle upsell — not a pop-up shouting ‘special offers’. After someone adds a hero product — say a cleanser — we can offer **one or two logical next steps**: a serum, then an SPF, often at a small bundle discount configured per product.
>
> The purpose is clinical and commercial: **better outcomes** when patients use a full routine, and **higher order value** without aggressive marketing. In admin, each product has an **Upsell Funnel** tab. You can click **Suggest routine** — the system proposes the next items in the brand’s line — review them, turn the funnel **On**, and save. Nothing goes live until you choose.
>
> Shoppers who skip still checkout normally. Those who accept add discounted items — the cart knows how to handle those lines when the order is placed.”

**Checkpoint — Questions about funnels, discounts, or when to enable them?**

---

### Chapter 5 — Niki — voice consultant (3 minutes)

*Open Niki widget on a product page — start voice chat*

> “This is me in patient-facing mode. I use **Google’s latest Gemini voice** technology — real conversation, not robotic scripts. On a product page I already know the product name, price, and summary from your database.
>
> I greet first, answer in short warm sentences, and when the moment is right I can ask for name, phone, and email — which flows into your **Leads** and **Customers** views. Every conversation can be saved as a transcript for Nakita to review.
>
> The **guided tour** you’re experiencing now is the next evolution: same voice, same trust — but structured chapters, pauses for questions, and soon the ability to navigate and add to cart while we talk.”

**Checkpoint — What would you like me to explain about privacy, transcripts, or when Niki should offer a callback?**

---

### Chapter 6 — Behind the scenes — admin (4 minutes)

*Navigate to: **/admin** — dashboard, orders, customers, leads, products*

> “Nakita’s command centre is the admin dashboard. **Orders** — confirm EFT, see line items. **Products** — prices, stock, descriptions, funnels. **Customers** — one profile per email: shop orders, bookings, rewards, leads. **Leads** — form enquiries, skin assessments, imports from old spreadsheets. **Niki** — read transcripts, see who left contact details.
>
> **Pages** lets you edit Homepage and Contact copy without a developer. **Vouchers** and **Rewards** support campaigns and loyalty. This is how a five-year brand is run: one place for truth, not scattered inboxes.”

**Checkpoint — Admin access, roles, or day-to-day workflow questions?**

---

### Closing (1 minute)

> “Star Aesthetic Centre now has a website that matches the quality of your clinic. Treatments educate. The shop sells what you already believe in. Checkout and email handle payment clearly. Funnels complete routines. I capture curiosity when humans aren’t available. Admin gives Nakita control.
>
> The next chapter is making this tour fully interactive — I’ll walk, you’ll ask, we’ll continue. Thank you for building something patients will feel — and for trusting that the next five years can make Star Aesthetic a name people recommend at brunch, not only after they leave your chair.”

---

## Part 5 — Feature reference & FAQs

*Plain answers for people new to digital commerce*

---

### Treatments

**What it is**  
Public pages for every clinic treatment — structured, SEO-friendly, linked to recommended products.

**Why it matters**  
Captures research traffic; supports informed bookings; feeds Niki’s knowledge.

**FAQ**

| Question | Answer |
|----------|--------|
| Can we change prices on the site? | Treatment “from” prices are edited in admin under Treatments (or source data). |
| Do bookings from the site go somewhere? | Yes — Supabase `bookings` table; visible on customer profile in admin. |
| Must every treatment list products? | No — but pairings help Niki and future email campaigns. |

---

### Online shop

**What it is**  
Full product catalogue: Dermaceutic, Heliocare, ISDIN, Mesoestetic, NeoStrata, SkinCeuticals — with images, descriptions, cart.

**Why it matters**  
Direct revenue; brand control; captures patients who already trust Dr Bangalee.

**FAQ**

| Question | Answer |
|----------|--------|
| Who updates product text? | Admin → Products → edit short and full description. |
| How is stock handled? | Optional stock quantity per product in admin. |
| Free shipping? | Orders **R800+** ship free; otherwise R120 (configurable in code). |

---

### Checkout & EFT orders

**What it is**  
Customer places order → status **pending** → pays via EFT → Nakita confirms payment in admin → processing/shipped.

**Why it matters**  
Matches how SA clinics actually get paid; no card gateway fees until you choose to add one.

**FAQ**

| Question | Answer |
|----------|--------|
| Where do bank details show? | **Only** order confirmation page + customer email (not checkout). |
| When do Star Lights credit? | After payment is confirmed and order logic runs (on confirmation path / when marked paid). |
| What if they pay wrong reference? | Match manually in banking; update order in admin. |

---

### Post-purchase funnels

**What it is**  
0–2 optional steps after add-to-cart: “pairs with this” / “complete your routine” at 10–25% off.

**Why it matters**  
Increases average order value; reinforces treatment protocols.

**FAQ**

| Question | Answer |
|----------|--------|
| Are funnels automatic? | **No** — per product, off until you enable in admin. |
| What does “Suggest routine” do? | Pre-fills next products in brand order; you review and save. |
| Will shoppers see “special offers”? | Checkout button says **Place order**; funnel pages say “complete your routine”. |

---

### Star Light Rewards (5%)

**What it is**  
Loyalty balance in Rand per email — earn on shop orders, redeem on checkout.

**Why it matters**  
Repeat purchase incentive; competes with generic retailers.

**FAQ**

| Question | Answer |
|----------|--------|
| Who can sign up? | Anyone at `/rewards` with email. |
| Can we adjust balance manually? | Via database/admin rewards tools (ask developer if not in UI yet). |

---

### Bookings

**What it is**  
Online form: treatment, date, slot, patient details → confirmation.

**FAQ**

| Question | Answer |
|----------|--------|
| Calendar sync? | Slots from your rules in the booking API — not full Google Calendar yet unless integrated. |
| Cancellations? | Handled in admin / clinic process. |

---

### Skin assessment & contact forms

**What it is**  
Lead capture — partial assessment data and contact enquiries → **Leads** in admin.

**FAQ**

| Question | Answer |
|----------|--------|
| Old form enquiries? | Import CSV under **Leads** (columns documented in admin). |
| GDPR / POPIA? | Privacy policy on site; retain only what you need. |

---

### Cart abandonment

**What it is**  
If someone enters email + phone at checkout but doesn’t order, a timed WhatsApp and/or email reminder with recovery link.

**FAQ**

| Question | Answer |
|----------|--------|
| Is it live? | Requires cron + WhatsApp/Resend env vars on production. |
| Too aggressive? | Intervals and copy can be tuned. |

---

### Customers & Leads (mini-CRM)

**What it is**  
**Customers** = unified view by email (shop, bookings, rewards, leads). **Leads** = pipeline for enquiries.

**FAQ**

| Question | Answer |
|----------|--------|
| Same person, many emails? | One profile per email address. |
| Test accounts? | Seeded profiles for checkout testing (cPanel emails). |

---

### Niki (voice agent)

**What it is**  
Gemini Live voice on public site; context-aware; transcripts in admin.

**FAQ**

| Question | Answer |
|----------|--------|
| Does she diagnose? | No — education and referral to clinic; prompt forbids medical promises. |
| Dr Bangalee — he or she? | **He/him** — enforced in instructions. |
| Can she add to cart today? | **Roadmap** — Q&A today; cart/navigation tools next. |
| Cost? | Gemini API usage per minute of voice — monitor in Google AI Studio. |

---

### Admin dashboard

**What it is**  
`/admin` — orders, products, pages, customers, leads, Niki, vouchers, rewards.

**FAQ**

| Question | Answer |
|----------|--------|
| Login? | Username **nakita** (+ password in env) — change procedure with developer. |
| Google Analytics? | Planned; not in dashboard yet. |
| Launch / Google indexing? | Controlled by env flag until you go live. |

---

## Part 6 — Roadmap: making the tour fully interactive

| Phase | Deliverable | Who benefits |
|-------|-------------|--------------|
| **A (now)** | This guide + manual walkthrough with Niki voice on each page | Nakita, Dr Bangalee, investors |
| **B** | `tour mode` prompt: chapters + FAQs injected into Niki | Same, more consistent |
| **C** | Gemini **tools**: `navigateTo(path)`, `highlight(selector)` | Hands-free tour |
| **D** | Tools: `addToCart(productId)`, `openCheckout()` | Demo sales flow |
| **E** | Admin: “Start board tour” link with pre-written script | Onboarding new staff |

**Estimated effort:** B is days; C–D is 1–2 weeks engineering with testing; E is polish.

---

## Part 7 — Quick reference URLs

| Page | URL |
|------|-----|
| Home | `/` |
| Treatments | `/treatments` |
| Shop | `/shop` |
| Book | `/book` |
| Skin assessment | `/skin-assessment` |
| Rewards | `/rewards` |
| Contact | `/contact` |
| Admin | `/admin` |
| Admin login | `/admin/login` |

---

## Appendix — Words we use on purpose

| Term | Meaning |
|------|---------|
| **Funnel** | Post–add-to-cart routine upsell (max 2 steps) |
| **Lead** | Someone who enquired but may not have bought yet |
| **Customer** | Aggregated view of everyone we know by email |
| **Star Lights** | Loyalty points (1 point = R1) |
| **EFT** | Bank transfer payment — standard for SA clinic shops |

---

*Document version 1.0 — for internal and stakeholder use. Update when tour mode ships.*
