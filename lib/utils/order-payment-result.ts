import type { SupabaseClient } from "@supabase/supabase-js";
import { isDeliveryMethod, type DeliveryMethod } from "@/lib/constants/fulfilment";
import { sendOrderOutcomeEmails } from "@/lib/utils/send-order-emails";
import type { OrderEmailPayload, OrderOutcome } from "@/lib/utils/order-emails";
import { calculateStarlights } from "@/lib/utils/rewards";

/**
 * Emails that announce the RESULT of a PayFast payment.
 *
 * Two guarantees:
 *  1. Nothing is sent until PayFast has actually told us what happened.
 *  2. Each outcome goes out exactly once per order — the send slot is claimed
 *     atomically before dispatch, so PayFast's ITN retries, or a customer
 *     refreshing the return page, cannot produce a second email.
 */

type DispatchArgs = {
  supabase: SupabaseClient;
  orderId: string;
  outcome: OrderOutcome;
  /** Raw PayFast payment_status — admin email only. */
  failureDetail?: string | null;
};

type DispatchResult = { sent: boolean; reason?: string };

const ORDER_COLUMNS =
  "id, reference, customer_name, customer_email, customer_phone, shipping_address, " +
  "subtotal_cents, shipping_cents, total_cents, notes, payment_method, delivery_method";

/** The migration hasn't been run — the guard columns simply aren't there. */
function isMissingColumn(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42703" ||
    /payment_result_email_(sent_at|outcome)|delivery_method|payment_method/.test(
      error.message ?? ""
    )
  );
}

function formatShippingAddress(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const a = raw as unknown as Record<string, unknown>;
  return [a.line1, a.line2, a.city, a.province, a.postal_code]
    .filter((part): part is string => typeof part === "string" && part.trim() !== "")
    .join(", ");
}

export async function dispatchOrderPaymentResultEmails(
  args: DispatchArgs
): Promise<DispatchResult> {
  const { supabase, orderId, outcome, failureDetail } = args;

  // ── 1. Claim the send slot atomically (no row updated = already sent) ──────
  // The claim is per OUTCOME, so a payment that first failed and is later
  // completed still gets its confirmation — the same outcome never repeats.
  let order: Record<string, unknown> | null = null;

  const claim = await supabase
    .from("orders")
    .update({
      payment_result_email_sent_at: new Date().toISOString(),
      payment_result_email_outcome: outcome,
    })
    .eq("id", orderId)
    .or(`payment_result_email_outcome.is.null,payment_result_email_outcome.neq.${outcome}`)
    .select(ORDER_COLUMNS)
    .maybeSingle();

  if (claim.error && isMissingColumn(claim.error)) {
    console.warn(
      "[payment-result] guard columns missing — run scripts/sql/payfast-and-collection-migration.sql " +
        "(duplicate-send guard inactive)"
    );
    const fallback = await supabase
      .from("orders")
      .select(
        "id, reference, customer_name, customer_email, customer_phone, shipping_address, " +
          "subtotal_cents, shipping_cents, total_cents, notes"
      )
      .eq("id", orderId)
      .maybeSingle();
    if (fallback.error || !fallback.data) return { sent: false, reason: "order-not-found" };
    order = fallback.data as unknown as Record<string, unknown>;
  } else if (claim.error) {
    console.error("[payment-result] claim failed:", claim.error.message);
    return { sent: false, reason: "claim-failed" };
  } else if (!claim.data) {
    // Another request already claimed it — the normal duplicate-ITN path.
    return { sent: false, reason: "already-sent" };
  } else {
    order = claim.data as unknown as Record<string, unknown>;
  }

  const customerEmail = String(order.customer_email ?? "").trim();
  if (!customerEmail) return { sent: false, reason: "no-email" };

  // ── 2. Line items for the email body ──────────────────────────────────────
  const { data: itemRows } = await supabase
    .from("order_items")
    .select("product_name, quantity, unit_price_cents, line_total_cents")
    .eq("order_id", orderId);

  const deliveryMethod: DeliveryMethod = isDeliveryMethod(order.delivery_method)
    ? order.delivery_method
    : "delivery";

  const totalCents = Number(order.total_cents ?? 0);
  const subtotalCents = Number(order.subtotal_cents ?? 0);
  const shippingCents = Number(order.shipping_cents ?? 0);

  const payload: OrderEmailPayload = {
    reference: String(order.reference ?? ""),
    customerName: String(order.customer_name ?? ""),
    customerEmail,
    customerPhone: String(order.customer_phone ?? ""),
    shippingAddress: formatShippingAddress(order.shipping_address),
    lineItems: (itemRows ?? []).map((row) => ({
      product_name: String(row.product_name ?? "Item"),
      quantity: Number(row.quantity ?? 1),
      unit_price_cents: Number(row.unit_price_cents ?? 0),
      line_total_cents: Number(row.line_total_cents ?? 0),
    })),
    subtotalCents,
    shippingCents,
    // Reconstructed: the discount is whatever the totals don't account for.
    voucherDiscountCents: Math.max(0, subtotalCents + shippingCents - totalCents),
    totalCents,
    voucherNote: (order.notes as string | null) ?? null,
    // Only a confirmed payment earns Star Lights.
    starlightsEarned: outcome === "paid" ? calculateStarlights(totalCents / 100) : 0,
    isNewMember: false,
    deliveryMethod,
    paymentMethod: "payfast",
  };

  await sendOrderOutcomeEmails(payload, outcome, failureDetail);
  return { sent: true };
}
