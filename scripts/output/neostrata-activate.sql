-- ══════════════════════════════════════════════════════════
-- NeoStrata — Activate all 41 products
-- All were inserted with is_active = false
-- Run this to make them visible in the shop
-- ══════════════════════════════════════════════════════════

update public.products
set is_active = true,
    updated_at = now()
where brand_slug = 'neostrata';

-- Verify
select count(*) as total, sum(case when is_active then 1 else 0 end) as active
from public.products
where brand_slug = 'neostrata';
