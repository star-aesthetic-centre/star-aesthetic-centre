-- neostrata price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\NeoStrata.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 105200, regular_price_cents = 105200, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30251X'; -- NeoStrata 15% Vitamin C + PHA Serum
update public.products set price_cents = 94600, regular_price_cents = 94600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30137XA'; -- NeoStrata Bionic Face Cream
update public.products set price_cents = 101700, regular_price_cents = 101700, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30119XA'; -- NeoStrata Enlighten Brightening Eye Cream
update public.products set price_cents = 255300, regular_price_cents = 255300, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'ENLIGHTEN BRIGHTENING PK'; -- NeoStrata Enlighten Brightening Pack
update public.products set price_cents = 68300, regular_price_cents = 68300, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30162XA'; -- NeoStrata Enlighten Dark Spot Corrector
update public.products set price_cents = 149200, regular_price_cents = 149200, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30161XA'; -- NeoStrata Enlighten Illuminating Serum
update public.products set price_cents = 127900, regular_price_cents = 127900, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30160R'; -- NeoStrata Enlighten Pigment Controller
update public.products set price_cents = 113600, regular_price_cents = 113600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30131C'; -- NeoStrata Enlighten Skin Brightener SPF35
update public.products set price_cents = 306600, regular_price_cents = 306600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'ENLIGHTEN TRIO'; -- NeoStrata Enlighten Trio Pack
update public.products set price_cents = 80600, regular_price_cents = 80600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30123CA'; -- NeoStrata Enlighten Ultra Brightening Cleanser
update public.products set price_cents = 64400, regular_price_cents = 64400, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30135XA'; -- NeoStrata Facial Cleanser
update public.products set price_cents = 66000, regular_price_cents = 66000, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30132XA'; -- NeoStrata Glycolic Renewal Smoothing Cream
update public.products set price_cents = 76300, regular_price_cents = 76300, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30133XA'; -- NeoStrata Glycolic Renewal Smoothing Lotion
update public.products set price_cents = 101600, regular_price_cents = 101600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30152R'; -- NeoStrata High Potency Cream
update public.products set price_cents = 78500, regular_price_cents = 78500, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30141XA'; -- NeoStrata Hydra Filling PHA Eye Cream
update public.products set price_cents = 72900, regular_price_cents = 72900, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30142XA'; -- NeoStrata Mandelic Clarifying Cleanser
update public.products set price_cents = 70000, regular_price_cents = 70000, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30145XB'; -- NeoStrata Oily Skin Solution
update public.products set price_cents = 83100, regular_price_cents = 83100, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30240X'; -- NeoStrata PHA Daily Moisturizer
update public.products set price_cents = 86600, regular_price_cents = 86600, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30163C'; -- NeoStrata Sheer Hydration SPF 40
update public.products set price_cents = 86300, regular_price_cents = 86300, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30146XA'; -- NeoStrata Skin Active Exfoliating Wash
update public.products set price_cents = 183200, regular_price_cents = 183200, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30268X'; -- NeoStrata Skin Active Hyaluronic Luminous Lift
update public.products set price_cents = 162800, regular_price_cents = 162800, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30148XA'; -- NeoStrata Skin Active Intensive Eye Therapy
update public.products set price_cents = 132800, regular_price_cents = 132800, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30149C'; -- NeoStrata Skin Active Matrix Support SPF 30
update public.products set price_cents = 153800, regular_price_cents = 153800, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30292X'; -- NeoStrata Skin Active Potent Retinol Complex
update public.products set price_cents = 166000, regular_price_cents = 166000, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30301X'; -- NeoStrata Skin Active Rebound Sculpting Cream
update public.products set price_cents = 55700, regular_price_cents = 55700, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30144XA'; -- NeoStrata Targeted Clarifying Gel
update public.products set price_cents = 78000, regular_price_cents = 78000, updated_at = now() where brand_slug = 'neostrata' and upper(trim(sku)) = 'F30136XA'; -- NeoStrata Ultra Moisturising Face Cream

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'neostrata' order by name;
