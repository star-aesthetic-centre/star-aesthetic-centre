import { createRequire } from "node:module";
import { canonicalHeliocareExcelName } from "./heliocare-excel-aliases.mjs";
import { canonicalIsdinExcelName } from "./isdin-excel-aliases.mjs";

const require = createRequire(import.meta.url);
export const XLSX = require("xlsx");

export function parsePrice(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value * 100) / 100;
  const cleaned = String(value).replace(/[R\s]/gi, "").replace(/,/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

export function normSku(s) {
  return String(s ?? "").trim().toUpperCase();
}

export function normName(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/^(neostrata|dermaceutic|heliocare|isdin|mesoestetic|skinceuticals)\s+/i, "")
    .replace(/\bpediatric\b/g, "paediatric")
    .replace(/\btranex\b/g, "tran3x")
    .replace(/\bmaintence\b/g, "maintenance")
    .replace(/(\d+)\s*caps\b/g, "capsules $1")
    .replace(/\b30caps\b/g, "capsules 30")
    .replace(/\bairg\b/g, "airgel")
    .replace(/\bfluid\s+c\b/g, "fluid cream")
    .replace(/spf\s*(\d+)\s*\+/gi, "spf$1")
    .replace(/\+/g, " plus ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitEmbeddedPrice(name, price) {
  let productName = String(name ?? "").trim();
  let priceZar = price;
  if (priceZar == null && productName) {
    const m = productName.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);
    if (m) {
      productName = m[1].trim();
      priceZar = parsePrice(m[2]);
    }
  }
  return { name: productName, priceZar };
}

function isHeaderRow(row) {
  const joined = row.map((c) => String(c).toLowerCase()).join(" ");
  return /\bproduct\b/.test(joined) && /\bprice\b/.test(joined);
}

function resolveSheetName(wb, sheet) {
  if (typeof sheet === "number") return wb.SheetNames[sheet];
  const want = String(sheet).trim().toLowerCase();
  return wb.SheetNames.find((n) => n.trim().toLowerCase() === want) ?? sheet;
}

function buildHeliocareName(product, meta = []) {
  let base = String(product ?? "").replace(/°/g, "").trim();
  if (!/^heliocare/i.test(base)) base = `Heliocare ${base}`;
  const extras = meta.filter((m) => m && !base.toLowerCase().includes(String(m).toLowerCase()));
  return [base, ...extras].join(" ").replace(/\s+/g, " ").trim();
}

function lastPriceInRow(row, fromCol = 4, toCol = 12) {
  let price = null;
  for (let c = fromCol; c <= toCol; c++) {
    const p = parsePrice(row[c]);
    if (p != null) price = p;
  }
  return price;
}

function metaFromRow(row, skipCols = new Set()) {
  const meta = [];
  for (let c = 6; c <= 12; c++) {
    if (skipCols.has(c)) continue;
    const raw = row[c];
    if (parsePrice(raw) != null) continue;
    const t = String(raw ?? "").trim();
    if (t) meta.push(t);
  }
  return meta;
}

/** Cantabria Labs order form (Heliocare Medical sheet). */
export function readCantabriaMedicalPricelist({ file, sheet = "Medical", headerRow = 7 }) {
  const wb = XLSX.readFile(file);
  const sheetName = resolveSheetName(wb, sheet);
  if (!wb.Sheets[sheetName]) {
    throw new Error(`Sheet not found: "${sheet}". Available: ${wb.SheetNames.join(", ")}`);
  }
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, defval: "" });
  const bySku = new Map();
  const byName = new Map();
  const all = [];

  const pushEntry = (code, name, priceZar, rowIndex) => {
    if (!name || priceZar == null || !/heliocare/i.test(name)) return;
    if (priceZar < 200 || priceZar > 5000) return;
    const entry = {
      sku: normSku(code || name),
      name,
      priceZar,
      row: rowIndex + 1,
      supplierCode: code || "",
    };
    all.push(entry);
    if (code) bySku.set(normSku(code), entry);
    byName.set(normName(name), entry);
  };

  const rowEnd = Math.min(rows.length, 45);

  for (let i = Math.min(headerRow, 6); i < rowEnd; i++) {
    const row = rows[i];
    const colA = String(row[0] ?? "").trim();
    const colB = String(row[1] ?? "").trim();
    const colC = String(row[2] ?? "").trim();
    const joined = [colA, colB, colC].join(" ");

    if (!/heliocare/i.test(joined) && !/^HC\d/i.test(colB)) continue;
    if (isHeaderRow(row)) continue;
    if (/^(cantabria|order form|effective|medical|genop)/i.test(colB)) continue;

    const meta = [];
    for (let c = 3; c <= 12; c++) {
      const t = String(row[c] ?? "").trim();
      if (!t || parsePrice(t) != null) continue;
      if (/^(beige|bronze)$/i.test(t) || /\d+\s*ml/i.test(t) || /\d+\s*caps/i.test(t)) {
        meta.push(t);
      }
    }
    for (const t of metaFromRow(row)) {
      if (!meta.some((m) => m.toLowerCase() === t.toLowerCase())) meta.push(t);
    }

    const price = lastPriceInRow(row, 3, 12);
    if (price == null) continue;

    const sheetRow = i + 1;

    // Layout A: Genop HC code in B, product in C
    if (/^HC\d/i.test(colB) && colC) {
      const raw = buildHeliocareName(colC, meta);
      pushEntry(colB, canonicalHeliocareExcelName(sheetRow, raw, meta), price, i);
      continue;
    }

    // Layout B/C: Full or partial product name in B or C
    const productCell = /heliocare/i.test(colB) ? colB : colC;
    if (!productCell) continue;
    const code = /^HC\d/i.test(colB) ? colB : colA || colB;
    const raw = buildHeliocareName(productCell, meta);
    pushEntry(code, canonicalHeliocareExcelName(sheetRow, raw, meta), price, i);
  }

  return { sheetName, rows, bySku, byName, all };
}

