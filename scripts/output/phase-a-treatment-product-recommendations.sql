-- ═══════════════════════════════════════════════════════════
-- Star Aesthetic Centre — Phase A: Treatment ↔ Product Graph
-- Generated: 2026-04-02
-- ─────────────────────────────────────────────────────────
-- Creates:
--   public.treatments                         (12 treatments)
--   public.treatment_product_recommendations  (all mappings)
-- Powers:
--   Niki voice agent — "what do I need after X treatment?"
--   Treatment pages   — "Products You'll Need" section
--   Product pages     — "Recommended After" section
--   Glossary          — treatment definitions (Phase C)
-- ═══════════════════════════════════════════════════════════


-- ── Step 1: Create treatments table ──────────────────────
create table if not exists public.treatments (
  id            uuid        default gen_random_uuid() primary key,
  slug          text        unique not null,
  title         text        not null,
  category      text        not null,   -- 'face' | 'skin' | 'body-wellness'
  category_label text       not null,   -- 'Face' | 'Skin' | 'Body & Wellness'
  tagline       text,
  price_from    text,
  duration      text,
  downtime      text,
  downtime_detail text,
  is_active     boolean     default true,
  sort_order    int         default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

comment on table public.treatments is
  'All treatments offered at Star Aesthetic Centre. Mirrors treatments.json — queryable by Niki.';

comment on column public.treatments.slug is
  'Matches slug in lib/data/treatments.json and URL: /treatments/{category}/{slug}';


-- ── Step 2: Create treatment_product_recommendations ─────
create table if not exists public.treatment_product_recommendations (
  id              uuid        default gen_random_uuid() primary key,
  treatment_slug  text        not null references public.treatments(slug) on delete cascade,
  product_id      uuid        not null references public.products(id) on delete cascade,
  phase           text        not null
                    check (phase in (
                      'pre-treatment',
                      'post-treatment',
                      'during-protocol',
                      'maintenance',
                      'complementary'
                    )),
  phase_label     text        not null,  -- Niki-friendly: 'Use immediately after treatment'
  is_essential    boolean     default false,  -- true = Niki always mentions this first
  notes           text,                  -- Specific Niki-ready guidance for this product+treatment
  sort_order      int         default 0,
  created_at      timestamptz default now(),
  unique (treatment_slug, product_id, phase)
);

comment on table public.treatment_product_recommendations is
  'Links treatments to recommended products. Core of Niki knowledge graph.
   Phase: pre-treatment | post-treatment | during-protocol | maintenance | complementary.
   is_essential = true means Niki leads with this product when answering treatment queries.';

comment on column public.treatment_product_recommendations.notes is
  'Niki-ready clinical guidance — specific timing, how to use, why this product for this treatment.';

-- Indexes for Niki query performance
create index if not exists idx_tpr_treatment_slug on public.treatment_product_recommendations(treatment_slug);
create index if not exists idx_tpr_product_id     on public.treatment_product_recommendations(product_id);
create index if not exists idx_tpr_phase          on public.treatment_product_recommendations(phase);
create index if not exists idx_tpr_essential      on public.treatment_product_recommendations(is_essential);


-- ── Step 3: Seed treatments ───────────────────────────────
insert into public.treatments
  (slug, title, category, category_label, tagline, price_from, duration, downtime, downtime_detail, sort_order)
values

  -- FACE ─────────────────────────────────────────────────
  ('botox',
   'Botox® Wrinkle Treatment',
   'face', 'Face',
   'Smooth expression lines and prevent new ones forming',
   'R 1,200 – R 4,500',
   '20–45 minutes',
   'Zero downtime',
   'Return to normal activities immediately. Avoid strenuous exercise for 24 hours.',
   10),

  ('lip-filler',
   'Lip Filler Treatment',
   'face', 'Face',
   'Natural volume and definition for lips of any size',
   'R 2,500 – R 4,500',
   '30–45 minutes',
   '24–48 hours mild swelling',
   'Mild swelling peaks at 24–48 hours. Bruising possible. Avoid strenuous exercise for 24 hours.',
   20),

  ('jaw-amp-chin-contouring',
   'Jaw & Chin Contouring',
   'face', 'Face',
   'Define, balance and contour the lower face with precision filler',
   'R 2,500 – R 8,000',
   '30–60 minutes',
   'Minimal',
   'Mild swelling or bruising for 24–48 hours. Cold compress recommended for the first 4 hours.',
   30),

  ('dermapen-microneedling',
   'Dermapen® Microneedling Treatment',
   'face', 'Face',
   'Stimulate collagen, reduce scars and rejuvenate skin at any depth',
   'R 1,800 – R 2,500',
   '45–75 minutes',
   '24–48 hours redness',
   'Skin is red and warm for 24–48 hours. Social downtime 2–3 days. Home care protocol essential.',
   40),

  -- SKIN ─────────────────────────────────────────────────
  ('skin-peel',
   'Skin Peel Treatment (Chemical Peel)',
   'skin', 'Skin',
   'Resurface, brighten and renew with a medically supervised chemical peel',
   'R 1,200 – R 2,500',
   '30–60 minutes',
   '2–7 days depending on depth',
   'Superficial peels: 2–4 days mild flaking. Medium-depth: 5–7 days visible peeling. Home care protocol essential.',
   50),

  ('pigmentation-treatment',
   'Pigmentation Treatment',
   'skin', 'Skin',
   'Professionally resolve melasma, dark spots and uneven skin tone',
   'R 1,200 – R 8,500',
   '30–90 minutes',
   'Cosmelan: 5–7 days; Peels: 2–5 days; Dermapen: 24–48 hours',
   'Recovery depends on modality. Cosmelan: 5–7 days of sensitivity and peeling. All modalities require strict SPF during and after treatment.',
   60),

  ('acne',
   'Acne Treatment',
   'skin', 'Skin',
   'Medical-grade acne clearing — active breakouts, scarring and post-acne marks',
   'R 850 – R 2,500',
   '30–60 minutes',
   'Minimal',
   'Mild redness or peeling for 24–48 hours after peel-based treatment. Home care protocol required.',
   70),

  ('excessive-sweating',
   'Excessive Sweating Treatment (Hyperhidrosis)',
   'skin', 'Skin',
   'Stop excessive sweating with a single 30-minute Botox® treatment',
   'R 4,500 – R 6,000',
   '30–45 minutes',
   'Zero downtime',
   'Return to work immediately. Results last 6–9 months.',
   80),

  -- BODY & WELLNESS ──────────────────────────────────────
  ('body-contouring',
   'Body Contouring',
   'body-wellness', 'Body & Wellness',
   'Non-surgical fat reduction and body shaping',
   'R 1,200 – R 3,500',
   '45–90 minutes',
   'Minimal',
   'Return to normal activities immediately. Multiple sessions required for full results.',
   90),

  ('medi-lean',
   'Medi-Lean Medical Weight Loss Programme',
   'body-wellness', 'Body & Wellness',
   'Medically supervised weight loss programme with real clinical results',
   'Contact us for programme pricing',
   'Ongoing programme',
   'None',
   'Lifestyle-integrated programme. No procedure downtime.',
   100),

  ('varicose-veins',
   'Varicose Veins Treatment',
   'body-wellness', 'Body & Wellness',
   'Clinically remove varicose and spider veins safely and effectively',
   'R 1,500 – R 3,500',
   '30–60 minutes',
   'Minimal',
   'Compression stockings worn for 5–7 days. Avoid strenuous exercise for 1 week.',
   110),

  ('vitamin-drips',
   'Vitamin Drips — Intravenous Nutrient Therapy',
   'body-wellness', 'Body & Wellness',
   'Direct-to-bloodstream vitamin and nutrient therapy for energy, immunity and skin',
   'R 1,800 – R 3,500',
   '45–75 minutes',
   'None',
   'Return to normal activities immediately after. Effects felt within hours.',
   120)

on conflict (slug) do update set
  title          = excluded.title,
  category       = excluded.category,
  category_label = excluded.category_label,
  tagline        = excluded.tagline,
  price_from     = excluded.price_from,
  duration       = excluded.duration,
  downtime       = excluded.downtime,
  downtime_detail = excluded.downtime_detail,
  updated_at     = now();


-- ── Step 4: Seed treatment_product_recommendations ───────
-- ─────────────────────────────────────────────────────────
-- FORMAT:
--   (treatment_slug, (select id from products where slug='...'),
--    phase, phase_label, is_essential, notes, sort_order)
--
-- PHASES:
--   pre-treatment    = use before the procedure
--   post-treatment   = use immediately after / during acute recovery
--   during-protocol  = use throughout an extended treatment programme
--   maintenance      = use long-term to hold and extend results
--   complementary    = enhances results; not essential but recommended
-- ─────────────────────────────────────────────────────────

insert into public.treatment_product_recommendations
  (treatment_slug, product_id, phase, phase_label, is_essential, notes, sort_order)
values

-- ══════════════════════════════════════════════════════════
-- DERMAPEN® MICRONEEDLING
-- Post-treatment home care is the most product-intensive
-- protocol on the menu — 5 essential products
-- ══════════════════════════════════════════════════════════

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-fast-skin-repair'),
   'post-treatment', 'Use immediately after treatment',
   true,
   'Apply from the same evening of your Dermapen treatment. Use 2–3 times daily for the first 5 days. This is the most important product in your Dermapen recovery kit — it accelerates healing and reduces downtime significantly.',
   1),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-anti-stress-face-mask'),
   'post-treatment', 'Use during recovery week',
   true,
   'Apply 15–20 minutes once daily from day 2 of recovery. Centella and allantoin calm the post-needling inflammation and support barrier repair. Use every evening for the first week, then reduce to 2x per week.',
   2),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Use during recovery week',
   false,
   'Mist over skin 3–4 times daily during the recovery phase for immediate soothing and cooling comfort. Can be used over products as they absorb.',
   3),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-hydracream-fusion'),
   'post-treatment', 'Use during recovery — dry and normal skin types',
   false,
   'For patients with dry or dehydrated skin: use as a rich overnight treatment during the recovery week to support barrier repair. Follow Fast Skin Repair with Hydracream Fusion in the evening.',
   4),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Use daily from day 5 onwards',
   true,
   'SPF is mandatory from the moment skin has healed after Dermapen. UV exposure during the recovery and maintenance phase can trigger post-inflammatory hyperpigmentation. Apply every morning.',
   5),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'maintenance', 'Resume once skin has fully healed',
   true,
   'Reintroduce from approximately day 7 once skin is no longer sensitive. Aox Ferulic antioxidant protection complements the collagen stimulation Dermapen has initiated — protecting the new collagen from environmental degradation.',
   6),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'maintenance', 'Resume from day 7 onwards',
   false,
   'Multi-level HA serum is an excellent complement to Dermapen results — both treatments target skin volume and density from different angles. Reintroduce from week 2 as part of your evening anti-ageing routine.',
   7),

  ('dermapen-microneedling',
   (select id from public.products where slug = 'dermaceutic-activ-retinol-10'),
   'maintenance', 'Reintroduce from week 4',
   false,
   'If you were using retinol before your Dermapen session, Dr. Bangalee will advise when to reintroduce it — typically from week 4 of the post-procedure period once the skin has fully stabilised.',
   8),


