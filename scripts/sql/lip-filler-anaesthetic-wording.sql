-- Lip Filler Treatment — replace EMLA brand name in How it Works (step 3)
-- Run in: Supabase Dashboard → SQL Editor
-- Note: how_works is JSONB (not a Postgres text[]), so we use jsonb_array_elements.
-- Safe to run multiple times (only updates rows that still mention EMLA).

BEGIN;

UPDATE public.treatments
SET how_works = (
  SELECT jsonb_agg(
    to_jsonb(
      replace(
        replace(
          replace(
            replace(
              elem #>> '{}',
              '<strong>EMLA cream</strong> is applied to the lip area for 20–30 minutes.',
              'A <strong>medical-grade topical anaesthetic</strong> is applied to the lip area for 20–30 minutes to ensure comfort.'
            ),
            '<strong>EMLA cream</strong> is applied to the lip area for 20-30 minutes.',
            'A <strong>medical-grade topical anaesthetic</strong> is applied to the lip area for 20–30 minutes to ensure comfort.'
          ),
          'EMLA cream is applied to the lip area for 20–30 minutes.',
          'A medical-grade topical anaesthetic is applied to the lip area for 20–30 minutes to ensure comfort.'
        ),
        'EMLA cream is applied to the lip area for 20-30 minutes.',
        'A medical-grade topical anaesthetic is applied to the lip area for 20–30 minutes to ensure comfort.'
      )
    )
  )
  FROM jsonb_array_elements(how_works) AS t(elem)
)
WHERE slug = 'lip-filler'
  AND how_works IS NOT NULL
  AND jsonb_typeof(how_works) = 'array'
  AND jsonb_array_length(how_works) >= 1
  AND how_works::text ILIKE '%EMLA%';

COMMIT;
