import { Resend } from "resend";
import {
  buildAdminOrderEmail,
  buildAdminOutcomeEmail,
  buildCustomerOrderEmail,
  buildCustomerOutcomeEmail,
  ORDER_FROM,
  ORDER_ADMIN_EMAILS,
  type OrderEmailPayload,
  type OrderOutcome,
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

const OUTCOME_SUBJECTS: Record<OrderOutcome, { customer: string; admin: string }> = {
  paid: {
    customer: "Payment Received — Order #%R% | Star Aesthetic Centre",
    admin: "PAID — Order #%R% · %N%",
  },
  unsuccessful: {
    customer: "Payment Unsuccessful — Order #%R% | Star Aesthetic Centre",
    admin: "PAYMENT FAILED — Order #%R% · %N%",
  },
  returned_unconfirmed: {
    customer: "Confirming your payment — Order #%R% | Star Aesthetic Centre",
    admin: "UNCONFIRMED payment — Order #%R% · %N%",
  },
};

/**
 * Announce the RESULT of a card payment. Only ever called from the PayFast ITN
 * handler or the return-URL safety net — never from order placement.
 */
export async function sendOrderOutcomeEmails(
  payload: OrderEmailPayload,
  outcome: OrderOutcome,
  failureDetail?: string | null
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[orders] RESEND_API_KEY not set — payment outcome emails not sent");
    return;
  }

  const resend = new Resend(apiKey);
  const subject = (template: string) =>
    template.replace("%R%", payload.reference).replace("%N%", payload.customerName);

  try {
    await Promise.all([
      resend.emails.send({
        from: ORDER_FROM,
        to: payload.customerEmail,
        subject: subject(OUTCOME_SUBJECTS[outcome].customer),
        html: buildCustomerOutcomeEmail(payload, outcome),
      }),
      resend.emails.send({
        from: ORDER_FROM,
        to: ORDER_ADMIN_EMAILS,
        replyTo: payload.customerEmail,
        subject: subject(OUTCOME_SUBJECTS[outcome].admin),
        html: buildAdminOutcomeEmail(payload, outcome, failureDetail),
      }),
    ]);
  } catch (err) {
    console.error(`[orders] Failed to send ${outcome} emails:`, err);
  }
}
