/**
 * Checks all known product image URLs directly from CSV data.
 * Does not require products to be in Supabase yet.
 */

// All staraesthetic.online URLs extracted from the CSVs
const urlsToCheck = [
  // ── MESOESTETIC ──────────────────────────────────────────────────────────────
  { brand: "mesoestetic", product: "Anti-Stress Face Mask",           url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-anti-stress-face-mask.jpg" },
  { brand: "mesoestetic", product: "Aox Ferulic",                     url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-aox-ferulic-advanced-antioxidant-concentrate.jpg" },
  { brand: "mesoestetic", product: "Fast Skin Repair",                url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-fast-skin-repair.jpg" },
  { brand: "mesoestetic", product: "Melan Recovery",                  url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-recovery-cosmeceutical-solution.jpg" },
  { brand: "mesoestetic", product: "Melan Tran3x Concentrate",        url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-tran3x-intensive-concentrate.jpg" },
  { brand: "mesoestetic", product: "Melan Tran3x Gel-Cream",          url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-melan-tran3x-daily-gel-cream.jpg" },
  { brand: "mesoestetic", product: "Mesoprotech Melan 130+ Pigment Control", url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-mesoestetic-products-mesoprotech-melan-130-plus-pigment-control.jpg" },

  // ── SKINCEUTICALS ─────────────────────────────────────────────────────────────
  { brand: "skinceuticals", product: "Glycolic 10 Renew Overnight",   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-glycolic-10-renew-overnight-50ml-800.jpg" },
  { brand: "skinceuticals", product: "C E Ferulic",                   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-c-e-ferulic-800.jpg" },
  { brand: "skinceuticals", product: "Phloretin CF",                  url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-phloretin-c-f-800.jpg" },
  { brand: "skinceuticals", product: "Hyaluronic Acid Intensifier",   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-h-a-intensifier-30ml-800.jpg" },
  { brand: "skinceuticals", product: "Hydrating B5 Gel",              url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-medical-centre-durban-skinceuticals-hydrating-b5-gel-30ml-800.jpg" },
  { brand: "skinceuticals", product: "Gentle Cleanser",               url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-gentle-cleanser-sensitive-dry-skin-wash-800.jpg" },
  { brand: "skinceuticals", product: "Glycolic Renewal Cleanser",     url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-glycolic-renewal-cleanser-exfoliating-wash-800.jpg" },
  { brand: "skinceuticals", product: "Resveratrol BE",                url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-resveratrol-be-night-antioxidant-serum-800.jpg" },
  { brand: "skinceuticals", product: "Serum 10 AOX",                  url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-serum-10-aox-vitamin-c-antioxidant-800.jpg" },
  { brand: "skinceuticals", product: "AGE Eye Complex",               url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-age-eye-complex-anti-aging-treatment-800.jpg" },
  { brand: "skinceuticals", product: "AGE Interrupter Advanced",      url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-age-interrupter-advanced-wrinkle-cream-800.jpg" },
  { brand: "skinceuticals", product: "Discoloration Defense",         url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-discoloration-defense-dark-spot-corrector-800.jpg" },
  { brand: "skinceuticals", product: "Blemish + AGE Serum",           url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-blemish-age-serum-acne-anti-aging-treatment-800.jpg" },
  { brand: "skinceuticals", product: "Phyto A+ Brightening Treatment",url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-phyto-a-plus-brightening-retinol-alternative-800.jpg" },
  { brand: "skinceuticals", product: "PTIOX",                         url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-ptiox-pollution-defense-antioxidant-serum-800.jpg" },
  { brand: "skinceuticals", product: "Retinol 0.3",                   url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-0-3-beginner-anti-aging-cream-800.jpg" },
  { brand: "skinceuticals", product: "Retinol 0.5",                   url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-0-5-intermediate-anti-aging-treatment-800.jpg" },
  { brand: "skinceuticals", product: "Retinol 1.0",                   url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-retinol-1-0-maximum-strength-anti-aging-800.jpg" },
  { brand: "skinceuticals", product: "Triple Lipid Restore",          url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-triple-lipid-restore-anti-aging-ceramide-cream-800.jpg" },
  { brand: "skinceuticals", product: "Advanced Brightening UV Defense SPF50", url: "https://www.staraesthetic.online/wp-content/uploads/skinceuticals-advanced-brightening-uv-defense-spf50-sunscreen-800.jpg" },

  // ── NEOSTRATA ────────────────────────────────────────────────────────────────
  { brand: "neostrata", product: "Ultra Smoothing Cream 10 AHA",      url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-ultra-smoothing-cream-10-aha.jpg" },
  { brand: "neostrata", product: "Ultra Daytime Smoothing Cream SPF20", url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-ultra-daytime-smoothing-cream-spf20.jpg" },
  { brand: "neostrata", product: "Ultra Smoothing Lotion 10 AHA",     url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-ultra-smoothing-lotion-10aha.jpg" },
  { brand: "neostrata", product: "Face Cream Plus 15 AHA",            url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-face-cream-plus-15-aha.jpg" },
  { brand: "neostrata", product: "High Potency Cream 20 AHA",         url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-resurface-neostrata-high-potency-cream-20-aha.jpg" },
  { brand: "neostrata", product: "Facial Cleanser",                   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-facial-cleanser.jpg" },
  { brand: "neostrata", product: "Ultra Moisturizing Face Cream",     url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-ultra-moisturizing-face-cream.jpg" },
  { brand: "neostrata", product: "Daytime Protection Cream SPF 23",   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-daytime-protection-cream-spf-23-10-pha.jpg" },
  { brand: "neostrata", product: "Bionic Face Cream 12 PHA",          url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bionic-face-cream-12-pha.jpg" },
  { brand: "neostrata", product: "Bionic Lotion 15 PHA",              url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bionic-lotion-15-pha.jpg" },
  { brand: "neostrata", product: "Bio Hydrating Cream 15 PHA",        url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-restore-bio-hydrating-cream-15-pha.jpg" },
  { brand: "neostrata", product: "Clarifying Facial Cleanser",        url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-refine-clarifying-facial-cleanser.jpg" },
  { brand: "neostrata", product: "Sheer Hydration SPF 35",            url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-refine-sheer-hydration-spf-35.jpg" },
  { brand: "neostrata", product: "Ultra Brightening Cleanser",        url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-ultra-brightening-cleanser.jpg" },
  { brand: "neostrata", product: "Pigment Controller",                url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-pigment-controller.jpg" },
  { brand: "neostrata", product: "Illuminating Serum",                url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-illuminating-serum.jpg" },
  { brand: "neostrata", product: "Skin Brightener SPF 35",            url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-skin-brightener.jpg" },
  { brand: "neostrata", product: "Dark Spot Corrector",               url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-enlighten-dark-spot-corrector.jpg" },
  { brand: "neostrata", product: "Skin Active Exfoliating Wash",      url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-exfoliating-wash.jpg" },
  { brand: "neostrata", product: "Skin Active Matrix Support SPF 30", url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-matrix-support-spf-30.jpg" },
  { brand: "neostrata", product: "Skin Active Intense Eye Therapy",   url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-intense-eye-therapy.jpg" },
  { brand: "neostrata", product: "Skin Active Cellular Restoration",  url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-cellular-restoration.jpg" },
  { brand: "neostrata", product: "Skin Active Triple Firming Neck Cream", url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-triple-firming-neck-cream.jpg" },
  { brand: "neostrata", product: "Skin Active Tri-Therapy Lifting Serum", url: "https://www.staraesthetic.online/wp-content/uploads/star-aesthetic-neostrata-skin-active-tri-therapy-lifting-serum.jpg" },
];

function toWebp(url) {
  const filename = url.split("/").pop();
  return filename.replace(/-800\.(jpg|jpeg|png|webp)$/i, ".webp").replace(/\.(jpg|jpeg|png)$/i, ".webp");
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    return res.status;
  } catch {
    return 0;
  }
}

console.log(`\n🔍  Checking ${urlsToCheck.length} product image URLs on staraesthetic.online...\n`);

const missing = [];
const ok = [];

const BATCH = 8;
for (let i = 0; i < urlsToCheck.length; i += BATCH) {
  const batch = urlsToCheck.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(async (item) => {
    const status = await checkUrl(item.url);
    return { ...item, status };
  }));
  for (const r of results) {
    if (r.status === 200) {
      ok.push(r);
      process.stdout.write("✅ ");
    } else {
      missing.push(r);
      process.stdout.write("❌ ");
    }
  }
}

console.log("\n");
console.log("══════════════════════════════════════════════════════════════");
console.log(`✅  Existing images: ${ok.length}`);
console.log(`❌  Missing images:  ${missing.length}`);
console.log("══════════════════════════════════════════════════════════════\n");

// Group missing by brand
const byBrand = {};
for (const m of missing) {
  if (!byBrand[m.brand]) byBrand[m.brand] = [];
  byBrand[m.brand].push(m);
}

for (const [brand, items] of Object.entries(byBrand)) {
  console.log(`── ${brand.toUpperCase()} ──────────────────────────────────────────`);
  items.forEach(({ product, url }) => {
    console.log(`  Product:   ${product}`);
    console.log(`  Filename:  ${toWebp(url)}\n`);
  });
}

// Write CSV report
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = ["brand,product_name,recommended_filename"];
for (const m of missing) {
  lines.push(`${m.brand},"${m.product}","${toWebp(m.url)}"`);
}
const outPath = path.join(__dirname, "output", "missing-images.csv");
fs.writeFileSync(outPath, lines.join("\n"), "utf-8");
console.log(`📄  Report saved to: ${outPath}\n`);
