import PageShell from '@/components/PageShell';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <PageShell>
      <div className="container-px py-32 md:py-44 flex flex-col items-center gap-7 text-center">
        <div className="font-display text-[88px] md:text-[140px] leading-none text-gold-300 tabular-nums">404</div>
        <h1 className="font-display text-2xl md:text-[34px]">This page is no longer here</h1>
        <p className="text-base font-light text-ink-700 max-w-md">The link may be old, or the piece may have sold. Both happen.</p>
        <div className="flex gap-4 mt-3">
          <Button href="/">Return to homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
