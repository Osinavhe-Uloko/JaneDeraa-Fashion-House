'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function NewsletterBand() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.subscribeNewsletter(email);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-green text-bg container-px py-24 md:py-28 flex flex-col items-center gap-8 text-center">
      <div className="font-display text-3xl md:text-4xl">Letters from the atelier</div>
      <div className="text-base font-light text-bg/72 max-w-[440px]">
        New collections, private appointments and notes on cloth. Sent rarely.
      </div>
      {status === 'done' ? (
        <div className="text-[13px] uppercase tracking-label text-gold-200">You&rsquo;re on the list.</div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-[420px] md:max-w-[520px] flex border-b border-divider-dark">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 bg-transparent outline-none py-3.5 text-[15px] placeholder:text-bg/60"
          />
          <button type="submit" disabled={status === 'loading'} className="text-[11px] uppercase tracking-label text-gold-300 hover:text-gold-200 py-3.5 px-1">
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && <div className="text-xs text-terracotta">Something went wrong — try again.</div>}
    </div>
  );
}