-- ══════════════════════════════════════════════════════════
-- SKIN PEEL (CHEMICAL PEEL)
-- Recovery products depend on peel depth
-- ══════════════════════════════════════════════════════════

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-fast-skin-repair'),
   'post-treatment', 'Use immediately after treatment',
   true,
   'Apply from the same day as your peel. Use 2–3 times daily during the active peeling phase. Fast Skin Repair significantly reduces downtime and the intensity of visible peeling.',
   1),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-melan-recovery'),
   'post-treatment', 'Use during recovery — especially after pigmentation peels',
   true,
   'Essential for any peel with a pigmentation component. Apply morning and evening as your soothing moisturiser throughout the recovery phase. Niacinamide and centella calm peel-induced redness and support barrier recovery.',
   2),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-anti-stress-face-mask'),
   'post-treatment', 'Use 1–2x per week during recovery',
   false,
   'After the active peeling phase (typically from day 4 onward), apply the Anti-Stress Face Mask 1–2x per week to accelerate barrier repair and calm any residual redness.',
   3),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Use throughout recovery',
   false,
   'Mist throughout the day for immediate soothing comfort during the recovery phase. Particularly effective during the first 48 hours when skin is hot and reactive.',
   4),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-hydracream-fusion'),
   'post-treatment', 'Use during recovery — dry skin types',
   false,
   'Dry skin types should use Hydracream Fusion as a rich overnight treatment during the recovery phase to restore the lipid-depleted barrier more quickly.',
   5),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Essential SPF — use daily from day 7',
   true,
   'SPF is absolutely non-negotiable after any chemical peel. The newly resurfaced skin is highly susceptible to UV-triggered pigmentation. Apply every morning from the day skin has fully healed.',
   6),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-brightening-foam'),
   'maintenance', 'Reintroduce 2–3 weeks post-peel',
   false,
   'Once skin has fully recovered (typically 2–3 weeks after a medium peel), resume the Brightening Foam cleanser as your morning prep step to maintain the resurfaced skin quality.',
   7),

  ('skin-peel',
   (select id from public.products where slug = 'mesoestetic-melan-tran3x-gel-cream'),
   'maintenance', 'Begin maintenance protocol after recovery',
   false,
   'After a pigmentation peel, the Melan Tran3x Gel-Cream maintains the depigmenting results. Use daily as your morning moisturiser step from week 2 onwards as directed by Dr. Bangalee.',
   8),

  ('skin-peel',
   (select id from public.products where slug = 'dermaceutic-foamer-15'),
   'maintenance', 'Reintroduce 2–3 weeks post-peel',
   false,
   'Dermaceutic Foamer 15 AHA cleanser is an excellent maintenance step after peel recovery to sustain skin resurfacing and prevent the buildup of dead cells that reduces peel results over time.',
   9),


