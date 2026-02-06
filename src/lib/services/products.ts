import type { Product } from '@/types';
import { products as mockProducts } from '@/data';

/**
 * Fetch products from Supabase.
 * Falls back to the local mock data when:
 *   - Supabase env vars are not configured yet
 *   - The database is empty or unavailable
 */
export async function getProducts(): Promise<Product[]> {
  // If Supabase isn't configured, use mock data
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return mockProducts;
  }

  try {
    const { getAllProducts } = await import('@/lib/supabase/api');
    const products = await getAllProducts();
    return products.length > 0 ? products : mockProducts;
  } catch (error) {
    console.warn('Supabase fetch failed, using mock data:', error);
    return mockProducts;
  }
}