export function readExcelPricelist({
  file,
  skuCol = 0,
  nameCol = -1,
  priceCol = 4,
  headerRow = 0,
  sheet = 0,
  format = "simple",
  brand = null,
}) {
  if (format === "cantabria") {
    return readCantabriaMedicalPricelist({ file, sheet, headerRow });
  }

  const wb = XLSX.readFile(file);
  const sheetName = resolveSheetName(wb, sheet);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, defval: "" });
  const bySku = new Map();
  const byName = new Map();
  const all = [];

  for (let i = headerRow; i < rows.length; i++) {
    const row = rows[i];
    if (isHeaderRow(row)) continue;

    const sku = skuCol >= 0 ? normSku(row[skuCol]) : "";
    let name = nameCol >= 0 ? String(row[nameCol] ?? "").trim() : "";
    let price = parsePrice(row[priceCol]);
    ({ name, priceZar: price } = splitEmbeddedPrice(name, price));
    if (price == null) continue;
    if (!sku && !name) continue;

    const sheetRow = i + 1;
    const displayName =
      brand === "isdin" ? canonicalIsdinExcelName(sheetRow, name) || name : name;
    const entry = { sku, name: displayName, priceZar: price, row: sheetRow };
    all.push(entry);
    if (sku) bySku.set(sku, entry);
    byName.set(normName(displayName), entry);
  }

  return { sheetName, rows, bySku, byName, all };
}

/** Excel pricelists often shorten titles (e.g. "K Ceutic" vs "K Ceutic SPF 50"). */
export function namesLooselyMatch(siteName, excelName) {
  const s = normName(siteName);
  const e = normName(excelName);
  if (!s || !e) return false;
  if (s === e) return true;
  if (s.startsWith(`${e} `) || e.startsWith(`${s} `)) return true;
  return namesTokenMatch(siteName, excelName);
}

/** Handles truncated Cantabria names (e.g. "360 Airg" → "360 Airgel SPF50"). */
export function namesTokenMatch(siteName, excelName) {
  const skip = new Set(["ml", "caps", "50", "200", "30", "100"]);
  const s = normName(siteName).split(" ").filter((t) => t.length > 1 && !skip.has(t));
  const e = normName(excelName).split(" ").filter((t) => t.length > 2 && !skip.has(t));
  if (!e.length) return false;

  let si = 0;
  for (const et of e) {
    while (si < s.length && !(s[si] === et || s[si].startsWith(et) || et.startsWith(s[si]))) {
      si++;
    }
    if (si >= s.length) return false;
    si++;
  }
  return true;
}

export function matchProduct(product, bySku, byName, all = [], match = "both", genopToSlug = null, excelToSlug = null) {
  if (excelToSlug && product.slug) {
    for (const ex of all) {
      const mapped = excelToSlug(ex);
      if (mapped === product.slug && byName.has(normName(ex.name))) {
        return { ex, via: "alias", key: normName(ex.name) };
      }
    }
  }

  if (genopToSlug && product.slug) {
    for (const ex of all) {
      const mapped = ex.supplierCode && genopToSlug[ex.supplierCode];
      if (
        mapped === product.slug &&
        bySku.has(normSku(ex.sku)) &&
        namesTokenMatch(product.name, ex.name)
      ) {
        return { ex, via: "genop", key: normSku(ex.sku) };
      }
    }
  }

  if (match !== "name") {
    const skuKey = normSku(product.sku);
    if (skuKey && bySku.has(skuKey)) {
      return { ex: bySku.get(skuKey), via: "sku", key: skuKey };
    }
  }
  if (match !== "sku") {
    const nameKey = normName(product.name);
    if (nameKey && byName.has(nameKey)) {
      return { ex: byName.get(nameKey), via: "name", key: nameKey };
    }

    let loose = all.filter(
      (ex) => ex.name && byName.has(normName(ex.name)) && namesLooselyMatch(product.name, ex.name)
    );

    if (loose.length > 1) {
      const siteNorm = normName(product.name);
      for (const token of ["beige", "bronze", "200ml", "200 ml", "capsules 30", "oral"]) {
        if (!siteNorm.includes(token.replace(" ", "")) && !siteNorm.includes(token)) continue;
        const filtered = loose.filter((ex) => normName(ex.name).includes(token.replace(" ", "")));
        if (filtered.length === 1) loose = filtered;
      }
      if (loose.length > 1 && siteNorm.includes("200")) {
        const with200 = loose.filter((ex) => /200\s*ml/i.test(ex.name));
        if (with200.length === 1) loose = with200;
      }
      if (loose.length > 1 && !siteNorm.includes("200")) {
        const no200 = loose.filter((ex) => !/200\s*ml/i.test(ex.name));
        if (no200.length === 1) loose = no200;
      }
    }

    if (loose.length === 1) {
      const ex = loose[0];
      return { ex, via: "name~", key: normName(ex.name) };
    }
  }
  return null;
}

export function consumeMatch(bySku, byName, hit) {
  if (!hit) return;
  if (hit.ex.sku) bySku.delete(normSku(hit.ex.sku));
  if (hit.ex.name) byName.delete(normName(hit.ex.name));
}