-- ══════════════════════════════════════════════════════════
-- PIGMENTATION TREATMENT (Cosmelan / Melan Tran3x / Dermapen)
-- The most complex product protocol — every listed product is essential
-- ══════════════════════════════════════════════════════════

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-melan-tranex-kit'),
   'during-protocol', 'Your complete home care protocol',
   true,
   'The Melan Tranex Kit contains everything you need to start the Melan Tran3x depigmentation protocol at home. Dr. Bangalee prescribes this as the foundation of the home care component of your pigmentation treatment.',
   1),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-melan-tran3x-concentrate'),
   'during-protocol', 'Evening treatment — core of the protocol',
   true,
   'Apply every evening as your targeted treatment serum. The Tran3x multi-pathway system targets melanin production at three stages simultaneously — this is the core product driving your depigmentation results.',
   2),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-melan-tran3x-gel-cream'),
   'during-protocol', 'Morning moisturiser — keeps protocol active all day',
   true,
   'Apply every morning as your daytime moisturiser. Maintains the melanin suppression from the evening Concentrate throughout the day. Do not substitute with a regular moisturiser during the active protocol.',
   3),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-melan-recovery'),
   'during-protocol', 'Soothing support during treatment',
   true,
   'Use morning and evening as your soothing moisturiser if your skin becomes sensitised or reactive during the protocol. Essential in the first 2–4 weeks when sensitivity is highest.',
   4),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'during-protocol', 'Essential daily SPF — non-negotiable',
   true,
   'Apply every morning without exception throughout the entire pigmentation treatment and for at least 6 months after. UV exposure is the primary trigger for melanin overproduction — without SPF the protocol is working against the stimulus you recreate every time you go outdoors.',
   5),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-cosmelan-2-maintenance-cream'),
   'post-treatment', 'Essential after the in-clinic Cosmelan peel',
   true,
   'Cosmelan 2 is prescribed by Dr. Bangalee specifically for patients who have had the professional Cosmelan peel. This is the home maintenance cream that protects and extends the peel results — the maintenance phase is as important as the peel itself. Use exactly as prescribed.',
   6),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-fast-skin-repair'),
   'post-treatment', 'Use immediately after Cosmelan or Dermapen session',
   true,
   'Apply in the immediate post-procedure phase after the Cosmelan peel or Dermapen microneedling session. Use 2–3 times daily for the first 5 days of the acute recovery phase.',
   7),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-brightening-foam'),
   'pre-treatment', 'Begin 2 weeks before starting the protocol',
   false,
   'Starting Brightening Foam 2 weeks before the active depigmentation protocol prepares the skin surface — removing dead cell buildup that would otherwise reduce penetration of the treatment actives. Continue as your morning cleanser throughout the protocol.',
   8),

  ('pigmentation-treatment',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'maintenance', 'Reintroduce after active protocol is complete',
   false,
   'Once the active depigmentation protocol is complete and results are consolidated, Aox Ferulic Vitamin C serum is an excellent long-term maintenance product — its antioxidant action reduces the UV-triggered oxidative signals that reactivate melanin production.',
   9),


