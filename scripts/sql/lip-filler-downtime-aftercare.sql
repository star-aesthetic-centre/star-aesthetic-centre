-- Lip Filler — Downtime & Aftercare wording (Nakita: no lip gloss for swelling; makeup for bruising)
-- Run after add-downtime-detail-column.sql

BEGIN;

UPDATE public.treatments
SET downtime_detail = $txt$**24–48 hours** mild-to-moderate lip swelling is normal. Bruising is possible but not universal — **make-up can be applied to cover bruising** where needed. Avoid intense exercise, heat exposure, and alcohol for 24 hours. Avoid dental procedures for 2 weeks.$txt$
WHERE slug = 'lip-filler';

COMMIT;
