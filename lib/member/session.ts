/**
 * Member session — HMAC-signed cookie
 *
 * Cookie value: base64url( email + ":" + hmac_sha256(email, SECRET) )
 *
 * Not a full auth system — this is email-based soft authentication
 * suitable for a member dashboard where the risk profile is low.
 * Upgrade to Supabase Auth / NextAuth when passwords are added.
 */

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "member_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  return process.env.MEMBER_SESSION_SECRET ?? "star-aesthetic-dev-only-change-in-production";
}

/** Create a signed token for an email address */
export function createSessionToken(email: string): string {
  const sig = createHmac("sha256", secret()).update(email).digest("hex");
  return Buffer.from(`${email}:${sig}`).toString("base64url");
}

/** Verify a token and return the email, or null if invalid */
export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const colonIdx = decoded.lastIndexOf(":");
    if (colonIdx < 1) return null;
    const email = decoded.slice(0, colonIdx);
    const sig = decoded.slice(colonIdx + 1);
    const expected = createHmac("sha256", secret()).update(email).digest("hex");
    // Timing-safe comparison
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;
    return email;
  } catch {
    return null;
  }
}

/** Read and verify the member session cookie (server component / route handler) */
export async function getMemberSession(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Set the member session cookie on a NextResponse */
export function setSessionCookie(res: NextResponse, email: string): NextResponse {
  res.cookies.set(COOKIE_NAME, createSessionToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

/** Clear the member session cookie on a NextResponse */
export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
