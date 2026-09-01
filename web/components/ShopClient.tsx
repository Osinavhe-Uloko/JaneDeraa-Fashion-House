'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
const FABRIC_KEYWORDS = ['Wool', 'Cashmere', 'Silk', 'Linen', 'Cotton'];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const gender = searchParams.get('gender') || '';
  const q = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState('');
  const [tier, setTier] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
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

  const categoryOptions = useMemo(() => Array.from(new Set(categories.map((c) => c.name))), [categories]);

  const availableColors = useMemo(() => {
    const byName = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => byName.set(c.name, c.hex)));
    return Array.from(byName.entries());
  }, [products]);

  const availableFabrics = useMemo(
    () => FABRIC_KEYWORDS.filter((f) => products.some((p) => p.fabric?.toLowerCase().includes(f.toLowerCase()))),
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryName) list = list.filter((p) => p.category?.name === categoryName);
    if (tier) list = list.filter((p) => p.tier === tier);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (fabrics.length) list = list.filter((p) => fabrics.some((f) => p.fabric?.toLowerCase().includes(f.toLowerCase())));

    if (sort === 'price-asc') list.sort((a, b) => a.price_cents - b.price_cents);
    else if (sort === 'price-desc') list.sort((a, b) => b.price_cents - a.price_cents);
    else list.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return list;
  }, [products, categoryName, tier, sizes, colors, fabrics, sort]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterLabels = [
    categoryName,
    tier && TIERS.find((t) => t.value === tier)?.label,
    ...sizes,
    ...colors,
    ...fabrics,
  ].filter(Boolean) as string[];

  function toggleSize(s: string) {
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    setVisibleCount(9);
  }

  function toggleColor(c: string) {
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
    setVisibleCount(9);
  }

  function toggleFabric(f: string) {
    setFabrics((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
    setVisibleCount(9);
  }

  function clearFilters() {
    setCategoryName('');
    setTier('');
    setSizes([]);
    setColors([]);
    setFabrics([]);
    setVisibleCount(9);
  }

  function browseCategoryFromSearch(name: string) {
    router.replace('/shop');
    setCategoryName(name);
    setVisibleCount(9);
  }

  const genderLabel = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'All';
  const heading = q ? `Results for “${q}”` : categoryName || genderLabel;

  return (
    <div className="flex flex-col">
      <div className="container-px pt-10 pb-0">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: genderLabel }]} />
      </div>
      <div className="container-px pt-6 pb-10 border-b border-divider flex flex-col gap-3">
        <h1 className="font-display text-display-mobile md:text-display-desktop">{heading}</h1>
        {!q && (
          <p className="text-base md:text-lg font-light text-ink-700 max-w-xl">
            {categories.find((c) => c.name === categoryName)?.description ||
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
            {categoryOptions.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setCategoryName((prev) => (prev === name ? '' : name));
                  setVisibleCount(9);
                }}
                className={`text-left text-sm hover:text-gold-700 transition-colors ${categoryName === name ? 'text-gold-700' : 'text-ink-700'}`}
              >
                {name}
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

          {availableColors.length > 0 && (
            <div className="flex flex-col gap-3.5 border-t border-divider pt-5">
              <div className="text-[11px] uppercase tracking-label text-ink-600">Colour</div>
              <div className="flex flex-wrap gap-3">
                {availableColors.map(([name, hex]) => (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    aria-label={name}
                    onClick={() => toggleColor(name)}
                    className={`h-7 w-7 rounded-full border transition-colors ${
                      colors.includes(name) ? 'border-gold ring-1 ring-gold' : 'border-divider hover:border-ink-400'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {availableFabrics.length > 0 && (
            <div className="flex flex-col gap-3.5 border-t border-divider pt-5">
              <div className="text-[11px] uppercase tracking-label text-ink-600">Fabric</div>
              {availableFabrics.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFabric(f)}
                  className={`text-left text-sm hover:text-gold-700 transition-colors ${fabrics.includes(f) ? 'text-gold-700' : 'text-ink-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
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
          ) : visible.length === 0 && q ? (
            <div className="flex flex-col items-center gap-6 py-24 md:py-32 text-center">
              <div className="font-display text-2xl md:text-4xl">Nothing matched that</div>
              <p className="text-base font-light text-ink-700 max-w-md">
                Try a shorter term, or browse a category below. Our team can also find a piece for you.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {categoryOptions.slice(0, 5).map((name) => (
                  <button
                    key={name}
                    onClick={() => browseCategoryFromSearch(name)}
                    className="border border-divider hover:border-gold hover:text-gold-700 transition-colors px-5 py-2.5 text-[11px] uppercase tracking-label text-ink-700"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
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
