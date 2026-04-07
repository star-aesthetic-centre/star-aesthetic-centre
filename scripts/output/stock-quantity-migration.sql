-- stock-quantity-migration.sql
-- Add stock tracking columns to products table
-- Run once in Supabase SQL editor

alter table public.products
  add column if not exists stock_quantity integer default null;

comment on column public.products.stock_quantity is
  'Units in stock. NULL = stock not tracked (always shows as available).';
