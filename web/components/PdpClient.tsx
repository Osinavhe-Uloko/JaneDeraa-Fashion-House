'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import Tag from './Tag';
import Accordion from './Accordion';
import Button from './Button';
import ProductCard from './ProductCard';
import Breadcrumb from './Breadcrumb';

export default function PdpClient({
  product,
  related,
  crossSell,
}: {
  product: Product;
  related: Product[];
  crossSell: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)] || '');
  const [colorIndex, setColorIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { has, toggle } = useWishlist();

  const color = product.colors[colorIndex]?.name || '';
  const images = product.images.length ? product.images : ['https://picsum.photos/seed/jd-placeholder/900/1125'];

  function handleAddToBag() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: images[0],
      size,
      color,
      priceCents: product.price_cents,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const accordionItems = [
    { label: 'Details & fit', body: product.description || product.short_description || 'Cut close to the body, true to size.' },
    { label: 'Fabric & care', body: `${product.fabric || 'Fabric details on request.'} ${product.care ? '— ' + product.care : ''}` },
    {
      label: 'Delivery & returns',
      body: 'Standard delivery in 3–5 working days, complimentary. Returns accepted within 30 days in original condition.',
    },
  ];

  return (
    <div className="flex flex-col pb-24 md:pb-0">
      <div className="container-px pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: product.gender === 'women' ? 'Women' : product.gender === 'men' ? 'Men' : 'Custom & Bespoke', href: `/shop?gender=${product.gender}` },
            { label: product.category?.name || product.tier, href: product.category ? `/shop?category=${product.category.slug}` : undefined },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-px py-8 pb-16 md:pb-28 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-18 items-start">
        <div className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-3 md:gap-5">
          <div className="hidden md:flex flex-col gap-3 order-2 md:order-1">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-[4/5] border overflow-hidden ${i === activeImage ? 'border-gold' : 'border-divider'}`}
              >
                <Image src={img} alt="" fill sizes="88px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] border border-divider overflow-hidden order-1 md:order-2">
            <Image src={images[activeImage]} alt={product.name} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" priority />
          </div>
          <div className="flex md:hidden gap-2">
            {images.map((img, i) => (
              <button key={img + i} onClick={() => setActiveImage(i)} className={`relative w-11 h-14 border overflow-hidden ${i === activeImage ? 'border-gold' : 'border-divider'}`}>
                <Image src={img} alt="" fill sizes="44px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            {product.tags[0] && <Tag>{product.tags[0]}</Tag>}
            <h1 className="font-display text-display-mobile md:text-[44px] leading-tight">{product.name}</h1>
            <div className="text-lg text-ink-700">{formatPrice(product.price_cents, product.currency)}</div>
          </div>

          <p className="text-base leading-relaxed text-ink-700 font-light">{product.short_description}</p>

          {product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="text-[11px] uppercase tracking-label text-ink-600">Colour — {color}</div>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIndex(i)}
                    aria-label={c.name}
                    className={`h-7 w-7 rounded-full border block ${i === colorIndex ? 'ring-2 ring-offset-2 ring-gold' : 'border-divider'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-label text-ink-600">Size</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[52px] text-center py-3 px-3 border text-xs tracking-wide transition-colors ${
                      s === size ? 'border-gold text-gold-700' : 'border-divider text-ink-700 hover:border-ink-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="hidden md:flex flex-col gap-3 mt-2">
            <Button onClick={handleAddToBag} disabled={!product.in_stock}>
              {added ? 'Added to Bag' : product.in_stock ? 'Add to Bag' : 'Out of Stock'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => toggle({ slug: product.slug, name: product.name, image: images[0], priceCents: product.price_cents })}
            >
              {has(product.slug) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>

          <div className="mt-2">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {crossSell.length > 0 && (
        <section className="bg-surface container-px py-16 md:py-24 flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-[38px] border-b border-divider pb-4">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {crossSell.map((p) => (
              <ProductCard key={p.id} product={p} aspect="1/1" />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-px py-16 md:py-24 flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-[38px] border-b border-divider pb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="md:hidden fixed bottom-0 inset-x-0 bg-bg border-t border-divider px-5 py-3 flex items-center gap-3 z-20">
        <span className="text-sm text-ink-700">{formatPrice(product.price_cents, product.currency)}</span>
        <Button onClick={handleAddToBag} fullWidth disabled={!product.in_stock}>
          {added ? 'Added' : 'Add to Bag'}
        </Button>
      </div>
    </div>
  );
}
