'use client';

import { useState } from 'react';

export interface AccordionItem {
  label: string;
  body: React.ReactNode;
}

export default function Accordion({
  items,
  defaultOpenLabel,
}: {
  items: AccordionItem[];
  defaultOpenLabel?: string;
}) {
  const [open, setOpen] = useState(defaultOpenLabel ?? '');

  return (
    <div className="flex flex-col border-t border-divider">
      {items.map((item) => {
        const isOpen = open === item.label;
        return (
          <div key={item.label} className="border-b border-divider">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? '' : item.label)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left text-[12px] uppercase tracking-label hover:text-gold-700 transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-gold-700">{isOpen ? '–' : '+'}</span>
            </button>
            {isOpen && (
              <div className="pb-6 text-[15px] leading-relaxed text-ink-700 font-light">{item.body}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
