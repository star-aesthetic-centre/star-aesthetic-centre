-- SkinCeuticals Product Images Seeding
-- Generated from processed WebP files in public/images/
-- sort_order: 0=primary, 1-3=thumbnails, 4+=lifestyle

-- Clear any old placeholder images first
delete from public.product_images
where product_id in (select id from public.products where brand_slug = 'skinceuticals');

-- SkinCeuticals Advanced Brightening UV Defense SPF50
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen.webp', 'SkinCeuticals Advanced Brightening UV Defense SPF50 — primary', 0),
  ('/images/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen-01.webp', 'SkinCeuticals Advanced Brightening UV Defense SPF50 image 1', 1),
  ('/images/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen-02.webp', 'SkinCeuticals Advanced Brightening UV Defense SPF50 image 2', 2),
  ('/images/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen-03.webp', 'SkinCeuticals Advanced Brightening UV Defense SPF50 image 3', 3)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-advanced-brightening-uv-defense-spf50';

-- SkinCeuticals AGE Eye Complex
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment.webp', 'SkinCeuticals AGE Eye Complex — primary', 0),
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment-01.webp', 'SkinCeuticals AGE Eye Complex image 1', 1),
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment-02.webp', 'SkinCeuticals AGE Eye Complex image 2', 2),
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment-03.webp', 'SkinCeuticals AGE Eye Complex image 3', 3),
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment-04.webp', 'SkinCeuticals AGE Eye Complex image 4', 4),
  ('/images/skinceuticals-age-eye-complex-anti-aging-treatment-05.webp', 'SkinCeuticals AGE Eye Complex image 5', 5)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-age-eye-complex';

-- SkinCeuticals AGE Interrupter Advanced
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream.webp', 'SkinCeuticals AGE Interrupter Advanced — primary', 0),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-01.webp', 'SkinCeuticals AGE Interrupter Advanced image 1', 1),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-02.webp', 'SkinCeuticals AGE Interrupter Advanced image 2', 2),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-03.webp', 'SkinCeuticals AGE Interrupter Advanced image 3', 3),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-04.webp', 'SkinCeuticals AGE Interrupter Advanced image 4', 4),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-05.webp', 'SkinCeuticals AGE Interrupter Advanced image 5', 5),
  ('/images/skinceuticals-age-interrupter-advanced-wrinkle-cream-06.webp', 'SkinCeuticals AGE Interrupter Advanced image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-age-interrupter-advanced';

-- SkinCeuticals Blemish + AGE Serum
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment.webp', 'SkinCeuticals Blemish + AGE Serum — primary', 0),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-01.webp', 'SkinCeuticals Blemish + AGE Serum image 1', 1),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-02.webp', 'SkinCeuticals Blemish + AGE Serum image 2', 2),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-03.webp', 'SkinCeuticals Blemish + AGE Serum image 3', 3),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-04.webp', 'SkinCeuticals Blemish + AGE Serum image 4', 4),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-05.webp', 'SkinCeuticals Blemish + AGE Serum image 5', 5),
  ('/images/skinceuticals-blemish-age-defense-serum-acne-anti-aging-treatment-06.webp', 'SkinCeuticals Blemish + AGE Serum image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-blemish-age-serum';

-- SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid — primary', 0),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-01.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 1', 1),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-02.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 2', 2),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-03.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 3', 3),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-04.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 4', 4),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-05.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 5', 5),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-06.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 6', 6),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-07.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 7', 7),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-08.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 8', 8),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-09.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 9', 9),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-10.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 10', 10),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-11.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 11', 11),
  ('/images/skinceuticals-c-e-ferulic-15-percent-l-ascorbic-acid-12.webp', 'SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid image 12', 12)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid';

