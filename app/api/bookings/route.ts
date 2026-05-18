/**
 * POST /api/bookings
 *
 * Creates a new booking:
 *  1. Validates inputs
 *  2. Re-checks slot availability (race-condition guard)
 *  3. Inserts to Supabase
 *  4. Sends emails via Resend (patient confirmation + Nakita alert)
 *  5. Returns booking reference
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient }              from '@supabase/supabase-js';
import { Resend }                    from 'resend';
import {
  computeAvailableSlots,
  generateReference,
  isBookableDate,
  parseLocalDate,
  formatSlotLabel,
} from '@/lib/availability';
import { getAppointmentType } from '@/lib/booking-config';
import { createLead } from '@/lib/crm/leads';

// ── Clients ────────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Types ──────────────────────────────────────────────────────────────────────

interface BookingPayload {
  treatmentSlug:  string;
  date:           string;   // YYYY-MM-DD
  timeSlot:       string;   // HH:MM
  patientName:    string;
  patientEmail:   string;
  patientPhone:   string;
  notes?:         string;
}

// ── Day formatter for emails ───────────────────────────────────────────────────

function formatDateDisplay(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return d.toLocaleDateString('en-ZA', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();
    const {
      treatmentSlug,
      date,
      timeSlot,
      patientName,
      patientEmail,
      patientPhone,
      notes,
    } = body;

    // ── Input validation ───────────────────────────────────────────────────────
    if (!treatmentSlug || !date || !timeSlot || !patientName || !patientEmail || !patientPhone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format.' }, { status: 400 });
    }

    if (!/^\d{2}:00$/.test(timeSlot)) {
      return NextResponse.json({ error: 'Invalid time slot format.' }, { status: 400 });
    }

    const parsedDate = parseLocalDate(date);
    if (!isBookableDate(parsedDate)) {
      return NextResponse.json({ error: 'Date is not bookable.' }, { status: 400 });
    }

    const apt = getAppointmentType(treatmentSlug);
    if (!apt) {
      return NextResponse.json({ error: 'Unknown treatment.' }, { status: 400 });
    }

    // ── Re-check availability (race-condition guard) ────────────────────────────
    const { data: existingBookings, error: fetchError } = await supabase
      .from('bookings')
      .select('time_slot, slots_needed')
      .eq('date', date)
      .neq('status', 'cancelled');

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError.message);
      return NextResponse.json({ error: 'Failed to check availability.' }, { status: 500 });
    }

    const slots = computeAvailableSlots(date, treatmentSlug, existingBookings ?? []);
    const requestedSlot = slots.find((s) => s.time === timeSlot);

    if (!requestedSlot?.available) {
      return NextResponse.json(
        { error: 'This slot is no longer available. Please choose another time.' },
        { status: 409 },
      );
    }

    // ── Generate reference and insert ──────────────────────────────────────────
    const reference = generateReference(date);

    const { error: insertError } = await supabase.from('bookings').insert({
      reference,
      treatment:       apt.title,
      treatment_slug:  treatmentSlug,
      slots_needed:    apt.slotsNeeded,
      patient_name:    patientName.trim(),
      patient_email:   patientEmail.trim().toLowerCase(),
      patient_phone:   patientPhone.trim(),
      date,
      time_slot:       timeSlot,
      notes:           notes?.trim() || null,
      status:          'confirmed',
    });

    if (insertError) {
      console.error('Supabase insert error:', insertError.message);
      return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 });
    }

    const nameParts = patientName.trim().split(/\s+/);
    await createLead({
      email: patientEmail,
      phone: patientPhone,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      source: 'booking',
      interestType: 'treatment',
      interestValue: apt.title,
      status: 'booked',
      metadata: { reference, treatmentSlug, date, timeSlot },
    });

    // ── Send emails ────────────────────────────────────────────────────────────
    const dateDisplay = formatDateDisplay(date);
    const timeDisplay = formatSlotLabel(timeSlot);
    const endHour     = parseInt(timeSlot.split(':')[0], 10) + apt.slotsNeeded;
    const endDisplay  = formatSlotLabel(`${String(endHour).padStart(2, '0')}:00`);

    // Patient confirmation
    await resend.emails.send({
      from:    'Star Aesthetic Centre <bookings@staraesthetic.site>',
      to:      patientEmail,
      subject: `Booking Confirmed — ${apt.title} | Ref: ${reference}`,
      html:    buildPatientEmail({
        reference, patientName, apt: apt.title,
        dateDisplay, timeDisplay, endDisplay, notes,
      }),
    });

    // Nakita alert
    await resend.emails.send({
      from:    'Star Aesthetic Bookings <bookings@staraesthetic.site>',
      to:      'info@staraesthetic.site',
      subject: `New Booking: ${apt.title} — ${dateDisplay} at ${timeDisplay}`,
      html:    buildNakitaEmail({
        reference, patientName, patientEmail, patientPhone,
        apt: apt.title, dateDisplay, timeDisplay, endDisplay, notes,
      }),
    });

    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error('POST /api/bookings error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}

// ── Email templates ────────────────────────────────────────────────────────────

interface PatientEmailProps {
  reference:   string;
  patientName: string;
  apt:         string;
  dateDisplay: string;
  timeDisplay: string;
  endDisplay:  string;
  notes?:      string;
}

function buildPatientEmail(p: PatientEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0F2647;padding:40px 48px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;color:#C8A882;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Star Aesthetic Medical Centre</p>
            <h1 style="margin:12px 0 0;color:#FFFFFF;font-size:24px;font-weight:400;letter-spacing:1px;">Booking Confirmed</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#FFFFFF;padding:48px;">
            <p style="margin:0 0 24px;color:#1A1917;font-size:16px;line-height:1.6;">Dear ${p.patientName},</p>
            <p style="margin:0 0 32px;color:#6B6966;font-size:15px;line-height:1.7;">
              Your appointment has been confirmed. We look forward to welcoming you to Star Aesthetic Medical Centre.
            </p>

            <!-- Appointment box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;border-left:3px solid #C8A882;margin-bottom:32px;">
              <tr><td style="padding:24px 28px;">
                <p style="margin:0 0 16px;color:#1A1917;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Appointment Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;color:#6B6966;font-size:14px;width:120px;">Reference</td>
                    <td style="padding:6px 0;color:#1A1917;font-size:14px;font-weight:bold;">${p.reference}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6B6966;font-size:14px;">Treatment</td>
                    <td style="padding:6px 0;color:#1A1917;font-size:14px;">${p.apt}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6B6966;font-size:14px;">Date</td>
                    <td style="padding:6px 0;color:#1A1917;font-size:14px;">${p.dateDisplay}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6B6966;font-size:14px;">Time</td>
                    <td style="padding:6px 0;color:#1A1917;font-size:14px;">${p.timeDisplay} – ${p.endDisplay}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6B6966;font-size:14px;">Location</td>
                    <td style="padding:6px 0;color:#1A1917;font-size:14px;">22 Ennisdale Drive, Durban North, 4051</td>
                  </tr>
                  ${p.notes ? `<tr><td style="padding:6px 0;color:#6B6966;font-size:14px;vertical-align:top;">Notes</td><td style="padding:6px 0;color:#1A1917;font-size:14px;">${p.notes}</td></tr>` : ''}
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;color:#1A1917;font-size:15px;font-weight:bold;">What to bring</p>
            <p style="margin:0 0 32px;color:#6B6966;font-size:14px;line-height:1.7;">
              Please arrive 5–10 minutes before your appointment. Bring a list of any current medications or skincare products you are using.
            </p>

            <p style="margin:0 0 8px;color:#1A1917;font-size:15px;font-weight:bold;">Need to reschedule?</p>
            <p style="margin:0 0 0;color:#6B6966;font-size:14px;line-height:1.7;">
              Please contact us at least 24 hours in advance:<br>
              <a href="tel:+27315731325" style="color:#C8A882;">+27 (0)31 573 1325</a> &nbsp;|&nbsp;
              <a href="mailto:info@staraesthetic.site" style="color:#C8A882;">info@staraesthetic.site</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1A1917;padding:32px 48px;text-align:center;">
            <p style="margin:0 0 4px;color:#C8A882;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Star Aesthetic Medical Centre</p>
            <p style="margin:0;color:#6B6966;font-size:12px;">22 Ennisdale Drive · Durban North · KZN · 4051</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

interface NakitaEmailProps {
  reference:    string;
  patientName:  string;
  patientEmail: string;
  patientPhone: string;
  apt:          string;
  dateDisplay:  string;
  timeDisplay:  string;
  endDisplay:   string;
  notes?:       string;
}

function buildNakitaEmail(p: NakitaEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:32px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <tr>
          <td style="background:#0F2647;padding:28px 40px;">
            <p style="margin:0;color:#C8A882;font-size:11px;letter-spacing:3px;text-transform:uppercase;">New Booking Alert</p>
            <h2 style="margin:8px 0 0;color:#FFFFFF;font-size:20px;font-weight:400;">${p.apt}</h2>
          </td>
        </tr>

        <tr>
          <td style="background:#FFFFFF;padding:36px 40px;">
            <p style="margin:0 0 24px;color:#1A1917;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Patient</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr><td style="padding:5px 0;color:#6B6966;font-size:14px;width:100px;">Name</td><td style="padding:5px 0;color:#1A1917;font-size:14px;">${p.patientName}</td></tr>
              <tr><td style="padding:5px 0;color:#6B6966;font-size:14px;">Phone</td><td style="padding:5px 0;color:#1A1917;font-size:14px;"><a href="tel:${p.patientPhone}" style="color:#0F2647;">${p.patientPhone}</a></td></tr>
              <tr><td style="padding:5px 0;color:#6B6966;font-size:14px;">Email</td><td style="padding:5px 0;color:#1A1917;font-size:14px;"><a href="mailto:${p.patientEmail}" style="color:#0F2647;">${p.patientEmail}</a></td></tr>
            </table>

            <p style="margin:0 0 24px;color:#1A1917;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Appointment</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;border-left:3px solid #C8A882;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;color:#6B6966;font-size:14px;width:100px;">Reference</td><td style="padding:4px 0;color:#1A1917;font-size:14px;font-weight:bold;">${p.reference}</td></tr>
                  <tr><td style="padding:4px 0;color:#6B6966;font-size:14px;">Date</td><td style="padding:4px 0;color:#1A1917;font-size:14px;">${p.dateDisplay}</td></tr>
                  <tr><td style="padding:4px 0;color:#6B6966;font-size:14px;">Time</td><td style="padding:4px 0;color:#1A1917;font-size:14px;">${p.timeDisplay} – ${p.endDisplay}</td></tr>
                  <tr><td style="padding:4px 0;color:#6B6966;font-size:14px;">Treatment</td><td style="padding:4px 0;color:#1A1917;font-size:14px;">${p.apt}</td></tr>
                  ${p.notes ? `<tr><td style="padding:4px 0;color:#6B6966;font-size:14px;vertical-align:top;">Notes</td><td style="padding:4px 0;color:#1A1917;font-size:14px;">${p.notes}</td></tr>` : ''}
                </table>
              </td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#1A1917;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#6B6966;font-size:12px;">Star Aesthetic Centre · Booking System</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}
