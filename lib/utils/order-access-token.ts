import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, short-lived proof that the bearer placed a specific order.
 *
 * The order-confirmation page needs to read the real payment status, and the
 * PayFast return URL needs to be able to say "we haven't heard from PayFast
 * yet" — neither may become a way to enumerate other people's orders. The token
 * binds one order reference to one email address.
 */

/** 24 hours — long enough to find the email; still time-limited and signed. */
export const ORDER_ACCESS_TOKEN_TTL_SEC = 86400;

function signingSecret(): string {
  const secret =
    process.env.ORDER_ACCESS_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!secret) {
    throw new Error(
      "ORDER_ACCESS_SECRET or SUPABASE_SERVICE_ROLE_KEY required for order access tokens"
    );
  }
  return secret;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function signPayload(payload: string): string {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

export function createOrderAccessToken(reference: string, email: string): string {
  const exp = Math.floor(Date.now() / 1000) + ORDER_ACCESS_TOKEN_TTL_SEC;
  const payload = `${reference}|${normalizeEmail(email)}|${exp}`;
  return Buffer.from(`${payload}|${signPayload(payload)}`, "utf8").toString("base64url");
}

export function verifyOrderAccessToken(
  token: string
): { reference: string; email: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastPipe = decoded.lastIndexOf("|");
    if (lastPipe === -1) return null;

    const sig = decoded.slice(lastPipe + 1);
    const payload = decoded.slice(0, lastPipe);
    const expected = signPayload(payload);

    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;

    const [reference, email, expStr] = payload.split("|");
    if (!reference || !email || !expStr) return null;

    const exp = Number(expStr);
    if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;

    return { reference, email: normalizeEmail(email) };
  } catch {
    return null;
  }
}
