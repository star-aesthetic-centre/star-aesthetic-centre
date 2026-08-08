-- ─────────────────────────────────────────────────────────────────────────────
-- PayFast card payments for gift vouchers
-- Run once in the Supabase SQL editor. Safe to re-run (all statements guarded).
--
-- NOTE: gift_vouchers was created with `create table if not exists`, so
-- re-running gift-vouchers-schema.sql against an existing table changes
-- NOTHING — silently. That is how the batch columns went missing for three
-- months (found 8 Aug 2026). Verify with the per-column probe, not by
-- re-running the schema file.
-- ─────────────────────────────────────────────────────────────────────────────

-- How the voucher was paid for. Every existing voucher was manual EFT.
alter table public.gift_vouchers
  add column if not exists payment_method text not null default 'bank_transfer';

alter table public.gift_vouchers
  drop constraint if exists gift_vouchers_payment_method_check;
alter table public.gift_vouchers
  add constraint gift_vouchers_payment_method_check
    check (payment_method in ('bank_transfer', 'payfast'));

-- PayFast's own transaction id and the raw payment_status it reported, so a
-- support query can be answered without re-reading the PayFast dashboard.
alter table public.gift_vouchers add column if not exists pf_payment_id         text;
alter table public.gift_vouchers add column if not exists payment_status_detail text;

-- When money actually landed. Distinct from activated_at: a payment can be
-- confirmed a moment before the voucher email goes out.
alter table public.gift_vouchers add column if not exists paid_at timestamptz;

-- A failed or cancelled card payment must be recordable. Without 'failed' the
-- voucher would sit in pending_payment forever, indistinguishable from an EFT
-- order that simply has not been paid yet.
alter table public.gift_vouchers
  drop constraint if exists gift_vouchers_status_check;
alter table public.gift_vouchers
  add constraint gift_vouchers_status_check
    check (status in ('pending_payment', 'active', 'partially_redeemed',
                      'redeemed', 'expired', 'cancelled', 'failed'));

create index if not exists idx_vouchers_pf_payment_id on public.gift_vouchers (pf_payment_id);
