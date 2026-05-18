-- Star Aesthetic Centre — editable marketing pages (homepage, contact, Dr Bangalee)
-- Run in Supabase SQL editor

create table if not exists public.site_pages (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.site_pages is 'CMS content for marketing pages edited in /admin/pages';

-- Optional: seed rows (content falls back to code defaults when empty)
insert into public.site_pages (slug, content)
values
  ('home', '{}'::jsonb),
  ('contact', '{}'::jsonb),
  ('dr-rajeev-bangalee', '{}'::jsonb)
on conflict (slug) do nothing;

alter table public.site_pages enable row level security;

-- Public read (anon) for site rendering; writes use service role in admin actions
create policy "site_pages_public_read"
  on public.site_pages
  for select
  to anon, authenticated
  using (true);
