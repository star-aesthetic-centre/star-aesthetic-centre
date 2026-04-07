-- ══════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — ISDIN Product Images
-- Image tiers:
--   sort_order 0   = primary (card + main hero image)
--   sort_order 1-3 = thumbnails (clickable below main image)
--   sort_order 4+  = description/lifestyle images (landscape gallery)
-- Run in: Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- Step 1: Remove all existing image records for ISDIN products
delete from public.product_images
where product_id in (
  select id from public.products where brand_slug = 'isdin'
);

-- ── Fusion Water Magic SPF50 (Invisible) ──────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen.webp',    'ISDIN Fusion Water Magic SPF50 Invisible',        0),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-01.webp', 'ISDIN Fusion Water Magic SPF50 - Thumbnail 2',    1),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-03.webp', 'ISDIN Fusion Water Magic SPF50 - Thumbnail 3',    2),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-04.webp', 'ISDIN Fusion Water Magic SPF50 - Thumbnail 4',    3),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-05.webp', 'ISDIN Fusion Water Magic SPF50 - Lifestyle 1',    4),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-06.webp', 'ISDIN Fusion Water Magic SPF50 - Lifestyle 2',    5),
  ('/images/isdin-fusion-water-magic-spf50-invisible-sunscreen-07.webp', 'ISDIN Fusion Water Magic SPF50 - Lifestyle 3',    6)
) as img(url, alt, sort_order)
where p.slug = 'isdin-fusion-water-magic-spf50';

-- ── Fusion Water Magic Light SPF50 ────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen.webp',    'ISDIN Fusion Water Magic Light SPF50',         0),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-02.webp', 'ISDIN Fusion Water Magic Light - Thumbnail 2', 1),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-03.webp', 'ISDIN Fusion Water Magic Light - Thumbnail 3', 2),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-04.webp', 'ISDIN Fusion Water Magic Light - Thumbnail 4', 3),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-05.webp', 'ISDIN Fusion Water Magic Light - Lifestyle 1', 4),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-06.webp', 'ISDIN Fusion Water Magic Light - Lifestyle 2', 5),
  ('/images/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-07.webp', 'ISDIN Fusion Water Magic Light - Lifestyle 3', 6)
) as img(url, alt, sort_order)
where p.slug = 'isdin-fusion-water-magic-light-spf50';

-- ── Fusion Water Magic Medium SPF50 ───────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen.webp',    'ISDIN Fusion Water Magic Medium SPF50',         0),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-01.webp', 'ISDIN Fusion Water Magic Medium - Thumbnail 2', 1),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-02.webp', 'ISDIN Fusion Water Magic Medium - Thumbnail 3', 2),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-03.webp', 'ISDIN Fusion Water Magic Medium - Thumbnail 4', 3),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-04.webp', 'ISDIN Fusion Water Magic Medium - Lifestyle 1', 4),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-05.webp', 'ISDIN Fusion Water Magic Medium - Lifestyle 2', 5),
  ('/images/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-06.webp', 'ISDIN Fusion Water Magic Medium - Lifestyle 3', 6)
) as img(url, alt, sort_order)
where p.slug = 'isdin-fusion-water-magic-medium-spf50';

-- ── Fusion Water Magic Bronze SPF50 ───────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen.webp',    'ISDIN Fusion Water Magic Bronze SPF50',         0),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-01.webp', 'ISDIN Fusion Water Magic Bronze - Thumbnail 2', 1),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-02.webp', 'ISDIN Fusion Water Magic Bronze - Thumbnail 3', 2),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-03.webp', 'ISDIN Fusion Water Magic Bronze - Thumbnail 4', 3),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-04.webp', 'ISDIN Fusion Water Magic Bronze - Lifestyle 1', 4),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-05.webp', 'ISDIN Fusion Water Magic Bronze - Lifestyle 2', 5),
  ('/images/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-06.webp', 'ISDIN Fusion Water Magic Bronze - Lifestyle 3', 6)
) as img(url, alt, sort_order)
where p.slug = 'isdin-fusion-water-magic-bronze-spf50';

-- ── UV Mineral Brush SPF50 Powder ─────────────────────────────────
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id, img.url, img.alt, img.sort_order
from public.products p
cross join (values
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable.webp',    'ISDIN UV Mineral Brush SPF50 Powder',         0),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-01.webp', 'ISDIN UV Mineral Brush - Thumbnail 2',        1),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-02.webp', 'ISDIN UV Mineral Brush - Thumbnail 3',        2),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-03.webp', 'ISDIN UV Mineral Brush - Thumbnail 4',        3),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-04.webp', 'ISDIN UV Mineral Brush - Lifestyle 1',        4),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-05.webp', 'ISDIN UV Mineral Brush - Lifestyle 2',        5),
  ('/images/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-06.webp', 'ISDIN UV Mineral Brush - Lifestyle 3',        6)
) as img(url, alt, sort_order)
where p.slug = 'isdin-uv-mineral-brush-spf50';
