-- ══════════════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Rename botox slug to anti-wrinkle-treatment
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Rename the treatment slug in the treatments table
UPDATE public.treatments
  SET slug = 'anti-wrinkle-treatment'
  WHERE slug = 'botox';

-- 2. Record the redirect in treatment_redirects (for reference / future use)
INSERT INTO public.treatment_redirects (old_slug, new_slug)
  VALUES ('botox', 'anti-wrinkle-treatment')
  ON CONFLICT (old_slug) DO UPDATE SET new_slug = 'anti-wrinkle-treatment';
