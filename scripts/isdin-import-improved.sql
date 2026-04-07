-- ─────────────────────────────────────────────────────────────────────────────
-- ISDIN Product Import — Star Aesthetic Centre
-- Descriptions: CSV copy (SA market) + isdin.com clinical data blended
-- Prices: from WooCommerce CSV export
-- Run in Supabase SQL Editor AFTER the main schema has been applied.
-- ─────────────────────────────────────────────────────────────────────────────

do $$
declare
  v_cat_id  uuid := 'b5bbb096-aa27-4795-8361-3a2b255eedf7';  -- ISDIN category
  v_p1      uuid;
  v_p2      uuid;
  v_p3      uuid;
  v_p4      uuid;
  v_p5      uuid;
begin

-- ── 1. Fusion Water MAGIC SPF50 (Invisible) ──────────────────────────────────
insert into public.products (
  category_id, brand_slug, sku, name, slug,
  short_description, description,
  regular_price_cents, is_active, is_featured,
  tags, how_to_use
) values (
  v_cat_id, 'isdin', 'SA-ISDIN-FWM-001',
  'ISDIN Fusion Water MAGIC SPF50',
  'isdin-fusion-water-magic-spf50',

  -- Short description (hook)
  'If **sunscreen texture** is the reason you skip SPF, ISDIN Fusion Water Magic SPF50 will change that habit. This revolutionary **water-light formula** can even be applied on wet skin — it absorbs in seconds, leaves absolutely **no white cast or greasy residue**, and is so invisible you will forget you are wearing it.',

  -- Long description (SA copy + ISDIN clinical data blended)
  'ISDIN Fusion Water Magic SPF50 is a revolutionary **ultra-light sunscreen** featuring ISDIN''s innovative **Fusion Water technology**. This **oil-free formula** provides high **SPF50 protection** with an ultra-light, invisible finish that feels like water on the skin. Can be applied on wet skin, making it **perfect for beach and pool use**. The fast-absorbing formula leaves **no white cast or greasy residue**. Suitable for all skin types including **sensitive skin**. **Dermatologically tested**, hypoallergenic, **non-comedogenic**, and **biodegradable** formula. Water-resistant and sweat-resistant.

Formulated with **Hyaluronic Acid** for intense hydration, **Mediterranean Alga Extract** for antioxidant protection, and **Vitamin E** to defend against free radical damage.

**Clinically validated (4-week study):**
- **100%** of users confirm ultralight texture that absorbs immediately
- **93%** report no greasy feel after application
- **97%** confirm no eye irritation
- **90%** say it refreshes the skin
- **68% increase** in skin hydration at 30 minutes — lasting up to **12 hours**',

  63900,  -- R639.00
  true, true,
  array['sunscreen','spf50','daily-protection','oily-skin','non-comedogenic','hydrating','antioxidant','wet-skin','biodegradable'],
  'Apply generously onto **dry or wet skin**. The recommended amount for the face is **two finger-length lines** of product. Apply as the **final step** in your morning skincare routine. Reapply every 2 hours during prolonged sun exposure, and after swimming or sweating.'
)
returning id into v_p1;

-- ── 2. Fusion Water MAGIC Light SPF50 (Tinted — fair to light skin tones) ───
insert into public.products (
  category_id, brand_slug, sku, name, slug,
  short_description, description,
  regular_price_cents, is_active, is_featured,
  tags, how_to_use
) values (
  v_cat_id, 'isdin', 'SA-ISDIN-FWM-L-001',
  'ISDIN Fusion Water MAGIC Light SPF50',
  'isdin-fusion-water-magic-light-spf50',

  'If you have a **lighter skin tone** and want sun protection that also evens your complexion, ISDIN Fusion Water Magic Light SPF50 does both in one step. This **tinted ultra-light formula** delivers a natural **light-shade finish** that replaces your morning foundation — protection and perfection combined.',

  'ISDIN Fusion Water Magic Light SPF50 is the perfect fusion of **sun protection and light coverage**. This tinted sunscreen combines ISDIN''s revolutionary **Fusion Water technology** with a **light shade** that provides natural colour correction and evens out skin tone.

The **ultra-light formula** absorbs instantly, leaving an invisible finish with a subtle, natural glow. **SPF50 broad-spectrum protection** shields against UVA and UVB rays. Can be applied on **wet or dry skin** for convenience. The **light tint adapts to fair to light skin tones**, providing sheer coverage that enhances natural beauty while protecting.

**Oil-free**, non-comedogenic, hypoallergenic, and suitable for **sensitive skin**. Water and sweat resistant. Perfect as a **makeup base** or worn alone for a no-makeup look with full protection.

Also available in **Medium** and **Bronze** shades.',

  57500,  -- R575.00
  true, false,
  array['sunscreen','spf50','tinted','light-shade','daily-protection','coverage','tinted-sunscreen','fair-skin','wet-skin'],
  'Apply liberally to **dry or wet skin** thirty minutes prior to sun exposure. Reapply every 2 hours and after swimming, perspiring, or towelling. Apply as the **last step** in your morning skincare routine.'
)
returning id into v_p2;

