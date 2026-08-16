/**
 * Vitamin Drip booking — deliberately separate from the main appointment engine.
 *
 * The drip lounge has two chairs and does not consume Dr. Bangalee's treatment
 * room, so it books on different rules to everything else on the site:
 *
 *   - TWO bookings per hourly slot (the main engine allows one).
 *   - Slots on the hour only. An hour gives time to settle, place the cannula
 *     and run the infusion without overlapping the next pair.
 *   - Last booking at 16:00, so the final drip finishes before the clinic closes.
 *   - SAME-DAY booking is the point. Somebody who feels rough this morning must
 *     be able to book for later this morning.
 *
 * Kept in its own file and its own table so a change here can never affect
 * treatment appointments.
 */

export const DRIP_FIRST_SLOT_HOUR = 9;   // 09:00
export const DRIP_LAST_SLOT_HOUR = 16;   // 16:00 — last drip of the day
export const DRIP_SATURDAY_LAST_SLOT_HOUR = 12; // clinic closes at 13:00

/** Two chairs in the drip lounge. */
export const DRIP_CAPACITY_PER_SLOT = 2;

/** How soon someone may book. Short by design — this is a same-day service. */
export const DRIP_MIN_LEAD_MINUTES = 15;

/** How far ahead the calendar runs. */
export const DRIP_DAYS_AHEAD = 21;

export type DripType = {
  slug: string;
  title: string;
  shortTitle: string;
  price: string;
  /** Treatment page this drip is described on. */
  path: string;
};

/** The bookable drips. Prices mirror the treatment pages. */
export const DRIP_TYPES: DripType[] = [
  {
    slug: "party-recovery-drip",
    title: "Party Recovery Drip",
    shortTitle: "Party",
    price: "R 1,465",
    path: "/treatments/body-wellness/party-recovery-drip",
  },
  {
    slug: "hydration-vitamin-drip",
    title: "Hydration Vitamin Drip",
    shortTitle: "Hydration",
    price: "R 1,265",
    path: "/treatments/body-wellness/hydration-vitamin-drip",
  },
  {
    slug: "fitness-vitamin-drip",
    title: "Fitness & Recovery Drip",
    shortTitle: "Fitness",
    price: "R 1,620",
    path: "/treatments/body-wellness/fitness-vitamin-drip",
  },
  {
    slug: "glutathione-brightening-drip",
    title: "Glutathione & Vitamin C Drip",
    shortTitle: "Glutathione",
    price: "R 1,070",
    path: "/treatments/body-wellness/glutathione-brightening-drip",
  },
  {
    slug: "ultimate-vitamin-drip",
    title: "Ultimate Vitamin Drip",
    shortTitle: "Ultimate",
    price: "R 1,870",
    path: "/treatments/body-wellness/ultimate-vitamin-drip",
  },
];

export function getDripType(slug: string): DripType | undefined {
  return DRIP_TYPES.find((d) => d.slug === slug);
}

/** "2026-08-16" → Date in local (SAST) terms, avoiding UTC drift. */
function parseDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isSunday(date: string): boolean {
  return parseDate(date).getDay() === 0;
}

export function isSaturday(date: string): boolean {
  return parseDate(date).getDay() === 6;
}

/** Hourly slot starts for a given date. Empty on Sundays — clinic is closed. */
export function dripSlotsForDate(date: string): string[] {
  if (isSunday(date)) return [];
  const last = isSaturday(date) ? DRIP_SATURDAY_LAST_SLOT_HOUR : DRIP_LAST_SLOT_HOUR;
  const slots: string[] = [];
  for (let h = DRIP_FIRST_SLOT_HOUR; h <= last; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

/** Has this slot already passed, or is it too close to now to be practical? */
export function isSlotInPast(date: string, time: string, now = new Date()): boolean {
  const [h, m] = time.split(":").map(Number);
  const start = parseDate(date);
  start.setHours(h, m, 0, 0);
  return start.getTime() - now.getTime() < DRIP_MIN_LEAD_MINUTES * 60 * 1000;
}

export type DripSlot = {
  time: string;
  label: string;
  remaining: number;
  available: boolean;
};

/** "14:00" → "2:00 PM" */
export function formatDripSlot(time: string): string {
  const [h] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${suffix}`;
}

/**
 * Availability for a date, given the bookings already taken.
 * Two chairs per slot, so a slot stays open until both are gone.
 */
export function computeDripSlots(
  date: string,
  taken: { time_slot: string }[],
  now = new Date(),
): DripSlot[] {
  const counts = taken.reduce<Record<string, number>>((acc, b) => {
    acc[b.time_slot] = (acc[b.time_slot] ?? 0) + 1;
    return acc;
  }, {});

  return dripSlotsForDate(date).map((time) => {
    const used = counts[time] ?? 0;
    const remaining = Math.max(0, DRIP_CAPACITY_PER_SLOT - used);
    return {
      time,
      label: formatDripSlot(time),
      remaining,
      available: remaining > 0 && !isSlotInPast(date, time, now),
    };
  });
}

/** Next `DRIP_DAYS_AHEAD` bookable dates as "YYYY-MM-DD", excluding Sundays. */
export function upcomingDripDates(from = new Date()): string[] {
  const out: string[] = [];
  const cursor = new Date(from);
  for (let i = 0; out.length < DRIP_DAYS_AHEAD && i < DRIP_DAYS_AHEAD * 2; i++) {
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const d = String(cursor.getDate()).padStart(2, "0");
    const iso = `${y}-${m}-${d}`;
    if (!isSunday(iso)) out.push(iso);
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}
