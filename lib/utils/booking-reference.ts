import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { generateReference } from "@/lib/availability";

/**
 * The patient-facing booking reference: SAC-BK-2026-001, SAC-BK-2026-002, …
 *
 * The counter is claimed inside Postgres so two people booking in the same
 * instant can't be handed the same reference — see
 * scripts/sql/sequential-booking-numbers.sql.
 *
 * Uses its own SERVICE ROLE client: /api/bookings otherwise runs on the anon
 * key, and next_booking_reference() is deliberately not granted to anon so a
 * visitor can't burn booking numbers in a loop.
 */
export async function nextBookingReference(dateStr: string): Promise<string> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc("next_booking_reference");

    if (error || typeof data !== "string" || !data) {
      console.error(
        "[bookings] next_booking_reference() unavailable — falling back to the random " +
          "reference format. Run scripts/sql/sequential-booking-numbers.sql in Supabase.",
        error?.message ?? ""
      );
      return generateReference(dateStr);
    }

    return data;
  } catch (err) {
    console.error("[bookings] could not reach Supabase for a booking reference:", err);
    return generateReference(dateStr);
  }
}
