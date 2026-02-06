export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: number;
          original_price: number | null;
          rating: number;
          review_count: number;
          short_description: string;
          long_description: string;
          features: string[];
          specs: Record<string, string>;
          stock_status: 'in-stock' | 'low-stock' | 'out-of-stock';
          images: string[];
          badge: 'new' | 'bestseller' | 'sale' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          price: number;
          original_price?: number | null;
          rating?: number;
          review_count?: number;
          short_description: string;
          long_description: string;
          features?: string[];
          specs?: Record<string, string>;
          stock_status?: 'in-stock' | 'low-stock' | 'out-of-stock';
          images?: string[];
          badge?: 'new' | 'bestseller' | 'sale' | null;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
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
        };
        Insert: {
          id?: string;
          customer_name: string;
          phone: string;
          email?: string | null;
          address: string;
          city?: string;
          country?: string;
          total_jod: number;
          status?: OrderStatus;
          notes?: string | null;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          price_jod: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          price_jod: number;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
    };
  };
}
