-- Add downtime_detail for "Downtime & Aftercare" paragraph under Expected Results
-- Run in: Supabase Dashboard → SQL Editor (once)

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS downtime_detail text;
