-- isdin price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\ISDIN.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 60500, regular_price_cents = 60500, updated_at = now() where id = 'd62d0dfd-ab29-4986-bb21-649909cffba5'; -- ISDIN Fusion Water Magic Bronze SPF50 (was 575.00, now 605.00)
update public.products set price_cents = 60500, regular_price_cents = 60500, updated_at = now() where id = '8c6b3678-a7c2-4cb1-876c-9e83588f6913'; -- ISDIN Fusion Water Magic Light SPF50 (was 575.00, now 605.00)
update public.products set price_cents = 60500, regular_price_cents = 60500, updated_at = now() where id = '0ec294cf-979d-4e81-96b4-1aef2dcb8d3e'; -- ISDIN Fusion Water Magic Medium SPF50 (was 575.00, now 605.00)
update public.products set price_cents = 66900, regular_price_cents = 66900, updated_at = now() where id = 'be391a31-73b1-4f5b-bccd-8a4d59546d1c'; -- ISDIN Fusion Water Magic SPF50 (was 639.00, now 669.00)
update public.products set price_cents = 76900, regular_price_cents = 76900, updated_at = now() where id = '1cab8925-b4d5-44b5-8038-00817bffd3a5'; -- ISDIN UV Mineral Brush SPF50+ (was 729.00, now 769.00)

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'isdin' order by name;
