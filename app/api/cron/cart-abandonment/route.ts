import { NextResponse } from "next/server";
import {
  listAbandonedCheckoutsForReminder,
  markAbandonedReminderSent,
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

    if (whatsappEnabled && row.phone) {
      const wa = await sendWhatsAppTemplate({
        toPhone: row.phone,
        templateName,
        languageCode: process.env.WHATSAPP_TEMPLATE_LANG ?? "en",
        bodyParameters: [firstName],
        urlButtonParameter: urlSuffix,
      });

      if (wa.ok) {
        await markAbandonedReminderSent(row.id, "whatsapp");
        sent = true;
        results.push({ id: row.id, whatsapp: "sent" });
      } else if (!wa.skipped) {
        results.push({ id: row.id, whatsapp: wa.error });
      }
    }

    if (!sent && row.email) {
      const mail = await sendCartAbandonmentEmail({
        to: row.email,
        firstName,
        recoveryUrl,
        itemCount,
        subtotalCents: row.subtotal_cents,
      });

      if (mail.ok) {
        await markAbandonedReminderSent(row.id, "email");
        results.push({ id: row.id, email: "sent" });
      } else if (!mail.skipped) {
        results.push({ id: row.id, email: mail.error });
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
