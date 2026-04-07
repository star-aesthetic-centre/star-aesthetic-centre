-- Fix Triple Lipid Restore: remove WhatsApp image entries that don't exist in public/images
-- Then ensure correct primary (sort_order 0) is set

-- Step 1: Remove the two bad WhatsApp image rows
delete from public.product_images
where product_id = (select id from public.products where slug = 'skinceuticals-triple-lipid-restore')
  and url like '%WhatsApp%';

-- Step 2: Verify what remains
select pi.sort_order, pi.url
from public.product_images pi
join public.products p on p.id = pi.product_id
where p.slug = 'skinceuticals-triple-lipid-restore'
order by pi.sort_order;
