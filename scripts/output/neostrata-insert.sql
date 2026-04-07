-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Import: neostrata
-- Generated: 2026-03-23T11:37:54.905Z
-- Source: neostrata-corrected-IMPORT-READY.csv
-- Products: 41
-- ═══════════════════════════════════════════════════════════

-- Add tags column to products if not already present
alter table public.products
  add column if not exists tags text[] not null default '{}';

-- ── Products ──────────────────────────────────────────────
insert into public.products
  (name, slug, sku, brand_slug, short_description, description,
   price_cents, regular_price_cents, is_active, tags)
values
  ('Neostrata Ultra Smoothing Cream 10 AHA', 'neostrata-ultra-smoothing-cream-10-aha', 'SA-NEO-RESUR-USC-10-AHA-001', 'neostrata', 'If rough, uneven skin texture is dulling your complexion and no ordinary moisturiser is making a difference, Neostrata Ultra Smoothing Cream 10 AHA delivers real results. Powered by 10% alpha hydroxy acids, it accelerates cell turnover overnight — smoothing surface roughness, softening fine lines and revealing the brighter, more even skin underneath.', 'Neostrata Ultra Smoothing Cream 10 AHA: Neostrata Ultra Smoothing Cream 10 AHA - Anti-Ageing Cream with 10% Alpha Hydroxy Acids', 37160, 37160, false, ARRAY['10% AHA', 'alpha hydroxy acids', 'anti-ageing', 'smoothing', 'exfoliating cream', 'uneven texture', 'Resurface', 'Neostrata']),
  ('Neostrata Ultra Daytime Smoothing Cream SPF20', 'neostrata-ultra-daytime-smoothing-cream-spf20', 'SA-NEO-RESUR-DSC-SPF-20-001', 'neostrata', 'If you want a daily moisturiser that resurfaces, protects and hydrates all in one step, Neostrata Ultra Daytime Smoothing Cream SPF20 is your morning essential. The 10% AHA formula smooths and brightens while SPF20 guards against the UV damage that creates fine lines and dullness in the first place.', 'Neostrata Ultra Daytime Smoothing Cream SPF20: Neostrata Ultra Daytime Smoothing Cream SPF20 - Daily Moisturiser with 10% Alpha Hydroxy Acids and Sun Protection', 69500, 69500, false, ARRAY['10% AHA', 'SPF20', 'daytime moisturiser', 'smoothing', 'sun protection', 'anti-ageing', 'Resurface', 'Neostrata']),
  ('Neostrata Ultra Smoothing Lotion 10 AHA', 'neostrata-ultra-smoothing-lotion-10-aha', 'SA-NEO-RESUR-USL-10-AHA-001', 'neostrata', 'If your face and body need an AHA treatment but heavy creams feel too rich, Neostrata Ultra Smoothing Lotion 10 AHA gives you the same exfoliating power in a lighter, fast-absorbing texture. Suitable for face and body, it tackles rough elbows, uneven skin tone and sun-damaged areas with the same 10% AHA clinical concentration.', 'Neostrata Ultra Smoothing Lotion 10AHA: Neostrata Ultra Smoothing Lotion 10AHA - Lightweight Lotion with 10% Alpha Hydroxy Acids for Face and Body', 42948, 42948, false, ARRAY['10% AHA', 'body lotion', 'face and body', 'lightweight', 'smoothing', 'exfoliating', 'sun damage', 'Resurface', 'Neostrata']),
  ('Neostrata Face Cream Plus 15 AHA', 'neostrata-face-cream-plus-15-aha', 'SA-NEO-RESUR-FCP-15-AHA-001', 'neostrata', 'If you have mature or significantly sun-damaged skin and need an intensive resurfacing treatment, Neostrata Face Cream Plus 15 AHA delivers clinical-strength renewal. At 15% alpha hydroxy acids, this is a step up in potency — deep exfoliation, visible improvement in sun damage, age spots and skin texture from the first few weeks of use.', 'Neostrata Face Cream Plus 15 AHA: Neostrata Face Cream Plus 15 AHA - Intensive Cream with 15% Alpha Hydroxy Acids for Mature and Sun-Damaged Skin', 69500, 69500, false, ARRAY['15% AHA', 'intensive', 'mature skin', 'sun damage', 'anti-ageing', 'resurfacing', 'Resurface', 'Neostrata']),
  ('Neostrata High Potency Cream 20 AHA', 'neostrata-high-potency-cream-20-aha', 'SA-NEO-RESUR-HPC-20-AHA-001', 'neostrata', 'If you have been using AHAs for a while and your skin needs a higher-concentration treatment to keep seeing results, Neostrata High Potency Cream 20 AHA is the next level. At 20% AHA with peptides for additional anti-ageing action, this is the most potent AHA cream in the Neostrata range — for advanced ageing concerns and experienced users only.', 'Neostrata High Potency Cream 20 AHA: Neostrata High Potency Cream 20 AHA - Potent Cream with 20% Alpha Hydroxy Acids and Peptides for Advanced Ageing Concerns', 57187, 57187, false, ARRAY['20% AHA', 'high potency', 'peptides', 'advanced anti-ageing', 'experienced users', 'resurfacing', 'Resurface', 'Neostrata']),
  ('Neostrata Facial Cleanser', 'neostrata-facial-cleanser', 'SA-NEO-REST-FCLEAN-001', 'neostrata', 'If you have sensitive or reactive skin that needs a gentle daily cleanser that will not disrupt the skin barrier, Neostrata Facial Cleanser is your foundation step. Formulated with 4% gluconolactone PHA, it removes impurities without stripping — the cleanser Dr. Bangalee recommends for sensitive skin and post-procedure care.', 'Facial Cleanser: Neostrata Facial Cleanser - Gentle Cleanser with 4% Gluconolactone for All Skin Types', 36228, 36228, false, ARRAY['gentle cleanser', 'gluconolactone', 'PHA', 'sensitive skin', 'post-procedure', 'all skin types', 'Restore', 'Neostrata']),
  ('Neostrata Ultra Moisturizing Face Cream', 'neostrata-ultra-moisturizing-face-cream', 'SA-NEO-REST-UMFC-001', 'neostrata', 'If dry or sensitive skin leaves you feeling tight, uncomfortable and prone to irritation, Neostrata Ultra Moisturizing Face Cream provides the gentle, deep nourishment your skin barrier needs. With 10% gluconolactone PHA and Vitamin E, it intensely hydrates without causing sensitivity — ideal for those whose skin reacts to stronger actives.', 'Ultra-Moisturizing Face Cream: Neostrata Ultra-Moisturizing Face Cream - Nourishing Cream with 10% Gluconolactone and Vitamin E for Dry and Sensitive Skin', 43874, 43874, false, ARRAY['gluconolactone', 'PHA', 'Vitamin E', 'dry skin', 'sensitive skin', 'nourishing', 'hydrating', 'Restore', 'Neostrata']),
  ('Neostrata Daytime Protection Cream SPF 23 10 PHA', 'neostrata-daytime-protection-cream-spf-23-10-pha', 'SA-NEO-REST-DPC-SPF-23-10-PHA-001', 'neostrata', 'If your skin is sensitive or post-procedure and you need a daily cream that hydrates, gently exfoliates and protects from UV — all without irritation — Neostrata Daytime Protection Cream SPF 23 10 PHA does all three. The PHA formula is gentle enough for rosacea and post-peel skin, giving you the sun protection you need without the sensitivity risk.', 'Neostrata Daytime Protection Cream SPF 23 10 PHA: Neostrata Daytime Protection Cream SPF 23 10 PHA - Hydrating Cream with 10% Gluconolactone, Vitamin E, and Sunscreen for Anti-Ageing and Sun Protection', 89500, 89500, false, ARRAY['SPF23', '10% PHA', 'gluconolactone', 'Vitamin E', 'sensitive skin', 'rosacea', 'daytime', 'post-procedure', 'Restore', 'Neostrata']),
  ('Neostrata Bionic Face Cream 12 PHA', 'neostrata-bionic-face-cream-12-pha', 'SA-NEO-REST-BFC-12-PHA-001', 'neostrata', 'If your skin has been through an intensive treatment and needs a cream that repairs and protects while it heals, Neostrata Bionic Face Cream 12 PHA is the clinical choice. The 12% lactobionic acid formula with Vitamins A, C and E is specifically designed for post-procedure and damaged skin — gentle enough to use immediately after chemical peels and Dermapen.', 'Neostrata Bionic Face Cream 12 PHA: Neostrata Bionic Face Cream 12 PHA - Intense Cream with 12% Lactobionic Acid and Vitamin A, C, and E for Post-Procedure and Damaged Skin', 53251, 53251, false, ARRAY['12% PHA', 'lactobionic acid', 'Vitamins A C E', 'post-procedure', 'skin repair', 'Dermapen', 'chemical peel', 'Restore', 'Neostrata']),
  ('Neostrata Bionic Lotion 15 PHA', 'neostrata-bionic-lotion-15-pha', 'SA-NEO-REST-BL-15-PHA-001', 'neostrata', 'If you need a lightweight PHA moisturiser for your face and body that delivers visible anti-ageing results without irritation, Neostrata Bionic Lotion 15 PHA is the answer. The 15% gluconolactone and lactobionic acid formula smooths, firms and hydrates with the same gentleness that makes PHAs the preferred choice for sensitive skin types.', 'Neostrata Bionic Lotion 15 PHA: Neostrata Bionic Lotion 15 PHA - Lightweight Lotion with 15% Gluconolactone and Lactobionic Acid for Face and Body Moisturisation', 99500, 99500, false, ARRAY['15% PHA', 'gluconolactone', 'lactobionic acid', 'face and body', 'sensitive skin', 'anti-ageing', 'lightweight', 'Restore', 'Neostrata']),
  ('Neostrata Bio Hydrating Cream 15 PHA', 'neostrata-bio-hydrating-cream-15-pha', 'SA-NEO-REST-BHC-15-PHA-001', 'neostrata', 'If fine lines and dehydration are your primary skin concerns but your skin is too sensitive for AHAs, Neostrata Bio Hydrating Cream 15 PHA delivers visible plumping and smoothing with complete gentleness. The combination of 15% gluconolactone PHA and hyaluronic acid targets fine lines from two directions at once — exfoliation and deep hydration.', 'Neostrata Bio Hydrating Cream 15 PHA: Neostrata Bio Hydrating Cream 15 PHA - Rich Cream with 15% Gluconolactone and Hyaluronic Acid for Plumping and Smoothing Fine Lines and Wrinkles', 99500, 99500, false, ARRAY['15% PHA', 'hyaluronic acid', 'gluconolactone', 'fine lines', 'dehydration', 'sensitive skin', 'plumping', 'Restore', 'Neostrata']),
  ('Neostrata Clarifying Facial Cleanser', 'neostrata-clarifying-facial-cleanser', 'SA-NEO-REF-CFC-001', 'neostrata', 'If oily skin, clogged pores and frequent breakouts have you cycling through cleansers that never quite solve the problem, Neostrata Clarifying Facial Cleanser is the oil-free answer. With 4% gluconolactone and 0.3% salicylic acid, it deep-cleans pores, controls excess oil and prevents new blemishes — the daily reset your skin needs.', 'Neostrata Clarifying Facial Cleanser: Neostrata Clarifying Facial Cleanser - Oil-Free Cleanser with 4% Gluconolactone and 0.3% Salicylic Acid for Oily and Acne-Prone Skin', 41020, 41020, false, ARRAY['gluconolactone', 'salicylic acid', 'oily skin', 'acne-prone', 'oil-free cleanser', 'pores', 'blemishes', 'Refine', 'Neostrata']),
  ('Neostrata Sheer Hydration SPF 35', 'neostrata-sheer-hydration-spf-35', 'SA-NEO-REF-SH-SPF-35-001', 'neostrata', 'If you have oily or combination skin and keep skipping your SPF because every sunscreen makes you look shiny, Neostrata Sheer Hydration SPF 35 is the one you will actually keep wearing. This oil-free formula with 8% gluconolactone and 2% lactobionic acid provides anti-ageing PHA treatment, sun protection and a genuinely matte, weightless finish — all in one step.', 'Neostrata Sheer Hydration SPF 35: Neostrata Sheer Hydration SPF 35 - Oil-Free Moisturiser with 8% Gluconolactone, 2% Lactobionic Acid, and Sunscreen for Anti-Ageing and Sun Protection', 48733, 48733, false, ARRAY['SPF35', 'PHA', 'gluconolactone', 'lactobionic acid', 'oil-free', 'oily skin', 'combination skin', 'anti-ageing', 'Refine', 'Neostrata']),
  ('Neostrata Ultra Brightening Cleanser', 'neostrata-ultra-brightening-cleanser', 'SA-NEO-ENLI-UBC-001', 'neostrata', 'If your skin looks dull, uneven and tired and you want a cleanser that actively begins the brightening process from the very first step, Neostrata Ultra Brightening Cleanser does exactly that. With 6% NeoGlucosamine and alpine plant extracts, it gently exfoliates while you cleanse — preparing your skin to absorb brightening serums and treatments more effectively.', 'Neostrata Ultra Brightening Cleanser: Neostrata Ultra Brightening Cleanser - Gentle Cleanser with 6% NeoGlucosamine and Alpine Plant Extracts for Brightening and Exfoliating', 44474, 44474, false, ARRAY['NeoGlucosamine', 'brightening cleanser', 'alpine extracts', 'dull skin', 'exfoliating', 'pigmentation', 'radiance', 'Enlighten', 'Neostrata']),
  ('Neostrata Pigment Controller', 'neostrata-pigment-controller', 'SA-NEO-ENLI-PIGM-CONT-001', 'neostrata', 'If dark spots and discolouration are your biggest skin confidence issue, Neostrata Pigment Controller targets the root cause with clinical precision. The 5% NeoGlucosamine, retinol and SabiWhite® combination works on multiple pigmentation pathways simultaneously — reducing existing spots and preventing new ones from forming.', 'Neostrata Pigment Controller: Neostrata Pigment Controller - Advanced Moisturiser with 5% NeoGlucosamine, Retinol, and SabiWhite® for Reducing Dark Spots and Discolouration', 71960, 71960, false, ARRAY['NeoGlucosamine', 'retinol', 'SabiWhite', 'pigmentation', 'dark spots', 'discolouration', 'brightening', 'Enlighten', 'Neostrata']),
  ('Neostrata Illuminating Serum', 'neostrata-illuminating-serum', 'SA-NEO-ENLI-ILL-SER-001', 'neostrata', 'If you want a serum that delivers visible brightening and clarity with every application, Neostrata Illuminating Serum is your most potent at-home brightening treatment. The 12% NeoGlucosamine, Vitamin C and licorice extract combination boosts radiance, fades existing discolouration and improves overall skin clarity — so your skin looks genuinely lit from within.', 'Neostrata Illuminating Serum: Neostrata Illuminating Serum - Potent Serum with 12% NeoGlucosamine, Vitamin C, and Licorice Extract for Boosting Radiance and Clarity', 83993, 83993, false, ARRAY['NeoGlucosamine', 'Vitamin C', 'licorice extract', 'brightening serum', 'radiance', 'dark spots', 'clarity', 'Enlighten', 'Neostrata']),
  ('Neostrata Skin Brightener SPF 35', 'neostrata-skin-brightener-spf-35', 'SA-NEO-ENLI-SK-BRIGHT-001', 'neostrata', 'If you are treating pigmentation and need a daily SPF that also actively works against the discolouration you are targeting, Neostrata Skin Brightener SPF 35 is your two-in-one essential. The 7% NeoGlucosamine and Vitamin C formula both corrects existing pigmentation and prevents UV-triggered new spots from forming — protecting your treatment results every single day.', 'Neostrata Skin Brightener: Neostrata Skin Brightener - Protective Cream with 7% NeoGlucosamine, Vitamin C, and SPF 35 for Preventing and Correcting Pigmentation', 63938, 63938, false, ARRAY['SPF35', 'NeoGlucosamine', 'Vitamin C', 'pigmentation SPF', 'brightening', 'dark spots prevention', 'Enlighten', 'Neostrata']),
  ('Neostrata Dark Spot Corrector', 'neostrata-dark-spot-corrector', 'SA-NEO-ENLI-DSCORR-001', 'neostrata', 'If you have a specific stubborn dark spot that has not responded to general brightening products, Neostrata Dark Spot Corrector targets it precisely. This concentrated gel with 5% NeoGlucosamine, kojic acid and Vitamin C is applied directly to individual spots for maximum localised correction — the targeted approach that general moisturisers cannot match.', 'Neostrata Dark Spot Corrector: Neostrata Dark Spot Corrector - Targeted Gel with 5% NeoGlucosamine, Kojic Acid, and Vitamin C for Fading Stubborn Dark Spots', 38433, 38433, false, ARRAY['NeoGlucosamine', 'kojic acid', 'Vitamin C', 'dark spot', 'targeted treatment', 'spot corrector', 'pigmentation gel', 'Enlighten', 'Neostrata']),
  ('Neostrata Skin Active Exfoliating Wash', 'neostrata-skin-active-exfoliating-wash', 'SA-NEO-SKIN-A-EXF-WASH-001', 'neostrata', 'If you want a morning cleanser that does real anti-ageing work while it cleans, Neostrata Skin Active Exfoliating Wash is your daily foundation step. With 8.5% polyhydroxy and bionic acids, it gently removes surface dulness and primes your skin to receive the Skin Active serums and treatments that follow — the cleanser that makes your whole premium routine work harder.', 'Skin Active Exfoliating Wash: Neostrata Skin Active Exfoliating Wash - Gentle Cleanser with 8.5% Polyhydroxy Acids and Bionic Acids for Anti-Ageing and Exfoliating', 47635, 47635, false, ARRAY['PHA', 'bionic acids', 'anti-ageing cleanser', 'exfoliating wash', 'Skin Active', 'premium', 'Neostrata']),
  ('Neostrata Skin Active Matrix Support SPF 30', 'neostrata-skin-active-matrix-support-spf-30', 'SA-NEO-SKIN-A-MATR-SUPP-SPF-30-001', 'neostrata', 'If you want a premium anti-ageing day cream that targets wrinkles, firms the skin and includes sun protection in one step, Neostrata Skin Active Matrix Support SPF 30 is the daily treatment your routine is missing. The 8% NeoGlucosamine, retinol and antioxidant complex firms the skin matrix while SPF 30 prevents further UV-induced damage every day.', 'Skin Active Matrix Support SPF 30: Neostrata Skin Active Matrix Support SPF 30 - Firming Cream with 8% NeoGlucosamine, Retinol, and Antioxidants for Anti-Wrinkle and Sun Protection', 73321, 73321, false, ARRAY['SPF30', 'NeoGlucosamine', 'retinol', 'antioxidants', 'firming', 'anti-wrinkle', 'daily protection', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Intense Eye Therapy', 'neostrata-skin-active-intense-eye-therapy', 'SA-NEO-SKIN-A-INT-EYE-THER-001', 'neostrata', 'If the area around your eyes is showing your age more than the rest of your face, Neostrata Skin Active Intense Eye Therapy is the premium targeted treatment it needs. The 6% NeoGlucosamine, peptides and caffeine formula lifts the upper lid, brightens dark circles and reduces puffiness — a noticeable difference in the eye area that your patients will ask about.', 'Skin Active Intense Eye Therapy: Neostrata Skin Active Intense Eye Therapy - Eye Cream with 6% NeoGlucosamine, Peptides, and Caffeine for Lifting and Brightening the Eye Area', 83741, 83741, false, ARRAY['NeoGlucosamine', 'peptides', 'caffeine', 'eye lifting', 'dark circles', 'puffiness', 'crow''s feet', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Cellular Restoration', 'neostrata-skin-active-cellular-restoration', 'SA-NEO-SKIN-A-CELL-REST-001', 'neostrata', 'If you want a premium night cream that does the most intensive repair work while you sleep, Neostrata Skin Active Cellular Restoration is your night treatment of choice. The 5% glycolic acid, 5% maltobionic acid and apple stem cell extract combination works at the cellular level overnight — repairing UV damage, accelerating renewal and restoring the youthful density your skin has lost.', 'Skin Active Cellular Restoration: Neostrata Skin Active Cellular Restoration - Night Cream with 5% Glycolic Acid, 5% Maltobionic Acid, and Apple Stem Cell Extract for Repairing and Rejuvenating the Skin', 139500, 139500, false, ARRAY['glycolic acid', 'maltobionic acid', 'apple stem cell', 'night cream', 'cellular repair', 'anti-ageing', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Triple Firming Neck Cream', 'neostrata-skin-active-triple-firming-neck-cream', 'SA-NEO-SKIN-A-TRIP-FIRM-NC-001', 'neostrata', 'If the skin on your neck and chest is ageing faster than your face and no facial product has been designed to address it, Neostrata Skin Active Triple Firming Neck Cream was made specifically for you. The 8% NeoGlucosamine, 4% NeoCitriate and pro-amino acid formula firms, tightens and smooths the neck and decolletage — the only dedicated neck treatment in the Neostrata range.', 'Skin Active Triple Firming Neck Cream: Neostrata Skin Active Triple Firming Neck Cream - Neck Cream with 8% NeoGlucosamine, 4% NeoCitriate, and Pro-Amino Acid for Firming and Smoothing the Neck and Décolletage', 129500, 129500, false, ARRAY['NeoGlucosamine', 'NeoCitriate', 'neck cream', 'decolletage', 'firming', 'anti-ageing', 'neck and chest', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Tri-Therapy Lifting Serum', 'neostrata-skin-active-tri-therapy-lifting-serum', 'SA-NEO-SKIN-A-TRI-TL-SER-001', 'neostrata', 'If you are noticing a loss of facial volume and want a serum that actively restores it, Neostrata Skin Active Tri-Therapy Lifting Serum addresses the structural causes of skin sagging. The 1.25% Aminofil, 8% gluconolactone and 0.5% hyaluronic acid formula volumises from within, sculpts the facial contour and visibly lifts — without any invasive procedure.', 'Skin Active Tri ”“ Therapy Lifting Serum: Neostrata Skin Active Tri ”“ Therapy Lifting Serum - Serum with 1.25% Aminofil, 8% Gluconolactone, and 0.5% Hyaluronic Acid for Volumising and Sculpting the Skin', 129500, 129500, false, ARRAY['Aminofil', 'gluconolactone', 'hyaluronic acid', 'lifting serum', 'volumising', 'facial sculpting', 'anti-ageing', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Antioxidant Serum', 'neostrata-skin-active-antioxidant-serum', 'SA-NEO-SKIN-A-ANTI-SER-001', 'neostrata', 'If environmental stress, pollution and oxidative damage are accelerating the visible signs of ageing in your skin, Neostrata Skin Active Antioxidant Serum builds your daily defence. With 8% polyhydroxy acids, 0.5% bionic acids and lilac extract, it strengthens the skin barrier, neutralises free radicals and prevents the cellular damage that shows up as premature ageing.', 'Skin Active Antioxidant Serum: Neostrata Skin Active Antioxidant Serum - Serum with 8% Polyhydroxy Acids, 0.5% Bionic Acids, and 0.2% Lilac Extract for Protecting and Strengthening the Skin Barrier', 139500, 139500, false, ARRAY['polyhydroxy acids', 'bionic acids', 'lilac extract', 'antioxidant', 'barrier strengthening', 'environmental protection', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Collagen Booster Serum', 'neostrata-skin-active-collagen-booster-serum', 'SA-NEO-SKIN-A-COLL-B-SERUM-001', 'neostrata', 'If loss of firmness and the first signs of deep wrinkles are your main concern, Neostrata Skin Active Collagen Booster Serum targets collagen production directly. The 6% NeoGlucosamine, 4% Matrixyl peptides and Gardenia cell extract work together to boost and preserve the collagen fibres that keep skin firm — the serum Dr. Bangalee recommends alongside Dermapen treatments for maximum collagen stimulation.', 'Skin Active Collagen Booster Serum: Neostrata Skin Active Collagen Booster Serum - Serum with 6% NeoGlucosamine, 4% Matrixyl Peptides, and 0.5% Gardenia Cell Extract for Boosting and Preserving Collagen', 139500, 139500, false, ARRAY['NeoGlucosamine', 'Matrixyl peptides', 'Gardenia stem cell', 'collagen booster', 'firmness', 'anti-ageing', 'Dermapen companion', 'Skin Active', 'Neostrata']),
  ('Neostrata Sheer Physical Protection SPF 50', 'neostrata-sheer-physical-protection-spf-50', 'SA-NEO-TT-SH-P-PROT-001', 'neostrata', 'If you need a 100% mineral sunscreen that works for all skin types including the most reactive and post-procedure skin, Neostrata Sheer Physical Protection SPF 50 is the clinical choice. This antioxidant-enriched mineral formula provides full broad-spectrum protection with zero chemical filters — the post-treatment SPF Dr. Bangalee trusts for immediately post-procedure skin.', 'Sheer Physical Protection: Neostrata Sheer Physical Protection - Mineral Sunscreen with SPF 50 and Antioxidants for All Skin Types', 79500, 79500, false, ARRAY['SPF50', 'mineral sunscreen', '100% mineral', 'chemical-free', 'post-procedure', 'sensitive skin', 'antioxidants', 'Targeted Treatments', 'Neostrata']),
  ('Neostrata Renewal Cream 12 PHA', 'neostrata-renewal-cream-12-pha', 'SA-NEO-TT-REN-CREAM-12-PHA-001', 'neostrata', 'If improving skin texture and evening out skin tone is your primary goal and you want a PHA cream with proven results, Neostrata Renewal Cream 12 PHA delivers measurable improvement over time. The 12% gluconolactone and pro-retinol combination gently resurfaces and renews while being gentle enough for consistent long-term daily use.', 'Neostrata Renewal Cream 12 PHA: Neostrata Renewal Cream 12 PHA - Anti-Ageing Cream with 12% Gluconolactone and Pro-Retinol for Improving Skin Texture and Tone', 119500, 119500, false, ARRAY['12% PHA', 'gluconolactone', 'pro-retinol', 'skin texture', 'anti-ageing', 'renewal', 'Targeted Treatments', 'Neostrata']),
  ('Neostrata Bionic Face Serum', 'neostrata-bionic-face-serum', 'SA-NEO-TT-BIO-FC-001', 'neostrata', 'If you want a hydrating serum that simultaneously protects and visibly restores the skin while delivering antioxidant defence, Neostrata Bionic Face Serum works on multiple levels. The 10% lactobionic acid bionic acid formula with Vitamins A, C and E restores skin integrity, improves texture and fights free radical damage — all in the lightweight texture of a serum.', 'Neostrata Bionic Face Serum: Neostrata Bionic Face Serum - Hydrating Serum with 10% Lactobionic Acid and Vitamins A, C, and E for Restoring and Protecting the Skin', 119500, 119500, false, ARRAY['lactobionic acid', 'bionic acid', 'Vitamins A C E', 'hydrating serum', 'antioxidant', 'skin restoration', 'Targeted Treatments', 'Neostrata']),
  ('Neostrata Bionic Eye Cream Plus 4 PHA', 'neostrata-bionic-eye-cream-plus-4-pha', 'SA-NEO-TT-BEC-PLS-4-PHA-001', 'neostrata', 'If dark circles and puffiness around your eyes are a constant concern and most eye creams feel too harsh for the area, Neostrata Bionic Eye Cream Plus 4 PHA offers the gentle clinical solution. The 4% gluconolactone and lactobionic acid formula specifically chosen for the delicate periorbital area reduces dark circles and puffiness without the sensitivity risk of stronger actives.', 'Neostrata Bionic Eye Cream Plus 4 PHA: Neostrata Bionic Eye Cream Plus 4 PHA - Eye Cream with 4% Gluconolactone and Lactobionic Acid for Reducing Dark Circles and Puffiness', 119500, 119500, false, ARRAY['4% PHA', 'gluconolactone', 'lactobionic acid', 'dark circles', 'puffiness', 'eye cream', 'sensitive', 'Targeted Treatments', 'Neostrata']),
  ('Neostrata Enlighten Pack', 'neostrata-enlighten-pack', 'SA-NEO-ENLI-PCK-001', 'neostrata', 'If you want to start a complete brightening skincare routine without buying each product separately, the Neostrata Enlighten Pack gives you everything you need in one purchase. This curated NeoGlucosamine regimen combines brightening, exfoliating and protecting products chosen to work together for optimal pigmentation reduction — better value, better results.', 'Neostrata Enlighten Pack: Neostrata Enlighten Pack - A Complete Skincare Regimen with NeoGlucosamine and Brightening Agents for Reducing Pigmentation and Enhancing Radiance', 137017, 137017, false, ARRAY['NeoGlucosamine', 'brightening kit', 'pigmentation pack', 'skincare set', 'value', 'Enlighten Pack', 'Neostrata']),
  ('Neostrata Eye Cream', 'neostrata-eye-cream', 'SA-NEO-REST-EC-001', 'neostrata', 'If fine lines and puffiness around your eyes are making you look tired despite a good night''s sleep, Neostrata Eye Cream offers a gentle but effective solution. Formulated with PHAs specifically for the delicate eye area, it targets early signs of ageing without the irritation that many eye creams cause — suitable for even the most sensitive skin types.', 'Eye Cream: Neostrata Eye Cream - Gentle Eye Treatment with PHAs for Fine Lines and Puffiness', 39591, 39591, false, ARRAY['eye cream', 'PHA', 'fine lines', 'puffiness', 'sensitive skin', 'delicate eye area', 'anti-ageing', 'Restore', 'Neostrata']),
  ('Neostrata PHA Daily Moisturizer', 'neostrata-pha-daily-moisturizer', 'SA-NEO-REST-PHADM-001', 'neostrata', 'If you are looking for an uncomplicated daily moisturiser with gentle exfoliation built in, Neostrata PHA Daily Moisturizer does exactly what its name promises. The polyhydroxy acid formula provides everyday hydration with a gentle chemical exfoliation that keeps skin smooth and radiant over time — the PHA moisturiser that works for all skin types including sensitive.', 'PHA Daily Moisturizer: Neostrata PHA Daily Moisturizer - Hydrating Daily Cream with Polyhydroxy Acids', 46768, 46768, false, ARRAY['PHA', 'daily moisturiser', 'gentle exfoliation', 'all skin types', 'sensitive skin', 'polyhydroxy acids', 'Restore', 'Neostrata']),
  ('Neostrata Oily Skin Solution', 'neostrata-oily-skin-solution', 'SA-NEO-CLAR-OSS-001', 'neostrata', 'If you have oily, acne-prone skin and nothing you try seems to control the shine and breakouts for more than a few hours, Neostrata Oily Skin Solution is the lightweight daily treatment built specifically for you. This targeted formula regulates sebum production, minimises pore appearance and keeps breakouts under control — without the dryness or irritation that harsher acne products cause.', 'Oily Skin Solution: Neostrata Oily Skin Solution - Lightweight Treatment for Oily and Acne-Prone Skin', 39384, 39384, false, ARRAY['oily skin', 'acne-prone', 'sebum control', 'pore minimising', 'blemish control', 'lightweight', 'Clarify', 'Neostrata']),
  ('Neostrata Targeted Clarifying Gel', 'neostrata-targeted-clarifying-gel', 'SA-NEO-CLAR-TCG-001', 'neostrata', 'If a spot appears and you want it gone as quickly as possible, Neostrata Targeted Clarifying Gel is the direct-application answer. This concentrated spot treatment works overnight on individual blemishes and breakouts — clinically formulated to reduce redness, speed up healing and prevent the post-inflammatory mark that blemishes often leave behind.', 'Targeted Clarifying Gel: Neostrata Targeted Clarifying Gel - Spot Treatment for Blemishes and Breakouts', 30735, 30735, false, ARRAY['spot treatment', 'blemish gel', 'acne spot', 'overnight', 'targeted', 'breakouts', 'Clarify', 'Neostrata']),
  ('Neostrata Enlighten Brightening Eye Cream', 'neostrata-enlighten-brightening-eye-cream', 'SA-NEO-ENLI-BEC-001', 'neostrata', 'If dark circles under your eyes have become your most persistent skincare concern, Neostrata Enlighten Brightening Eye Cream specifically targets under-eye discolouration. Formulated with brightening actives in the gentle concentrations needed for the delicate eye area, it reduces the appearance of dark circles and discolouration over time — consistently used.', 'Enlighten Brightening Eye Cream: Neostrata Enlighten Brightening Eye Cream - Eye Treatment for Dark Circles and Discoloration', 56158, 56158, false, ARRAY['dark circles', 'eye cream', 'brightening', 'NeoGlucosamine', 'under-eye', 'discolouration', 'Enlighten', 'Neostrata']),
  ('Neostrata 15% Vitamin C + PHA Serum', 'neostrata-15-vitamin-c-pha-serum', 'SA-NEO-ENLI-VCS-001', 'neostrata', 'If you want the brightening power of Vitamin C combined with the gentle exfoliation of PHAs in a single serum, the Neostrata 15% Vitamin C + PHA Serum delivers both without irritation. This dual-action formula boosts radiance, fades pigmentation and strengthens the skin barrier at the same time — the brightening serum that is strong enough to be effective but gentle enough to use daily.', '15% Vitamin C + PHA Serum: Neostrata 15% Vitamin C + PHA Serum - Powerful Antioxidant Brightening Serum', 58102, 58102, false, ARRAY['15% Vitamin C', 'PHA', 'brightening serum', 'antioxidant', 'pigmentation', 'radiance', 'gentle', 'Enlighten', 'Neostrata']),
  ('Neostrata Skin Active Potent Retinol Complex', 'neostrata-skin-active-potent-retinol-complex', 'SA-NEO-SKIN-A-PRC-001', 'neostrata', 'If you are ready to add retinol to your routine and want a formula that delivers real results with minimised irritation, Neostrata Skin Active Potent Retinol Complex is the clinical approach. The buffered retinol formula is designed to work progressively — delivering the cell renewal and wrinkle reduction retinol is known for, without the dryness and peeling that causes most people to give up.', 'Skin Active Potent Retinol Complex: Neostrata Skin Active Potent Retinol Complex - Advanced Retinol Treatment for Anti-Aging', 86546, 86546, false, ARRAY['retinol', 'anti-ageing', 'cell renewal', 'wrinkles', 'buffered retinol', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Hyaluronic Luminous Lift', 'neostrata-skin-active-hyaluronic-luminous-lift', 'SA-NEO-SKIN-A-HLL-001', 'neostrata', 'If your skin lacks the plump, lifted quality of younger skin and you want a premium cream that actively restores it, Neostrata Skin Active Hyaluronic Luminous Lift delivers visible lifting and radiance. The multi-weight hyaluronic acid formula works at every skin depth to restore lost volume, firm the skin contour and give you a luminous, youthful finish.', 'Skin Active Hyaluronic Luminous Lift: Neostrata Skin Active Hyaluronic Luminous Lift - Lifting Cream with Multi-Weight Hyaluronic Acid', 103084, 103084, false, ARRAY['hyaluronic acid', 'multi-weight HA', 'lifting cream', 'plumping', 'luminous', 'anti-ageing', 'volume', 'Skin Active', 'Neostrata']),
  ('Neostrata Skin Active Rebound Sculpting Cream', 'neostrata-skin-active-rebound-sculpting-cream', 'SA-NEO-SKIN-A-RSC-001', 'neostrata', 'If your skin has lost the firmness and elasticity that kept it looking defined and sculpted, Neostrata Skin Active Rebound Sculpting Cream targets skin density and bounce. This firming moisturiser works to restore the springy, elastic quality of younger skin — so your face looks more sculpted, more defined and more youthful with consistent use.', 'Skin Active Rebound Sculpting Cream: Neostrata Skin Active Rebound Sculpting Cream - Firming and Sculpting Moisturizer', 93450, 93450, false, ARRAY['firming cream', 'sculpting', 'elasticity', 'skin density', 'anti-ageing', 'Skin Active', 'Neostrata']),
  ('Neostrata Enlighten Trio Pack', 'neostrata-enlighten-trio-pack', 'SA-NEO-ENLI-TRIO-001', 'neostrata', 'If you are committed to tackling pigmentation with a structured three-step system, the Neostrata Enlighten Trio Pack delivers the cleanser, serum and controller together at a better combined price. This complete brightening system is the most efficient way to begin the Neostrata Enlighten protocol — everything you need, working together from day one.', 'Enlighten Trio Pack: Neostrata Enlighten Trio Pack - Complete Brightening System (Cleanser, Serum, Controller)', 169283, 169283, false, ARRAY['NeoGlucosamine', 'brightening trio', 'cleanser serum controller', 'pigmentation system', 'value pack', 'Enlighten Pack', 'Neostrata'])
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
  (select id from public.products where slug = 'neostrata-ultra-smoothing-cream-10-aha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-ultra-smoothing-cream-10-aha.jpg', 'Neostrata Ultra Smoothing Cream 10 AHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-ultra-daytime-smoothing-cream-spf20'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-ultra-daytime-smoothing-cream-spf20.jpg', 'Neostrata Ultra Daytime Smoothing Cream SPF20', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-ultra-smoothing-lotion-10-aha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-ultra-smoothing-lotion-10aha.jpg', 'Neostrata Ultra Smoothing Lotion 10 AHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-face-cream-plus-15-aha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-face-cream-plus-15-aha.jpg', 'Neostrata Face Cream Plus 15 AHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-high-potency-cream-20-aha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-high-potency-cream-20-aha.jpg', 'Neostrata High Potency Cream 20 AHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-facial-cleanser'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-facial-cleanser.jpg', 'Neostrata Facial Cleanser', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-ultra-moisturizing-face-cream'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-ultra-moisturizing-face-cream.jpg', 'Neostrata Ultra Moisturizing Face Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-daytime-protection-cream-spf-23-10-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-daytime-protection-cream-spf-23-10-pha.jpg', 'Neostrata Daytime Protection Cream SPF 23 10 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-bionic-face-cream-12-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bionic-face-cream-12-pha.jpg', 'Neostrata Bionic Face Cream 12 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-bionic-lotion-15-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bionic-lotion-15-pha.jpg', 'Neostrata Bionic Lotion 15 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-bio-hydrating-cream-15-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bio-hydrating-cream-15-pha.jpg', 'Neostrata Bio Hydrating Cream 15 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-clarifying-facial-cleanser'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-refine-clarifying-facial-cleanser.jpg', 'Neostrata Clarifying Facial Cleanser', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-sheer-hydration-spf-35'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-refine-sheer-hydration-spf-35.jpg', 'Neostrata Sheer Hydration SPF 35', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-ultra-brightening-cleanser'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-ultra-brightening-cleanser.jpg', 'Neostrata Ultra Brightening Cleanser', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-pigment-controller'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-pigment-controller.jpg', 'Neostrata Pigment Controller', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-illuminating-serum'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-illuminating-serum.jpg', 'Neostrata Illuminating Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-brightener-spf-35'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-skin-brightener.jpg', 'Neostrata Skin Brightener SPF 35', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-dark-spot-corrector'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-dark-spot-corrector.jpg', 'Neostrata Dark Spot Corrector', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-exfoliating-wash'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-exfoliating-wash.jpg', 'Neostrata Skin Active Exfoliating Wash', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-matrix-support-spf-30'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-matrix-support-spf-30.jpg', 'Neostrata Skin Active Matrix Support SPF 30', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-intense-eye-therapy'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-intense-eye-therapy.jpg', 'Neostrata Skin Active Intense Eye Therapy', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-cellular-restoration'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-cellular-restoration.jpg', 'Neostrata Skin Active Cellular Restoration', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-triple-firming-neck-cream'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-triple-firming-neck-cream.jpg', 'Neostrata Skin Active Triple Firming Neck Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-tri-therapy-lifting-serum'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-tri-therapy-lifting-serum.jpg', 'Neostrata Skin Active Tri-Therapy Lifting Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-antioxidant-serum'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-antioxidant-serum.jpg', 'Neostrata Skin Active Antioxidant Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-collagen-booster-serum'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-collagen-booster-serum.jpg', 'Neostrata Skin Active Collagen Booster Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-sheer-physical-protection-spf-50'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-targeted-treatments-sheer-physical-protection.jpg', 'Neostrata Sheer Physical Protection SPF 50', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-renewal-cream-12-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-targeted-treatments-renewal-cream-12-pha.jpg', 'Neostrata Renewal Cream 12 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-bionic-face-serum'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-targeted-treatments-bionic-face-serum.jpg', 'Neostrata Bionic Face Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-bionic-eye-cream-plus-4-pha'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-targeted-treatments-bionic-eye-cream-plus-4-pha.jpg', 'Neostrata Bionic Eye Cream Plus 4 PHA', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-enlighten-pack'), 'https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-pack.jpg', 'Neostrata Enlighten Pack', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-eye-cream'), 'neostrata-restore-eye-cream-pha-anti-aging-treatment-800.jpg', 'Neostrata Eye Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-pha-daily-moisturizer'), 'neostrata-restore-pha-daily-moisturizer-hydrating-cream-800.jpg', 'Neostrata PHA Daily Moisturizer', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-oily-skin-solution'), 'neostrata-clarify-oily-skin-solution-acne-treatment-800.jpg', 'Neostrata Oily Skin Solution', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-targeted-clarifying-gel'), 'neostrata-clarify-targeted-gel-spot-blemish-treatment-800.jpg', 'Neostrata Targeted Clarifying Gel', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-enlighten-brightening-eye-cream'), 'neostrata-enlighten-brightening-eye-cream-dark-circles-800.jpg', 'Neostrata Enlighten Brightening Eye Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-15-vitamin-c-pha-serum'), 'neostrata-enlighten-vitamin-c-15-pha-antioxidant-serum-800.jpg', 'Neostrata 15% Vitamin C + PHA Serum', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-potent-retinol-complex'), 'neostrata-skin-active-potent-retinol-complex-anti-aging-800.jpg', 'Neostrata Skin Active Potent Retinol Complex', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-hyaluronic-luminous-lift'), 'neostrata-skin-active-hyaluronic-luminous-lift-firming-cream-800.jpg', 'Neostrata Skin Active Hyaluronic Luminous Lift', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-skin-active-rebound-sculpting-cream'), 'neostrata-skin-active-rebound-sculpting-firming-cream-800.jpg', 'Neostrata Skin Active Rebound Sculpting Cream', 0
)
on conflict do nothing;

