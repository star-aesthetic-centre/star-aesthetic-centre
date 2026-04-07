-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Import: skinceuticals
-- Generated: 2026-03-23T11:37:43.289Z
-- Source: star-aesthetic-skinceuticals-updated-2026.csv
-- Products: 20
-- ═══════════════════════════════════════════════════════════

-- Add tags column to products if not already present
alter table public.products
  add column if not exists tags text[] not null default '{}';

-- ── Products ──────────────────────────────────────────────
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values
  ('Neostrata Glycolic 10 Renew Overnight', 'neostrata-glycolic-10-renew-overnight', 'SA-SKNCE-GLYC-10-R-O-001', 'skinceuticals', 'Night Cream with 10% Glycolic Acid and 2% Phytic Acid for Exfoliating and Brightening', 'Glycolic 10 Renew Overnight: Neostrata Glycolic 10 Renew Overnight - Night Cream with 10% Glycolic Acid and 2% Phytic Acid for Exfoliating and Brightening', 190000, 190000, true, ARRAY[]::text[]),
  ('Neostrata C E Ferulic® with 15% L-Ascorbic Acid', 'neostrata-c-e-ferulic-with-15-l-ascorbic-acid', 'SA-SKNCE-C-E-FERU-15-A-A-001', 'skinceuticals', 'Antioxidant Serum with 15% Vitamin C, 1% Vitamin E, and 0.5% Ferulic Acid for Protecting and Firming', 'C E Ferulic® with 15% L-Ascorbic Acid: Neostrata C E Ferulic® with 15% L-Ascorbic Acid - Antioxidant Serum with 15% Vitamin C, 1% Vitamin E, and 0.5% Ferulic Acid for Protecting and Firming', 330000, 330000, true, ARRAY[]::text[]),
  ('Neostrata Phloretin CF® with Ferulic Acid', 'neostrata-phloretin-cf-with-ferulic-acid', 'SA-SKNCE-PHLRT-CF-FER-AC-001', 'skinceuticals', 'Antioxidant Serum with 10% L-Ascorbic Acid, 2% Phloretin, and 0.5% Ferulic Acid for Improving and Preventing Pigmentation', 'Phloretin CF® with Ferulic Acid: Neostrata Phloretin CF® with Ferulic Acid - Antioxidant Serum with 10% L-Ascorbic Acid, 2% Phloretin, and 0.5% Ferulic Acid for Improving and Preventing Pigmentation', 330000, 330000, true, ARRAY[]::text[]),
  ('Neostrata Hyaluronic Acid Intensifier (H.A.)', 'neostrata-hyaluronic-acid-intensifier-ha', 'SA-SKNCE-HYALU-AC-H-A-INTENS-001', 'skinceuticals', 'Hydrating Serum with 1.3% Hyaluronic Acid, 10% Proxylane, and 2% Licorice Extract for Plumping and Smoothing', 'Hyaluronic Acid Intensifier (H.A.): Neostrata Hyaluronic Acid Intensifier (H.A.) - Hydrating Serum with 1.3% Hyaluronic Acid, 10% Proxylane, and 2% Licorice Extract for Plumping and Smoothing', 240000, 240000, true, ARRAY[]::text[]),
  ('Neostrata Hydrating B5 Gel', 'neostrata-hydrating-b5-gel', 'SA-SKNCE-HYDRT-B5-GEL-001', 'skinceuticals', 'Hydrating Gel with 0.5% Hyaluronic Acid and 1% Vitamin B5 for Moisturising and Healing', 'Hydrating B5 Gel: Neostrata Hydrating B5 Gel - Hydrating Gel with 0.5% Hyaluronic Acid and 1% Vitamin B5 for Moisturising and Healing', 174000, 174000, true, ARRAY[]::text[]),
  ('SkinCeuticals Gentle Cleanser', 'skinceuticals-gentle-cleanser', 'SA-SKNCE-GC-001', 'skinceuticals', 'Mild Cream Cleanser for Sensitive and Dry Skin', 'Gentle Cleanser: SkinCeuticals Gentle Cleanser - Mild Cream Cleanser for Sensitive and Dry Skin', 91000, 91000, true, ARRAY[]::text[]),
  ('SkinCeuticals Glycolic Renewal Cleanser', 'skinceuticals-glycolic-renewal-cleanser', 'SA-SKNCE-GRC-001', 'skinceuticals', 'Exfoliating Gel Cleanser with Glycolic Acid', 'Glycolic Renewal Cleanser: SkinCeuticals Glycolic Renewal Cleanser - Exfoliating Gel Cleanser with Glycolic Acid', 98000, 98000, true, ARRAY[]::text[]),
  ('SkinCeuticals Resveratrol BE', 'skinceuticals-resveratrol-be', 'SA-SKNCE-RBE-001', 'skinceuticals', 'Night Antioxidant Concentrate for Anti-Aging', 'Resveratrol BE: SkinCeuticals Resveratrol BE - Night Antioxidant Concentrate for Anti-Aging', 350000, 350000, true, ARRAY[]::text[]),
  ('SkinCeuticals Serum 10 AOX', 'skinceuticals-serum-10-aox', 'SA-SKNCE-S10A-001', 'skinceuticals', 'Entry-Level Vitamin C Serum with 10% L-Ascorbic Acid', 'Serum 10 AOX: SkinCeuticals Serum 10 AOX - Entry-Level Vitamin C Serum with 10% L-Ascorbic Acid', 160000, 160000, true, ARRAY[]::text[]),
  ('SkinCeuticals AGE Eye Complex', 'skinceuticals-age-eye-complex', 'SA-SKNCE-AEC-001', 'skinceuticals', 'Advanced Eye Cream for Fine Lines and Dark Circles', 'AGE Eye Complex: SkinCeuticals AGE Eye Complex - Advanced Eye Cream for Fine Lines and Dark Circles', 229000, 229000, true, ARRAY[]::text[]),
  ('SkinCeuticals AGE Interrupter Advanced', 'skinceuticals-age-interrupter-advanced', 'SA-SKNCE-AIA-001', 'skinceuticals', 'Anti-Wrinkle Cream with Proxylane and Niacinamide', 'AGE Interrupter Advanced: SkinCeuticals AGE Interrupter Advanced - Anti-Wrinkle Cream with Proxylane and Niacinamide', 382000, 382000, true, ARRAY[]::text[]),
  ('SkinCeuticals Discoloration Defense', 'skinceuticals-discoloration-defense', 'SA-SKNCE-DD-001', 'skinceuticals', 'Dark Spot Corrector with Tranexamic Acid', 'Discoloration Defense: SkinCeuticals Discoloration Defense - Dark Spot Corrector with Tranexamic Acid', 242000, 242000, true, ARRAY[]::text[]),
  ('SkinCeuticals Blemish + AGE Serum', 'skinceuticals-blemish-age-serum', 'SA-SKNCE-BAS-001', 'skinceuticals', 'Acne and Aging Treatment with LHA and Glycolic Acid', 'Blemish + AGE Serum: SkinCeuticals Blemish + AGE Serum - Acne and Aging Treatment with LHA and Glycolic Acid', 215000, 215000, true, ARRAY[]::text[]),
  ('SkinCeuticals Phyto A+ Brightening Treatment', 'skinceuticals-phyto-a-brightening-treatment', 'SA-SKNCE-PAB-001', 'skinceuticals', 'Retinol Alternative for Sensitive Skin', 'Phyto A+ Brightening Treatment: SkinCeuticals Phyto A+ Brightening Treatment - Retinol Alternative for Sensitive Skin', 170000, 170000, true, ARRAY[]::text[]),
  ('SkinCeuticals PTIOX', 'skinceuticals-ptiox', 'SA-SKNCE-PTX-001', 'skinceuticals', 'Pollution Defense Serum with Antioxidants', 'PTIOX: SkinCeuticals PTIOX - Pollution Defense Serum with Antioxidants', 270000, 270000, true, ARRAY[]::text[]),
  ('SkinCeuticals Retinol 0.3', 'skinceuticals-retinol-03', 'SA-SKNCE-R03-001', 'skinceuticals', 'Gentle Retinol Cream for Retinol Beginners', 'Retinol 0.3: SkinCeuticals Retinol 0.3 - Gentle Retinol Cream for Retinol Beginners', 181000, 181000, true, ARRAY[]::text[]),
  ('SkinCeuticals Retinol 0.5', 'skinceuticals-retinol-05', 'SA-SKNCE-R05-001', 'skinceuticals', 'Intermediate Retinol Treatment for Moderate Signs of Aging', 'Retinol 0.5: SkinCeuticals Retinol 0.5 - Intermediate Retinol Treatment for Moderate Signs of Aging', 194000, 194000, true, ARRAY[]::text[]),
  ('SkinCeuticals Retinol 1.0', 'skinceuticals-retinol-10', 'SA-SKNCE-R10-001', 'skinceuticals', 'Maximum Strength Retinol for Advanced Aging Concerns', 'Retinol 1.0: SkinCeuticals Retinol 1.0 - Maximum Strength Retinol for Advanced Aging Concerns', 268500, 268500, true, ARRAY[]::text[]),
  ('SkinCeuticals Triple Lipid Restore', 'skinceuticals-triple-lipid-restore', 'SA-SKNCE-TL-001', 'skinceuticals', 'Anti-Aging Cream with Ceramides and Cholesterol', 'Triple Lipid Restore 2:4:2: SkinCeuticals Triple Lipid Restore - Anti-Aging Cream with Ceramides and Cholesterol', 365000, 365000, true, ARRAY[]::text[]),
  ('SkinCeuticals Advanced Brightening UV Defense SPF50', 'skinceuticals-advanced-brightening-uv-defense-spf50', 'SA-SKNCE-ABUD-001', 'skinceuticals', 'Tinted Sunscreen with Tranexamic Acid', 'Advanced Brightening UV Defense SPF50: SkinCeuticals Advanced Brightening UV Defense SPF50 - Tinted Sunscreen with Tranexamic Acid', 150000, 150000, true, ARRAY[]::text[])
