/**
 * ISDIN June 2026 pricelist — same product name on rows 1–4, differentiated by row order.
 *
 * Row 1 → Fusion Water Magic (invisible/base)
 * Row 2 → Light
 * Row 3 → Medium
 * Row 4 → Bronze
 * Row 5 → UV Mineral Brush
 */
export const ISDIN_ROW_TO_SLUG = {
  1: "isdin-fusion-water-magic-spf50",
  2: "isdin-fusion-water-magic-light-spf50",
  3: "isdin-fusion-water-magic-medium-spf50",
  4: "isdin-fusion-water-magic-bronze-spf50",
  5: "isdin-uv-mineral-brush-spf50",
};

export const ISDIN_ROW_TO_NAME = {
  1: "ISDIN Fusion Water Magic SPF50",
  2: "ISDIN Fusion Water Magic Light SPF50",
  3: "ISDIN Fusion Water Magic Medium SPF50",
  4: "ISDIN Fusion Water Magic Bronze SPF50",
  5: "ISDIN UV Mineral Brush SPF50+",
};

export function canonicalIsdinExcelName(sheetRow, rawName) {
  if (ISDIN_ROW_TO_NAME[sheetRow]) return ISDIN_ROW_TO_NAME[sheetRow];
  if (/mineral brush/i.test(rawName)) return "ISDIN UV Mineral Brush SPF50+";
  return String(rawName ?? "").trim();
}

export function isdinExcelToSlug(ex) {
  if (ex.row && ISDIN_ROW_TO_SLUG[ex.row]) return ISDIN_ROW_TO_SLUG[ex.row];
  if (/mineral brush/i.test(ex.name)) return "isdin-uv-mineral-brush-spf50";
  return null;
}
