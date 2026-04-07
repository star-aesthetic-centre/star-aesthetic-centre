-- ISDIN product_images: Supabase Storage URLs

-- Run AFTER isdin-insert.sql



insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-01.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  1
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-02.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  2
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-03.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  3
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-04.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  4
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-05.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  5
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-06.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  6
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-07.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  7
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-08.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  8
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-09.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  9
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen-10.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  10
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-bronze-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen.webp',
  'isdin-fusion-water-magic-bronze-spf50-tinted-sunscreen',
  0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-01.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  1
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-03.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  3
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-04.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  4
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-05.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  5
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-06.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  6
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-07.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  7
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-08.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  8
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen-09.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  9
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-spf50-invisible-sunscreen.webp',
  'isdin-fusion-water-magic-spf50-invisible-sunscreen',
  0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-02.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  2
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-03.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  3
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-04.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  4
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-05.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  5
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-06.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  6
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-07.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  7
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen-08.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  8
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-light-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-light-spf50-tinted-sunscreen.webp',
  'isdin-fusion-water-magic-light-spf50-tinted-sunscreen',
  0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-01.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  1
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-02.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  2
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-03.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  3
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-04.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  4
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-05.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  5
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-06.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  6
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-07.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  7
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-08.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  8
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-09.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  9
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen-10.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  10
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-fusion-water-magic-medium-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-fusion-water-magic-medium-spf50-tinted-sunscreen.webp',
  'isdin-fusion-water-magic-medium-spf50-tinted-sunscreen',
  0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-01.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  1
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-02.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  2
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-03.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  3
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-04.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  4
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-05.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  5
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-06.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  6
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-07.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  7
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable-08.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  8
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'isdin-uv-mineral-brush-spf50'),
  'https://kprfezokgsmbizisvcrb.supabase.co/storage/v1/object/public/product-images/isdin/isdin-uv-mineral-brush-spf50-powder-sunscreen-portable.webp',
  'isdin-uv-mineral-brush-spf50-powder-sunscreen-portable',
  0
)
on conflict do nothing;