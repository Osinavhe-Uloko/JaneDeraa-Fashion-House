import type { Category, Collection, JournalArticle, Order, Product, Store } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: init?.cache ?? 'no-store',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed with ${res.status}`);
  }

  return res.json();
}

export interface ProductQuery {
  gender?: string;
  category?: string;
  tier?: string;
  tag?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc';
  featured?: boolean;
  q?: string;
  page?: number;
  pageSize?: number;
}

function toQueryString(params: Record<string, unknown> | ProductQuery) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export const api = {
  getProducts: (params: ProductQuery = {}) =>
    request<{ data: Product[]; count: number; page: number; pageSize: number }>(
      `/products${toQueryString(params)}`
    ),

  getProduct: (slug: string) => request<{ data: Product }>(`/products/${slug}`),

  getCategories: (gender?: string) =>
    request<{ data: Category[] }>(`/categories${toQueryString({ gender })}`),

  getCollections: () => request<{ data: Collection[] }>('/collections'),

  getCollection: (slug: string) => request<{ data: Collection }>(`/collections/${slug}`),

  getStores: () => request<{ data: Store[] }>('/stores'),

  getJournalArticles: (category?: string) =>
    request<{ data: JournalArticle[] }>(`/journal${toQueryString({ category })}`),

  getJournalArticle: (slug: string) => request<{ data: JournalArticle }>(`/journal/${slug}`),

  createOrder: (payload: unknown) =>
    request<{ data: Order }>('/orders', { method: 'POST', body: JSON.stringify(payload) }),

  getOrder: (orderNumber: string) => request<{ data: Order }>(`/orders/${orderNumber}`),

  getOrdersByEmail: (email: string) => request<{ data: Order[] }>(`/orders${toQueryString({ email })}`),

  createInquiry: (payload: unknown) =>
    request('/inquiries', { method: 'POST', body: JSON.stringify(payload) }),

  subscribeNewsletter: (email: string) =>
    request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),
};
