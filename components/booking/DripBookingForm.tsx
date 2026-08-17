"use client";

import { useEffect, useState } from "react";
import { DRIP_TYPES, type DripType } from "@/lib/drip-booking-config";

/**
 * Drip booking — deliberately one screen.
 *
 * Somebody booking a Party Drip feels rough right now. Every extra step is a
 * chance to give up, so drip, date, time and details all sit on one page and
 * the first available date is preselected.
 */

type Slot = { time: string; label: string; remaining: number; available: boolean };
type Booking = {
  reference: string;
  drip: string;
  date: string;
  timeLabel: string;
  firstName: string;
  email: string;
};

function dayLabel(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const today = new Date();
  const isToday =
    dt.getFullYear() === today.getFullYear() &&
    dt.getMonth() === today.getMonth() &&
    dt.getDate() === today.getDate();
  return {
    weekday: isToday ? "Today" : dt.toLocaleDateString("en-ZA", { weekday: "short" }),
    day: dt.getDate(),
    month: dt.toLocaleDateString("en-ZA", { month: "short" }),
    isToday,
  };
}

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Shown when the API gives us no usable reason — a crash, a timeout, or the
 * honeypot tripping on a real patient. "The booking could not be completed"
 * left people with nowhere to go; a phone number turns a dead end into a
 * booking the clinic can still take.
 */
const FALLBACK_ERROR =
  "We could not complete that booking online. Please call the clinic on 031 573 1325 and we will secure your slot.";

