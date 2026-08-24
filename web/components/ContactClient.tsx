'use client';

import { useState } from 'react';
import { Field, TextAreaField } from './FormField';
import Button from './Button';
import Accordion from './Accordion';

const CHANNELS = [
  { k: 'Email', v: 'hello@janederaa.com' },
  { k: 'Telephone', v: '+1 212 555 0148' },
  { k: 'WhatsApp', v: '+1 212 555 0148' },
];

const FAQS = [
  {
    label: 'How long does a bespoke commission take?',
    body: 'Twelve weeks from the first consultation to delivery, across three fittings. Custom-Made pieces take six weeks with a single fitting.',
  },
  {
    label: 'Can I order from outside the country?',
    body: 'Yes — ready-to-wear ships worldwide. Custom and bespoke consultations can happen at one of our showrooms or, for larger commissions, at your address.',
  },
  {
    label: 'What is your alterations policy?',
    body: 'Alterations and repairs are included for the life of any bespoke or custom garment. Ready-to-wear alterations are complimentary within 30 days of delivery.',
  },
  {
    label: 'Do you offer gift cards?',
    body: 'Yes, in any denomination, redeemable online or in any showroom. They do not expire.',
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({ fullName: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Contact isn't one of the REST resources this build wires up (products /
    // collections / orders / inquiries) — this just confirms receipt in the UI.
    setSent(true);
  }

  return (
    <div className="container-px py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-start">
      <div className="flex flex-col gap-7 md:gap-8">
        <h1 className="font-display text-display-mobile md:text-[48px]">Contact</h1>
        <p className="text-base leading-relaxed font-light text-ink-700">
          We answer within one working day. For appointments, the showroom pages are quicker.
        </p>

        {sent ? (
          <div className="border border-gold rounded-md p-7 text-sm text-ink-700">
            Thank you — your message is on its way to us. We&rsquo;ll reply within one working day.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <Field label="Full name" required placeholder="Name" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
            <Field label="Email" type="email" required placeholder="name@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <Field label="Subject" placeholder="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
            <TextAreaField
              label="Message"
              rows={5}
              placeholder="How can we help?"
              required
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
            <Button type="submit" className="self-start">
              Send message
            </Button>
          </form>
        )}
      </div>

      <div className="flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-5 border-t border-divider pt-6">
          {CHANNELS.map((c) => (
            <div key={c.k} className="flex justify-between items-baseline pb-3.5 border-b border-divider">
              <span className="text-[11px] uppercase tracking-label text-ink-600">{c.k}</span>
              <span className="text-base text-ink-800">{c.v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-2xl md:text-[32px]">Frequent questions</h2>
          <Accordion items={FAQS} />
        </div>
      </div>
    </div>
  );
}
