#!/usr/bin/env node
/**
 * Compare a supplier Excel pricelist (prices INC VAT) against live Supabase products.
 *
 * Setup (once):
 *   npm install xlsx
 *
 * NeoStrata example (Column F = RRSP inc VAT, SKU often in column A):
 *   node scripts/audit-pricelist.mjs ^
 *     --file "D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\NeoStrata.xlsx" ^
 *     --brand neostrata ^
 *     --sku-col 0 ^
 *     --price-col 5 ^
 *     --header-row 1
 *
 * Dry run only — never writes to the database.
 */

import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  readExcelPricelist,
  matchProduct,
  consumeMatch,
} from "./lib/pricelist-excel.mjs";
import { HELIOCARE_GENOP_TO_SLUG } from "./lib/heliocare-genop-map.mjs";
import { heliocareExcelToSlug } from "./lib/heliocare-excel-aliases.mjs";
import { isdinExcelToSlug } from "./lib/isdin-excel-aliases.mjs";

function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) throw new Error(".env.local not found — run from nextjs project root");
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

function parseArgs(argv) {
  const args = {
    file: null,
    brand: null,
    skuCol: 0,
    nameCol: -1,
    priceCol: 4,
    headerRow: 0,
    sheet: 0,
    format: "simple",
    match: "both",
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file") args.file = argv[++i];
    else if (a === "--brand") args.brand = argv[++i];
    else if (a === "--sku-col") args.skuCol = Number(argv[++i]);
    else if (a === "--name-col") args.nameCol = Number(argv[++i]);
    else if (a === "--price-col") args.priceCol = Number(argv[++i]);
    else if (a === "--header-row") args.headerRow = Number(argv[++i]);
    else if (a === "--sheet") args.sheet = argv[++i];
    else if (a === "--format") args.format = argv[++i];
    else if (a === "--match") args.match = argv[++i];
  }
  if (!args.file || !args.brand) {
    console.error("Usage: node scripts/audit-pricelist.mjs --file <path.xlsx> --brand <brand_slug> [--sku-col 0] [--name-col 1] [--price-col 4] [--header-row 5] [--match both]");
    process.exit(1);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  if (!existsSync(args.file)) {
    throw new Error(`File not found: ${args.file}\n(Close Excel if the file is open, then retry.)`);
  }

  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { sheetName, bySku, byName, all } = readExcelPricelist(args);
  const isHeliocareCantabria = args.brand === "heliocare" && args.format === "cantabria";
  const genopMap = isHeliocareCantabria ? HELIOCARE_GENOP_TO_SLUG : null;
  const excelToSlug =
    isHeliocareCantabria ? heliocareExcelToSlug : args.brand === "isdin" ? isdinExcelToSlug : null;

  const { data: products, error } = await sb
    .from("products")
    .select("id, name, slug, sku, price_cents, is_active")
    .eq("brand_slug", args.brand)
    .order("name");

  if (error) throw new Error(error.message);

  const mismatches = [];
  const onlySite = [];
  let matchedSame = 0;

  for (const p of products ?? []) {
    const hit = matchProduct(p, bySku, byName, all, args.match, genopMap, excelToSlug);
    if (!hit) {
      onlySite.push(p);
      continue;
    }
    consumeMatch(bySku, byName, hit);
    const siteZar = p.price_cents != null ? Math.round(p.price_cents) / 100 : null;
    if (siteZar == null || Math.abs(siteZar - hit.ex.priceZar) > 0.01) {
      mismatches.push({ ex: hit.ex, site: p, siteZar, via: hit.via });
    } else {
      matchedSame++;
    }
  }

  const onlyExcel = [...bySku.values(), ...byName.values()].filter(
    (ex, i, arr) => arr.findIndex((x) => x.row === ex.row) === i
  );

  console.log(`\nPricelist audit — ${args.brand}`);
  console.log(`Excel: ${args.file}`);
  console.log(`Sheet: "${sheetName}" | ${all.length} Excel rows | match: ${args.match}`);
  console.log(`Prices compared as ZAR INC VAT (Excel) vs price_cents/100 (site)\n`);

  if (all.length === 0) {
    console.log("⚠ No product rows read from Excel (wrong columns or header row?).");
    console.log("  Run: node scripts/inspect-pricelist.mjs --file \"<same path>\"\n");
  }

  console.log(`✓ Matched & same price: ${matchedSame}`);
  console.log(`⚠ Price mismatch:       ${mismatches.length}`);
  console.log(`⚠ In Excel, not on site: ${onlyExcel.length}`);
  console.log(`⚠ On site, not in Excel: ${onlySite.length}\n`);

  if (mismatches.length) {
    console.log("── PRICE MISMATCHES ──");
    console.log(`${"Via".padEnd(6)} ${"SKU".padEnd(16)} ${"Excel (inc VAT)".padStart(14)} ${"Site (inc VAT)".padStart(14)}  Product`);
    for (const { ex, site, siteZar, via } of mismatches) {
      console.log(
        `${via.padEnd(6)} ${(ex.sku || site.sku || "—").padEnd(16)} ${String(ex.priceZar.toFixed(2)).padStart(14)} ${String(siteZar?.toFixed(2) ?? "—").padStart(14)}  ${site.name}`
      );
    }
    console.log();
  }

  if (onlyExcel.length) {
    console.log("── IN EXCEL ONLY (missing or SKU mismatch on site) ──");
    for (const ex of onlyExcel.slice(0, 30)) {
      console.log(`  row ${ex.row}: ${ex.sku || "—"} | ${ex.name} | R ${ex.priceZar.toFixed(2)}`);
    }
    if (onlyExcel.length > 30) console.log(`  … and ${onlyExcel.length - 30} more`);
    console.log();
  }

  if (onlySite.length) {
    console.log("── ON SITE ONLY (not in this Excel) ──");
    for (const p of onlySite.slice(0, 30)) {
      const zar = p.price_cents != null ? (p.price_cents / 100).toFixed(2) : "—";
      console.log(`  ${p.sku || "—"} | ${p.name} | R ${zar} | ${p.is_active ? "active" : "inactive"}`);
    }
    if (onlySite.length > 30) console.log(`  … and ${onlySite.length - 30} more`);
    console.log();
  }

  console.log("To fix prices after review: Admin → Products, or ask developer to run a price-update script.\n");
}

main().catch((e) => {
  console.error("FATAL:", e.message ?? e);
  process.exit(1);
});
