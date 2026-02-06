-- ============================================================
-- Migration: Add payment_method and location_url to orders
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Add payment_method column (cliq or cod, default cod)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'cod'
  CHECK (payment_method IN ('cliq', 'cod'));

-- Add location_url column (Google Maps link from geolocation)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS location_url TEXT;
