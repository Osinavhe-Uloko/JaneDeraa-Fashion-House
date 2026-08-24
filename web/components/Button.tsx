import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'text';
type Tone = 'default' | 'inverted';

interface CommonProps {
  variant?: Variant;
  tone?: Tone;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

const VARIANT_CLASSES: Record<Variant, Record<Tone, string>> = {
  primary: {
    default: 'border border-gold text-gold-700 hover:bg-gold/10 active:bg-gold/20',
    inverted: 'border border-gold-300 text-gold-200 hover:bg-gold-300/15',
  },
  secondary: {
    default: 'border border-divider text-ink hover:border-gold',
    inverted: 'border border-divider-dark text-bg hover:border-gold-300',
  },
  text: {
    default: 'text-gold-700 hover:text-ink underline-offset-4 hover:underline',
    inverted: 'text-gold-200 hover:text-bg underline-offset-4 hover:underline',
  },
};

export default function Button({
  variant = 'primary',
  tone = 'default',
  fullWidth = false,
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const isBare = variant === 'text';
  const classes = [
    'inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-label-lg transition-colors',
    !isBare && 'rounded-sm px-8 py-4',
    isBare && 'py-1',
    fullWidth && 'w-full',
    VARIANT_CLASSES[variant][tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
