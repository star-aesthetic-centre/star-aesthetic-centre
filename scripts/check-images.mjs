/**
 * Star Aesthetic Centre — Image URL Checker
 * ──────────────────────────────────────────
 * Checks every product image URL in the database and reports:
 *   ✅  URL reachable (image exists)
 *   ❌  URL returns 404 / error (image missing — needs sourcing)
 *   ⚠️  Filename only (never had a URL — definitely missing)
 *
 * Usage:
 *   node scripts/check-images.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(__dirname, "../.env.local");
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .forEach((line) => {
      const [k, ...v] = line.split("=");
      if (k && v.length) env[k.trim()] = v.join("=").trim();
    });
}

const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];
const SUPABASE_ANON_KEY = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

// ─── Fetch all product images from Supabase ──────────────────────────────────
async function fetchImages() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product_images?select=id,url,product_id`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
  return res.json();
}

// Fetch product name for a given product_id
async function fetchProducts() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=id,name,slug,brand_slug`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error(`Supabase products fetch failed: ${res.status}`);
  return res.json();
}

// ─── Check a URL ─────────────────────────────────────────────────────────────
async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    return res.status;
  } catch {
    return 0; // network error / timeout
  }
}

function isFilenameOnly(url) {
  return url && !url.startsWith("http");
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log("\n🔍  Fetching product images from Supabase...");
const [images, products] = await Promise.all([fetchImages(), fetchProducts()]);

const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

const missing    = [];
const filenameOnly = [];
const ok         = [];

console.log(`    Found ${images.length} image records. Checking URLs...\n`);

// Check in batches of 10 to avoid overwhelming the server
const BATCH = 10;
for (let i = 0; i < images.length; i += BATCH) {
  const batch = images.slice(i, i + BATCH);
  await Promise.all(
    batch.map(async (img) => {
      const product = productMap[img.product_id] || {};

      if (isFilenameOnly(img.url)) {
        filenameOnly.push({ product, url: img.url });
        process.stdout.write("⚠️ ");
        return;
      }

      const status = await checkUrl(img.url);
      if (status === 200) {
        ok.push({ product, url: img.url });
        process.stdout.write("✅ ");
      } else {
        missing.push({ product, url: img.url, status });
        process.stdout.write("❌ ");
      }
    })
  );
}
console.log("\n");

// ─── Report ───────────────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════════");
console.log("  Star Aesthetic Centre — Image Check Report");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log(`✅  Reachable:        ${ok.length}`);
console.log(`❌  URL returning 404: ${missing.length}`);
console.log(`⚠️   Filename only:    ${filenameOnly.length}`);
console.log(`    Total checked:    ${images.length}\n`);

if (filenameOnly.length > 0) {
  console.log("─── ⚠️  FILENAME ONLY (never had a URL) ────────────────────────");
  console.log("    Source these images from the brand's website.\n");
  filenameOnly.forEach(({ product, url }) => {
    const brand = (product.brand_slug || "").toUpperCase().padEnd(14);
    console.log(`  [${brand}]  ${product.name}`);
    console.log(`             Filename: ${url}`);
    console.log(`             Recommended: ${toWebpFilename(url)}\n`);
  });
}

if (missing.length > 0) {
  console.log("─── ❌  BROKEN URLs (404 / unreachable) ────────────────────────");
  console.log("    Source these images from the brand's website.\n");
  missing.forEach(({ product, url, status }) => {
    const brand = (product.brand_slug || "").toUpperCase().padEnd(14);
    console.log(`  [${brand}]  ${product.name}`);
    console.log(`             Status: ${status || "timeout"}`);
    console.log(`             Old URL: ${url}`);
    console.log(`             Recommended: ${toWebpFilename(url)}\n`);
  });
}

if (missing.length === 0 && filenameOnly.length === 0) {
  console.log("🎉  All images are reachable — ready to migrate to Supabase Storage.");
}

// ─── Write report to file ─────────────────────────────────────────────────────
const reportLines = [];
reportLines.push("brand,product_name,product_slug,status,old_url,recommended_filename");

filenameOnly.forEach(({ product, url }) => {
  reportLines.push(`${product.brand_slug},"${product.name}",${product.slug},FILENAME_ONLY,"${url}","${toWebpFilename(url)}"`);
});
missing.forEach(({ product, url }) => {
  reportLines.push(`${product.brand_slug},"${product.name}",${product.slug},URL_404,"${url}","${toWebpFilename(url)}"`);
});

const outPath = path.join(__dirname, "output", "missing-images.csv");
fs.writeFileSync(outPath, reportLines.join("\n"), "utf-8");
console.log(`\n📄  Full report saved to: ${outPath}\n`);

// ─── Helper ───────────────────────────────────────────────────────────────────
function toWebpFilename(url) {
  const base = url.split("/").pop() || url;
  return base
    .replace(/-800\.(jpg|jpeg|png|webp)$/i, ".webp")
    .replace(/\.(jpg|jpeg|png)$/i, ".webp");
}
