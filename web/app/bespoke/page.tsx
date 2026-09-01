import Image from 'next/image';
import PageShell from '@/components/PageShell';
import Button from '@/components/Button';

export const metadata = { title: 'Bespoke' };

const JOURNEY = [
  {
    n: '01',
    title: 'Consultation',
    body: 'Ninety minutes with a cutter. We discuss occasion, cloth and how you want the garment to sit. No measurements yet.',
    meta: '90 minutes · showroom or at your address',
    image: '/assets/placeholders/journey-consult.jpg',
  },
  {
    n: '02',
    title: 'Measurement',
    body: 'Some thirty measurements, plus posture notes a tape cannot record. Your paper pattern is cut from these alone.',
    meta: '45 minutes',
    image: '/assets/placeholders/journey-measure.jpg',
  },
  {
    n: '03',
    title: 'Fabric Selection',
    body: 'Mills from Biella, Huddersfield and Kyoto. We show what suits the garment, the season and the way you wear it.',
    meta: 'Over 400 cloths in the book',
    image: '/assets/placeholders/journey-fabric.jpg',
  },
  {
    n: '04',
    title: 'Fittings',
    body: 'Three fittings across the make. The first is basted canvas and looks unfinished — that is the point.',
    meta: 'Weeks 4, 8 and 11',
    image: '/assets/placeholders/journey-fitting.jpg',
  },
  {
    n: '05',
    title: 'Delivery',
    body: 'Pressed, boxed and handed over in the showroom. Alterations for the life of the garment are included.',
    meta: 'Week 12',
    image: '/assets/placeholders/journey-delivery.jpg',
  },
];

const TAILORS = [
  { name: 'Elena Marchetti', role: 'Head Cutter', bio: 'Trained in Naples, cutting for twenty-two years. Known for a shoulder line no one else in the house attempts.', image: '/assets/placeholders/tailor-1.jpg' },
  { name: 'Thomas Ridley', role: 'Coatmaker', bio: 'Fourteen years on overcoats and outerwear alone. Can identify a mill by touch.', image: '/assets/placeholders/tailor-2.jpg' },
  { name: 'Sofia Adeyemi', role: 'Trouser Tailor', bio: 'Joined as an apprentice, now runs the trouser bench. Precise to a sixteenth of an inch.', image: '/assets/placeholders/tailor-3.jpg' },
];

export default function BespokePage() {
  return (
    <PageShell>
      <div className="relative h-[70vh] min-h-[480px] max-h-[760px] bg-green">
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-7 md:gap-9 text-center text-bg px-6">
          <div className="text-[10px] md:text-[11px] uppercase tracking-label-2xl text-gold-300">Bespoke</div>
          <h1 className="font-display text-hero-mobile md:text-[80px] md:leading-[1.04] max-w-3xl">
            One garment,
            <br />
            one wearer
          </h1>
        </div>
      </div>

      <section className="container-px py-24 md:py-40 flex justify-center">
        <div className="max-w-xl md:max-w-[720px] flex flex-col gap-8 md:gap-10 items-center">
          <div className="text-[11px] uppercase tracking-label-xl text-gold-700">Philosophy</div>
          <p className="font-display text-xl md:text-[32px] leading-[1.55] text-justify md:text-center">
            A bespoke garment starts with nothing — no pattern, no size, no assumption about the body that will wear
            it. We take some thirty measurements, cut a paper pattern that exists only for you, and build the
            garment across three fittings. It takes twelve weeks. It is meant to be worn for twenty years.
          </p>
          <div className="h-px w-24 bg-divider" />
        </div>
      </section>

      <section className="container-px pb-24 md:pb-40">
        <h2 className="font-display text-title-mobile md:text-[48px] border-b border-divider pb-5 mb-10 md:mb-18">The Bespoke Journey</h2>
        <div className="flex flex-col">
          {JOURNEY.map((step) => (
            <div key={step.n} className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-5 md:gap-16 py-8 md:py-16 border-t border-divider items-start">
              <div className="font-display text-3xl md:text-[56px] text-gold-400 tabular-nums leading-none">{step.n}</div>
              <div className="flex flex-col gap-3 md:gap-5">
                <div className="font-display text-2xl md:text-[34px]">{step.title}</div>
                <p className="text-sm md:text-[17px] leading-relaxed text-ink-700 font-light">{step.body}</p>
                <div className="text-[11px] uppercase tracking-label text-ink-600">{step.meta}</div>
              </div>
              <div className="relative aspect-[4/3] border border-divider overflow-hidden hidden md:block">
                <Image src={step.image} alt={step.title} fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface container-px py-20 md:py-32 flex flex-col gap-12 md:gap-16">
        <h2 className="font-display text-title-mobile md:text-[44px]">The people who make it</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TAILORS.map((t) => (
            <div key={t.name} className="flex flex-col gap-5">
              <div className="relative aspect-[4/5] border border-divider overflow-hidden">
                <Image src={t.image} alt={t.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="font-display text-2xl">{t.name}</div>
              <div className="text-[11px] uppercase tracking-label text-gold-700">{t.role}</div>
              <p className="text-sm md:text-[15px] leading-relaxed text-ink-700 font-light">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green text-bg container-px py-24 md:py-36 flex flex-col items-center gap-8 text-center">
        <div className="text-[11px] uppercase tracking-label-2xl text-gold-300">By appointment</div>
        <h2 className="font-display text-title-mobile md:text-[56px] md:leading-[1.1] max-w-2xl">Book a consultation</h2>
        <p className="text-base md:text-lg font-light text-bg/72 max-w-md">
          Ninety minutes with a cutter, in the showroom or at your address. No obligation.
        </p>
        <Button href="/inquiry?type=bespoke" tone="inverted" className="mt-2">
          Request an Appointment
        </Button>
      </section>
    </PageShell>
  );
}
