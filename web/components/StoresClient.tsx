'use client';

import { useState } from 'react';
import type { Store } from '@/lib/types';

export default function StoresClient({ stores }: { stores: Store[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="container-px pt-6 pb-20 md:pb-28 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 md:gap-12 items-start">
      <div className="flex flex-col gap-4 order-2 md:order-1">
        {stores.map((store, i) => (
          <button
            key={store.id}
            onClick={() => setSelected(i)}
            className={`text-left rounded-md border p-6 md:p-7 flex flex-col gap-3 transition-colors ${
              i === selected ? 'border-gold' : 'border-divider hover:border-ink-400'
            }`}
          >
            <div className="font-display text-xl md:text-2xl">{store.name}</div>
            <div className="text-sm leading-relaxed text-ink-700">{store.address}</div>
            <div className="text-xs text-ink-600">
              {store.hours}
              {store.phone ? ` · ${store.phone}` : ''}
            </div>
            <span className="text-[11px] uppercase tracking-label text-gold-700 mt-1">Book appointment &rarr;</span>
          </button>
        ))}
        {stores.length === 0 && <p className="text-sm text-ink-600">Showroom data hasn&rsquo;t been seeded yet — run the seed script.</p>}
      </div>

      <div
        className="order-1 md:order-2 h-[220px] md:h-[520px] border border-divider bg-surface relative flex items-center justify-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #DEDDD9 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, #DEDDD9 0 1px, transparent 1px 48px)',
        }}
      >
        <span className="font-mono text-[11px] text-ink-600">[ map — pins at each showroom ]</span>
        {stores.map((store, i) => (
          <span
            key={store.id}
            className={`absolute h-3 w-3 rounded-full ${i === selected ? 'bg-gold' : 'border border-gold-700 bg-transparent'}`}
            style={{ top: `${30 + i * 18}%`, left: `${30 + i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
