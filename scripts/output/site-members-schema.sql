-- Site members — public signup (member portal login/dashboard comes later)
-- Run in Supabase SQL Editor after leads table exists

create table if not exists public.site_members (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  first_name    text not null,
  last_name     text not null,
  phone         text not null,
  interest      text,
  comment       text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists site_members_email_idx on public.site_members (lower(email));
create index if not exists site_members_created_at_idx on public.site_members (created_at desc);

comment on table public.site_members is
  'Patient/member signups from /member/signup; future portal for orders and Star Light Rewards';

alter table public.site_members enable row level security;

-- Optional: allow member_signup as a leads.source (run if you use CRM leads for signups)
-- alter table public.leads drop constraint if exists leads_source_check;
-- alter table public.leads add constraint leads_source_check
--   check (source in ('import', 'contact', 'skin_assessment', 'booking', 'niki', 'shop', 'other', 'member_signup'));