-- ══════════════════════════════════════════════════════════
-- ACNE TREATMENT
-- ══════════════════════════════════════════════════════════

  ('acne',
   (select id from public.products where slug = 'mesoestetic-brightening-foam'),
   'during-protocol', 'Daily cleansing — start from day 1',
   true,
   'Brightening Foam AHA cleanser is the first step in the acne home care protocol. Glycolic acid unclogs pore openings, removes the dead cell buildup that traps sebum, and prepares skin for treatment products to follow.',
   1),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-fast-skin-repair'),
   'post-treatment', 'Use after any peel-based acne treatment',
   true,
   'Apply after any in-clinic peel component of your acne treatment. Use 2–3 times daily for the first 3–5 days to accelerate recovery.',
   2),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-anti-stress-face-mask'),
   'post-treatment', 'Use during recovery week',
   false,
   'Apply 1–2 times per week during the recovery period after any peel-based acne treatment to calm post-peel reactivity and support barrier recovery.',
   3),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-melan-tran3x-concentrate'),
   'during-protocol', 'For post-acne hyperpigmentation (PIH)',
   false,
   'If your acne has left post-inflammatory dark marks, the Melan Tran3x Concentrate is the most effective product for fading them. Dr. Bangalee will prescribe this as part of a combined acne and PIH protocol.',
   4),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-melan-tran3x-gel-cream'),
   'maintenance', 'Maintenance for post-acne marks',
   false,
   'Use as your morning moisturiser to maintain the depigmenting action on post-acne marks throughout the day. Can be used as a standalone product for mild PIH or alongside the Concentrate for more significant marks.',
   5),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Essential daily SPF throughout treatment',
   true,
   'SPF is critical during acne treatment — particularly when chemical peels are involved and when treating post-acne PIH. UV exposure darkens and prolongs post-inflammatory marks significantly.',
   6),

  ('acne',
   (select id from public.products where slug = 'mesoestetic-melan-recovery'),
   'post-treatment', 'Use after peel-based acne treatments',
   false,
   'Apply as a soothing moisturiser during recovery from peel-based acne treatments. Niacinamide provides anti-inflammatory support and helps calm the redness associated with active acne and post-peel sensitivity.',
   7),

  ('acne',
   (select id from public.products where slug = 'dermaceutic-foamer-15'),
   'during-protocol', 'Alternative AHA cleanser option',
   false,
   'Dermaceutic Foamer 15 is an alternative AHA-based cleanser option for acne protocols. Dr. Bangalee will select the most appropriate cleanser based on your specific acne type and skin condition.',
   8),

  ('acne',
   (select id from public.products where slug = 'dermaceutic-dual-plus'),
   'during-protocol', 'Targeted acne treatment product',
   false,
   'Dermaceutic Dual Plus provides additional acne-clearing action. Dr. Bangalee may prescribe this as part of a comprehensive in-clinic acne programme.',
   9),


