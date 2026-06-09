-- dermaceutic price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Dermaceutic.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 178500, regular_price_cents = 178500, updated_at = now() where id = 'ff641be3-bf14-431c-a5de-692ca3478cb3'; -- Dermaceutic Activ Retinol 1.0 (was 1685.00, now 1785.00)
update public.products set price_cents = 124000, regular_price_cents = 124000, updated_at = now() where id = 'e9b25d71-f168-448e-a1d7-69c9aa94b8a9'; -- Dermaceutic C25 (was 1170.00, now 1240.00)
update public.products set price_cents = 187000, regular_price_cents = 187000, updated_at = now() where id = 'a91f0bf7-99f8-444e-883d-38802e50560e'; -- Dermaceutic Dual Plus (was 1764.00, now 1870.00)
update public.products set price_cents = 111000, regular_price_cents = 111000, updated_at = now() where id = 'a06b7d7b-7bca-44b4-a414-975ca03cdba4'; -- Dermaceutic K Ceutic SPF 50 (was 1050.00, now 1110.00)
update public.products set price_cents = 118000, regular_price_cents = 118000, updated_at = now() where id = 'd905e28a-77ec-4939-acf6-3237fa0a0c3e'; -- Dermaceutic Light Ceutic (was 1113.00, now 1180.00)
update public.products set price_cents = 223500, regular_price_cents = 223500, updated_at = now() where id = '7cbdc983-9649-4de8-81de-a3b78cdc6137'; -- Dermaceutic Mela Cream (was 2110.00, now 2235.00)
update public.products set price_cents = 120000, regular_price_cents = 120000, updated_at = now() where id = '6355e3e7-8036-49f0-b373-038ed76ebe82'; -- Dermaceutic Radiance Mask (was 1135.00, now 1200.00)
update public.products set price_cents = 112300, regular_price_cents = 112300, updated_at = now() where id = 'e04530d1-0a26-49e1-82e3-29792bfdb19e'; -- Dermaceutic Yellow Cream (was 1060.00, now 1123.00)

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'dermaceutic' order by name;
