-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Import: mesoestetic
-- Generated: 2026-03-23T11:37:42.790Z
-- Source: mesoestetic-corrected-IMPORT-READY.csv
-- Products: 14
-- ═══════════════════════════════════════════════════════════

-- Add tags column to products if not already present
alter table public.products
  add column if not exists tags text[] not null default '{}';

-- ── Products ──────────────────────────────────────────────
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values
  ('Mesoestetic Anti-Stress Face Mask', 'mesoestetic-anti-stress-face-mask', 'SA-MESO-ASFM-001', 'mesoestetic', 'If your skin feels reactive, inflamed or overwhelmed after treatments, the Mesoestetic Anti-Stress Face Mask is your instant reset. This calming and repairing mask soothes sensitivity, reduces redness and restores the skin barrier — leaving your complexion calm, comfortable and visibly refreshed after just one use.', 'Anti-Stress Face Mask: Mesoestetic Anti-Stress Face Mask - Calming and Repairing Mask for Sensitive Skin', 217200, 217200, true, ARRAY['face mask', 'calming mask', 'sensitive skin', 'barrier repair', 'anti-redness', 'post-treatment', 'repairing', 'Hydration & Barrier', 'Mesoestetic']),
  ('Mesoestetic Aox Ferulic', 'mesoestetic-aox-ferulic', 'SA-MESO-AXF-001', 'mesoestetic', 'If premature ageing, dullness and environmental damage are your daily skin battles, Mesoestetic Aox Ferulic is your morning armour. This high-potency antioxidant serum combines Vitamin C, ferulic acid and the exclusive Protech-Cell Complex to neutralise free radicals, stimulate collagen and visibly brighten — the serum that makes every other product work harder.', 'Aox Ferulic: Mesoestetic Aox Ferulic - Antioxidant and Anti-Ageing Serum with Vitamin C, Ferulic Acid, and Protech-Cell Complex', 397300, 397300, true, ARRAY['Vitamin C serum', 'ferulic acid', 'antioxidant', 'anti-ageing', 'brightening', 'collagen', 'Protech-Cell', 'AGE Element', 'Mesoestetic']),
  ('Mesoestetic Fast Skin Repair', 'mesoestetic-fast-skin-repair', 'SA-MESO-FSR-001', 'mesoestetic', 'If your skin needs to recover quickly after a Dermapen, chemical peel or any intensive treatment, Mesoestetic Fast Skin Repair is what Dr. Bangalee reaches for. This regenerating and revitalising cream accelerates the healing process, reduces post-treatment redness and restores the skin''s natural resilience — faster than your skin would recover on its own.', 'Fast Skin Repair: Mesoestetic Fast Skin Repair - Regenerating and Revitalising Cream for Damaged Skin', 183300, 183300, true, ARRAY['post-treatment', 'skin repair', 'regenerating', 'recovery cream', 'Dermapen', 'skin peel', 'redness', 'Post-Treatment Recovery', 'Mesoestetic']),
  ('Mesoestetic Melan Recovery', 'mesoestetic-melan-recovery', 'SA-MESO-MELR-001', 'mesoestetic', 'If your skin is red, sore or sensitive after a pigmentation treatment or skin peel, Mesoestetic Melan Recovery gives it exactly what it needs. This soothing anti-redness balm calms inflammation, supports the healing of pigmented skin and prepares your complexion to resume the depigmentation protocol as quickly as possible.', 'Melan Recovery: Mesoestetic Melan Recovery - Soothing and Anti-Redness Balm for Pigmented Skin', 210000, 210000, true, ARRAY['soothing balm', 'anti-redness', 'pigmented skin', 'post-peel', 'barrier repair', 'calming', 'Melan Tran3x', 'pigmentation recovery', 'Mesoestetic']),
  ('Mesoestetic Melan Tran3x Concentrate', 'mesoestetic-melan-tran3x-concentrate', 'SA-MESO-MEL-T3X-C-001', 'mesoestetic', 'If stubborn dark spots, melasma or post-inflammatory hyperpigmentation have resisted everything you have tried, Mesoestetic Melan Tran3x Concentrate is the intensive clinical answer. This powerful depigmenting serum works at the deepest level to interrupt melanin production and fade existing discolouration — the cornerstone of the Melan Tran3x depigmentation protocol.', 'Melan Tran3x Concentrate: Mesoestetic Melan Tran3x Concentrate - Intensive Depigmenting Serum for Dark Spots', 277800, 277800, true, ARRAY['depigmenting serum', 'dark spots', 'melasma', 'hyperpigmentation', 'PIH', 'intensive treatment', 'Melan Tran3x', 'pigmentation', 'Mesoestetic']),
  ('Mesoestetic Melan Tran3x Gel-Cream', 'mesoestetic-melan-tran3x-gel-cream', 'SA-MESO-MEL-T3X-GC-001', 'mesoestetic', 'If you need a daily depigmenting moisturiser that works while you go about your life, Mesoestetic Melan Tran3x Gel-Cream is your everyday step. This lightweight gel-cream formula combines ongoing depigmentation with daily hydration — maintaining an even, luminous skin tone between treatments and keeping the Melan Tran3x protocol on track.', 'Melan Tran3x Gel ”“ Cream: Mesoestetic Melan Tran3x Gel ”“ Cream - Daily Depigmenting Cream for Even Skin Tone', 191000, 191000, true, ARRAY['depigmenting cream', 'daily moisturiser', 'dark spots', 'even skin tone', 'gel cream', 'pigmentation maintenance', 'Melan Tran3x', 'Mesoestetic']),
  ('Mesoestetic Mesoprotech Melan 130+ Pigment Control SPF50+', 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50', 'SA-MESO-MEL-130-PC-001', 'mesoestetic', 'If you are treating pigmentation and want an SPF that actively works against new dark spots forming, Mesoprotech Melan 130+ Pigment Control SPF50+ is the only sunscreen you need. This clinically advanced tinted sunscreen combines SPF50+ broad-spectrum protection with depigmenting actives — preventing pigmentation from returning while you treat it.', 'Mesoprotech Melan 130+ Pigment Control: Mesoestetic Mesoprotech Melan 130+ Pigment Control - Sunscreen with SPF 50+ and Colour for Skin with Pigmentation Imperfections', 162800, 162800, true, ARRAY['SPF50', 'pigment control sunscreen', 'anti-pigmentation SPF', 'tinted sunscreen', 'melasma', 'dark spots', 'Mesoprotech', 'post-pigmentation treatment', 'Mesoestetic']),
  ('Mesoestetic Brightening Foam', 'mesoestetic-brightening-foam', 'SA-MESO-BRF-001', 'mesoestetic', 'If your daily cleanser is just removing makeup without doing anything more, Mesoestetic Brightening Foam takes your morning routine further. This gentle exfoliating cleanser with glycolic acid dissolves dead skin cells, unclogs pores and primes your skin to absorb every product that follows — the first step that makes the rest of your routine work.', 'Brightening Foam: Mesoestetic Brightening Foam - Gentle Exfoliating Cleanser with Glycolic Acid', 117800, 117800, true, ARRAY['glycolic acid cleanser', 'exfoliating cleanser', 'brightening', 'clogged pores', 'daily cleanser', 'AHA', 'Cleansing', 'entry product', 'Mesoestetic']),
  ('Mesoestetic Hydracream Fusion', 'mesoestetic-hydracream-fusion', 'SA-MESO-HCF-001', 'mesoestetic', 'If dry or dehydrated skin leaves you feeling tight, uncomfortable and dull despite everything you apply, Mesoestetic Hydracream Fusion provides the deep nourishment your skin barrier is missing. This rich hydrating cream replenishes lipids, restores moisture balance and gives your skin the plump, comfortable feel that signals a healthy, well-functioning barrier.', 'Hydracream Fusion: Mesoestetic Hydracream Fusion - Rich Nourishing Hydrating Cream', 133400, 133400, true, ARRAY['rich moisturiser', 'dry skin', 'hydrating cream', 'barrier repair', 'dehydrated skin', 'nourishing', 'post-procedure', 'Hydration & Barrier', 'Mesoestetic']),
  ('Mesoestetic Melan Tranex Kit', 'mesoestetic-melan-tranex-kit', 'SA-MESO-MELTXK-001', 'mesoestetic', 'If you are serious about tackling pigmentation and want a complete at-home depigmentation system in one purchase, the Mesoestetic Melan Tranex Kit has everything you need. This comprehensive treatment system combines clinically proven depigmenting actives to interrupt melanin at every stage — a structured protocol that delivers the results you would expect from a clinic, in your own home.', 'Melan Tranex Kit: Mesoestetic Melan Tranex Kit - Complete Depigmentation Treatment System', 581200, 581200, true, ARRAY['depigmentation kit', 'complete system', 'melasma', 'dark spots', 'hyperpigmentation', 'home treatment', 'Melan Tran3x', 'pigmentation protocol', 'Mesoestetic']),
  ('Mesoestetic Cosmelan 2 Maintenance Cream', 'mesoestetic-cosmelan-2-maintenance-cream', 'SA-MESO-COS2-001', 'mesoestetic', 'If you have completed a professional Cosmelan depigmentation peel with Dr. Bangalee, Cosmelan 2 Maintenance Cream is the essential next step. This clinic-exclusive home maintenance cream sustains and extends the results of your in-clinic Cosmelan treatment — protecting the investment you have made in your skin and preventing pigmentation from returning.', 'Cosmelan 2: Mesoestetic Cosmelan 2 Maintenance Cream - Professional Depigmenting Home Care', 663500, 663500, true, ARRAY['Cosmelan', 'maintenance cream', 'post-peel', 'depigmentation maintenance', 'clinic-exclusive', 'professional', 'melasma', 'pigmentation prevention', 'Mesoestetic']),
  ('Mesoestetic Hydratonic Mist', 'mesoestetic-hydratonic-mist', 'SA-MESO-HYM-001', 'mesoestetic', 'If your skin needs a quick hydration boost between steps, after treatments, or simply during a long day, Mesoestetic Hydratonic Mist refreshes in seconds. This lightweight facial toner spray delivers instant moisture and prepares your skin to absorb serums and moisturisers more effectively — a simple daily step that makes everything else work better.', 'Hydratonic Mist: Mesoestetic Hydratonic Mist - Refreshing Hydrating Facial Toner Spray', 153300, 153300, true, ARRAY['facial mist', 'toner spray', 'hydrating', 'refreshing', 'all skin types', 'layering', 'post-treatment mist', 'Hydration & Barrier', 'Mesoestetic']),
  ('Mesoestetic HA Densimatrix', 'mesoestetic-ha-densimatrix', 'SA-MESO-HAD-001', 'mesoestetic', 'If fine lines, loss of firmness and visible dehydration are your primary skin concerns, Mesoestetic HA Densimatrix works at every depth. This premium multi-level hyaluronic acid serum targets skin at the surface, mid-layer and deep dermis simultaneously — the HA serum that provides the same plumping and volumising effect your filler treatments deliver, in a daily home-care step.', 'HA Densimatrix: Mesoestetic HA Densimatrix - Multi-Level Hyaluronic Acid Serum', 331900, 331900, true, ARRAY['hyaluronic acid serum', 'multi-level HA', 'plumping', 'anti-ageing', 'firmness', 'fine lines', 'dehydration', 'AGE Element', 'Mesoestetic']),
  ('Mesoestetic AGE Element Brightening Eye Cream', 'mesoestetic-age-element-brightening-eye-cream', 'SA-MESO-AGE-BEC-001', 'mesoestetic', 'If dark circles, puffiness and fine lines around your eyes are making you look more tired than you feel, Mesoestetic AGE Element Brightening Eye Cream targets all three at once. This advanced anti-dark-circle eye treatment brightens the under-eye area, reduces puffiness and softens crow''s feet — so your eyes reflect how you actually feel inside.', 'AGE Element Brightening Eye Cream: Mesoestetic AGE Element Brightening Eye Cream - Anti-Dark Circle Eye Treatment', 162900, 162900, true, ARRAY['eye cream', 'dark circles', 'puffiness', 'fine lines', 'crow''s feet', 'brightening', 'anti-ageing', 'AGE Element', 'Mesoestetic'])
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
  (select id from public.products where slug = 'mesoestetic-anti-stress-face-mask'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-anti-stress-face-mask.jpg', 'Mesoestetic Anti-Stress Face Mask', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-aox-ferulic'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate.jpg', 'Mesoestetic Aox Ferulic', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-fast-skin-repair'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-fast-skin-repair.jpg', 'Mesoestetic Fast Skin Repair', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-melan-recovery'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-recovery-cosmeceutical-solution.jpg', 'Mesoestetic Melan Recovery', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-melan-tran3x-concentrate'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-tran3x-intensive-concentrate.jpg', 'Mesoestetic Melan Tran3x Concentrate', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-melan-tran3x-gel-cream'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-tran3x-daily-gel-cream.jpg', 'Mesoestetic Melan Tran3x Gel-Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-mesoprotech-melan-130-plus-pigment-control.jpg', 'Mesoestetic Mesoprotech Melan 130+ Pigment Control SPF50+', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-brightening-foam'), 'mesoestetic-brightening-foam-glycolic-acid-exfoliating-cleanser-800.jpg', 'Mesoestetic Brightening Foam', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-hydracream-fusion'), 'mesoestetic-hydracream-fusion-nourishing-hydrating-moisturizer-800.jpg', 'Mesoestetic Hydracream Fusion', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-melan-tranex-kit'), 'mesoestetic-melan-tranex-kit-complete-depigmentation-system-800.jpg', 'Mesoestetic Melan Tranex Kit', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-cosmelan-2-maintenance-cream'), 'mesoestetic-cosmelan-2-maintenance-depigmentation-home-treatment-800.jpg', 'Mesoestetic Cosmelan 2 Maintenance Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-hydratonic-mist'), 'mesoestetic-hydratonic-mist-hydrating-facial-toner-spray-800.jpg', 'Mesoestetic Hydratonic Mist', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-ha-densimatrix'), 'mesoestetic-ha-densimatrix-hyaluronic-acid-anti-aging-serum-800.jpg', 'Mesoestetic HA Densimatrix', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'mesoestetic-age-element-brightening-eye-cream'), 'mesoestetic-age-element-brightening-eye-cream-dark-circles-800.jpg', 'Mesoestetic AGE Element Brightening Eye Cream', 0
)
on conflict do nothing;

-- ── Product Stock ─────────────────────────────────────────
insert into public.product_stock (product_id, status, quantity)
values
  ((select id from public.products where slug = 'mesoestetic-anti-stress-face-mask'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-aox-ferulic'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-fast-skin-repair'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-melan-recovery'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-melan-tran3x-concentrate'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-melan-tran3x-gel-cream'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-brightening-foam'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-hydracream-fusion'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-melan-tranex-kit'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-cosmelan-2-maintenance-cream'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-hydratonic-mist'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-ha-densimatrix'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'mesoestetic-age-element-brightening-eye-cream'), 'IN_STOCK', NULL)
on conflict (product_id) do update set
  status     = excluded.status,
  quantity   = excluded.quantity,
  updated_at = now();

-- ── Verify ─────────────────────────────────────────────────
select p.name, p.slug, p.price_cents, ps.status
from public.products p
join public.product_stock ps on ps.product_id = p.id
where p.brand_slug = 'mesoestetic'
order by p.name;