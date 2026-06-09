-- skinceuticals price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Skinceuticals.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 155000, regular_price_cents = 155000, updated_at = now() where id = '7f7e04f3-0575-43c5-b181-0f8cc3bd4fe0'; -- SkinCeuticals Advanced Brightening UV Defense SPF50 (was 1500.00, now 1550.00)
update public.products set price_cents = 235000, regular_price_cents = 235000, updated_at = now() where id = 'a62c33da-29b1-4036-848f-869a630af92c'; -- SkinCeuticals AGE Eye Complex (was 2290.00, now 2350.00)
update public.products set price_cents = 388000, regular_price_cents = 388000, updated_at = now() where id = '4a3f155b-1d84-4568-8501-937b722aa7ef'; -- SkinCeuticals AGE Interrupter Advanced (was 3820.00, now 3880.00)
update public.products set price_cents = 230000, regular_price_cents = 230000, updated_at = now() where id = '4b9f81ae-9e16-4241-966e-91acc473781e'; -- SkinCeuticals Blemish + AGE Serum (was 2150.00, now 2300.00)
update public.products set price_cents = 340000, regular_price_cents = 340000, updated_at = now() where id = 'aef7daf2-5c06-4d84-9993-d7e9cfae923f'; -- SkinCeuticals C E Ferulic® with 15% L-Ascorbic Acid (was 3300.00, now 3400.00)
update public.products set price_cents = 250000, regular_price_cents = 250000, updated_at = now() where id = '7fb952e7-db31-4e63-a7b2-d1ae96435581'; -- SkinCeuticals Discoloration Defense (was 2420.00, now 2500.00)
update public.products set price_cents = 100000, regular_price_cents = 100000, updated_at = now() where id = '1c492907-b953-4847-a288-1efbde079690'; -- SkinCeuticals Gentle Cleanser (was 910.00, now 1000.00)
update public.products set price_cents = 196000, regular_price_cents = 196000, updated_at = now() where id = 'c1bfb109-0787-42f8-b134-3632a213b54b'; -- SkinCeuticals Glycolic 10 Renew Overnight (was 1900.00, now 1960.00)
update public.products set price_cents = 102000, regular_price_cents = 102000, updated_at = now() where id = '4ae3055b-ef42-4364-88c4-ed540f055886'; -- SkinCeuticals Glycolic Renewal Cleanser (was 980.00, now 1020.00)
update public.products set price_cents = 340000, regular_price_cents = 340000, updated_at = now() where id = 'ea746995-a6f6-4b38-80af-a99f1bfda7f3'; -- SkinCeuticals Phloretin CF® with Ferulic Acid (was 3300.00, now 3400.00)
update public.products set price_cents = 180000, regular_price_cents = 180000, updated_at = now() where id = '0a65598d-88bc-4bd8-b6a2-b7a47dad1500'; -- SkinCeuticals Phyto A+ Brightening Treatment (was 1700.00, now 1800.00)
update public.products set price_cents = 290000, regular_price_cents = 290000, updated_at = now() where id = 'a70f8cb9-7d08-497f-a39b-bf099f441078'; -- SkinCeuticals PTIOX (was 2700.00, now 2900.00)
update public.products set price_cents = 360000, regular_price_cents = 360000, updated_at = now() where id = '2378b679-fffe-4c49-bcfa-ef967c1951c3'; -- SkinCeuticals Resveratrol BE (was 3500.00, now 3600.00)
update public.products set price_cents = 190000, regular_price_cents = 190000, updated_at = now() where id = '8be0648c-68e1-4d9a-9dbc-6dd9f384d1a9'; -- SkinCeuticals Retinol 0.3 (was 1810.00, now 1900.00)
update public.products set price_cents = 205000, regular_price_cents = 205000, updated_at = now() where id = '1c5391d7-f4b2-4eb8-a1c4-a5c0cac7d29e'; -- SkinCeuticals Retinol 0.5 (was 1940.00, now 2050.00)
update public.products set price_cents = 170000, regular_price_cents = 170000, updated_at = now() where id = 'b0ea184d-d536-4828-8dee-726f24a4b24e'; -- SkinCeuticals Serum 10 AOX (was 1600.00, now 1700.00)
update public.products set price_cents = 380000, regular_price_cents = 380000, updated_at = now() where id = '78f940ae-350c-4e5d-85e9-c13834d8e940'; -- SkinCeuticals Triple Lipid Restore (was 3650.00, now 3800.00)

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'skinceuticals' order by name;
