-- ─── NeoStrata Product Range / Subcategory Setup ────────────────────────────
-- Step 1: Add subcategory columns to products table (idempotent)
alter table public.products
  add column if not exists subcategory      text    default null,
  add column if not exists subcategory_sort integer default null;

-- Step 2: Assign NeoStrata ranges ─────────────────────────────────────────────

-- RESURFACE Range (AHA Products)
update public.products
set subcategory = 'RESURFACE', subcategory_sort = 1
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-glycolic-renewal-smoothing-cream',
    'neostrata-glycolic-renewal-smoothing-lotion',
    'neostrata-high-potency-cream'
  );

-- RESTORE Range (PHA Products)
update public.products
set subcategory = 'RESTORE', subcategory_sort = 2
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-facial-cleanser',
    'neostrata-bionic-face-cream',
    'neostrata-ultra-moisturising-face-cream',
    'neostrata-eye-cream',
    'neostrata-pha-daily-moisturizer'
  );

-- CLARIFY Range (Acne / Oily Skin)
update public.products
set subcategory = 'CLARIFY', subcategory_sort = 3
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-mandelic-clarifying-cleanser',
    'neostrata-oily-skin-solution',
    'neostrata-targeted-clarifying-gel',
    'neostrata-sheer-hydration-spf40'
  );

-- ENLIGHTEN Range (Brightening / Pigmentation)
update public.products
set subcategory = 'ENLIGHTEN', subcategory_sort = 4
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-enlighten-ultra-brightening-cleanser',
    'neostrata-enlighten-pigment-controller',
    'neostrata-enlighten-illuminating-serum',
    'neostrata-enlighten-skin-brightener-spf35',
    'neostrata-enlighten-dark-spot-corrector',
    'neostrata-enlighten-brightening-eye-cream',
    'neostrata-15-vitamin-c-pha-serum'
  );

-- SKIN ACTIVE Range (Advanced Anti-Ageing)
update public.products
set subcategory = 'SKIN ACTIVE', subcategory_sort = 5
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-skin-active-exfoliating-wash',
    'neostrata-skin-active-matrix-support-spf30',
    'neostrata-skin-active-intensive-eye-therapy',
    'neostrata-skin-active-potent-retinol-complex',
    'neostrata-skin-active-hyaluronic-luminous-lift',
    'neostrata-skin-active-rebound-sculpting-cream'
  );

-- VALUE PACKS
update public.products
set subcategory = 'VALUE PACKS', subcategory_sort = 6
where brand_slug = 'neostrata'
  and slug in (
    'neostrata-enlighten-brightening-pack',
    'neostrata-enlighten-trio-pack'
  );

-- Verify ──────────────────────────────────────────────────────────────────────
select
  subcategory,
  subcategory_sort,
  count(*) as product_count,
  string_agg(name, ', ' order by name) as products
from public.products
where brand_slug = 'neostrata'
group by subcategory, subcategory_sort
order by subcategory_sort;