-- ══════════════════════════════════════════════════════════
-- BOTOX® WRINKLE TREATMENT
-- Zero downtime — focus on maintenance and enhancing results
-- ══════════════════════════════════════════════════════════

  ('botox',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'maintenance', 'Daily morning antioxidant — use continuously',
   true,
   'Botox treats the visible signs of ageing; Aox Ferulic prevents the environmental damage that causes them. This is the most important maintenance product after any anti-ageing treatment — protecting the collagen you still have while Botox smooths the lines that have already formed.',
   1),

  ('botox',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'maintenance', 'Daily evening serum to complement Botox results',
   true,
   'HA Densimatrix multi-level hyaluronic acid works synergistically with Botox — Botox relaxes the muscles that cause lines; HA Densimatrix plumps and volumises the skin from within. Patients using both typically need less Botox volume over time.',
   2),

  ('botox',
   (select id from public.products where slug = 'mesoestetic-age-element-brightening-eye-cream'),
   'maintenance', 'Essential for patients treating eye area Botox',
   false,
   'Specifically recommended for patients who have crow feet or forehead Botox. The AGE Element Brightening Eye Cream addresses the thin periocular skin between Botox appointments — puffiness, dark circles and fine lines that Botox alone does not treat.',
   3),

  ('botox',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF — essential year-round',
   true,
   'UV protection is non-negotiable for any anti-ageing patient. UV radiation is the single biggest driver of skin ageing between appointments — wearing SPF50+ daily directly extends the results of your Botox treatment.',
   4),

  ('botox',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Use on the day of treatment if needed',
   false,
   'The cooling, hydrating mist provides comfort if the injection sites feel tender immediately after the treatment session. Optional — most patients require nothing more after Botox.',
   5),

  ('botox',
   (select id from public.products where slug = 'dermaceutic-activ-retinol-10'),
   'maintenance', 'Evening retinol to maximise anti-ageing results',
   false,
   'Retinol drives the cellular renewal that complements the muscle-relaxing effect of Botox. Used in the evening, it stimulates collagen production and accelerates skin cell turnover — extending the skin quality improvements between Botox appointments.',
   6),


