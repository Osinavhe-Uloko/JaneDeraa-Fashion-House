import Image from 'next/image';
import Link from 'next/link';

const COLUMNS = [
  {
    head: 'Shop',
    items: [
      { label: 'Women', href: '/shop?gender=women' },
      { label: 'Men', href: '/shop?gender=men' },
      { label: 'Custom-Made', href: '/custom-made' },
      { label: 'Bespoke', href: '/bespoke' },
    ],
  },
  {
    head: 'Atelier',
    items: [
      { label: 'Our story', href: '/about' },
      { label: 'Showrooms', href: '/stores' },
      { label: 'Journal', href: '/journal' },
      { label: 'Lookbook', href: '/lookbook' },
    ],
  },
  {
    head: 'Service',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Account', href: '/account' },
      { label: 'Shopping bag', href: '/cart' },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="container-px grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 py-16 md:py-24 border-b border-divider">
        <div className="col-span-2 flex flex-col gap-5">
          <Image src="/assets/logo-black.png" alt="JaneDeraa" height={23} width={120} className="h-[20px] w-auto self-start" />
          <p className="text-sm leading-relaxed text-ink-700 max-w-[260px]">Timeless elegance in every stitch.</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.head} className="flex flex-col gap-4">
            <div className="text-[11px] uppercase tracking-label text-ink">{col.head}</div>
            {col.items.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-ink-700 hover:text-gold-700 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container-px flex flex-col md:flex-row gap-4 md:items-center md:justify-between py-7 text-xs text-ink-600">
        <div>&copy; {new Date().getFullYear()} JaneDeraa</div>
        <div className="flex gap-7">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
