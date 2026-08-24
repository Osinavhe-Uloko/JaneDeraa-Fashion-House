import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import PdpClient from '@/components/PdpClient';
import { api } from '@/lib/api';
import { safe } from '@/lib/safe';
import type { Product } from '@/lib/types';

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const { data } = await api.getProduct(slug);
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  return { title: product?.name || 'Product' };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) notFound();

  const [{ data: related }, { data: crossSell }] = await Promise.all([
    safe(api.getProducts({ gender: product.gender, tier: product.tier, pageSize: 5 }), { data: [], count: 0, page: 1, pageSize: 5 }),
    safe(api.getProducts({ featured: true, pageSize: 4 }), { data: [], count: 0, page: 1, pageSize: 4 }),
  ]);

  return (
    <PageShell>
      <PdpClient
        product={product}
        related={related.filter((p) => p.slug !== product.slug).slice(0, 4)}
        crossSell={crossSell.filter((p) => p.slug !== product.slug).slice(0, 4)}
      />
    </PageShell>
  );
}
