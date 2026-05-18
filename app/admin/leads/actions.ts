"use server";

import { revalidatePath } from "next/cache";
import { importLeadsBatch, updateLeadStatus, type CreateLeadInput } from "@/lib/crm/leads";
import type { LeadStatus } from "@/lib/crm/types";

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  const result = await updateLeadStatus(id, status);
  if (result.success) {
    revalidatePath("/admin/leads");
    revalidatePath("/admin/customers");
    revalidatePath("/admin");
  }
  return result;
}

export async function importLeadsCsvAction(csvText: string) {
  const lines = csvText
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim());
  if (lines.length < 2) {
    return { success: false, imported: 0, errors: ["CSV needs a header row and at least one data row."] };
  }

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  const col = (name: string) => header.indexOf(name);

  const emailIdx = col("email");
  if (emailIdx < 0) {
    return { success: false, imported: 0, errors: ['CSV must include an "email" column.'] };
  }

  const rows: CreateLeadInput[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    const email = cells[emailIdx]?.trim();
    if (!email) continue;

    const get = (key: string) => {
      const idx = col(key);
      return idx >= 0 ? cells[idx]?.trim() : "";
    };

    rows.push({
      email,
      firstName: get("first_name") || get("firstname") || get("name")?.split(/\s+/)[0],
      lastName: get("last_name") || get("surname") || get("lastname"),
      phone: get("phone") || get("mobile"),
      source: "import",
      interestType: (get("interest_type") as CreateLeadInput["interestType"]) || "general",
      interestValue: get("interest_value") || get("treatment") || get("product") || get("interest"),
      notes: get("notes") || get("message"),
      status: (get("status") as LeadStatus) || "new",
    });
  }

  const result = await importLeadsBatch(rows);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/customers");
  revalidatePath("/admin");
  return result;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}
