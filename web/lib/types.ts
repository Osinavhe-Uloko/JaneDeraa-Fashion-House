export type Gender = 'women' | 'men' | 'unisex';
export type Tier = 'ready-to-wear' | 'custom' | 'bespoke';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  gender: Gender;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_id: string | null;
  category?: Pick<Category, 'id' | 'slug' | 'name'> | null;
  gender: Gender;
  tier: Tier;
  price_cents: number;
  currency: string;
  short_description: string | null;
  description: string | null;
  fabric: string | null;
  care: string | null;
  sizes: string[];
  colors: ProductColor[];
  tags: string[];
  images: string[];
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  season: string | null;
  hero_image: string | null;
  products?: Product[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  body: string | null;
  category: 'Craft' | 'Style' | 'Care';
  cover_image: string | null;
  published_at: string;
}

export interface CartLineItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  priceCents: number;
  qty: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  shipping_address: Record<string, string>;
  delivery_method: string;
  items: CartLineItem[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: string;
  created_at: string;
}
