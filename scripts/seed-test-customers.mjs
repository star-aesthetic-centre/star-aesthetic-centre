/**
 * Seed cPanel test customer profiles into Supabase.
 * Run: node scripts/seed-test-customers.mjs
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *
 * Alternatively run scripts/output/seed-test-customers.sql in Supabase SQL Editor
 * (after customer-profiles-schema.sql).
 */
import { config } from "dotenv";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const TEST_PROFILES = [
  { email: "ava@itools247.co.za", first_name: "Ava", last_name: "Naidoo", phone: "082 111 1001", address_line1: "12 Musgrave Road", address_line2: "Berea", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 150, total_earned: 200, total_redeemed: 50 },
  { email: "denice@itools247.co.za", first_name: "Denice", last_name: "Pillay", phone: "082 111 1002", address_line1: "45 Florida Road", address_line2: "Morningside", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "ethan@itools247.co.za", first_name: "Ethan", last_name: "Reddy", phone: "082 111 1003", address_line1: "8 Windermere Road", address_line2: null, city: "Durban North", province: "KZN", postal_code: "4051", balance_rands: 75, total_earned: 75, total_redeemed: 0 },
  { email: "isabella@itools247.co.za", first_name: "Isabella", last_name: "Govender", phone: "082 111 1004", address_line1: "22 Ennisdale Drive", address_line2: null, city: "Durban North", province: "KZN", postal_code: "4051", balance_rands: 250, total_earned: 300, total_redeemed: 50 },
  { email: "noah@itools247.co.za", first_name: "Noah", last_name: "Singh", phone: "082 111 1005", address_line1: "101 Gillespie Street", address_line2: "Berea", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "oliver@itools247.co.za", first_name: "Oliver", last_name: "van Wyk", phone: "082 111 1006", address_line1: "3 Chartwell Drive", address_line2: "Umhlanga Rocks", city: "Umhlanga", province: "KZN", postal_code: "4320", balance_rands: 50, total_earned: 50, total_redeemed: 0 },
  { email: "teddybear@itools247.co.za", first_name: "Teddy", last_name: "Bear", phone: "082 111 1007", address_line1: "1 Test Lane", address_line2: "Westville", city: "Durban", province: "KZN", postal_code: "3629", balance_rands: 100, total_earned: 100, total_redeemed: 0 },
  { email: "william@itools247.co.za", first_name: "William", last_name: "Dlamini", phone: "082 111 1008", address_line1: "67 Marine Parade", address_line2: null, city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "daniel@itools24.co.za", first_name: "Daniel", last_name: "Botha", phone: "082 222 2001", address_line1: "14 Kensington Drive", address_line2: null, city: "Durban North", province: "KZN", postal_code: "4051", balance_rands: 120, total_earned: 120, total_redeemed: 0 },
  { email: "david@itools24.co.za", first_name: "David", last_name: "Moodley", phone: "082 222 2002", address_line1: "29 Hillcrest Avenue", address_line2: "Hillcrest", city: "Durban", province: "KZN", postal_code: "3610", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "emily@itools24.co.za", first_name: "Emily", last_name: "Khumalo", phone: "082 222 2003", address_line1: "5 Ridge Road", address_line2: "Berea", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 40, total_earned: 40, total_redeemed: 0 },
  { email: "emma@itools24.co.za", first_name: "Emma", last_name: "Chetty", phone: "082 222 2004", address_line1: "88 Umgeni Road", address_line2: null, city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "james@itools24.co.za", first_name: "James", last_name: "Maharaj", phone: "082 222 2005", address_line1: "12 Athlone Crescent", address_line2: "Durban North", city: "Durban", province: "KZN", postal_code: "4051", balance_rands: 200, total_earned: 250, total_redeemed: 50 },
  { email: "olivia@itools24.co.za", first_name: "Olivia", last_name: "Peters", phone: "082 222 2006", address_line1: "40 Innes Road", address_line2: "Morningside", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
  { email: "sophia@itools24.co.za", first_name: "Sophia", last_name: "Williams", phone: "082 222 2007", address_line1: "7 Linksfield Road", address_line2: "Glenashley", city: "Durban", province: "KZN", postal_code: "4051", balance_rands: 85, total_earned: 85, total_redeemed: 0 },
  { email: "tracy@itools24.co.za", first_name: "Tracy", last_name: "Zulu", phone: "082 222 2008", address_line1: "33 Problem Mkhize Road", address_line2: "Berea", city: "Durban", province: "KZN", postal_code: "4001", balance_rands: 0, total_earned: 0, total_redeemed: 0 },
];

async function upsert(table, rows, onConflict = "email") {
  const res = await fetch(`${url}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${table}: ${res.status} ${body}`);
  }
}

async function ensureLeads() {
  for (const p of TEST_PROFILES) {
    const { data: existing } = await fetch(
      `${url}/rest/v1/leads?email=eq.${encodeURIComponent(p.email)}&source=eq.import&interest_value=eq.Test%20account&select=id&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    ).then((r) => r.json().then((d) => ({ data: d })));

    if (Array.isArray(existing) && existing.length > 0) continue;

    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: p.email,
        first_name: p.first_name,
        last_name: p.last_name,
        phone: p.phone,
        source: "import",
        interest_type: "general",
        interest_value: "Test account",
        status: "new",
        notes: p.email.includes("itools247") ? "cPanel test — itools247" : "cPanel test — itools24",
        metadata: {
          address_line1: p.address_line1,
          address_line2: p.address_line2,
          city: p.city,
          province: p.province,
          postal_code: p.postal_code,
          is_test: true,
        },
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`leads ${p.email}: ${res.status} ${body}`);
    }
  }
}

async function main() {
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  console.log("\nSeeding", TEST_PROFILES.length, "test customers…\n");

  const profiles = TEST_PROFILES.map((p) => ({
    email: p.email,
    first_name: p.first_name,
    last_name: p.last_name,
    phone: p.phone,
    address_line1: p.address_line1,
    address_line2: p.address_line2,
    city: p.city,
    province: p.province,
    postal_code: p.postal_code,
    is_test: true,
    notes: p.email.includes("itools247") ? "cPanel test — itools247" : "cPanel test — itools24",
    updated_at: new Date().toISOString(),
  }));

  await upsert("customer_profiles", profiles);

  const loyalty = TEST_PROFILES.map((p) => ({
    email: p.email,
    first_name: p.first_name,
    last_name: p.last_name,
    phone: p.phone,
    balance_rands: p.balance_rands,
    total_earned: p.total_earned,
    total_redeemed: p.total_redeemed,
    updated_at: new Date().toISOString(),
  }));

  await upsert("loyalty_accounts", loyalty);

  await ensureLeads();

  console.log("Done. Profiles, rewards, and leads are ready.\n");
  console.log("Checkout: enter a test email and tab out — fields auto-fill.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
