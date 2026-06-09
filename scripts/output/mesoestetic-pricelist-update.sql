-- mesoestetic price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Mesoestetic.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 167900, regular_price_cents = 167900, updated_at = now() where id = 'ed491bcf-a968-4ccb-bec1-82eea61a7d13'; -- Mesoestetic AGE Element Brightening Eye Cream (was 1629.00, now 1679.00)
update public.products set price_cents = 223800, regular_price_cents = 223800, updated_at = now() where id = '35d3a514-240e-4fea-a61b-ddd8ee51fe92'; -- Mesoestetic Anti-Stress Face Mask (was 2172.00, now 2238.00)
update public.products set price_cents = 188000, regular_price_cents = 188000, updated_at = now() where id = '19e9b5c1-fb2f-4232-a926-b424d73b2ad2'; -- Mesoestetic Aox Ferulic (was 3973.00, now 1880.00)
update public.products set price_cents = 112300, regular_price_cents = 112300, updated_at = now() where id = '3a1eb7ee-4c3e-42ab-a68f-8a982b937586'; -- Mesoestetic Brightening Foam (was 1178.00, now 1123.00)
update public.products set price_cents = 699500, regular_price_cents = 699500, updated_at = now() where id = 'e7859528-d257-4fc8-81aa-521ee713d199'; -- Mesoestetic Cosmelan 2 Maintenance Cream (was 6635.00, now 6995.00)
update public.products set price_cents = 188900, regular_price_cents = 188900, updated_at = now() where id = 'd86a71e7-1453-47f9-8be5-00494df8b7b8'; -- Mesoestetic Fast Skin Repair (was 1833.00, now 1889.00)
update public.products set price_cents = 318000, regular_price_cents = 318000, updated_at = now() where id = 'f9835fc7-71a3-424b-9576-806cfad778b8'; -- Mesoestetic HA Densimatrix (was 3319.00, now 3180.00)
update public.products set price_cents = 129600, regular_price_cents = 129600, updated_at = now() where id = '7931eeee-fdcb-42e4-876c-2b837f5b6a5c'; -- Mesoestetic Hydracream Fusion (was 1334.00, now 1296.00)
update public.products set price_cents = 157900, regular_price_cents = 157900, updated_at = now() where id = 'c80b5238-bddb-49b0-aca2-85e5b255c4f5'; -- Mesoestetic Hydratonic Mist (was 1533.00, now 1579.00)
update public.products set price_cents = 216400, regular_price_cents = 216400, updated_at = now() where id = '862b8f70-612d-476a-b28c-89d93fa87ddc'; -- Mesoestetic Melan Recovery (was 2100.00, now 2164.00)
update public.products set price_cents = 280200, regular_price_cents = 280200, updated_at = now() where id = '6d416a46-6f3d-4129-9520-98d3a492d2db'; -- Mesoestetic Melan Tran3x Concentrate (was 2778.00, now 2802.00)
update public.products set price_cents = 196800, regular_price_cents = 196800, updated_at = now() where id = '8b229fa4-aa06-4a59-8c0b-e8d3184bc3b9'; -- Mesoestetic Melan Tran3x Gel-Cream (was 1910.00, now 1968.00)
update public.products set price_cents = 598600, regular_price_cents = 598600, updated_at = now() where id = '5a8df356-7bb7-493d-9828-075ac22a881c'; -- Mesoestetic Melan Tranex Kit (was 5812.00, now 5986.00)
update public.products set price_cents = 167700, regular_price_cents = 167700, updated_at = now() where id = 'c668cb1a-48b7-433c-9b54-2fa3ccf2d6d2'; -- Mesoestetic Mesoprotech Melan 130+ Pigment Control SPF50+ (was 1628.00, now 1677.00)

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'mesoestetic' order by name;
