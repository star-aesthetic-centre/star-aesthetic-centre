/**
 * Star Aesthetic Centre — Image Upload to Supabase Storage
 * ──────────────────────────────────────────────────────────
 * Reads all product images from LocalWP uploads folder and uploads
 * them to Supabase Storage, then prints UPDATE SQL to fix the URLs
 * in the product_images table.
 *
 * Usage:
 *   node scripts/upload-images-to-supabase.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...   ← get from Supabase → Project Settings → API
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Load .env.local ─────────────────────────────────────────────────────────
const envPath = path.join(__dirname, "../.env.local");
const env = {};
fs.readFileSync(envPath, "utf-8")
  .split("\n")
  .forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) env[k.trim()] = v.join("=").trim();
  });

const SUPABASE_URL      = env["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_ROLE_KEY  = env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(`
╔══════════════════════════════════════════════════════════════╗
║  MISSING: SUPABASE_SERVICE_ROLE_KEY in .env.local            ║
╠══════════════════════════════════════════════════════════════╣
║  1. Go to: supabase.com → Star Aesthetic Centre project      ║
║  2. Project Settings → API                                    ║
║  3. Copy the "service_role" secret (NOT the anon key)        ║
║  4. Add to .env.local:                                        ║
║     SUPABASE_SERVICE_ROLE_KEY=your_key_here                  ║
╚══════════════════════════════════════════════════════════════╝
`);
  process.exit(1);
}

// ─── Config ──────────────────────────────────────────────────────────────────
const BUCKET      = "product-images";
const UPLOADS_DIR = "C:/Users/ignat/Local Sites/star-aesthetic-centre/app/public/wp-content/uploads";
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/${BUCKET}`;

// Brand prefixes — maps filename prefix → Storage folder
const BRANDS = {
  "dermaceutic-": "dermaceutic",
  "heliocare-":   "heliocare",
};

// Skip logos, scaled variants, and WordPress size thumbnails
const SKIP_PATTERNS = [
  /-logo-/,
  /-scaled\./,
  /\d+x\d+\.webp$/,
];

// ─── Gather files ─────────────────────────────────────────────────────────────
function shouldSkip(filename) {
  return SKIP_PATTERNS.some((p) => p.test(filename));
}

function getBrand(filename) {
  for (const [prefix, brand] of Object.entries(BRANDS)) {
    if (filename.startsWith(prefix)) return brand;
  }
  return null;
}

const allFiles = fs.readdirSync(UPLOADS_DIR);
const toUpload = [];

for (const filename of allFiles) {
  if (!filename.endsWith(".webp")) continue;
  if (shouldSkip(filename)) continue;
  const brand = getBrand(filename);
  if (!brand) continue;
  toUpload.push({ filename, brand, localPath: path.join(UPLOADS_DIR, filename) });
}

console.log(`\n📦  Found ${toUpload.length} product images to upload\n`);
console.log("    Brand breakdown:");
for (const brand of [...new Set(toUpload.map((f) => f.brand))]) {
  console.log(`    ${brand}: ${toUpload.filter((f) => f.brand === brand).length} images`);
}
console.log();

// ─── Upload ──────────────────────────────────────────────────────────────────
async function uploadFile({ filename, brand, localPath }) {
  const storagePath = `${brand}/${filename}`;
  const url = `${STORAGE_BASE}/${storagePath}`;
  const fileBuffer = fs.readFileSync(localPath);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "image/webp",
      "x-upsert": "true",  // overwrite if exists
    },
    body: fileBuffer,
  });

  if (res.ok) {
    return { ok: true, storagePath };
  } else {
    const err = await res.text();
    return { ok: false, storagePath, err };
  }
}

const uploaded = [];
const failed   = [];
const BATCH    = 5;  // upload 5 at a time

for (let i = 0; i < toUpload.length; i += BATCH) {
  const batch = toUpload.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(uploadFile));

  for (const r of results) {
    if (r.ok) {
      uploaded.push(r.storagePath);
      process.stdout.write("✅ ");
    } else {
      failed.push(r);
      process.stdout.write("❌ ");
    }
  }
}

console.log("\n");

// ─── Results ─────────────────────────────────────────────────────────────────
const PUBLIC_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

console.log("══════════════════════════════════════════════════════════════");
console.log(`  Upload complete`);
console.log(`  ✅  Uploaded: ${uploaded.length}`);
console.log(`  ❌  Failed:   ${failed.length}`);
console.log("══════════════════════════════════════════════════════════════\n");

if (failed.length > 0) {
  console.log("── Failed files ────────────────────────────────────────────");
  failed.forEach(({ storagePath, err }) => {
    console.log(`  ${storagePath}`);
    console.log(`  Error: ${err}\n`);
  });
}

// ─── Generate UPDATE SQL ──────────────────────────────────────────────────────
// Fixes all local WordPress URLs → Supabase Storage URLs in product_images table
const sqlLines = [
  "-- ═══════════════════════════════════════════════════════════════════",
  "-- UPDATE product_images: local WP URLs → Supabase Storage URLs",
  "-- Run this in Supabase SQL Editor AFTER uploading images",
  "-- ═══════════════════════════════════════════════════════════════════",
  "",
];

for (const storagePath of uploaded) {
  const filename = storagePath.split("/").pop();
  const brand    = storagePath.split("/")[0];
  const oldUrl   = `https://star-aesthetic-centre.local/wp-content/uploads/${filename}`;
  const newUrl   = `${PUBLIC_BASE}/${brand}/${filename}`;

  sqlLines.push(
    `update public.product_images set url = '${newUrl}' where url = '${oldUrl}';`
  );
}

sqlLines.push("");
sqlLines.push(`-- ${uploaded.length} URLs updated`);

const sqlOutPath = path.join(__dirname, "output", "update-image-urls.sql");
fs.mkdirSync(path.join(__dirname, "output"), { recursive: true });
fs.writeFileSync(sqlOutPath, sqlLines.join("\n"), "utf-8");

console.log(`📄  UPDATE SQL saved to: scripts/output/update-image-urls.sql`);
console.log(`    Run this in Supabase SQL Editor after upload completes.\n`);
console.log(`🏁  Done. All ${uploaded.length} images are now live at:`);
console.log(`    ${PUBLIC_BASE}/dermaceutic/[filename].webp`);
console.log(`    ${PUBLIC_BASE}/heliocare/[filename].webp\n`);
