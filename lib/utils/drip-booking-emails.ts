import { Resend } from "resend";

/**
 * Vitamin Drip booking emails.
 *
 * Sends from bookings@staraesthetic.site — staraesthetic.co.za is NOT a
 * verified Resend sending domain and sends from it fail silently.
 *
 * Never throws. A booking that is already saved must not be reported as
 * failed because a notification could not go out.
 */

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_PATIENT = "Star Aesthetic Centre <bookings@staraesthetic.site>";
const FROM_ADMIN = "Star Aesthetic Drips <bookings@staraesthetic.site>";
const ADMIN_INBOX = "info@staraesthetic.site";

export type DripBookingEmailData = {
  reference: string;
  drip: string;
  price: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dateDisplay: string;
  timeDisplay: string;
  notes?: string | null;
};

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(heading: string, body: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#F7F7F8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1A1A1F;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E2E2E6;padding:32px;">
    <p style="margin:0 0 24px;font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#939EBA;">Star Aesthetic Centre</p>
    <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;">${heading}</h1>
    ${body}
    <p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #E2E2E6;font-size:13px;color:#636374;">
      Star Aesthetic Centre · 22 Ennisdale Drive, Durban North<br>
      <a href="tel:+27315731325" style="color:#636374;">031 573 1325</a>
    </p>
  </div></body></html>`;
}

function row(label: string, value: string) {
  return value
    ? `<tr><td style="padding:6px 14px 6px 0;color:#636374;font-size:14px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;font-size:14px;">${esc(value)}</td></tr>`
    : "";
}

function patientHtml(b: DripBookingEmailData) {
  return shell(
    `${esc(b.patientName.split(/\s+/)[0])}, your drip is booked.`,
    `<p style="margin:0 0 20px;padding:16px;background:#F7F7F8;font-size:16px;font-weight:600;">
       ${esc(b.drip)}<br>
       <span style="font-weight:400;">${esc(b.dateDisplay)} at ${esc(b.timeDisplay)}</span><br>
       <span style="font-weight:400;font-size:14px;color:#636374;">${esc(b.price)}</span>
     </p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
       Please arrive a few minutes early. Dr. Bangalee will confirm that IV therapy is
       appropriate for you before your drip begins.</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
       Your reference is <strong>${esc(b.reference)}</strong>. To change or cancel, call the
       clinic on <a href="tel:+27315731325" style="color:#939EBA;">031 573 1325</a>.</p>
     <p style="margin:0;font-size:15px;line-height:1.6;">We look forward to seeing you.</p>`,
  );
}

function adminHtml(b: DripBookingEmailData) {
  return shell(
    "New vitamin drip booking",
    `<p style="margin:0 0 20px;padding:16px;background:#F7F7F8;font-size:16px;font-weight:600;">
       ${esc(b.drip)}<br>
       <span style="font-weight:400;">${esc(b.dateDisplay)} at ${esc(b.timeDisplay)}</span>
     </p>
     <table style="border-collapse:collapse;width:100%;">
       ${row("Name", b.patientName)}
       ${row("Email", b.patientEmail)}
       ${row("Phone", b.patientPhone)}
       ${row("Price", b.price)}
       ${row("Reference", b.reference)}
     </table>
     ${
       b.notes
         ? `<p style="margin:20px 0 6px;color:#636374;font-size:14px;">Notes</p>
            <p style="margin:0;padding:16px;background:#F7F7F8;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(b.notes)}</p>`
         : ""
     }`,
  );
}

/**
 * Returns true only if the ADMIN was reached — that is what makes a booking
 * visible to the clinic. A failed patient confirmation is bad but not silent.
 */
export async function sendDripBookingEmails(b: DripBookingEmailData): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[drip-bookings] RESEND_API_KEY not set — nobody is being notified");
    return false;
  }

  let adminOk = false;
  try {
    await resend.emails.send({
      from: FROM_ADMIN,
      to: ADMIN_INBOX,
      replyTo: b.patientEmail,
      subject: `New Drip Booking: ${b.drip} — ${b.dateDisplay} at ${b.timeDisplay}`,
      html: adminHtml(b),
    });
    adminOk = true;
  } catch (err) {
    console.error("[drip-bookings] admin email failed", err);
  }

  try {
    await resend.emails.send({
      from: FROM_PATIENT,
      to: b.patientEmail,
      subject: `Drip Booked — ${b.drip} | Ref: ${b.reference}`,
      html: patientHtml(b),
    });
  } catch (err) {
    console.error("[drip-bookings] patient email failed", err);
  }

  return adminOk;
}
