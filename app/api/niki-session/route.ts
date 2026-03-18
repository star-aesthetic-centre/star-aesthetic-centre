/**
 * /api/niki-session
 *
 * Receives the completed session transcript + contact data from the browser
 * when a Niki voice session ends.
 *
 * Phase 1: logs to console
 * Phase 2: ✅ saves to Supabase + extracts contact details from transcript
 * Phase 3 (TODO): email to Nikita via Resend
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient }              from '@supabase/supabase-js';
import { GoogleGenAI }               from '@google/genai';

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

// ── Extract contact details from transcript via Gemini ────────────────────────
async function extractContact(transcript: string): Promise<ExtractedContact> {
  if (!transcript || transcript.length < 20) return {};

  try {
    const ai  = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: [{
        role: 'user',
        parts: [{ text: `Extract any contact details mentioned in this conversation transcript. Return ONLY a raw JSON object (no markdown, no code fences, no explanation) with these fields (omit fields not found): name, phone, email.

Example output: {"name":"Sarah","phone":"0821234567","email":"sarah@gmail.com"}

Transcript:
${transcript}` }],
      }],
    });

    // Get text — try multiple paths for SDK compatibility
    const raw = (
      res.text ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).candidates?.[0]?.content?.parts?.[0]?.text ??
      ''
    ).trim();

    console.log('🤖 Gemini extraction raw response:', raw);

    if (!raw) return {};

    // Strip any markdown code fences Gemini may have added despite instructions
    const jsonStr = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/,           '')
      .trim();

    return JSON.parse(jsonStr) as ExtractedContact;
  } catch (err) {
    console.error('⚠️  extractContact failed:', err);
    return {};
  }
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
    const contact = await extractContact(payload.transcript);
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

    // ── Phase 3 (TODO): Email to Nikita via Resend ────────────────────────
    // await sendNikitaEmail({ payload, contact });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('niki-session error:', err);
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}
