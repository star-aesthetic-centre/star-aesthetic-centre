-- rewards-schema.sql
-- Loyalty programme tables for Star Aesthetic Centre
-- Run in Supabase SQL editor

-- One account per patient
create table if not exists public.loyalty_accounts (
  id              uuid    primary key default gen_random_uuid(),
  email           text    unique not null,
  first_name      text    not null default '',
  last_name       text    not null default '',
  phone           text,
  balance_rands   integer not null default 0,
  total_earned    integer not null default 0,
  total_redeemed  integer not null default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Every earn / redeem / adjustment transaction
create table if not exists public.rewards_ledger (
  id              uuid    primary key default gen_random_uuid(),
  account_id      uuid    not null references public.loyalty_accounts(id) on delete cascade,
  type            text    not null check (type in ('earn', 'redeem', 'adjustment')),
  amount_rands    integer not null,   -- positive = earn, negative = redeem/deduct
  description     text    not null,
  reference_type  text,               -- 'treatment' | 'product' | 'manual' | 'redemption'
  reference_id    text,
  created_at      timestamptz default now(),
  created_by      text    default 'system'
);

-- RLS
alter table public.loyalty_accounts enable row level security;
alter table public.rewards_ledger    enable row level security;

-- Service role (admin server actions) — full access
create policy "service_role_loyalty_accounts" on public.loyalty_accounts
  for all to service_role using (true) with check (true);

create policy "service_role_rewards_ledger" on public.rewards_ledger
  for all to service_role using (true) with check (true);

-- Anon — public balance lookup by email (read-only)
create policy "anon_read_loyalty_accounts" on public.loyalty_accounts
  for select to anon using (true);

create policy "anon_read_rewards_ledger" on public.rewards_ledger
  for select to anon using (true);

-- Indexes
create index if not exists idx_loyalty_email      on public.loyalty_accounts(email);
create index if not exists idx_ledger_account     on public.rewards_ledger(account_id);
create index if not exists idx_ledger_created_at  on public.rewards_ledger(created_at desc);

-- Verify
select 'loyalty_accounts' as tbl, count(*) from public.loyalty_accounts
union all
select 'rewards_ledger',           count(*) from public.rewards_ledger;
