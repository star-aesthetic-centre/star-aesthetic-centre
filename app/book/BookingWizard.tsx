'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Check, Loader2, CalendarDays, Clock, User, Stethoscope } from 'lucide-react';
import { APPOINTMENT_TYPES, appointmentsByCategory, AppointmentType } from '@/lib/booking-config';
import {
  formatDateStr,
  formatSlotLabel,
  isBookableDate,
  isSunday,
} from '@/lib/availability';
import type { SlotStatus } from '@/lib/availability';

// ── Step indicator ─────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Treatment',  icon: Stethoscope },
  { label: 'Date',       icon: CalendarDays },
  { label: 'Time',       icon: Clock },
  { label: 'Your Details', icon: User },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  done
                    ? 'border-[#C8A882] bg-[#C8A882]'
                    : active
                    ? 'border-[#0F2647] bg-[#0F2647]'
                    : 'border-[#E5E4E0] bg-white'
                }`}
              >
                {done ? (
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <Icon
                    size={15}
                    className={active ? 'text-white' : 'text-[#6B6966]'}
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <span
                className={`hidden text-[10px] font-semibold uppercase tracking-widest sm:block ${
                  active ? 'text-[#0F2647]' : done ? 'text-[#C8A882]' : 'text-[#6B6966]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-1 h-px w-10 sm:w-16 transition-colors duration-300 ${
                  i < current ? 'bg-[#C8A882]' : 'bg-[#E5E4E0]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1 — Treatment selection ───────────────────────────────────────────────

const CATEGORY_ORDER = ['Assessment', 'Face', 'Skin', 'Body & Wellness'] as const;

function Step1Treatment({
  selected,
  onSelect,
}: {
  selected: AppointmentType | null;
  onSelect: (apt: AppointmentType) => void;
}) {
  const grouped = appointmentsByCategory();

  return (
    <div>
      <h2 className="mb-1 text-xl font-light text-[#1A1917]">Select your treatment</h2>
      <p className="mb-8 text-sm text-[#6B6966]">
        Not sure? Book a <button
          onClick={() => onSelect(APPOINTMENT_TYPES[0])}
          className="text-[#C8A882] underline underline-offset-2 hover:text-[#A08060]"
        >
          free 15-minute consultation
        </button>.
      </p>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((cat) => {
          const apts = grouped[cat];
          if (!apts?.length) return null;
          return (
            <div key={cat}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-[#0F2647]">
                {cat}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {apts.map((apt) => {
                  const isSelected = selected?.slug === apt.slug;
                  return (
                    <button
                      key={apt.slug}
                      onClick={() => onSelect(apt)}
                      className={`group flex flex-col gap-0.5 rounded-none border p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#0F2647] bg-[#0F2647] text-white'
                          : 'border-[#E5E4E0] bg-white hover:border-[#C8A882] hover:bg-[#FDFCFB]'
                      }`}
                    >
                      <span
                        className={`text-sm font-medium leading-snug ${
                          isSelected ? 'text-white' : 'text-[#1A1917]'
                        }`}
                      >
                        {apt.title}
                      </span>
                      <span
                        className={`text-xs ${
                          isSelected ? 'text-[#939EBA]' : 'text-[#6B6966]'
                        }`}
                      >
                        {apt.duration}
                      </span>
                      <span
                        className={`mt-1 text-xs font-medium ${
                          isSelected ? 'text-[#C8A882]' : 'text-[#C8A882]'
                        }`}
                      >
                        {apt.priceFrom}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2 — Date picker (custom calendar) ─────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function Step2Date({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  // Max bookable date: 90 days from today
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  function cellDate(day: number): Date {
    return new Date(viewYear, viewMonth, day);
  }

  function isDisabled(day: number): boolean {
    const d = cellDate(day);
    return !isBookableDate(d) || d > maxDate;
  }

  function isSelected(day: number): boolean {
    const d = cellDate(day);
    return formatDateStr(d) === selected;
  }

  function isToday(day: number): boolean {
    const d = cellDate(day);
    return formatDateStr(d) === formatDateStr(today);
  }

  // Can we go back? Don't allow navigating before today's month
  const canGoBack =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  // Can we go forward? Max 3 months ahead
  const maxMonth = new Date(today);
  maxMonth.setMonth(maxMonth.getMonth() + 3);
  const canGoForward =
    viewYear < maxMonth.getFullYear() ||
    (viewYear === maxMonth.getFullYear() && viewMonth < maxMonth.getMonth());

  return (
    <div>
      <h2 className="mb-1 text-xl font-light text-[#1A1917]">Choose a date</h2>
      <p className="mb-8 text-sm text-[#6B6966]">
        Mon–Fri: 9 AM – 5 PM &nbsp;·&nbsp; Saturday: 9 AM – 1 PM &nbsp;·&nbsp; Closed Sundays
      </p>

      <div className="rounded-none border border-[#E5E4E0] bg-white">
        {/* Month nav */}
        <div className="flex items-center justify-between border-b border-[#E5E4E0] px-5 py-4">
          <button
            onClick={prevMonth}
            disabled={!canGoBack}
            className="flex h-8 w-8 items-center justify-center text-[#6B6966] transition-colors hover:text-[#0F2647] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold text-[#1A1917]">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            disabled={!canGoForward}
            className="flex h-8 w-8 items-center justify-center text-[#6B6966] transition-colors hover:text-[#0F2647] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next month"
          >
            <ChevronLeft size={18} className="rotate-180" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[#E5E4E0]">
          {DAYS.map((d) => (
            <div
              key={d}
              className={`py-2.5 text-center text-[10px] font-semibold uppercase tracking-widest ${
                d === 'Sun' ? 'text-[#E5E4E0]' : 'text-[#6B6966]'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="h-10" />;
            }
            const disabled = isDisabled(day);
            const selected = isSelected(day);
            const today_   = isToday(day);
            const sunday   = isSunday(cellDate(day));

            return (
              <button
                key={day}
                onClick={() => !disabled && onSelect(formatDateStr(cellDate(day)))}
                disabled={disabled}
                className={`flex h-10 items-center justify-center text-sm transition-colors ${
                  selected
                    ? 'bg-[#0F2647] font-semibold text-white'
                    : today_ && !disabled
                    ? 'font-semibold text-[#C8A882] hover:bg-[#F8F8F7]'
                    : disabled || sunday
                    ? 'cursor-not-allowed text-[#E5E4E0]'
                    : 'text-[#1A1917] hover:bg-[#F8F8F7] hover:text-[#0F2647]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <p className="mt-4 text-sm text-[#6B6966]">
          Selected:{' '}
          <span className="font-medium text-[#1A1917]">
            {new Date(selected + 'T00:00:00').toLocaleDateString('en-ZA', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
        </p>
      )}
    </div>
  );
}

// ── Step 3 — Time slot picker ──────────────────────────────────────────────────

function Step3Time({
  date,
  treatmentSlug,
  selected,
  onSelect,
}: {
  date:          string;
  treatmentSlug: string;
  selected:      string | null;
  onSelect:      (slot: string) => void;
}) {
  const [slots,   setSlots]   = useState<SlotStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/bookings/available-slots?date=${date}&treatment=${treatmentSlug}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load slots');
      setSlots(data.slots);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load available times.');
    } finally {
      setLoading(false);
    }
  }, [date, treatmentSlug]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const availableCount = slots.filter((s) => s.available).length;

  return (
    <div>
      <h2 className="mb-1 text-xl font-light text-[#1A1917]">Select a time</h2>
      <p className="mb-8 text-sm text-[#6B6966]">
        {date &&
          new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[#6B6966]">
          <Loader2 size={15} className="animate-spin text-[#C8A882]" />
          Loading available times…
        </div>
      )}

      {error && (
        <div className="rounded-none border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
          <button onClick={fetchSlots} className="ml-3 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {availableCount === 0 ? (
            <div className="rounded-none border border-[#E5E4E0] bg-white p-8 text-center">
              <p className="text-sm text-[#6B6966]">
                No slots available on this date. Please choose another day.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && onSelect(slot.time)}
                    disabled={!slot.available}
                    className={`rounded-none border py-3 text-sm font-medium transition-all duration-150 ${
                      selected === slot.time
                        ? 'border-[#0F2647] bg-[#0F2647] text-white'
                        : slot.available
                        ? 'border-[#E5E4E0] bg-white text-[#1A1917] hover:border-[#C8A882] hover:bg-[#FDFCFB]'
                        : 'cursor-not-allowed border-[#F2F1EF] bg-[#F8F8F7] text-[#C8C7C4] line-through'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#6B6966]">
                {availableCount} slot{availableCount !== 1 ? 's' : ''} available
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ── Step 4 — Contact details + summary ────────────────────────────────────────

interface ContactState {
  name:  string;
  email: string;
  phone: string;
  notes: string;
}

function Step4Contact({
  apt,
  date,
  timeSlot,
  contact,
  onChange,
  onSubmit,
  submitting,
  submitError,
}: {
  apt:         AppointmentType;
  date:        string;
  timeSlot:    string;
  contact:     ContactState;
  onChange:    (field: keyof ContactState, value: string) => void;
  onSubmit:    () => void;
  submitting:  boolean;
  submitError: string | null;
}) {
  const dateDisplay = new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const timeDisplay = formatSlotLabel(timeSlot);
  const endHour     = parseInt(timeSlot.split(':')[0], 10) + apt.slotsNeeded;
  const endDisplay  = formatSlotLabel(`${String(endHour).padStart(2, '0')}:00`);

  const valid = contact.name.trim() && contact.email.trim() && contact.phone.trim();

  return (
    <div>
      <h2 className="mb-1 text-xl font-light text-[#1A1917]">Your details</h2>
      <p className="mb-8 text-sm text-[#6B6966]">We'll send your confirmation to your email address.</p>

      {/* Booking summary */}
      <div className="mb-8 border border-[#E5E4E0] bg-white p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-[#0F2647]">
          Booking Summary
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#6B6966]">Treatment</span>
            <span className="text-right font-medium text-[#1A1917]">{apt.title}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#6B6966]">Date</span>
            <span className="text-right font-medium text-[#1A1917]">{dateDisplay}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#6B6966]">Time</span>
            <span className="text-right font-medium text-[#1A1917]">
              {timeDisplay} – {endDisplay}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#6B6966]">Location</span>
            <span className="text-right font-medium text-[#1A1917]">22 Ennisdale Drive, Durban North</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#1A1917]">
            Full Name <span className="text-[#C8A882]">*</span>
          </label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-none border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder-[#C8C7C4] outline-none transition-colors focus:border-[#0F2647]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#1A1917]">
            Email Address <span className="text-[#C8A882]">*</span>
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-none border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder-[#C8C7C4] outline-none transition-colors focus:border-[#0F2647]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#1A1917]">
            Phone Number <span className="text-[#C8A882]">*</span>
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+27 76 000 0000"
            className="w-full rounded-none border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder-[#C8C7C4] outline-none transition-colors focus:border-[#0F2647]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#1A1917]">
            Notes / Special Requests{' '}
            <span className="font-normal normal-case tracking-normal text-[#6B6966]">(optional)</span>
          </label>
          <textarea
            value={contact.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Any allergies, medical conditions, or questions for Dr. Bangalee…"
            rows={3}
            className="w-full rounded-none border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder-[#C8C7C4] outline-none transition-colors focus:border-[#0F2647] resize-none"
          />
        </div>
      </div>

      {submitError && (
        <div className="mt-4 rounded-none border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={!valid || submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-[#0F2647] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1B3D6E] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Confirming…
          </>
        ) : (
          'Confirm Booking'
        )}
      </button>

      <p className="mt-3 text-center text-xs text-[#6B6966]">
        By confirming you agree to our{' '}
        <a href="/legal/terms-and-conditions" className="underline hover:text-[#1A1917]">
          Terms & Conditions
        </a>
        . A confirmation email will be sent immediately.
      </p>
    </div>
  );
}

// ── Confirmation screen ────────────────────────────────────────────────────────

function ConfirmationScreen({
  reference,
  apt,
  date,
  timeSlot,
  patientName,
}: {
  reference:   string;
  apt:         AppointmentType;
  date:        string;
  timeSlot:    string;
  patientName: string;
}) {
  const dateDisplay = new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const timeDisplay = formatSlotLabel(timeSlot);
  const endHour     = parseInt(timeSlot.split(':')[0], 10) + apt.slotsNeeded;
  const endDisplay  = formatSlotLabel(`${String(endHour).padStart(2, '0')}:00`);

  return (
    <div className="text-center">
      {/* Checkmark */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2647]">
        <Check size={28} className="text-[#C8A882]" strokeWidth={2} />
      </div>

      <p className="mb-1 text-xs font-semibold uppercase tracking-[3px] text-[#C8A882]">
        Booking Confirmed
      </p>
      <h2 className="mb-2 text-2xl font-light text-[#1A1917]">
        See you soon, {patientName.split(' ')[0]}
      </h2>
      <p className="mb-8 text-sm text-[#6B6966]">
        A confirmation has been sent to your email address.
      </p>

      {/* Summary card */}
      <div className="mb-8 border border-[#E5E4E0] bg-white p-6 text-left">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#0F2647]">
            Consultation Details
          </p>
          <span className="rounded-none bg-[#F8F8F7] px-3 py-1 text-xs font-mono font-semibold text-[#6B6966]">
            {reference}
          </span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-[#F2F1EF] pb-3">
            <span className="text-[#6B6966]">Treatment</span>
            <span className="text-right font-medium text-[#1A1917]">{apt.title}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#F2F1EF] pb-3">
            <span className="text-[#6B6966]">Date</span>
            <span className="text-right font-medium text-[#1A1917]">{dateDisplay}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#F2F1EF] pb-3">
            <span className="text-[#6B6966]">Time</span>
            <span className="text-right font-medium text-[#1A1917]">
              {timeDisplay} – {endDisplay}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#6B6966]">Location</span>
            <span className="text-right font-medium text-[#1A1917]">
              22 Ennisdale Drive<br />Durban North, 4051
            </span>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-[#6B6966]">
        Need to reschedule? Contact us at least 24 hours in advance on{' '}
        <a href="tel:+27315731325" className="font-medium text-[#1A1917] hover:text-[#C8A882]">
          +27 (0)31 573 1325
        </a>{' '}
        or via{' '}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')}`}
          className="font-medium text-[#1A1917] hover:text-[#C8A882]"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        .
      </p>

      <a
        href="/"
        className="inline-block bg-[#0F2647] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1B3D6E]"
      >
        Back to Home
      </a>
    </div>
  );
}

// ── Main wizard ────────────────────────────────────────────────────────────────

export default function BookingWizard() {
  const [step, setStep]             = useState(0);
  const [apt,  setApt]              = useState<AppointmentType | null>(null);
  const [date, setDate]             = useState<string | null>(null);
  const [slot, setSlot]             = useState<string | null>(null);
  const [contact, setContact]       = useState<ContactState>({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference]   = useState<string | null>(null);

  function handleContactChange(field: keyof ContactState, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
  }

  // When treatment changes, reset date/slot
  function handleSelectTreatment(a: AppointmentType) {
    setApt(a);
    setDate(null);
    setSlot(null);
  }

  // When date changes, reset slot
  function handleSelectDate(d: string) {
    setDate(d);
    setSlot(null);
  }

  async function handleSubmit() {
    if (!apt || !date || !slot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/bookings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          treatmentSlug: apt.slug,
          date,
          timeSlot:      slot,
          patientName:   contact.name,
          patientEmail:  contact.email,
          patientPhone:  contact.phone,
          notes:         contact.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setReference(data.reference);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const confirmed = !!(reference && apt && date && slot);

  // Confirmation screen (no step indicator)
  if (confirmed && apt && date && slot) {
    return (
      <>
        <div className="bg-[#0F2647] px-4 py-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#C8A882]">
            Star Aesthetic Centre
          </p>
          <h1 className="font-[family-name:var(--font-roboto-condensed)] text-3xl font-light tracking-wide text-white sm:text-4xl">
            Consultation Confirmed
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#939EBA]">
            A confirmation has been sent to your email address.
          </p>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="rounded-none border border-[#E5E4E0] bg-white p-8 sm:p-12">
            <ConfirmationScreen
              reference={reference!}
              apt={apt}
              date={date}
              timeSlot={slot}
              patientName={contact.name}
            />
          </div>
        </div>
      </>
    );
  }

  const canAdvance = [
    !!apt,
    !!date,
    !!slot,
    !!(contact.name && contact.email && contact.phone),
  ];

  return (
    <>
      <div className="bg-[#0F2647] px-4 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#C8A882]">
          Star Aesthetic Centre
        </p>
        <h1 className="font-[family-name:var(--font-roboto-condensed)] text-3xl font-light tracking-wide text-white sm:text-4xl">
          Book Your Consultation
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#939EBA]">
          Select your treatment, choose a date and time, and confirm — we'll send a confirmation
          straight to your inbox.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <div className="rounded-none border border-[#E5E4E0] bg-white p-6 sm:p-10">
      <StepIndicator current={step} />

      {/* Step content */}
      <div className="min-h-[320px]">
        {step === 0 && (
          <Step1Treatment selected={apt} onSelect={handleSelectTreatment} />
        )}
        {step === 1 && (
          <Step2Date selected={date} onSelect={handleSelectDate} />
        )}
        {step === 2 && apt && date && (
          <Step3Time
            date={date}
            treatmentSlug={apt.slug}
            selected={slot}
            onSelect={setSlot}
          />
        )}
        {step === 3 && apt && date && slot && (
          <Step4Contact
            apt={apt}
            date={date}
            timeSlot={slot}
            contact={contact}
            onChange={handleContactChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>

      {/* Navigation (not shown on step 3 — it has its own submit button) */}
      {step < 3 && (
        <div className="mt-10 flex items-center justify-between border-t border-[#F2F1EF] pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`flex items-center gap-1.5 text-sm text-[#6B6966] transition-colors hover:text-[#1A1917] ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft size={15} />
            Back
          </button>

          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance[step]}
            className="bg-[#0F2647] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1B3D6E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 2 ? 'Continue' : 'Next'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 flex justify-start border-t border-[#F2F1EF] pt-6">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-1.5 text-sm text-[#6B6966] transition-colors hover:text-[#1A1917]"
          >
            <ChevronLeft size={15} />
            Back
          </button>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
