-- Vitamin Drip bookings — Star Aesthetic Centre
-- Run once in the Supabase SQL editor.
--
-- Deliberately separate from the `bookings` table. The drip lounge has two
-- chairs and does not use Dr. Bangalee's treatment room, so it books on its
-- own rules: two per hourly slot, last slot 16:00, same-day allowed.

create table if not exists public.drip_bookings (
  id           uuid primary key default gen_random_uuid(),
  reference    text not null unique,
  drip_slug    text not null,
  drip_title   text not null,
  patient_name  text not null,
  patient_email text not null,
  patient_phone text not null,
  date         date not null,
  time_slot    text not null,
  notes        text,
  status       text not null default 'confirmed',
  created_at   timestamptz not null default now()
);

-- Availability lookups hit this constantly.
create index if not exists drip_bookings_date_slot_idx
  on public.drip_bookings (date, time_slot)
  where status <> 'cancelled';

create index if not exists drip_bookings_created_at_idx
  on public.drip_bookings (created_at desc);

alter table public.drip_bookings enable row level security;

-- No anon policies: the API uses the service role key, which bypasses RLS.
-- Patient names, emails and phone numbers must never be readable from the browser.
