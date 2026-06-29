import { BANK_DETAILS } from "@/lib/constants/banking";
import { formatStarlights } from "@/lib/utils/rewards";

/** Customer-facing "send proof of payment to" address — must be an inbox that's actually monitored. */
export const ORDER_POP_EMAIL = "info@staraesthetic.site";
/** Admin notification recipients — dual-sent to the monitored .site inbox and the official .co.za address. */
export const ORDER_ADMIN_EMAILS = ["info@staraesthetic.site", "info@staraesthetic.co.za"];
/** staraesthetic.co.za is NOT a verified Resend sending domain — sends from it fail silently. Use staraesthetic.site. */
export const ORDER_FROM = "Star Aesthetic Centre <bookings@staraesthetic.site>";

export type OrderLineItem = {
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  line_total_cents: number;
};

export type OrderEmailPayload = {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  lineItems: OrderLineItem[];
  subtotalCents: number;
  shippingCents: number;
  voucherDiscountCents: number;
  totalCents: number;
  voucherNote?: string | null;
  starlightsEarned: number;
  isNewMember: boolean;
};

function formatZar(cents: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function lineItemsTableHtml(items: OrderLineItem[]): string {
  const rows = items
    .map(
      (li) => `
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#1A1917;">${li.product_name}</td>
        <td style="padding:10px 16px;font-size:13px;color:#6B6966;text-align:center;">${li.quantity}</td>
        <td style="padding:10px 16px;font-size:13px;color:#1A1917;text-align:right;font-weight:600;">${formatZar(li.line_total_cents)}</td>
      </tr>`
    )
    .join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
      <tr style="background:#F8F8F7;">
        <th style="padding:10px 16px;font-size:11px;text-align:left;color:#6B6966;text-transform:uppercase;letter-spacing:1px;">Product</th>
        <th style="padding:10px 16px;font-size:11px;text-align:center;color:#6B6966;text-transform:uppercase;letter-spacing:1px;">Qty</th>
        <th style="padding:10px 16px;font-size:11px;text-align:right;color:#6B6966;text-transform:uppercase;letter-spacing:1px;">Total</th>
      </tr>
      ${rows}
    </table>`;
}

function totalsBlockHtml(p: OrderEmailPayload): string {
  const rows: [string, string][] = [
    ["Subtotal", formatZar(p.subtotalCents)],
    ["Shipping", p.shippingCents === 0 ? "Free" : formatZar(p.shippingCents)],
  ];
  if (p.voucherDiscountCents > 0) {
    rows.push(["Gift voucher", `−${formatZar(p.voucherDiscountCents)}`]);
  }
  rows.push(["Order total", formatZar(p.totalCents)]);

  return rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
        <td style="padding:8px 16px;font-size:13px;color:#6B6966;">${label}</td>
        <td style="padding:8px 16px;font-size:13px;color:#1A1917;font-weight:600;text-align:right;">${value}</td>
      </tr>`
    )
    .join("");
}

