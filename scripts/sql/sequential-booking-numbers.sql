-- ─────────────────────────────────────────────────────────────────────────────
-- Human-friendly sequential booking references: SAC-BK-2026-001, -002, …
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- Deliberately separate from order numbers: a booking and an order placed the
-- same day should not share a counter, and the two series read very differently
-- on the phone ("bee-kay" vs plain). Same atomic-claim mechanism as
-- sequential-order-numbers.sql — see that file for why the counter can't live
-- in the app.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.booking_number_counters (
  year        int primary key,
  last_number int not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.booking_number_counters enable row level security;
-- No policies: reachable only via the service role and the function below.

/**
 * Claim the next booking number for the current year and return the formatted
 * reference. Single atomic statement — concurrent bookings each get a distinct
 * number. Restarts at 001 each January, South African local time.
 */
create or replace function public.next_booking_reference()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  y int := extract(year from (now() at time zone 'Africa/Johannesburg'))::int;
  n int;
begin
  insert into public.booking_number_counters as c (year, last_number)
       values (y, 1)
  on conflict (year)
    do update set last_number = c.last_number + 1,
                  updated_at  = now()
    returning c.last_number into n;

  -- lpad pads but never truncates, so booking 1000 becomes SAC-BK-2026-1000.
  return 'SAC-BK-' || y::text || '-' || lpad(n::text, 3, '0');
end;
$$;

-- The /api/bookings route runs server-side with the service role for this call.
-- anon is deliberately NOT granted: a public visitor could otherwise burn
-- booking numbers by calling the function in a loop.
revoke all on function public.next_booking_reference() from public, anon, authenticated;
grant execute on function public.next_booking_reference() to service_role;

-- ── Continue from any bookings already made this year ────────────────────────
insert into public.booking_number_counters (year, last_number)
select
  extract(year from (now() at time zone 'Africa/Johannesburg'))::int,
  coalesce(max(substring(reference from '^SAC-BK-\d{4}-(\d+)$')::int), 0)
from public.bookings
where reference ~ ('^SAC-BK-' || extract(year from (now() at time zone 'Africa/Johannesburg'))::text || '-\d+$')
on conflict (year) do nothing;
