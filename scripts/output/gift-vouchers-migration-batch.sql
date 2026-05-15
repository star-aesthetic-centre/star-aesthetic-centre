-- Run in Supabase SQL editor (extends gift_vouchers for batch + purchaser fields)

alter table public.gift_vouchers
  add column if not exists purchaser_surname text,
  add column if not exists purchaser_phone   text,
  add column if not exists payment_reference text,
  add column if not exists batch_index       integer default 1,
  add column if not exists batch_quantity    integer default 1;

-- Backfill payment_reference from order_reference for existing rows
update public.gift_vouchers
set payment_reference = order_reference
where payment_reference is null;

create index if not exists idx_vouchers_payment_ref on public.gift_vouchers(payment_reference);
