import PageShell from '@/components/PageShell';
import CartPageClient from '@/components/CartPageClient';

export const metadata = { title: 'Shopping Bag' };

export default function CartPage() {
  return (
    <PageShell>
      <CartPageClient />
    </PageShell>
  );
}
