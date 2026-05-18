-- Saved billing / contact profiles (checkout autofill, CRM, test accounts)
-- Run in Supabase SQL Editor before seed-test-customers.sql

create table if not exists public.customer_profiles (
  email           text primary key,
  first_name      text not null default '',
  last_name       text not null default '',
  phone           text,
  address_line1   text not null default '',
  address_line2   text,
  city            text not null default '',
  province        text not null default 'KZN',
  postal_code     text not null default '',
  is_test         boolean not null default false,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists customer_profiles_test_idx on public.customer_profiles (is_test)
  where is_test = true;

comment on table public.customer_profiles is
  'Billing profiles for checkout autofill and admin CRM; test rows seeded via seed-test-customers.sql';

alter table public.customer_profiles enable row level security;
-- Service role only (API routes use admin client)
