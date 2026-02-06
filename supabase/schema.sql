-- ============================================================
-- Healthy Corner — Database Schema
-- Run this ONCE in your Supabase SQL Editor
-- ============================================================

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  rating        NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count  INTEGER NOT NULL DEFAULT 0,
  short_description TEXT NOT NULL,
  long_description  TEXT NOT NULL,
  features      TEXT[] NOT NULL DEFAULT '{}',
  specs         JSONB NOT NULL DEFAULT '{}',
  stock_status  TEXT NOT NULL DEFAULT 'in-stock'
                CHECK (stock_status IN ('in-stock','low-stock','out-of-stock')),
  images        TEXT[] NOT NULL DEFAULT '{}',
  badge         TEXT CHECK (badge IN ('new','bestseller','sale')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Orders table
CREATE TABLE IF NOT EXISTS orders (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  customer_name TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  address       TEXT NOT NULL,
  city          TEXT NOT NULL DEFAULT 'Amman',
  country       TEXT NOT NULL DEFAULT 'Jordan',
  total_jod     NUMERIC(10,2) NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id      TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    TEXT NOT NULL,
  product_name  TEXT NOT NULL,
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  price_jod     NUMERIC(10,2) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read, only authenticated (admin) can modify
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders: anyone can INSERT (guest checkout), only authenticated can read/update
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Order Items: anyone can INSERT (with order), only authenticated can read
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);
