import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import NewsletterBand from '@/components/NewsletterBand';
import { api } from '@/lib/api';
import { safe } from '@/lib/safe';

const CATEGORY_TILES = [
  { label: 'Women', href: '/shop?gender=women', cta: 'Shop', image: 'https://picsum.photos/seed/jd-cat-women/900/1125' },
  { label: 'Men', href: '/shop?gender=men', cta: 'Shop', image: 'https://picsum.photos/seed/jd-cat-men/900/1125' },
  { label: 'Custom & Bespoke', href: '/custom-made', cta: 'Explore', image: 'https://picsum.photos/seed/jd-cat-atelier/900/1125' },
];

const PRESS = ['The Standard', 'Cloth & Craft', 'Wardrobe Weekly', 'The Tailoring Review', 'Atelier Journal'];

export default async function HomePage() {
  const { data: featured } = await safe(api.getProducts({ featured: true, pageSize: 4 }), { data: [], count: 0, page: 1, pageSize: 4 });

  return (
    <PageShell navVariant="overlay">
      <div className="relative h-[92vh] min-h-[560px] max-h-[860px]">
        <Image
          src="https://picsum.photos/seed/jd-hero-home/1600/1000"
          alt="Autumn Collection editorial still"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-ink-900/15 to-ink-900/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-7 md:gap-8 text-center text-bg px-6">
          <div className="text-[10px] md:text-[11px] uppercase tracking-label-2xl text-gold-300">Autumn Collection</div>
          <h1 className="font-display text-hero-mobile md:text-hero-tablet lg:text-hero-desktop max-w-4xl">
            Timeless elegance
            <br />
            in every stitch
          </h1>
          <p className="text-base md:text-lg font-light text-bg/85 max-w-md">Classic lines, modern sensibility.</p>
          <Button href="/shop" tone="inverted" className="mt-2">
            Discover the Collection
          </Button>
        </div>
      </div>

      <section className="container-px py-24 md:py-32 flex justify-center">
        <p className="max-w-3xl text-center font-display text-2xl md:text-title-desktop leading-[1.5] text-balance">
          We make garments meant to outlast the season that produced them. Each piece is cut, fitted and finished by
          hand in our atelier, from cloth chosen for how it ages.
        </p>
      </section>

      <section className="container-px pb-24 md:pb-32 flex flex-col gap-10 md:gap-12">
        <div className="flex items-baseline justify-between border-b border-divider pb-4">
          <h2 className="font-display text-display-mobile md:text-display-desktop">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORY_TILES.map((tile) => (
            <Link key={tile.label} href={tile.href} className="group flex flex-col gap-5">
              <div className="relative aspect-[4/5] border border-divider overflow-hidden">
                <Image src={tile.image} alt={tile.label} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-display text-2xl">{tile.label}</div>
                <div className="text-[11px] uppercase tracking-label text-gold-700">{tile.cta} &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container-px pb-24 md:pb-32 flex flex-col gap-10">
          <div className="flex items-baseline justify-between border-b border-divider pb-4">
            <h2 className="font-display text-display-mobile md:text-display-desktop">Featured</h2>
            <Link href="/shop" className="text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} aspect="1/1" />
            ))}
          </div>
        </section>
      )}

      <section className="bg-surface container-px py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="relative aspect-[4/5] border border-divider overflow-hidden order-2 md:order-1">
          <Image src="https://picsum.photos/seed/jd-atelier-hands/900/1125" alt="Hands at work in the atelier" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-7 order-1 md:order-2">
          <div className="text-[11px] uppercase tracking-label-xl text-gold-700">The Atelier</div>
          <h2 className="font-display text-display-mobile md:text-display-desktop">Made to your measure</h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-ink-700 max-w-md">
            Choose a style, a cloth and a fit. Our custom program adapts an existing pattern to you. Bespoke begins
            with a blank sheet and your measurements alone.
          </p>
          <div className="flex flex-wrap gap-4 mt-1">
            <Button href="/bespoke">Explore Bespoke</Button>
            <Button href="/custom-made" variant="secondary">
              Custom-Made
            </Button>
          </div>
        </div>
      </section>

      <section className="container-px py-24 md:py-32 grid grid-cols-1 md:grid-cols-9 gap-6 items-end">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[16/11] border border-divider overflow-hidden">
            <Image src="https://picsum.photos/seed/jd-lookbook-interior/1200/825" alt="Lookbook, interior setting" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
          </div>
          <div className="text-[11px] uppercase tracking-label text-ink-600">Lookbook — Autumn</div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-6 md:pb-14">
          <div className="relative aspect-[4/5] border border-divider overflow-hidden">
            <Image src="https://picsum.photos/seed/jd-lookbook-detail/900/1125" alt="Detail shot" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="font-display text-2xl leading-snug">See the collection in full</div>
          <Link href="/lookbook" className="text-[11px] uppercase tracking-label text-gold-700 hover:text-ink transition-colors">
            View Lookbook &rarr;
          </Link>
        </div>
      </section>

      <section className="container-px pb-24 md:pb-32 flex flex-col items-center gap-10">
        <div className="text-[11px] uppercase tracking-label-xl text-ink-600">As seen in</div>
        <div className="flex flex-wrap gap-10 md:gap-16 items-center justify-center">
          {PRESS.map((name) => (
            <div key={name} className="font-display text-lg md:text-xl tracking-wide text-ink-500">
              {name}
            </div>
          ))}
        </div>
      </section>

      <NewsletterBand />
    </PageShell>
  );
}
