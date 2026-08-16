import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { DRIP_CAPACITY_PER_SLOT, formatDripSlot } from "@/lib/drip-booking-config";

/** One row of the drip diary. */
export type AdminDripBooking = {
  id: string;
  reference: string;
  dripTitle: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  timeSlot: string;
  timeLabel: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

export type DripBookingsView = {
  upcoming: AdminDripBooking[];
  past: AdminDripBooking[];
  todayCount: number;
  upcomingCount: number;
  /** Chairs booked vs available for the next seven days. */
  weekLoad: { date: string; booked: number; capacity: number }[];
  error: string | null;
};

const EMPTY: DripBookingsView = {
  upcoming: [], past: [], todayCount: 0, upcomingCount: 0, weekLoad: [], error: null,
};

function toAdmin(r: Record<string, unknown>): AdminDripBooking {
  const timeSlot = String(r.time_slot);
  return {
    id: String(r.id),
    reference: String(r.reference),
    dripTitle: String(r.drip_title),
    patientName: String(r.patient_name),
    patientEmail: String(r.patient_email),
    patientPhone: String(r.patient_phone),
    date: String(r.date),
    timeSlot,
    timeLabel: formatDripSlot(timeSlot),
    notes: (r.notes as string | null) ?? null,
    status: String(r.status),
    createdAt: String(r.created_at),
  };
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * The drip diary.
 *
 * Bookings already email the clinic, but an inbox is not a schedule — this is
 * the screen that answers "who is coming in tomorrow, and how full are we".
 */
export async function getDripBookings(): Promise<DripBookingsView> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("drip_bookings")
      .select("*")
      .neq("status", "cancelled")
      .order("date", { ascending: true })
      .order("time_slot", { ascending: true });

    if (error) {
      return { ...EMPTY, error: error.message };
    }

    const rows = (data ?? []).map(toAdmin);
    const today = todayISO();

    const upcoming = rows.filter((r) => r.date >= today);
    const past = rows.filter((r) => r.date < today).reverse();

    // Seven-day load, so an empty week is visible at a glance.
    const weekLoad: DripBookingsView["weekLoad"] = [];
    const cursor = new Date();
    for (let i = 0; i < 7; i++) {
      const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      const day = cursor.getDay();
      const slots = day === 0 ? 0 : day === 6 ? 4 : 8; // closed Sun, 09:00–12:00 Sat, 09:00–16:00 weekdays
      weekLoad.push({
        date: iso,
        booked: rows.filter((r) => r.date === iso).length,
        capacity: slots * DRIP_CAPACITY_PER_SLOT,
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    return {
      upcoming,
      past,
      todayCount: rows.filter((r) => r.date === today).length,
      upcomingCount: upcoming.length,
      weekLoad,
      error: null,
    };
  } catch (err) {
    return { ...EMPTY, error: err instanceof Error ? err.message : "Could not load drip bookings." };
  }
}
