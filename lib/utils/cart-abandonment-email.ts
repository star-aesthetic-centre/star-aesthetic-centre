import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";
function formatZarFromCents(cents: number): string {
  return `R ${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export async function sendCartAbandonmentEmail(opts: {
  to: string;
  firstName: string;
  recoveryUrl: string;
  itemCount: number;
  subtotalCents: number;
}): Promise<{ ok: boolean; error?: string; skipped?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not set", skipped: true };
  }

  const resend = new Resend(apiKey);
  const name = opts.firstName.trim() || "there";
  const total = formatZarFromCents(opts.subtotalCents);

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1A1917">
      <p style="color:#939EBA;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">Star Aesthetic Centre</p>
      <h1 style="font-size:22px;font-weight:bold;margin:24px 0 12px">Your cart is still waiting</h1>
      <p>Hi ${name},</p>
      <p>We noticed you didn't finish checkout — no worries, we've saved your cart (${opts.itemCount} item${opts.itemCount === 1 ? "" : "s"}, ${total}).</p>
      <p>If you have questions about products, shipping, or EFT payment, just reply to this email or WhatsApp us.</p>
      <p style="margin:28px 0">
        <a href="${opts.recoveryUrl}" style="display:inline-block;background:#939EBA;color:#fff;padding:14px 28px;text-decoration:none;font-weight:bold;font-size:13px;letter-spacing:0.08em">COMPLETE YOUR ORDER</a>
      </p>
      <p style="font-size:13px;color:#6B6966">Dr. Rajeev Bangalee · Star Aesthetic Centre · Durban North</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Star Aesthetic Centre <bookings@staraesthetic.co.za>",
    to: opts.to,
    subject: "Your Star Aesthetic Centre cart is saved",
    html,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export function buildRecoveryUrl(recoveryToken: string): string {
  return `${SITE_URL}/checkout?recover=${encodeURIComponent(recoveryToken)}`;
}
