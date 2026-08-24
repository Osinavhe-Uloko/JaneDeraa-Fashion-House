'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import Tag from './Tag';
import { HeartIcon } from './icons';
import { useWishlist } from '@/lib/wishlist-context';

export default function ProductCard({
  product,
  aspect = '4/5',
  quickAdd = false,
}: {
  product: Product;
  aspect?: '4/5' | '1/1';
  quickAdd?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const [primary, secondary] = product.images;
  const wished = has(product.slug);

  return (
    <div className="group flex flex-col gap-3.5">
      <Link
        href={`/product/${product.slug}`}
        className={`relative block overflow-hidden border border-divider bg-ink-200 ${
          aspect === '1/1' ? 'aspect-square' : 'aspect-[4/5]'
        }`}
      >
        {secondary && (
          <Image
            src={secondary}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        )}
        {primary && (
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="absolute inset-0 object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
        )}
        {product.tags[0] && (
          <span className="absolute top-3 left-3 z-10">
            <Tag>{product.tags[0]}</Tag>
          </span>
        )}
        {quickAdd && (
          <span className="absolute bottom-3 right-3 z-10 border border-divider bg-bg px-3 py-1.5 text-[10px] uppercase tracking-label opacity-0 transition-opacity group-hover:opacity-100">
            Quick add
          </span>
        )}
      </Link>
      <div className="flex items-start justify-between gap-3">
        <Link href={`/product/${product.slug}`} className="flex flex-col gap-1">
          <div className="font-display text-lg">{product.name}</div>
          <div className="text-sm text-ink-700">{formatPrice(product.price_cents, product.currency)}</div>
        </Link>
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() =>
            toggle({ slug: product.slug, name: product.name, image: primary, priceCents: product.price_cents })
          }
          className="mt-1 text-ink-500 hover:text-gold-700 transition-colors"
        >
          <HeartIcon className="h-4 w-4" filled={wished} />
        </button>
      </div>
    </div>
  );
}
