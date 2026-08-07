import { NextResponse } from "next/server";
import {
  claimAbandonedReminder,
  listAbandonedCheckoutsForReminder,
  releaseAbandonedReminder,
} from "@/lib/queries/abandoned-checkouts";
import { sendWhatsAppTemplate, isWhatsAppConfigured } from "@/lib/utils/whatsapp";
import {
  buildRecoveryUrl,
  sendCartAbandonmentEmail,
} from "@/lib/utils/cart-abandonment-email";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const delayMinutes = Number(process.env.CART_ABANDONMENT_DELAY_MINUTES ?? "60");
  const templateName =
    process.env.WHATSAPP_CART_ABANDONMENT_TEMPLATE ?? "cart_abandonment";
  const whatsappEnabled = isWhatsAppConfigured();

  const pending = await listAbandonedCheckoutsForReminder({
    inactiveMinutes: delayMinutes,
    limit: 25,
  });

  const results: {
    id: string;
    whatsapp?: string;
    email?: string;
  }[] = [];

  for (const row of pending) {
    const firstName = row.first_name?.trim() || "there";
    const recoveryUrl = buildRecoveryUrl(row.recovery_token);
    const itemCount = Array.isArray(row.cart_items) ? row.cart_items.length : 0;
    const urlSuffix = `?recover=${encodeURIComponent(row.recovery_token)}`;

    let sent = false;

    // The send slot is claimed BEFORE dispatch, so two overlapping runs can
    // never both message the same person. A failed send hands the slot back.
    if (whatsappEnabled && row.phone && (await claimAbandonedReminder(row.id, "whatsapp"))) {
      const wa = await sendWhatsAppTemplate({
        toPhone: row.phone,
        templateName,
        languageCode: process.env.WHATSAPP_TEMPLATE_LANG ?? "en",
        bodyParameters: [firstName],
        urlButtonParameter: urlSuffix,
      });

      if (wa.ok) {
        sent = true;
        results.push({ id: row.id, whatsapp: "sent" });
      } else {
        await releaseAbandonedReminder(row.id, "whatsapp");
        if (!wa.skipped) results.push({ id: row.id, whatsapp: wa.error });
      }
    }

    if (!sent && row.email && (await claimAbandonedReminder(row.id, "email"))) {
      const mail = await sendCartAbandonmentEmail({
        to: row.email,
        firstName,
        recoveryUrl,
        itemCount,
        subtotalCents: row.subtotal_cents,
      });

      if (mail.ok) {
        results.push({ id: row.id, email: "sent" });
      } else {
        await releaseAbandonedReminder(row.id, "email");
        if (!mail.skipped) results.push({ id: row.id, email: mail.error });
      }
    }
  }

  return NextResponse.json({
    ok: true,
    delayMinutes,
    processed: pending.length,
    whatsappConfigured: whatsappEnabled,
    results,
    ts: new Date().toISOString(),
  });
}
