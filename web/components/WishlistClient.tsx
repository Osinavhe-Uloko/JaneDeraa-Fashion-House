'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/format';
import Button from './Button';

export default function WishlistClient() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const [addingSlug, setAddingSlug] = useState('');
  const [addedSlug, setAddedSlug] = useState('');

  async function handleAddToBag(slug: string, image: string) {
    setAddingSlug(slug);
    try {
      const { data: product } = await api.getProduct(slug);
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0] || image,
        size: product.sizes[0] || '',
        color: product.colors[0]?.name || '',
        priceCents: product.price_cents,
      });
      setAddedSlug(slug);
      setTimeout(() => setAddedSlug(''), 2000);
    } catch {
      // ignore — product may no longer exist
    } finally {
      setAddingSlug('');
    }
  }

  return (
    <div className="flex flex-col">
      <div className="container-px pt-14 pb-8 flex items-baseline justify-between border-b border-divider">
        <h1 className="font-display text-display-mobile md:text-display-desktop">Wishlist</h1>
        <span className="text-[11px] uppercase tracking-label text-ink-600 tabular-nums">{items.length} saved</span>
      </div>

      {items.length === 0 ? (
        <div className="container-px py-24 md:py-32 flex flex-col items-center gap-6 text-center">
          <div className="font-display text-2xl md:text-4xl">Your wishlist is empty</div>
          <p className="text-base font-light text-ink-700 max-w-md">
            Save pieces as you browse. They stay here on this device until you remove them.
          </p>
          <Button href="/shop" className="mt-2">
            Browse the shop
          </Button>
        </div>
      ) : (
        <div className="container-px py-10 pb-24 md:pb-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((w) => (
            <div key={w.slug} className="flex flex-col gap-3.5">
              <div className="relative aspect-[4/5] border border-divider bg-ink-200">
                <Link href={`/product/${w.slug}`}>
                  {w.image && <Image src={w.image} alt={w.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />}
                </Link>
                <button
                  type="button"
                  aria-label="Remove from wishlist"
                  onClick={() => remove(w.slug)}
                  className="absolute top-2.5 right-2.5 h-7 w-7 border border-divider bg-bg flex items-center justify-center text-sm text-ink-700 hover:border-gold hover:text-gold-700"
                >
                  &times;
                </button>
              </div>
              <Link href={`/product/${w.slug}`} className="font-display text-lg">
                {w.name}
              </Link>
              <div className="text-sm text-ink-700">{formatPrice(w.priceCents)}</div>
              <button
                type="button"
                onClick={() => handleAddToBag(w.slug, w.image)}
                disabled={addingSlug === w.slug}
                className="border border-divider hover:border-gold hover:text-gold-700 transition-colors py-3 text-[11px] uppercase tracking-label text-center disabled:opacity-60"
              >
                {addedSlug === w.slug ? 'Added' : addingSlug === w.slug ? 'Adding…' : 'Add to Bag'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
