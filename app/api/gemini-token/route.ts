/**
 * /api/gemini-token
 *
 * Issues a short-lived token for the browser to open a Gemini Live session.
 * The real API key stays server-side — never exposed to the client.
 *
 * For now this returns the key directly (acceptable for a private site on
 * localhost). When deployed, swap for proper ephemeral-token generation
 * via the Gemini token-service endpoint.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key not configured' },
      { status: 500 }
    );
  }

  // TODO (production): exchange for a short-lived ephemeral token here
  // so the full key is never sent to the browser.
  return NextResponse.json({ apiKey });
}
