-- Fix SkinCeuticals products incorrectly prefixed with "Neostrata"
update public.products
set name = replace(name, 'Neostrata ', 'SkinCeuticals ')
where brand_slug = 'skinceuticals'
  and name like 'Neostrata %';

-- Verify
select name, slug from public.products
where brand_slug = 'skinceuticals'
order by name;
