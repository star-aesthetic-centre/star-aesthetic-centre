import type { Metadata } from 'next';
import BookingWizard from './BookingWizard';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book your appointment online with Dr. Rajeev Bangalee at Star Aesthetic Centre, Durban North. Choose your treatment, select a date and time, and confirm in minutes.',
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <BookingWizard />
    </div>
  );
}
