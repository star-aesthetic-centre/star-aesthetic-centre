# Pricelist audit (Excel → shop)

## How prices work on the site

- All shop prices are **ZAR including VAT**.
- Stored in Supabase as `price_cents` (e.g. R 641.01 → `64101`).
- Admin → Products labels the field **“Price (ZAR, inc VAT)”**.
- Product pages show **“incl VAT”**.

**Do not** enter ex-VAT prices unless you convert first.

## Is there an Excel upload in Admin?

**No.** There is no “upload spreadsheet” button in `/admin/products` today.

| Method | Who | When |
|--------|-----|------|
| **Admin → Products** | Nakita | One product at a time (price, stock, description) |
| **Developer SQL/scripts** | Developer | Bulk brand imports (NeoStrata re-import, etc.) |
| **`scripts/audit-pricelist.mjs`** | Developer / you | Compare Excel to live site (read-only) |
| **`scripts/fix-neostrata-prices.mjs`** | Developer | Apply NeoStrata price fixes from known list |

## Your June 2026 folder

```
D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\
```

Brands: `Dermaceutic.xlsx`, `Heliocare.xlsx`, `ISDIN.xlsx`, `Mesoestetic.xlsx`, `NeoStrata.xlsx` (done), `Skinceuticals.xlsx`

Optional: copy the folder to `C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs\pricelists\june-2026\` for shorter commands — not required.

Place one Excel per brand, e.g.:

- `NeoStrata.xlsx` — **Column E** = RRSP **inc VAT** (labelled in row 2–3); SKUs in **column A**; data starts around **row 6**
- Other brands — confirm SKU + inc-VAT column with supplier sheet

**Close Excel** before running scripts (otherwise files may be locked).

## Run a discrepancy report (NeoStrata)

From `nextjs` folder in Command Prompt:

```cmd
cd /d "C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs"
npm install xlsx
node scripts/inspect-pricelist.mjs --file "D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\NeoStrata.xlsx"
node scripts/audit-pricelist.mjs --file "D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\NeoStrata.xlsx" --brand neostrata --sku-col 0 --name-col 2 --price-col 4 --header-row 5
```

### Dermaceutic (and most other brands)

Site SKUs are internal codes (`SA-DERM-…`), not supplier codes — match by **product name** as well:

```cmd
node scripts/inspect-pricelist.mjs --file "D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Dermaceutic.xlsx"
node scripts/apply-pricelist.mjs --file "D:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$star-aesthetic\2026\product-list\pricelist-june-2026\Dermaceutic.xlsx" --brand dermaceutic --sku-col 0 --name-col 1 --price-col 4 --header-row 5 --match both
```

Use the column numbers from `inspect-pricelist` output if they differ.

The audit script reports:

1. **Price mismatch** — same SKU, different Rand amount  
2. **In Excel only** — on pricelist but not on site (or SKU doesn’t match)  
3. **On site only** — live product not on this Excel  

It does **not** change the database.

## After the audit

- **Few price fixes** → Admin → Products → click price → edit  
- **Bulk update (e.g. all 27 NeoStrata)** → `scripts/apply-pricelist.mjs`:

```cmd
node scripts/apply-pricelist.mjs --file "D:\...\NeoStrata.xlsx" --brand neostrata --sku-col 0 --price-col 4 --header-row 5
node scripts/apply-pricelist.mjs --file "D:\...\NeoStrata.xlsx" --brand neostrata --sku-col 0 --price-col 4 --header-row 5 --sql
node scripts/apply-pricelist.mjs --file "D:\...\NeoStrata.xlsx" --brand neostrata --sku-col 0 --price-col 4 --header-row 5 --update
```

- **New products** → developer import SQL (like `neostrata-reimport.sql`)

## Treatment prices vs product prices

- **Shop products** → `products.price_cents` (this guide)  
- **Treatments** (Botox, Lip Filler, etc.) → `treatments.price_from` + pricing table in Admin → Treatments  

Use separate pricelists / checks for each.