export default function DripBookingForm({ initialDrip }: { initialDrip?: string }) {
  const [drip, setDrip] = useState<DripType>(
    DRIP_TYPES.find((d) => d.slug === initialDrip) ?? DRIP_TYPES[0],
  );
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [time, setTime] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  // First load — get the bookable dates and select the earliest.
  useEffect(() => {
    fetch("/api/drip-bookings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { dates?: string[] }) => {
        if (d.dates?.length) {
          setDates(d.dates);
          setDate(d.dates[0]);
        }
      })
      .catch(() => setError("We could not load available dates. Please try again."));
  }, []);

  // Slots for the chosen date.
  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    setTime("");
    fetch(`/api/drip-bookings?date=${date}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { slots?: Slot[] }) => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [date]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!time) {
      setError("Please choose a time.");
      return;
    }
    setSubmitting(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/drip-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dripSlug: drip.slug,
          date,
          timeSlot: time,
          patientName: form.get("patientName"),
          patientEmail: form.get("patientEmail"),
          patientPhone: form.get("patientPhone"),
          notes: form.get("notes"),
          sac_hp_ref: form.get("sac_hp_ref"),
        }),
      });
      const data = (await res.json()) as { booking?: Booking; error?: string };
      if (!res.ok || !data.booking) throw new Error(data.error || FALLBACK_ERROR);
      setBooking(data.booking);
    } catch (err) {
      setError(err instanceof Error ? err.message : FALLBACK_ERROR);
      // A 409 means somebody took the slot — refresh so they can see what is left.
      fetch(`/api/drip-bookings?date=${date}`, { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { slots?: Slot[] }) => setSlots(d.slots ?? []))
        .catch(() => undefined);
    } finally {
      setSubmitting(false);
    }
  }

  if (booking) {
    return (
      <div className="border border-[#E2E2E6] bg-white p-8 text-center lg:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF0F6]">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#3F7D58]" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-heading mb-3 text-2xl font-bold text-[#1A1A1F]">
          {booking.firstName}, your drip is booked.
        </h2>
        <p className="mb-6 text-[#636374]">
          <strong className="text-[#1A1A1F]">{booking.drip}</strong>
          <br />
          {longDate(booking.date)} at {booking.timeLabel}
        </p>
        <p className="mb-2 text-sm text-[#636374]">
          Reference <strong className="text-[#1A1A1F]">{booking.reference}</strong>
        </p>
        <p className="text-sm text-[#636374]">
          Please arrive a few minutes early. If you need to change or cancel, call the clinic
          on <a className="font-semibold text-[#939EBA]" href="tel:+27315731325">031 573 1325</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* 1 — which drip */}
      <fieldset>
        <legend className="font-heading mb-4 text-lg font-bold text-[#1A1A1F]">
          1. Choose your drip
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DRIP_TYPES.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => setDrip(d)}
              aria-pressed={drip.slug === d.slug}
              className={`border p-4 text-left transition-colors ${
                drip.slug === d.slug
                  ? "border-[#0F2647] bg-[#0F2647] text-white"
                  : "border-[#E2E2E6] bg-white hover:border-[#939EBA]"
              }`}
            >
              <span className="block font-semibold">{d.title}</span>
              <span className={`mt-1 block text-sm ${drip.slug === d.slug ? "text-white/75" : "text-[#636374]"}`}>
                {d.price}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 2 — date */}
      <fieldset>
        <legend className="font-heading mb-4 text-lg font-bold text-[#1A1A1F]">
          2. Choose a day
        </legend>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((iso) => {
            const l = dayLabel(iso);
            const active = date === iso;
            return (
              <button
                key={iso}
                type="button"
                onClick={() => setDate(iso)}
                aria-pressed={active}
                className={`min-w-[4.5rem] shrink-0 border px-3 py-3 text-center transition-colors ${
                  active
                    ? "border-[#0F2647] bg-[#0F2647] text-white"
                    : "border-[#E2E2E6] bg-white hover:border-[#939EBA]"
                }`}
              >
                <span className={`block text-xs font-semibold ${l.isToday && !active ? "text-[#3F7D58]" : ""}`}>
                  {l.weekday}
                </span>
                <span className="block text-lg font-bold">{l.day}</span>
                <span className={`block text-xs ${active ? "text-white/70" : "text-[#636374]"}`}>{l.month}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 3 — time */}
      <fieldset>
        <legend className="font-heading mb-4 text-lg font-bold text-[#1A1A1F]">
          3. Choose a time
        </legend>
        {loadingSlots ? (
          <p className="text-sm text-[#636374]">Loading times…</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-[#636374]">No times available on this day. Please choose another.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slots.map((s) => (
              <button
                key={s.time}
                type="button"
                disabled={!s.available}
                onClick={() => setTime(s.time)}
                aria-pressed={time === s.time}
                className={`border px-3 py-3 text-sm font-semibold transition-colors ${
                  time === s.time
                    ? "border-[#0F2647] bg-[#0F2647] text-white"
                    : s.available
                      ? "border-[#E2E2E6] bg-white hover:border-[#939EBA]"
                      : "cursor-not-allowed border-[#F0F0F2] bg-[#FAFAFB] text-[#C0C0C8] line-through"
                }`}
              >
                {s.label}
                {s.available && s.remaining === 1 && (
                  <span className={`mt-0.5 block text-[11px] font-normal ${time === s.time ? "text-white/70" : "text-[#B4763A]"}`}>
                    1 chair left
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-[#636374]">
          Two chairs per slot — book two if you are bringing someone.
        </p>
      </fieldset>

      {/* 4 — details */}
      <fieldset>
        <legend className="font-heading mb-4 text-lg font-bold text-[#1A1A1F]">
          4. Your details
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1A1A1F]">Full name</span>
            <input name="patientName" required className="w-full border border-[#E2E2E6] px-4 py-3" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1A1A1F]">Mobile number</span>
            <input name="patientPhone" required type="tel" className="w-full border border-[#E2E2E6] px-4 py-3" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-[#1A1A1F]">Email</span>
            <input name="patientEmail" required type="email" className="w-full border border-[#E2E2E6] px-4 py-3" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-[#1A1A1F]">
              Anything we should know? <span className="font-normal text-[#636374]">(optional)</span>
            </span>
            <textarea name="notes" rows={3} className="w-full border border-[#E2E2E6] px-4 py-3" />
          </label>
        </div>

        {/* Honeypot. The name must carry NO meaning a browser or password
            manager recognises. This was "company_reference", and something on
            a real patient's browser filled it — autofill matches "company"
            regardless of autoComplete="off" — which silently failed their
            booking on 17 Aug 2026. pointer-events-none stops a stray click
            landing in it too. */}
        <input
          type="text"
          name="sac_hp_ref"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        />
      </fieldset>

      {error && (
        <p role="alert" className="border border-[#E7C6C6] bg-[#FDF4F4] p-4 text-sm text-[#9B3A3A]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-[#E2E2E6] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#636374]">
          {drip.title} · {date ? longDate(date) : "—"}
          {time ? ` · ${slots.find((s) => s.time === time)?.label}` : ""} · {drip.price}
        </p>
        <button
          type="submit"
          disabled={submitting || !time}
          className="bg-[#F3C969] px-10 py-4 text-base font-bold text-[#1A1A1F] transition-colors hover:bg-[#E8BC53] disabled:cursor-not-allowed disabled:bg-[#E2E2E6] disabled:text-[#9A9AA5]"
        >
          {submitting ? "Booking…" : "Confirm my drip"}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-[#636374]">
        Dr. Bangalee will confirm that IV therapy is appropriate for you before treatment. By
        booking, you agree that Star Aesthetic Centre may contact you about this appointment.
      </p>
    </form>
  );
}
