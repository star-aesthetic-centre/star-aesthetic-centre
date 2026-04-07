-- ─── SkinCeuticals Product Category Setup ────────────────────────────────────
-- Uses SkinCeuticals' own framework: CLEANSE · PREVENT · CORRECT · HYDRATE · PROTECT

-- CLEANSE (sort 1)
update public.products
set subcategory = 'CLEANSE', subcategory_sort = 1
where brand_slug = 'skinceuticals'
  and slug in (
    'skinceuticals-gentle-cleanser',
    'skinceuticals-glycolic-renewal-cleanser'
  );

-- PREVENT (sort 2)
update public.products
set subcategory = 'PREVENT', subcategory_sort = 2
where brand_slug = 'skinceuticals'
  and slug in (
    'skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid',
    'skinceuticals-phloretin-cf-with-ferulic-acid',
    'skinceuticals-serum-10-aox',
    'skinceuticals-resveratrol-be',
    'skinceuticals-ptiox'
  );

-- CORRECT (sort 3)
update public.products
set subcategory = 'CORRECT', subcategory_sort = 3
where brand_slug = 'skinceuticals'
  and slug in (
    'skinceuticals-age-eye-complex',
    'skinceuticals-age-interrupter-advanced',
    'skinceuticals-glycolic-10-renew-overnight',
    'skinceuticals-discoloration-defense',
    'skinceuticals-phyto-a-brightening-treatment',
    'skinceuticals-blemish-age-serum',
    'skinceuticals-retinol-03',
    'skinceuticals-retinol-05',
    'skinceuticals-retinol-10'
  );

-- HYDRATE (sort 4)
update public.products
set subcategory = 'HYDRATE', subcategory_sort = 4
where brand_slug = 'skinceuticals'
  and slug in (
    'skinceuticals-hyaluronic-acid-intensifier-ha',
    'skinceuticals-hydrating-b5-gel',
    'skinceuticals-triple-lipid-restore'
  );

-- PROTECT (sort 5)
update public.products
set subcategory = 'PROTECT', subcategory_sort = 5
where brand_slug = 'skinceuticals'
  and slug in (
    'skinceuticals-advanced-brightening-uv-defense-spf50'
  );

-- Verify
select
  subcategory,
  subcategory_sort,
  count(*) as product_count,
  string_agg(name, ', ' order by name) as products
from public.products
where brand_slug = 'skinceuticals'
group by subcategory, subcategory_sort
order by subcategory_sort;
