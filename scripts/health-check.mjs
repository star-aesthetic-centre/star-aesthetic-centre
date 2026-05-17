/**
 * Quick pre-launch health check — run: node scripts/health-check.mjs
 * Requires .env.local with Supabase keys.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const envChecks = [
  ["NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
  ["SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY],
  ["GEMINI_API_KEY", process.env.GEMINI_API_KEY],
];

const tables = [
  "products",
  "product_images",
  "orders",
  "order_items",
  "loyalty_accounts",
  "gift_vouchers",
];

const optionalColumns = [
  { table: "products", column: "funnel_config" },
];

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function warn(msg) {
  console.log(`  ⚠ ${msg}`);
}
function fail(msg) {
  console.log(`  ✗ ${msg}`);
}

console.log("\nStar Aesthetic — health check\n");

console.log("Environment:");
for (const [name, val] of envChecks) {
  if (val) ok(name);
  else fail(`${name} missing`);
}

if (!url || !key) {
  console.log("\nCannot check Supabase without URL + service role key.\n");
  process.exit(1);
}

console.log("\nSupabase tables:");
for (const table of tables) {
  const res = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const body = await res.json();
  if (res.ok) ok(`${table} (${Array.isArray(body) ? body.length >= 0 ? "ok" : "?" : "ok"})`);
  else fail(`${table}: ${body.message ?? res.status}`);
}

console.log("\nOptional migrations:");
for (const { table, column } of optionalColumns) {
  const res = await fetch(`${url}/rest/v1/${table}?select=${column}&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const body = await res.json();
  if (res.ok) ok(`${table}.${column}`);
  else warn(`${table}.${column} — run product-funnel-migration.sql`);
}

console.log("\nDone.\n");
