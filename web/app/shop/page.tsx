import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import ShopClient from '@/components/ShopClient';

export const metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="container-px py-24 text-sm text-ink-600">Loading…</div>}>
        <ShopClient />
      </Suspense>
    </PageShell>
  );
}