-- ══════════════════════════════════════════════════════════
-- LIP FILLER
-- ══════════════════════════════════════════════════════════

  ('lip-filler',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Use immediately after treatment for swelling comfort',
   true,
   'The Hydratonic Mist can be spritzed gently over the lip area immediately after your filler treatment for cooling, soothing comfort. Safe over the treatment area — the fine mist does not disturb the placement.',
   1),

  ('lip-filler',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'maintenance', 'Daily serum to complement and extend filler results',
   false,
   'HA Densimatrix multi-level hyaluronic acid serum complements the HA filler — the topical HA maintains skin hydration and quality around the lip area, extending the appearance of the filler result between appointments.',
   2),

  ('lip-filler',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF on face and lip area',
   false,
   'Protect the investment of your filler treatment with daily SPF. UV degradation of both the filler and the surrounding skin is a key factor in how long results last.',
   3),

  ('lip-filler',
   (select id from public.products where slug = 'dermaceutic-hyal-ceutic'),
   'maintenance', 'Daily hydrating moisturiser',
   false,
   'Dermaceutic Hyal Ceutic is a deeply hydrating moisturiser that complements the HA filler effect and maintains the plump, well-hydrated appearance of the lip area and surrounding skin.',
   4),


-- ══════════════════════════════════════════════════════════
-- JAW & CHIN CONTOURING (Dermal Filler)
-- ══════════════════════════════════════════════════════════

  ('jaw-amp-chin-contouring',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Use on day of treatment for comfort',
   false,
   'Gently mist over the treated areas on the day of treatment for cooling and soothing comfort. The fine mist does not disturb filler placement.',
   1),

  ('jaw-amp-chin-contouring',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'maintenance', 'Daily serum to extend filler results',
   true,
   'HA Densimatrix provides daily topical hyaluronic acid that complements the in-clinic filler. Patients who use HA serum consistently maintain better skin quality and volume between filler appointments.',
   2),

  ('jaw-amp-chin-contouring',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'maintenance', 'Daily antioxidant protection',
   false,
   'Protect the structural results of your filler treatment with daily antioxidant protection. UV and environmental damage degrades both the filler and surrounding skin quality over time.',
   3),

  ('jaw-amp-chin-contouring',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF',
   true,
   'Consistent SPF use is the single most effective way to extend the results and skin quality improvements from your filler treatment.',
   4),


