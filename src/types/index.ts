export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longDescription: string;
  features: string[];
  specs: Record<string, string>;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  images: string[];
  badge?: 'new' | 'bestseller' | 'sale';
}

export type Category = 
  | 'blood-pressure'
  | 'oxygen'
  | 'diabetes-care'
  | 'temperature'
  | 'respiratory'
  | 'smart-health';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  categories: Category[];
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}
