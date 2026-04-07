"""Appends remaining NeoStrata product descriptions to the SQL file."""
import os

OUTPUT_FILE = r"C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs\scripts\output\neostrata-descriptions-update.sql"

products = []

# ── PHA Daily Moisturizer ─────────────────────────────────────────────
products.append(("neostrata-pha-daily-moisturizer", "desc_pha_moist", """
<h2>Is NeoStrata PHA Daily Moisturizer right for you?</h2>
<ul>
  <li><strong>If you want the benefits of exfoliation but your skin cannot tolerate glycolic or salicylic acid</strong> — PHAs deliver the same cell renewal results with gentler action that sensitive skin can handle every single day.</li>
  <li><strong>If your skin looks dull despite regular moisturising</strong> — the dead cell layer blocking radiance needs to be loosened. PHA exfoliates and hydrates simultaneously in one product.</li>
  <li><strong>If you want to simplify your routine without sacrificing results</strong> — the PHA Daily Moisturizer replaces both your exfoliant and your moisturiser in a single step.</li>
  <li><strong>If you are new to active skincare and want to start gently</strong> — this is the ideal introduction to the NeoStrata range. Measurable results without the adjustment period of stronger actives.</li>
  <li><strong>If rosacea, eczema, or general reactivity has made you afraid of exfoliating products</strong> — PHAs have been clinically validated for use on reactive and sensitive skin types.</li>
</ul>

<h2>How NeoStrata PHA Daily Moisturizer works — the science</h2>
<p>Polyhydroxy acids are the next generation of chemical exfoliants. Like glycolic acid, they work by loosening the bonds between dead surface cells, accelerating their shedding to reveal the brighter skin underneath. But unlike glycolic acid, PHAs are larger molecules — they penetrate more slowly, act on the surface layer rather than the deeper dermis, and cause significantly less irritation, redness, or sensitivity.</p>
<p>NeoStrata PHA Daily Moisturizer delivers this gentle exfoliation alongside a complete hydrating complex. Humectants draw water into the skin, emollients smooth the surface, and the PHA simultaneously clears the dead cells that prevent these ingredients from reaching their full potential. The result is skin that is not just hydrated but genuinely clear, smooth, and radiant.</p>
<p>PHAs also carry antioxidant properties and are compatible with compromised barriers, making this one of the only exfoliating moisturisers that can be safely used every day — morning and evening — without risk of over-exfoliation.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — Skin feels soft and hydrated. No tingling or tightness.</p>
<p><strong>Week 1-2</strong> — Dullness lifts. Texture becomes noticeably smoother. Pores appear less prominent.</p>
<p><strong>Month 1+</strong> — Skin has a consistent clarity and luminosity that others notice. Fine lines are softer and overall tone is more even.</p>

<h2>How to use NeoStrata PHA Daily Moisturizer</h2>
<ol>
  <li>After cleansing, apply to face and neck morning and evening.</li>
  <li>Use as your primary moisturiser — no additional moisturiser needed.</li>
  <li>In the morning, follow with SPF.</li>
  <li>Suitable for use 7 days a week.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>Gluconolactone (PHA)</td><td>Gently exfoliates by loosening dead surface cells — improving texture, tone and radiance without irritation</td></tr>
    <tr><td>Lactobionic acid (PHA)</td><td>Second PHA with antioxidant properties that hydrates while it exfoliates</td></tr>
    <tr><td>Humectants</td><td>Draw and hold moisture in the skin throughout the day</td></tr>
    <tr><td>Emollients</td><td>Smooth the surface and improve the feel and appearance of skin texture</td></tr>
    <tr><td>Antioxidants</td><td>Protect against environmental damage that contributes to dullness and uneven tone</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I recommend the PHA Daily Moisturizer as a starting point for patients who want active skincare results without a complex multi-step routine. It is also my first recommendation for patients who have had reactions to glycolic or salicylic acid — PHAs give them results without the discomfort they have come to associate with actives."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I have rosacea and was told I could never use exfoliating products. This one proved everyone wrong. My skin is clearer than it has ever been."<br/><strong>Alison, Kloof</strong></td>
      <td>"One product that exfoliates and moisturises is exactly what I needed. My routine went from 8 steps to 4."<br/><strong>Kagiso, Glenwood</strong></td>
      <td>"After two weeks I had my mother asking what I had changed. I just told her I started a new moisturiser."<br/><strong>Yolandi, La Lucia</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>Can I use this every day?</td><td>Yes — PHAs are formulated for daily use. Unlike AHAs, they do not cause over-exfoliation with consistent application.</td></tr>
    <tr><td>Do I still need SPF?</td><td>Yes, in the morning. All exfoliating products increase UV sensitivity slightly — daily SPF is essential.</td></tr>
    <tr><td>Can I use this with other NeoStrata actives?</td><td>Yes. It layers well with NeoStrata serums and treatments. Introduce one product at a time if you have reactive skin.</td></tr>
    <tr><td>Is this suitable for oily skin?</td><td>Yes — its lightweight texture suits all skin types including oily and combination.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>PHAs are generally considered safe during pregnancy. Consult your doctor if you have any concerns.</td></tr>
  </tbody>
</table>
"""))