function bankingTableHtml(reference: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
      ${[
        ["Bank", BANK_DETAILS.bank],
        ["Account Name", BANK_DETAILS.accountName],
        ["Account No", BANK_DETAILS.accountNo],
        ["Branch Code", BANK_DETAILS.branchCode],
        ["Account Type", BANK_DETAILS.accountType],
        ["Reference", `<strong style="color:#C8A882;">Order #${reference}</strong>`],
      ]
        .map(
          ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
        <td style="padding:10px 16px;font-size:13px;color:#6B6966;width:140px;">${label}</td>
        <td style="padding:10px 16px;font-size:13px;color:#1A1917;font-weight:600;">${value}</td>
      </tr>`
        )
        .join("")}
    </table>`;
}

function starlightsBlockHtml(p: OrderEmailPayload): string {
  if (p.starlightsEarned <= 0) return "";

  const memberLine = p.isNewMember
    ? "We've created your <strong style=\"color:#1A1917;\">Star Light Rewards</strong> account using this email — no extra sign-up needed."
    : "Your <strong style=\"color:#1A1917;\">Star Light Rewards</strong> account is linked to this email.";

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #C8A882;background:#FFF8F0;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;">Star Light Rewards</p>
        <p style="margin:0 0 12px;font-size:22px;font-weight:bold;color:#C8A882;font-family:Georgia,serif;">
          ${formatStarlights(p.starlightsEarned)}
        </p>
        <p style="margin:0 0 8px;font-size:13px;color:#6B6966;line-height:1.6;">
          You'll earn <strong style="color:#1A1917;">${formatStarlights(p.starlightsEarned)}</strong>
          (worth R ${p.starlightsEarned.toLocaleString("en-ZA")}) once we confirm your EFT payment.
          1 Star Light = R1 toward your next treatment or shop purchase.
        </p>
        <p style="margin:0;font-size:13px;color:#6B6966;line-height:1.6;">
          ${memberLine}
          <a href="https://www.staraesthetic.co.za/rewards" style="color:#C8A882;">Check your balance</a>
        </p>
      </td></tr>
    </table>`;
}

function emailShell(title: string, body: string, footerNote: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:32px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:22px;color:#C8A882;font-weight:normal;">${title}</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        ${body}
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:20px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#6B6966;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
        <p style="margin:4px 0 0;font-size:11px;color:#939EBA;">${footerNote}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

/** Customer: order received + EFT instructions */
export function buildCustomerOrderEmail(p: OrderEmailPayload): string {
  const firstName = p.customerName.split(" ")[0] || p.customerName;

  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${firstName},</p>
    <p style="margin:0 0 24px;font-size:14px;color:#6B6966;line-height:1.6;">
      Thank you for shopping with Star Aesthetic Centre. Your order <strong style="color:#1A1917;">#${p.reference}</strong> has been received.
      Please complete your EFT payment using the banking details below — your order is reserved while we await payment.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2647;margin:0 0 24px;">
      <tr><td style="padding:24px 32px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;">Amount to Pay</p>
        <p style="margin:0;font-size:40px;font-weight:bold;color:#C8A882;font-family:Georgia,serif;">${formatZar(p.totalCents)}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#939EBA;">Order #${p.reference}</p>
      </td></tr>
    </table>

    <h3 style="margin:0 0 12px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#1A1917;">Your order</h3>
    ${lineItemsTableHtml(p.lineItems)}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
      ${totalsBlockHtml(p)}
    </table>

    <p style="margin:0 0 8px;font-size:13px;color:#6B6966;"><strong style="color:#1A1917;">Deliver to:</strong><br/>${p.shippingAddress}</p>

    <h3 style="margin:24px 0 16px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#1A1917;">EFT banking details</h3>
    ${bankingTableHtml(p.reference)}

    <div style="background:#FFF8F0;border:1px solid #C8A882;border-left:4px solid #C8A882;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0 0 12px;font-size:13px;color:#6B6966;line-height:1.6;">
        <strong style="color:#1A1917;">What happens next</strong>
      </p>
      <ol style="margin:0;padding-left:20px;font-size:13px;color:#6B6966;line-height:1.8;">
        <li>Pay via EFT using reference <strong style="color:#C8A882;">Order #${p.reference}</strong></li>
        <li>Email proof of payment to <a href="mailto:${ORDER_POP_EMAIL}" style="color:#C8A882;">${ORDER_POP_EMAIL}</a></li>
        <li>We confirm payment and dispatch within 1–2 business days</li>
      </ol>
    </div>

    ${starlightsBlockHtml(p)}

    <p style="margin:0;font-size:13px;color:#6B6966;">
      Questions? Call <a href="tel:+27315731325" style="color:#C8A882;">+27 (0)31 573 1325</a> or reply to this email.
    </p>`;

  return emailShell("Order Confirmation", body, `Order #${p.reference}`);
}

/** Clinic alert: new shop order */
export function buildAdminOrderEmail(p: OrderEmailPayload): string {
  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">New online shop order</p>
    <p style="margin:0 0 24px;font-size:14px;color:#6B6966;line-height:1.6;">
      <strong style="color:#1A1917;">#${p.reference}</strong> · ${formatZar(p.totalCents)} · awaiting EFT payment
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
      ${[
        ["Customer", p.customerName],
        ["Email", `<a href="mailto:${p.customerEmail}" style="color:#C8A882;">${p.customerEmail}</a>`],
        ["Phone", `<a href="tel:${p.customerPhone.replace(/\s/g, "")}" style="color:#C8A882;">${p.customerPhone}</a>`],
        ["Ship to", p.shippingAddress],
        ...(p.voucherNote ? [["Notes", p.voucherNote]] : []),
      ]
        .map(
          ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
        <td style="padding:10px 16px;font-size:13px;color:#6B6966;width:100px;vertical-align:top;">${label}</td>
        <td style="padding:10px 16px;font-size:13px;color:#1A1917;">${value}</td>
      </tr>`
        )
        .join("")}
    </table>

    <h3 style="margin:0 0 12px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#1A1917;">Items</h3>
    ${lineItemsTableHtml(p.lineItems)}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
      ${totalsBlockHtml(p)}
    </table>

    ${
      p.starlightsEarned > 0
        ? `<p style="margin:0 0 16px;font-size:13px;color:#6B6966;line-height:1.6;">
      <strong style="color:#1A1917;">Star Light Rewards:</strong> Credit
      <strong style="color:#C8A882;">${formatStarlights(p.starlightsEarned)}</strong>
      (R ${p.starlightsEarned}) when payment is confirmed${p.isNewMember ? " — new member auto-enrolled" : ""}.
    </p>`
        : ""
    }

    <p style="margin:0;font-size:13px;color:#6B6966;">
      Customer confirmation email sent to <strong>${p.customerEmail}</strong>.
      Await proof of payment at <a href="mailto:${ORDER_POP_EMAIL}" style="color:#C8A882;">${ORDER_POP_EMAIL}</a>.
    </p>`;

  return emailShell("New Shop Order", body, `Order #${p.reference} · ${p.customerName}`);
}
