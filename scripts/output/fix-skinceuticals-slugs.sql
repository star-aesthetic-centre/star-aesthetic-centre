-- Fix slugs that still have 'neostrata-' prefix for SkinCeuticals products
update public.products
set slug = replace(slug, 'neostrata-', 'skinceuticals-')
where brand_slug = 'skinceuticals'
  and slug like 'neostrata-%';

-- Verify — should show no neostrata- slugs for skinceuticals brand
select name, slug from public.products
where brand_slug = 'skinceuticals'
order by name;
