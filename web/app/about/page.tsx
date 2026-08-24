import Image from 'next/image';
import PageShell from '@/components/PageShell';

export const metadata = { title: 'About' };

const CRAFT_POINTS = [
  { t: 'Cloth', b: 'Mills we have bought from for years, chosen for how the cloth ages rather than how it photographs.' },
  { t: 'Hand', b: 'Canvas is basted, not fused. Buttonholes are cut and sewn by hand.' },
  { t: 'Repair', b: 'Every garment can come back. Alterations and repairs are part of the price.' },
];

const MILESTONES = [
  { y: '2003', t: 'The first atelier opens', b: 'One room, two cutters, a single cloth book.' },
  { y: '2009', t: 'Womenswear introduced', b: 'The house pattern library doubles.' },
  { y: '2014', t: 'Bespoke program formalised', b: 'Three fittings, twelve weeks, alterations for life.' },
  { y: '2019', t: 'Second showroom', b: 'New York.' },
];

const TAILORS = [
  { name: 'Elena Marchetti', role: 'Head Cutter', seed: 'jd-tailor-1' },
  { name: 'Thomas Ridley', role: 'Coatmaker', seed: 'jd-tailor-2' },
  { name: 'Sofia Adeyemi', role: 'Trouser Tailor', seed: 'jd-tailor-3' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container-px py-20 md:py-32 flex justify-center">
        <div className="max-w-xl md:max-w-[760px] flex flex-col gap-7 md:gap-9 text-center items-center">
          <div className="text-[11px] uppercase tracking-label-2xl text-gold-700">Our story</div>
          <h1 className="font-display text-display-mobile md:text-[60px] md:leading-[1.08]">
            A house built on one room and one cloth book
          </h1>
          <p className="text-base md:text-lg leading-[1.8] font-light text-ink-700 text-justify md:text-left">
            We started with a single room above a fabric wholesaler, two cutters, and the conviction that most
            clothing is made to be replaced rather than worn. We refused to chase a season&rsquo;s trend, refused to
            use a cloth we would not wear ourselves, and refused to call anything finished until it was. Twenty
            years on, the room is bigger. The conviction has not moved.
          </p>
        </div>
      </section>

      <section className="container-px pb-20 md:pb-32">
        <div className="relative aspect-[16/9] md:aspect-[21/9] border border-divider overflow-hidden">
          <Image src="https://picsum.photos/seed/jd-about-atelier/1600/700" alt="The atelier, wide" fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-surface container-px py-20 md:py-32 flex flex-col gap-10 md:gap-14">
        <h2 className="font-display text-title-mobile md:text-[44px] border-b border-divider pb-4 md:pb-5">Craftsmanship</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {CRAFT_POINTS.map((c) => (
            <div key={c.t} className="flex flex-col gap-4 border-t border-gold-300 pt-5">
              <div className="font-display text-xl md:text-2xl">{c.t}</div>
              <p className="text-sm md:text-base leading-relaxed font-light text-ink-700">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-20 md:py-32 flex flex-col gap-8 md:gap-12">
        <h2 className="font-display text-title-mobile md:text-[44px] border-b border-divider pb-4 md:pb-5">Milestones</h2>
        {MILESTONES.map((m) => (
          <div key={m.y} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-2 md:gap-12 py-4 md:py-8 border-b border-divider items-baseline">
            <div className="font-display text-2xl md:text-[32px] text-gold-400 tabular-nums">{m.y}</div>
            <div className="font-display text-xl md:text-[26px]">{m.t}</div>
            <p className="text-sm md:text-base leading-relaxed font-light text-ink-700">{m.b}</p>
          </div>
        ))}
      </section>

      <section className="container-px pb-20 md:pb-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TAILORS.map((t) => (
          <div key={t.name} className="flex flex-col gap-3.5">
            <div className="relative aspect-[4/5] border border-divider overflow-hidden">
              <Image src={`https://picsum.photos/seed/${t.seed}/700/875`} alt={t.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="font-display text-xl">{t.name}</div>
            <div className="text-[11px] uppercase tracking-label text-gold-700">{t.role}</div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
