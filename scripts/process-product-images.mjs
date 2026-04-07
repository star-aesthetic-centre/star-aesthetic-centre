/**
 * Star Aesthetic Centre — Product Image Processor
 * ─────────────────────────────────────────────────
 * Automates steps 4–6 of the product image workflow:
 *   - Crops to square (centre crop)
 *   - Resizes to 800×800px
 *   - Converts to WebP
 *   - Compresses (replaces TinyJPG)
 *   - Outputs with correct filename
 *
 * USAGE:
 *   node scripts/process-product-images.mjs <input-folder> [output-folder]
 *
 * EXAMPLES:
 *   # Process a single product folder, output to public/images
 *   node scripts/process-product-images.mjs "E:/myimages/heliocare-gel-spf50"
 *
 *   # Process all subfolders in a brand folder
 *   node scripts/process-product-images.mjs "E:/myimages/heliocare" --all
 *
 *   # Custom output folder
 *   node scripts/process-product-images.mjs "E:/myimages/heliocare" --out "E:/processed"
 */

import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DEFAULT_OUTPUT = "C:/Users/ignat/Local Sites/star-aesthetic-centre/nextjs/public/images";
const SIZE = 800;
const QUALITY = 85;
const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".tif"];

async function processImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const meta = await image.metadata();

    // Determine crop: centre-crop to square
    const minDim = Math.min(meta.width, meta.height);
    const left = Math.floor((meta.width - minDim) / 2);
    const top = Math.floor((meta.height - minDim) / 2);

    await image
      .extract({ left, top, width: minDim, height: minDim }) // square crop
      .resize(SIZE, SIZE, { fit: "fill" })                    // resize to 800×800
      .webp({ quality: QUALITY })                             // convert + compress
      .toFile(outputPath);

    const inputStat = (await import("fs")).statSync(inputPath);
    const outputStat = (await import("fs")).statSync(outputPath);
    const saving = Math.round((1 - outputStat.size / inputStat.size) * 100);

    console.log(`  ✓ ${path.basename(outputPath)} — ${Math.round(outputStat.size / 1024)}KB ${saving > 0 ? `(${saving}% smaller)` : ""}`);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed: ${path.basename(inputPath)} — ${err.message}`);
    return false;
  }
}

async function processFolder(inputDir, outputDir) {
  if (!existsSync(inputDir)) {
    console.error(`Input folder not found: ${inputDir}`);
    return;
  }

  await mkdir(outputDir, { recursive: true });

  const files = await readdir(inputDir);
  const images = files.filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()));

  if (images.length === 0) {
    console.log(`  No images found in: ${inputDir}`);
    return;
  }

  console.log(`\nProcessing: ${path.basename(inputDir)} (${images.length} images)`);
  console.log(`Output: ${outputDir}\n`);

  let done = 0;
  for (const file of images) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const inputPath = path.join(inputDir, file);
    // Always output as .webp with same base name
    const outputFileName = name.endsWith(".webp") ? name : `${name}.webp`;
    const outputPath = path.join(outputDir, outputFileName);
    const ok = await processImage(inputPath, outputPath);
    if (ok) done++;
  }

  console.log(`\nDone: ${done}/${images.length} processed`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage:
  node scripts/process-product-images.mjs <input-folder> [options]

Options:
  --all         Process all subfolders inside input-folder
  --out <path>  Output folder (default: nextjs/public/images)

Examples:
  node scripts/process-product-images.mjs "E:/raw/heliocare-gel-spf50"
  node scripts/process-product-images.mjs "E:/raw/heliocare" --all
  node scripts/process-product-images.mjs "E:/raw/neostrata" --all --out "E:/processed"
    `);
    process.exit(0);
  }

  const inputDir = args[0];
  const allMode = args.includes("--all");
  const outIdx = args.indexOf("--out");
  const outputDir = outIdx >= 0 ? args[outIdx + 1] : DEFAULT_OUTPUT;

  if (allMode) {
    // Process every subfolder inside inputDir
    const entries = await readdir(inputDir, { withFileTypes: true });
    const subfolders = entries.filter(e => e.isDirectory());

    if (subfolders.length === 0) {
      console.log("No subfolders found. Running on input folder directly.");
      await processFolder(inputDir, outputDir);
    } else {
      console.log(`Found ${subfolders.length} product folders to process...`);
      for (const sub of subfolders) {
        await processFolder(path.join(inputDir, sub.name), outputDir);
      }
    }
  } else {
    await processFolder(inputDir, outputDir);
  }

  console.log(`\nAll done! Files saved to: ${outputDir}`);
}

main().catch(console.error);
