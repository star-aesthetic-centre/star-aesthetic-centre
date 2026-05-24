#!/usr/bin/env node
/**
 * NeoStrata image upload script.
 *
 * For each NeoStrata product folder under SOURCE_DIR:
 *   1. Selects image files (skips videos, docs, thumbnails, old-site images,
 *      "ingredients/results" info graphics).
 *   2. Resizes each to 800x800 square WebP (fit: contain, white background)
 *      via sharp — preserves the whole image, pads with white if rectangular.
 *   3. Uploads to Supabase Storage at `product-images/neostrata/{slug}-{n}.webp`.
 *   4. Replaces product_images rows for the matching product.
 *   5. Updates product.price_cents to the 2026 price.
 *
 * Run modes:
 *   node scripts/upload-neostrata-images.mjs               (dry run — default)
 *   node scripts/upload-neostrata-images.mjs --upload      (actually upload)
 *   node scripts/upload-neostrata-images.mjs --upload --only=bionic-face-cream
 *
 * Reads .env.local automatically via dotenv-style parsing.
 */

import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

// ── Config ────────────────────────────────────────────────────────────────
const SOURCE_DIR =
  "D:/$$Josh/$$ignatius/$$$$$customers/$$$$$$$$star-aesthetic/2026/product-list/neostrata";
const BUCKET = "product-images";
const BRAND_PREFIX = "neostrata";
const SQUARE_SIZE = 800;
const WEBP_QUALITY = 85;

// ── Folder name → Supabase product slug ──────────────────────────────────
const FOLDER_TO_SLUG = {
  "NeoStrata 15% Vitamin C + PHA Serum": "neostrata-15-vitamin-c-pha-serum",
  "NeoStrata Bionic Face Cream": "neostrata-bionic-face-cream",
  "NeoStrata Enlighten Brightening Eye Cream": "neostrata-enlighten-brightening-eye-cream",
  "NeoStrata Enlighten Brightening Pack": "neostrata-enlighten-brightening-pack",
  "NeoStrata Enlighten Dark Spot Corrector": "neostrata-enlighten-dark-spot-corrector",
  "NeoStrata Enlighten Illuminating Serum": "neostrata-enlighten-illuminating-serum",
  "NeoStrata Enlighten Pigment Controller": "neostrata-enlighten-pigment-controller",
  "NeoStrata Enlighten Skin Brightener SPF35": "neostrata-enlighten-skin-brightener-spf35",
  "NeoStrata Enlighten Trio Pack": "neostrata-enlighten-trio-pack",
  "NeoStrata Enlighten Ultra Brightening Cleanser": "neostrata-enlighten-ultra-brightening-cleanser",
  "NeoStrata Eye Cream": "neostrata-eye-cream",
  "NeoStrata Facial Cleanser": "neostrata-facial-cleanser",
  "NeoStrata Glycolic Renewal Smoothing Cream": "neostrata-glycolic-renewal-smoothing-cream",
  "NeoStrata Glycolic Renewal Smoothing Lotion": "neostrata-glycolic-renewal-smoothing-lotion",
  "NeoStrata High Potency Cream": "neostrata-high-potency-cream",
  "NeoStrata Mandelic Clarifying Cleanser": "neostrata-mandelic-clarifying-cleanser",
  "NeoStrata Oily Skin Solution": "neostrata-oily-skin-solution",
  "NeoStrata PHA Daily Moisturizer": "neostrata-pha-daily-moisturizer",
  "NeoStrata Sheer Hydration SPF 40": "neostrata-sheer-hydration-spf40",
  "NeoStrata Skin Active Exfoliating Wash": "neostrata-skin-active-exfoliating-wash",
  "NeoStrata Skin Active Hyaluronic Luminous Lift": "neostrata-skin-active-hyaluronic-luminous-lift",
  "NeoStrata Skin Active Intensive Eye Therapy": "neostrata-skin-active-intensive-eye-therapy",
  "NeoStrata Skin Active Matrix Support SPF 30": "neostrata-skin-active-matrix-support-spf30",
  "NeoStrata Skin Active Potent Retinol Complex": "neostrata-skin-active-potent-retinol-complex",
  "NeoStrata Skin Active Rebound Sculpting Cream": "neostrata-skin-active-rebound-sculpting-cream",
  "NeoStrata Targeted Clarifying Gel": "neostrata-targeted-clarifying-gel",
  "NeoStrata Ultra Moisturising Face Cream": "neostrata-ultra-moisturising-face-cream",
};

