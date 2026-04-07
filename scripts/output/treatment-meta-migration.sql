-- treatment-meta-migration.sql
-- Add admin-editable fields to treatments table + seed from JSON source of truth
-- Run once in Supabase SQL editor

alter table public.treatments
  add column if not exists is_active  boolean not null default true,
  add column if not exists tagline    text,
  add column if not exists price_from text,
  add column if not exists duration   text,
  add column if not exists downtime   text;

-- Seed editable fields (values from lib/data/treatments.json)

update public.treatments set
  is_active  = true,
  tagline    = 'Clear Skin Changes Everything — Medical Acne Treatment in Durban',
  price_from = 'R 850 – R 2,500 per session (package pricing available)',
  duration   = '30–60 minutes (depending on treatment modality)',
  downtime   = 'Minimal — 24–48 hours mild redness or peeling post-peel treatment'
where slug = 'acne';

update public.treatments set
  is_active  = true,
  tagline    = 'Non-Surgical Fat Reduction & Body Sculpting in Durban',
  price_from = 'R 1,200 – R 3,500 per session (area and modality dependent)',
  duration   = '45–90 minutes per area',
  downtime   = 'Minimal — return to normal activities immediately'
where slug = 'body-contouring';

update public.treatments set
  is_active  = true,
  tagline    = 'Natural-Looking Wrinkle Relaxation by Durban''s Trusted Aesthetic Doctor',
  price_from = 'R 1,200 – R 4,500 (area and units dependent)',
  duration   = '20–45 minutes (including consultation)',
  downtime   = 'Zero downtime — return to normal activities immediately'
where slug = 'botox';

update public.treatments set
  is_active  = true,
  tagline    = 'Clinically Proven Skin Rejuvenation — Stimulating Your Skin''s Own Collagen',
  price_from = 'R 1,800 – R 2,500 per session',
  duration   = '45–75 minutes (including anaesthetic time)',
  downtime   = '24–48 hours redness (social downtime 2–3 days)'
where slug = 'dermapen-microneedling';

update public.treatments set
  is_active  = true,
  tagline    = 'Reclaim Your Confidence — Medical Hyperhidrosis Treatment in Durban',
  price_from = 'R 4,500 – R 6,000 per treatment (both underarms)',
  duration   = '30–45 minutes',
  downtime   = 'Zero — return to work immediately'
where slug = 'excessive-sweating';

update public.treatments set
  is_active  = true,
  tagline    = 'Define Your Profile — Non-Surgical Jawline & Chin Enhancement in Durban',
  price_from = 'R 2,500 – R 8,000 (depending on areas and product volume)',
  duration   = '30–60 minutes',
  downtime   = 'Minimal — mild swelling 24–48 hours'
where slug = 'jaw-amp-chin-contouring';

update public.treatments set
  is_active  = true,
  tagline    = 'Natural-Looking Lip Enhancement — Volume, Definition & Balance',
  price_from = 'R 2,500 – R 4,500 (depending on amount of filler)',
  duration   = '30–45 minutes (including anaesthetic time)',
  downtime   = '24–48 hours mild swelling; bruising possible'
where slug = 'lip-filler';

update public.treatments set
  is_active  = true,
  tagline    = 'Medically Supervised Weight Management — Real Results, Sustained Long-Term',
  price_from = 'Consultation required — programme pricing',
  duration   = 'Ongoing programme',
  downtime   = 'None — lifestyle-integrated programme'
where slug = 'medi-lean';

update public.treatments set
  is_active  = true,
  tagline    = 'Restore Your Natural Glow — Expert Pigmentation Treatment in Durban',
  price_from = 'R 1,200 – R 8,500 per session (modality dependent)',
  duration   = '30–90 minutes (depending on treatment modality)',
  downtime   = 'Cosmelan: 5–7 days peeling/sensitivity; Peels: 2–5 days; Dermapen: 24–48 hours'
where slug = 'pigmentation-treatment';

update public.treatments set
  is_active  = true,
  tagline    = 'Reveal Brighter, Younger Skin — Professional Chemical Peels in Durban',
  price_from = 'R 1,200 – R 2,500 per session',
  duration   = '30–60 minutes',
  downtime   = 'Superficial peels: 2–4 days; Medium-depth: 5–7 days'
where slug = 'skin-peel';

update public.treatments set
  is_active  = true,
  tagline    = 'Non-Surgical Thread Vein & Varicose Vein Management in Durban',
  price_from = 'R 1,500 – R 3,500 per session (extent dependent)',
  duration   = '30–60 minutes',
  downtime   = 'Minimal — compression stockings worn for 5–7 days'
where slug = 'varicose-veins';

update public.treatments set
  is_active  = true,
  tagline    = 'The Star Hydration, Fitness & Ultimate Vitamin Drips in Durban North',
  price_from = 'R 1,800 – R 3,500 (drip protocol dependent)',
  duration   = '45–75 minutes per drip',
  downtime   = 'None — return to normal activities immediately after'
where slug = 'vitamin-drips';

-- Verify
select slug, is_active, price_from, duration from public.treatments order by slug;
