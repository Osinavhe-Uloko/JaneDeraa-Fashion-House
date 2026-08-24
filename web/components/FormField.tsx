import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type FieldProps = { label: string; className?: string } & InputHTMLAttributes<HTMLInputElement>;

export function Field({ label, className = '', id, name, ...rest }: FieldProps) {
  const fieldId = id || name || slugify(label);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={fieldId} className="text-[11px] uppercase tracking-label text-ink-600">
        {label}
      </label>
      <input
        id={fieldId}
        name={name || fieldId}
        {...rest}
        className="border-0 border-b border-divider bg-transparent font-sans text-base py-2.5 outline-none focus:border-gold transition-colors placeholder:text-ink-500"
      />
    </div>
  );
}

type TextAreaProps = { label: string; className?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, className = '', id, name, ...rest }: TextAreaProps) {
  const fieldId = id || name || slugify(label);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={fieldId} className="text-[11px] uppercase tracking-label text-ink-600">
        {label}
      </label>
      <textarea
        id={fieldId}
        name={name || fieldId}
        {...rest}
        className="border border-divider bg-transparent font-sans text-base p-3.5 rounded-sm outline-none focus:border-gold transition-colors resize-y placeholder:text-ink-500"
      />
    </div>
  );
}
