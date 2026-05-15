/** Serializable product shape for shop client components */
export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  brandSlug: string;
  brandName: string;
  subcategory: string | null;
  price: number | null;
  imageUrl: string | null;
}
