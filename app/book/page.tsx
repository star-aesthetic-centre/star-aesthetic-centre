import type { Metadata } from 'next';
import BookingWizard from './BookingWizard';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Book a Consultation in Durban North | Star Aesthetic Centre',
  description:
    'Book your consultation online with Dr. Rajeev Bangalee at Star Aesthetic Centre, Durban North. Choose your treatment, select a date and time, and confirm in minutes.',
  path: '/book',
  keywords: [
    'book aesthetic consultation Durban',
    'botox appointment Durban North',
    'Star Aesthetic Centre booking',
    'Dr Rajeev Bangalee consultation',
  ],
});

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <BookingWizard />
    </div>
  );
}
