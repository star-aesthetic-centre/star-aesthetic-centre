import { Resend } from "resend";
import {
  buildAdminOrderEmail,
  buildCustomerOrderEmail,
  ORDER_FROM,
  ORDER_ADMIN_EMAILS,
  type OrderEmailPayload,
} from "@/lib/utils/order-emails";

export async function sendOrderEmails(payload: OrderEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[orders] RESEND_API_KEY not set — order emails not sent");
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: ORDER_FROM,
        to: payload.customerEmail,
        subject: `Order Confirmed — #${payload.reference} | Star Aesthetic Centre`,
        html: buildCustomerOrderEmail(payload),
      }),
      resend.emails.send({
        from: ORDER_FROM,
        to: ORDER_ADMIN_EMAILS,
        replyTo: payload.customerEmail,
        subject: `New Shop Order — #${payload.reference} · ${payload.customerName}`,
        html: buildAdminOrderEmail(payload),
      }),
    ]);
  } catch (err) {
    console.error("[orders] Failed to send order emails:", err);
  }
}