insert into public.product_images (product_id, url, alt_text, sort_order)
values (
  (select id from public.products where slug = 'neostrata-enlighten-trio-pack'), 'neostrata-enlighten-trio-pack-complete-brightening-system-800.jpg', 'Neostrata Enlighten Trio Pack', 0
)
on conflict do nothing;

-- ── Product Stock ─────────────────────────────────────────
insert into public.product_stock (product_id, status, quantity)
values
  ((select id from public.products where slug = 'neostrata-ultra-smoothing-cream-10-aha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-ultra-daytime-smoothing-cream-spf20'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-ultra-smoothing-lotion-10-aha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-face-cream-plus-15-aha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-high-potency-cream-20-aha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-facial-cleanser'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-ultra-moisturizing-face-cream'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-daytime-protection-cream-spf-23-10-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-bionic-face-cream-12-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-bionic-lotion-15-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-bio-hydrating-cream-15-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-clarifying-facial-cleanser'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-sheer-hydration-spf-35'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-ultra-brightening-cleanser'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-pigment-controller'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-illuminating-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-brightener-spf-35'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-dark-spot-corrector'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-exfoliating-wash'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-matrix-support-spf-30'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-intense-eye-therapy'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-cellular-restoration'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-triple-firming-neck-cream'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-tri-therapy-lifting-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-antioxidant-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-collagen-booster-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-sheer-physical-protection-spf-50'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-renewal-cream-12-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-bionic-face-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-bionic-eye-cream-plus-4-pha'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-enlighten-pack'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-eye-cream'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-pha-daily-moisturizer'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-oily-skin-solution'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-targeted-clarifying-gel'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-enlighten-brightening-eye-cream'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-15-vitamin-c-pha-serum'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-potent-retinol-complex'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-hyaluronic-luminous-lift'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-skin-active-rebound-sculpting-cream'), 'OUT_OF_STOCK', NULL),
  ((select id from public.products where slug = 'neostrata-enlighten-trio-pack'), 'OUT_OF_STOCK', NULL)
on conflict (product_id) do update set
  status     = excluded.status,
  quantity   = excluded.quantity,
  updated_at = now();

-- ── Verify ─────────────────────────────────────────────────
select p.name, p.slug, p.price_cents, ps.status
from public.products p
join public.product_stock ps on ps.product_id = p.id
where p.brand_slug = 'neostrata'
order by p.name;