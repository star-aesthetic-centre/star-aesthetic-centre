-- ══════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Mesoestetic Product Images
-- sort_order 0 = primary | 1-3 = thumbnails | 4+ = lifestyle/description
-- Run in: Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- Clear existing Mesoestetic image records
delete from public.product_images
where product_id in (
  select id from public.products where brand_slug = 'mesoestetic'
);

-- ── AGE Element Brightening Eye Cream ─────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-age-element-brightening-eye-cream-dark-circles.webp',    'Mesoestetic AGE Element Brightening Eye Cream',       0),
  ('/images/mesoestetic-age-element-brightening-eye-cream-dark-circles-01.webp', 'Mesoestetic AGE Element Eye Cream - View 2',           1),
  ('/images/mesoestetic-age-element-brightening-eye-cream-dark-circles-02.webp', 'Mesoestetic AGE Element Eye Cream - View 3',           2),
  ('/images/mesoestetic-age-element-brightening-eye-cream-dark-circles-03.webp', 'Mesoestetic AGE Element Eye Cream - View 4',           3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-age-element-brightening-eye-cream';

-- ── Anti-Stress Face Mask ──────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-products-anti-stress-face-mask.webp',    'Mesoestetic Anti-Stress Face Mask',          0),
  ('/images/mesoestetic-products-anti-stress-face-mask-01.webp', 'Mesoestetic Anti-Stress Face Mask - View 2', 1),
  ('/images/mesoestetic-products-anti-stress-face-mask-02.webp', 'Mesoestetic Anti-Stress Face Mask - View 3', 2),
  ('/images/mesoestetic-products-anti-stress-face-mask-03.webp', 'Mesoestetic Anti-Stress Face Mask - View 4', 3),
  ('/images/mesoestetic-products-anti-stress-face-mask-04.webp', 'Mesoestetic Anti-Stress Face Mask - Lifestyle 1', 4),
  ('/images/mesoestetic-products-anti-stress-face-mask-05.webp', 'Mesoestetic Anti-Stress Face Mask - Lifestyle 2', 5)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-anti-stress-face-mask';

-- ── AOX Ferulic Advanced Antioxidant Concentrate ──────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate.webp',    'Mesoestetic AOX Ferulic Antioxidant Concentrate',          0),
  ('/images/mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate-01.webp', 'Mesoestetic AOX Ferulic Concentrate - View 2',             1),
  ('/images/mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate-02.webp', 'Mesoestetic AOX Ferulic Concentrate - View 3',             2),
  ('/images/mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate-04.webp', 'Mesoestetic AOX Ferulic Concentrate - View 4',             3),
  ('/images/mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate-05.webp', 'Mesoestetic AOX Ferulic Concentrate - Lifestyle 1',        4)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-aox-ferulic';

-- ── Brightening Foam ──────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-brightening-foam-glycolic-acid-exfoliating-cleanser.webp',    'Mesoestetic Brightening Foam Glycolic Cleanser',        0),
  ('/images/mesoestetic-brightening-foam-glycolic-acid-exfoliating-cleanser-01.webp', 'Mesoestetic Brightening Foam - View 2',                 1),
  ('/images/mesoestetic-brightening-foam-glycolic-acid-exfoliating-cleanser-02.webp', 'Mesoestetic Brightening Foam - View 3',                 2),
  ('/images/mesoestetic-brightening-foam-glycolic-acid-exfoliating-cleanser-03.webp', 'Mesoestetic Brightening Foam - View 4',                 3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-brightening-foam';

-- ── Cosmelan 2 Maintenance Cream ──────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-cosmelan-2-maintenance-depigmentation-home-treatment.webp',    'Mesoestetic Cosmelan 2 Maintenance Cream',        0),
  ('/images/mesoestetic-cosmelan-2-maintenance-depigmentation-home-treatment-01.webp', 'Mesoestetic Cosmelan 2 Maintenance - View 2',     1),
  ('/images/mesoestetic-cosmelan-2-maintenance-depigmentation-home-treatment-02.webp', 'Mesoestetic Cosmelan 2 Maintenance - View 3',     2),
  ('/images/mesoestetic-cosmelan-2-maintenance-depigmentation-home-treatment-03.webp', 'Mesoestetic Cosmelan 2 Maintenance - View 4',     3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-cosmelan-2-maintenance-cream';

-- ── HA Densimatrix Hyaluronic Acid Serum ──────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-ha-densimatrix-hyaluronic-acid-anti-aging-serum.webp',    'Mesoestetic HA Densimatrix Hyaluronic Acid Serum',    0),
  ('/images/mesoestetic-ha-densimatrix-hyaluronic-acid-anti-aging-serum-01.webp', 'Mesoestetic HA Densimatrix Serum - View 2',           1),
  ('/images/mesoestetic-ha-densimatrix-hyaluronic-acid-anti-aging-serum-02.webp', 'Mesoestetic HA Densimatrix Serum - View 3',           2),
  ('/images/mesoestetic-ha-densimatrix-hyaluronic-acid-anti-aging-serum-03.webp', 'Mesoestetic HA Densimatrix Serum - View 4',           3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-ha-densimatrix';

-- ── Hydracream Fusion ─────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer.webp',    'Mesoestetic Hydracream Fusion Moisturizer',         0),
  ('/images/mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer-01.webp', 'Mesoestetic Hydracream Fusion - View 2',            1),
  ('/images/mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer-02.webp', 'Mesoestetic Hydracream Fusion - View 3',            2),
  ('/images/mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer-03.webp', 'Mesoestetic Hydracream Fusion - View 4',            3),
  ('/images/mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer-04.webp', 'Mesoestetic Hydracream Fusion - Lifestyle 1',       4)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-hydracream-fusion';

-- ── Hydratonic Mist ───────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-hydratonic-mist-hydrating-facial-toner-spray.webp',    'Mesoestetic Hydratonic Mist Facial Toner',        0),
  ('/images/mesoestetic-hydratonic-mist-hydrating-facial-toner-spray-01.webp', 'Mesoestetic Hydratonic Mist - View 2',            1),
  ('/images/mesoestetic-hydratonic-mist-hydrating-facial-toner-spray-02.webp', 'Mesoestetic Hydratonic Mist - View 3',            2),
  ('/images/mesoestetic-hydratonic-mist-hydrating-facial-toner-spray-03.webp', 'Mesoestetic Hydratonic Mist - View 4',            3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-hydratonic-mist';

-- ── Melan Tranex Kit ──────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-melan-tranex-kit-complete-depigmentation-system.webp',    'Mesoestetic Melan Tranex Kit Depigmentation System',   0),
  ('/images/mesoestetic-melan-tranex-kit-complete-depigmentation-system-01.webp', 'Mesoestetic Melan Tranex Kit - View 2',                1),
  ('/images/mesoestetic-melan-tranex-kit-complete-depigmentation-system-02.webp', 'Mesoestetic Melan Tranex Kit - View 3',                2),
  ('/images/mesoestetic-melan-tranex-kit-complete-depigmentation-system-03.webp', 'Mesoestetic Melan Tranex Kit - View 4',                3),
  ('/images/mesoestetic-melan-tranex-kit-complete-depigmentation-system-04.webp', 'Mesoestetic Melan Tranex Kit - Lifestyle 1',           4)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-melan-tranex-kit';

-- ── Melan Tran3x Daily Gel Cream ──────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream.webp',    'Mesoestetic Melan Tran3x Daily Gel Cream',       0),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-01.webp', 'Mesoestetic Melan Tran3x Gel Cream - View 2',    1),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-02.webp', 'Mesoestetic Melan Tran3x Gel Cream - View 3',    2),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-03.webp', 'Mesoestetic Melan Tran3x Gel Cream - View 4',    3),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-04.webp', 'Mesoestetic Melan Tran3x Gel Cream - Lifestyle 1', 4),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-05.webp', 'Mesoestetic Melan Tran3x Gel Cream - Lifestyle 2', 5)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-melan-tran3x-gel-cream';

-- ── Fast Skin Repair ──────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-products-fast-skin-repair.webp',    'Mesoestetic Fast Skin Repair',          0),
  ('/images/mesoestetic-products-fast-skin-repair-01.webp', 'Mesoestetic Fast Skin Repair - View 2', 1),
  ('/images/mesoestetic-products-fast-skin-repair-02.webp', 'Mesoestetic Fast Skin Repair - View 3', 2),
  ('/images/mesoestetic-products-fast-skin-repair-03.webp', 'Mesoestetic Fast Skin Repair - View 4', 3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-fast-skin-repair';

-- ── Melan Recovery ────────────────────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-products-melan-recovery-cosmeceutical-solution.webp',    'Mesoestetic Melan Recovery Cosmeceutical Solution',   0),
  ('/images/mesoestetic-products-melan-recovery-cosmeceutical-solution-01.webp', 'Mesoestetic Melan Recovery - View 2',                 1),
  ('/images/mesoestetic-products-melan-recovery-cosmeceutical-solution-02.webp', 'Mesoestetic Melan Recovery - View 3',                 2),
  ('/images/mesoestetic-products-melan-recovery-cosmeceutical-solution-03.webp', 'Mesoestetic Melan Recovery - View 4',                 3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-melan-recovery';

-- ── Melan Tran3x Intensive Concentrate ───────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-melan-tran3x-intensive-concentrate.webp',    'Mesoestetic Melan Tran3x Intensive Concentrate',       0),
  ('/images/mesoestetic-melan-tran3x-intensive-concentrate-01.webp', 'Mesoestetic Melan Tran3x Concentrate - View 2',        1),
  ('/images/mesoestetic-melan-tran3x-intensive-concentrate-02.webp', 'Mesoestetic Melan Tran3x Concentrate - View 3',        2),
  ('/images/mesoestetic-melan-tran3x-intensive-concentrate-03.webp', 'Mesoestetic Melan Tran3x Concentrate - View 4',        3)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-melan-tran3x-concentrate';

-- ── Mesoprotech Melan 130+ Pigment Control SPF50 ─────────────────
-- Note: uses melan-tran3x-daily-gel-cream images (correct per source folder)
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream.webp',    'Mesoestetic Mesoprotech Melan 130+ Pigment Control SPF50',       0),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-01.webp', 'Mesoestetic Mesoprotech Melan 130+ - View 2',                    1),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-02.webp', 'Mesoestetic Mesoprotech Melan 130+ - View 3',                    2),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-03.webp', 'Mesoestetic Mesoprotech Melan 130+ - View 4',                    3),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-04.webp', 'Mesoestetic Mesoprotech Melan 130+ - Lifestyle 1',               4),
  ('/images/mesoestetic-melan-tran3x-daily-gel-cream-05.webp', 'Mesoestetic Mesoprotech Melan 130+ - Lifestyle 2',               5)
) as img(url, alt, sort_order)
where p.slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50';
