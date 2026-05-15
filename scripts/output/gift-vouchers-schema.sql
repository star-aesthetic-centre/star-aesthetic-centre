-- gift-vouchers-schema.sql
-- Gift voucher system for Star Aesthetic Centre
-- Run in Supabase SQL editor

create table if not exists public.gift_vouchers (
  id                uuid    primary key default gen_random_uuid(),
  code              text    unique not null,                -- SAC-XXXX-XXXX-XXXX
  order_reference   text    unique not null,               -- SAC-GV-XXXXXX (shown to purchaser for EFT)
  denomination_rands integer not null check (denomination_rands in (250, 500, 750, 1000)),
  balance_rands     integer not null,                      -- remaining balance (starts = denomination)
  status            text    not null default 'pending_payment'
                    check (status in ('pending_payment', 'active', 'partially_redeemed', 'redeemed', 'expired', 'cancelled')),
  -- Purchaser
  purchaser_name    text    not null,
  purchaser_surname text,
  purchaser_phone   text,
  purchaser_email   text    not null,
  payment_reference text,                               -- shared EFT ref for batch orders
  batch_index       integer default 1,
  batch_quantity    integer default 1,
  -- Recipient
  recipient_name    text    not null,
  recipient_email   text    not null,
  message           text,
  theme             text    not null default 'general'
                    check (theme in ('general', 'birthday', 'mothers_day', 'anniversary', 'christmas')),
  -- Lifecycle
  expires_at        timestamptz,                           -- set on activation (3 years)
  activated_at      timestamptz,
  created_at        timestamptz default now()
);

-- Every full or partial redemption
create table if not exists public.voucher_redemptions (
  id              uuid    primary key default gen_random_uuid(),
  voucher_id      uuid    not null references public.gift_vouchers(id) on delete cascade,
  amount_rands    integer not null,
  order_reference text,
  redeemed_at     timestamptz default now()
);

-- RLS
alter table public.gift_vouchers       enable row level security;
alter table public.voucher_redemptions enable row level security;

create policy "service_role_gift_vouchers" on public.gift_vouchers
  for all to service_role using (true) with check (true);

create policy "service_role_voucher_redemptions" on public.voucher_redemptions
  for all to service_role using (true) with check (true);

-- Anon can validate a code (read only — needed at checkout)
create policy "anon_validate_voucher" on public.gift_vouchers
  for select to anon using (true);

-- Indexes
create index if not exists idx_vouchers_code      on public.gift_vouchers(code);
create index if not exists idx_vouchers_ref       on public.gift_vouchers(order_reference);
create index if not exists idx_vouchers_status    on public.gift_vouchers(status);
create index if not exists idx_redemptions_voucher on public.voucher_redemptions(voucher_id);

-- Verify
select 'gift_vouchers' as tbl, count(*) from public.gift_vouchers
union all
select 'voucher_redemptions', count(*) from public.voucher_redemptions;