on conflict (slug) do update set
  name               = excluded.name,
  sku                = excluded.sku,
  short_description  = excluded.short_description,
  description        = excluded.description,
  price_cents        = excluded.price_cents,
  regular_price_cents = excluded.regular_price_cents,
  tags               = excluded.tags,
  updated_at         = now();

-- ── Product Images ────────────────────────────────────────
-- NOTE: URLs are local WordPress URLs — update after
--       uploading images to Supabase Storage.

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-glycolic-10-renew-overnight'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-glycolic-10-renew-overnight-50ml-800.jpg', 'Neostrata Glycolic 10 Renew Overnight', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-c-e-ferulic-with-15-l-ascorbic-acid'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-c-e-ferulic-800.jpg', 'Neostrata C E Ferulic® with 15% L-Ascorbic Acid', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-phloretin-cf-with-ferulic-acid'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-phloretin-c-f-800.jpg', 'Neostrata Phloretin CF® with Ferulic Acid', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-hyaluronic-acid-intensifier-ha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-h-a-intensifier-30ml-800.jpg', 'Neostrata Hyaluronic Acid Intensifier (H.A.)', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-hydrating-b5-gel'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-hydrating-b5-gel-30ml-800.jpg', 'Neostrata Hydrating B5 Gel', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-gentle-cleanser'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-800.jpg', 'SkinCeuticals Gentle Cleanser', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-glycolic-renewal-cleanser'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-glycolic-renewal-cleanser-exfoliating-wash-800.jpg', 'SkinCeuticals Glycolic Renewal Cleanser', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-resveratrol-be'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-resveratrol-be-night-antioxidant-serum-800.jpg', 'SkinCeuticals Resveratrol BE', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-serum-10-aox'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-serum-10-aox-vitamin-c-antioxidant-800.jpg', 'SkinCeuticals Serum 10 AOX', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-age-eye-complex'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-age-eye-complex-anti-aging-treatment-800.jpg', 'SkinCeuticals AGE Eye Complex', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-age-interrupter-advanced'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-age-interrupter-advanced-wrinkle-cream-800.jpg', 'SkinCeuticals AGE Interrupter Advanced', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-discoloration-defense'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-discoloration-defense-dark-spot-corrector-800.jpg', 'SkinCeuticals Discoloration Defense', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-blemish-age-serum'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-blemish-age-serum-acne-anti-aging-treatment-800.jpg', 'SkinCeuticals Blemish + AGE Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-phyto-a-brightening-treatment'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-phyto-a-plus-brightening-retinol-alternative-800.jpg', 'SkinCeuticals Phyto A+ Brightening Treatment', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-ptiox'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-ptiox-pollution-defense-antioxidant-serum-800.jpg', 'SkinCeuticals PTIOX', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-retinol-03'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-0-3-beginner-anti-aging-cream-800.jpg', 'SkinCeuticals Retinol 0.3', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-retinol-05'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-800.jpg', 'SkinCeuticals Retinol 0.5', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-retinol-10'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-1-0-maximum-strength-anti-aging-800.jpg', 'SkinCeuticals Retinol 1.0', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-triple-lipid-restore'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-800.jpg', 'SkinCeuticals Triple Lipid Restore', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'skinceuticals-advanced-brightening-uv-defense-spf50'), 'https://www.staraesthetic.online/wp-content/uploads/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen-800.jpg', 'SkinCeuticals Advanced Brightening UV Defense SPF50', 0
)
on conflict do nothing;

-- ── Product Stock ─────────────────────────────────────────
insert into public.product_stock (product_id, status, quantity)
values
  ((select id from public.products where slug = 'neostrata-glycolic-10-renew-overnight'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-c-e-ferulic-with-15-l-ascorbic-acid'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-phloretin-cf-with-ferulic-acid'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-hyaluronic-acid-intensifier-ha'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-hydrating-b5-gel'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-gentle-cleanser'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-glycolic-renewal-cleanser'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-resveratrol-be'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-serum-10-aox'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-age-eye-complex'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-age-interrupter-advanced'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-discoloration-defense'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-blemish-age-serum'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-phyto-a-brightening-treatment'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-ptiox'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-retinol-03'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-retinol-05'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-retinol-10'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-triple-lipid-restore'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'skinceuticals-advanced-brightening-uv-defense-spf50'), 'IN_STOCK', NULL)
on conflict (product_id) do update set
  status     = excluded.status,
  quantity   = excluded.quantity,
  updated_at = now();

-- ── Verify ─────────────────────────────────────────────────
select p.name, p.slug, p.price_cents, ps.status
from public.products p
join public.product_stock ps on ps.product_id = p.id
where p.brand_slug = 'skinceuticals'
order by p.name;