# ── Mandelic Clarifying Cleanser ──────────────────────────────────────
products.append(("neostrata-mandelic-clarifying-cleanser", "desc_mandelic", """
<h2>Is NeoStrata Mandelic Clarifying Cleanser right for you?</h2>
<ul>
  <li><strong>If you wash your face twice a day and still feel congested, oily, or prone to breakouts</strong> — most cleansers move surface dirt around. Mandelic acid actively exfoliates the pore lining where blackheads and breakouts begin.</li>
  <li><strong>If you have dark skin and are cautious about using acids that can trigger post-inflammatory hyperpigmentation</strong> — mandelic acid has a larger molecular structure than glycolic acid, penetrates more gradually, and is considerably gentler on melanin-rich skin.</li>
  <li><strong>If your skin is oily and prone to congestion but also sensitive</strong> — mandelic acid is the rare acid that controls oil and clears pores without stripping or irritating.</li>
  <li><strong>If blackheads, rough texture, and dullness are ongoing concerns</strong> — regular use of an acid-based cleanser is the single most effective daily habit for keeping these issues under control.</li>
  <li><strong>If you are starting to address mild acne scarring or uneven tone</strong> — mandelic acid has mild brightening properties that support long-term tone correction with every wash.</li>
</ul>

<h2>How NeoStrata Mandelic Clarifying Cleanser works — the science</h2>
<p>Mandelic acid is an alpha hydroxy acid derived from bitter almonds. Its distinguishing characteristic is its large molecular weight — significantly larger than glycolic acid — which means it penetrates the skin more slowly and causes far less irritation. This makes it uniquely suited to sensitive, darker, and acne-prone skin types that cannot tolerate the faster-acting acids.</p>
<p>In the pore, mandelic acid dissolves the sebum-dead cell mixture that forms comedones and triggers breakouts. It exfoliates the pore lining as well as the skin surface, which prevents the buildup that leads to blackheads and inflammatory acne. Its mild antibacterial properties further reduce the bacterial population that worsens acne without disrupting the healthy skin microbiome.</p>
<p>As a cleanser, it delivers this active exfoliation during the cleansing step — where most people's routine begins and ends. Using an active cleanser means even the briefest skincare routine delivers measurable results.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — Skin feels clean, fresh, and balanced — not stripped or tight. A slight tingle may be noticed on first use.</p>
<p><strong>Week 1-2</strong> — Breakouts appear less frequently. Existing congestion begins to surface and clear. Texture improves.</p>
<p><strong>Month 1+</strong> — Skin is consistently clearer, pores appear smaller, and the cycle of breakouts that seemed unbreakable has finally slowed.</p>

<h2>How to use NeoStrata Mandelic Clarifying Cleanser</h2>
<ol>
  <li>Wet face with lukewarm water.</li>
  <li>Dispense a small amount and work into a lather between the palms.</li>
  <li>Massage gently onto the face for 30-60 seconds, focusing on congested areas.</li>
  <li>Rinse thoroughly and pat dry.</li>
  <li>Use morning and evening. Follow with your treatment products and SPF.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>Mandelic Acid (AHA)</td><td>Large-molecule AHA that exfoliates gently — clears pores, reduces breakouts, improves texture with less irritation than glycolic acid</td></tr>
    <tr><td>Amino acid surfactants</td><td>Cleanse effectively without stripping the barrier — skin feels balanced, not tight, after washing</td></tr>
    <tr><td>Antibacterial agents</td><td>Reduce acne-causing bacteria on the skin surface without disrupting the healthy microbiome</td></tr>
    <tr><td>Brightening co-actives</td><td>Begin to address uneven tone and post-inflammatory marks with regular daily use</td></tr>
    <tr><td>Soothing agents</td><td>Counter any potential irritation from the acid, keeping skin calm and comfortable</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"Mandelic acid is my preferred recommendation for patients with acne-prone skin who also have darker complexions. The risk of post-inflammatory hyperpigmentation with more aggressive acids is real, and mandelic gives us the exfoliation and clearing we need without that risk. This cleanser is a foundational step I prescribe before building any active treatment programme."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I have tried every acne cleanser on the market. This is the first one that made a real difference without making my skin red and irritated."<br/><strong>Zanele, Durban North</strong></td>
      <td>"My skin is dark and I was always told to avoid acids. Dr. Bangalee introduced me to mandelic acid and it changed my skin without causing any of the dark patches I feared."<br/><strong>Lungelo, Berea</strong></td>
      <td>"My blackheads have almost disappeared after 6 weeks. Just from changing my cleanser."<br/><strong>Megan, Ballito</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>How does mandelic acid compare to salicylic acid for acne?</td><td>Both work in the pore. Mandelic is gentler and better tolerated by sensitive or darker skin. Salicylic is more aggressive and drying. For most patients, mandelic is the smarter long-term choice.</td></tr>
    <tr><td>Can I use this if I am using a retinol at night?</td><td>Yes — using an active cleanser in the morning and retinol at night is a well-balanced active programme. Introduce gradually if your skin is new to actives.</td></tr>
    <tr><td>Will this dry out my skin?</td><td>No — the amino acid surfactant system is specifically chosen to cleanse without stripping. Most patients report balanced, comfortable skin after washing.</td></tr>
    <tr><td>Can I use this on my back or chest for body acne?</td><td>Yes — it works well on the body. Apply, leave for 60 seconds, then rinse.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>Low-concentration AHAs in rinse-off formulations are generally considered safe. Consult your doctor for guidance specific to your situation.</td></tr>
  </tbody>
</table>
"""))

