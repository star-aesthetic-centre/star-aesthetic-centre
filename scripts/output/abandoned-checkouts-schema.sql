-- Cart abandonment: checkout started but order not placed
-- WhatsApp reminders via /api/cron/cart-abandonment (Vercel cron)

create table if not exists public.abandoned_checkouts (
  id uuid primary key default gen_random_uuid(),
  recovery_token text not null unique default encode(gen_random_bytes(16), 'hex'),
  email text not null,
  phone text not null,
  first_name text,
  last_name text,
  cart_items jsonb not null default '[]'::jsonb,
  subtotal_cents integer not null default 0,
  status text not null default 'active' check (status in ('active', 'converted', 'expired')),
  whatsapp_sent_at timestamptz,
  email_sent_at timestamptz,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists abandoned_checkouts_email_idx on public.abandoned_checkouts (lower(email));
create index if not exists abandoned_checkouts_status_activity_idx
  on public.abandoned_checkouts (status, last_activity_at)
  where status = 'active';

comment on table public.abandoned_checkouts is 'Incomplete checkouts for cart-abandonment WhatsApp/email reminders';

alter table public.abandoned_checkouts enable row level security;

-- No public policies: service role only (admin API + cron)
