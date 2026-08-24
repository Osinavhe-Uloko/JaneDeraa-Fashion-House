import Link from 'next/link';

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="text-[11px] uppercase tracking-label text-ink-600">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? (
            <Link href={item.href} className="hover:text-gold-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </div>
  );
}
