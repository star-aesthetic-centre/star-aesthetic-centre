#!/usr/bin/env node
/**
 * Apply inc-VAT prices from a supplier Excel file to Supabase products.
 * Matches by SKU and/or product name (--match sku|name|both).
 *
 *   node scripts/inspect-pricelist.mjs --file "D:\product-list\...\Dermaceutic.xlsx"
 *   node scripts/apply-pricelist.mjs --file "..." --brand dermaceutic --name-col 1 --price-col 4 --header-row 5 --match both
 *   node scripts/apply-pricelist.mjs ... --sql
 *   node scripts/apply-pricelist.mjs ... --update
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  normSku,
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
    update: false,
    sql: false,
    out: "scripts/output/pricelist-update.sql",
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
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--update") args.update = true;
    else if (a === "--sql") args.sql = true;
  }
  if (!args.file || !args.brand) {
    console.error(
      "Usage: node scripts/apply-pricelist.mjs --file <path.xlsx> --brand <slug> [--sku-col 0] [--name-col 1] [--price-col 4] [--header-row 5] [--match both] [--update | --sql]"
    );
    process.exit(1);
  }
  return args;
}

function sqlEscape(s) {
  return String(s).replace(/'/g, "''");
}

async function main() {
  const args = parseArgs(process.argv);
  if (!existsSync(args.file)) {
    throw new Error(`File not found: ${args.file}`);
  }

  const { sheetName, bySku, byName, all } = readExcelPricelist(args);
  const isHeliocareCantabria = args.brand === "heliocare" && args.format === "cantabria";
  const genopMap = isHeliocareCantabria ? HELIOCARE_GENOP_TO_SLUG : null;
  const excelToSlug =
    isHeliocareCantabria ? heliocareExcelToSlug : args.brand === "isdin" ? isdinExcelToSlug : null;
  if (all.length === 0) {
    throw new Error("No prices read from Excel — run inspect-pricelist.mjs and check column args");
  }

  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: products, error } = await sb
    .from("products")
    .select("id, name, slug, sku, price_cents, regular_price_cents")
    .eq("brand_slug", args.brand)
    .order("name");

  if (error) throw new Error(error.message);

  const updates = [];
  const notInExcel = [];
  const matchedVia = { sku: 0, name: 0, "name~": 0, genop: 0, alias: 0 };

  for (const p of products ?? []) {
    const hit = matchProduct(p, bySku, byName, all, args.match, genopMap, excelToSlug);
    if (!hit) {
      notInExcel.push(p);
      continue;
    }
    consumeMatch(bySku, byName, hit);
    matchedVia[hit.via]++;

    const newCents = Math.round(hit.ex.priceZar * 100);
    const oldCents = p.price_cents ?? 0;
    if (newCents !== oldCents) {
      updates.push({ product: p, ex: hit.ex, oldCents, newCents, via: hit.via });
    }
  }

  const notOnSite = [...bySku.values(), ...byName.values()].filter(
    (ex, i, arr) => arr.findIndex((x) => x.row === ex.row) === i
  );

  const mode = args.update ? "UPDATE" : args.sql ? "SQL" : "DRY RUN";
  console.log(`\n${mode} — ${args.brand} prices from Excel`);
  console.log(`File: ${args.file}`);
  console.log(`Sheet: "${sheetName}" | format: ${args.format} | ${all.length} Excel rows | match: ${args.match}`);
  console.log(
    `Matched — alias: ${matchedVia.alias} | genop: ${matchedVia.genop} | name: ${matchedVia.name} | similar: ${matchedVia["name~"]} | sku: ${matchedVia.sku}\n`
  );

  console.log(`${"Match".padEnd(6)} ${"SKU".padEnd(20)} ${"Old (R)".padStart(10)} ${"New (R)".padStart(10)}  Product`);
  console.log("─".repeat(80));
  for (const u of updates) {
    console.log(
      `${u.via.padEnd(6)} ${(u.product.sku || "—").padEnd(20)} ${(u.oldCents / 100).toFixed(2).padStart(10)} ${(u.newCents / 100).toFixed(2).padStart(10)}  ${u.product.name}`
    );
  }

  const unchanged = (products?.length ?? 0) - updates.length - notInExcel.length;
  console.log(`\n→ ${updates.length} to update | ${unchanged} already correct | ${notInExcel.length} on site, not in Excel | ${notOnSite.length} in Excel, not on site`);

  if (notInExcel.length) {
    console.log("\nOn site, not matched in Excel:");
    for (const p of notInExcel) console.log(`  ${p.sku || "—"} | ${p.name}`);
  }
  if (notOnSite.length) {
    console.log("\nIn Excel, not matched on site:");
    for (const ex of notOnSite.slice(0, 20)) {
      console.log(
        `  row ${ex.row}: ${ex.supplierCode || ex.sku || "—"} | ${ex.name || "—"} | R ${ex.priceZar.toFixed(2)}`
      );
    }
  }

  const outFile =
    args.brand !== "neostrata" && args.out === "scripts/output/pricelist-update.sql"
      ? `scripts/output/${args.brand}-pricelist-update.sql`
      : args.out;

  if (args.sql || (!args.update && updates.length > 0)) {
    const lines = [
      `-- ${args.brand} price update from ${args.file}`,
      `-- RRSP inc VAT × 100 → price_cents / regular_price_cents`,
      `-- Generated ${new Date().toISOString().slice(0, 10)}`,
      "",
    ];
    for (const u of updates) {
      lines.push(
        `update public.products set price_cents = ${u.newCents}, regular_price_cents = ${u.newCents}, updated_at = now() where id = '${u.product.id}'; -- ${sqlEscape(u.product.name)} (was ${(u.oldCents / 100).toFixed(2)}, now ${(u.newCents / 100).toFixed(2)})`
      );
    }
    lines.push("", "-- Verify", "select name, sku, price_cents, round(price_cents::numeric / 100, 2) as price_zar from public.products", `where brand_slug = '${sqlEscape(args.brand)}' order by name;`, "");
    const outPath = join(process.cwd(), outFile);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, lines.join("\n"), "utf8");
    console.log(`\nSQL written: ${outPath}`);
    if (!args.update) console.log("Review the file, then run in Supabase SQL Editor — or re-run with --update");
  }

  if (args.update) {
    let ok = 0;
    for (const u of updates) {
      const { error: updErr } = await sb
        .from("products")
        .update({ price_cents: u.newCents, regular_price_cents: u.newCents })
        .eq("id", u.product.id);
      if (updErr) console.error(`  ✗ ${u.product.name}: ${updErr.message}`);
      else ok++;
    }
    console.log(`\n✅ Updated ${ok} products in Supabase.\n`);
  } else if (!args.sql) {
    console.log("\nDry run only. To apply: add --sql or --update\n");
  }
}

main().catch((e) => {
  console.error("FATAL:", e.message ?? e);
  process.exit(1);
});
