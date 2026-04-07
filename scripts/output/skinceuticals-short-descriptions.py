"""
Writes skinceuticals-short-descriptions-update.sql
All 20 SkinCeuticals short descriptions — emotional copy (pain-first, never ingredients)
"""

OUTPUT_FILE = r"C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs\scripts\output\skinceuticals-short-descriptions-update.sql"

products = [
    (
        "skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid",
        "sd_cef",
        """<p>You're doing everything right — sleeping well, drinking water, wearing SPF — but your skin still looks dull, tired, and older than you feel. <strong>C E Ferulic is SkinCeuticals' most awarded serum</strong>: a pure vitamin C formula that targets the oxidative damage no lifestyle habit can undo. Brighter, firmer, visibly younger-looking skin — with antioxidant protection that lasts all day.</p>"""
    ),
    (
        "skinceuticals-phloretin-cf-with-ferulic-acid",
        "sd_phl",
        """<p>Those dark patches — from old breakouts, sun exposure, or hormones — make you look older than you feel, and nothing you've tried has made them budge. <strong>Phloretin CF is formulated for combination and oily skin</strong> dealing with uneven tone, early lines, and environmental damage. It fades discolouration, neutralises free radical damage, and refines texture — so your face finally matches how you feel inside.</p>"""
    ),
    (
        "skinceuticals-hyaluronic-acid-intensifier-ha",
        "sd_ha",
        """<p>Your skin has lost that plump, dewy bounce — it looks flat, feels tight, and no moisturiser seems to make a lasting difference. <strong>H.A. Intensifier amplifies your skin's own hyaluronic acid levels</strong> — not just adding moisture on top, but restoring the structure that holds it in. Visibly plumper, smoother skin that holds hydration throughout the day.</p>"""
    ),
    (
        "skinceuticals-hydrating-b5-gel",
        "sd_b5",
        """<p>Your skin feels tight and uncomfortable — especially after cleansing or treatments — but heavier creams leave you feeling greasy and congested. <strong>This lightweight, oil-free gel delivers intense, long-lasting hydration</strong> without clogging pores. Skin that feels soft, supple, and balanced — never tight, never heavy.</p>"""
    ),
    (
        "skinceuticals-gentle-cleanser",
        "sd_gc",
        """<p>Every cleanser you've tried leaves your skin feeling stripped, raw, or irritated — like you've washed away the good along with the bad. <strong>SkinCeuticals Gentle Cleanser respects your skin barrier</strong> while thoroughly removing makeup, impurities, and SPF. Clean skin that still feels comfortable, calm, and ready for the rest of your routine.</p>"""
    ),
    (
        "skinceuticals-glycolic-renewal-cleanser",
        "sd_grc",
        """<p>Your skin feels rough and congested, your products aren't absorbing the way they used to, and that healthy glow has quietly disappeared. <strong>This daily resurfacing cleanser uses glycolic acid to clear away the layer of dead skin</strong> that's dulling your complexion and blocking your other products. Smoother texture, cleaner pores, and a brightness you'll notice from the very first wash.</p>"""
    ),
    (
        "skinceuticals-glycolic-10-renew-overnight",
        "sd_g10",
        """<p>You're going to bed with skin that looks tired and rough — and waking up with exactly the same result. <strong>Glycolic 10 Renew Overnight works while you sleep</strong>: a concentrated AHA treatment that resurfaces, brightens, and renews your skin through the night. Wake up to noticeably smoother, more radiant skin — without a single extra step in your morning routine.</p>"""
    ),
    (
        "skinceuticals-resveratrol-be",
        "sd_res",
        """<p>You invest in your daytime routine — but your skin is still ageing overnight, breaking down collagen and losing firmness while you sleep. <strong>Resveratrol BE is a concentrated overnight antioxidant treatment</strong> that works with your skin's natural repair cycle to strengthen and rebuild. Firmer, more resilient skin by morning — and visible improvement in tone and texture over time.</p>"""
    ),
    (
        "skinceuticals-serum-10-aox",
        "sd_s10",
        """<p>You know vitamin C is essential — but every formula you've tried has caused redness, irritation, or breakouts, so you've given up on it entirely. <strong>Serum 10 AOX+ delivers the proven antioxidant benefits of pure vitamin C in a gentler, lower-concentration formula</strong> designed for sensitive or reactive skin. Brighter, more even skin tone — with none of the sensitivity that's stopped you before.</p>"""
    ),
    (
        "skinceuticals-age-eye-complex",
        "sd_aec",
        """<p>People keep asking if you're tired — even on your best days. The fine lines, puffiness, and dark circles around your eyes are ageing you far more than the rest of your face. <strong>Age Eye Complex targets all three signs of eye-area ageing in one formula</strong>: lines, puffiness, and discolouration. A visibly more awake, rested appearance — so your eyes finally reflect how you actually feel.</p>"""
    ),
    (
        "skinceuticals-age-interrupter-advanced",
        "sd_aia",
        """<p>The lines and wrinkles that bother you most aren't surface-level — they're deep, settled, and getting more defined with every year that passes. <strong>Age Interrupter Advanced targets the structural causes of advanced facial ageing</strong>: loss of firmness, deep-set lines, and thinning skin. Measurably smoother, firmer, more lifted-looking skin — with visible results in as little as four weeks.</p>"""
    ),
    (
        "skinceuticals-discoloration-defense",
        "sd_dd",
        """<p>Those dark patches — from sun damage, hormones, or old breakout scars — have been there for years, and no brightening cream has made them fade the way you hoped. <strong>Discoloration Defense is a clinically formulated serum targeting the most stubborn forms of hyperpigmentation</strong>, including melasma and post-inflammatory marks. Visibly clearer, more even skin tone — even where other treatments have failed.</p>"""
    ),
    (
        "skinceuticals-blemish-age-serum",
        "sd_bas",
        """<p>You're not a teenager, but your skin hasn't got that memo — you're fighting breakouts on one side of your face and fine lines on the other. <strong>Blemish + Age Serum is specifically formulated for adult skin</strong> dealing with both active blemishes and early signs of ageing. Clearer skin, smaller-looking pores, and fewer lines — without the harsh, drying effects of typical acne treatments.</p>"""
    ),
    (
        "skinceuticals-phyto-a-brightening-treatment",
        "sd_pab",
        """<p>Your skin looks flat and grey — not sick, not breaking out, just dull — like it's lost whatever used to make it look healthy and alive. <strong>Phyto A+ Brightening Treatment is a concentrated resurfacing formula</strong> that targets dullness, uneven texture, and loss of radiance in one step. Visibly brighter, smoother, more luminous skin — restored to the glow that should have been there all along.</p>"""
    ),
    (
        "skinceuticals-ptiox",
        "sd_ptx",
        """<p>You're not ready for injections — but those lines between your brows and around your eyes have settled in and they're there even when your face is completely relaxed. <strong>Ptiox is a topical treatment that targets expression-line depth</strong> by reducing the muscle micro-contractions that deepen wrinkles over time. Visibly softer expression lines without needles — a clinical approach to younger-looking skin, entirely on your terms.</p>"""
    ),
    (
        "skinceuticals-retinol-03",
        "sd_r03",
        """<p>Everyone keeps telling you to start retinol — but you're nervous about the redness, peeling, and irritation you've heard about, and you don't want to damage your skin in the process of trying to improve it. <strong>Retinol 0.3 is the ideal starting point</strong>: a gentle, encapsulated formula that delivers real results with a significantly lower risk of irritation. Smoother texture, fewer lines, and more even tone — an introduction to retinol your skin can actually handle.</p>"""
    ),
    (
        "skinceuticals-retinol-05",
        "sd_r05",
        """<p>You've been using retinol for a while and you can feel it working — but you're ready for more noticeable results on fine lines, texture, and uneven tone. <strong>Retinol 0.5 delivers a meaningful step up in strength</strong> while remaining well-tolerated for skin types who've already built retinol resilience. Accelerated renewal, visibly smoother skin, and measurably fewer fine lines — the next level in your anti-ageing routine.</p>"""
    ),
    (
        "skinceuticals-retinol-10",
        "sd_r10",
        """<p>You've been through the beginner phase and you're done playing it safe — your skin can handle more, and it's time your results reflected that. <strong>Retinol 1.0 is SkinCeuticals' highest-strength formula</strong>: a maximum-dose overnight treatment for experienced users ready for accelerated transformation. Dramatic improvement in lines, texture, and firmness — the kind of results that make people ask what you've changed.</p>"""
    ),
    (
        "skinceuticals-triple-lipid-restore",
        "sd_tlr",
        """<p>Your skin feels permanently dry — tight, uncomfortable, sometimes flakey — and no matter how much moisturiser you apply, nothing seems to hold the moisture in. <strong>Triple Lipid Restore 2:4:2 replenishes the three essential lipids your skin barrier needs</strong> to hold hydration and protect itself: ceramides, cholesterol, and fatty acids — in the precise ratio found in healthy, young skin. Skin that finally feels comfortable, looks plumper, and stays hydrated — because you've given it back what it was missing.</p>"""
    ),
    (
        "skinceuticals-advanced-brightening-uv-defense-spf50",
        "sd_spf",
        """<p>You're wearing SPF every day — but those dark spots and uneven patches keep coming back, because sun protection alone isn't enough to undo what UV exposure has already done. <strong>Advanced Brightening UV Defense SPF50 combines high-protection sunscreen with active brightening ingredients</strong> in a lightweight, non-greasy formula. Daily protection that doesn't just prevent further damage — it actively works to fade the discolouration you already have.</p>"""
    ),
]

sql_parts = ["-- SkinCeuticals short descriptions — emotional copy rewrite\n-- All 20 products · April 2026\n\n"]

for slug, label, html in products:
    sql_parts.append(f"update public.products\nset short_description = ${label}${html}${label}$\nwhere slug = '{slug}';\n\n")

# Verify query
sql_parts.append("""-- Verify: check all 20 have short descriptions
select
  name,
  case when short_description is not null and length(short_description) > 20
       then '✅ OK'
       else '❌ MISSING'
  end as short_desc_check,
  length(short_description) as chars
from public.products
where brand_slug = 'skinceuticals'
order by name;
""")

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(''.join(sql_parts))

print(f"Written {len(products)} products to {OUTPUT_FILE}")
