import { normalizeZaPhone } from "@/lib/utils/phone";

export type WhatsAppSendResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string; skipped?: boolean };

/**
 * Send an approved Meta WhatsApp template (e.g. cart abandonment with URL button).
 * Requires WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_CART_ABANDONMENT_TEMPLATE.
 */
export async function sendWhatsAppTemplate(opts: {
  toPhone: string;
  templateName: string;
  languageCode?: string;
  /** Body {{1}}, {{2}}, … in template order */
  bodyParameters?: string[];
  /** Dynamic suffix for URL button (e.g. ?recover=abc) — base URL is set in Meta template */
  urlButtonParameter?: string;
}): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return { ok: false, error: "WhatsApp API not configured", skipped: true };
  }

  const to = normalizeZaPhone(opts.toPhone);
  if (!to) {
    return { ok: false, error: "Invalid phone number" };
  }

  const components: Record<string, unknown>[] = [];

  if (opts.bodyParameters?.length) {
    components.push({
      type: "body",
      parameters: opts.bodyParameters.map((text) => ({ type: "text", text })),
    });
  }

  if (opts.urlButtonParameter) {
    components.push({
      type: "button",
      sub_type: "url",
      index: "0",
      parameters: [{ type: "text", text: opts.urlButtonParameter }],
    });
  }

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: opts.templateName,
      language: { code: opts.languageCode ?? "en" },
      ...(components.length ? { components } : {}),
    },
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = (await res.json().catch(() => ({}))) as {
    messages?: { id: string }[];
    error?: { message: string };
  };

  if (!res.ok) {
    return {
      ok: false,
      error: data.error?.message ?? `WhatsApp API ${res.status}`,
    };
  }

  return { ok: true, messageId: data.messages?.[0]?.id };
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID
  );
}
