function normHeliocareName(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/^heliocare\s+/i, "")
    .replace(/\bpediatric\b/g, "paediatric")
    .replace(/(\d+)\s*caps\b/g, "capsules $1")
    .replace(/\b30caps\b/g, "capsules 30")
    .replace(/spf\s*(\d+)\s*\+/gi, "spf$1")
    .replace(/\+/g, " plus ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Cantabria Excel uses different titles than the shop.
 * Maps parsed Excel rows → site product slug.
 *
 * Spreadsheet rows (1-based) confirmed by Nakita:
 *   9  → Oral Capsules
 *  12  → Color Gel Beige
 *  13  → Color Gel Bronze
 *  18  → Paediatric Mineral (50 ml) → site "Paediatric Lotion SPF50+"
 *  19  → Paediatric Lotion 200 ml (or Mineral 200 ml row above 18)
 */
export function canonicalHeliocareExcelName(sheetRow, rawName, meta = []) {
  const metaStr = meta.join(" ");
  if (sheetRow === 9) return "Heliocare 360 Oral Capsules 30";
  if (sheetRow === 12) return "Heliocare 360 Color Gel Oil Free SPF50+ Beige";
  if (sheetRow === 13) return "Heliocare 360 Color Gel Oil Free SPF50+ Bronze";
  if (sheetRow === 18 && /mineral/i.test(rawName)) {
    return "Heliocare 360 Paediatric Lotion SPF50+";
  }
  if (sheetRow === 19 && /200\s*ml/i.test(`${rawName} ${metaStr}`)) {
    return "Heliocare 360 Paediatric Lotion SPF50 200ml";
  }

  let name = String(rawName ?? "").replace(/°/g, "").trim();
  if (!/^heliocare/i.test(name)) name = `Heliocare ${name}`;
  if (/oral/i.test(name) && /30|caps/i.test(`${name} ${metaStr}`)) {
    return "Heliocare 360 Oral Capsules 30";
  }
  if (/color/i.test(name) && /beige/i.test(`${name} ${metaStr}`)) {
    return "Heliocare 360 Color Gel Oil Free SPF50+ Beige";
  }
  if (/color/i.test(name) && /bronze/i.test(`${name} ${metaStr}`)) {
    return "Heliocare 360 Color Gel Oil Free SPF50+ Bronze";
  }
  if (/pediatric|paediatric/i.test(name) && /mineral/i.test(name)) {
    if (/200\s*ml/i.test(`${name} ${metaStr}`)) {
      return "Heliocare 360 Paediatric Lotion SPF50 200ml";
    }
    return "Heliocare 360 Paediatric Lotion SPF50+";
  }
  const extras = meta.filter((m) => m && !name.toLowerCase().includes(m.toLowerCase()));
  return [name, ...extras].join(" ").replace(/\s+/g, " ").trim();
}

export function heliocareExcelToSlug(ex) {
  const row = ex.row;
  const n = normHeliocareName(ex.name);

  if (row === 9 || (n.includes("oral") && n.includes("capsules"))) {
    return "heliocare-360-oral-capsules-30";
  }
  if (row === 12 || (n.includes("color") && n.includes("beige"))) {
    return "heliocare-360-color-gel-oil-free-spf50-beige";
  }
  if (row === 13 || (n.includes("color") && n.includes("bronze"))) {
    return "heliocare-360-color-gel-oil-free-spf50-bronze";
  }
  if (n.includes("mineral") && (n.includes("paediatric") || n.includes("pediatric"))) {
    if (n.includes("200") || /200\s*ml/i.test(ex.name)) {
      return "heliocare-360-paediatric-lotion-spf50-200ml";
    }
    return "heliocare-360-paediatric-lotion-spf50";
  }
  if (n.includes("paediatric") && n.includes("lotion") && n.includes("200")) {
    return "heliocare-360-paediatric-lotion-spf50-200ml";
  }
  if (n.includes("paediatric") && n.includes("lotion") && !n.includes("200")) {
    return "heliocare-360-paediatric-lotion-spf50";
  }

  return null;
}
