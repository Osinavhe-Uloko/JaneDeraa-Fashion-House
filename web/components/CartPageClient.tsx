'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import Button from './Button';
import QuantityStepper from './QuantityStepper';

export default function CartPageClient() {
  const { items, incItem, decItem, removeItem, subtotalCents } = useCart();
  const [promo, setPromo] = useState('');

  const shippingCents = subtotalCents > 0 ? 0 : 0;
  const total = subtotalCents + shippingCents;

  return (
    <div className="flex flex-col">
      <div className="container-px pt-14 pb-8 border-b border-divider flex items-baseline justify-between">
        <h1 className="font-display text-3xl md:text-[48px]">Shopping Bag</h1>
        <div className="text-xs uppercase tracking-label text-ink-600 tabular-nums">{items.length} items</div>
      </div>

      {items.length === 0 ? (
        <div className="container-px py-24 md:py-32 flex flex-col items-center gap-6 text-center">
          <div className="font-display text-2xl md:text-4xl">Your bag is empty</div>
          <p className="text-base font-light text-ink-700 max-w-sm">Nothing saved here yet.</p>
          <Button href="/shop">Continue shopping</Button>
        </div>
      ) : (
        <div className="container-px py-10 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 md:gap-18 items-start">
          <div className="flex flex-col">
            {items.map((item) => (
              <div key={item.key} className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr_auto] gap-5 md:gap-8 py-7 border-b border-divider items-center">
                <div className="relative aspect-[4/5] border border-divider bg-ink-200">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />}
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="font-display text-xl md:text-2xl">{item.name}</div>
                  <div className="text-sm text-ink-700">
                    Size {item.size} &middot; {item.color}
                  </div>
                  <QuantityStepper qty={item.qty} onInc={() => incItem(item.key)} onDec={() => decItem(item.key)} />
                </div>
                <div className="col-span-2 md:col-span-1 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:gap-4">
                  <div className="text-base text-ink-800">{formatPrice(item.priceCents * item.qty)}</div>
                  <button type="button" onClick={() => removeItem(item.key)} className="text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <Button href="/shop" variant="text" className="self-start mt-7">
              &larr; Continue shopping
            </Button>
          </div>

          <div className="border border-divider rounded-md p-8 flex flex-col gap-5">
            <div className="text-[11px] uppercase tracking-label-lg text-ink-600">Summary</div>
            <div className="flex justify-between text-[15px] text-ink-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-[15px] text-ink-700">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="flex justify-between text-[15px] text-ink-700">
              <span>Duties &amp; tax</span>
              <span>Calculated at payment</span>
            </div>
            <div className="flex border-b border-divider mt-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="flex-1 bg-transparent outline-none py-2.5 text-sm"
              />
              <button type="button" className="text-[11px] uppercase tracking-label text-gold-700 py-2.5">
                Apply
              </button>
            </div>
            <div className="flex justify-between items-baseline border-t border-divider pt-5 mt-2">
              <span className="text-[11px] uppercase tracking-label">Total</span>
              <span className="font-display text-2xl md:text-3xl">{formatPrice(total)}</span>
            </div>
            <Button href="/checkout" fullWidth>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
