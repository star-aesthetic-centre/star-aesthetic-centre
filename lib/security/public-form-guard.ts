import type { NextRequest } from "next/server";
import {
  isHoneypotTripped,
  isSuspiciousSignupEmail,
  isSuspiciousSignupName,
} from "@/lib/security/signup-guard";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/security/turnstile";

const SITE_PASSWORD = process.env.SITE_PASSWORD?.trim() ?? "";

/** Public POST endpoints that create leads, signups, or bookings. */
export const GATED_WRITE_API_PREFIXES = [
  "/api/leads",
  "/api/rewards/signup",
  "/api/member/signup",
  "/api/bookings",
  "/api/niki-session",
] as const;

export function isGatedWriteApi(pathname: string): boolean {
  return GATED_WRITE_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function hasPreviewAccess(req: NextRequest): boolean {
  return req.cookies.get("preview_access")?.value === "true";
}

export function getClientIp(req: NextRequest): string | undefined {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined
  );
}

export type PublicFormPayload = {
  turnstileToken?: string;
  website?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  patientEmail?: string;
  patientName?: string;
};

export type PublicFormGuardResult =
  | { ok: true }
  | { ok: false; silent: true }
  | { ok: false; silent: false; status: number; error: string };

/**
 * Shared spam / access checks for public form POST handlers.
 * When SITE_PASSWORD is set, callers should also enforce preview cookie (middleware does this for write APIs).
 */
export async function verifyPublicFormSubmission(
  req: NextRequest,
  body: PublicFormPayload
): Promise<PublicFormGuardResult> {
  if (isHoneypotTripped(body.website)) {
    return { ok: false, silent: true };
  }

  if (SITE_PASSWORD && !hasPreviewAccess(req)) {
    return {
      ok: false,
      silent: false,
      status: 403,
      error: "This site is in preview — please sign in with the access password first.",
    };
  }

  if (isTurnstileConfigured()) {
    const ip = getClientIp(req);
    const captcha = await verifyTurnstileToken(body.turnstileToken, ip);
    if (!captcha.ok) {
      return { ok: false, silent: false, status: 400, error: captcha.error ?? "Security check failed." };
    }
  }

  const email = (body.email ?? body.patientEmail)?.trim().toLowerCase();
  if (email) {
    if (!email.includes("@")) {
      return { ok: false, silent: false, status: 400, error: "Please enter a valid email address." };
    }
    if (isSuspiciousSignupEmail(email)) {
      return { ok: false, silent: false, status: 400, error: "Please use a valid email address." };
    }
  }

  const fullName = body.name?.trim() ?? body.patientName?.trim() ?? "";
  const first = body.firstName?.trim() ?? "";
  const last = body.lastName?.trim() ?? "";

  if (fullName && isSuspiciousSignupName(fullName)) {
    return { ok: false, silent: false, status: 400, error: "Please enter your real name." };
  }
  if ((first || last) && isSuspiciousSignupName(`${first} ${last}`.trim())) {
    return { ok: false, silent: false, status: 400, error: "Please enter your real name." };
  }

  return { ok: true };
}

export function guardFailureResponse(guard: Extract<PublicFormGuardResult, { ok: false }>) {
  if (guard.silent) {
    return { body: { ok: true }, status: 200 };
  }
  return { body: { error: guard.error }, status: guard.status };
}
