-- ══════════════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Add pricing_breakdown column
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS pricing_breakdown jsonb;
