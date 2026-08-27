// Thin-line icon set (1.5px stroke) — bag, heart, search, account, menu, close,
// chevron, chat, WhatsApp, Instagram, mail, phone.
type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function HeartIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? 'currentColor' : 'none'} className={className}>
      <path d="M12 20.5s-7-4.35-9.5-8.7C.9 8.4 2.3 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5c3.3 0 4.7 3.4 3.1 6.8C19 16.15 12 20.5 12 20.5Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4v-11Z" />
      <path d="M8 10h8M8 13.5h5" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l1.3-3.9A7.9 7.9 0 1 1 8.6 19L4 20Z" />
      <path d="M9 9.8c0 3 2.2 5.2 5.2 5.2.5 0 1-.5.9-1l-.2-.9a.7.7 0 0 0-.7-.5l-1.3.2c-.9-.5-1.7-1.3-2.2-2.2l.2-1.3a.7.7 0 0 0-.5-.7l-.9-.2c-.5-.1-1 .4-1 .9v.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5c.6 1.6 1.1 2.9 1.9 4.2a1 1 0 0 1-.2 1.3L6.2 10.6a11.3 11.3 0 0 0 5.2 5.2l1.6-1.5a1 1 0 0 1 1.3-.2c1.3.8 2.6 1.3 4.2 1.9.6.2 1 .8.9 1.5l-.4 2a1.4 1.4 0 0 1-1.5 1.1C9.9 20 4 14.1 3.5 6.4A1.4 1.4 0 0 1 4.6 4.9l2-.4c.7-.1 1.3.3 1.4.9Z" />
    </svg>
  );
}
