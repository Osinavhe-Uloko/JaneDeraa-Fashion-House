import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import AccountClient from '@/components/AccountClient';

export const metadata = { title: 'Account' };

export default function AccountPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="container-px py-24 text-sm text-ink-600">Loading…</div>}>
        <AccountClient />
      </Suspense>
    </PageShell>
  );
}
