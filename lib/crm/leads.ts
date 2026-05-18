import { createSupabaseAdmin } from "@/lib/supabase-admin";
import type { LeadInterestType, LeadRow, LeadSource, LeadStatus } from "@/lib/crm/types";

export type CreateLeadInput = {
  email: string;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  source: LeadSource;
  interestType?: LeadInterestType;
  interestValue?: string | null;
  status?: LeadStatus;
  notes?: string | null;
  metadata?: Record<string, unknown>;
};

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export async function createLead(
  input: CreateLeadInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) {
    return { success: false, error: "Valid email required" };
  }

  let firstName = input.firstName?.trim() || "";
  let lastName = input.lastName?.trim() || "";
  if (!firstName && !lastName && input.metadata?.name && typeof input.metadata.name === "string") {
    const split = splitName(input.metadata.name as string);
    firstName = split.first;
    lastName = split.last;
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        email,
        phone: input.phone?.trim() || null,
        first_name: firstName || null,
        last_name: lastName || null,
        source: input.source,
        interest_type: input.interestType ?? "general",
        interest_value: input.interestValue?.trim() || null,
        status: input.status ?? "new",
        notes: input.notes?.trim() || null,
        metadata: input.metadata ?? {},
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, id: data.id };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function listLeads(opts?: {
  status?: LeadStatus;
  source?: LeadSource;
  limit?: number;
}): Promise<{ leads: LeadRow[]; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(opts?.limit ?? 500);

    if (opts?.status) query = query.eq("status", opts.status);
    if (opts?.source) query = query.eq("source", opts.source);

    const { data, error } = await query;
    if (error) return { leads: [], error: error.message };

    return {
      leads: (data ?? []).map((row) => ({
        ...row,
        metadata: (row.metadata as Record<string, unknown>) ?? {},
      })) as LeadRow[],
    };
  } catch (err) {
    return { leads: [], error: String(err) };
  }
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function importLeadsBatch(
  rows: CreateLeadInput[]
): Promise<{ success: boolean; imported: number; errors: string[] }> {
  const errors: string[] = [];
  let imported = 0;

  for (const row of rows) {
    const result = await createLead({ ...row, source: row.source || "import" });
    if (result.success) imported++;
    else if (result.error) errors.push(`${row.email}: ${result.error}`);
  }

  return { success: errors.length === 0, imported, errors };
}

/** Map contact form reason to CRM interest */
export function contactReasonToInterest(reason: string): {
  interestType: LeadInterestType;
  interestValue: string;
} {
  const r = reason.toLowerCase();
  if (r.includes("product") || r.includes("skincare")) {
    return { interestType: "product", interestValue: reason };
  }
  if (r.includes("consultation") || r.includes("treatment") || r.includes("pricing")) {
    return { interestType: "treatment", interestValue: reason };
  }
  return { interestType: "general", interestValue: reason || "General enquiry" };
}
