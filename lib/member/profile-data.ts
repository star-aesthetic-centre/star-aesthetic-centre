/**
 * Member dashboard data — fetches everything needed for the profile page.
 * Called server-side only (uses supabase admin client).
 */

import { createSupabaseAdmin } from "@/lib/supabase-admin";

export type MemberOrder = {
  id: string;
  reference: string;
  customer_name: string;
  total_cents: number;
  subtotal_cents: number;
  shipping_cents: number;
  status: string;
  created_at: string;
  order_items: Array<{
    product_name: string;
    quantity: number;
    line_total_cents: number;
  }>;
};

export type MemberBooking = {
  id: string;
  reference: string;
  treatment: string;
  treatment_slug: string;
  patient_name: string;
  date: string;
  time_slot: string;
  status: string;
  notes: string | null;
  created_at: string;
};

export type MemberRewards = {
  id: string;
  balance_rands: number;
  total_earned: number;
  total_redeemed: number;
  created_at: string;
  ledger: Array<{
    id: string;
    type: "earn" | "redeem" | "adjustment";
    amount_rands: number;
    description: string;
    reference_type: string | null;
    created_at: string;
  }>;
};

export type MemberVoucher = {
  id: string;
  code: string;
  denomination_rands: number;
  balance_rands: number;
  status: string;
  purchaser_name: string;
  purchaser_email: string;
  recipient_name: string;
  recipient_email: string;
  message: string | null;
  theme: string;
  expires_at: string | null;
  activated_at: string | null;
  created_at: string;
};

export type MemberEnquiry = {
  id: string;
  interest_type: string;
  interest_value: string | null;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
};

export type MemberProfileData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  memberSince: string;
  orders: MemberOrder[];
  bookings: MemberBooking[];
  rewards: MemberRewards | null;
  vouchersPurchased: MemberVoucher[];
  vouchersReceived: MemberVoucher[];
  enquiries: MemberEnquiry[];
};

export async function fetchMemberProfileData(email: string): Promise<MemberProfileData | null> {
  const supabase = createSupabaseAdmin();
  const lowerEmail = email.toLowerCase().trim();

  // All fetches in parallel
  const [
    memberRes,
    loyaltyRes,
    ordersRes,
    bookingsRes,
    vouchersPurchasedRes,
    vouchersReceivedRes,
    enquiriesRes,
  ] = await Promise.all([
    // 1. Core member record
    supabase
      .from("site_members")
      .select("first_name, last_name, phone, created_at")
      .eq("email", lowerEmail)
      .maybeSingle(),

    // 2. Loyalty / rewards account
    supabase
      .from("loyalty_accounts")
      .select("id, first_name, last_name, phone, balance_rands, total_earned, total_redeemed, created_at")
      .eq("email", lowerEmail)
      .maybeSingle(),

    // 3. Product orders (latest 30)
    supabase
      .from("orders")
      .select(
        "id, reference, customer_name, total_cents, subtotal_cents, shipping_cents, status, created_at, order_items(product_name, quantity, line_total_cents)"
      )
      .eq("customer_email", lowerEmail)
      .order("created_at", { ascending: false })
      .limit(30),

    // 4. Treatment bookings
    supabase
      .from("bookings")
      .select(
        "id, reference, treatment, treatment_slug, patient_name, date, time_slot, status, notes, created_at"
      )
      .eq("patient_email", lowerEmail)
      .order("date", { ascending: false })
      .limit(30),

    // 5. Gift vouchers purchased by this member
    supabase
      .from("gift_vouchers")
      .select(
        "id, code, denomination_rands, balance_rands, status, purchaser_name, purchaser_email, recipient_name, recipient_email, message, theme, expires_at, activated_at, created_at"
      )
      .eq("purchaser_email", lowerEmail)
      .order("created_at", { ascending: false }),

    // 6. Gift vouchers received by this member
    supabase
      .from("gift_vouchers")
      .select(
        "id, code, denomination_rands, balance_rands, status, purchaser_name, purchaser_email, recipient_name, recipient_email, message, theme, expires_at, activated_at, created_at"
      )
      .eq("recipient_email", lowerEmail)
      .order("created_at", { ascending: false }),

    // 7. Treatment enquiries / leads
    supabase
      .from("leads")
      .select("id, interest_type, interest_value, source, status, notes, created_at")
      .eq("email", lowerEmail)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  // Member must exist in site_members or loyalty_accounts
  const member = memberRes.data;
  const loyalty = loyaltyRes.data;

  if (!member && !loyalty) return null;

  const firstName = member?.first_name ?? loyalty?.first_name ?? "";
  const lastName = member?.last_name ?? loyalty?.last_name ?? "";
  const phone = member?.phone ?? loyalty?.phone ?? null;
  const memberSince = member?.created_at ?? loyalty?.created_at ?? new Date().toISOString();

  // Fetch rewards ledger if loyalty account exists
  let ledger: MemberRewards["ledger"] = [];
  if (loyalty?.id) {
    const { data: ledgerData } = await supabase
      .from("rewards_ledger")
      .select("id, type, amount_rands, description, reference_type, created_at")
      .eq("account_id", loyalty.id)
      .order("created_at", { ascending: false })
      .limit(25);
    ledger = (ledgerData ?? []) as MemberRewards["ledger"];
  }

  return {
    email: lowerEmail,
    firstName,
    lastName,
    phone,
    memberSince,
    orders: (ordersRes.data ?? []) as MemberOrder[],
    bookings: (bookingsRes.data ?? []) as MemberBooking[],
    rewards: loyalty
      ? {
          id: loyalty.id,
          balance_rands: loyalty.balance_rands ?? 0,
          total_earned: loyalty.total_earned ?? 0,
          total_redeemed: loyalty.total_redeemed ?? 0,
          created_at: loyalty.created_at,
          ledger,
        }
      : null,
    vouchersPurchased: (vouchersPurchasedRes.data ?? []) as MemberVoucher[],
    vouchersReceived: (vouchersReceivedRes.data ?? []) as MemberVoucher[],
    enquiries: (enquiriesRes.data ?? []) as MemberEnquiry[],
  };
}
