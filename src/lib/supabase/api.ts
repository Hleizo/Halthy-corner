import { createClient } from './client';
import type { Product } from '@/types';
import type { Database, OrderStatus } from './types';

type DbProduct = Database['public']['Tables']['products']['Row'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a Supabase product row → the app's Product type */
function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Product['category'],
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    rating: row.rating,
    reviewCount: row.review_count,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    features: row.features,
    specs: row.specs,
    stockStatus: row.stock_status,
    images: row.images,
    badge: row.badge ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Products (public — uses anon key, no auth needed)
// ---------------------------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;   // not found
    throw error;
  }
  return data ? toProduct(data) : null;
}

// ---------------------------------------------------------------------------
// Orders (public INSERT — anon key, RLS allows insert only)
// ---------------------------------------------------------------------------

interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  country?: string;
  total_jod: number;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price_jod: number;
  }[];
}

export async function createOrder(payload: CreateOrderPayload) {
  const supabase = createClient();

  // 1. Insert the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: payload.customer_name,
      phone: payload.phone,
      email: payload.email ?? null,
      address: payload.address,
      city: payload.city ?? 'Amman',
      country: payload.country ?? 'Jordan',
      total_jod: payload.total_jod,
      status: 'pending' as OrderStatus,
    })
    .select()
    .single();

  if (orderError) throw new Error(`Order failed: ${orderError.message}`);

  // 2. Insert order items
  const orderItems = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    price_jod: item.price_jod,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw new Error(`Order items failed: ${itemsError.message}`);

  return order;
}
