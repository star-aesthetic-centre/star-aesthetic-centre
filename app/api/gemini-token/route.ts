/**
 * /api/gemini-token
 *
 * Issues a SHORT-LIVED, SINGLE-USE ephemeral token for the browser to open a
 * Gemini Live session. The real API key never leaves the server. Even if the
 * ephemeral token is intercepted it is near-useless: it can only open a Live
 * session on the one pinned model, can be used once, and expires in ~30 min.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/public-form-guard";

const NIKI_MODEL = "gemini-2.5-flash-native-audio-preview-12-2025";

export async function GET(req: NextRequest) {
  // Throttle so a scraper can't mint tokens in bulk and burn quota.
  const ip = getClientIp(req) ?? "unknown";
  if (!rateLimit(`gemini-token:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: "v1alpha" } });
    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        // Session must be STARTED within 60s of issuing the token…
        newSessionExpireTime: new Date(now + 60_000).toISOString(),
        // …and may run for at most 30 minutes.
        expireTime: new Date(now + 30 * 60_000).toISOString(),
        // Lock the token to Niki's model only.
        liveConnectConstraints: { model: NIKI_MODEL },
        httpOptions: { apiVersion: "v1alpha" },
      },
    });

    return NextResponse.json({ token: token.name });
  } catch (err) {
    console.error("gemini-token error:", err);
    return NextResponse.json({ error: "Could not create session token" }, { status: 500 });
  }
}
