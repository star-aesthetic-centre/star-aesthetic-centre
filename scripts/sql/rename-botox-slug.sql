-- ══════════════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Rename botox slug to anti-wrinkle-treatment
-- Run in: Supabase Dashboard → SQL Editor → Run
-- Must update FK references BEFORE the primary treatments row.
-- ══════════════════════════════════════════════════════════════════════════

BEGIN;

-- 1. Update foreign key references in product recommendations first
UPDATE public.treatment_product_recommendations
  SET treatment_slug = 'anti-wrinkle-treatment'
  WHERE treatment_slug = 'botox';

-- 2. Rename the treatment slug
UPDATE public.treatments
  SET slug = 'anti-wrinkle-treatment'
  WHERE slug = 'botox';

-- 3. Record the redirect for reference
INSERT INTO public.treatment_redirects (old_slug, new_slug)
  VALUES ('botox', 'anti-wrinkle-treatment')
  ON CONFLICT (old_slug) DO UPDATE SET new_slug = 'anti-wrinkle-treatment';

COMMIT;
