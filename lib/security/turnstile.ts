/** Cloudflare Turnstile server-side verification */

export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string | null
): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY missing — allowing in development only");
      return { ok: true };
    }
    return { ok: false, error: "Security verification is not configured." };
  }

  if (!token?.trim()) {
    return { ok: false, error: "Please complete the security check." };
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };

    if (data.success) return { ok: true };
    return {
      ok: false,
      error: "Security verification failed. Please try again.",
    };
  } catch {
    return { ok: false, error: "Could not verify security check. Please try again." };
  }
}
