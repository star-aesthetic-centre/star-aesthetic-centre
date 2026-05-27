/**
 * /api/niki-session
 *
 * Receives the completed session transcript + contact data from the browser
 * when a Niki voice session ends.
 *
 * Phase 1: logs to console
 * Phase 2: ✅ saves to Supabase + extracts contact details from transcript
 * Phase 3 (TODO): email to Nakita via Resend
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient }              from '@supabase/supabase-js';
import { createLead } from '@/lib/crm/leads';

// ── Supabase client (server-side) ─────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NikiSessionPayload {
  sessionId:      string;
  treatmentPage?: string;
  transcript:     string;
  contact: {
    name?:   string;
    phone?:  string;
    email?:  string;
    suburb?: string;
  };
  durationSeconds: number;
  startedAt:       string;
}

interface ExtractedContact {
  name?:  string;
  phone?: string;
  email?: string;
}

// ── Extract contact details from transcript using regex ───────────────────────
// Niki explicitly confirms phone and email back to the visitor in the transcript,
// so we can extract the confirmed values directly — no API call needed.
function extractContact(transcript: string): ExtractedContact {
  if (!transcript || transcript.length < 20) return {};

  const contact: ExtractedContact = {};

  // ── Name ──────────────────────────────────────────────────────────────────
  // Visitor says: "My name is Ignatius" / "It's Ignatius" / "I'm Ignatius"
  const nameMatch = transcript.match(
    /(?:my name is|it'?s|i'?m)\s+([A-Za-z]+)/i
  );
  if (nameMatch?.[1]) contact.name = nameMatch[1];

  // ── Phone — use Niki's confirmed version ──────────────────────────────────
  // Niki says: "your number is 076 180 9799" — capture until comma/question mark
  const phoneMatch = transcript.match(
    /your number is\s+([\d][\d\s\-]+[\d])(?:\s*[,?])/i
  );
  if (phoneMatch?.[1]) contact.phone = phoneMatch[1].replace(/[\s\-]/g, '');

  // ── Email — use Niki's confirmed version ──────────────────────────────────
  // Niki may spell it with spaces: "i g n a t i u s a c k @ gmail com"
  // Strategy: grab everything between "your email is" and "correct" / "?" then
  // strip spaces and validate as an email address.
  const emailSection = transcript.match(
    /your email is\s+(.+?)(?:\s*,\s*correct|\s*correct|\s*\?|$)/im
  );
  if (emailSection?.[1]) {
    // Collapse all whitespace, then look for a valid email pattern
    const collapsed = emailSection[1].replace(/\s+/g, '');
    const emailMatch = collapsed.match(
      /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/i
    );
    if (emailMatch) contact.email = emailMatch[0];
  }

  console.log('📋 Extracted contact (regex):', contact);
  return contact;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload: NikiSessionPayload = await req.json();

    // ── Console log ───────────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════════');
    console.log('🎙️  NIKI SESSION COMPLETE');
    console.log('══════════════════════════════════════════════');
    console.log(`Page:     ${payload.treatmentPage ?? 'unknown'}`);
    console.log(`Duration: ${payload.durationSeconds}s`);
    console.log('\nTRANSCRIPT:\n');
    console.log(payload.transcript || '(no transcript captured)');
    console.log('══════════════════════════════════════════════\n');

    // ── Extract contact details from transcript ────────────────────────────
    const contact = extractContact(payload.transcript);
    if (Object.keys(contact).length > 0) {
      console.log('📋 Extracted contact:', contact);
    }

    // ── Supabase insert ───────────────────────────────────────────────────
    const { error } = await supabase.from('niki_sessions').insert({
      session_id:       payload.sessionId,
      treatment_page:   payload.treatmentPage ?? null,
      transcript:       payload.transcript    || null,
      contact_name:     contact.name          ?? null,
      contact_phone:    contact.phone         ?? null,
      contact_email:    contact.email         ?? null,
      duration_seconds: payload.durationSeconds,
      started_at:       payload.startedAt,
    });

    if (error) {
      console.error('Supabase insert error:', error.message);
    } else {
      console.log('✅ Session saved to Supabase');
    }

    if (contact.email?.includes('@')) {
      const parts = (contact.name ?? '').trim().split(/\s+/);
      await createLead({
        email: contact.email,
        phone: contact.phone,
        firstName: parts[0],
        lastName: parts.slice(1).join(' '),
        source: 'niki',
        interestType: 'treatment',
        interestValue: payload.treatmentPage ?? 'Niki voice chat',
        metadata: { sessionId: payload.sessionId, transcriptLength: payload.transcript?.length },
      });
    }

    // ── Phase 3 (TODO): Email to Nakita via Resend ────────────────────────
    // await sendNakitaEmail({ payload, contact });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('niki-session error:', err);
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}
