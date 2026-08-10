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
  // Retargeted 10 Aug 2026: a customer dashboard is a member area, not a
  // booking page. Sending it to /book answered a different intent.
  r("/customer-dashboard.html", "/member"),
  r("/customer-dashboard-sc.html", "/member"),

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

  // ─── Legacy shop category tree (/c/...) ───────────────────────────────────
  // Confirmed 404s on 10 Aug 2026 against URLs Google still has indexed:
  //   /c/dermaceutic-laboratoire/  /c/heliocare-products/
  //   /c/neostrata-products/enlighten/
  // These are commercial pages for brands still stocked, so the authority
  // Google assigned them was being discarded rather than passed on.
  r("/c/dermaceutic-laboratoire", "/shop/brands/dermaceutic"),
  r("/c/dermaceutic-products", "/shop/brands/dermaceutic"),
  r("/c/heliocare-products", "/shop/brands/heliocare"),
  r("/c/isdin-products", "/shop/brands/isdin"),
  r("/c/mesoestetic-products", "/shop/brands/mesoestetic"),
  r("/c/neostrata-products", "/shop/brands/neostrata"),
  r("/c/skinceuticals-products", "/shop/brands/skinceuticals"),

  // Sub-ranges within a brand (e.g. /c/neostrata-products/enlighten/) collapse
  // to the brand page — the new shop has no equivalent sub-range route, and a
  // brand page is a far better landing than a 404.
  r("/c/dermaceutic-laboratoire/:sub*", "/shop/brands/dermaceutic"),
  r("/c/dermaceutic-products/:sub*", "/shop/brands/dermaceutic"),
  r("/c/heliocare-products/:sub*", "/shop/brands/heliocare"),
  r("/c/isdin-products/:sub*", "/shop/brands/isdin"),
  r("/c/mesoestetic-products/:sub*", "/shop/brands/mesoestetic"),
  r("/c/neostrata-products/:sub*", "/shop/brands/neostrata"),
  r("/c/skinceuticals-products/:sub*", "/shop/brands/skinceuticals"),

  // Catch-all for the rest of the /c/ tree Google has not surfaced to us.
  // Deliberately LAST: Next matches in order, so the specific brand rules
  // above win and only genuinely unknown categories fall through to /shop.
  r("/c/:path*", "/shop"),

  // ─── Remaining indexed 404s ───────────────────────────────────────────────
  r("/index.html", "/"),
  r("/about-us.html", "/dr-rajeev-bangalee"),
  r("/about-us", "/dr-rajeev-bangalee"),
  r("/about.html", "/dr-rajeev-bangalee"),
  r("/customer-dashboard", "/member"),
];
