'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useWishlist } from '@/lib/wishlist-context';
import { api } from '@/lib/api';
import type { Order } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import Button from './Button';

const TABS = ['Orders', 'Measurements', 'Wishlist', 'Addresses', 'Settings'] as const;
type Tab = (typeof TABS)[number];

const MEASUREMENTS = [
  { label: 'Chest', val: '38.5″' },
  { label: 'Waist', val: '31.0″' },
  { label: 'Seat', val: '40.0″' },
  { label: 'Shoulder', val: '18.5″' },
  { label: 'Sleeve', val: '25.0″' },
  { label: 'Back length', val: '17.5″' },
  { label: 'Inseam', val: '32.0″' },
  { label: 'Outseam', val: '42.5″' },
  { label: 'Neck', val: '15.5″' },
];

const ADDRESSES = [
  { label: 'Default — Shipping', lines: 'Street address / City, Postcode / Country' },
  { label: 'Billing', lines: 'Street address / City, Postcode / Country' },
];

export default function AccountClient() {
  const searchParams = useSearchParams();
  const { user, loading, signOut } = useAuth();
  const { items: wishlist, remove: removeWish } = useWishlist();
  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'Orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (tab !== 'Orders' || !user?.email) return;
    setOrdersLoading(true);
    api
      .getOrdersByEmail(user.email)
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [tab, user?.email]);

  if (loading) return <div className="container-px py-24 text-sm text-ink-600">Loading…</div>;

  if (!user) {
    return (
      <div className="container-px py-24 md:py-32 flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-3xl md:text-4xl">Sign in to view your account</h1>
        <p className="text-base font-light text-ink-700 max-w-sm">
          Your account keeps orders, measurements and wishlist together in one place.
        </p>
        <Button href="/login">Sign in</Button>
      </div>
    );
  }

  const firstName = (user.user_metadata?.full_name as string | undefined)?.split(' ')[0];

  return (
    <div className="flex flex-col">
      <div className="container-px pt-14 pb-6 flex flex-col gap-3">
        <div className="text-[11px] uppercase tracking-label text-ink-600">Home / Account</div>
        <h1 className="font-display text-3xl md:text-[52px]">{firstName ? `Welcome back, ${firstName}` : 'Your account'}</h1>
        <div className="text-sm text-ink-700">{user.email}</div>
      </div>

      <div className="container-px pt-4 flex gap-6 overflow-x-auto border-b border-divider md:hidden text-[11px] uppercase tracking-label whitespace-nowrap pb-4">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-1.5 border-b ${tab === t ? 'border-gold text-gold-700' : 'border-transparent text-ink-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="container-px py-8 md:py-10 pb-24 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-18 items-start">
        <div className="hidden md:flex flex-col border-t border-divider">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 border-b border-divider text-[13px] uppercase tracking-label flex justify-between hover:text-gold-700 transition-colors ${
                tab === t ? 'text-gold-700' : 'text-ink-700'
              }`}
            >
              <span>{t}</span>
              {tab === t && <span>—</span>}
            </button>
          ))}
          <button onClick={signOut} className="mt-6 text-left text-[13px] uppercase tracking-label text-ink-600 hover:text-gold-700">
            Sign out
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="font-display text-2xl md:text-[34px] border-b border-divider pb-4">{tab}</h2>

          {tab === 'Orders' &&
            (ordersLoading ? (
              <div className="text-sm text-ink-600">Loading orders…</div>
            ) : orders.length === 0 ? (
              <div className="text-sm text-ink-600">No orders yet. Place an order and it will show up here.</div>
            ) : (
              <div className="flex flex-col gap-5">
                {orders.map((order) => (
                  <div key={order.id} className="border border-divider rounded-md p-6 md:p-8 flex flex-col md:grid md:grid-cols-[96px_1fr_auto] gap-5 md:gap-8 md:items-center">
                    <div className="hidden md:block aspect-square bg-ink-200 border border-divider" />
                    <div className="flex flex-col gap-2">
                      <div className="text-[11px] uppercase tracking-label text-ink-600 tabular-nums">
                        {order.order_number} &middot; {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="font-display text-xl md:text-2xl">{order.items.length} item(s)</div>
                      <div className="text-sm text-ink-700">{formatPrice(order.total_cents)}</div>
                    </div>
                    <div className="flex flex-col gap-2 items-start md:items-end">
                      <span className="text-[10px] uppercase tracking-label border border-gold text-gold-700 px-2.5 py-1">{order.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {tab === 'Measurements' && (
            <div className="flex flex-col gap-8">
              <p className="text-base font-light text-ink-700 max-w-lg">
                Taken at your last fitting. We re-measure every two years, or after any change you tell us about.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 border-t border-divider">
                {MEASUREMENTS.map((m) => (
                  <div key={m.label} className="py-6 border-b border-divider flex flex-col gap-1.5">
                    <div className="text-[11px] uppercase tracking-label text-ink-600">{m.label}</div>
                    <div className="font-display text-2xl tabular-nums">{m.val}</div>
                  </div>
                ))}
              </div>
              <Button href="/inquiry?type=bespoke" className="self-start">
                Book a re-measure
              </Button>
            </div>
          )}

          {tab === 'Wishlist' &&
            (wishlist.length === 0 ? (
              <div className="text-sm text-ink-600">Nothing saved yet — browse the shop and tap the heart on anything you like.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {wishlist.map((w) => (
                  <div key={w.slug} className="flex flex-col gap-3.5">
                    <div className="relative aspect-square border border-divider bg-ink-200">
                      {w.image && <Image src={w.image} alt={w.name} fill sizes="200px" className="object-cover" />}
                      <button
                        onClick={() => removeWish(w.slug)}
                        className="absolute top-2.5 right-2.5 h-7 w-7 border border-divider bg-bg flex items-center justify-center text-sm text-ink-700 hover:border-gold hover:text-gold-700"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="font-display text-lg">{w.name}</div>
                    <div className="text-sm text-ink-700">{formatPrice(w.priceCents)}</div>
                  </div>
                ))}
              </div>
            ))}

          {tab === 'Addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADDRESSES.map((a) => (
                <div key={a.label} className="border border-divider rounded-md p-7 flex flex-col gap-3">
                  <div className="text-[11px] uppercase tracking-label text-gold-700">{a.label}</div>
                  <div className="text-base leading-relaxed text-ink-800">{a.lines}</div>
                </div>
              ))}
              <div className="border border-dashed border-ink-400 rounded-md p-7 flex items-center justify-center text-[11px] uppercase tracking-label text-ink-600 min-h-[140px]">
                + Add address
              </div>
            </div>
          )}

          {tab === 'Settings' && (
            <div className="flex flex-col gap-8 max-w-md">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-label text-ink-600">Full name</label>
                <div className="border-b border-divider py-2.5 text-base">{(user.user_metadata?.full_name as string) || '—'}</div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-label text-ink-600">Email</label>
                <div className="border-b border-divider py-2.5 text-base">{user.email}</div>
              </div>
              <Button variant="secondary" onClick={signOut} className="self-start">
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