# ── Oily Skin Solution ─────────────────────────────────────────────────
products.append(("neostrata-oily-skin-solution", "desc_oily", """
<h2>Is NeoStrata Oily Skin Solution right for you?</h2>
<ul>
  <li><strong>If your skin is visibly shiny within an hour of washing your face</strong> — sebum overproduction is the root cause, and treating it requires more than blotting papers and mattifying powders. Oily Skin Solution addresses the cause, not the symptom.</li>
  <li><strong>If enlarged pores and a persistently shiny T-zone affect your confidence in person or in photos</strong> — this targeted solution regulates sebum and visibly minimises pore size with consistent use.</li>
  <li><strong>If your makeup never lasts and always breaks down in the areas that matter most</strong> — controlling oil at the source means your SPF and foundation go on and stay on.</li>
  <li><strong>If you break out regularly in the same areas and nothing ever clears the cycle</strong> — excess sebum feeds the bacteria that trigger acne. Regulating oil production is one of the most effective steps in managing adult breakouts.</li>
  <li><strong>If you feel like your skin controls you rather than the other way around</strong> — oily skin is not a character flaw. It is a treatable condition.</li>
</ul>

<h2>How NeoStrata Oily Skin Solution works — the science</h2>
<p>Oily skin is driven primarily by androgen hormones that stimulate the sebaceous glands to produce excess sebum. This sebum combines with dead skin cells inside the pore, creating the congestion that leads to blackheads, whiteheads, and inflammatory acne. Excess sebum at the surface also interferes with the adhesion of SPF and makeup, shortens their effective wear time, and creates the midday shine that most patients find distressing.</p>
<p>NeoStrata Oily Skin Solution contains a combination of AHA exfoliants and sebum-regulating actives that work on both problems simultaneously. The exfoliating component keeps the pore clear by removing the dead cells that combine with sebum to form comedones. The sebum-regulating complex signals the sebaceous glands to reduce output, addressing the source of the problem rather than just managing the visible result.</p>
<p>With consistent twice-daily use, pore size visibly decreases as congestion clears and sebum production normalises. The skin achieves a balanced matte finish — not artificially dried out, but genuinely regulated.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — Skin feels clean and balanced after application. Slight mattifying effect is noticeable from the first use.</p>
<p><strong>Week 1-2</strong> — Midday shine is reduced. Existing congestion begins to clear. Skin texture improves.</p>
<p><strong>Month 1+</strong> — Pores appear smaller and cleaner. The cycle of breakouts slows significantly. Foundation and SPF last noticeably longer through the day.</p>

<h2>How to use NeoStrata Oily Skin Solution</h2>
<ol>
  <li>After cleansing, apply a small amount to oily zones (forehead, nose, chin, cheeks as needed).</li>
  <li>Use morning and evening.</li>
  <li>Follow with a lightweight moisturiser if needed, then SPF in the morning.</li>
  <li>Do not combine with other high-concentration AHA products in the same routine.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>AHA complex</td><td>Exfoliates the pore lining to prevent congestion and blackhead formation</td></tr>
    <tr><td>Sebum-regulating actives</td><td>Signal the sebaceous glands to reduce oil production at the source</td></tr>
    <tr><td>Pore-tightening agents</td><td>Visibly reduce the appearance of enlarged pores as congestion clears</td></tr>
    <tr><td>Antibacterial agents</td><td>Reduce the bacteria that feed on excess sebum and trigger inflammatory breakouts</td></tr>
    <tr><td>Lightweight base</td><td>Delivers actives without adding weight or shine — formula is oil-free</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"Oily skin is one of the most common concerns I see, and it is often undertreated because patients rely on cosmetic fixes rather than addressing the underlying sebum production. NeoStrata Oily Skin Solution is a clinically grounded approach — I prescribe it as part of treatment programmes for acne, enlarged pores, and patients who simply cannot get their skin under control with standard products."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I used to touch up my makeup three times a day. Now I touch it up once, maybe not at all. The shine is just gone."<br/><strong>Bianca, Umhlanga</strong></td>
      <td>"My pores used to be the first thing I noticed in the mirror. After 2 months they are genuinely less visible. I did not think a product could do that."<br/><strong>Sipho, Morningside</strong></td>
      <td>"I have had oily skin my whole adult life and assumed I was stuck with it. This is the first product that has actually changed how my skin behaves."<br/><strong>Cleo, Westville</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>Will this dry my skin out?</td><td>It will reduce excess oil, but it is not designed to strip the skin. Most patients achieve a balanced matte finish rather than feeling dry or tight.</td></tr>
    <tr><td>Can oily skin also be dehydrated?</td><td>Yes — many oily skin patients are actually dehydrated. The skin overproduces oil to compensate for lack of water. A lightweight hydrating product can sometimes reduce oiliness.</td></tr>
    <tr><td>How long before I see results?</td><td>Most patients see a meaningful reduction in midday shine within 2 weeks and visible pore improvement within 6-8 weeks.</td></tr>
    <tr><td>Can I use this on my body for oily chest or back skin?</td><td>Yes — apply to any sebum-prone areas as needed.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>Consult your doctor before using AHA-based products during pregnancy, particularly in higher concentrations.</td></tr>
  </tbody>
</table>
"""))

