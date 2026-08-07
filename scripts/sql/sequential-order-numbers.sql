-- ─────────────────────────────────────────────────────────────────────────────
-- Human-friendly sequential order numbers: SAC-2026-001, SAC-2026-002, …
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- The counter lives in the database, not the app, because two customers can
-- check out in the same instant. Anything based on "count the orders and add
-- one" hands both of them the same number, and orders.reference is unique — so
-- one of those checkouts fails in front of a paying customer.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.order_number_counters (
  year        int primary key,
  last_number int not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.order_number_counters enable row level security;
-- No policies: reachable only via the service role and the function below.

/**
 * Claim the next order number for the current year and return the formatted
 * reference. The INSERT … ON CONFLICT DO UPDATE … RETURNING is a single
 * atomic statement: concurrent callers queue on the row lock and each gets a
 * distinct number.
 *
 * Numbering restarts at 001 each January, in South African local time.
 */
create or replace function public.next_order_reference()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  y int := extract(year from (now() at time zone 'Africa/Johannesburg'))::int;
  n int;
begin
  insert into public.order_number_counters as c (year, last_number)
       values (y, 1)
  on conflict (year)
    do update set last_number = c.last_number + 1,
                  updated_at  = now()
    returning c.last_number into n;

  -- lpad pads but never truncates, so order 1000 becomes SAC-2026-1000.
  return 'SAC-' || y::text || '-' || lpad(n::text, 3, '0');
end;
$$;

revoke all on function public.next_order_reference() from public, anon, authenticated;
grant execute on function public.next_order_reference() to service_role;

-- ── Continue from any orders already placed this year ────────────────────────
-- Without this the first new order would be SAC-2026-001 even if SAC-2026-001
-- already exists, and the unique index on reference would reject it.
insert into public.order_number_counters (year, last_number)
select
  extract(year from (now() at time zone 'Africa/Johannesburg'))::int,
  coalesce(max(substring(reference from '^SAC-\d{4}-(\d+)$')::int), 0)
from public.orders
where reference ~ ('^SAC-' || extract(year from (now() at time zone 'Africa/Johannesburg'))::text || '-\d+$')
on conflict (year) do nothing;
