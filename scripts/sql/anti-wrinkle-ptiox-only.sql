-- ══════════════════════════════════════════════════════════════════════════
-- Anti-Wrinkle Treatment — product grid: P-TIOX only
-- Run in: Supabase Dashboard → SQL Editor
--
-- Nakita: remove Mesoestetic maintenance grid items; keep SkinCeuticals P-TIOX.
-- ══════════════════════════════════════════════════════════════════════════

BEGIN;

-- Drop every anti-wrinkle / legacy botox product link except P-TIOX
DELETE FROM public.treatment_product_recommendations tpr
WHERE tpr.treatment_slug IN ('anti-wrinkle-treatment', 'botox')
  AND tpr.product_id NOT IN (
    SELECT id FROM public.products WHERE slug = 'skinceuticals-ptiox'
  );

-- Remove duplicate rows on legacy slug (page uses anti-wrinkle-treatment)
DELETE FROM public.treatment_product_recommendations
WHERE treatment_slug = 'botox';

-- Ensure P-TIOX is linked (single card on treatment page)
INSERT INTO public.treatment_product_recommendations
  (treatment_slug, product_id, phase, phase_label, is_essential, notes, sort_order)
SELECT
  'anti-wrinkle-treatment',
  p.id,
  'maintenance',
  'Home care between appointments — daily use',
  true,
  'P-TIOX softens expression lines topically and helps prolong your Anti-Wrinkle Treatment results between appointments. Dr. Bangalee recommends it for patients extending injectable results at home, or those not yet ready for injectables.',
  1
FROM public.products p
WHERE p.slug = 'skinceuticals-ptiox'
ON CONFLICT (treatment_slug, product_id, phase) DO UPDATE SET
  phase_label = EXCLUDED.phase_label,
  is_essential = EXCLUDED.is_essential,
  notes = EXCLUDED.notes,
  sort_order = EXCLUDED.sort_order;

COMMIT;
