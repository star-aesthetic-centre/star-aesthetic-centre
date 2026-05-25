#!/usr/bin/env node
/**
 * Upload NeoStrata collection hero images to Supabase Storage.
 *
 * Images are NOT forced to 800×800 — they are converted to WebP at their
 * natural dimensions (these are hero banners, not product thumbnails).
 *
 * Place the 5 files in SOURCE_DIR before running:
 *   neostrata-clarify-collection.webp    (or .jpg / .png)
 *   neostrata-enlighten-collection.webp
 *   neostrata-restore-collection.webp
 *   neostrata-resurface-collection.webp
 *   neostrata-skin-active-collection.webp
 *
 * Run:
 *   node scripts/upload-neostrata-collections.mjs             (dry run)
 *   node scripts/upload-neostrata-collections.mjs --upload    (upload)
 */

import { readFile, readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

// ── Config ────────────────────────────────────────────────────────────────────
const SOURCE_DIR =
  "D:/$$Josh/$$ignatius/$$$$$customers/$$$$$$$$star-aesthetic/2026/product-list/neostrata";
const BUCKET = "product-images";
const STORAGE_PREFIX = "collection-images/neostrata";
const WEBP_QUALITY = 88; // slightly higher quality for hero images

// ── Collection definitions ────────────────────────────────────────────────────
const COLLECTIONS = [
  { key: "CLARIFY",     file: "neostrata-clarify-collection" },
  { key: "ENLIGHTEN",   file: "neostrata-enlighten-collection" },
  { key: "RESTORE",     file: "neostrata-restore-collection" },
  { key: "RESURFACE",   file: "neostrata-resurface-collection" },
  { key: "SKIN ACTIVE", file: "neostrata-skin-active-collection" },
];

const IMAGE_EXTS = [".webp", ".jpg", ".jpeg", ".png"];

// ── Load .env.local ───────────────────────────────────────────────────────────
function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) throw new Error(".env.local not found");
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

const UPLOAD = process.argv.includes("--upload");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findFile(baseName) {
  for (const ext of IMAGE_EXTS) {
    const fullPath = join(SOURCE_DIR, baseName + ext);
    if (existsSync(fullPath)) return fullPath;
  }
  return null;
}

async function main() {
  console.log(`\n${UPLOAD ? "🚀 UPLOAD MODE" : "🔍 DRY RUN"} — NeoStrata Collection Images\n`);

  const results = [];

  for (const col of COLLECTIONS) {
    const filePath = await findFile(col.file);
    if (!filePath) {
      console.log(`✗ ${col.key.padEnd(15)} file not found: ${col.file}.(webp|jpg|png)`);
      results.push({ key: col.key, status: "missing" });
      continue;
    }

    const targetPath = `${STORAGE_PREFIX}/${col.file}.webp`;

    if (!UPLOAD) {
      console.log(`✓ ${col.key.padEnd(15)} ${filePath}`);
      console.log(`    → would upload to: ${targetPath}`);
      results.push({ key: col.key, status: "ready", filePath, targetPath });
      continue;
    }

    // Convert to WebP at natural dimensions (no square resize)
    const inputBuffer = await readFile(filePath);
    const meta = await sharp(inputBuffer).metadata();
    const webpBuffer = await sharp(inputBuffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    // Delete existing if present
    await sb.storage.from(BUCKET).remove([targetPath]);

    const { error: upErr } = await sb.storage.from(BUCKET).upload(targetPath, webpBuffer, {
      contentType: "image/webp",
      upsert: true,
    });

    if (upErr) {
      console.log(`✗ ${col.key.padEnd(15)} upload error: ${upErr.message}`);
      results.push({ key: col.key, status: "error", error: upErr.message });
      continue;
    }

    const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(targetPath);
    const sizeKb = Math.round(webpBuffer.length / 1024);

    console.log(`✓ ${col.key.padEnd(15)} ${meta.width}×${meta.height} → ${sizeKb}KB WebP`);
    console.log(`    URL: ${pub.publicUrl}`);
    results.push({ key: col.key, status: "uploaded", url: pub.publicUrl, sizeKb });
  }

  console.log("\n─────────────────────────────────────────────────────────────");

  if (!UPLOAD) {
    const ready = results.filter((r) => r.status === "ready").length;
    const missing = results.filter((r) => r.status === "missing").length;
    console.log(`\nDRY RUN: ${ready} ready, ${missing} missing`);
    if (missing > 0) {
      console.log(`\nMissing files — drop these into:\n  ${SOURCE_DIR}\n`);
      results.filter((r) => r.status === "missing").forEach((r) => {
        const col = COLLECTIONS.find((c) => c.key === r.key);
        console.log(`  ${col.file}.webp  (or .jpg / .png)`);
      });
    }
    console.log("\nRun with --upload when ready.\n");
    return;
  }

  // Print brands.ts snippet for easy copy-paste
  const uploaded = results.filter((r) => r.status === "uploaded");
  if (uploaded.length > 0) {
    console.log("\n✅ Paste these image URLs into lib/brands.ts → NeoStrata subcategoryDescriptions:\n");
    for (const r of uploaded) {
      console.log(`  "${r.key}": { ..., image: "${r.url}" },`);
    }
    console.log("");
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
