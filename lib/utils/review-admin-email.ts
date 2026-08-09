/**
 * Emails for the patient-review flow — three in total:
 *
 *   clinic   · a review was submitted and is waiting for approval
 *   reviewer · thanks, your review is with our team
 *   reviewer · your review is now published
 *
 * The reviewer pair matters because reviews are moderated: somebody who
 * writes one and then sees nothing appear has no way of telling whether it
 * was received, rejected, or lost. Saying "a person reads every one" sets the
 * expectation, and the published email closes the loop.
 *
 * Clinic notification for submitted patient reviews.
 *
 * Reviews are held unapproved until a human publishes them, so without a
 * notification a review sits invisible until somebody happens to open
 * /admin/reviews. A patient who took the trouble to write one — and who may be
 * expecting to see it appear — deserves better than that, and a complaint
 * arriving as a one-star review needs answering quickly.
 *
 * Includes the full text, because the point is to let whoever reads it decide
 * whether to act now rather than log in to find out.
 */

import { Resend } from "resend";
import { ORDER_ADMIN_EMAILS, ORDER_FROM } from "@/lib/utils/order-emails";
import { getPublicSiteUrl } from "@/lib/seo";
import { treatmentPath as treatmentPathFor } from "@/lib/treatment-routes";
import type { ReviewAnswer } from "@/lib/reviews/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ReviewAdminPayload = {
  id: string;
  name: string;
  email: string;
  city: string;
  rating: number;
  headline: string;
  subjectLabel: string;
  answers: ReviewAnswer[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Never throws. A review must still be saved if the notification fails —
 * losing a patient's words to a mail error would be the worse outcome.
 */
export async function sendReviewAdminNotification(
  p: ReviewAdminPayload
): Promise<{ sent: boolean; error?: string }> {
  const stars = "★".repeat(p.rating) + "☆".repeat(5 - p.rating);
  // Lead the subject with the rating so a poor review is visible in the inbox
  // list without opening it.
  const flag = p.rating <= 2 ? "⚠ " : "";

  try {
    // Resend RETURNS { data, error } — it does not throw on an API rejection.
    // Ignoring that field makes a refused send look identical to a successful
    // one, which is exactly how the first cut of this shipped sending nothing.
    const { error } = await resend.emails.send({
      from: ORDER_FROM,
      to: ORDER_ADMIN_EMAILS,
      replyTo: p.email,
      subject: `${flag}New review (${p.rating}/5) — ${p.subjectLabel} — awaiting approval`,
      html: buildReviewAdminEmail(p, stars),
    });
    if (error) {
      console.error(`[reviews] clinic notification REJECTED for ${p.id}:`, JSON.stringify(error));
      return { sent: false, error: String(error.message ?? error) };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[reviews] clinic notification threw for ${p.id}:`, err);
    return { sent: false, error: err instanceof Error ? err.message : "send failed" };
  }
}

/** Shell shared by both reviewer-facing emails. */
function reviewerShell(heading: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:32px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:22px;color:#C8A882;font-weight:normal;">${heading}</h1>
      </td></tr>
      <tr><td style="padding:40px;">${bodyHtml}</td></tr>
      <tr><td style="background:#F8F8F7;padding:20px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#6B6966;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

/** Sent the moment a review is submitted. Sets the moderation expectation. */
export async function sendReviewPendingEmail(p: {
  name: string;
  email: string;
  headline: string;
  subjectLabel: string;
}): Promise<{ sent: boolean }> {
  const firstName = p.name.trim().split(/\s+/)[0] || "there";
  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 20px;font-size:14px;color:#6B6966;line-height:1.6;">
      Thank you for taking the time to review
      <strong style="color:#1A1917;">${escapeHtml(p.subjectLabel)}</strong>. We've received it.
    </p>
    <div style="background:#FFF8F0;border-left:4px solid #C8A882;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:13px;color:#939EBA;">Your review</p>
      <p style="margin:0;font-size:15px;color:#1A1917;font-weight:600;">&ldquo;${escapeHtml(p.headline)}&rdquo;</p>
    </div>
    <p style="margin:0 0 20px;font-size:14px;color:#6B6966;line-height:1.6;">
      A member of our team reads every review before it goes on the site, so it may take a day or
      two to appear. We'll email you once it's published.
    </p>
    <p style="margin:0;font-size:13px;color:#6B6966;">
      If anything wasn't right about your visit, simply reply to this email — we'd rather hear from
      you directly.
    </p>`;
  try {
    const { error } = await resend.emails.send({
      from: ORDER_FROM,
      to: p.email,
      subject: "Thank you — your review is with our team",
      html: reviewerShell("Review received", body),
    });
    if (error) {
      console.error("[reviews] pending email REJECTED:", JSON.stringify(error));
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("[reviews] pending email threw:", err);
    return { sent: false };
  }
}

/** Sent when an admin approves the review. Closes the loop. */
export async function sendReviewPublishedEmail(p: {
  name: string;
  email: string;
  headline: string;
  subjectLabel: string;
  treatmentSlug: string | null;
}): Promise<{ sent: boolean }> {
  const firstName = p.name.trim().split(/\s+/)[0] || "there";
  const siteUrl = getPublicSiteUrl();
  // Link to the page the review actually appears on where we know it.
  const link = p.treatmentSlug
    ? `${siteUrl}${treatmentPathFor(p.treatmentSlug)}#patient-reviews`
    : siteUrl;

  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 20px;font-size:14px;color:#6B6966;line-height:1.6;">
      Your review of <strong style="color:#1A1917;">${escapeHtml(p.subjectLabel)}</strong> is now
      live on our website. Thank you — it genuinely helps other patients decide.
    </p>
    <div style="background:#FFF8F0;border-left:4px solid #C8A882;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0;font-size:15px;color:#1A1917;font-weight:600;">&ldquo;${escapeHtml(p.headline)}&rdquo;</p>
    </div>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="background:#C8A882;">
        <a href="${link}" style="display:inline-block;padding:13px 30px;color:#fff;font-size:14px;font-weight:bold;text-decoration:none;">
          See your review →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;color:#6B6966;">
      If you'd like it removed or changed at any point, just reply to this email.
    </p>`;
  try {
    const { error } = await resend.emails.send({
      from: ORDER_FROM,
      to: p.email,
      subject: "Your review is now live",
      html: reviewerShell("Your review is published", body),
    });
    if (error) {
      console.error("[reviews] published email REJECTED:", JSON.stringify(error));
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("[reviews] published email threw:", err);
    return { sent: false };
  }
}

function buildReviewAdminEmail(p: ReviewAdminPayload, stars: string): string {
  const siteUrl = getPublicSiteUrl();
  const low = p.rating <= 2;

  const answerBlocks = p.answers
    .map(
      (a) => `
      <div style="margin:0 0 16px;">
        <p style="margin:0 0 4px;font-size:12px;color:#939EBA;">${escapeHtml(a.question)}</p>
        <p style="margin:0;font-size:14px;color:#1A1917;line-height:1.6;">${escapeHtml(a.answer)}</p>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:28px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:20px;color:#C8A882;font-weight:normal;">New patient review</h1>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <div style="background:${low ? "#FEF2F2" : "#FFF8F0"};border-left:4px solid ${low ? "#ef4444" : "#C8A882"};padding:14px 18px;margin:0 0 24px;">
          <p style="margin:0;font-size:14px;color:#1A1917;line-height:1.6;">
            ${
              low
                ? "<strong>This is a low rating.</strong> It is not visible on the site and will not be unless someone approves it — but it may be worth contacting the patient directly before deciding."
                : "<strong>Not yet visible on the site.</strong> Reviews stay unpublished until approved in the admin panel."
            }
          </p>
        </div>

        <p style="margin:0 0 6px;font-size:22px;color:#C8A882;letter-spacing:2px;">${stars}</p>
        <h2 style="margin:0 0 4px;font-size:18px;color:#1A1917;">${escapeHtml(p.headline)}</h2>
        <p style="margin:0 0 24px;font-size:13px;color:#6B6966;">
          ${escapeHtml(p.name)}${p.city ? ` · ${escapeHtml(p.city)}` : ""} ·
          <a href="mailto:${escapeHtml(p.email)}" style="color:#C8A882;">${escapeHtml(p.email)}</a><br/>
          Reviewing: <strong style="color:#1A1917;">${escapeHtml(p.subjectLabel)}</strong>
        </p>

        <div style="border-top:1px solid #E5E4E0;padding-top:20px;">${answerBlocks}</div>

        <table cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
          <tr><td style="background:#C8A882;">
            <a href="${siteUrl}/admin/reviews" style="display:inline-block;padding:13px 30px;color:#fff;font-size:14px;font-weight:bold;text-decoration:none;">
              Review &amp; publish →
            </a>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:18px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#939EBA;">Sent automatically by staraesthetic.co.za</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
