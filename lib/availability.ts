/**
 * availability.ts
 *
 * Pure functions for computing available booking slots.
 * No Supabase imports here — keeps this testable and dependency-free.
 */

import {
  allSlots,
  lastValidStartHour,
  APPOINTMENT_TYPES,
} from './booking-config';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ExistingBooking {
  time_slot:    string;   // "HH:MM"
  slots_needed: number;
}

export interface SlotStatus {
  time:      string;   // "HH:MM"
  available: boolean;
  label:     string;   // e.g. "9:00 AM"
}

// ── Date helpers ───────────────────────────────────────────────────────────────

/** Returns true if the date is a Sunday (getDay() === 0). */
export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

/** Returns true if the date is a Saturday (getDay() === 6). */
export function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

/** Returns true if the date is bookable (Mon–Sat, not in the past). */
export function isBookableDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isSunday(date) && date >= today;
}

/**
 * Parse a "YYYY-MM-DD" string into a local Date at midnight.
 * Avoids the UTC offset trap of `new Date("YYYY-MM-DD")`.
 */
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Format a Date to "YYYY-MM-DD". */
export function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Convert "HH:MM" (24h) to "H:MM AM/PM" for display. */
export function formatSlotLabel(slot: string): string {
  const [hStr, mStr] = slot.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${ampm}`;
}

// ── Slot hour extraction ───────────────────────────────────────────────────────

function slotHour(slot: string): number {
  return parseInt(slot.split(':')[0], 10);
}

// ── Core availability logic ────────────────────────────────────────────────────

/**
 * Given a date string and treatment slug, returns all slots with
 * availability status — ready to render in the UI.
 *
 * @param dateStr        - "YYYY-MM-DD"
 * @param treatmentSlug  - slug from APPOINTMENT_TYPES
 * @param existingBookings - bookings already in the DB for that date
 */
export function computeAvailableSlots(
  dateStr: string,
  treatmentSlug: string,
  existingBookings: ExistingBooking[],
): SlotStatus[] {
  const date = parseLocalDate(dateStr);
  const sat   = isSaturday(date);

  const apt = APPOINTMENT_TYPES.find((a) => a.slug === treatmentSlug);
  const slotsNeeded = apt?.slotsNeeded ?? 1;

  const lastStart = lastValidStartHour(sat, slotsNeeded as 1 | 2);

  // Build set of occupied hour blocks from existing bookings
  // Each booking occupies hours [startHour, startHour + slotsNeeded - 1]
  const occupiedHours = new Set<number>();
  for (const b of existingBookings) {
    const startH = slotHour(b.time_slot);
    for (let i = 0; i < b.slots_needed; i++) {
      occupiedHours.add(startH + i);
    }
  }

  // Candidate start slots (all slots up to lastStart)
  const candidates = allSlots(sat).filter(
    (s) => slotHour(s) <= lastStart,
  );

  return candidates.map((slot): SlotStatus => {
    const startH = slotHour(slot);

    // A slot is available only if ALL blocks it needs are free
    let available = true;
    for (let i = 0; i < slotsNeeded; i++) {
      if (occupiedHours.has(startH + i)) {
        available = false;
        break;
      }
    }

    return {
      time:      slot,
      available,
      label:     formatSlotLabel(slot),
    };
  });
}

// ── Reference number generator ─────────────────────────────────────────────────

/** Generates a booking reference like SAC-20260320-A1B2 */
export function generateReference(dateStr: string): string {
  const compact = dateStr.replace(/-/g, '');
  const suffix = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SAC-${compact}-${suffix}`;
}
