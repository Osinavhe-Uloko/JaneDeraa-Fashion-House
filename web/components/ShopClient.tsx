'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { Category, Product } from '@/lib/types';
import ProductCard from './ProductCard';
import Breadcrumb from './Breadcrumb';

const SORT_OPTIONS: { label: string; value: 'newest' | 'price-asc' | 'price-desc' }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price, low to high', value: 'price-asc' },
  { label: 'Price, high to low', value: 'price-desc' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const TIERS = [
  { label: 'Ready-to-wear', value: 'ready-to-wear' },
  { label: 'Custom', value: 'custom' },
  { label: 'Bespoke', value: 'bespoke' },
];

export default function ShopClient() {
  const searchParams = useSearchParams();

  const gender = searchParams.get('gender') || '';
  const q = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [categorySlug, setCategorySlug] = useState('');
  const [tier, setTier] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getProducts({ gender: gender || undefined, q: q || undefined, pageSize: 48 }),
      api.getCategories(gender || undefined),
    ])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, [gender, q]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (categorySlug) list = list.filter((p) => p.category?.slug === categorySlug);
    if (tier) list = list.filter((p) => p.tier === tier);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));

    if (sort === 'price-asc') list.sort((a, b) => a.price_cents - b.price_cents);
    else if (sort === 'price-desc') list.sort((a, b) => b.price_cents - a.price_cents);
    else list.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return list;
  }, [products, categorySlug, tier, sizes, sort]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterLabels = [
    categorySlug && categories.find((c) => c.slug === categorySlug)?.name,
    tier && TIERS.find((t) => t.value === tier)?.label,
    ...sizes,
  ].filter(Boolean) as string[];

  function toggleSize(s: string) {
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    setVisibleCount(9);
  }

  function clearFilters() {
    setCategorySlug('');
    setTier('');
    setSizes([]);
    setVisibleCount(9);
  }

  const genderLabel = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'All';
  const heading = q ? `Results for “${q}”` : categorySlug ? categories.find((c) => c.slug === categorySlug)?.name : genderLabel;

  return (
    <div className="flex flex-col">
      <div className="container-px pt-10 pb-0">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: genderLabel }]} />
      </div>
      <div className="container-px pt-6 pb-10 border-b border-divider flex flex-col gap-3">
        <h1 className="font-display text-display-mobile md:text-display-desktop">{heading}</h1>
        {!q && (
          <p className="text-base md:text-lg font-light text-ink-700 max-w-xl">
            {categories.find((c) => c.slug === categorySlug)?.description ||
              'Ready-to-wear, custom and bespoke pieces, cut from cloth chosen to age well.'}
          </p>
        )}
      </div>

      <div className="container-px py-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-18">
        <aside className="flex flex-col gap-8 order-2 md:order-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] uppercase tracking-label">Filter</span>
            {activeFilterLabels.length > 0 && (
              <button type="button" onClick={clearFilters} className="text-[11px] uppercase tracking-label text-gold-700">
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3.5 border-t border-divider pt-5">
            <div className="text-[11px] uppercase tracking-label text-ink-600">Category</div>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setCategorySlug((prev) => (prev === c.slug ? '' : c.slug));
                  setVisibleCount(9);
                }}
                className={`text-left text-sm hover:text-gold-700 transition-colors ${categorySlug === c.slug ? 'text-gold-700' : 'text-ink-700'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3.5 border-t border-divider pt-5">
            <div className="text-[11px] uppercase tracking-label text-ink-600">Tier</div>
            {TIERS.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTier((prev) => (prev === t.value ? '' : t.value));
                  setVisibleCount(9);
                }}
                className={`text-left text-sm hover:text-gold-700 transition-colors ${tier === t.value ? 'text-gold-700' : 'text-ink-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3.5 border-t border-divider pt-5">
            <div className="text-[11px] uppercase tracking-label text-ink-600">Size</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`min-w-[42px] text-center py-2 text-xs border transition-colors ${
                    sizes.includes(s) ? 'border-gold text-gold-700' : 'border-divider text-ink-700 hover:border-ink-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-8 order-1 md:order-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-divider pb-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs uppercase tracking-label text-ink-600 tabular-nums">{filtered.length} pieces</span>
              {activeFilterLabels.map((label) => (
                <span key={label} className="text-[11px] uppercase tracking-label border border-gold-300 text-gold-700 px-2.5 py-1">
                  {label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <span className="text-[11px] uppercase tracking-label text-ink-600">Sort</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`text-[11px] uppercase tracking-label transition-colors ${sort === opt.value ? 'text-gold-700' : 'text-ink-700 hover:text-gold-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-sm text-ink-600 py-16 text-center">Loading…</div>
          ) : visible.length === 0 ? (
            <div className="text-sm text-ink-600 py-16 text-center">No pieces match those filters yet.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} quickAdd />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((v) => v + 9)}
              className="self-center border border-divider hover:border-gold hover:text-gold-700 transition-colors px-10 py-4 text-[11px] uppercase tracking-label"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
