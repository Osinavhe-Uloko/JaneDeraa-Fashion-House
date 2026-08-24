import PageShell from '@/components/PageShell';
import StoresClient from '@/components/StoresClient';
import { api } from '@/lib/api';
import { safe } from '@/lib/safe';

export const metadata = { title: 'Showrooms' };

export default async function StoresPage() {
  const { data: stores } = await safe(api.getStores(), { data: [] });

  return (
    <PageShell>
      <div className="container-px pt-14 pb-8 flex flex-col gap-3">
        <h1 className="font-display text-display-mobile md:text-[48px]">Showrooms</h1>
        <p className="text-base font-light text-ink-700">
          Three addresses. Appointments preferred, walk-ins welcome at the first two.
        </p>
      </div>
      <StoresClient stores={stores} />
    </PageShell>
  );
}
