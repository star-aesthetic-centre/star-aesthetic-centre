/**
 * Admin session token.
 *
 * The admin cookie previously stored the literal string "authenticated", which
 * anyone who knew the scheme could forge. Instead we store a SHA-256 digest of
 * the admin password plus a fixed salt — an opaque value that can only be
 * produced by something that already knows the password. Uses the global
 * Web Crypto API so it works in BOTH the edge runtime (middleware) and the
 * node runtime (route handlers / server actions).
 */

const SALT = "star-aesthetic-admin::v1";

export async function adminSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  const data = new TextEncoder().encode(`${SALT}::${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isValidAdminSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  // No password configured => no valid session can exist (fail closed).
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookieValue === (await adminSessionToken());
}

export const ADMIN_COOKIE = "admin_session";
