import PageShell from '@/components/PageShell';
import WishlistClient from '@/components/WishlistClient';

export const metadata = { title: 'Wishlist' };

export default function WishlistPage() {
  return (
    <PageShell>
      <WishlistClient />
    </PageShell>
  );
}