-- SkinCeuticals Discoloration Defense
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector.webp', 'SkinCeuticals Discoloration Defense — primary', 0),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-01.webp', 'SkinCeuticals Discoloration Defense image 1', 1),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-02.webp', 'SkinCeuticals Discoloration Defense image 2', 2),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-03.webp', 'SkinCeuticals Discoloration Defense image 3', 3),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-04.webp', 'SkinCeuticals Discoloration Defense image 4', 4),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-05.webp', 'SkinCeuticals Discoloration Defense image 5', 5),
  ('/images/skinceuticals-discoloration-defense-dark-spot-corrector-06.webp', 'SkinCeuticals Discoloration Defense image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-discoloration-defense';

-- SkinCeuticals Gentle Cleanser
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash.webp', 'SkinCeuticals Gentle Cleanser — primary', 0),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-01.webp', 'SkinCeuticals Gentle Cleanser image 1', 1),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-02.webp', 'SkinCeuticals Gentle Cleanser image 2', 2),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-03.webp', 'SkinCeuticals Gentle Cleanser image 3', 3),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-04.webp', 'SkinCeuticals Gentle Cleanser image 4', 4),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-05.webp', 'SkinCeuticals Gentle Cleanser image 5', 5),
  ('/images/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-06.webp', 'SkinCeuticals Gentle Cleanser image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-gentle-cleanser';

-- SkinCeuticals Glycolic 10 Renew Overnight
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-glycolic-10-renew-overnight-50ml.webp', 'SkinCeuticals Glycolic 10 Renew Overnight — primary', 0),
  ('/images/skinceuticals-glycolic-10-renew-overnight-50ml-01.webp', 'SkinCeuticals Glycolic 10 Renew Overnight image 1', 1),
  ('/images/skinceuticals-glycolic-10-renew-overnight-50ml-02.webp', 'SkinCeuticals Glycolic 10 Renew Overnight image 2', 2),
  ('/images/skinceuticals-glycolic-10-renew-overnight-50ml-03.webp', 'SkinCeuticals Glycolic 10 Renew Overnight image 3', 3),
  ('/images/skinceuticals-glycolic-10-renew-overnight-50ml-04.webp', 'SkinCeuticals Glycolic 10 Renew Overnight image 4', 4)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-glycolic-10-renew-overnight';

-- SkinCeuticals Glycolic Renewal Cleanser
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel.webp', 'SkinCeuticals Glycolic Renewal Cleanser — primary', 0),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-01.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 1', 1),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-02.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 2', 2),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-03.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 3', 3),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-04.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 4', 4),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-05.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 5', 5),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-06.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 6', 6),
  ('/images/skinceuticals-glycolic-renewal-cleanser-gel-07.webp', 'SkinCeuticals Glycolic Renewal Cleanser image 7', 7)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-glycolic-renewal-cleanser';

-- SkinCeuticals Hyaluronic Acid Intensifier (H.A.)
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) — primary', 0),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-01.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 1', 1),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-02.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 2', 2),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-03.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 3', 3),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-04.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 4', 4),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-05.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 5', 5),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-06.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 6', 6),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-07.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 7', 7),
  ('/images/skinceuticals-hyaluronic-acid-intensifier-ha-08.webp', 'SkinCeuticals Hyaluronic Acid Intensifier (H.A.) image 8', 8)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-hyaluronic-acid-intensifier-ha';

-- SkinCeuticals Hydrating B5 Gel
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-hydrating-b5-gel.webp', 'SkinCeuticals Hydrating B5 Gel — primary', 0),
  ('/images/skinceuticals-hydrating-b5-gel-01.webp', 'SkinCeuticals Hydrating B5 Gel image 1', 1),
  ('/images/skinceuticals-hydrating-b5-gel-02.webp', 'SkinCeuticals Hydrating B5 Gel image 2', 2),
  ('/images/skinceuticals-hydrating-b5-gel-03.webp', 'SkinCeuticals Hydrating B5 Gel image 3', 3),
  ('/images/skinceuticals-hydrating-b5-gel-04.webp', 'SkinCeuticals Hydrating B5 Gel image 4', 4),
  ('/images/skinceuticals-hydrating-b5-gel-05.webp', 'SkinCeuticals Hydrating B5 Gel image 5', 5),
  ('/images/skinceuticals-hydrating-b5-gel-06.webp', 'SkinCeuticals Hydrating B5 Gel image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-hydrating-b5-gel';

-- SkinCeuticals Phloretin CF® with Ferulic Acid
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid — primary', 0),
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid-01.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid image 1', 1),
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid-02.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid image 2', 2),
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid-03.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid image 3', 3),
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid-04.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid image 4', 4),
  ('/images/skinceuticals-phloretin-cf-with-ferulic-acid-05.webp', 'SkinCeuticals Phloretin CF® with Ferulic Acid image 5', 5)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-phloretin-cf-with-ferulic-acid';

-- SkinCeuticals Phyto A+ Brightening Treatment
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative.webp', 'SkinCeuticals Phyto A+ Brightening Treatment — primary', 0),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-01.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 1', 1),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-02.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 2', 2),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-03.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 3', 3),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-04.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 4', 4),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-05.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 5', 5),
  ('/images/skinceuticals-phyto-a-plus-brightening-retinol-alternative-06.webp', 'SkinCeuticals Phyto A+ Brightening Treatment image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-phyto-a-brightening-treatment';

-- SkinCeuticals PTIOX
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum.webp', 'SkinCeuticals PTIOX — primary', 0),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-01.webp', 'SkinCeuticals PTIOX image 1', 1),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-02.webp', 'SkinCeuticals PTIOX image 2', 2),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-03.webp', 'SkinCeuticals PTIOX image 3', 3),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-04.webp', 'SkinCeuticals PTIOX image 4', 4),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-04.webp', 'SkinCeuticals PTIOX image 4', 4),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-05.webp', 'SkinCeuticals PTIOX image 5', 5),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-06.webp', 'SkinCeuticals PTIOX image 6', 6),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-07.webp', 'SkinCeuticals PTIOX image 7', 7),
  ('/images/skinceuticals-p-tiox-pollution-defense-antioxidant-serum-08.webp', 'SkinCeuticals PTIOX image 8', 8)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-ptiox';

