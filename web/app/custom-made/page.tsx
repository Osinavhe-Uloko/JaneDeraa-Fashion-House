import Image from 'next/image';
import PageShell from '@/components/PageShell';
import Button from '@/components/Button';

export const metadata = { title: 'Custom-Made' };

const STEPS = [
  { n: '01', t: 'Choose a style', b: 'Start from an existing pattern — coat, jacket, trouser or shirt.' },
  { n: '02', t: 'Choose a cloth', b: 'Around 120 cloths held in stock for the custom program.' },
  { n: '03', t: 'Adjust the fit', b: 'Length, sleeve, waist suppression and a handful of other changes.' },
  { n: '04', t: 'One fitting', b: 'A single fitting at week four, then finishing and delivery.' },
];

const SWATCHES = [
  'Wool flannel · Biella',
  'Cashmere blend · Mongolia',
  'Cotton gabardine · Manchester',
  'Linen · Normandy',
  'Wool twill · Huddersfield',
  'Silk-wool · Como',
  'Herringbone · Huddersfield',
  'Oxford cotton · Egypt',
];

export default function CustomMadePage() {
  return (
    <PageShell>
      <section className="bg-surface container-px py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">
        <div className="flex flex-col gap-6 md:gap-7">
          <div className="text-[11px] uppercase tracking-label-2xl text-gold-700">Custom-Made</div>
          <h1 className="font-display text-display-mobile md:text-[64px] md:leading-[1.06]">
            Our patterns,
            <br />
            your proportions
          </h1>
          <p className="text-base md:text-lg font-light leading-relaxed text-ink-700 max-w-md">
            Start from a house pattern, choose your cloth, and adjust the fit where it matters. Six weeks rather than
            twelve, one fitting rather than three.
          </p>
          <Button href="/inquiry?type=custom" className="self-start mt-1">
            Start Your Custom Order
          </Button>
        </div>
        <div className="relative aspect-[4/5] md:aspect-[4/3] border border-divider overflow-hidden order-first md:order-last">
          <Image src="/assets/placeholders/custom-hero.jpg" alt="Cloth and pattern on a table" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </section>

      <section className="container-px py-20 md:py-32 flex flex-col gap-12 md:gap-16">
        <h2 className="font-display text-title-mobile md:text-[44px] border-b border-divider pb-4 md:pb-5">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="flex md:flex-col gap-5 md:gap-4 border-t border-gold-300 pt-5 md:pt-6">
              <div className="font-display text-3xl md:text-[44px] text-gold-400 tabular-nums leading-none">{s.n}</div>
              <div className="flex flex-col gap-2">
                <div className="font-display text-xl md:text-2xl">{s.t}</div>
                <div className="text-sm md:text-[15px] leading-relaxed text-ink-700 font-light">{s.b}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px pb-20 md:pb-32 flex flex-col gap-8 md:gap-10">
        <div className="flex items-baseline justify-between border-b border-divider pb-4 md:pb-5">
          <h2 className="font-display text-title-mobile md:text-[44px]">The cloth book</h2>
          <div className="hidden md:block text-xs uppercase tracking-label text-ink-600">Around 120 cloths in stock</div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
          {SWATCHES.map((s) => (
            <div key={s} className="flex flex-col gap-2 md:gap-3">
              <div
                className="aspect-square border border-divider"
                style={{ background: 'repeating-linear-gradient(45deg, #DEDDD9 0 6px, #CFCEC9 6px 12px)' }}
              />
              <div className="hidden md:block text-xs text-ink-700">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface container-px py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-divider">
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] uppercase tracking-label text-ink-600">From</div>
          <div className="font-display text-2xl md:text-[34px]">$2,100</div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] uppercase tracking-label text-ink-600">Turnaround</div>
          <div className="font-display text-2xl md:text-[34px]">Six weeks</div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] uppercase tracking-label text-ink-600">Fittings</div>
          <div className="font-display text-2xl md:text-[34px]">One</div>
        </div>
      </section>
    </PageShell>
  );
}
