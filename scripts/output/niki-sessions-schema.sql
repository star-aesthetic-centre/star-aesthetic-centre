-- Niki voice session transcripts (saved from /api/niki-session)

create table if not exists public.niki_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  treatment_page text,
  transcript text,
  contact_name text,
  contact_phone text,
  contact_email text,
  duration_seconds integer default 0,
  started_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists niki_sessions_started_at_idx on public.niki_sessions (started_at desc);

comment on table public.niki_sessions is 'Niki AI voice chat transcripts from the public site';

alter table public.niki_sessions enable row level security;

-- Inserts from public API use anon key; reads use service role in admin