-- ══════════════════════════════════════════════════════════
-- EXCESSIVE SWEATING (Hyperhidrosis Botox)
-- Minimal post-treatment skincare needs — focus on general maintenance
-- ══════════════════════════════════════════════════════════

  ('excessive-sweating',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'maintenance', 'Daily antioxidant — general skin health',
   false,
   'While there are no specific post-procedure skincare requirements after hyperhidrosis Botox, maintaining a quality daily antioxidant serum supports overall skin health.',
   1),

  ('excessive-sweating',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF',
   false,
   'Daily SPF is recommended year-round for all patients regardless of treatment type.',
   2),


-- ══════════════════════════════════════════════════════════
-- BODY CONTOURING
-- ══════════════════════════════════════════════════════════

  ('body-contouring',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'General post-treatment comfort',
   false,
   'The Hydratonic Mist can be applied over treated body areas for soothing and hydrating comfort after the session. Optional based on individual comfort.',
   1),

  ('body-contouring',
   (select id from public.products where slug = 'mesoestetic-hydracream-fusion'),
   'maintenance', 'Daily skin nourishment during treatment programme',
   false,
   'Keeping the skin well-nourished and hydrated during a body contouring programme supports overall skin quality and the appearance of the treated areas.',
   2),


-- ══════════════════════════════════════════════════════════
-- MEDI-LEAN MEDICAL WEIGHT LOSS
-- Skin support during active weight loss
-- ══════════════════════════════════════════════════════════

  ('medi-lean',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'during-protocol', 'Support skin elasticity during weight loss',
   false,
   'During active weight loss, the skin''s hyaluronic acid and collagen are placed under additional stress. HA Densimatrix provides daily topical HA support to maintain skin firmness and quality throughout the weight loss programme.',
   1),

  ('medi-lean',
   (select id from public.products where slug = 'mesoestetic-hydracream-fusion'),
   'during-protocol', 'Nourish and support skin during weight loss',
   false,
   'Weight loss can compromise the skin barrier and accelerate dryness. Hydracream Fusion provides the ceramide-rich nourishment to keep skin healthy and comfortable during the programme.',
   2),

  ('medi-lean',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'complementary', 'Antioxidant support complements IV nutrient therapy',
   false,
   'Aox Ferulic topical Vitamin C serum complements the antioxidant component of IV vitamin therapy — providing skin-level protection from oxidative stress to match the systemic antioxidant support.',
   3),

  ('medi-lean',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF',
   false,
   'Recommended year-round for all patients.',
   4),


