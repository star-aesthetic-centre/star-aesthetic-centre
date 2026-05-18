import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { creditOrderStarlights } from "@/lib/utils/credit-order-starlights";
import { formatStarlights } from "@/lib/utils/rewards";

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get("admin_session")?.value === "authenticated";
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { orderId?: string; reference?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const id = body.orderId?.trim();
  const reference = body.reference?.trim();
  if (!id && !reference) {
    return NextResponse.json({ error: "orderId or reference required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("orders")
    .select("id, reference, customer_name, customer_email, customer_phone, total_cents, status");

  query = id ? query.eq("id", id) : query.eq("reference", reference!);

  const { data: order, error: fetchError } = await query.single();

  if (fetchError || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status === "cancelled" || order.status === "refunded") {
    return NextResponse.json({ error: "Cannot confirm payment for a cancelled order" }, { status: 400 });
  }

  const credit = await creditOrderStarlights(supabase, order);

  if (credit.error) {
    return NextResponse.json({ error: credit.error }, { status: 500 });
  }

  let newStatus = order.status;
  if (order.status === "pending") {
    newStatus = "processing";
  }

  if (newStatus !== order.status) {
    const { error: statusError } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.id);

    if (statusError) {
      console.error("[orders/confirm-payment] status update:", statusError);
    }
  }

  const message = credit.alreadyCredited
    ? `Payment already confirmed — ${formatStarlights(credit.starlights)} were credited earlier.`
    : credit.credited
      ? `✓ Payment confirmed. ${formatStarlights(credit.starlights)} credited to ${order.customer_email}.`
      : credit.starlights === 0
        ? "Payment confirmed (no Star Lights for this order total)."
        : "Payment confirmed.";

  return NextResponse.json({
    success: true,
    reference: order.reference,
    starlights: credit.starlights,
    credited: credit.credited,
    alreadyCredited: credit.alreadyCredited,
    isNewMember: credit.isNewMember,
    status: newStatus,
    message,
  });
}
