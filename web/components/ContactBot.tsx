'use client';

import { useState } from 'react';
import { ChatIcon, CloseIcon, WhatsAppIcon, InstagramIcon, MailIcon, PhoneIcon } from './icons';

const WHATSAPP_NUMBER = '2348147491992'; // digits only, country code first, no leading +
const INSTAGRAM_HANDLE = 'janederaa';
const EMAIL = 'hello@janederaa.com'; // placeholder — swap once a real address is confirmed
const PHONE_DISPLAY = '+234 814 749 1992';
const PHONE_TEL = '+2348147491992';

const DEFAULT_WHATSAPP_MESSAGE = "Hello JaneDeraa, I'd like to ask about ";

type ChannelId = 'whatsapp' | 'instagram' | 'email' | 'phone';

const CHANNELS: { id: ChannelId; label: string; sub: string; Icon: typeof WhatsAppIcon }[] = [
  { id: 'whatsapp', label: 'WhatsApp', sub: 'Write a message, we reply the same day', Icon: WhatsAppIcon },
  { id: 'instagram', label: 'Instagram', sub: `@${INSTAGRAM_HANDLE}`, Icon: InstagramIcon },
  { id: 'email', label: 'Email', sub: EMAIL, Icon: MailIcon },
  { id: 'phone', label: 'Call', sub: PHONE_DISPLAY, Icon: PhoneIcon },
];

export default function ContactBot() {
  const [open, setOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_WHATSAPP_MESSAGE);

  function close() {
    setOpen(false);
    setWhatsappOpen(false);
  }

  function handleChannel(id: ChannelId) {
    if (id === 'whatsapp') {
      setWhatsappOpen(true);
      return;
    }
    if (id === 'instagram') window.open(`https://instagram.com/${INSTAGRAM_HANDLE}`, '_blank', 'noopener,noreferrer');
    if (id === 'email') window.location.href = `mailto:${EMAIL}`;
    if (id === 'phone') window.location.href = `tel:${PHONE_TEL}`;
  }

  function sendWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    close();
    setMessage(DEFAULT_WHATSAPP_MESSAGE);
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[280px] sm:w-[320px] bg-bg border border-divider shadow-panel rounded-md flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-divider">
            <span className="text-[11px] uppercase tracking-label">Get in touch</span>
            <button type="button" aria-label="Close" onClick={close} className="text-ink-600 hover:text-gold-700">
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {!whatsappOpen ? (
            <div className="flex flex-col p-2">
              {CHANNELS.map(({ id, label, sub, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleChannel(id)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-sm hover:bg-surface transition-colors text-left"
                >
                  <span className="flex-shrink-0 h-9 w-9 rounded-full border border-divider flex items-center justify-center text-ink-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm">{label}</span>
                    <span className="text-xs text-ink-600">{sub}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-5">
              <button
                type="button"
                onClick={() => setWhatsappOpen(false)}
                className="self-start text-[11px] uppercase tracking-label text-ink-600 hover:text-gold-700"
              >
                &larr; Back
              </button>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-label text-ink-600">Your message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="border border-divider bg-transparent font-sans text-sm p-3 rounded-sm outline-none focus:border-gold transition-colors resize-none"
                />
              </label>
              <button
                type="button"
                onClick={sendWhatsApp}
                disabled={!message.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold text-gold-700 py-3 text-[11px] uppercase tracking-label-lg hover:bg-gold/10 transition-colors disabled:opacity-40"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Open in WhatsApp
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Close contact options' : 'Contact JaneDeraa'}
        onClick={() => (open ? close() : setOpen(true))}
        className="h-14 w-14 rounded-full bg-green text-bg flex items-center justify-center shadow-panel hover:opacity-90 transition-opacity"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5" />}
      </button>
    </div>
  );
}