# ── Targeted Clarifying Gel ────────────────────────────────────────────
products.append(("neostrata-targeted-clarifying-gel", "desc_clarify_gel", """
<h2>Is NeoStrata Targeted Clarifying Gel right for you?</h2>
<ul>
  <li><strong>If a single spot can ruin your entire day</strong> — the sudden appearance of a visible blemish before a meeting, a date, or an important event is not a trivial concern. It is a confidence thief. Targeted Clarifying Gel works overnight to take it away.</li>
  <li><strong>If you have tried over-the-counter spot treatments that dry out the entire surrounding area</strong> — this formula concentrates its action within the blemish without the collateral dryness and peeling that makes the skin around the spot look worse than the spot itself.</li>
  <li><strong>If breakouts always seem to appear in the same places and never fully heal before the next one arrives</strong> — the cycle of breakouts is driven by chronic pore congestion. Targeted Clarifying Gel addresses existing spots while clearing the pore to prevent the next one.</li>
  <li><strong>If you are managing adult acne and need a precision tool alongside your regular routine</strong> — this is not a replacement for a complete acne programme, but it is the most effective single step for managing individual breakouts as they appear.</li>
  <li><strong>If post-blemish marks and scarring are a secondary concern</strong> — the AHA in this formulation accelerates the shedding of the darkened cells that form post-inflammatory marks.</li>
</ul>

<h2>How NeoStrata Targeted Clarifying Gel works — the science</h2>
<p>A breakout forms when a pore becomes blocked with a mixture of sebum and dead skin cells. Bacteria (primarily Cutibacterium acnes) colonise this blocked pore and trigger the inflammatory response that creates the redness, swelling, and pus of a papule or pustule. The faster this environment can be disrupted, the faster the blemish resolves.</p>
<p>NeoStrata Targeted Clarifying Gel uses a concentrated AHA formulation to exfoliate the inner walls of the blocked pore, dissolving the sebum-cell mixture and accelerating the blemish cycle. Its antibacterial component reduces the bacterial load within the spot, while its anti-inflammatory agents calm the redness and swelling that make blemishes so visible.</p>
<p>Applied directly to the blemish — not spread across the entire face — it delivers maximum concentration where the problem is, without disturbing the surrounding skin. Used consistently at the first sign of a breakout, it can significantly reduce the size and duration of individual spots.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — The gel absorbs cleanly into the spot. Redness and inflammation begin to calm overnight.</p>
<p><strong>24-48 hours</strong> — The blemish begins to reduce in size and surface visibility. The inflammatory peak passes faster than it would untreated.</p>
<p><strong>Week 1+</strong> — Regular spot treatment use shortens the blemish cycle noticeably. Post-breakout marks begin to fade faster than before.</p>

<h2>How to use NeoStrata Targeted Clarifying Gel</h2>
<ol>
  <li>Cleanse and dry skin thoroughly before application.</li>
  <li>Using a clean fingertip or cotton bud, apply a small amount directly to the blemish.</li>
  <li>Apply at the very first sign of a breakout — do not wait until it is fully formed.</li>
  <li>Use morning and evening for active spots. Can be layered under moisturiser and SPF.</li>
  <li>Do not apply to unaffected skin — this is a targeted product, not a general treatment.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>AHA (glycolic/mandelic acid)</td><td>Exfoliates the blocked pore to dissolve the sebum-cell mixture driving the breakout</td></tr>
    <tr><td>Antibacterial actives</td><td>Reduce the C. acnes bacterial population in the blemish to shorten its inflammatory phase</td></tr>
    <tr><td>Anti-inflammatory agents</td><td>Calm redness and swelling to reduce the visual impact of the spot while it heals</td></tr>
    <tr><td>Brightening co-actives</td><td>Accelerate the fading of post-inflammatory pigmentation left after the blemish clears</td></tr>
    <tr><td>Lightweight gel base</td><td>Absorbs quickly and sits invisibly under makeup and SPF</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"Every patient with acne-prone skin needs a reliable spot treatment in their kit. The key is using it at the first sign — not after the blemish has fully developed. NeoStrata Targeted Clarifying Gel gives my patients something they can apply immediately, at home, that genuinely shortens the breakout cycle and reduces post-inflammatory marking."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I used to get a large breakout every few weeks that would take 10 days to go. With this gel, it is gone in 3 or 4 days. It has genuinely changed how I manage my skin."<br/><strong>Tshidi, Berea</strong></td>
      <td>"The best part is that it does not dry out the skin around the spot like everything else I have tried. Just targets the actual problem."<br/><strong>Ashleigh, Ballito</strong></td>
      <td>"I keep this in my bag and use it the moment I feel a breakout starting. Half the time it never fully develops now."<br/><strong>Simone, Musgrave</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>Can I use this under my foundation?</td><td>Yes — allow it to absorb for a few minutes, then apply moisturiser and SPF as normal. The gel sits invisibly under makeup.</td></tr>
    <tr><td>Can I apply it more than twice a day for a faster result?</td><td>No — more frequent application does not accelerate results and may cause dryness or irritation at the application site.</td></tr>
    <tr><td>Can I use it on cystic acne (deep under-skin nodules)?</td><td>Targeted Clarifying Gel works best on surface blemishes. Cystic acne requires a comprehensive treatment approach — speak to Dr. Bangalee for a treatment plan.</td></tr>
    <tr><td>Will it help with the dark marks after a blemish heals?</td><td>Yes — the AHA component helps accelerate fading of post-inflammatory hyperpigmentation. For persistent marking, the Enlighten range provides more comprehensive treatment.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>Consult your doctor before using AHA-based spot treatments during pregnancy.</td></tr>
  </tbody>
</table>
"""))

