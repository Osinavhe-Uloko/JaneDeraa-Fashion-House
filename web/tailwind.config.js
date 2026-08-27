/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // ---------------------------------------------------------------
      // Color — from the JaneDeraa brand guidelines (see project/JaneDeraa
      // Screens.dc.html, section "00 Brand Foundations"). Green carries the
      // brand blocks, gold is a stroke/rule only (never a fill), everything
      // else stays black / grey / white / ivory.
      // ---------------------------------------------------------------
      colors: {
        bg: '#F5F4F1',
        surface: '#E9E8E4',
        ink: {
          DEFAULT: '#111110',
          900: '#141413',
          800: '#2A2A28',
          700: '#4A4A47',
          600: '#6E6E6A',
          500: '#9A9A96',
          400: '#B7B7B7',
          300: '#CFCEC9',
          200: '#DEDDD9',
        },
        gold: {
          DEFAULT: '#AF8A2F',
          200: '#EBD9A9',
          300: '#D6BC72',
          400: '#C4A253',
          600: '#9A7828',
          700: '#7E6220',
        },
        green: {
          DEFAULT: '#1D4429',
          light: '#16351F',
          dark: '#102A18',
          // Near-black overlay tint used over hero photography (design source:
          // rgba(11,26,15,*)) — greener than a neutral ink scrim.
          overlay: '#0B1A0F',
        },
        divider: 'rgba(17, 17, 16, 0.14)',
        'divider-dark': 'rgba(245, 244, 241, 0.35)',

        // Desaturated status colors — used sparingly for form/order state, never a bright red/green.
        terracotta: '#A85C4A',
        forest: '#5C6E52',
      },

      // ---------------------------------------------------------------
      // Type — Montserrat (nav, labels, body) + Clash Display (hero
      // lines, section titles, product/collection names). Clash Display
      // is loaded from Fontshare in app/layout.tsx.
      // ---------------------------------------------------------------
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },

      // Desktop type scale lifted from the design screens; components clamp
      // down at the sm/md breakpoints per the "mobile scale" rule (H1 down to
      // ~36-44px, H2 to ~28-32px, body sizes held constant).
      fontSize: {
        'hero-mobile': ['40px', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'hero-tablet': ['56px', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'hero-desktop': ['76px', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-mobile': ['28px', { lineHeight: '1.15' }],
        'display-tablet': ['36px', { lineHeight: '1.12' }],
        'display-desktop': ['48px', { lineHeight: '1.1' }],
        'title-mobile': ['22px', { lineHeight: '1.25' }],
        'title-desktop': ['30px', { lineHeight: '1.2' }],
        label: ['11px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },

      letterSpacing: {
        label: '0.14em',
        'label-lg': '0.18em',
        'label-xl': '0.24em',
        'label-2xl': '0.28em',
      },

      // ---------------------------------------------------------------
      // Radius — buttons/inputs/tags use --radius-sm (2px), cards use
      // --radius-md (4px), modals/dialogs use --radius-lg (7px).
      // ---------------------------------------------------------------
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '7px',
      },

      // ---------------------------------------------------------------
      // Spacing — the design uses an 8pt system (8/16/24/32/48/64/96/
      // 128/144/160px), all of which already fall on Tailwind's default
      // 4px scale (e.g. p-20 = 80px, p-32 = 128px). These named aliases
      // just make the section rhythm explicit where it's used.
      // ---------------------------------------------------------------
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
        36: '9rem',
        40: '10rem',
      },

      maxWidth: {
        canvas: '1440px',
        prose: '680px',
      },

      boxShadow: {
        card: '0 1px 2px rgba(20, 20, 19, 0.08)',
        panel: '0 12px 32px rgba(20, 20, 19, 0.16)',
      },
    },
  },
  plugins: [],
};