-- ── 3. Fusion Water MAGIC Medium SPF50 (Tinted — medium skin tones) ──────────
insert into public.products (
  category_id, brand_slug, sku, name, slug,
  short_description, description,
  regular_price_cents, is_active, is_featured,
  tags, how_to_use
) values (
  v_cat_id, 'isdin', 'SA-ISDIN-FWM-M-001',
  'ISDIN Fusion Water MAGIC Medium SPF50',
  'isdin-fusion-water-magic-medium-spf50',

  'If you have a **medium skin tone** and want daily SPF that blends seamlessly into your complexion, ISDIN Fusion Water Magic Medium SPF50 is your match. This versatile tinted sunscreen suits the **broadest range of South African skin tones** — natural, buildable colour with full broad-spectrum protection.',

  'ISDIN Fusion Water Magic Medium SPF50 is advanced tinted sun protection designed for **medium skin tones**. This innovative formula combines ISDIN''s **Fusion Water technology** with a medium shade that provides **natural, buildable coverage** while delivering **SPF50 broad-spectrum protection**.

The **ultra-light texture** melts into skin, leaving no white cast or greasy residue. Perfect for everyday use, it **evens out skin tone and enhances natural radiance** while protecting against sun damage. The unique formula can be applied on **wet skin**, making it ideal for active lifestyles and water activities. Enriched with **antioxidants** to combat free radical damage.

**Oil-free**, non-comedogenic, and **dermatologically tested** for sensitive skin. Water resistant and sweat resistant for long-lasting protection. Works beautifully **alone or under makeup** as a protective, tinted primer.

Also available in **Light** and **Bronze** shades.',

  57500,  -- R575.00
  true, false,
  array['sunscreen','spf50','tinted','medium-shade','daily-protection','coverage','tinted-sunscreen','medium-skin','south-african-skin','wet-skin'],
  'Apply liberally to **dry or wet skin** thirty minutes prior to sun exposure. Reapply every 2 hours and after swimming, perspiring, or towelling. Apply as the **last step** in your morning skincare routine.'
)
returning id into v_p3;

-- ── 4. Fusion Water MAGIC Bronze SPF50 (Tinted — deeper skin tones) ──────────
insert into public.products (
  category_id, brand_slug, sku, name, slug,
  short_description, description,
  regular_price_cents, is_active, is_featured,
  tags, how_to_use
) values (
  v_cat_id, 'isdin', 'SA-ISDIN-FWM-B-001',
  'ISDIN Fusion Water MAGIC Bronze SPF50',
  'isdin-fusion-water-magic-bronze-spf50',

  'If you have a **deeper skin tone** or want a **sun-kissed bronze glow** with full SPF protection, ISDIN Fusion Water Magic Bronze SPF50 was made for you. This rich-toned ultra-light sunscreen enhances deeper complexions beautifully — **no white cast, no ashiness**, just glowing protected skin.',

  'ISDIN Fusion Water Magic Bronze SPF50 is a luxurious tinted sunscreen formulated for **deeper skin tones** or those seeking a natural, sun-kissed glow. This sophisticated formula marries ISDIN''s revolutionary **Fusion Water technology** with a rich **bronze shade** that enhances and evens out deeper complexions while providing **SPF50 broad-spectrum protection**.

The **ultra-light, oil-free texture** absorbs instantly without leaving any **ashiness or white cast** — a common concern with traditional sunscreens on darker skin tones. The bronze tint adds a **healthy, luminous finish** that complements natural melanin while protecting against UV damage.

Can be applied on **wet or dry skin** for ultimate convenience. Enriched with **antioxidants** to protect against environmental stressors and premature ageing. **Non-comedogenic**, hypoallergenic, and dermatologically tested. Water resistant and sweat resistant. Perfect for **everyday wear, beach days**, or as a radiant base under makeup.

Also available in **Light** and **Medium** shades.',

  57500,  -- R575.00
  true, false,
  array['sunscreen','spf50','tinted','bronze-shade','daily-protection','coverage','tinted-sunscreen','deeper-skin','no-white-cast','wet-skin','bronzing'],
  'Apply liberally to **dry or wet skin** thirty minutes prior to sun exposure. Reapply every 2 hours and after swimming, perspiring, or towelling. Apply as the **last step** in your morning skincare routine.'
)
returning id into v_p4;

