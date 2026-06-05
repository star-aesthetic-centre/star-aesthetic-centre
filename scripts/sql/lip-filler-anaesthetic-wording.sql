-- Lip Filler Treatment — replace EMLA brand name in How it Works (step 3)
-- Run in: Supabase Dashboard → SQL Editor
-- Safe to run multiple times (only updates rows that still mention EMLA).

BEGIN;

UPDATE public.treatments
SET how_works = ARRAY[
  replace(
    replace(
      how_works[1],
      '<strong>EMLA cream</strong> is applied to the lip area for 20-30 minutes.',
      'A <strong>medical-grade topical anaesthetic</strong> is applied to the lip area for 20–30 minutes to ensure comfort.'
    ),
    'EMLA cream is applied to the lip area for 20-30 minutes.',
    'A medical-grade topical anaesthetic is applied to the lip area for 20–30 minutes to ensure comfort.'
  )
]
WHERE slug = 'lip-filler'
  AND how_works IS NOT NULL
  AND array_length(how_works, 1) >= 1
  AND how_works[1] ILIKE '%EMLA%';

COMMIT;
