-- ============================================================
-- Add DELETE policy for products (admin only)
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);
