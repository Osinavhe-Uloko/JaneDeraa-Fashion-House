import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { AuthProvider } from '@/lib/auth-context';
import CartDrawer from '@/components/CartDrawer';
import ContactBot from '@/components/ContactBot';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'JaneDeraa — Timeless elegance in every stitch',
    template: '%s — JaneDeraa',
  },
  description:
    'JaneDeraa is a luxury fashion house for ready-to-wear, custom-made and bespoke garments. Classic lines, modern sensibility.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        {/* Clash Display isn't on next/font/google — it's a Fontshare exclusive, loaded the same way the design screens do. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <ContactBot />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
