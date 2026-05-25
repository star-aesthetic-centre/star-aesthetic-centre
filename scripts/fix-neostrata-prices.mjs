#!/usr/bin/env node
/**
 * Fix NeoStrata product prices to use RRSP Inc VAT (column F, NeoStrata.xlsx).
 *
 * Run:
 *   node scripts/fix-neostrata-prices.mjs           (dry run — lists what will change)
 *   node scripts/fix-neostrata-prices.mjs --update  (applies updates to Supabase)
 */

import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// ── Correct retail prices: March 2025 RRSP Inc VAT (column F, NeoStrata.xlsx) ─
const CORRECT_PRICES = {
  "neostrata-glycolic-renewal-smoothing-cream":     641.01,
  "neostrata-glycolic-renewal-smoothing-lotion":     740.85,
  "neostrata-high-potency-cream":                    986.47,
  "neostrata-facial-cleanser":                       624.94,
  "neostrata-bionic-face-cream":                     918.58,
  "neostrata-ultra-moisturising-face-cream":         756.83,
  "neostrata-hydra-filling-pha-eye-cream":            682.94,
  "neostrata-pha-daily-moisturizer":                 806.74,
  "neostrata-mandelic-clarifying-cleanser":          707.59,
  "neostrata-oily-skin-solution":                    679.37,
  "neostrata-targeted-clarifying-gel":               530.19,
  "neostrata-sheer-hydration-spf40":                 840.64,
  "neostrata-enlighten-ultra-brightening-cleanser":  767.17,
  "neostrata-enlighten-pigment-controller":         1241.31,
  "neostrata-enlighten-illuminating-serum":         1448.88,
  "neostrata-enlighten-skin-brightener-spf35":      1102.94,
  "neostrata-enlighten-dark-spot-corrector":         662.97,
  "neostrata-enlighten-brightening-eye-cream":       968.72,
  "neostrata-15-vitamin-c-pha-serum":               1002.26,
  "neostrata-skin-active-exfoliating-wash":          821.70,
  "neostrata-skin-active-matrix-support-spf30":     1264.78,
  "neostrata-skin-active-intensive-eye-therapy":    1444.53,
  "neostrata-skin-active-potent-retinol-complex":   1492.92,
  "neostrata-skin-active-hyaluronic-luminous-lift": 1778.19,
  "neostrata-skin-active-rebound-sculpting-cream":  1612.01,
  "neostrata-enlighten-brightening-pack":           2363.55,
  "neostrata-enlighten-trio-pack":                  2920.14,
};

// ── Load .env.local ───────────────────────────────────────────────────────────
function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) throw new Error(".env.local not found — run from project root");
  const raw = readFileSync(path, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnvLocal();

const UPDATE = process.argv.includes("--update");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log(`\n${UPDATE ? "🔄 UPDATE MODE" : "🔍 DRY RUN"} — NeoStrata Price Fix\n`);
  console.log(`${"Slug".padEnd(55)} Old (cents)  New (cents)`);
  console.log("─".repeat(80));

  // Fetch current prices from Supabase
  const slugs = Object.keys(CORRECT_PRICES);
  const { data: rows, error } = await sb
    .from("products")
    .select("id, slug, price_cents")
    .in("slug", slugs);

  if (error) throw new Error(`Supabase fetch failed: ${error.message}`);

  const bySlug = Object.fromEntries((rows ?? []).map((r) => [r.slug, r]));
  let changed = 0;
  let notFound = 0;

  for (const [slug, retailPrice] of Object.entries(CORRECT_PRICES)) {
    const correctCents = Math.round(retailPrice * 100);
    const row = bySlug[slug];

    if (!row) {
      console.log(`  ✗ NOT FOUND  ${slug}`);
      notFound++;
      continue;
    }

    const oldCents = row.price_cents;
    const marker = oldCents === correctCents ? "  ✓ no change" : "  → WILL UPDATE";
    console.log(
      `${marker.padEnd(14)} ${slug.padEnd(50)} ${String(oldCents).padStart(10)}  ${String(correctCents).padStart(10)}`
    );

    if (UPDATE && oldCents !== correctCents) {
      const { error: updErr } = await sb
        .from("products")
        .update({ price_cents: correctCents })
        .eq("id", row.id);

      if (updErr) {
        console.error(`  ✗ UPDATE FAILED for ${slug}: ${updErr.message}`);
      } else {
        changed++;
      }
    } else if (oldCents !== correctCents) {
      changed++;
    }
  }

  console.log("\n" + "─".repeat(80));
  if (UPDATE) {
    console.log(`\n✅ Updated ${changed} product prices. ${notFound} slugs not found in DB.\n`);
  } else {
    console.log(`\nDRY RUN: ${changed} prices would change. ${notFound} slugs not found.`);
    console.log("Run with --update to apply.\n");
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