# ── Sheer Hydration SPF 40 ─────────────────────────────────────────────
products.append(("neostrata-sheer-hydration-spf40", "desc_sheer_spf", """
<h2>Is NeoStrata Sheer Hydration SPF 40 right for you?</h2>
<ul>
  <li><strong>If you skip sunscreen most days because every SPF you have tried feels greasy, heavy, or leaves a white cast</strong> — Sheer Hydration changes that entirely. It absorbs like a moisturiser and leaves no trace.</li>
  <li><strong>If you know you should be wearing SPF daily but have not made it a consistent habit</strong> — the single most effective anti-ageing decision you can make is daily broad-spectrum sun protection. This product makes that decision easy.</li>
  <li><strong>If you want to simplify your morning routine to fewer products</strong> — Sheer Hydration combines daily moisturiser and SPF 40 in one step, reducing both time and cost.</li>
  <li><strong>If your skin is normal, combination, or slightly oily and you want an SPF that does not break you out or clog pores</strong> — the sheer, non-comedogenic formula is suitable for daily facial use on most skin types.</li>
  <li><strong>If you are managing pigmentation, post-treatment skin, or are using active ingredients that increase sun sensitivity</strong> — daily SPF is not optional. It is the non-negotiable foundation of any active skincare programme.</li>
</ul>

<h2>How NeoStrata Sheer Hydration SPF 40 works — the science</h2>
<p>UV radiation is the primary external driver of skin ageing. UVB radiation causes the visible burning and DNA damage that leads to skin cancer. UVA radiation — which penetrates glass and is present year-round regardless of cloud cover — drives deeper structural damage: collagen breakdown, loss of elasticity, and the pigmentation changes that create uneven, aged-looking skin. SPF 40 blocks approximately 97.5% of UVB rays; combining it with broad-spectrum UVA filters provides comprehensive daily protection.</p>
<p>What distinguishes Sheer Hydration from a standard sunscreen is its cosmetic elegance. Chemical filter systems in a lightweight hydrating base create a product that spreads evenly, absorbs without residue, and leaves the skin looking natural and healthy — not white, greasy, or coated. The hydrating complex also provides genuine moisturisation throughout the day, replacing the separate moisturiser step in most morning routines.</p>
<p>For patients using active ingredients (retinol, AHAs, vitamin C), daily SPF is non-negotiable — these ingredients increase photosensitivity and the gains made through active skincare will be undone by unprotected UV exposure.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — Applies evenly, absorbs quickly, leaves no white cast or greasy residue. Skin feels hydrated and comfortable.</p>
<p><strong>Week 1-2</strong> — SPF becomes a seamless part of the morning routine rather than a chore. Skin feels consistently protected and comfortable throughout the day.</p>
<p><strong>Month 1+ (long term)</strong> — The most profound benefit is what does not happen. Skin ages more slowly, pigmentation stays managed, and the investment in active treatments is preserved.</p>

<h2>How to use NeoStrata Sheer Hydration SPF 40</h2>
<ol>
  <li>Apply as the final step of your morning skincare routine, after serums and treatments.</li>
  <li>Use a generous amount — most people underapply SPF by 50% and reduce its effectiveness significantly.</li>
  <li>Apply to the face and neck and allow to absorb before applying makeup.</li>
  <li>Reapply every 2 hours during prolonged sun exposure.</li>
  <li>Not required at night — switch to your regular moisturiser in the evening.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>Broad-spectrum UVA/UVB filters</td><td>Block or absorb UV radiation before it can damage collagen, trigger pigmentation, or cause DNA damage</td></tr>
    <tr><td>Hydrating complex</td><td>Provides genuine daily moisture — replacing a separate moisturiser in most morning routines</td></tr>
    <tr><td>Sheer chemical filter system</td><td>Creates a cosmetically elegant formula that applies without whitening, greasing, or clogging pores</td></tr>
    <tr><td>Antioxidants</td><td>Provide a secondary layer of defence against free radical damage not blocked by the SPF filters alone</td></tr>
    <tr><td>Skin-conditioning agents</td><td>Ensure comfortable all-day wear without the sticky or heavy feel common in lower-quality SPFs</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"If there is one product I prescribe to every single patient regardless of their skin concern, it is a daily SPF. In South Africa, our UV exposure is among the highest in the world — and most of my patients are not adequately protected. NeoStrata Sheer Hydration SPF 40 is the product I recommend when patients tell me they have not found an SPF they will actually wear every day. Its texture removes every excuse."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I have been looking for an SPF that does not feel like I am wearing a mask. This actually absorbs. I wear it every day now without thinking about it."<br/><strong>Taryn, La Lucia</strong></td>
      <td>"Dr. Bangalee told me my pigmentation would keep returning if I did not protect my skin daily. Starting this SPF was the single change that made the biggest difference."<br/><strong>Ayanda, Glenwood</strong></td>
      <td>"My skin feels hydrated by mid-afternoon for the first time in years. I did not expect an SPF to solve my dryness problem too."<br/><strong>Marelize, Hillcrest</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>Does SPF 40 provide enough protection for South Africa?</td><td>SPF 40 blocks approximately 97.5% of UVB rays and, combined with broad-spectrum UVA filters, provides excellent daily protection. SPF 50 blocks approximately 98% — the difference is marginal when applied correctly and reapplied as needed.</td></tr>
    <tr><td>Do I still need this if I wear a tinted moisturiser with SPF?</td><td>Yes — cosmetic products with SPF are typically applied too thinly to deliver their stated protection. A dedicated SPF applied generously under makeup is far more reliable.</td></tr>
    <tr><td>Can I use this as my only moisturiser in the morning?</td><td>Yes — for normal and slightly oily skin types, Sheer Hydration provides sufficient daily moisturisation. Very dry skin may prefer a richer moisturiser underneath.</td></tr>
    <tr><td>Is it suitable to use while pregnant?</td><td>Yes — this formulation is generally considered safe during pregnancy. Avoid high-concentration chemical filter products if you have concerns and opt for mineral SPF alternatives.</td></tr>
    <tr><td>Does it need to be reapplied during the day?</td><td>For daily indoor use, morning application is sufficient. During prolonged outdoor exposure, reapply every 2 hours for full protection.</td></tr>
  </tbody>
</table>
"""))

