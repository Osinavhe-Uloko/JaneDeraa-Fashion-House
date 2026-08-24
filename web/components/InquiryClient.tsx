'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Field, TextAreaField } from './FormField';
import Button from './Button';

const STEP_LABELS = ['Contact', 'Garment', 'Preferences', 'Appointment', 'Review'];
const GARMENTS = ['Two-piece suit', 'Overcoat', 'Jacket', 'Trousers', 'Shirting', 'Something else'];
const OCCASIONS = ['Everyday', 'Business', 'Wedding', 'Black tie'];
const FABRICS = ['Wool', 'Cashmere', 'Linen', 'Silk', 'Undecided'];
const SLOTS = ['Weekday morning', 'Weekday afternoon', 'Saturday morning', 'At my address'];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  garmentType: string;
  occasion: string;
  fabricPreference: string;
  notes: string;
  appointmentPreference: string;
};

const EMPTY: FormState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  garmentType: '',
  occasion: '',
  fabricPreference: '',
  notes: '',
  appointmentPreference: '',
};

function ChipGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`border rounded-sm px-5 py-3.5 text-xs tracking-wide transition-colors ${
            value === o ? 'border-gold text-gold-700' : 'border-divider text-ink-700 hover:border-ink-400'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function InquiryClient({ initialType }: { initialType: 'custom' | 'bespoke' }) {
  const [step, setStep] = useState(1);
  const [type] = useState<'custom' | 'bespoke'>(initialType);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleNext() {
    if (step < 5) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await api.createInquiry({ type, ...form });
      setStep(6);
    } catch {
      setError('Something went wrong submitting your inquiry — please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  const reviewRows = [
    { k: 'Contact', v: [form.fullName, form.email, form.phone].filter(Boolean).join(' · ') || '—' },
    { k: 'Garment', v: [form.garmentType, form.occasion].filter(Boolean).join(' · ') || '—' },
    { k: 'Preference', v: form.fabricPreference || '—' },
    { k: 'Appointment', v: form.appointmentPreference || '—' },
  ];

  return (
    <div className="flex flex-col">
      <div className="container-px py-6 border-b border-divider">
        <span className="font-display text-lg">JaneDeraa</span>
        <span className="ml-4 text-[11px] uppercase tracking-label text-ink-600">
          {type === 'bespoke' ? 'Bespoke consultation' : 'Custom-Made inquiry'}
        </span>
      </div>

      {step <= 5 && (
        <div className="container-px pt-10 md:pt-14">
          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = n <= step;
              return (
                <div key={label} className={`flex flex-col gap-2 md:gap-2.5 pt-3 border-t-2 ${active ? 'border-gold' : 'border-divider'}`}>
                  <div className={`text-[10px] md:text-[11px] tracking-label tabular-nums ${active ? 'text-gold-700' : 'text-ink-500'}`}>
                    {String(n).padStart(2, '0')}
                  </div>
                  <div className={`hidden md:block text-xs uppercase tracking-label ${active ? 'text-gold-700' : 'text-ink-500'}`}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="container-px py-14 md:py-24 flex justify-center">
        <div className="w-full max-w-[680px] flex flex-col gap-10">
          {step === 1 && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3.5">
                <h1 className="font-display text-3xl md:text-[44px]">Your details</h1>
                <p className="text-base font-light text-ink-700">So we can confirm the appointment. We do not share these with anyone.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <Field label="Full name" placeholder="Name" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
                <Field label="Email" type="email" placeholder="name@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                <Field label="Phone" placeholder="+00 000 000 000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                <Field label="City" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-10">
              <h1 className="font-display text-3xl md:text-[44px]">What are we making?</h1>
              <div className="flex flex-col gap-4">
                <div className="text-[11px] uppercase tracking-label text-ink-600">Garment</div>
                <ChipGroup options={GARMENTS} value={form.garmentType} onChange={(v) => update('garmentType', v)} />
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-[11px] uppercase tracking-label text-ink-600">Occasion</div>
                <ChipGroup options={OCCASIONS} value={form.occasion} onChange={(v) => update('occasion', v)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-10">
              <h1 className="font-display text-3xl md:text-[44px]">Cloth and style</h1>
              <ChipGroup options={FABRICS} value={form.fabricPreference} onChange={(v) => update('fabricPreference', v)} />
              <TextAreaField
                label="Anything else we should know"
                placeholder="Optional"
                rows={4}
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-10">
              <h1 className="font-display text-3xl md:text-[44px]">When suits you?</h1>
              <div className="flex flex-col gap-3">
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update('appointmentPreference', slot)}
                    className={`border rounded-sm px-6 py-5 flex justify-between items-center text-base transition-colors ${
                      form.appointmentPreference === slot ? 'border-gold' : 'border-divider hover:border-ink-400'
                    }`}
                  >
                    <span>{slot}</span>
                    <span
                      className={`h-3.5 w-3.5 rounded-full border block ${
                        form.appointmentPreference === slot ? 'border-gold bg-gold' : 'border-ink-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-10">
              <h1 className="font-display text-3xl md:text-[44px]">Review</h1>
              <div className="flex flex-col border-t border-divider">
                {reviewRows.map((r) => (
                  <div key={r.k} className="grid grid-cols-[120px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-6 py-5 border-b border-divider items-baseline">
                    <div className="text-[11px] uppercase tracking-label text-ink-600">{r.k}</div>
                    <div className="text-sm md:text-base text-ink-800">{r.v}</div>
                  </div>
                ))}
              </div>
              {error && <div className="text-sm text-terracotta">{error}</div>}
            </div>
          )}

          {step === 6 && (
            <div className="flex flex-col gap-6 items-center text-center py-12 md:py-16">
              <div className="h-12 w-12 md:h-14 md:w-14 border border-gold rounded-full flex items-center justify-center text-gold-700 text-xl">
                &#10003;
              </div>
              <h1 className="font-display text-3xl md:text-[46px]">Thank you</h1>
              <p className="text-base md:text-[17px] font-light leading-relaxed text-ink-700 max-w-md">
                A cutter will write within two working days to confirm a time. Your reference is on its way by email.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setForm(EMPTY);
                  setStep(1);
                }}
              >
                Start again
              </Button>
            </div>
          )}

          {step <= 5 && (
            <div className="flex items-center justify-between border-t border-divider pt-7">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="text-[11px] uppercase tracking-label text-ink-700 hover:text-gold-700 disabled:opacity-30 disabled:pointer-events-none"
              >
                &larr; Back
              </button>
              <Button onClick={handleNext} disabled={submitting}>
                {submitting ? 'Submitting…' : step === 5 ? 'Submit' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
