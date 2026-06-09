#!/usr/bin/env node
/**
 * Preview Excel layout — find SKU and price columns before running audit-pricelist.mjs
 *
 *   node scripts/inspect-pricelist.mjs --file "D:\...\NeoStrata.xlsx"
 */

import { existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

function parseArgs(argv) {
  const args = { file: null, sheet: 0, rows: 25 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file") args.file = argv[++i];
    else if (a === "--sheet") args.sheet = argv[++i];
    else if (a === "--rows") args.rows = Number(argv[++i]);
  }
  if (!args.file) {
    console.error("Usage: node scripts/inspect-pricelist.mjs --file <path.xlsx> [--rows 25]");
    process.exit(1);
  }
  return args;
}

function colLetter(i) {
  let n = i;
  let s = "";
  do {
    s = String.fromCharCode((n % 26) + 65) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

function looksLikeSku(v) {
  const s = String(v ?? "").trim();
  return /^F\d{3,}/i.test(s) || /^[A-Z]{2,}\d/i.test(s);
}

function looksLikePrice(v) {
  if (typeof v === "number" && v > 50 && v < 50000) return true;
  const s = String(v ?? "").replace(/[R\s,]/gi, "").trim();
  const n = Number(s);
  return Number.isFinite(n) && n > 50 && n < 50000;
}

function main() {
  const args = parseArgs(process.argv);
  if (!existsSync(args.file)) {
    throw new Error(`File not found: ${args.file}`);
  }

  const wb = XLSX.readFile(args.file);
  console.log(`\nSheets: ${wb.SheetNames.join(", ")}\n`);

  const sheetName =
    typeof args.sheet === "number" ? wb.SheetNames[args.sheet] : args.sheet;
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
    header: 1,
    defval: "",
  });

  console.log(`Active sheet: "${sheetName}" (${rows.length} rows)\n`);

  const maxCols = Math.min(
    12,
    Math.max(...rows.slice(0, args.rows).map((r) => r.length), 0)
  );

  console.log("── First rows (column letters) ──");
  const header = ["Row", ...Array.from({ length: maxCols }, (_, i) => colLetter(i))];
  console.log(header.join("\t"));

  for (let i = 0; i < Math.min(args.rows, rows.length); i++) {
    const cells = Array.from({ length: maxCols }, (_, c) => {
      const v = rows[i][c];
      if (v === "" || v == null) return "";
      return String(v).replace(/\t/g, " ").slice(0, 40);
    });
    console.log([i + 1, ...cells].join("\t"));
  }

  const skuScores = Array(maxCols).fill(0);
  const priceScores = Array(maxCols).fill(0);
  for (const row of rows) {
    for (let c = 0; c < row.length; c++) {
      if (looksLikeSku(row[c])) skuScores[c]++;
      if (looksLikePrice(row[c])) priceScores[c]++;
    }
  }

  console.log("\n── Likely columns (heuristic) ──");
  const bestSku = skuScores.indexOf(Math.max(...skuScores));
  const bestPrice = priceScores.indexOf(Math.max(...priceScores));
  console.log(`SKU column:   ${colLetter(bestSku)} (index ${bestSku}) — ${skuScores[bestSku]} SKU-like cells`);
  console.log(`Price column: ${colLetter(bestPrice)} (index ${bestPrice}) — ${priceScores[bestPrice]} price-like cells`);

  // First data row: SKU match, or first row with a price in the price column
  let dataStart = 0;
  for (let i = 0; i < rows.length; i++) {
    if (looksLikeSku(rows[i][bestSku])) {
      dataStart = i;
      break;
    }
    if (looksLikePrice(rows[i][bestPrice]) && !isHeaderish(rows[i])) {
      dataStart = i;
      break;
    }
  }

  function isHeaderish(row) {
    const joined = row.map((c) => String(c).toLowerCase()).join(" ");
    return /\bproduct\b/.test(joined) || /\bprice\b/.test(joined) || /\bcode\b/.test(joined);
  }

  let nameCol = -1;
  let bestNameScore = 0;
  for (let c = 0; c < maxCols; c++) {
    if (c === bestPrice) continue;
    let score = 0;
    for (const row of rows) {
      const v = String(row[c] ?? "").trim();
      if (v.length > 8 && /[a-z]/i.test(v) && !looksLikePrice(v) && !looksLikeSku(v)) score++;
    }
    if (score > bestNameScore) {
      bestNameScore = score;
      nameCol = c;
    }
  }

  const useNameOnly = skuScores[bestSku] === 0 && bestNameScore > 0;
  const skuArg = useNameOnly ? -1 : bestSku;
  const matchArg = useNameOnly ? " --match name" : nameCol >= 0 ? " --match both" : "";

  const headerRow = isHeaderish(rows[dataStart]) ? dataStart + 1 : dataStart;
  console.log(`Suggested --header-row: ${headerRow} (0-based; data starts spreadsheet row ${headerRow + 1})`);
  if (nameCol >= 0) {
    console.log(`Suggested --name-col: ${nameCol} (${colLetter(nameCol)})`);
  }
  if (useNameOnly) {
    console.log("No supplier SKUs detected — match by product name only (--sku-col -1 --match name)");
  }
  const nameArg = nameCol >= 0 ? ` --name-col ${nameCol}` : "";
  const brand = args.file.match(/([A-Za-z]+)\.xlsx$/i)?.[1]?.toLowerCase() ?? "<brand_slug>";
  const isCantabria =
    brand === "heliocare" ||
    rows.slice(0, 10).some((r) => /cantabria|genop code/i.test(r.map((c) => String(c)).join(" ")));
  if (isCantabria) {
    console.log("Cantabria order form detected — use --format cantabria --sheet Medical");
    console.log(
      `\nTry:\nnode scripts/apply-pricelist.mjs --file "${args.file}" --brand heliocare --format cantabria --sheet Medical --header-row ${headerRow} --match name\n`
    );
  } else {
    console.log(
      `\nTry:\nnode scripts/apply-pricelist.mjs --file "${args.file}" --brand ${brand} --sku-col ${skuArg} --price-col ${bestPrice} --header-row ${headerRow}${nameArg}${matchArg}\n`
    );
  }
}

main();
