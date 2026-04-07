-- ─── All Brands Subcategory Assignment ───────────────────────────────────────
-- Run AFTER neostrata-subcategories.sql and skinceuticals-subcategories.sql
-- Uses name-based matching (case-insensitive) for reliability

-- ═══════════════════════════════════════════════════════════════════════════════
-- DERMACEUTIC
-- ═══════════════════════════════════════════════════════════════════════════════

-- CLEANSE (sort 1)
update public.products set subcategory = 'CLEANSE', subcategory_sort = 1
where brand_slug = 'dermaceutic'
  and (name ilike '%Advanced Cleanser%' or name ilike '%Foamer%');

-- HYDRATE & RECOVER (sort 2)
update public.products set subcategory = 'HYDRATE & RECOVER', subcategory_sort = 2
where brand_slug = 'dermaceutic'
  and (name ilike '%Hyal Ceutic%' or name ilike '%Activabiome%');

-- BRIGHTEN (sort 3)
update public.products set subcategory = 'BRIGHTEN', subcategory_sort = 3
where brand_slug = 'dermaceutic'
  and (name ilike '%C25%' or name ilike '%Tri Vita%' or name ilike '%Light Ceutic%' or name ilike '%Radiance%');

-- PIGMENTATION (sort 4)
update public.products set subcategory = 'PIGMENTATION', subcategory_sort = 4
where brand_slug = 'dermaceutic'
  and (name ilike '%Yellow Cream%' or name ilike '%Mela Cream%' or name ilike '%Dual Plus%');

-- ANTI-AGING (sort 5)
update public.products set subcategory = 'ANTI-AGING', subcategory_sort = 5
where brand_slug = 'dermaceutic'
  and (name ilike '%Retinol%');

-- POST-TREATMENT (sort 6)
update public.products set subcategory = 'POST-TREATMENT', subcategory_sort = 6
where brand_slug = 'dermaceutic'
  and (name ilike '%K Ceutic%');


-- ═══════════════════════════════════════════════════════════════════════════════
-- HELIOCARE
-- ═══════════════════════════════════════════════════════════════════════════════

-- FACE SPF (sort 1)
update public.products set subcategory = 'FACE SPF', subcategory_sort = 1
where brand_slug = 'heliocare'
  and (
    name ilike '%Gel Oil Free Touch%'
    or name ilike '%Sensation%'
    or name ilike '%Mineral Tolerance%'
  );

-- TINTED SPF (sort 2)
update public.products set subcategory = 'TINTED SPF', subcategory_sort = 2
where brand_slug = 'heliocare'
  and (name ilike '%Color Gel%' or name ilike '%Colour Gel%');

-- SPECIALIZED (sort 3)
update public.products set subcategory = 'SPECIALIZED', subcategory_sort = 3
where brand_slug = 'heliocare'
  and (name ilike '%AK Fluid%' or name ilike '%Pigment Solution%');

-- ORAL (sort 4)
update public.products set subcategory = 'ORAL', subcategory_sort = 4
where brand_slug = 'heliocare'
  and (name ilike '%Oral%' or name ilike '%Caps%');

-- PEDIATRIC (sort 5)
update public.products set subcategory = 'PEDIATRIC', subcategory_sort = 5
where brand_slug = 'heliocare'
  and (name ilike '%Paediatric%' or name ilike '%Pediatric%');

-- BODY & FAMILY (sort 6)
update public.products set subcategory = 'BODY & FAMILY', subcategory_sort = 6
where brand_slug = 'heliocare'
  and (name ilike '%Gel SPF50%' or name ilike '%Spray%');


-- ═══════════════════════════════════════════════════════════════════════════════
-- MESOESTETIC
-- ═══════════════════════════════════════════════════════════════════════════════

-- CLEANSE & PREP (sort 1)
update public.products set subcategory = 'CLEANSE & PREP', subcategory_sort = 1
where brand_slug = 'mesoestetic'
  and (name ilike '%Brightening Foam%' or name ilike '%Hydratonic%');

-- HYDRATE (sort 2)
update public.products set subcategory = 'HYDRATE', subcategory_sort = 2
where brand_slug = 'mesoestetic'
  and (name ilike '%Hydracream%' or name ilike '%HA Densimatrix%' or name ilike '%Hyaluronic%');

-- ANTI-AGING (sort 3)
update public.products set subcategory = 'ANTI-AGING', subcategory_sort = 3
where brand_slug = 'mesoestetic'
  and (name ilike '%Aox Ferulic%' or name ilike '%AGE Element%');

-- DEPIGMENTATION (sort 4)
update public.products set subcategory = 'DEPIGMENTATION', subcategory_sort = 4
where brand_slug = 'mesoestetic'
  and (
    name ilike '%Melan Tran3x%'
    or name ilike '%Melan Tranex%'
    or name ilike '%Cosmelan%'
    or name ilike '%Mesoprotech%'
  );

-- RECOVERY (sort 5)
update public.products set subcategory = 'RECOVERY', subcategory_sort = 5
where brand_slug = 'mesoestetic'
  and (
    name ilike '%Melan Recovery%'
    or name ilike '%Fast Skin Repair%'
    or name ilike '%Anti-Stress%'
    or name ilike '%Anti Stress%'
  );


-- ═══════════════════════════════════════════════════════════════════════════════
-- VERIFY ALL BRANDS
-- ═══════════════════════════════════════════════════════════════════════════════
select
  brand_slug,
  subcategory,
  subcategory_sort,
  count(*) as product_count
from public.products
where brand_slug in ('dermaceutic', 'heliocare', 'mesoestetic')
  and is_active = true
group by brand_slug, subcategory, subcategory_sort
order by brand_slug, subcategory_sort nulls last;
