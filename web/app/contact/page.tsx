import PageShell from '@/components/PageShell';
import ContactClient from '@/components/ContactClient';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <PageShell>
      <ContactClient />
    </PageShell>
  );
}
