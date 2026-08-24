'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import Button from './Button';
import QuantityStepper from './QuantityStepper';
import { CloseIcon } from './icons';

export default function CartDrawer() {
  const { items, isOpen, close, incItem, decItem, removeItem, subtotalCents } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="Close bag" onClick={close} className="absolute inset-0 bg-ink-900/40" />
      <div className="relative w-full max-w-[440px] h-full bg-bg flex flex-col shadow-panel">
        <div className="flex items-center justify-between px-7 py-6 border-b border-divider">
          <div className="text-[12px] uppercase tracking-label">Bag ({items.reduce((s, i) => s + i.qty, 0)})</div>
          <button type="button" aria-label="Close" onClick={close}>
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="py-16 text-center text-sm text-ink-700">Your bag is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="grid grid-cols-[80px_1fr] gap-5 py-6 border-b border-divider">
                <div className="relative aspect-[4/5] border border-divider bg-ink-200">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-display text-lg leading-tight">{item.name}</div>
                  <div className="text-[13px] text-ink-700">
                    Size {item.size} &middot; {item.color}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <QuantityStepper qty={item.qty} onInc={() => incItem(item.key)} onDec={() => decItem(item.key)} size="sm" />
                    <span className="text-sm text-ink-800">{formatPrice(item.priceCents * item.qty)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="self-start text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-divider px-7 py-6 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] uppercase tracking-label">Subtotal</span>
            <span className="font-display text-2xl">{formatPrice(subtotalCents)}</span>
          </div>
          <div className="text-xs text-ink-600">Shipping and duties calculated at checkout.</div>
          <Button href="/checkout" fullWidth onClick={close}>
            Checkout
          </Button>
          <button type="button" onClick={close} className="text-center text-[11px] uppercase tracking-label text-ink-700 hover:text-gold-700">
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