-- ── 5. UV Mineral Brush SPF50+ ────────────────────────────────────────────────
insert into public.products (
  category_id, brand_slug, sku, name, slug,
  short_description, description,
  regular_price_cents, is_active, is_featured,
  tags, how_to_use
) values (
  v_cat_id, 'isdin', 'SA-ISDIN-UMB-001',
  'ISDIN UV Mineral Brush SPF50+',
  'isdin-uv-mineral-brush-spf50',

  'If wearing makeup means you **never reapply your SPF** during the day, the ISDIN UV Mineral Brush SPF50+ is the solution you have been looking for. This **portable powder brush** with 100% mineral filters lets you top up your sun protection **directly over foundation** — a 10-second sweep and your skin is fully protected again.',

  'ISDIN UV Mineral Brush SPF50+ is an innovative **portable sunscreen solution** in a convenient brush format. This game-changing product features **100% mineral sun filters (zinc oxide and titanium dioxide)** in a silky powder formula that provides **SPF50+ broad-spectrum protection**.

The **built-in brush** makes it incredibly easy to apply and reapply sunscreen throughout the day, even **over makeup**. Perfect for touch-ups, outdoor activities, and maintaining protection during long days in the sun. The **lightweight mineral powder** is suitable for all skin types, including **sensitive skin**, and won''t clog pores or feel heavy on the skin.

Provides a **natural, matte finish** that helps control shine while protecting. The **twist-up brush design** is mess-free and travel-friendly — ideal for your handbag, gym bag, or desk drawer. **Dermatologically and ophthalmologically tested**. Water resistant. Particularly beneficial for the delicate facial areas, including around the eyes.

Available in a **universal shade** that adapts to most skin tones. **Reapplication has never been easier.**',

  72900,  -- R729.00
  true, true,
  array['sunscreen','spf50','mineral','powder-sunscreen','sensitive-skin','reapplication','portable','physical-filters','over-makeup','mineral-filters','travel'],
  'Twist the base to release the mineral powder. **Sweep the brush lightly** over clean skin or directly over makeup in circular motions. Build protection with additional sweeps as needed. Reapply every 2 hours during sun exposure or after sweating. Tap off excess powder before the first application.'
)
returning id into v_p5;

-- ── Product images (filenames — update URLs after Supabase Storage upload) ────
insert into public.product_images (product_id, url, sort_order, is_primary) values
  (v_p1, 'isdin-fusion-water-magic-spf50-invisible-sunscreen.webp',     0, true),
  (v_p2, 'isdin-fusion-water-magic-light-spf50-tinted-sunscreen.webp',  0, true),
  (v_p3, 'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen.webp', 0, true),
  (v_p4, 'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen.webp', 0, true),
  (v_p5, 'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable.webp', 0, true);

-- ── Stock ─────────────────────────────────────────────────────────────────────
insert into public.product_stock (product_id, quantity, low_stock_threshold) values
  (v_p1, 10, 3),
  (v_p2, 10, 3),
  (v_p3, 10, 3),
  (v_p4, 10, 3),
  (v_p5,  5, 2);

raise notice '✅ ISDIN — 5 products imported';
raise notice '   R639  SA-ISDIN-FWM-001  Fusion Water MAGIC SPF50';
raise notice '   R575  SA-ISDIN-FWM-L-001  Fusion Water MAGIC Light SPF50';
raise notice '   R575  SA-ISDIN-FWM-M-001  Fusion Water MAGIC Medium SPF50';
raise notice '   R575  SA-ISDIN-FWM-B-001  Fusion Water MAGIC Bronze SPF50';
raise notice '   R729  SA-ISDIN-UMB-001   UV Mineral Brush SPF50+';

end $$;

-- ── Verify ────────────────────────────────────────────────────────────────────
select
  p.sku,
  p.name,
  to_char(p.regular_price_cents / 100.0, 'FM"R"999,990.00') as price,
  pi.url  as image_filename,
  ps.quantity as stock
from public.products p
left join public.product_images pi on pi.product_id = p.id and pi.is_primary = true
left join public.product_stock  ps on ps.product_id = p.id
where p.brand_slug = 'isdin'
order by p.regular_price_cents desc, p.name;
