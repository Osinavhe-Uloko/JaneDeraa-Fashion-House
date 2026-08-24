export default function Tag({
  children,
  tone = 'outline',
}: {
  children: React.ReactNode;
  tone?: 'outline' | 'solid';
}) {
  if (!children) return null;

  const classes =
    tone === 'outline'
      ? 'border border-gold text-gold-700 bg-transparent'
      : 'bg-ink-200 text-ink-800';

  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-label px-2.5 py-1 ${classes}`}>
      {children}
    </span>
  );
}
