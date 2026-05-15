export type NikiPageContext = {
  type: "general" | "treatment" | "product";
  treatmentName?: string;
  treatmentPage?: string;
  productName?: string;
  productBrand?: string;
  productPrice?: string;
  productSummary?: string;
  productSlug?: string;
};

export type NikiSessionStatus = "idle" | "connecting" | "active" | "ended" | "error";
