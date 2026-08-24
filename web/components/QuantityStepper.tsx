export default function QuantityStepper({
  qty,
  onInc,
  onDec,
  size = 'md',
}: {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  size?: 'sm' | 'md';
}) {
  const pad = size === 'sm' ? 'px-3 py-1.5 text-[13px]' : 'px-3.5 py-2 text-sm';
  return (
    <div className="flex items-center border border-divider w-fit">
      <button type="button" onClick={onDec} aria-label="Decrease quantity" className={`${pad} hover:text-gold-700 transition-colors`}>
        &minus;
      </button>
      <span className={`${pad} border-x border-divider tabular-nums`}>{qty}</span>
      <button type="button" onClick={onInc} aria-label="Increase quantity" className={`${pad} hover:text-gold-700 transition-colors`}>
        +
      </button>
    </div>
  );
}