// ── 2026 prices (Rand) from NEOSTRATA-NEW-PRODUCTS-IMAGE-TITLES-2026.md ────
const PRICES_2026 = {
  "neostrata-glycolic-renewal-smoothing-cream": 372,
  "neostrata-glycolic-renewal-smoothing-lotion": 429,
  "neostrata-high-potency-cream": 572,
  "neostrata-facial-cleanser": 362,
  "neostrata-bionic-face-cream": 533,
  "neostrata-ultra-moisturising-face-cream": 439,
  "neostrata-eye-cream": 396,
  "neostrata-pha-daily-moisturizer": 468,
  "neostrata-mandelic-clarifying-cleanser": 410,
  "neostrata-oily-skin-solution": 394,
  "neostrata-targeted-clarifying-gel": 307,
  "neostrata-sheer-hydration-spf40": 487,
  "neostrata-enlighten-ultra-brightening-cleanser": 445,
  "neostrata-enlighten-pigment-controller": 720,
  "neostrata-enlighten-illuminating-serum": 840,
  "neostrata-enlighten-skin-brightener-spf35": 639,
  "neostrata-enlighten-dark-spot-corrector": 384,
  "neostrata-enlighten-brightening-eye-cream": 562,
  "neostrata-15-vitamin-c-pha-serum": 581,
  "neostrata-skin-active-exfoliating-wash": 476,
  "neostrata-skin-active-matrix-support-spf30": 733,
  "neostrata-skin-active-intensive-eye-therapy": 837,
  "neostrata-skin-active-potent-retinol-complex": 865,
  "neostrata-skin-active-hyaluronic-luminous-lift": 1031,
  "neostrata-skin-active-rebound-sculpting-cream": 935,
  "neostrata-enlighten-brightening-pack": 1370,
  "neostrata-enlighten-trio-pack": 1693,
};

// ── CLI args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const UPLOAD = args.includes("--upload");
const ONLY = (args.find((a) => a.startsWith("--only=")) ?? "").slice(7) || null;
const SKIP_PRICES = args.includes("--skip-prices");

// ── Load .env.local ───────────────────────────────────────────────────────
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

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── File selection rules ──────────────────────────────────────────────────
const IMAGE_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function shouldInclude(filename) {
  const lower = filename.toLowerCase();
  const ext = extname(lower);
  if (!IMAGE_EXTS.has(ext)) return false;
  // Skip thumbnails — we generate our own
  if (lower.endsWith("-800.webp") || lower.endsWith("-800.jpg") || lower.endsWith("-800.png")) return false;
  // Skip old-site images
  if (lower.startsWith("star-aesthetic-")) return false;
  // Skip placeholder / screenshot junk
  if (lower === "untitled.png" || lower.startsWith("untitled")) return false;
  // Skip info graphics (ingredients lists, results charts, screen captures)
  if (lower === "ingredients.png" || lower === "imgredients.png") return false;
  if (lower === "results.png") return false;
  if (lower.startsWith("ingredient-list") || lower.startsWith("ingredients-list")) return false;
  if (lower.endsWith("-screen-page.png") || lower.endsWith("screen-page.png")) return false;
  // Skip collection / PLP images
  if (lower.startsWith("plp_") || lower.startsWith("plp-")) return false;
  // Skip logos
  if (lower.includes("logo")) return false;
  return true;
}

