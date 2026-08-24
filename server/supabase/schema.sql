-- JaneDeraa — Supabase Postgres schema
-- Run this in the Supabase SQL editor (or `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  gender text not null check (gender in ('women', 'men', 'unisex')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_id uuid references categories(id) on delete set null,
  gender text not null check (gender in ('women', 'men', 'unisex')),
  tier text not null check (tier in ('ready-to-wear', 'custom', 'bespoke')),
  price_cents integer not null,
  currency text not null default 'USD',
  short_description text,
  description text,
  fabric text,
  care text,
  sizes text[] not null default '{}',
  colors jsonb not null default '[]',
  tags text[] not null default '{}',
  images text[] not null default '{}',
  is_featured boolean not null default false,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_gender_idx on products(gender);
create index if not exists products_tier_idx on products(tier);

-- ---------------------------------------------------------------------------
-- collections (editorial / lookbook groupings)
-- ---------------------------------------------------------------------------
create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  season text,
  hero_image text,
  created_at timestamptz not null default now()
);

create table if not exists collection_products (
  collection_id uuid not null references collections(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  primary key (collection_id, product_id)
);

-- ---------------------------------------------------------------------------
-- orders (checkout is UI-only / mock — no real payment gateway)
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  email text not null,
  shipping_address jsonb not null,
  delivery_method text not null,
  items jsonb not null,
  subtotal_cents integer not null,
  shipping_cents integer not null default 0,
  total_cents integer not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'in_production', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- inquiries (Custom-Made + Bespoke consultation requests)
-- ---------------------------------------------------------------------------
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('custom', 'bespoke')),
  full_name text not null,
  email text not null,
  phone text,
  city text,
  garment_type text,
  occasion text,
  fabric_preference text,
  notes text,
  appointment_preference text,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- stores / showrooms
-- ---------------------------------------------------------------------------
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  hours text,
  phone text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- journal articles
-- ---------------------------------------------------------------------------
create table if not exists journal_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  dek text,
  body text,
  category text not null check (category in ('Craft', 'Style', 'Care')),
  cover_image text,
  published_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- newsletter subscribers
-- ---------------------------------------------------------------------------
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The Express API talks to Supabase with the service role key, which bypasses
-- RLS entirely — these policies only matter if the Next.js app ever queries
-- these tables directly with the anon key (it currently doesn't; it goes
-- through the Express API for everything except auth).
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table products enable row level security;
alter table collections enable row level security;
alter table collection_products enable row level security;
alter table stores enable row level security;
alter table journal_articles enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read collections" on collections for select using (true);
create policy "Public read collection_products" on collection_products for select using (true);
create policy "Public read stores" on stores for select using (true);
create policy "Public read journal_articles" on journal_articles for select using (true);

-- orders, inquiries and newsletter_subscribers stay RLS-enabled with NO public
-- policies — they are only ever written/read via the Express API using the
-- service role key.
alter table orders enable row level security;
alter table inquiries enable row level security;
alter table newsletter_subscribers enable row level security;
