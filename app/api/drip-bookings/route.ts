import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { sendDripBookingEmails } from "@/lib/utils/drip-booking-emails";
import {
  computeDripSlots,
  getDripType,
  upcomingDripDates,
  dripSlotsForDate,
  formatDripSlot,
  DRIP_CAPACITY_PER_SLOT,
  DRIP_TYPES,
} from "@/lib/drip-booking-config";

/**
 * Vitamin Drip bookings — separate engine from /api/bookings.
 *
 * Two chairs per hourly slot, last slot 16:00, same-day booking allowed.
 * See lib/drip-booking-config.ts for why this does not share the main
 * appointment rules.
 */

const TABLE = "drip_bookings";

/** SAC-DRIP-20260816-4F2A */
function makeReference(date: string): string {
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SAC-DRIP-${date.replace(/-/g, "")}-${rand}`;
}

/** GET /api/drip-bookings?date=YYYY-MM-DD — availability. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const dates = upcomingDripDates();

  if (!date) {
    return NextResponse.json(
      { dates, drips: DRIP_TYPES, capacityPerSlot: DRIP_CAPACITY_PER_SLOT },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("time_slot")
    .eq("date", date)
    .neq("status", "cancelled");

  if (error) {
    console.error("[drip-bookings] availability read failed", error);
    // Fail open on the calendar rather than showing a broken page — the POST
    // re-checks capacity anyway, so a stale read cannot overbook.
    return NextResponse.json(
      {
        date,
        dates,
        slots: dripSlotsForDate(date).map((time) => ({
          time,
          label: formatDripSlot(time),
          remaining: DRIP_CAPACITY_PER_SLOT,
          available: true,
        })),
        degraded: true,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { date, dates, slots: computeDripSlots(date, data ?? []) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/** POST /api/drip-bookings — reserve a chair. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  // Honeypot — obscure name so browsers do not autofill it.
  if (String(body.company_reference ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const dripSlug = String(body.dripSlug ?? "").trim();
  const date = String(body.date ?? "").trim();
  const timeSlot = String(body.timeSlot ?? "").trim();
  const name = String(body.patientName ?? "").trim();
  const email = String(body.patientEmail ?? "").trim();
  const phone = String(body.patientPhone ?? "").trim();
  const notes = String(body.notes ?? "").trim();

  const drip = getDripType(dripSlug);
  if (!drip) return NextResponse.json({ error: "Please choose a drip." }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Please choose a date." }, { status: 400 });
  }
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  // Re-check capacity at write time — the calendar the visitor saw may be stale.
  const { data: taken, error: fetchError } = await supabase
    .from(TABLE)
    .select("time_slot")
    .eq("date", date)
    .neq("status", "cancelled");

  if (fetchError) {
    console.error("[drip-bookings] capacity check failed", fetchError);
    return NextResponse.json(
      { error: "We could not confirm that slot. Please try again or call the clinic." },
      { status: 503 },
    );
  }

  const slot = computeDripSlots(date, taken ?? []).find((s) => s.time === timeSlot);
  if (!slot) {
    return NextResponse.json({ error: "Please choose an available time." }, { status: 400 });
  }
  if (!slot.available) {
    return NextResponse.json(
      { error: "That time has just been taken. Please choose another slot." },
      { status: 409 },
    );
  }

  const reference = makeReference(date);
  const { error: insertError } = await supabase.from(TABLE).insert({
    reference,
    drip_slug: drip.slug,
    drip_title: drip.title,
    patient_name: name,
    patient_email: email.toLowerCase(),
    patient_phone: phone,
    date,
    time_slot: timeSlot,
    notes: notes || null,
    status: "confirmed",
  });

  if (insertError) {
    console.error("[drip-bookings] INSERT FAILED", insertError);
    console.error("[drip-bookings] LEAD", JSON.stringify({ reference, drip: drip.title, name, email, phone, date, timeSlot }));
    return NextResponse.json(
      { error: "We could not save that booking. Please call the clinic and we will secure your slot." },
      { status: 503 },
    );
  }

  // Notify. The booking is already saved, so a failed send must never be
  // reported as a failed booking — but it must be loud in the logs, because a
  // booking nobody is told about is the same as one that was never made.
  const dateDisplay = new Date(`${date}T00:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const notified = await sendDripBookingEmails({
    reference,
    drip: drip.title,
    price: drip.price,
    patientName: name,
    patientEmail: email,
    patientPhone: phone,
    dateDisplay,
    timeDisplay: formatDripSlot(timeSlot),
    notes: notes || null,
  });
  if (!notified) {
    console.error("[drip-bookings] SAVED BUT NOT NOTIFIED —", reference, email);
  }

  return NextResponse.json({
    booking: {
      reference,
      drip: drip.title,
      date,
      timeSlot,
      timeLabel: formatDripSlot(timeSlot),
      firstName: name.split(/\s+/)[0],
      email,
    },
  });
}
