-- ══════════════════════════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Product Catalogue & Orders Schema
-- Phase 3: WordPress/WooCommerce → Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PRODUCT CATEGORIES (brands)
--    One row per brand: Dermaceutic, Heliocare, ISDIN, Mesoestetic, etc.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.product_categories (
  id           uuid         default gen_random_uuid() primary key,
  name         text         not null,                     -- "Dermaceutic"
  slug         text         not null unique,              -- "dermaceutic"
  created_at   timestamptz  default now() not null
);

create index product_categories_slug_idx on public.product_categories (slug);

alter table public.product_categories enable row level security;

-- Public: anyone can read categories (needed for shop nav, brand pages)
create policy "Public read categories"
  on public.product_categories for select
  using (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. PRODUCTS
--    Prices stored in South African cents (integer) — avoids floating-point
--    issues. R 395.00 = 39500 cents.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.products (
  id                   uuid         default gen_random_uuid() primary key,
  name                 text         not null,
  slug                 text         not null unique,              -- URL-safe, e.g. "c-quence-serum-4"
  sku                  text,                                      -- optional product code
  brand_slug           text         not null                      -- FK reference to product_categories.slug
                         references public.product_categories(slug) on update cascade,
  short_description    text,                                      -- one-liner shown on product card
  description          text,                                      -- full HTML/rich text (product detail page)
  price_cents          int          not null check (price_cents >= 0),   -- current selling price
  regular_price_cents  int                   check (regular_price_cents >= 0),  -- null = no sale, otherwise original price
  is_active            boolean      not null default true,        -- false = hidden from shop
  created_at           timestamptz  default now() not null,
  updated_at           timestamptz  default now() not null
);

create index products_brand_slug_idx  on public.products (brand_slug);
create index products_slug_idx        on public.products (slug);
create index products_active_idx      on public.products (is_active);

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

alter table public.products enable row level security;

-- Public: anyone can read active products
create policy "Public read active products"
  on public.products for select
  using (is_active = true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. PRODUCT IMAGES
--    sort_order = 0 is the primary (featured) image.
--    Subsequent rows are gallery images shown as thumbnails.
--    URLs will point to Supabase Storage once images are migrated.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.product_images (
  id           uuid         default gen_random_uuid() primary key,
  product_id   uuid         not null references public.products(id) on delete cascade,
  url          text         not null,              -- Supabase Storage URL or external URL
  alt_text     text         not null default '',
  sort_order   int          not null default 0,    -- 0 = primary image
  created_at   timestamptz  default now() not null
);

create index product_images_product_id_idx on public.product_images (product_id, sort_order);

alter table public.product_images enable row level security;

-- Public: anyone can read product images
create policy "Public read product images"
  on public.product_images for select
  using (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. PRODUCT STOCK
--    One row per product. quantity = NULL means unlimited/untracked.
--    Nakita manages this via /admin/products.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.product_stock (
  id           uuid         default gen_random_uuid() primary key,
  product_id   uuid         not null unique references public.products(id) on delete cascade,
  status       text         not null default 'IN_STOCK'
                 check (status in ('IN_STOCK', 'OUT_OF_STOCK', 'ON_BACKORDER')),
  quantity     int          check (quantity >= 0),   -- NULL = untracked / unlimited
  updated_at   timestamptz  default now() not null
);

create trigger product_stock_updated_at
  before update on public.product_stock
  for each row execute procedure public.set_updated_at();

alter table public.product_stock enable row level security;

-- Public: anyone can read stock status (needed for "out of stock" badge)
create policy "Public read stock"
  on public.product_stock for select
  using (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. ORDERS
--    Created by the Next.js API route after Stripe payment confirms.
--    shipping_address stored as JSONB: { line1, city, province, postal_code }
--    All monetary values in cents.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.orders (
  id                        uuid         default gen_random_uuid() primary key,
  reference                 text         not null unique,   -- e.g. SAC-ORD-20260323-A1B2
  customer_name             text         not null,
  customer_email            text         not null,
  customer_phone            text,
  shipping_address          jsonb,                          -- { line1, city, province, postal_code }
  subtotal_cents            int          not null check (subtotal_cents >= 0),
  shipping_cents            int          not null default 0 check (shipping_cents >= 0),
  total_cents               int          not null check (total_cents >= 0),
  status                    text         not null default 'pending'
                              check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  stripe_payment_intent_id  text,                          -- populated once Stripe confirms payment
  notes                     text,
  created_at                timestamptz  default now() not null,
  updated_at                timestamptz  default now() not null
);

create index orders_customer_email_idx on public.orders (customer_email);
create index orders_status_idx         on public.orders (status);
create index orders_reference_idx      on public.orders (reference);

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

alter table public.orders enable row level security;

-- API routes use anon key to INSERT new orders
create policy "Allow insert orders via anon key"
  on public.orders for insert
  with check (true);

-- Customer can read their own order by email match (for order confirmation page)
create policy "Customer read own orders"
  on public.orders for select
  using (true);  -- tighten once auth is in place: using (customer_email = auth.jwt()->>'email')


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. ORDER ITEMS
--    Line items per order. Prices are snapshotted at time of purchase —
--    product price changes never alter historical orders.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.order_items (
  id                uuid         default gen_random_uuid() primary key,
  order_id          uuid         not null references public.orders(id) on delete cascade,
  product_id        uuid         not null references public.products(id),
  product_name      text         not null,    -- snapshot: name at time of purchase
  product_sku       text,                     -- snapshot: SKU at time of purchase
  unit_price_cents  int          not null check (unit_price_cents >= 0),  -- snapshot
  quantity          int          not null default 1 check (quantity > 0),
  line_total_cents  int          not null check (line_total_cents >= 0),  -- unit_price_cents × quantity
  created_at        timestamptz  default now() not null
);

create index order_items_order_id_idx   on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

alter table public.order_items enable row level security;

-- API routes use anon key to INSERT order items
create policy "Allow insert order_items via anon key"
  on public.order_items for insert
  with check (true);

-- Items are readable alongside their order
create policy "Allow read order_items"
  on public.order_items for select
  using (true);


-- ══════════════════════════════════════════════════════════════════════════════
-- SEED: Product categories (brands)
-- Run after tables are created to pre-populate brands.
-- ══════════════════════════════════════════════════════════════════════════════

insert into public.product_categories (name, slug) values
  ('Dermaceutic',    'dermaceutic'),
  ('Heliocare',      'heliocare'),
  ('ISDIN',          'isdin'),
  ('Mesoestetic',    'mesoestetic'),
  ('NeoStrata',      'neostrata'),
  ('SkinCeuticals',  'skinceuticals');


-- ══════════════════════════════════════════════════════════════════════════════
-- VERIFY: Run these after creating the tables to confirm structure
-- ══════════════════════════════════════════════════════════════════════════════
-- select * from public.product_categories;
-- select count(*) from public.products;
-- select count(*) from public.product_images;
-- select count(*) from public.product_stock;
-- select count(*) from public.orders;
-- select count(*) from public.order_items;
-- ══════════════════════════════════════════════════════════════════════════════
