'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import { api } from '@/lib/api';
import { Field } from './FormField';
import Button from './Button';

const STEP_LABELS = ['Shipping', 'Delivery', 'Payment'];

const DELIVERY_OPTIONS = [
  { id: 'standard', t: 'Standard', b: '3–5 working days', priceCents: 0 },
  { id: 'express', t: 'Express', b: '1–2 working days', priceCents: 2500 },
  { id: 'collection', t: 'Showroom collection', b: 'Ready in 24 hours', priceCents: 0 },
];

type ShipForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

const EMPTY_SHIP: ShipForm = { fullName: '', email: '', address: '', city: '', postcode: '', country: '' };

export default function CheckoutClient() {
  const { items, subtotalCents, clear } = useCart();
  const [step, setStep] = useState(1);
  const [ship, setShip] = useState<ShipForm>(EMPTY_SHIP);
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState({ cardNumber: '', nameOnCard: '', expiry: '', cvc: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCents = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.priceCents ?? 0;
  const total = subtotalCents + shippingCents;

  async function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { data: order } = await api.createOrder({
        customerName: ship.fullName,
        email: ship.email,
        shippingAddress: { address: ship.address, city: ship.city, postcode: ship.postcode, country: ship.country },
        deliveryMethod: DELIVERY_OPTIONS.find((d) => d.id === delivery)?.t,
        shippingCents,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          color: i.color,
          qty: i.qty,
          priceCents: i.priceCents,
        })),
      });
      setOrderNumber(order.order_number);
      clear();
      setStep(4);
    } catch {
      setError('Something went wrong confirming your order — please try again. (No card was charged — checkout is a mock flow.)');
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="container-px py-24 flex flex-col items-center gap-6 text-center">
        <div className="font-display text-3xl">Your bag is empty</div>
        <Button href="/shop">Continue shopping</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="container-px py-6 border-b border-divider flex items-center justify-between">
        <Link href="/" className="font-display text-lg">
          JaneDeraa
        </Link>
        <div className="hidden md:block text-[11px] uppercase tracking-label text-ink-600">Secure checkout</div>
        <Link href="/contact" className="text-[11px] uppercase tracking-label text-ink-600">
          Need help?
        </Link>
      </div>

      {step <= 3 && (
        <div className="container-px pt-8">
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = n <= step;
              return (
                <button
                  key={label}
                  onClick={() => setStep(n)}
                  className={`flex flex-col gap-2 pt-3 border-t-2 text-left ${active ? 'border-gold' : 'border-divider'}`}
                >
                  <span className={`text-[10px] tracking-label tabular-nums ${active ? 'text-gold-700' : 'text-ink-500'}`}>
                    {String(n).padStart(2, '0')}
                  </span>
                  <span className={`text-[11px] uppercase tracking-label ${active ? 'text-gold-700' : 'text-ink-500'}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="container-px py-10 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 md:gap-24 items-start">
        <div className="flex flex-col gap-10">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <h1 className="font-display text-2xl md:text-[38px]">Shipping details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                <Field label="Full name" placeholder="Name" value={ship.fullName} onChange={(e) => setShip((s) => ({ ...s, fullName: e.target.value }))} />
                <Field label="Email" type="email" placeholder="name@example.com" value={ship.email} onChange={(e) => setShip((s) => ({ ...s, email: e.target.value }))} />
                <Field label="Street address" placeholder="Address" className="md:col-span-2" value={ship.address} onChange={(e) => setShip((s) => ({ ...s, address: e.target.value }))} />
                <Field label="City" placeholder="City" value={ship.city} onChange={(e) => setShip((s) => ({ ...s, city: e.target.value }))} />
                <Field label="Postcode" placeholder="0000" value={ship.postcode} onChange={(e) => setShip((s) => ({ ...s, postcode: e.target.value }))} />
                <Field label="Country" placeholder="Country" value={ship.country} onChange={(e) => setShip((s) => ({ ...s, country: e.target.value }))} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              <h1 className="font-display text-2xl md:text-[38px]">Delivery method</h1>
              <div className="flex flex-col gap-3">
                {DELIVERY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDelivery(d.id)}
                    className={`rounded-sm border px-6 py-6 flex justify-between items-center transition-colors ${
                      delivery === d.id ? 'border-gold' : 'border-divider hover:border-ink-400'
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 text-left">
                      <span className="font-display text-xl md:text-[22px]">{d.t}</span>
                      <span className="text-sm text-ink-700">{d.b}</span>
                    </div>
                    <span className="text-sm text-ink-800">{d.priceCents === 0 ? 'Complimentary' : formatPrice(d.priceCents)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8">
              <h1 className="font-display text-2xl md:text-[38px]">Payment</h1>
              <p className="text-xs text-ink-600 -mt-4">
                This is a demo checkout — no real payment gateway is connected and no card will be charged.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                <Field
                  label="Card number"
                  placeholder="0000 0000 0000 0000"
                  className="md:col-span-2"
                  value={payment.cardNumber}
                  onChange={(e) => setPayment((p) => ({ ...p, cardNumber: e.target.value }))}
                />
                <Field label="Name on card" placeholder="Name" value={payment.nameOnCard} onChange={(e) => setPayment((p) => ({ ...p, nameOnCard: e.target.value }))} />
                <Field label="Expiry" placeholder="MM / YY" value={payment.expiry} onChange={(e) => setPayment((p) => ({ ...p, expiry: e.target.value }))} />
                <Field label="Security code" placeholder="000" value={payment.cvc} onChange={(e) => setPayment((p) => ({ ...p, cvc: e.target.value }))} />
              </div>
              <label className="flex items-center gap-3 text-sm text-ink-700">
                <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-gold" />
                Billing address is the same as shipping
              </label>
              {error && <div className="text-sm text-terracotta">{error}</div>}
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-6 items-start py-8">
              <div className="h-14 w-14 border border-gold rounded-full flex items-center justify-center text-gold-700 text-xl">&#10003;</div>
              <h1 className="font-display text-3xl md:text-[46px]">Order confirmed</h1>
              <p className="text-base md:text-[17px] font-light leading-relaxed text-ink-700 max-w-md">
                Order {orderNumber}. A confirmation is on its way by email, and we will write again when the parcel
                leaves the atelier.
              </p>
              <div className="flex gap-3 mt-2">
                <Button href={`/account?tab=Orders`}>Track order</Button>
                <Button href="/shop" variant="secondary">
                  Continue shopping
                </Button>
              </div>
            </div>
          )}

          {step <= 3 && (
            <div className="flex items-center justify-between border-t border-divider pt-7">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="text-[11px] uppercase tracking-label text-ink-700 hover:text-gold-700 disabled:opacity-30 disabled:pointer-events-none"
              >
                &larr; Back
              </button>
              <Button onClick={handleNext} disabled={submitting}>
                {submitting ? 'Placing order…' : step === 3 ? 'Place order' : 'Continue'}
              </Button>
            </div>
          )}
        </div>

        {step <= 3 && (
          <div className="sticky top-24 border border-divider rounded-md p-8 flex flex-col gap-5">
            <div className="text-[11px] uppercase tracking-label-lg text-ink-600">Order summary</div>
            {items.map((item) => (
              <div key={item.key} className="grid grid-cols-[56px_1fr_auto] gap-4 items-center py-3 border-b border-divider">
                <div className="relative aspect-[4/5] border border-divider bg-ink-200">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-base">{item.name}</span>
                  <span className="text-xs text-ink-700">
                    {item.color} &middot; Qty {item.qty}
                  </span>
                </div>
                <span className="text-sm">{formatPrice(item.priceCents * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-ink-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink-700">
              <span>Shipping</span>
              <span>{shippingCents === 0 ? 'Complimentary' : formatPrice(shippingCents)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-divider pt-4">
              <span className="text-[11px] uppercase tracking-label">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