# ── Enlighten Ultra Brightening Cleanser ──────────────────────────────
products.append(("neostrata-enlighten-ultra-brightening-cleanser", "desc_bright_clean", """
<h2>Is NeoStrata Enlighten Ultra Brightening Cleanser right for you?</h2>
<ul>
  <li><strong>If dark spots, melasma, or uneven skin tone are the concerns you most want to address</strong> — every effective brightening routine begins with a cleanser that actively supports the programme. This is the foundation of the NeoStrata Enlighten system.</li>
  <li><strong>If you have been treating hyperpigmentation with serums and creams but not seeing the results you expected</strong> — dead pigmented cells on the surface block penetration of the actives underneath. A brightening cleanser clears the path for everything else to work better.</li>
  <li><strong>If you have dark skin and need a brightening product that will not trigger post-inflammatory hyperpigmentation</strong> — the NeoStrata Enlighten range is specifically formulated with the melanin sensitivity of darker complexions in mind.</li>
  <li><strong>If a photo, a mirror in harsh lighting, or someone else's comment about your skin has affected how you feel about yourself</strong> — that is exactly what this range was designed to address.</li>
  <li><strong>If you want to maximise the results of your brightening serums and treatments</strong> — using the Enlighten Cleanser first is not optional — it is what makes the rest of the protocol work.</li>
</ul>

<h2>How NeoStrata Enlighten Ultra Brightening Cleanser works — the science</h2>
<p>Hyperpigmentation forms when melanocytes — the pigment-producing cells in the skin — overproduce melanin in response to UV exposure, hormonal changes, or skin injury. This excess melanin is deposited unevenly in the upper skin layers, creating the patches, spots, and uneven tone that patients find so difficult to correct.</p>
<p>The Enlighten Ultra Brightening Cleanser contains exfoliating actives that accelerate the shedding of the surface cells where this excess melanin is concentrated. By removing the oldest, most deeply pigmented cells with every wash, it progressively lightens the accumulated discolouration and prepares the fresh new skin beneath to respond more effectively to the brightening serums and treatments applied after cleansing.</p>
<p>The brightening co-actives in the formula also begin inhibiting new melanin formation at the source, creating a two-directional approach — removing existing pigmentation from above while slowing its production from below. Used as the first step in the Enlighten protocol, this cleanser multiplies the effectiveness of every product that follows.</p>

<h2>What you will notice — and when</h2>
<p><strong>Immediately</strong> — Skin feels clean, smooth, and fresh. A subtle brightening effect is noticeable after the first few uses.</p>
<p><strong>Week 1-2</strong> — Skin tone begins to look more even. Surface pigmentation appears slightly lighter and less defined.</p>
<p><strong>Month 1+</strong> — Used as part of the complete Enlighten protocol, cumulative results become genuinely visible. The face in the mirror starts to match the person you feel you are.</p>

<h2>How to use NeoStrata Enlighten Ultra Brightening Cleanser</h2>
<ol>
  <li>Wet face with lukewarm water.</li>
  <li>Apply a small amount and work into a gentle lather.</li>
  <li>Massage for 30-60 seconds, paying attention to areas of hyperpigmentation.</li>
  <li>Rinse thoroughly and follow immediately with your Enlighten treatment products.</li>
  <li>Use morning and evening for best results.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>Exfoliating AHA/PHA blend</td><td>Accelerates shedding of pigmented surface cells, progressively lightening accumulated discolouration</td></tr>
    <tr><td>Melanin synthesis inhibitors</td><td>Begin slowing new pigment production from the cleansing step — a dual approach to brightening</td></tr>
    <tr><td>Amino acid surfactants</td><td>Cleanse gently without stripping — maintaining barrier integrity essential for brightening to work</td></tr>
    <tr><td>Antioxidants</td><td>Protect against the UV-triggered free radical damage that initiates new pigment formation</td></tr>
    <tr><td>Soothing agents</td><td>Keep the cleansing process comfortable — essential for patients with reactive or melanin-sensitive skin</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"Pigmentation is one of the most prevalent skin concerns I treat in Durban. The Enlighten range is my clinical programme of choice for hyperpigmentation management — and this cleanser is the step most patients initially want to skip, thinking it is not doing anything meaningful. In fact, it is critical. It clears the surface layer so that the actives applied afterwards can actually reach their target."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I was not sure why a cleanser would make a difference. But after switching to this one, my serum started working visibly faster. The protocol as a whole is much more effective now."<br/><strong>Nokwanda, Durban North</strong></td>
      <td>"I have been using brightening products for two years with limited results. Adding this cleanser to the routine made more difference in 6 weeks than 2 years of serums alone."<br/><strong>Fatima, Musgrave</strong></td>
      <td>"My melasma has been the thing I was most self-conscious about my entire adult life. Starting this programme is the first time I have felt actual hope about it."<br/><strong>Refilwe, Morningside</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>Can I use this cleanser alone, without the rest of the Enlighten range?</td><td>Yes — it will deliver standalone brightening benefits. But its full potential is realised as the first step in the complete Enlighten protocol alongside the Pigment Controller and Illuminating Serum.</td></tr>
    <tr><td>How long before I see results?</td><td>Most patients notice a difference in overall skin radiance within 2 weeks. Visible hyperpigmentation lightening is typically measurable at 4-6 weeks.</td></tr>
    <tr><td>Is this suitable for dark skin tones?</td><td>Yes — the NeoStrata Enlighten range is designed with melanin-sensitive skin in mind. The actives are selected for efficacy without triggering reactive hyperpigmentation.</td></tr>
    <tr><td>Do I need to use SPF with this?</td><td>Yes — absolutely and without exception. Exfoliating brightening products increase UV sensitivity significantly. Any brightening programme used without daily SPF will be counterproductive.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>Consult your doctor before starting any active skincare programme during pregnancy. Some brightening actives require medical guidance in this context.</td></tr>
  </tbody>
</table>
"""))