/**
 * Drop duplicates where both .jpg and .webp variants of the same base name
 * exist — prefer .webp (smaller, already optimized).
 */
function dedupeExtensions(files) {
  const baseNames = new Map();
  for (const f of files) {
    const base = f.replace(/\.(webp|jpg|jpeg|png)$/i, "").toLowerCase();
    if (!baseNames.has(base)) baseNames.set(base, []);
    baseNames.get(base).push(f);
  }
  const keep = new Set();
  for (const variants of baseNames.values()) {
    if (variants.length === 1) {
      keep.add(variants[0]);
      continue;
    }
    // Prefer .webp, then .jpg, then .png
    const webp = variants.find((v) => v.toLowerCase().endsWith(".webp"));
    const jpg = variants.find((v) => /\.jpe?g$/i.test(v));
    keep.add(webp ?? jpg ?? variants[0]);
  }
  return files.filter((f) => keep.has(f));
}

/**
 * Cross-reference: a file in folder A whose name contains a slug fragment of
 * folder B is probably an orphan. We detect this conservatively.
 */
function isOrphanForFolder(filename, ownSlug, allSlugs) {
  const lower = filename.toLowerCase();
  // If filename contains a fragment unique to a different product
  for (const otherSlug of allSlugs) {
    if (otherSlug === ownSlug) continue;
    // Distinctive multi-word fragments
    const distinctive = otherSlug.replace(/^neostrata-/, "").split("-").filter((p) => p.length >= 5);
    for (let i = 0; i < distinctive.length - 1; i++) {
      const pair = `${distinctive[i]}-${distinctive[i + 1]}`;
      if (lower.includes(pair) && !ownSlug.includes(pair)) {
        return true;
      }
    }
  }
  return false;
}

/** Sort: primary first (no -NNN suffix), then by trailing numeric */
function sortImages(files) {
  return [...files].sort((a, b) => {
    const aNum = a.match(/-(\d{3,4})\.(webp|jpg|jpeg|png)$/i);
    const bNum = b.match(/-(\d{3,4})\.(webp|jpg|jpeg|png)$/i);
    if (!aNum && bNum) return -1;
    if (aNum && !bNum) return 1;
    if (aNum && bNum) return parseInt(aNum[1], 10) - parseInt(bNum[1], 10);
    return a.localeCompare(b);
  });
}

