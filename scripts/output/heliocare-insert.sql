-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Import: heliocare
-- Generated: 2026-03-23T11:31:11.227Z
-- Source: heliocare-products-export-23032026.csv
-- Products: 15
-- ═══════════════════════════════════════════════════════════

-- Add tags column to products if not already present
alter table public.products
  add column if not exists tags text[] not null default '{}';

-- ── Products ──────────────────────────────────────────────
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values
  ('Heliocare 360 Airgel SPF50+', 'heliocare-360-airgel-spf50', 'SA-HEL-360-AIR-001', 'heliocare', 'If traditional sunscreens feel heavy or greasy, Heliocare 360 Airgel SPF50+ changes everything. This revolutionary foam texture melts invisibly into the skin, delivering 360° broad-spectrum protection including UVA, UVB, infrared and blue light — with Fernblock® for internal cellular protection too.', 'Heliocare 360 Airgel: Heliocare 360 Airgel - Ultra-Light Sunscreen Foam with SPF 50+', 48900, 48900, true, ARRAY['blue light', 'Fernblock', 'foam sunscreen', 'Heliocare', 'Heliocare 360', 'infrared', 'invisible finish', 'oily skin', 'SPF50', 'ultra-light sunscreen', 'UVA UVB']),
  ('Heliocare 360 Fluid Cream SPF50+', 'heliocare-360-fluid-cream-spf50', 'SA-HEL-360-FLC-001', 'heliocare', 'If your skin needs daily sun protection that also hydrates, Heliocare 360 Fluid Cream SPF50+ does both. This lightweight hydrating cream with Fernblock® delivers 360° protection against UVA, UVB, infrared and blue light — without the heavy or greasy feel that puts women off wearing SPF every day.', 'Heliocare 360 Fluid Cream: Heliocare 360 Fluid Cream - Hydrating Sunscreen Cream with SPF 50+', 48900, 48900, true, ARRAY['daily moisturiser', 'dry skin', 'Fernblock', 'fluid cream', 'Heliocare', 'Heliocare 360', 'hydrating sunscreen', 'normal skin', 'SPF50', 'UVA UVB']),
  ('Heliocare 360 Gel Oil Free Touch SPF50+', 'heliocare-360-gel-oil-free-touch-spf50', 'SA-HEL-360-GEL-001', 'heliocare', 'If you have oily or combination skin and dread the shine that comes with wearing SPF, Heliocare 360 Gel Oil Free Touch is your answer. This mattifying gel formula with Fernblock® controls sebum while delivering full 360° sun protection — so you stay protected and matte from morning to evening.', 'Heliocare 360 Gel Oil Free Touch: Heliocare 360 Gel Oil Free Touch - Mattifying Sunscreen Gel with SPF 50+', 57200, 57200, true, ARRAY['acne-prone skin', 'combination skin', 'Fernblock', 'gel sunscreen', 'Heliocare', 'Heliocare 360', 'mattifying', 'oil-free sunscreen', 'oily skin', 'SPF50']),
  ('Heliocare 360 Oral Capsules 30', 'heliocare-360-oral-capsules-30', 'SA-HEL-360-CAPS-001', 'heliocare', 'If you want sun protection that goes beyond what any topical SPF can do, Heliocare 360 Oral Capsules work from the inside out. Taken daily, these capsules with Fernblock® and antioxidants strengthen your skin''s own defences against UV radiation — the only internal sun protection supplement recommended by Dr. Bangalee.', 'Heliocare 360 Oral 30 Caps: Heliocare 360 Oral 30 Caps - Oral Sun Protection Capsules with Fernblock® and Antioxidants', 77400, 77400, true, ARRAY['antioxidants', 'Fernblock', 'Heliocare', 'Heliocare Oral', 'internal SPF', 'oral sun protection', 'photoprotection', 'sun damage prevention', 'supplements']),
  ('Heliocare 360 Paediatric Lotion SPF50+', 'heliocare-360-paediatric-lotion-spf50', 'SA-HEL-360-PAED-001', 'heliocare', 'If you want a sunscreen you can trust on your child''s delicate skin, Heliocare 360 Paediatric Lotion SPF50+ is the choice dermatologists recommend. Formulated with 100% mineral filters, it is safe from 6 months of age and provides the same 360° UVA, UVB, infrared and blue light protection the whole family needs.', 'Heliocare 360 Paediatric: Heliocare 360 Paediatric - Gentle Sunscreen Lotion for Kids with SPF 50+ and Mineral Filters', 45100, 45100, true, ARRAY['baby sunscreen', 'children', 'family', 'Fernblock', 'Heliocare', 'Heliocare Paediatric', 'kids sunscreen', 'mineral filters', 'paediatric', 'sensitive skin', 'SPF50']),
  ('Heliocare 360 AK Fluid SPF100+', 'heliocare-360-ak-fluid-spf100', 'SA-HEL-360-AKF-001', 'heliocare', 'If you have a history of actinic keratosis, sun damage or skin cancer risk, Heliocare 360 AK Fluid SPF100+ provides the maximum medical-grade protection available. Prescribed by dermatologists and aesthetic doctors for patients with the highest UV vulnerability, this SPF100+ fluid with Fernblock® is your strongest daily defence.', 'Heliocare 360 AK Fluid SPF100+: Heliocare 360 AK Fluid SPF100+ - Maximum Protection Sunscreen for Actinic Keratosis Prevention', 65200, 65200, true, ARRAY['actinic keratosis', 'Fernblock', 'Heliocare', 'Heliocare 360', 'maximum protection', 'medical sunscreen', 'skin cancer prevention', 'SPF100', 'sun damage']),
  ('Heliocare 360 Mineral Tolerance Fluid SPF50', 'heliocare-360-mineral-tolerance-fluid-spf50', 'SA-HEL-360-MTF-001', 'heliocare', 'If your skin is recovering from a treatment or is too sensitive for chemical sunscreen filters, Heliocare 360 Mineral Tolerance Fluid SPF50 is your go-to. Formulated with 100% mineral filters only, it calms and protects even the most reactive skin — Dr. Bangalee''s recommended post-procedure SPF after every Dermapen and skin peel.', 'Heliocare 360 Mineral Tolerance Fluid SPF50: Heliocare 360 Mineral Tolerance Fluid SPF50 - 100% Mineral Sunscreen for Sensitive Skin', 66500, 66500, true, ARRAY['chemical-free sunscreen', 'Fernblock', 'Heliocare', 'Heliocare 360', 'mineral sunscreen', 'post-procedure', 'post-treatment SPF', 'rosacea', 'sensitive skin', 'SPF50']),
  ('Heliocare 360 Color Gel Oil Free SPF50+ Beige', 'heliocare-360-color-gel-oil-free-spf50-beige', 'SA-HEL-360-CGO-BEI-001', 'heliocare', 'If you want sun protection that also evens your skin tone, Heliocare 360 Color Gel Oil Free SPF50+ in Beige gives you light coverage and full protection in one step. This tinted oil-free gel with Fernblock® is ideal for lighter and medium skin tones — replacing foundation as your daily morning base.', 'Heliocare 360 Color Gel Oil Free SPF50+ Beige: Heliocare 360 Color Gel Oil Free SPF50+ Beige - Tinted Sunscreen Gel with Natural Coverage', 58400, 58400, true, ARRAY['Beige', 'Fernblock', 'Heliocare', 'Heliocare 360 Color', 'light coverage', 'oil-free', 'oily skin', 'SPF50', 'tinted sunscreen', 'tone-evening']),
  ('Heliocare 360 Color Gel Oil Free SPF50+ Bronze', 'heliocare-360-color-gel-oil-free-spf50-bronze', 'SA-HEL-360-CGO-BRO-001', 'heliocare', 'If you have a deeper skin tone and struggle to find a tinted SPF that actually matches, Heliocare 360 Color Gel Oil Free SPF50+ Bronze was made for you. This rich bronze-toned oil-free gel with Fernblock® provides full 360° protection while enhancing your natural complexion — no white cast, no compromise.', 'Heliocare 360 Color Gel Oil Free SPF50+ Bronze: Heliocare 360 Color Gel Oil Free SPF50+ Bronze - Tinted Sunscreen Gel with Darker Coverage', 58400, 58400, true, ARRAY['Bronze', 'deeper skin tones', 'Fernblock', 'Heliocare', 'Heliocare 360 Color', 'no white cast', 'oil-free', 'oily skin', 'SPF50', 'tinted sunscreen']),
  ('Heliocare 360 Pigment Solution Fluid SPF50', 'heliocare-360-pigment-solution-fluid-spf50', 'SA-HEL-360-PSF-001', 'heliocare', 'If you are treating pigmentation or dark spots and need SPF that actively works against discolouration, Heliocare 360 Pigment Solution Fluid SPF50 is in a class of its own. This clinically advanced sunscreen combines broad-spectrum 360° protection with depigmenting actives — so it both prevents new spots and fades existing ones, every single day.', 'Heliocare 360 Pigment Solution Fluid SPF50: Heliocare 360 Pigment Solution Fluid SPF50 - Anti-Pigmentation Sunscreen with Depigmenting Actives', 66100, 66100, true, ARRAY['anti-pigmentation sunscreen', 'dark spots', 'depigmenting actives', 'Fernblock', 'Heliocare', 'Heliocare 360', 'hyperpigmentation', 'melasma', 'post-pigmentation treatment', 'SPF50']),
  ('Heliocare 360 Sensation SPF50+', 'heliocare-360-sensation-spf50', 'SA-HEL-360-SEN-001', 'heliocare', 'If you have always felt that wearing SPF is a chore because of texture, Heliocare 360 Sensation SPF50+ will change your routine. This silky-smooth formula absorbs instantly and leaves a perfectly invisible finish — so you get full 360° protection with Fernblock® and the skin feel of a premium serum.', 'Heliocare 360 Sensation SPF50+: Heliocare 360 Sensation SPF50+ - Silky Texture Sunscreen with Invisible Finish', 63100, 63100, true, ARRAY['all skin types', 'Fernblock', 'Heliocare', 'Heliocare 360', 'invisible finish', 'lightweight', 'silky texture', 'SPF50', 'UVA UVB']),
  ('Heliocare 360 Paediatric Lotion SPF50 200ml', 'heliocare-360-paediatric-lotion-spf50-200ml', 'SA-HEL-360-PAED-LOT-001', 'heliocare', 'If you have a family to protect and need a generously sized sunscreen that is gentle enough for children, Heliocare 360 Paediatric Lotion 200ml is your family-size solution. This larger format mineral lotion with Fernblock® is safe from 6 months and provides the same trusted 360° protection the clinic recommends — enough for the whole family, all summer.', 'Heliocare 360 Pediatric Lotion SPF50: Heliocare 360 Pediatric Lotion SPF50 - Large Format Kids Sunscreen 200ml', 74500, 74500, true, ARRAY['200ml', 'baby', 'children', 'family sunscreen', 'Fernblock', 'Heliocare', 'Heliocare Paediatric', 'kids sunscreen', 'mineral filters', 'paediatric', 'sensitive skin', 'SPF50']),
  ('Heliocare Gel SPF50', 'heliocare-gel-spf50', 'SA-HEL-GEL-50-001', 'heliocare', 'If you want a trusted, no-fuss daily sunscreen at an accessible price, Heliocare Gel SPF50 is your starting point. This classic gel formula from the original Heliocare range provides reliable broad-spectrum UVA and UVB protection — a great introduction to the Heliocare brand and the perfect everyday SPF for the whole family.', 'Heliocare Gel SPF50: Heliocare Gel SPF50 - Classic Sunscreen Gel Formula', 39700, 39700, true, ARRAY['all skin types', 'broad spectrum', 'daily sunscreen', 'entry level', 'gel sunscreen', 'Heliocare', 'Heliocare Classic', 'SPF50', 'UVA UVB']),
  ('Heliocare Spray SPF50 200ml', 'heliocare-spray-spf50-200ml', 'SA-HEL-SPR-50-001', 'heliocare', 'If you need easy, fuss-free sun protection for your body or legs — especially after treatments like varicose vein therapy or body contouring — Heliocare Spray SPF50 200ml is your most practical option. The spray format makes it simple to cover hard-to-reach areas quickly, so you never skip SPF on your body again.', 'Heliocare Spray SPF50: Heliocare Spray SPF50 - Easy Application Sunscreen Spray 200ml', 53700, 53700, true, ARRAY['200ml', 'body', 'body sunscreen', 'easy application', 'Heliocare', 'Heliocare Classic', 'legs', 'post-treatment SPF', 'SPF50', 'spray sunscreen']),
  ('Heliocare Compacts Oil Free SPF 50', 'heliocare-compacts-oil-free-spf-50', 'SA-HEL-COMP-50-001', 'heliocare', 'If you wear makeup and find it impossible to reapply sunscreen throughout the day, Heliocare Compacts Oil Free SPF 50 solves that problem instantly. This pressed powder compact lets you top up your SPF protection over foundation without disturbing your makeup — effortless all-day protection in your handbag.', 'Heliocare Compacts Oil Free SPF 50: Heliocare Compacts Oil Free SPF 50 - Oil-Free Sunscreen Compact with SPF 50 and Natural Coverage', 53900, 53900, true, ARRAY['Heliocare', 'Heliocare Compacts', 'makeup SPF', 'natural coverage', 'oil-free', 'on-the-go', 'powder compact', 'reapplication', 'SPF50'])
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
  (select id from public.products where slug = 'heliocare-360-airgel-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-airgel-spf50-ultra-light-foam-sunscreen.webp', 'heliocare-360-airgel-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-fluid-cream-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-fluid-cream-spf50-hydrating-sunscreen.webp', 'heliocare-360-fluid-cream-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-gel-oil-free-touch-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-gel-oil-free-spf50-mattifying-oily-skin.webp', 'heliocare-360-gel-oil-free-touch-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-oral-capsules-30'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-oral-capsules-30-fernblock-sun-protection.webp', 'heliocare-360-oral-capsules-30', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-paediatric-lotion-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-paediatric-lotion-spf50-kids-mineral-sunscreen.webp', 'heliocare-360-paediatric-lotion-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-ak-fluid-spf100'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-ak-fluid-spf100-actinic-keratosis-sunscreen.webp', 'heliocare-360-ak-fluid-spf100', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-mineral-tolerance-fluid-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-mineral-tolerance-fluid-spf50-sensitive-skin-sunscreen.webp', 'heliocare-360-mineral-tolerance-fluid-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-color-gel-oil-free-spf50-beige'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-color-gel-oil-free-spf50-beige-tinted-sunscreen.webp', 'heliocare-360-color-gel-oil-free-spf50-beige', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-color-gel-oil-free-spf50-bronze'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-color-gel-oil-free-spf50-bronze-tinted-sunscreen.webp', 'heliocare-360-color-gel-oil-free-spf50-bronze', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-pigment-solution-fluid-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-pigment-solution-fluid-spf50-anti-pigmentation-sunscreen.webp', 'heliocare-360-pigment-solution-fluid-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-sensation-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-sensation-spf50-silky-invisible-sunscreen.webp', 'heliocare-360-sensation-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-360-paediatric-lotion-spf50-200ml'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-360-pediatric-lotion-spf50-kids-sunscreen-200ml.webp', 'heliocare-360-paediatric-lotion-spf50-200ml', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-gel-spf50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-gel-spf50-classic-sunscreen-formula.webp', 'heliocare-gel-spf50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-spray-spf50-200ml'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-spray-spf50-sunscreen-body-spray-200ml.webp', 'heliocare-spray-spf50-200ml', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'heliocare-compacts-oil-free-spf-50'), 'https://star-aesthetic-centre.local/wp-content/uploads/heliocare-compacts-oil-free-spf50-powder-compact-sunscreen.webp', 'heliocare-compacts-oil-free-spf-50', 0
)
on conflict do nothing;

-- ── Product Stock ─────────────────────────────────────────
insert into public.product_stock (product_id, status, quantity)
values
  ((select id from public.products where slug = 'heliocare-360-airgel-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-fluid-cream-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-gel-oil-free-touch-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-oral-capsules-30'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-paediatric-lotion-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-ak-fluid-spf100'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-mineral-tolerance-fluid-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-color-gel-oil-free-spf50-beige'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-color-gel-oil-free-spf50-bronze'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-pigment-solution-fluid-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-sensation-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-360-paediatric-lotion-spf50-200ml'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-gel-spf50'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-spray-spf50-200ml'), 'IN_STOCK', NULL),
  ((select id from public.products where slug = 'heliocare-compacts-oil-free-spf-50'), 'IN_STOCK', NULL)
on conflict (product_id) do update set
  status     = excluded.status,
  quantity   = excluded.quantity,
  updated_at = now();

-- ── Verify ─────────────────────────────────────────────────
select p.name, p.slug, p.price_cents, ps.status
from public.products p
join public.product_stock ps on ps.product_id = p.id
where p.brand_slug = 'heliocare'
order by p.name;