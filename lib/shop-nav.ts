/** Sidebar navigation — matches original staraesthetic.site/shop.html structure */
export interface ShopNavChild {
  label: string;
  subcategory: string;
}

export interface ShopNavItem {
  label: string;
  slug: string;
  children?: ShopNavChild[];
}

export const SHOP_NAV: ShopNavItem[] = [
  { label: "Dermaceutic Laboratoire", slug: "dermaceutic" },
  { label: "Heliocare Products", slug: "heliocare" },
  { label: "Mesoestetic Products", slug: "mesoestetic" },
  {
    label: "Neostrata Products",
    slug: "neostrata",
    children: [
      { label: "Skin-Active", subcategory: "SKIN ACTIVE" },
      { label: "Restore", subcategory: "RESTORE" },
      { label: "Resurface", subcategory: "RESURFACE" },
      { label: "Enlighten", subcategory: "ENLIGHTEN" },
      { label: "Targeted Treatments", subcategory: "TARGETED TREATMENTS" },
      { label: "Refine", subcategory: "CLARIFY" },
      { label: "Enlighten Pack", subcategory: "VALUE PACKS" },
    ],
  },
  { label: "SkinCeuticals", slug: "skinceuticals" },
  { label: "ISDIN", slug: "isdin" },
];