// ── Process one product ───────────────────────────────────────────────────
async function processProduct(folderName, slug, allSlugs) {
  const folder = join(SOURCE_DIR, folderName);
  if (!existsSync(folder)) return { slug, status: "no-folder" };

  const rawFiles = (await readdir(folder)).filter((f) => shouldInclude(f) && !isOrphanForFolder(f, slug, allSlugs));
  const files = dedupeExtensions(rawFiles);
  if (files.length === 0) return { slug, status: "no-images" };

  const sorted = sortImages(files);

  // Fetch product
  const { data: product, error } = await sb
    .from("products")
    .select("id, name")
    .eq("slug", slug)
    .single();
  if (error || !product) return { slug, status: "product-not-found", error: error?.message };

  const newPrice = PRICES_2026[slug];
  const result = { slug, productId: product.id, productName: product.name, files: sorted, newPrice, uploaded: [] };

  if (!UPLOAD) return result;

  // ── Actually upload ──
  // 1. Delete existing storage objects for this product
  const folderPath = `${BRAND_PREFIX}/${slug.replace(/^neostrata-/, "")}`;
  const { data: existing } = await sb.storage.from(BUCKET).list(folderPath, { limit: 100 });
  if (existing && existing.length > 0) {
    const paths = existing.map((f) => `${folderPath}/${f.name}`);
    await sb.storage.from(BUCKET).remove(paths);
  }

  // 2. Process and upload each image
  for (let i = 0; i < sorted.length; i++) {
    const sourceFile = join(folder, sorted[i]);
    const targetName = `${slug.replace(/^neostrata-/, "")}-${String(i).padStart(2, "0")}.webp`;
    const targetPath = `${folderPath}/${targetName}`;

    const inputBuffer = await readFile(sourceFile);
    const webpBuffer = await sharp(inputBuffer)
      .resize(SQUARE_SIZE, SQUARE_SIZE, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    const { error: upErr } = await sb.storage.from(BUCKET).upload(targetPath, webpBuffer, {
      contentType: "image/webp",
      upsert: true,
    });
    if (upErr) {
      result.uploaded.push({ source: sorted[i], error: upErr.message });
      continue;
    }
    const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(targetPath);
    result.uploaded.push({ source: sorted[i], target: targetPath, url: pub.publicUrl, sort_order: i, size_kb: Math.round(webpBuffer.length / 1024) });
  }

  // 3. Replace product_images rows
  await sb.from("product_images").delete().eq("product_id", product.id);

  const imageRows = result.uploaded
    .filter((u) => !u.error)
    .map((u) => ({
      product_id: product.id,
      url: u.url,
      alt_text: `${product.name} — view ${u.sort_order + 1}`,
      sort_order: u.sort_order,
    }));
  if (imageRows.length > 0) {
    const { error: insErr } = await sb.from("product_images").insert(imageRows);
    if (insErr) result.imageRowError = insErr.message;
  }

  // 4. Update price
  if (!SKIP_PRICES && newPrice) {
    const { error: priceErr } = await sb
      .from("products")
      .update({ price_cents: newPrice * 100 })
      .eq("id", product.id);
    if (priceErr) result.priceError = priceErr.message;
    else result.priceUpdated = true;
  }

  return result;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const allSlugs = Object.values(FOLDER_TO_SLUG);
  const entries = Object.entries(FOLDER_TO_SLUG).filter(([_, slug]) => !ONLY || slug.includes(ONLY));

  console.log(`\n${UPLOAD ? "🚀 UPLOAD MODE" : "🔍 DRY RUN"} — ${entries.length} products\n`);

  const results = [];
  for (const [folder, slug] of entries) {
    const r = await processProduct(folder, slug, allSlugs);
    results.push(r);
    const newPrice = PRICES_2026[slug];
    const priceStr = newPrice ? `R${newPrice}` : "(no price)";
    if (r.status === "no-folder") {
      console.log(`✗ ${slug.padEnd(50)} folder missing`);
    } else if (r.status === "no-images") {
      console.log(`⊘ ${slug.padEnd(50)} no eligible images — skip   ${priceStr}`);
    } else if (r.status === "product-not-found") {
      console.log(`✗ ${slug.padEnd(50)} product not in DB`);
    } else {
      const fileCount = r.files?.length ?? 0;
      const uploadStr = UPLOAD ? ` → uploaded: ${r.uploaded.filter((u) => !u.error).length}/${r.uploaded.length}` : "";
      console.log(`✓ ${slug.padEnd(50)} ${fileCount} files  ${priceStr}${uploadStr}`);
      if (!UPLOAD) {
        for (const f of r.files) console.log(`     ${f}`);
      }
      if (UPLOAD) {
        for (const u of r.uploaded) {
          if (u.error) console.log(`     ✗ ${u.source}  ${u.error}`);
          else console.log(`     ✓ [${u.sort_order}] ${u.source.padEnd(60)} → ${u.size_kb}KB`);
        }
        if (r.priceUpdated) console.log(`     💰 price updated → R${newPrice}`);
        if (r.priceError) console.log(`     ✗ price error: ${r.priceError}`);
        if (r.imageRowError) console.log(`     ✗ image row error: ${r.imageRowError}`);
      }
    }
  }

  const ok = results.filter((r) => r.files?.length).length;
  const empty = results.filter((r) => r.status === "no-images").length;
  console.log(`\nSummary: ${ok} products with images · ${empty} empty/skip\n`);
  if (!UPLOAD) {
    console.log("This was a DRY RUN. To actually upload, run with --upload\n");
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
