-- treatment-prices-update.sql
-- Update treatment price_from fields with correct 2026 prices from Nikita's pricelist
-- Source: Treatment 2026 Price List.pdf (received 2026-04-07)
-- Run in Supabase SQL editor

-- Vitamin Drips: Star Bright R1,070 → Star Ultimate R1,870
update public.treatments set
  price_from = 'R 1,070 – R 1,870 (drip protocol dependent)'
where slug = 'vitamin-drips';

-- Dermapen Microneedling: Neck R950, Face R1,900, Scalp R2,200, Face+neck R2,800, Face+neck+chest R3,800
update public.treatments set
  price_from = 'From R 950 per session'
where slug = 'dermapen-microneedling';

-- Botox / Anti-Wrinkle Injections: R90/unit (<50 units), R85/unit (>50 units)
update public.treatments set
  price_from = 'From R 90 per unit · Optimal dosing (64 units) R 5,440'
where slug = 'botox';

-- Lip Filler / Lip Sculpting
update public.treatments set
  price_from = 'R 1,800 – R 4,600 (volume and filler dependent)'
where slug = 'lip-filler';

-- Skin Peels: NeoStrata Glycolic from R665, TCA from R1,595, Pixel Peel R3,250
-- Dermaplaning R800, Crystal Peel R1,300, Mela Forte R2,200, Melanostop R500
update public.treatments set
  price_from = 'From R 665 per session (peel type dependent)'
where slug = 'skin-peel';

-- Jaw & Chin Contouring: Fillers from R4,600/syringe, HarmonyCA R11,990
-- Profhilo/Sculptra/Thread Lift: price after assessment
update public.treatments set
  price_from = 'From R 4,600 per syringe · HarmonyCA R 11,990'
where slug = 'jaw-amp-chin-contouring';

-- Excessive Sweating (Hyperhidrosis): 80+ units at R85/unit = from R6,800
update public.treatments set
  price_from = 'From R 6,800 per treatment (underarms)'
where slug = 'excessive-sweating';

-- Pigmentation Treatment: covers glycolic peels, TCA, Crystal, Mela Forte, Melanostop, Dermapen, PRP
update public.treatments set
  price_from = 'From R 665 per session (modality dependent)'
where slug = 'pigmentation-treatment';

-- Verify
select slug, price_from from public.treatments order by slug;
