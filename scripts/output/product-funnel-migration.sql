-- Post-purchase upsell funnel config per product (max 2 steps)
-- Run in Supabase SQL editor

alter table public.products
  add column if not exists funnel_config jsonb;

comment on column public.products.funnel_config is
  'JSON: { enabled, steps: [{ title, description, productIds[], discountPercent }] }';
