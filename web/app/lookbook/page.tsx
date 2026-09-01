import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { api } from '@/lib/api';
import { safe } from '@/lib/safe';

export const metadata = { title: 'Lookbook' };

const LOOKS = [
  {
    n: '01',
    title: 'Look 01 — Wool flannel',
    body: 'A wool flannel overcoat over tailored wool trouser, photographed at the atelier in early light. Cut for cold mornings, not for the camera.',
    image: '/assets/placeholders/look-01.jpg',
  },
  {
    n: '02',
    title: 'Look 02 — Raw silk',
    body: 'Raw silk against bare skin, a single fastening at the waist. Shot on location in a borrowed apartment, nothing else in the frame.',
    image: '/assets/placeholders/look-02.jpg',
  },
];

export default async function LookbookPage() {
  const { data: featured } = await safe(api.getProducts({ featured: true, pageSize: 2 }), { data: [], count: 0, page: 1, pageSize: 2 });

  return (
    <PageShell>
      <section className="container-px pt-20 pb-16 md:pt-28 md:pb-20 flex flex-col items-center gap-5 text-center">
        <div className="text-[11px] uppercase tracking-label-2xl text-gold-700">Lookbook — Autumn</div>
        <h1 className="font-display text-display-mobile md:text-[60px] md:leading-[1.08] max-w-3xl">A season in three cloths</h1>
      </section>

      {LOOKS.map((look, i) => {
        const product = featured[i];
        const imageFirst = i % 2 === 0;
        return (
          <section key={look.n} className="container-px pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-center">
            <div className={`relative aspect-[4/5] border border-divider overflow-hidden ${imageFirst ? 'md:order-1' : 'md:order-2'}`}>
              <Image src={look.image} alt={look.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              {product && (
                <Link
                  href={`/product/${product.slug}`}
                  className="absolute top-[38%] left-[42%] flex items-center gap-2.5 group"
                >
                  <span className="h-5 w-5 rounded-full border border-gold bg-bg flex items-center justify-center text-xs text-gold-700">+</span>
                  <span className="bg-bg border border-divider px-3 py-1.5 text-[10px] uppercase tracking-label opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop the look
                  </span>
                </Link>
              )}
            </div>
            <div className={`flex flex-col gap-5 md:gap-6 md:px-16 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
              <h2 className="font-display text-2xl md:text-[38px] leading-tight">{look.title}</h2>
              <p className="text-base md:text-[17px] leading-[1.8] font-light text-ink-700 text-justify">{look.body}</p>
              {product && (
                <Link href={`/product/${product.slug}`} className="text-[11px] uppercase tracking-label text-gold-700 hover:text-ink transition-colors">
                  Shop this look &rarr;
                </Link>
              )}
            </div>
          </section>
        );
      })}

      <section className="text-center container-px pb-20 md:pb-28">
        <Link href="/journal" className="text-[11px] uppercase tracking-label text-gold-700 hover:text-ink transition-colors">
          Read the Journal &rarr;
        </Link>
      </section>
    </PageShell>
  );
}
