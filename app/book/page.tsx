import type { Metadata } from 'next';
import BookingWizard from './BookingWizard';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book your appointment online with Dr. Rajeev Bangalee at Star Aesthetic Medical Centre, Durban North. Choose your treatment, select a date and time, and confirm in minutes.',
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      {/* Page hero */}
      <div className="bg-[#0F2647] px-4 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#C8A882]">
          Star Aesthetic Medical Centre
        </p>
        <h1 className="font-[family-name:var(--font-roboto-condensed)] text-3xl font-light tracking-wide text-white sm:text-4xl">
          Book Your Appointment
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#939EBA]">
          Select your treatment, choose a date and time, and confirm — we'll send a confirmation
          straight to your inbox.
        </p>
      </div>

      {/* Wizard */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <BookingWizard />
      </div>
    </div>
  );
}
