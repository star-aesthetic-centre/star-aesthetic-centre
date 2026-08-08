import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { getPublicSiteUrl } from "@/lib/seo";
import { treatmentTitle } from "@/lib/reviews/questions";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Post-appointment review request.
 *
 * A review form nobody visits collects nothing — this email is what actually
 * produces reviews. Sent a few days after the appointment, with a one-click
 * link that pre-selects the treatment the patient actually had.
 *
 * The send slot is claimed on the booking row BEFORE dispatch (conditional
 * update on review_request_sent_at is null), so two overlapping cron runs
 * cannot ask the same patient twice — the same guard the order emails use.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const delayDays = Number(process.env.REVIEW_REQUEST_DELAY_DAYS ?? "3");
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - delayDays);
  const cutoffDate = cutoff.toISOString().slice(0, 10);

  const supabase = createSupabaseAdmin();

  const { data: due, error } = await supabase
    .from("bookings")
    .select("id, reference, patient_name, patient_email, treatment, treatment_slug, date")
    .eq("status", "confirmed")
    .lte("date", cutoffDate)
    .is("review_request_sent_at", null)
    .limit(25);

  if (error) {
    console.error("[review-requests] read failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const siteUrl = getPublicSiteUrl();
  const sent: string[] = [];

  for (const booking of due ?? []) {
    if (!booking.patient_email) continue;

    // Claim first. If another run already claimed it, the update matches no
    // row and we skip — no second email.
    const { data: claimed, error: claimErr } = await supabase
      .from("bookings")
      .update({ review_request_sent_at: new Date().toISOString() })
      .eq("id", booking.id)
      .is("review_request_sent_at", null)
      .select("id");

    if (claimErr) {
      console.error("[review-requests] claim failed:", claimErr.message);
      continue;
    }
    if (!claimed?.length) continue;

    const firstName = (booking.patient_name ?? "").trim().split(" ")[0] || "there";
    const slug = booking.treatment_slug ?? "";
    const label = slug ? treatmentTitle(slug) : (booking.treatment ?? "your visit");
    const link =
      `${siteUrl}/submit-review?ref=${encodeURIComponent(booking.reference ?? "")}` +
      (slug ? `&treatment=${encodeURIComponent(slug)}` : "");

    try {
      await resend.emails.send({
        from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
        to: booking.patient_email,
        subject: `How was your visit, ${firstName}?`,
        html: buildRequestEmail({ firstName, label, link }),
      });
      sent.push(booking.reference ?? booking.id);
    } catch (err) {
      // The slot stays claimed. Better one missed request than a patient
      // emailed repeatedly by a retry loop.
      console.error(`[review-requests] send failed for ${booking.reference}:`, err);
    }
  }

  console.info(`[review-requests] sent ${sent.length} of ${due?.length ?? 0} due`);
  return NextResponse.json({ ok: true, sent: sent.length, references: sent });
}

function buildRequestEmail({
  firstName,
  label,
  link,
}: {
  firstName: string;
  label: string;
  link: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:32px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:22px;color:#C8A882;font-weight:normal;">How was your visit?</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${firstName},</p>
        <p style="margin:0 0 24px;font-size:14px;color:#6B6966;line-height:1.6;">
          Thank you for visiting us for <strong style="color:#1A1917;">${label}</strong>.
          If you have two minutes, we'd be grateful for a short review — it genuinely helps
          other patients decide, and it tells us what we're getting right.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr><td style="background:#C8A882;">
            <a href="${link}" style="display:inline-block;padding:14px 32px;color:#fff;font-size:14px;font-weight:bold;text-decoration:none;">
              Share your experience →
            </a>
          </td></tr>
        </table>
        <p style="margin:0 0 8px;font-size:13px;color:#6B6966;line-height:1.6;">
          There are four short questions and none of them are compulsory — a sentence or two is plenty.
        </p>
        <p style="margin:0;font-size:13px;color:#939EBA;line-height:1.6;">
          If something wasn't right, please reply to this email instead and we'll put it right.
        </p>
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:20px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#6B6966;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
