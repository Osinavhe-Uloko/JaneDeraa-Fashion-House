'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabaseClient';
import { Field } from './FormField';
import Button from './Button';

export default function AuthForm({ mode }: { mode: 'signin' | 'register' }) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setNotice('');

    const result = mode === 'signin' ? await signIn(email, password) : await signUp(email, password, fullName);

    if (result.error) {
      setError(result.error);
    } else if (mode === 'register') {
      setNotice('Check your email to confirm your account.');
    } else {
      router.push('/account');
    }
    setSubmitting(false);
  }

  async function handleForgotPassword() {
    if (!email) {
      setError('Enter your email above first, then click Forgot password.');
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    setNotice(resetError ? '' : `Password reset link sent to ${email}.`);
    if (resetError) setError(resetError.message);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-0px)]">
      <div className="relative hidden md:block">
        <Image src="https://picsum.photos/seed/jd-auth-editorial/1000/1200" alt="" fill sizes="50vw" className="object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center gap-9 px-6 py-16 md:px-24">
        <Link href="/" className="self-start md:self-center">
          <Image src="/assets/logo-black.png" alt="JaneDeraa" height={23} width={120} className="h-[22px] w-auto" />
        </Link>

        <div className="flex gap-8 justify-center">
          <Link
            href="/login"
            className={`text-[11px] uppercase tracking-label pb-2.5 border-b ${mode === 'signin' ? 'border-gold text-gold-700' : 'border-divider text-ink-600'}`}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className={`text-[11px] uppercase tracking-label pb-2.5 border-b ${mode === 'register' ? 'border-gold text-gold-700' : 'border-divider text-ink-600'}`}
          >
            Create account
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-7">
          <Field label="Email" type="email" required placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode === 'register' && (
            <Field label="Full name" required placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          )}
          <div className="flex flex-col gap-2">
            <Field label="Password" type="password" required minLength={6} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            {mode === 'signin' && (
              <button type="button" onClick={handleForgotPassword} className="self-end text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700">
                Forgot password
              </button>
            )}
          </div>

          {error && <div className="text-sm text-terracotta">{error}</div>}
          {notice && <div className="text-sm text-forest">{notice}</div>}

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
          <p className="text-xs leading-relaxed text-ink-600 text-center">
            An account keeps your measurements, orders and wishlist in one place.
          </p>
        </form>
      </div>
    </div>
  );
}
