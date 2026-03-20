/**
 * GET /api/bookings/available-slots?date=YYYY-MM-DD&treatment=slug
 *
 * Returns all time slots for the requested date, each marked
 * available or unavailable based on existing bookings.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient }              from '@supabase/supabase-js';
import { computeAvailableSlots, isBookableDate, parseLocalDate } from '@/lib/availability';
import { getAppointmentType }        from '@/lib/booking-config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const date      = searchParams.get('date');
  const treatment = searchParams.get('treatment');

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!date || !treatment) {
    return NextResponse.json(
      { error: 'Missing required params: date, treatment' },
      { status: 400 },
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 });
  }

  const parsedDate = parseLocalDate(date);
  if (!isBookableDate(parsedDate)) {
    return NextResponse.json(
      { error: 'Date is not bookable (past date or Sunday).' },
      { status: 400 },
    );
  }

  // Validate treatment slug
  const apt = getAppointmentType(treatment);
  if (!apt) {
    return NextResponse.json({ error: 'Unknown treatment slug.' }, { status: 400 });
  }

  // ── Fetch existing bookings for this date ───────────────────────────────────
  const { data: existingBookings, error } = await supabase
    .from('bookings')
    .select('time_slot, slots_needed')
    .eq('date', date)
    .neq('status', 'cancelled');

  if (error) {
    console.error('Supabase error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch availability.' }, { status: 500 });
  }

  // ── Compute slot availability ────────────────────────────────────────────────
  const slots = computeAvailableSlots(date, treatment, existingBookings ?? []);

  return NextResponse.json({ slots });
}
