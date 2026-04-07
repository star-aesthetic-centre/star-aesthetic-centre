-- Strip HTML tags from Dermaceutic short_description field
-- All 14 products were imported from CSV with <p> and <strong> tags

update public.products
set
  short_description = trim(
    regexp_replace(
      regexp_replace(short_description, '<[^>]+>', '', 'g'),  -- remove all HTML tags
      '\s+', ' ', 'g'                                          -- collapse extra whitespace
    )
  ),
  updated_at = now()
where brand_slug = 'dermaceutic'
  and short_description like '<%';

-- Verify
select name, left(short_description, 120) as short_desc_preview
from public.products
where brand_slug = 'dermaceutic'
order by name;
