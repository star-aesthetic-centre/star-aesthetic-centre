-- ══════════════════════════════════════════════════════════════════════
-- NeoStrata — Complete Re-import from Official Jan 2026 Pricelist
-- Source: NeoStrata.xlsx Column F (RRSP Inc VAT) supplied by Nakita
-- Replaces 41 AI-generated products with 27 correct products
-- ══════════════════════════════════════════════════════════════════════

-- ── Step 1: Remove any treatment recommendations for NeoStrata products ──
delete from public.treatment_product_recommendations
where product_id in (
  select id from public.products where brand_slug = 'neostrata'
);

-- ── Step 2: Remove NeoStrata product images ──
delete from public.product_images
where product_id in (
  select id from public.products where brand_slug = 'neostrata'
);

-- ── Step 3: Remove all 41 incorrect NeoStrata products ──
delete from public.products
where brand_slug = 'neostrata';

-- ── Step 4: Insert 27 correct products (prices = RRSP inc VAT × 100) ──
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values

  -- ── RESURFACE ──────────────────────────────────────────────────────────

  ('NeoStrata Glycolic Renewal Smoothing Cream',
   'neostrata-glycolic-renewal-smoothing-cream',
   'F30132XA', 'neostrata',
   'If rough, uneven texture is dulling your complexion, NeoStrata Glycolic Renewal Smoothing Cream delivers glycolic acid in a rich 40g overnight cream that exfoliates, softens fine lines and reveals brighter, smoother skin by morning.',
   '', 64101, 64101, true,
   ARRAY['glycolic acid', 'AHA', 'resurfacing', 'smoothing cream', 'anti-ageing', 'dry skin', 'Resurface', 'NeoStrata']),

  ('NeoStrata Glycolic Renewal Smoothing Lotion',
   'neostrata-glycolic-renewal-smoothing-lotion',
   'F30133XA', 'neostrata',
   'If you want daily resurfacing in a lighter 200ml lotion texture, NeoStrata Glycolic Renewal Smoothing Lotion pairs glycolic acid with hydrating ingredients for smoother, brighter skin you can feel after just one week.',
   '', 74085, 74085, true,
   ARRAY['glycolic acid', 'AHA', 'resurfacing', 'smoothing lotion', 'anti-ageing', 'normal skin', 'Resurface', 'NeoStrata']),

  ('NeoStrata High Potency Cream',
   'neostrata-high-potency-cream',
   'F30152R', 'neostrata',
   'If conventional exfoliants have stopped working, NeoStrata High Potency Cream delivers a maximum-strength AHA concentration for intensive resurfacing. The clinical choice for rough, thickened or significantly textured skin.',
   '', 98647, 98647, true,
   ARRAY['AHA', 'high potency', 'resurfacing', 'anti-ageing', 'clinical strength', 'Resurface', 'NeoStrata']),

  -- ── RESTORE ────────────────────────────────────────────────────────────

  ('NeoStrata Facial Cleanser',
   'neostrata-facial-cleanser',
   'F30135XA', 'neostrata',
   'If your skin needs a gentle 200ml daily cleanser that removes impurities without stripping, NeoStrata Facial Cleanser is formulated for sensitive and post-treatment skin — the ideal first step in every NeoStrata routine.',
   '', 62494, 62494, true,
   ARRAY['cleanser', 'gentle cleanser', 'sensitive skin', 'daily cleanser', 'post-treatment', 'Restore', 'NeoStrata']),

  ('NeoStrata Bionic Face Cream',
   'neostrata-bionic-face-cream',
   'F30137XA', 'neostrata',
   'If your skin is sensitive but still needs hydration and anti-ageing support, NeoStrata Bionic Face Cream 40g is formulated with polyhydroxy acids — gentler than AHAs, deeply moisturising and clinically proven for reactive skin.',
   '', 91858, 91858, true,
   ARRAY['PHA', 'polyhydroxy acid', 'sensitive skin', 'bionic', 'anti-ageing', 'moisturiser', 'Restore', 'NeoStrata']),

  ('NeoStrata Ultra Moisturising Face Cream',
   'neostrata-ultra-moisturising-face-cream',
   'F30136XA', 'neostrata',
   'If dry, tight skin is your primary concern, NeoStrata Ultra Moisturising Face Cream 40g restores moisture barrier function and leaves skin visibly plumper and more comfortable — an intensely hydrating daily solution.',
   '', 75683, 75683, true,
   ARRAY['moisturiser', 'dry skin', 'hydration', 'moisture barrier', 'Restore', 'NeoStrata']),

  ('NeoStrata Eye Cream',
   'neostrata-eye-cream',
   'F30141XA', 'neostrata',
   'If fine lines, puffiness or dark circles around the eyes are a concern, NeoStrata Eye Cream 15g is specifically formulated for the delicate orbital area — hydrating, smoothing and firming where skin is most sensitive.',
   '', 68294, 68294, true,
   ARRAY['eye cream', 'dark circles', 'fine lines', 'orbital area', 'sensitive', 'Restore', 'NeoStrata']),

  ('NeoStrata PHA Daily Moisturizer',
   'neostrata-pha-daily-moisturizer',
   'F30240X', 'neostrata',
   'If you want everyday exfoliation and hydration in one step, NeoStrata PHA Daily Moisturizer 50ml uses polyhydroxy acid technology to gently resurface while conditioning the skin — suitable for all skin types including sensitive.',
   '', 80674, 80674, true,
   ARRAY['PHA', 'polyhydroxy acid', 'daily moisturiser', 'exfoliating moisturiser', 'sensitive skin', 'Restore', 'NeoStrata']),

  -- ── CLARIFY ────────────────────────────────────────────────────────────

  ('NeoStrata Mandelic Clarifying Cleanser',
   'neostrata-mandelic-clarifying-cleanser',
   'F30142XA', 'neostrata',
   'If your skin is oily, blemish-prone or congested, NeoStrata Mandelic Clarifying Cleanser 200ml uses mandelic acid to gently exfoliate and clear pores with every wash — without over-drying or causing irritation.',
   '', 70759, 70759, true,
   ARRAY['mandelic acid', 'clarifying cleanser', 'oily skin', 'acne-prone', 'blemish', 'pores', 'Clarify', 'NeoStrata']),

  ('NeoStrata Oily Skin Solution',
   'neostrata-oily-skin-solution',
   'F30145XB', 'neostrata',
   'If excess oil, shine and enlarged pores are your main skin concerns, NeoStrata Oily Skin Solution 100ml is a targeted treatment that regulates sebum production, minimises pores and leaves skin matte and clear.',
   '', 67937, 67937, true,
   ARRAY['oily skin', 'sebum control', 'pores', 'matte', 'clarifying', 'blemish-prone', 'Clarify', 'NeoStrata']),

  ('NeoStrata Targeted Clarifying Gel',
   'neostrata-targeted-clarifying-gel',
   'F30144XA', 'neostrata',
   'If you need a precise spot treatment for active breakouts, NeoStrata Targeted Clarifying Gel 15g delivers a concentrated formula directly to blemishes — reducing inflammation and accelerating healing overnight.',
   '', 53019, 53019, true,
   ARRAY['spot treatment', 'blemish', 'acne', 'clarifying gel', 'targeted', 'Clarify', 'NeoStrata']),

  ('NeoStrata Sheer Hydration SPF 40',
   'neostrata-sheer-hydration-spf40',
   'F30163C', 'neostrata',
   'If you want a lightweight daily SPF that protects and hydrates without grease, NeoStrata Sheer Hydration SPF 40 50ml is an elegant moisturiser with broad-spectrum sun protection — the daily foundation of any skincare routine.',
   '', 84064, 84064, true,
   ARRAY['SPF40', 'sun protection', 'daily moisturiser', 'lightweight', 'hydrating SPF', 'sheer', 'Clarify', 'NeoStrata']),

  -- ── ENLIGHTEN ──────────────────────────────────────────────────────────

  ('NeoStrata Enlighten Ultra Brightening Cleanser',
   'neostrata-enlighten-ultra-brightening-cleanser',
   'F30123CA', 'neostrata',
   'If dullness and uneven skin tone are your primary concerns, NeoStrata Enlighten Ultra Brightening Cleanser 100ml is the essential first step in the Enlighten protocol — preparing skin to absorb brightening actives while gently exfoliating pigmented surface cells.',
   '', 76717, 76717, true,
   ARRAY['brightening cleanser', 'hyperpigmentation', 'uneven tone', 'enlighten', 'exfoliating cleanser', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Pigment Controller',
   'neostrata-enlighten-pigment-controller',
   'F30160R', 'neostrata',
   'If stubborn dark spots or melasma resist standard treatment, NeoStrata Enlighten Pigment Controller 50ml is a clinical-strength serum that targets melanin production at source. The cornerstone product of the Enlighten range.',
   '', 124131, 124131, true,
   ARRAY['pigment controller', 'melasma', 'dark spots', 'hyperpigmentation', 'enlighten', 'brightening serum', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Illuminating Serum',
   'neostrata-enlighten-illuminating-serum',
   'F30161XA', 'neostrata',
   'If you want rapid brightening with visible results within two weeks, NeoStrata Enlighten Illuminating Serum 30ml combines exfoliating actives with brightening technology in a concentrated formula for uneven skin tone and dullness.',
   '', 144888, 144888, true,
   ARRAY['illuminating serum', 'brightening', 'uneven tone', 'enlighten', 'dullness', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Skin Brightener SPF35',
   'neostrata-enlighten-skin-brightener-spf35',
   'F30131C', 'neostrata',
   'If you want a daily moisturiser that actively fights pigmentation while protecting against the UV that causes it, NeoStrata Enlighten Skin Brightener SPF35 40g treats and prevents pigmentation simultaneously in one elegant cream.',
   '', 110294, 110294, true,
   ARRAY['SPF35', 'brightening SPF', 'pigmentation', 'daily moisturiser', 'enlighten', 'sun protection', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Dark Spot Corrector',
   'neostrata-enlighten-dark-spot-corrector',
   'F30162XA', 'neostrata',
   'If you have specific areas of hyperpigmentation or post-inflammatory marks, NeoStrata Enlighten Dark Spot Corrector 20g is a targeted treatment for concentrated application directly to discoloured areas.',
   '', 66297, 66297, true,
   ARRAY['dark spot corrector', 'hyperpigmentation', 'post-inflammatory', 'targeted treatment', 'enlighten', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Brightening Eye Cream',
   'neostrata-enlighten-brightening-eye-cream',
   'F30119XA', 'neostrata',
   'If dark circles, hollows or pigmentation around the eye are affecting your appearance, NeoStrata Enlighten Brightening Eye Cream 15g is formulated with brightening actives for the delicate orbital area — safe and effective for daily use.',
   '', 96872, 96872, true,
   ARRAY['brightening eye cream', 'dark circles', 'pigmentation', 'orbital area', 'enlighten', 'Enlighten', 'NeoStrata']),

  ('NeoStrata 15% Vitamin C + PHA Serum',
   'neostrata-15-vitamin-c-pha-serum',
   'F30251X', 'neostrata',
   'If you want to combine powerful antioxidant protection with daily exfoliation, NeoStrata 15% Vitamin C + PHA Serum 15ml delivers clinical-strength vitamin C alongside polyhydroxy acids — brightening, firming and protecting in one concentrated formula.',
   '', 100226, 100226, true,
   ARRAY['vitamin C', 'PHA', 'antioxidant serum', 'brightening', 'anti-ageing', 'enlighten', 'Enlighten', 'NeoStrata']),

  -- ── SKIN ACTIVE ────────────────────────────────────────────────────────

  ('NeoStrata Skin Active Exfoliating Wash',
   'neostrata-skin-active-exfoliating-wash',
   'F30146XA', 'neostrata',
   'If your mature or textured skin needs deeper cleansing and resurfacing in one step, NeoStrata Skin Active Exfoliating Wash 125ml prepares the skin to absorb the advanced actives in the Skin Active range.',
   '', 82170, 82170, true,
   ARRAY['exfoliating wash', 'anti-ageing cleanser', 'mature skin', 'skin active', 'resurfacing', 'Skin Active', 'NeoStrata']),

  ('NeoStrata Skin Active Matrix Support SPF 30',
   'neostrata-skin-active-matrix-support-spf30',
   'F30149C', 'neostrata',
   'If your skin is showing signs of structural ageing — fine lines, loss of firmness or thinning — NeoStrata Skin Active Matrix Support SPF30 50g delivers peptides and antioxidants in a daily moisturiser with built-in UV protection.',
   '', 126478, 126478, true,
   ARRAY['SPF30', 'matrix support', 'anti-ageing', 'peptides', 'firmness', 'skin active', 'Skin Active', 'NeoStrata']),

  ('NeoStrata Skin Active Intensive Eye Therapy',
   'neostrata-skin-active-intensive-eye-therapy',
   'F30148XA', 'neostrata',
   'If the area around your eyes shows advanced signs of ageing — deep lines, sagging and persistent dark circles — NeoStrata Skin Active Intensive Eye Therapy 15g is the most concentrated eye treatment in the NeoStrata range.',
   '', 144453, 144453, true,
   ARRAY['eye therapy', 'anti-ageing eye', 'deep lines', 'sagging', 'skin active', 'Skin Active', 'NeoStrata']),

  ('NeoStrata Skin Active Potent Retinol Complex',
   'neostrata-skin-active-potent-retinol-complex',
   'F30292X', 'neostrata',
   'If you are ready for a clinical retinol treatment, NeoStrata Skin Active Potent Retinol Complex 30ml stimulates collagen, accelerates cell turnover and visibly reduces wrinkles with consistent use — the most powerful anti-ageing product in the range.',
   '', 149292, 149292, true,
   ARRAY['retinol', 'potent retinol', 'anti-ageing', 'collagen', 'wrinkles', 'skin active', 'Skin Active', 'NeoStrata']),

  ('NeoStrata Skin Active Hyaluronic Luminous Lift',
   'neostrata-skin-active-hyaluronic-luminous-lift',
   'F30268X', 'neostrata',
   'If deep dehydration and loss of facial volume are your primary concerns, NeoStrata Skin Active Hyaluronic Luminous Lift 50g combines dual-molecular hyaluronic acid for immediate plumping and long-term lifting — the most hydrating product in the range.',
   '', 177819, 177819, true,
   ARRAY['hyaluronic acid', 'luminous lift', 'volume', 'plumping', 'hydration', 'skin active', 'Skin Active', 'NeoStrata']),

  ('NeoStrata Skin Active Rebound Sculpting Cream',
   'neostrata-skin-active-rebound-sculpting-cream',
   'F30301X', 'neostrata',
   'If loss of facial contour, sagging and skin laxity are your primary ageing concerns, NeoStrata Skin Active Rebound Sculpting Cream 50g is formulated to restore elasticity, firmness and definition.',
   '', 161201, 161201, true,
   ARRAY['sculpting cream', 'laxity', 'firmness', 'contouring', 'anti-ageing', 'skin active', 'Skin Active', 'NeoStrata']),

  -- ── SKINCARE PACKS ─────────────────────────────────────────────────────

  ('NeoStrata Enlighten Trio Pack',
   'neostrata-enlighten-trio-pack',
   'Enlighten Trio', 'neostrata',
   'If you are starting the Enlighten brightening protocol, the NeoStrata Enlighten Trio Pack bundles the Brightening Cleanser, Illuminating Serum and Pigment Controller for a complete three-step brightening routine at a saving over buying separately.',
   '', 292014, 292014, true,
   ARRAY['enlighten pack', 'brightening kit', 'hyperpigmentation', 'trio pack', 'skincare pack', 'Enlighten', 'NeoStrata']),

  ('NeoStrata Enlighten Brightening Pack',
   'neostrata-enlighten-brightening-pack',
   'Enlighten Brightening PK', 'neostrata',
   'If you want a complete morning brightening and protection routine, the NeoStrata Enlighten Brightening Pack bundles the Brightening Cleanser, Skin Brightener SPF35 and 15% Vitamin C + PHA Serum — everything you need to treat and prevent uneven skin tone.',
   '', 236355, 236355, true,
   ARRAY['enlighten pack', 'brightening kit', 'vitamin C', 'SPF pack', 'skincare pack', 'Enlighten', 'NeoStrata'])

on conflict (slug) do update set
  name                = excluded.name,
  sku                 = excluded.sku,
  short_description   = excluded.short_description,
  price_cents         = excluded.price_cents,
  regular_price_cents = excluded.regular_price_cents,
  tags                = excluded.tags,
  updated_at          = now();

-- ── Verify ─────────────────────────────────────────────────────────────
select
  name,
  sku,
  price_cents,
  round(price_cents::numeric / 100, 2) as price_zar,
  is_active
from public.products
where brand_slug = 'neostrata'
order by name;
