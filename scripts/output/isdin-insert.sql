-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Import: isdin
-- Generated: 2026-03-23T11:37:42.345Z
-- Source: isdin-corrected-IMPORT-READY.csv
-- Products: 5
-- ═══════════════════════════════════════════════════════════

-- Add tags column to products if not already present
alter table public.products
  add column if not exists tags text[] not null default '{}';

-- ── Products ──────────────────────────────────────────────
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values
  ('ISDIN Fusion Water Magic SPF50', 'isdin-fusion-water-magic-spf50', 'SA-ISDIN-FWM-001', 'isdin', 'If sunscreen texture is the reason you skip SPF, ISDIN Fusion Water Magic SPF50 will change that habit. This revolutionary water-light formula can even be applied on wet skin — it absorbs in seconds, leaves absolutely no white cast or greasy residue, and is so invisible you will forget you are wearing it.', 'Fusion Water Magic SPF50: ISDIN Fusion Water Magic SPF50 - Revolutionary ultra-light sunscreen featuring ISDIN''s innovative Fusion Water technology. This oil-free formula provides high SPF50 protection with an ultra-light, invisible finish that feels like water on the skin. Can be applied on wet skin, making it perfect for beach and pool use. The fast-absorbing formula leaves no white cast or greasy residue. Suitable for all skin types including sensitive skin. Dermatologically tested, hypoallergenic, non-comedogenic, and biodegradable formula. Water-resistant and sweat-resistant. Contains antioxidants to protect against environmental damage.', 63900, 63900, true, ARRAY[]::text[]),
  ('ISDIN Fusion Water Magic Light SPF50', 'isdin-fusion-water-magic-light-spf50', 'SA-ISDIN-FWM-L-001', 'isdin', 'If you have a lighter skin tone and want sun protection that also evens your complexion, ISDIN Fusion Water Magic Light SPF50 does both in one step. This tinted ultra-light formula with Fusion Water technology delivers a natural light-shade finish that replaces your morning foundation — protection and perfection combined.', 'Fusion Water Magic Light SPF50: ISDIN Fusion Water Magic Light SPF50 - The perfect fusion of sun protection and light coverage. This tinted sunscreen combines ISDIN''s revolutionary Fusion Water technology with a light shade that provides natural color correction and evens out skin tone. The ultra-light formula absorbs instantly, leaving an invisible finish with a subtle, natural glow. SPF50 broad spectrum protection shields against UVA and UVB rays. Can be applied on wet skin for convenience. The light tint adapts to fair to light skin tones, providing sheer coverage that enhances natural beauty while protecting. Oil-free, non-comedogenic, hypoallergenic, and suitable for sensitive skin. Water and sweat resistant. Perfect as a makeup base or worn alone for a no-makeup look with protection.', 57500, 57500, true, ARRAY[]::text[]),
  ('ISDIN Fusion Water Magic Medium SPF50', 'isdin-fusion-water-magic-medium-spf50', 'SA-ISDIN-FWM-M-001', 'isdin', 'If you have a medium skin tone and want daily SPF that blends seamlessly into your complexion, ISDIN Fusion Water Magic Medium SPF50 is your match. This versatile tinted sunscreen with Fusion Water technology suits the broadest range of South African skin tones — natural, buildable colour with full broad-spectrum protection.', 'Fusion Water Magic Medium SPF50: ISDIN Fusion Water Magic Medium SPF50 - Advanced tinted sun protection designed for medium skin tones. This innovative formula combines ISDIN''s Fusion Water technology with a medium shade that provides natural, buildable coverage while delivering SPF50 broad spectrum protection. The ultra-light texture melts into skin, leaving no white cast or greasy residue. Perfect for everyday use, it evens out skin tone and enhances natural radiance while protecting against sun damage. The unique formula can be applied on wet skin, making it ideal for active lifestyles and water activities. Enriched with antioxidants to combat free radical damage. Oil-free, non-comedogenic, and dermatologically tested for sensitive skin. Water resistant and sweat resistant for long-lasting protection. Works beautifully alone or under makeup as a protective, tinted primer.', 57500, 57500, true, ARRAY[]::text[]),
  ('ISDIN Fusion Water Magic Bronze SPF50', 'isdin-fusion-water-magic-bronze-spf50', 'SA-ISDIN-FWM-B-001', 'isdin', 'If you have a deeper skin tone or want a sun-kissed bronze glow with full SPF protection, ISDIN Fusion Water Magic Bronze SPF50 was made for you. This rich-toned ultra-light sunscreen with Fusion Water technology enhances deeper complexions beautifully — no white cast, no ashiness, just glowing protected skin.', 'Fusion Water Magic Bronze SPF50: ISDIN Fusion Water Magic Bronze SPF50 - Luxurious tinted sunscreen formulated for deeper skin tones or those seeking a natural, sun-kissed glow. This sophisticated formula marries ISDIN''s revolutionary Fusion Water technology with a rich bronze shade that enhances and evens out deeper complexions while providing SPF50 broad spectrum protection. The ultra-light, oil-free texture absorbs instantly without leaving any ashiness or white cast - a common concern with traditional sunscreens on darker skin tones. The bronze tint adds a healthy, luminous finish that complements natural melanin while protecting against UV damage. Can be applied on wet or dry skin for ultimate convenience. The formula is enriched with antioxidants to protect against environmental stressors and premature aging. Non-comedogenic, hypoallergenic, and dermatologically tested. Water resistant and sweat resistant. Perfect for everyday wear, beach days, or as a radiant base under makeup.', 57500, 57500, true, ARRAY[]::text[]),
  ('ISDIN UV Mineral Brush SPF50+', 'isdin-uv-mineral-brush-spf50', 'SA-ISDIN-UMB-001', 'isdin', 'If wearing makeup means you never reapply your SPF during the day, the ISDIN UV Mineral Brush SPF50+ is the solution you have been looking for. This portable powder brush with 100% mineral filters lets you top up your sun protection directly over foundation — a 10-second sweep and your skin is fully protected again.', 'UV Mineral Brush SPF50+: ISDIN UV Mineral Brush SPF50+ - Innovative portable sunscreen solution in a convenient brush format. This game-changing product features 100% mineral sun filters (zinc oxide and titanium dioxide) in a silky powder formula that provides SPF50+ broad spectrum protection. The built-in brush makes it incredibly easy to apply and reapply sunscreen throughout the day, even over makeup. Perfect for touch-ups, outdoor activities, and maintaining protection during long days in the sun. The lightweight mineral powder is suitable for all skin types, including sensitive skin, and won''t clog pores or feel heavy on the skin. Provides a natural, matte finish that helps control shine while protecting. The twist-up brush design is mess-free and travel-friendly - ideal for your handbag, gym bag, or desk drawer. Dermatologically and ophthalmologically tested. Water resistant. Particularly beneficial for the delicate facial areas, including around the eyes. Available in a universal shade that adapts to most skin tones. Reapplication has never been easier or more convenient!', 72900, 72900, true, ARRAY[]::text[])
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
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'), 'isdin-fusion-water-magic-spf50-invisible-sunscreen-800.jpg', 'ISDIN Fusion Water Magic SPF50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'), 'isdin-fusion-water-magic-light-spf50-tinted-sunscreen-800.jpg', 'ISDIN Fusion Water Magic Light SPF50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'), 'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-800.jpg', 'ISDIN Fusion Water Magic Medium SPF50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'), 'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-800.jpg', 'ISDIN Fusion Water Magic Bronze SPF50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'), 'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-800.jpg', 'ISDIN UV Mineral Brush SPF50+', 0
)
on conflict do nothing;

-- ── Product Stock ─────────────────────────────────────────
insert into public.product_stock (product_id, status, quantity)
values
  ((select id from public.products where slug = 'isdin-fusion-water-magic-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'), 'IN_STOCK', NULL)
on conflict (product_id) do update set
  status     = excluded.status,
  quantity   = excluded.quantity,
  updated_at = now();

-- ── Verify ─────────────────────────────────────────────────
select p.name, p.slug, p.price_cents, ps.status
from public.products p
join public.product_stock ps on ps.product_id = p.id
where p.brand_slug = 'isdin'
order by p.name;