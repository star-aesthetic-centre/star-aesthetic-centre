export type LeadSource =
  | "import"
  | "contact"
  | "skin_assessment"
  | "booking"
  | "niki"
  | "shop"
  | "other";

export type LeadInterestType = "treatment" | "product" | "general";

export type LeadStatus = "new" | "contacted" | "booked" | "converted" | "archived";

export type LeadRow = {
  id: string;
  email: string;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  source: LeadSource;
  interest_type: LeadInterestType;
  interest_value: string | null;
  status: LeadStatus;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type CustomerSummary = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  sources: string[];
  orderCount: number;
  revenueCents: number;
  pendingOrderCount: number;
  bookingCount: number;
  leadCount: number;
  hasRewards: boolean;
  rewardsBalanceRands: number;
  lastActivityAt: string | null;
};
