-- ─────────────────────────────────────────────────────────────────────────────
-- Patient reviews
-- Run once in the Supabase SQL editor. Safe to re-run (all statements guarded).
--
-- Adapted from the AestheticBiz reviews model. Two deliberate differences:
--   • Reviews are NEVER public until approved. A clinic cannot have unmoderated
--     text about medical treatments appearing under a named practitioner.
--   • Written only for now — no video column set, so nothing implies a feature
--     that isn't built.
--
-- NOTE: `create table if not exists` silently does nothing when the table
-- already exists. Verify new columns with a per-column probe, never by
-- re-running this file. (That trap cost three months on gift_vouchers.)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Author. Email is collected for verification and reply, never displayed.
  name        text not null,
  email       text not null,
  city        text,

  -- What is being reviewed. treatment_slug matches lib/treatment-routes.ts.
  scope         text not null default 'general'
                check (scope in ('general', 'treatment')),
  treatment_slug text,
  subject_label  text,

  rating      int not null check (rating between 1 and 5),
  headline    text not null,

  -- The guided answers, one row per question, kept structured so the display
  -- can render them as Q&A rather than a wall of text.
  answers_json jsonb not null default '[]'::jsonb,
  -- Flattened copy of the same content, for search and plain rendering.
  body        text not null,

  -- Moderation. Nothing is public until an admin approves it.
  approved     boolean not null default false,
  approved_at  timestamptz,
  featured     boolean not null default false,

  -- Set when the review arrived from a post-appointment request email, so the
  -- effectiveness of that email is measurable instead of guessed at.
  booking_reference text,
  source       text not null default 'web'
);

-- A treatment page reads approved reviews for one slug, newest first.
create index if not exists reviews_treatment_approved_idx
  on public.reviews (treatment_slug, approved, created_at desc);

-- The moderation queue reads unapproved, oldest first.
create index if not exists reviews_moderation_idx
  on public.reviews (approved, created_at);

-- RLS on with no policies: reachable only through the service role, which is
-- what every API route here uses. The anon key can neither read nor write —
-- so an unapproved review cannot leak to the browser.
alter table public.reviews enable row level security;

-- ── Review request tracking ──────────────────────────────────────────────────
-- The follow-up email claims its slot on the booking row BEFORE sending, so a
-- cron run that overlaps with the previous one cannot email the same patient
-- twice. Same announce-once shape as orders.payment_result_email_sent_at.
alter table public.bookings
  add column if not exists review_request_sent_at timestamptz;

-- The cron scans for confirmed bookings whose date has passed and that have
-- not been asked yet.
create index if not exists bookings_review_request_idx
  on public.bookings (status, date, review_request_sent_at);
