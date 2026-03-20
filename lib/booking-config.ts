/**
 * booking-config.ts
 *
 * Single source of truth for:
 *  - All 13 bookable appointment types
 *  - Duration (used for display) and slotsNeeded (60-min blocks)
 *  - Clinic opening hours and slot schedule
 */

// ── Appointment types ──────────────────────────────────────────────────────────

export interface AppointmentType {
  slug:        string;   // URL-safe key — matches treatments.json slug where applicable
  title:       string;   // Display name
  category:    'Face' | 'Skin' | 'Body & Wellness' | 'Assessment';
  duration:    string;   // Human-readable duration string
  slotsNeeded: 1 | 2;   // 60-min slots to block per booking
  priceFrom:   string;   // Display price
}

export const APPOINTMENT_TYPES: AppointmentType[] = [
  // ── Assessment ──────────────────────────────────────────────────────────────
  {
    slug:        'free-assessment',
    title:       'Free 15-Minute Consultation',
    category:    'Assessment',
    duration:    '15 minutes',
    slotsNeeded: 1,
    priceFrom:   'Free',
  },

  // ── Face ────────────────────────────────────────────────────────────────────
  {
    slug:        'botox',
    title:       'Botox® Wrinkle Treatment',
    category:    'Face',
    duration:    '20–45 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 1,200',
  },
  {
    slug:        'lip-filler',
    title:       'Lip Filler Treatment',
    category:    'Face',
    duration:    '30–45 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 2,500',
  },
  {
    slug:        'jaw-amp-chin-contouring',
    title:       'Jaw & Chin Contouring',
    category:    'Face',
    duration:    '30–60 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 2,500',
  },
  {
    slug:        'dermapen-microneedling',
    title:       'Dermapen® Microneedling',
    category:    'Face',
    duration:    '45–75 minutes',
    slotsNeeded: 2,
    priceFrom:   'From R 1,800',
  },

  // ── Skin ────────────────────────────────────────────────────────────────────
  {
    slug:        'skin-peel',
    title:       'Skin Peel (Chemical Peel)',
    category:    'Skin',
    duration:    '30–60 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 1,200',
  },
  {
    slug:        'pigmentation-treatment',
    title:       'Pigmentation Treatment',
    category:    'Skin',
    duration:    '30–90 minutes',
    slotsNeeded: 2,
    priceFrom:   'From R 1,200',
  },
  {
    slug:        'acne',
    title:       'Acne Treatment',
    category:    'Skin',
    duration:    '30–60 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 850',
  },
  {
    slug:        'excessive-sweating',
    title:       'Excessive Sweating (Hyperhidrosis)',
    category:    'Skin',
    duration:    '30–45 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 4,500',
  },

  // ── Body & Wellness ─────────────────────────────────────────────────────────
  {
    slug:        'body-contouring',
    title:       'Body Contouring',
    category:    'Body & Wellness',
    duration:    '45–90 minutes',
    slotsNeeded: 2,
    priceFrom:   'From R 1,200',
  },
  {
    slug:        'medi-lean',
    title:       'Medi-Lean Weight Loss Programme',
    category:    'Body & Wellness',
    duration:    'Initial consultation: 60 minutes',
    slotsNeeded: 1,
    priceFrom:   'Consult for pricing',
  },
  {
    slug:        'varicose-veins',
    title:       'Varicose Veins Treatment',
    category:    'Body & Wellness',
    duration:    '30–60 minutes',
    slotsNeeded: 1,
    priceFrom:   'From R 1,500',
  },
  {
    slug:        'vitamin-drips',
    title:       'Vitamin Drips — IV Nutrient Therapy',
    category:    'Body & Wellness',
    duration:    '45–75 minutes',
    slotsNeeded: 2,
    priceFrom:   'From R 1,800',
  },
];

// ── Clinic schedule ────────────────────────────────────────────────────────────

/** First slot start hour (24h) */
export const FIRST_SLOT_HOUR = 9; // 09:00

/** Clinic close hour (24h) — no appointment may end after this */
export const WEEKDAY_CLOSE_HOUR = 17; // 17:00
export const SATURDAY_CLOSE_HOUR = 13; // 13:00

/**
 * All possible hourly slot starts for a given day.
 * Returns strings like "09:00", "10:00", etc.
 */
export function allSlots(isSaturday: boolean): string[] {
  const closeHour = isSaturday ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR;
  const slots: string[] = [];
  for (let h = FIRST_SLOT_HOUR; h < closeHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
  }
  return slots;
}

/**
 * Last valid start hour for an appointment that needs `slotsNeeded` slots.
 * A 2-slot appointment on a weekday must start by 15:00 to finish by 17:00.
 */
export function lastValidStartHour(isSaturday: boolean, slotsNeeded: 1 | 2): number {
  const closeHour = isSaturday ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR;
  return closeHour - slotsNeeded;
}

/** Look up an appointment type by slug. */
export function getAppointmentType(slug: string): AppointmentType | undefined {
  return APPOINTMENT_TYPES.find((a) => a.slug === slug);
}

/** Group appointment types by category for the selection UI. */
export function appointmentsByCategory(): Record<string, AppointmentType[]> {
  return APPOINTMENT_TYPES.reduce<Record<string, AppointmentType[]>>((acc, apt) => {
    if (!acc[apt.category]) acc[apt.category] = [];
    acc[apt.category].push(apt);
    return acc;
  }, {});
}