-- SkinCeuticals Resveratrol BE
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum.webp', 'SkinCeuticals Resveratrol BE — primary', 0),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-01.webp', 'SkinCeuticals Resveratrol BE image 1', 1),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-02.webp', 'SkinCeuticals Resveratrol BE image 2', 2),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-03.webp', 'SkinCeuticals Resveratrol BE image 3', 3),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-04.webp', 'SkinCeuticals Resveratrol BE image 4', 4),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-05.webp', 'SkinCeuticals Resveratrol BE image 5', 5),
  ('/images/skinceuticals-resveratrol-be-night-antioxidant-serum-06.webp', 'SkinCeuticals Resveratrol BE image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-resveratrol-be';

-- SkinCeuticals Retinol 0.3
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream.webp', 'SkinCeuticals Retinol 0.3 — primary', 0),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-01.webp', 'SkinCeuticals Retinol 0.3 image 1', 1),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-02.webp', 'SkinCeuticals Retinol 0.3 image 2', 2),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-03.webp', 'SkinCeuticals Retinol 0.3 image 3', 3),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-04.webp', 'SkinCeuticals Retinol 0.3 image 4', 4),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-05.webp', 'SkinCeuticals Retinol 0.3 image 5', 5),
  ('/images/skinceuticals-retinol-0-3-beginner-anti-aging-cream-06.webp', 'SkinCeuticals Retinol 0.3 image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-retinol-03';

-- SkinCeuticals Retinol 0.5
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment.webp', 'SkinCeuticals Retinol 0.5 — primary', 0),
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-01.webp', 'SkinCeuticals Retinol 0.5 image 1', 1),
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-02.webp', 'SkinCeuticals Retinol 0.5 image 2', 2),
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-03.webp', 'SkinCeuticals Retinol 0.5 image 3', 3),
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-04.webp', 'SkinCeuticals Retinol 0.5 image 4', 4),
  ('/images/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-05.webp', 'SkinCeuticals Retinol 0.5 image 5', 5)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-retinol-05';

-- SkinCeuticals Retinol 1.0
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging.webp', 'SkinCeuticals Retinol 1.0 — primary', 0),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-01.webp', 'SkinCeuticals Retinol 1.0 image 1', 1),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-02.webp', 'SkinCeuticals Retinol 1.0 image 2', 2),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-03.webp', 'SkinCeuticals Retinol 1.0 image 3', 3),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-04.webp', 'SkinCeuticals Retinol 1.0 image 4', 4),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-05.webp', 'SkinCeuticals Retinol 1.0 image 5', 5),
  ('/images/skinceuticals-retinol-1-0-maximum-strength-anti-aging-06.webp', 'SkinCeuticals Retinol 1.0 image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-retinol-10';

-- SkinCeuticals Serum 10 AOX
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant.webp', 'SkinCeuticals Serum 10 AOX — primary', 0),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-01.webp', 'SkinCeuticals Serum 10 AOX image 1', 1),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-02.webp', 'SkinCeuticals Serum 10 AOX image 2', 2),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-03.webp', 'SkinCeuticals Serum 10 AOX image 3', 3),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-04.webp', 'SkinCeuticals Serum 10 AOX image 4', 4),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-05.webp', 'SkinCeuticals Serum 10 AOX image 5', 5),
  ('/images/skinceuticals-serum-10-aox-vitamin-c-antioxidant-06.webp', 'SkinCeuticals Serum 10 AOX image 6', 6)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-serum-10-aox';

-- SkinCeuticals Triple Lipid Restore
insert into public.product_images (product_id, url, alt_text, sort_order)
select p.id,
       v.url, v.alt_text, v.sort_order
from public.products p
cross join (values
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream.webp', 'SkinCeuticals Triple Lipid Restore — primary', 0),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-01.webp', 'SkinCeuticals Triple Lipid Restore image 1', 1),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-02.webp', 'SkinCeuticals Triple Lipid Restore image 2', 2),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-03.webp', 'SkinCeuticals Triple Lipid Restore image 3', 3),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-04.webp', 'SkinCeuticals Triple Lipid Restore image 4', 4),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-05.webp', 'SkinCeuticals Triple Lipid Restore image 5', 5),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-06.webp', 'SkinCeuticals Triple Lipid Restore image 6', 6),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-07.webp', 'SkinCeuticals Triple Lipid Restore image 7', 7),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-08.webp', 'SkinCeuticals Triple Lipid Restore image 8', 8),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-09.webp', 'SkinCeuticals Triple Lipid Restore image 9', 9),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-10.webp', 'SkinCeuticals Triple Lipid Restore image 10', 10),
  ('/images/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-11.webp', 'SkinCeuticals Triple Lipid Restore image 11', 11)
) as v(url, alt_text, sort_order)
where p.slug = 'skinceuticals-triple-lipid-restore';

-- Verify
select
  p.name,
  count(pi.id) as image_count,
  min(case when pi.sort_order = 0 then '✅ has primary' end) as primary_image
from public.products p
left join public.product_images pi on pi.product_id = p.id
where p.brand_slug = 'skinceuticals'
group by p.name
order by p.name;
