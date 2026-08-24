import InquiryClient from '@/components/InquiryClient';

export const metadata = { title: 'Consultation Inquiry' };

export default function InquiryPage({ searchParams }: { searchParams: { type?: string } }) {
  const initialType = searchParams.type === 'bespoke' ? 'bespoke' : 'custom';
  return <InquiryClient initialType={initialType} />;
}
