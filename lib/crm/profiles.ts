import { createSupabaseAdmin } from "@/lib/supabase-admin";

export type CustomerProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  province: string;
  postalCode: string;
  isTest: boolean;
};

export type CheckoutBillingFromProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
};

function rowToProfile(row: {
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  province: string;
  postal_code: string;
  is_test: boolean;
}): CustomerProfile {
  return {
    email: row.email,
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    phone: row.phone,
    addressLine1: row.address_line1 ?? "",
    addressLine2: row.address_line2,
    city: row.city ?? "",
    province: row.province ?? "KZN",
    postalCode: row.postal_code ?? "",
    isTest: row.is_test ?? false,
  };
}

export function profileToCheckoutBilling(p: CustomerProfile): CheckoutBillingFromProfile {
  return {
    firstName: p.firstName,
    lastName: p.lastName,
    email: p.email,
    phone: p.phone ?? "",
    address1: p.addressLine1,
    address2: p.addressLine2 ?? "",
    city: p.city,
    province: p.province,
    postalCode: p.postalCode,
  };
}

export async function getCustomerProfileByEmail(
  email: string
): Promise<{ profile: CustomerProfile | null; error?: string }> {
  const normalized = email.toLowerCase().trim();
  if (!normalized.includes("@")) {
    return { profile: null, error: "Valid email required" };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("customer_profiles")
      .select("*")
      .eq("email", normalized)
      .maybeSingle();

    if (error) {
      if (error.message.includes("does not exist")) {
        return { profile: null };
      }
      return { profile: null, error: error.message };
    }

    if (!data) return { profile: null };
    return { profile: rowToProfile(data) };
  } catch (err) {
    return { profile: null, error: String(err) };
  }
}
