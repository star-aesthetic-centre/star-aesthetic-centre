-- ─────────────────────────────────────────────────────────────────────────────
-- PayFast card payments + self-collection
-- Run once in the Supabase SQL editor. Safe to re-run (all statements guarded).
-- ─────────────────────────────────────────────────────────────────────────────

-- How the customer is paying. Existing orders are all manual EFT.
alter table public.orders
  add column if not exists payment_method text not null default 'bank_transfer';

alter table public.orders
  drop constraint if exists orders_payment_method_check;
alter table public.orders
  add constraint orders_payment_method_check
    check (payment_method in ('bank_transfer', 'payfast'));

-- How the customer receives the order. Existing orders were all couriered.
alter table public.orders
  add column if not exists delivery_method text not null default 'delivery';

alter table public.orders
  drop constraint if exists orders_delivery_method_check;
alter table public.orders
  add constraint orders_delivery_method_check
    check (delivery_method in ('delivery', 'collection'));

-- PayFast's own transaction id, and the raw payment_status it reported.
-- Keeping the raw value means a support query can be answered without
-- re-reading the PayFast dashboard.
alter table public.orders add column if not exists pf_payment_id         text;
alter table public.orders add column if not exists payment_status_detail text;

-- Announce-once guard. The send slot is claimed atomically before dispatch, so
-- PayFast's ITN retries cannot produce a second email. Per-outcome, so an order
-- that first failed and is later paid still gets its confirmation.
alter table public.orders add column if not exists payment_result_email_sent_at timestamptz;
alter table public.orders add column if not exists payment_result_email_outcome text;

-- A declined card must be recordable. The original constraint had no 'failed'.
alter table public.orders
  drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
    check (status in ('pending', 'paid', 'failed', 'processing', 'shipped',
                      'delivered', 'cancelled', 'refunded'));

create index if not exists orders_pf_payment_id_idx on public.orders (pf_payment_id);
