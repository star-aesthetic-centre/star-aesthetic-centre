/**
 * Star Aesthetic Centre — WooCommerce CSV → Supabase INSERT SQL
 * ─────────────────────────────────────────────────────────────
 * Usage:
 *   node scripts/csv-to-sql.mjs <path-to-csv> <brand-slug>
 *
 * Example:
 *   node scripts/csv-to-sql.mjs "E:/path/to/dermaceutic-export.csv" dermaceutic
 *
 * Output:
 *   Writes  scripts/output/<brand-slug>-insert.sql
 *   Paste that file into Supabase SQL Editor and Run.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Parse a single CSV line respecting double-quoted fields */
function parseLine(line) {
  const result = [];
  let inQuotes = false;
  let current = "";

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // escaped quote inside field
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/** Convert ZAR price string (e.g. "715" or "1 135.50") to integer cents */
function toCents(priceStr) {
  if (!priceStr || priceStr.trim() === "") return null;
  const cleaned = priceStr.replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return null;
  return Math.round(num * 100);
}

/** Convert product name to a URL slug */
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Fix UTF-8 encoding corruption common in CSV exports
 * (mojibake from Latin-1 misread of UTF-8 em-dash etc.)
 */
function fixEncoding(str) {
  if (!str) return str;
  return str
    .replace(/â€"/g, "–")   // en-dash
    .replace(/â€"/g, "—")   // em-dash
    .replace(/â€™/g, "'")   // right single quote
    .replace(/â€œ/g, "\u201C") // left double quote
    .replace(/â€/g,  "\u201D"); // right double quote
}

/**
 * Some CSVs store Name as "ShortLabel: BrandName ProductName - Full description"
 * This extracts the clean product name — the part before " - " after the colon.
 * Falls back to the part before the colon, then the raw name.
 */
function cleanName(raw) {
  raw = fixEncoding(raw.trim());
  const colonIdx = raw.indexOf(": ");
  if (colonIdx === -1) return raw;

  const after = raw.slice(colonIdx + 2).trim(); // "BrandName ProductName - Description..."
  const dashIdx = after.indexOf(" - ");
  if (dashIdx !== -1) {
    return after.slice(0, dashIdx).trim();       // "BrandName ProductName"
  }
  return raw.slice(0, colonIdx).trim();          // fallback: label before colon
}

/**
 * Extract a useful short description.
 * Some CSVs have short_description === name (no real copy written).
 * In those cases extract the text after " - " from the name field,
 * or return null so it imports as NULL.
 */
function cleanShortDesc(rawName, rawShortDesc) {
  const name = fixEncoding(rawName.trim());
  const sd   = fixEncoding((rawShortDesc || "").trim());

  // If short desc is genuinely different from name, use it
  if (sd && sd !== name) return sd;

  // Try to extract from "Label: BrandProduct - Useful description text"
  const m = name.match(/:\s*.+?\s+-\s+(.+)$/);
  if (m) return m[1].trim();

  return null; // will be stored as NULL — description needs writing
}

/** Escape single quotes for SQL strings */
function esc(str) {
  if (!str) return "";
  return str.replace(/'/g, "''");
}

/** Wrap value in SQL single quotes, or return NULL */
function sqlStr(val) {
  if (val === null || val === undefined || val === "") return "NULL";
  return `'${esc(val)}'`;
}

/** Convert comma-separated tags string to Postgres array literal */
function toTagsArray(tagsStr) {
  if (!tagsStr || tagsStr.trim() === "") return "ARRAY[]::text[]";
  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `'${esc(t)}'`);
  return `ARRAY[${tags.join(", ")}]`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const [, , csvPath, brandSlug] = process.argv;

if (!csvPath || !brandSlug) {
  console.error("Usage: node scripts/csv-to-sql.mjs <csv-path> <brand-slug>");
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.error(`File not found: ${csvPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, "utf-8");
const lines = raw.split("\n").filter((l) => l.trim() !== "");
const headers = parseLine(lines[0]);

const rows = lines.slice(1).map((line) => {
  const values = parseLine(line);
  const row = {};
  headers.forEach((h, i) => {
    row[h] = (values[i] ?? "").trim();
  });
  return row;
});

// Filter: only simple published products (skip variations/grouped)
const products = rows.filter(
  (r) =>
    r["Type"] === "simple" &&
    parseFloat(r["Published"] || "0") === 1 &&
    r["Visibility in catalog"] !== "hidden"
);

console.log(`\nFound ${products.length} publishable simple products.\n`);

// ─── Build SQL ────────────────────────────────────────────────────────────────

const outLines = [];

outLines.push(`-- ═══════════════════════════════════════════════════════════`);
outLines.push(`-- Star Aesthetic Centre — Product Import: ${brandSlug}`);
outLines.push(`-- Generated: ${new Date().toISOString()}`);
outLines.push(`-- Source: ${path.basename(csvPath)}`);
outLines.push(`-- Products: ${products.length}`);
outLines.push(`-- ═══════════════════════════════════════════════════════════`);
outLines.push(``);

// ── 1. Add tags[] column if it doesn't exist (safe to re-run) ────────────────
outLines.push(`-- Add tags column to products if not already present`);
outLines.push(`alter table public.products`);
outLines.push(`  add column if not exists tags text[] not null default '{}';`);
outLines.push(``);

// ── 2. Insert products ────────────────────────────────────────────────────────
outLines.push(`-- ── Products ──────────────────────────────────────────────`);
outLines.push(`insert into public.products`);
outLines.push(
  `  (name, slug, sku, brand_slug, short_description, description,`
);
outLines.push(`   price_cents, regular_price_cents, is_active, tags)`);
outLines.push(`values`);

const productInserts = products.map((p, i) => {
  const name = cleanName(p["Name"] || "");
  const slug = toSlug(name);
  const sku = p["SKU"] || null;
  const shortDesc = cleanShortDesc(p["Name"] || "", p["Short description"] || "");
  const desc = fixEncoding(p["Description"] || null);
  const regularPrice = p["Regular price"];
  const salePrice = p["Sale price"];
  // Use sale price as current price if set, otherwise regular price
  const priceCents = toCents(salePrice || regularPrice);
  const regularPriceCents = toCents(regularPrice);
  const isActive = p["Published"] === "1" ? "true" : "false";
  const tags = p["Tags"] || "";

  const comma = i < products.length - 1 ? "," : "";

  return (
    `  (` +
    `${sqlStr(name)}, ` +
    `${sqlStr(slug)}, ` +
    `${sqlStr(sku)}, ` +
    `'${brandSlug}', ` +
    `${sqlStr(shortDesc)}, ` +
    `${sqlStr(desc)}, ` +
    `${priceCents ?? "NULL"}, ` +
    `${regularPriceCents ?? "NULL"}, ` +
    `${isActive}, ` +
    `${toTagsArray(tags)}` +
    `)${comma}`
  );
});

outLines.push(...productInserts);
outLines.push(`on conflict (slug) do update set`);
outLines.push(`  name               = excluded.name,`);
outLines.push(`  sku                = excluded.sku,`);
outLines.push(`  short_description  = excluded.short_description,`);
outLines.push(`  description        = excluded.description,`);
outLines.push(`  price_cents        = excluded.price_cents,`);
outLines.push(`  regular_price_cents = excluded.regular_price_cents,`);
outLines.push(`  tags               = excluded.tags,`);
outLines.push(`  updated_at         = now();`);
outLines.push(``);

// ── 3. Insert product images ──────────────────────────────────────────────────
outLines.push(`-- ── Product Images ────────────────────────────────────────`);
outLines.push(`-- NOTE: URLs are local WordPress URLs — update after`);
outLines.push(`--       uploading images to Supabase Storage.`);
outLines.push(``);

for (const p of products) {
  const name = cleanName(p["Name"] || "");
  const slug = toSlug(name);
  const imagesRaw = p["Images"] || "";
  const imageUrls = imagesRaw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);

  if (imageUrls.length === 0) continue;

  outLines.push(`insert into public.product_images (product_id, url, alt_text, sort_order)`);
  const imageRows = imageUrls.map((url, i) => {
    return `  (select id from public.products where slug = '${slug}'), ${sqlStr(url)}, ${sqlStr(name)}, ${i}`;
  });
  outLines.push(imageRows.join(",\n"));
  outLines.push(`on conflict do nothing;`);
  outLines.push(``);
}

// ── 4. Insert product stock ───────────────────────────────────────────────────
outLines.push(`-- ── Product Stock ─────────────────────────────────────────`);
outLines.push(`insert into public.product_stock (product_id, status, quantity)`);

const stockRows = products.map((p, i) => {
  const slug = toSlug(cleanName(p["Name"] || ""));
  const inStock = p["In stock?"] === "1" ? "IN_STOCK" : "OUT_OF_STOCK";
  const qty = p["Stock"] && p["Stock"] !== "" ? parseInt(p["Stock"]) : "NULL";
  const comma = i < products.length - 1 ? "," : "";
  return `  ((select id from public.products where slug = '${slug}'), '${inStock}', ${qty})${comma}`;
});

outLines.push(`values`);
outLines.push(...stockRows);
outLines.push(`on conflict (product_id) do update set`);
outLines.push(`  status     = excluded.status,`);
outLines.push(`  quantity   = excluded.quantity,`);
outLines.push(`  updated_at = now();`);
outLines.push(``);

// ── 5. Verify query ───────────────────────────────────────────────────────────
outLines.push(`-- ── Verify ─────────────────────────────────────────────────`);
outLines.push(`select p.name, p.slug, p.price_cents, ps.status`);
outLines.push(`from public.products p`);
outLines.push(`join public.product_stock ps on ps.product_id = p.id`);
outLines.push(`where p.brand_slug = '${brandSlug}'`);
outLines.push(`order by p.name;`);

// ─── Write output ──────────────────────────────────────────────────────────────

const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const outputPath = path.join(outputDir, `${brandSlug}-insert.sql`);
fs.writeFileSync(outputPath, outLines.join("\n"), "utf-8");

console.log(`✅  SQL written to: ${outputPath}`);
console.log(`    Products:  ${products.length}`);
console.log(
  `    Images:    ${products.filter((p) => p["Images"]).length} products with images`
);
console.log(`\n    Next: paste ${brandSlug}-insert.sql into Supabase SQL Editor → Run\n`);
