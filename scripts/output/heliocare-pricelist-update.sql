-- heliocare price update from D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Heliocare.xlsx
-- RRSP inc VAT × 100 → price_cents / regular_price_cents
-- Generated 2026-06-05

update public.products set price_cents = 68400, regular_price_cents = 68400, updated_at = now() where id = 'cbb5d806-abe5-4ffc-bd68-e72a095cdc11'; -- Heliocare 360 AK Fluid SPF100+ (was 652.00, now 684.00)
update public.products set price_cents = 61400, regular_price_cents = 61400, updated_at = now() where id = '6bdcb33e-6079-4271-83c9-372c7f319d85'; -- Heliocare 360 Color Gel Oil Free SPF50+ Beige (was 584.00, now 614.00)
update public.products set price_cents = 61400, regular_price_cents = 61400, updated_at = now() where id = '54e408cb-9ea1-42fe-83f6-a016776fecf7'; -- Heliocare 360 Color Gel Oil Free SPF50+ Bronze (was 584.00, now 614.00)
update public.products set price_cents = 60100, regular_price_cents = 60100, updated_at = now() where id = '1505314a-edf0-4af1-87f4-02148f323ec3'; -- Heliocare 360 Gel Oil Free Touch SPF50+ (was 572.00, now 601.00)
update public.products set price_cents = 69800, regular_price_cents = 69800, updated_at = now() where id = 'cb3cd2e6-a6ab-41c9-8d3b-d3ca5fbe334a'; -- Heliocare 360 Mineral Tolerance Fluid SPF50 (was 665.00, now 698.00)
update public.products set price_cents = 81300, regular_price_cents = 81300, updated_at = now() where id = '097ce2f2-9657-497e-b45a-901cd427a716'; -- Heliocare 360 Oral Capsules 30 (was 774.00, now 813.00)
update public.products set price_cents = 78200, regular_price_cents = 78200, updated_at = now() where id = '091551e9-4b93-4dde-9591-1900557d449f'; -- Heliocare 360 Paediatric Lotion SPF50 200ml (was 745.00, now 782.00)
update public.products set price_cents = 47400, regular_price_cents = 47400, updated_at = now() where id = 'b4222656-c087-42bc-98fa-8afd65279d8c'; -- Heliocare 360 Paediatric Lotion SPF50+ (was 451.00, now 474.00)
update public.products set price_cents = 69400, regular_price_cents = 69400, updated_at = now() where id = '6ed7b704-ea96-4086-aa63-830989f428e5'; -- Heliocare 360 Pigment Solution Fluid SPF50 (was 661.00, now 694.00)
update public.products set price_cents = 56400, regular_price_cents = 56400, updated_at = now() where id = 'bd640647-5e42-461f-8a12-14c73025e5ac'; -- Heliocare Spray SPF50 200ml (was 537.00, now 564.00)

-- Verify
select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products
where brand_slug = 'heliocare' order by name;