-- ══════════════════════════════════════════════════════════
-- VARICOSE VEINS TREATMENT
-- ══════════════════════════════════════════════════════════

  ('varicose-veins',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'post-treatment', 'Skin comfort post-treatment',
   false,
   'The Hydratonic Mist can be applied gently over the treated leg area for soothing comfort. Do not apply directly over injection sites on the day of treatment.',
   1),

  ('varicose-veins',
   (select id from public.products where slug = 'mesoestetic-hydracream-fusion'),
   'maintenance', 'Daily leg skin nourishment',
   false,
   'Keeping the leg skin well-nourished and hydrated supports the appearance of the treated area over the healing period.',
   2),


-- ══════════════════════════════════════════════════════════
-- VITAMIN DRIPS (IV Nutrient Therapy)
-- Topical complements to IV therapy
-- ══════════════════════════════════════════════════════════

  ('vitamin-drips',
   (select id from public.products where slug = 'mesoestetic-aox-ferulic'),
   'complementary', 'Topical Vitamin C to complement IV Vitamin C drips',
   true,
   'If your vitamin drip includes Vitamin C (high-dose ascorbic acid IV), pairing it with topical Aox Ferulic creates a systemic and topical antioxidant combination that is significantly more effective than either alone. The IV Vitamin C protects systemically; Aox Ferulic protects at the skin surface where UV and environmental damage occurs.',
   1),

  ('vitamin-drips',
   (select id from public.products where slug = 'mesoestetic-hydratonic-mist'),
   'complementary', 'Topical hydration complement to hydration drips',
   false,
   'Paired with IV hydration therapy, the Hydratonic Mist delivers surface-level HA hydration to complement the deep systemic hydration of the drip — a complete inside-out hydration approach.',
   2),

  ('vitamin-drips',
   (select id from public.products where slug = 'mesoestetic-ha-densimatrix'),
   'complementary', 'Topical HA to complement HA-based IV treatments',
   false,
   'For drips that include hyaluronic acid components, HA Densimatrix provides the topical multi-level HA that works at the skin surface and mid-layers — continuing the volumising and hydrating effect of IV therapy at the dermal level.',
   3),

  ('vitamin-drips',
   (select id from public.products where slug = 'mesoestetic-mesoprotech-melan-130-pigment-control-spf50'),
   'maintenance', 'Daily SPF',
   false,
   'Recommended year-round for all patients.',
   4)

on conflict (treatment_slug, product_id, phase) do update set
  phase_label  = excluded.phase_label,
  is_essential = excluded.is_essential,
  notes        = excluded.notes,
  sort_order   = excluded.sort_order;


-- ── Step 5: Enable Row Level Security (read-only public) ─
alter table public.treatments enable row level security;
alter table public.treatment_product_recommendations enable row level security;

create policy "treatments_public_read"
  on public.treatments for select using (true);

create policy "tpr_public_read"
  on public.treatment_product_recommendations for select using (true);


-- ── Step 6: Verify ───────────────────────────────────────
-- Treatments seeded
select category_label, slug, title
from public.treatments
order by sort_order;

-- Recommendations count per treatment
select
  t.title,
  count(*) as total_products,
  count(*) filter (where r.is_essential) as essential,
  count(*) filter (where r.phase = 'post-treatment') as post_tx,
  count(*) filter (where r.phase = 'maintenance') as maintenance,
  count(*) filter (where r.phase = 'during-protocol') as during_protocol
from public.treatments t
left join public.treatment_product_recommendations r on r.treatment_slug = t.slug
group by t.title, t.sort_order
order by t.sort_order;

-- Full mapping with product names — what Niki will query
select
  t.title as treatment,
  r.phase,
  r.is_essential,
  p.name as product,
  p.brand_slug as brand
from public.treatment_product_recommendations r
join public.treatments t on t.slug = r.treatment_slug
join public.products p on p.id = r.product_id
order by t.sort_order, r.sort_order;
