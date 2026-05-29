/**
 * 301 redirects from legacy WordPress / Bricks URLs (staraesthetic.site)
 * to the Next.js app routes on www.staraesthetic.co.za
 *
 * Source: page-sitemap.xml (Rank Math) — user confirmed treatments are Pages;
 * portfolio sitemap ignored.
 */
import type { Redirect } from "next/dist/lib/load-custom-routes";

const permanent = true;

/** Helper: legacy .html path → new clean path */
function r(source: string, destination: string): Redirect {
  return { source, destination, permanent };
}

export const legacyRedirects: Redirect[] = [
  // ─── Core pages ───────────────────────────────────────────────────────────
  r("/shop.html", "/shop"),
  r("/shop-2.html", "/shop"),
  r("/treatments.html", "/treatments"),
  r("/treatments-page.html", "/treatments"),
  r("/contact.html", "/contact"),
  r("/dr-rajeev-bangalee.html", "/dr-rajeev-bangalee"),
  r("/dr-rajeev-bangalee-incomplete.html", "/dr-rajeev-bangalee"),
  r("/purchase.html", "/shop"),
  r("/combo-deals.html", "/shop"),
  r("/thank-you.html", "/contact"),
  r("/guarantee.html", "/legal/returns-policy"),

  // ─── Legal ────────────────────────────────────────────────────────────────
  r("/legal.html", "/legal/privacy-policy"),
  r("/legal/privacy-policy.html", "/legal/privacy-policy"),
  r("/legal/returns-policy.html", "/legal/returns-policy"),
  r("/legal/terms-and-conditions.html", "/legal/terms-and-conditions"),

  // ─── E-commerce (WooCommerce / Bricks checkout flows) ─────────────────────
  r("/cart.html", "/cart"),
  r("/checkout.html", "/checkout"),
  r("/order-confirmation.html", "/order-confirmation"),
  r("/order-confirmation-sc.html", "/order-confirmation"),
  r("/woo.html", "/shop"),
  r("/checkout-001.html", "/checkout"),
  r("/checkout-003.html", "/checkout"),
  r("/checkout-004.html", "/checkout"),
  r("/checkout-001/confirmation.html", "/order-confirmation"),
  r("/checkout-001/confirmation-old.html", "/order-confirmation"),
  r("/checkout-001/order-history.html", "/book"),
  r("/checkout-002/receipt.html", "/order-confirmation"),
  r("/checkout-002/transaction-failed.html", "/checkout"),

  // ─── Legacy account pages (no WP accounts on new site) ────────────────────
  r("/login.html", "/book"),
  r("/login-2.html", "/book"),
  r("/register.html", "/book"),
  r("/profile.html", "/book"),
  r("/edit-profile.html", "/book"),
  r("/logout.html", "/"),
  r("/reset-password.html", "/book"),
  r("/my-account.html", "/book"),
  r("/customer-dashboard.html", "/book"),
  r("/customer-dashboard-sc.html", "/book"),

  // ─── Obsolete / builder / test pages → home ───────────────────────────────
  r("/box.html", "/"),
  r("/projects-page.html", "/"),
  r("/blog-awesome.html", "/"),
  r("/ebook-how-to-become-and-online-entrepreneur.html", "/"),
  r("/global-colors-green.html", "/"),

  // ─── Treatments (old .html slugs → /treatments/{category}/{slug}) ─────────
  r("/treatments/botox-treatment.html", "/treatments/face/anti-wrinkle-treatment"),
  r("/treatments/lip-filler-treatment.html", "/treatments/face/lip-filler"),
  r("/treatments/jaw-and-chin-contouring.html", "/treatments/face/jaw-amp-chin-contouring"),
  r("/treatments/dermapen-microneedling-treatment.html", "/treatments/face/dermapen-microneedling"),
  r("/treatments/skin-peel-treatment.html", "/treatments/skin/skin-peel"),
  r("/treatments/pigmentation-treatment.html", "/treatments/skin/pigmentation-treatment"),
  r("/treatments/acne-treatment.html", "/treatments/skin/acne"),
  r("/treatments/excessive-sweating-treatment.html", "/treatments/skin/excessive-sweating"),
  r("/treatments/body-contouring-treatment.html", "/treatments/body-wellness/body-contouring"),
  r("/treatments/the-medi-lean-weight-loss-program.html", "/treatments/body-wellness/medi-lean"),
  r("/treatments/varicose-veins-treatment.html", "/treatments/body-wellness/varicose-veins"),
  r("/treatments/vitamin-drips-treatment.html", "/treatments/body-wellness/vitamin-drips"),
  r(
    "/treatments/vitamin-drips-treatment/the-star-ultimate-vitamin-drip-durban.html",
    "/treatments/body-wellness/vitamin-drips"
  ),
  r(
    "/treatments/vitamin-drips-treatment/the-star-hydration-drip-durban.html",
    "/treatments/body-wellness/vitamin-drips"
  ),
  r(
    "/treatments/vitamin-drips-treatment/the-star-fitness-drip-durban.html",
    "/treatments/body-wellness/vitamin-drips"
  ),

  // ─── Without .html (WordPress may have served both) ───────────────────────
  r("/treatments/botox-treatment", "/treatments/face/anti-wrinkle-treatment"),
  // ─── Slug rename: /botox → /anti-wrinkle-treatment ────────────────────────
  r("/treatments/face/botox", "/treatments/face/anti-wrinkle-treatment"),
  r("/treatments/lip-filler-treatment", "/treatments/face/lip-filler"),
  r("/treatments/jaw-and-chin-contouring", "/treatments/face/jaw-amp-chin-contouring"),
  r("/treatments/dermapen-microneedling-treatment", "/treatments/face/dermapen-microneedling"),
  r("/treatments/skin-peel-treatment", "/treatments/skin/skin-peel"),
  r("/treatments/pigmentation-treatment", "/treatments/skin/pigmentation-treatment"),
  r("/treatments/acne-treatment", "/treatments/skin/acne"),
  r("/treatments/excessive-sweating-treatment", "/treatments/skin/excessive-sweating"),
  r("/treatments/body-contouring-treatment", "/treatments/body-wellness/body-contouring"),
  r("/treatments/the-medi-lean-weight-loss-program", "/treatments/body-wellness/medi-lean"),
  r("/treatments/varicose-veins-treatment", "/treatments/body-wellness/varicose-veins"),
  r("/treatments/vitamin-drips-treatment", "/treatments/body-wellness/vitamin-drips"),
];
