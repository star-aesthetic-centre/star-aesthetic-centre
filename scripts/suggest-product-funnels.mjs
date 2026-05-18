/**
 * Bulk-suggest funnel_config for all active products (enabled: false for review).
 *
 *   node scripts/suggest-product-funnels.mjs              # preview only
 *   node scripts/suggest-product-funnels.mjs --apply      # write to Supabase
 *   node scripts/suggest-product-funnels.mjs --brand neostrata --apply
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apply = process.argv.includes("--apply");
const brandArg = process.argv.find((a) => a.startsWith("--brand="));
const brandFilter = brandArg ? brandArg.split("=")[1] : null;

async function fetchJson(path, opts = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(opts.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(JSON.stringify(body));
  return body;
}

// Inline minimal suggest logic (keep in sync with lib/funnel-suggestions.ts)
const SPF = /\b(spf|sunscreen|sun block|uv|heliocare|fotoprotector)\b/i;
const CLEANSE = /\b(cleans|wash|micellar)\b/i;
const SERUM = /\b(serum|ampoule|concentrate|booster)\b/i;
const CREAM = /\b(cream|lotion|moistur|hydrat|balm|emulsion)\b/i;

function routineRank(p) {
  if (p.subcategory_sort > 0) return p.subcategory_sort * 10;
  const n = p.name;
  if (CLEANSE.test(n)) return 10;
  if (SERUM.test(n)) return 30;
  if (CREAM.test(n)) return 40;
  if (SPF.test(n)) return 50;
  return 35;
}

function isSpf(p) {
  return SPF.test(p.name) || (p.subcategory?.toUpperCase().includes("SPF") ?? false);
}

function suggest(source, catalog) {
  const same = catalog
    .filter((p) => p.brand_slug === source.brand_slug && p.id !== source.id)
    .sort((a, b) => routineRank(a) - routineRank(b));
  const rank = routineRank(source);
  const step1 = same.find((p) => routineRank(p) > rank) ?? same.find((p) => !isSpf(source) && isSpf(p));
  if (!step1) return null;
  const exclude = new Set([source.id, step1.id]);
  const step2 =
    same.find((p) => !exclude.has(p.id) && routineRank(p) > routineRank(step1)) ??
    same.find((p) => !exclude.has(p.id) && isSpf(p));
  return {
    enabled: false,
    steps: [
      {
        title: step1.name,
        description: "",
        productIds: [step1.id],
        discountPercent: 10,
      },
      step2
        ? {
            title: step2.name,
            description: "",
            productIds: [step2.id],
            discountPercent: 10,
          }
        : { title: "Complete Your Routine", description: "", productIds: [], discountPercent: 10 },
    ],
  };
}

async function main() {
  if (!url || !key) {
    console.error("Missing Supabase env in .env.local");
    process.exit(1);
  }

  let products = await fetchJson(
    "products?select=id,name,slug,brand_slug,subcategory,subcategory_sort,funnel_config&is_active=eq.true&order=brand_slug.asc"
  );
  if (brandFilter) {
    products = products.filter((p) => p.brand_slug === brandFilter);
  }

  const lines = [];
  let ok = 0;
  let skip = 0;

  for (const source of products) {
    const cfg = suggest(source, products);
    if (!cfg) {
      skip++;
      continue;
    }
    ok++;
    lines.push(
      `-- ${source.brand_slug} / ${source.name}\nupdate public.products set funnel_config = '${JSON.stringify(cfg).replace(/'/g, "''")}'::jsonb, updated_at = now() where id = '${source.id}';\n`
    );

    if (apply) {
      await fetchJson(`products?id=eq.${source.id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ funnel_config: cfg }),
      });
    }
  }

  const outPath = resolve(__dirname, "output/suggested-funnels.sql");
  writeFileSync(outPath, lines.join("\n"), "utf8");

  console.log(`\nSuggested: ${ok} | Skipped (no pair): ${skip}`);
  console.log(`SQL written: ${outPath}`);
  console.log(apply ? "Applied to Supabase (funnels still OFF until you enable in admin).\n" : "Dry run — use --apply to save.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
