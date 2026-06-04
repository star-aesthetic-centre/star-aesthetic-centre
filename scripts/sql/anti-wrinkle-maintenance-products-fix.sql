-- ══════════════════════════════════════════════════════════════════════════
-- Anti-Wrinkle Treatment — product recommendations tidy-up
-- Run in: Supabase Dashboard → SQL Editor
--
-- Nakita feedback: five products under a "morning antioxidant" heading was
-- confusing. Keep four core maintenance items; remove evening retinol from
-- this grid (still available in shop; prescribe at consultation).
-- ══════════════════════════════════════════════════════════════════════════

BEGIN;

DELETE FROM public.treatment_product_recommendations tpr
USING public.products p
WHERE tpr.product_id = p.id
  AND p.slug = 'dermaceutic-activ-retinol-10'
  AND tpr.treatment_slug IN ('anti-wrinkle-treatment', 'botox');

COMMIT;
