-- ══════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Bookings Table
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════════

create table public.bookings (
  id               uuid         default gen_random_uuid() primary key,
  reference        text         not null unique,          -- e.g. SAC-20260320-A1B2
  treatment        text         not null,                 -- display name
  treatment_slug   text         not null,                 -- e.g. "botox"
  slots_needed     int          not null default 1,       -- 1 or 2 (60-min blocks)
  patient_name     text         not null,
  patient_email    text         not null,
  patient_phone    text         not null,
  date             date         not null,                 -- YYYY-MM-DD
  time_slot        text         not null,                 -- HH:MM (24-hour, e.g. "09:00")
  notes            text,
  status           text         not null default 'confirmed',  -- confirmed | cancelled | no-show
  created_at       timestamptz  default now() not null
);

-- Indexes for fast availability queries
create index bookings_date_idx        on public.bookings (date);
create index bookings_date_slug_idx   on public.bookings (date, treatment_slug);
create index bookings_status_idx      on public.bookings (status);

-- Row-level security (enable but allow anon key to insert/select via service)
alter table public.bookings enable row level security;

-- Allow the anon key to INSERT (so the Next.js API route can create bookings)
create policy "Allow insert via anon key"
  on public.bookings for insert
  with check (true);

-- Allow the anon key to SELECT (so availability queries work)
create policy "Allow select via anon key"
  on public.bookings for select
  using (true);

-- ══════════════════════════════════════════════════════════════════
-- Verify: run this after creating the table
-- select * from public.bookings limit 5;
-- ══════════════════════════════════════════════════════════════════
