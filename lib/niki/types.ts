export type NikiPageContext = {
  type: "general" | "treatment" | "product" | "introduction" | "skin-assessment";
  treatmentName?: string;
  treatmentPage?: string;
  productName?: string;
  productBrand?: string;
  productPrice?: string;
  productSummary?: string;
  productSlug?: string;
  /** Active section index when running the /introduction voice tour */
  introductionTourSectionIndex?: number;
};

export type NikiSessionStatus = "idle" | "connecting" | "active" | "ended" | "error";
