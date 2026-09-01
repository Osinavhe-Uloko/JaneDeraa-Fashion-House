'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { api } from '@/lib/api';
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './icons';

const PRIMARY_LINKS = [
  { label: 'Women', href: '/shop?gender=women' },
  { label: 'Men', href: '/shop?gender=men' },
  { label: 'Custom', href: '/custom-made' },
  { label: 'Bespoke', href: '/bespoke' },
];

const MOBILE_LINKS = [
  { label: 'Women', href: '/shop?gender=women' },
  { label: 'Men', href: '/shop?gender=men' },
  { label: 'Custom', href: '/custom-made' },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Journal', href: '/journal' },
];

export default function Nav({ variant = 'solid' }: { variant?: 'solid' | 'overlay' }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultCount, setResultCount] = useState<number | null>(null);
  const { count, open: openCart } = useCart();
  const router = useRouter();

  const isOverlay = variant === 'overlay';
  const logoSrc = isOverlay ? '/assets/logo-white.png' : '/assets/logo-black.png';
  const wrapperClasses = isOverlay
    ? 'absolute top-0 inset-x-0 z-30 text-bg'
    : 'sticky top-0 z-30 bg-bg text-ink border-b border-divider';

  useEffect(() => {
    const term = searchTerm.trim();
    if (!searchOpen || !term) {
      setResultCount(null);
      return;
    }
    const timer = setTimeout(() => {
      api
        .getProducts({ q: term, pageSize: 1 })
        .then((res) => setResultCount(res.count))
        .catch(() => setResultCount(null));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, searchOpen]);

  function doSearch() {
    router.push(`/shop?q=${encodeURIComponent(searchTerm)}`);
    setSearchOpen(false);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    doSearch();
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchTerm('');
    setResultCount(null);
  }

  function suggestGender(href: string) {
    router.push(href);
    closeSearch();
  }

  return (
    <>
      <header className={wrapperClasses}>
        <div className="container-px flex items-center justify-between py-5 md:py-6">
          {/* Mobile: hamburger, then logo, then bag */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex h-6 w-6 items-center justify-center"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <Link href="/" className="md:mr-12 flex-shrink-0 relative -top-px">
            <Image src={logoSrc} alt="JaneDeraa" height={28} width={140} className="h-[22px] md:h-7 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8 mr-auto text-[12px] uppercase tracking-label">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="pb-1 border-b border-transparent hover:border-current transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-7 text-[12px] uppercase tracking-label">
            <Link href="/journal" className="hover:opacity-70 transition-opacity">
              Journal
            </Link>
            <button type="button" aria-label="Search" onClick={() => setSearchOpen((v) => !v)} className="hover:opacity-70 transition-opacity">
              <SearchIcon className="h-4 w-4" />
            </button>
            <Link href="/account" aria-label="Account" className="hover:opacity-70 transition-opacity">
              <UserIcon className="h-4 w-4" />
            </Link>
            <button type="button" aria-label="Open bag" onClick={openCart} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              <BagIcon className="h-4 w-4" />
              <span>{count}</span>
            </button>
          </div>

          <button type="button" aria-label="Open bag" onClick={openCart} className="md:hidden text-[11px] uppercase tracking-label">
            Bag {count}
          </button>
        </div>

        {searchOpen && (
          <div className="border-t border-divider bg-bg text-ink">
            <form onSubmit={submitSearch} className="container-px flex items-center gap-4 pt-4">
              <SearchIcon className="h-4 w-4 text-ink-600 flex-shrink-0" />
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent outline-none font-display text-xl md:text-2xl"
              />
              <button type="button" onClick={closeSearch} className="text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700">
                Close
              </button>
            </form>

            <div className="container-px pb-4 pt-2">
              {resultCount !== null && (
                <div className="text-[11px] uppercase tracking-label text-ink-600 tabular-nums">{resultCount} results</div>
              )}

              {resultCount === 0 && (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="font-display text-xl md:text-2xl">Nothing matched that</div>
                  <p className="text-sm text-ink-700 font-light max-w-sm">
                    Try a shorter term, or browse a category below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {PRIMARY_LINKS.map((link) => (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => suggestGender(link.href)}
                        className="border border-divider hover:border-gold hover:text-gold-700 transition-colors px-5 py-2 text-[11px] uppercase tracking-label text-ink-700"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {resultCount !== null && resultCount > 0 && (
                <button
                  type="button"
                  onClick={doSearch}
                  className="mt-3 text-[11px] uppercase tracking-label text-gold-700 hover:text-ink transition-colors"
                >
                  View all results &rarr;
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-bg text-ink flex flex-col gap-2 px-5 py-6 md:hidden">
          <div className="flex items-center justify-between pb-6">
            <Image src="/assets/logo-black.png" alt="JaneDeraa" height={18} width={100} className="h-[18px] w-auto" />
            <button type="button" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-between py-5 border-b border-divider font-display text-2xl"
            >
              <span>{link.label}</span>
              <span className="text-sm text-ink-500">&rsaquo;</span>
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-3.5 text-[12px] uppercase tracking-label text-ink-700">
            <Link href="/account" onClick={() => setDrawerOpen(false)}>Account</Link>
            <Link href="/wishlist" onClick={() => setDrawerOpen(false)}>Wishlist</Link>
            <Link href="/stores" onClick={() => setDrawerOpen(false)}>Book an appointment</Link>
          </div>
        </div>
      )}
    </>
  );
}
