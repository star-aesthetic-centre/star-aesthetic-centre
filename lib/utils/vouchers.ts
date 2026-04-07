/**
 * Gift voucher utilities — Star Aesthetic Centre
 */

// Charset excludes confusing chars: 0/O, 1/I, 5/S
const CHARSET = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";

/** Generate a voucher code: SAC-XXXX-XXXX-XXXX */
export function generateVoucherCode(): string {
  const segment = (len: number) =>
    Array.from({ length: len }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
  return `SAC-${segment(4)}-${segment(4)}-${segment(4)}`;
}

/** Generate an order reference for EFT payment: SAC-GV-XXXXXX */
export function generateOrderReference(): string {
  const segment = (len: number) =>
    Array.from({ length: len }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
  return `SAC-GV-${segment(6)}`;
}

export const VOUCHER_DENOMINATIONS = [250, 500, 750, 1000] as const;
export type VoucherDenomination = (typeof VOUCHER_DENOMINATIONS)[number];

export type VoucherTheme = "general" | "birthday" | "mothers_day" | "anniversary" | "christmas";

export const THEME_LABELS: Record<VoucherTheme, string> = {
  general:     "General Gift",
  birthday:    "Birthday",
  mothers_day: "Mother's Day",
  anniversary: "Anniversary",
  christmas:   "Christmas",
};

export type GiftVoucher = {
  id: string;
  code: string;
  order_reference: string;
  denomination_rands: number;
  balance_rands: number;
  status: "pending_payment" | "active" | "partially_redeemed" | "redeemed" | "expired" | "cancelled";
  purchaser_name: string;
  purchaser_email: string;
  recipient_name: string;
  recipient_email: string;
  message: string | null;
  theme: VoucherTheme;
  expires_at: string | null;
  activated_at: string | null;
  created_at: string;
};

/** Build the HTML email sent to the recipient when voucher is activated */
export function buildVoucherEmail(voucher: GiftVoucher): string {
  const themeEmoji: Record<VoucherTheme, string> = {
    general:     "🌟",
    birthday:    "🎂",
    mothers_day: "💐",
    anniversary: "❤️",
    christmas:   "🎄",
  };
  const emoji = themeEmoji[voucher.theme];
  const expiry = voucher.expires_at
    ? new Date(voucher.expires_at).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
    : "3 years from activation";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Star Aesthetic Centre Gift Voucher</title>
</head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #E5E4E0;">

        <!-- Header -->
        <tr>
          <td style="background:#0F2647;padding:40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;font-family:Arial,sans-serif;">Star Aesthetic Centre</p>
            <h1 style="margin:0;font-size:28px;color:#C8A882;font-family:Georgia,serif;font-weight:normal;">Gift Voucher ${emoji}</h1>
          </td>
        </tr>

        <!-- Voucher card -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#6B6966;text-transform:uppercase;font-family:Arial,sans-serif;">You've received a gift from ${voucher.purchaser_name}</p>
            <h2 style="margin:0 0 24px;font-size:22px;color:#1A1917;font-family:Georgia,serif;font-weight:normal;">Dear ${voucher.recipient_name},</h2>

            ${voucher.message ? `<p style="margin:0 0 24px;font-size:16px;color:#6B6966;font-style:italic;border-left:3px solid #C8A882;padding-left:16px;">"${voucher.message}"</p>` : ""}

            <!-- Value box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2647;margin:0 0 32px;">
              <tr>
                <td style="padding:32px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;font-family:Arial,sans-serif;">Voucher Value</p>
                  <p style="margin:0 0 24px;font-size:48px;font-weight:bold;color:#C8A882;font-family:Georgia,serif;">R ${voucher.denomination_rands.toLocaleString("en-ZA")}</p>
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;font-family:Arial,sans-serif;">Your Voucher Code</p>
                  <p style="margin:0;font-size:28px;font-weight:bold;color:#ffffff;letter-spacing:4px;font-family:Courier New,monospace;">${voucher.code}</p>
                </td>
              </tr>
            </table>

            <!-- How to redeem -->
            <h3 style="margin:0 0 16px;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#1A1917;font-family:Arial,sans-serif;">How to Redeem</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              ${["Book a consultation or treatment online at staraesthetic.site", "Add products to your cart in our online shop", "Enter your voucher code at checkout — the value is automatically deducted", "Your voucher can be used in full or partially across multiple visits"].map((step, i) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #E5E4E0;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:28px;height:28px;background:#0F2647;color:#C8A882;text-align:center;font-size:12px;font-weight:bold;font-family:Arial,sans-serif;">${i + 1}</td>
                    <td style="padding-left:12px;font-size:14px;color:#6B6966;font-family:Arial,sans-serif;">${step}</td>
                  </tr></table>
                </td>
              </tr>`).join("")}
            </table>

            <!-- Expiry + contact -->
            <p style="margin:0 0 8px;font-size:13px;color:#6B6966;font-family:Arial,sans-serif;">
              <strong style="color:#1A1917;">Valid until:</strong> ${expiry}
            </p>
            <p style="margin:0 0 24px;font-size:13px;color:#6B6966;font-family:Arial,sans-serif;">
              <strong style="color:#1A1917;">Questions?</strong> Call us on <a href="tel:+27315731325" style="color:#C8A882;">+27 (0)31 573 1325</a> or email <a href="mailto:info@staraesthetic.site" style="color:#C8A882;">info@staraesthetic.site</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8F8F7;padding:24px 40px;border-top:1px solid #E5E4E0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#6B6966;font-family:Arial,sans-serif;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
            <p style="margin:4px 0 0;font-size:11px;color:#939EBA;font-family:Arial,sans-serif;">Voucher code: ${voucher.code} · Non-transferable · No cash value</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
