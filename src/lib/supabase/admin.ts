import { createServerSupabaseClient } from './server';
import type { OrderStatus } from './types';

// ---------------------------------------------------------------------------
// Admin: Orders
// ---------------------------------------------------------------------------

interface OrderWithItems {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  country: string;
  total_jod: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items: {
    id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price_jod: number;
  }[];
}

export async function getOrders(status?: OrderStatus): Promise<OrderWithItems[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from('orders')
    .select('*, order_items(id, product_id, product_name, quantity, price_jod)')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as OrderWithItems[];
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
