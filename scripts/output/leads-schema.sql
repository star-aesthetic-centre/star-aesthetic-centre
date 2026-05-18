-- CRM Leads — inquiries from forms, assessments, imports, and auto-captured bookings
-- Customers are aggregated in admin from orders + bookings + loyalty (no separate customers table)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  first_name text,
  last_name text,
  source text not null default 'import'
    check (source in ('import', 'contact', 'skin_assessment', 'booking', 'niki', 'shop', 'other')),
  interest_type text not null default 'general'
    check (interest_type in ('treatment', 'product', 'general')),
  interest_value text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'booked', 'converted', 'archived')),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

comment on table public.leads is 'CRM leads — form enquiries, assessments, imports; customers unified in admin from shop/bookings/loyalty';

alter table public.leads enable row level security;
-- Service role only (admin + server actions). No public read.
