-- ══════════════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Treatment Admin Migration
-- Run in: Supabase Dashboard → SQL Editor → Run
-- Adds: title editing, SEO meta fields, full content editing, redirect table
-- ══════════════════════════════════════════════════════════════════════════

-- ── SEO / Meta columns ────────────────────────────────────────────────────
ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS meta_title        text,
  ADD COLUMN IF NOT EXISTS meta_description  text,
  ADD COLUMN IF NOT EXISTS meta_keywords     text,
  ADD COLUMN IF NOT EXISTS og_image          text,
  ADD COLUMN IF NOT EXISTS card_image        text,
  ADD COLUMN IF NOT EXISTS card_image_alt    text;

-- ── Long-form HTML content (edited via Tiptap in admin) ───────────────────
ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS hero_text         text,
  ADD COLUMN IF NOT EXISTS what_is           text,
  ADD COLUMN IF NOT EXISTS expected_results  text,
  ADD COLUMN IF NOT EXISTS downtime_detail   text;

-- ── Structured content (JSONB arrays) ─────────────────────────────────────
ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS how_works         jsonb,   -- text[]
  ADD COLUMN IF NOT EXISTS suitable_for      jsonb,   -- text[]
  ADD COLUMN IF NOT EXISTS faqs              jsonb;   -- {question,answer}[]

-- ── Treatment redirects (for future slug changes by developer) ────────────
CREATE TABLE IF NOT EXISTS public.treatment_redirects (
  id          uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  old_slug    text         NOT NULL UNIQUE,
  new_slug    text         NOT NULL,
  created_at  timestamptz  DEFAULT now() NOT NULL
);

ALTER TABLE public.treatment_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public read treatment_redirects"
  ON public.treatment_redirects FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Service role manage treatment_redirects"
  ON public.treatment_redirects USING (auth.role() = 'service_role');