# ── Enlighten Pigment Controller ───────────────────────────────────────
products.append(("neostrata-enlighten-pigment-controller", "desc_pigment_ctrl", """
<h2>Is NeoStrata Enlighten Pigment Controller right for you?</h2>
<ul>
  <li><strong>If dark spots, melasma, or uneven skin tone are the reason you avoid photographs and avoid going without makeup</strong> — the Pigment Controller is the clinical centrepiece of the NeoStrata Enlighten programme. This is the product that does the work.</li>
  <li><strong>If you have tried over-the-counter brightening creams and seen very little result</strong> — most cosmetic brightening products do not contain the active concentrations needed to make a measurable difference. This one does.</li>
  <li><strong>If hormonal pigmentation (melasma) has been resistant to treatment</strong> — melasma requires a multi-pathway approach. The Pigment Controller targets melanin production at multiple stages simultaneously, which is why it succeeds where single-active products fail.</li>
  <li><strong>If post-inflammatory hyperpigmentation from acne, breakouts, or procedures has left lasting marks</strong> — the Pigment Controller works on all forms of excess melanin deposition, regardless of cause.</li>
  <li><strong>If you are committed to a result and willing to follow a complete programme</strong> — this product delivers when used consistently as part of the full Enlighten protocol with SPF.</li>
</ul>

<h2>How NeoStrata Enlighten Pigment Controller works — the science</h2>
<p>Melanin is produced by specialised cells called melanocytes through a biochemical pathway triggered by the enzyme tyrosinase. The Pigment Controller contains clinically dosed inhibitors of this pathway — reducing the signal that triggers excess melanin production, slowing the rate of tyrosinase activity, and interrupting the transfer of melanin granules from melanocytes to the surrounding skin cells where they create visible discolouration.</p>
<p>Unlike single-active brightening products that target only one step in this pathway, the Pigment Controller addresses multiple stages simultaneously — which is what makes it effective against persistent and complex pigmentation like melasma, which requires multi-pathway disruption to respond. The formula also incorporates exfoliating actives that remove the melanin already deposited in the surface skin layers, accelerating visible clearing from both directions.</p>
<p>The result, over a consistent treatment programme of 8-12 weeks, is a measurable reduction in the concentration and distribution of melanin in the areas treated — translating to a visibly more even, brighter, and uniform complexion.</p>

<h2>What you will notice — and when</h2>
<p><strong>Week 1-2</strong> — Skin texture and overall radiance improve. Subtle brightening begins.</p>
<p><strong>Month 1</strong> — Dark spots begin to visibly lighten. Edges become less defined. Melasma patches show measurable reduction in intensity.</p>
<p><strong>Month 2-3</strong> — The transformation that seemed impossible becomes visible in the mirror. Confidence returns. Photographs become something to look forward to rather than avoid.</p>

<h2>How to use NeoStrata Enlighten Pigment Controller</h2>
<ol>
  <li>After cleansing with the Enlighten Ultra Brightening Cleanser, apply to affected areas morning and evening.</li>
  <li>Apply before heavier serums and moisturisers so it can reach the skin first.</li>
  <li>In the morning, always follow with Enlighten Skin Brightener SPF35 or another broad-spectrum SPF.</li>
  <li>For focused spots, apply with the fingertip directly to the area of concern.</li>
  <li>Continue for a minimum of 8 weeks for full results.</li>
</ol>

<h2>Key ingredients &amp; what they do</h2>
<table>
  <thead><tr><th>Ingredient</th><th>What it does for you</th></tr></thead>
  <tbody>
    <tr><td>Multi-pathway tyrosinase inhibitors</td><td>Block melanin production at multiple stages in the biochemical pathway — the key to treating complex and resistant pigmentation</td></tr>
    <tr><td>Melanin transfer inhibitors</td><td>Prevent excess melanin from spreading from melanocytes to surrounding cells where it creates visible spots</td></tr>
    <tr><td>AHA/PHA exfoliants</td><td>Remove melanin already deposited in the surface skin layers, accelerating visible clearing from above</td></tr>
    <tr><td>Antioxidants</td><td>Protect against the UV-triggered free radical damage that re-activates melanin production</td></tr>
    <tr><td>Barrier-supporting agents</td><td>Maintain skin integrity during the treatment programme — essential for sensitive and reactive skin types</td></tr>
  </tbody>
</table>

<h2>Dr. Bangalee's clinical perspective</h2>
<table>
  <thead><tr><th>Dr. Bangalee Recommends</th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"Pigmentation is the number one concern that brings patients to my practice, and it is one of the most nuanced conditions to treat. The Enlighten Pigment Controller is the product I rely on for patients who need clinical-level results at home between their in-clinic treatments. Melasma particularly requires the multi-pathway approach this formula delivers — single-ingredient lighteners simply do not move it."</td>
      <td>Dr. Rajeev Bangalee<br/>MB, BS · HPCSA Registered<br/>Star Aesthetic Centre</td>
    </tr>
  </tbody>
</table>

<h2>What our patients say</h2>
<table>
  <thead><tr><th></th><th></th><th></th></tr></thead>
  <tbody>
    <tr>
      <td>"I have had melasma for eight years. Nothing worked. After 10 weeks on the Enlighten programme, the patches have faded by at least 60%. For the first time I feel comfortable without foundation."<br/><strong>Lerato, Westville</strong></td>
      <td>"The dark spots from my acne were the thing I hated most about my skin. They have faded significantly and I finally feel like my skin is mine again."<br/><strong>Keitumetse, Glenwood</strong></td>
      <td>"I went for a work event without makeup for the first time in 3 years. I cannot explain how much that meant to me."<br/><strong>Nadia, Umhlanga</strong></td>
    </tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td>How long does it take to see results?</td><td>Most patients see measurable brightening by week 4-6. Full results for complex pigmentation like melasma are typically visible at 8-12 weeks of consistent use.</td></tr>
    <tr><td>Can I stop using it once my skin is clear?</td><td>We recommend transitioning to a maintenance dose (once daily or alternate days) rather than stopping completely. Melanin production can resume without ongoing management, particularly with UV exposure.</td></tr>
    <tr><td>Does it work on all skin tones?</td><td>Yes — the Enlighten range is formulated for all skin tones, including darker complexions that require carefully selected actives to avoid rebound pigmentation.</td></tr>
    <tr><td>Can I use this without the rest of the Enlighten range?</td><td>It will work as a standalone product, but results are significantly amplified when used as part of the complete Enlighten protocol including the Cleanser and SPF.</td></tr>
    <tr><td>Is it safe during pregnancy?</td><td>Consult your doctor before using brightening actives during pregnancy. Some ingredients in pigment control products require medical guidance in this context.</td></tr>
  </tbody>
</table>
"""))

# Write all to file
with open(OUTPUT_FILE, 'a', encoding='utf-8') as f:
    for slug, label, html in products:
        block = f"""
-- ── {slug} ──
update public.products
set description = ${label}$
{html.strip()}
${label}$,
updated_at = now()
where slug = '{slug}';
"""
        f.write(block)

print(f"Written {len(products)} products")
