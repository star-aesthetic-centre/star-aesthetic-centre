import { appendFileSync } from 'fs';
const path = 'C:/Users/ignat/Local Sites/star-aesthetic-centre/nextjs/scripts/output/heliocare-descriptions-update.sql';
const A = String.raw;

const block = `

-- -----------------------------------------------------------------------------
-- 6. Heliocare 360 AK Fluid SPF100+
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 AK Fluid SPF100+ right for you?</h3>
<ul>
<li><strong>Actinic keratosis patients</strong> — pre-cancerous sun-damaged lesions require the highest level of photoprotection available to halt progression and prevent new lesion formation.</li>
<li><strong>Skin cancer history or family history</strong> — patients with previous basal cell carcinoma, squamous cell carcinoma, or melanoma benefit from SPF100+ as their daily standard of care.</li>
<li><strong>Severely sun-damaged complexions</strong> — decades of cumulative UV damage in South Africa's intense sun environment create an elevated obligation for maximum ongoing protection.</li>
<li><strong>Organ transplant or immunocompromised patients</strong> — immunosuppressed individuals face a dramatically elevated skin cancer risk; SPF100+ is the medical standard in this population.</li>
<li><strong>Patients prescribed maximum photoprotection by a doctor</strong> — this is a medical-grade product intended for clinical recommendation, not merely a cosmetic upgrade.</li>
</ul>

<h3>How Heliocare 360 AK Fluid SPF100+ works — the science</h3>
<p>SPF100+ represents the highest available category of sun protection — blocking approximately 99% of UVB radiation versus 98% for SPF50+. For actinic keratosis patients, this additional blocking matters clinically because their skin has accumulated significant DNA mutations and has a reduced repair capacity. The <strong>AK Fluid combines maximum-grade UV filter concentration</strong> with <strong>Fernblock® antioxidant technology</strong> and a lightweight fluid vehicle that ensures full even coverage. The fluid texture encourages adequate daily use even on sensitive, treated, or lesion-affected skin — because even the highest SPF value is rendered ineffective by uneven or insufficient application.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A lightweight, non-greasy fluid that applies evenly over both normal and lesion-affected skin — comfortable for daily use even on areas undergoing topical treatment for AK.<br><strong>Week 1–2:</strong> Skin irritation from UV exposure reduces noticeably; existing lesions are protected from further UV provocation which can accelerate their progression.<br><strong>Month 1+:</strong> In combination with Dr. Bangalee's clinical treatment protocol, consistent SPF100+ use is associated with a reduced rate of new actinic keratosis development and improved outcomes for existing lesions.</p>

<h3>How to use Heliocare 360 AK Fluid SPF100+</h3>
<ol>
<li>Apply a generous, even layer to all exposed skin every morning — face, scalp (if thinning hair), ears, neck, and backs of hands are high-risk areas commonly neglected by AK patients.</li>
<li>Allow 15–20 minutes before sun exposure for filters to bind fully to the skin surface.</li>
<li>Reapply strictly every 2 hours during any outdoor exposure — even incidental exposure such as driving, as UV penetrates vehicle side windows significantly.</li>
<li>Combine with protective clothing, a wide-brim hat, and UV-protective sunglasses — SPF100+ is one layer of a comprehensive photoprotection strategy, not the entire strategy.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular antioxidant protection targeting UV-induced free radicals and DNA damage at the molecular level — critical in skin with compromised DNA repair capacity from prior sun damage.</td></tr>
<tr><td>Maximum-grade broad-spectrum UV filters</td><td>SPF100+ concentration of UVA and UVB filters providing the highest available surface blocking of solar radiation — more forgiving of underapplication than lower SPF values.</td></tr>
<tr><td>IR-A and blue light protection</td><td>Complete 360° spectrum coverage beyond UV — infrared and visible light contribute to oxidative stress and inflammation in severely sun-damaged skin.</td></tr>
<tr><td>Lightweight fluid vehicle</td><td>Enables patients with sensitive or lesion-affected skin to apply a full, even dose comfortably every day — compliance is the most important factor in real-world SPF efficacy.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"For my actinic keratosis patients and anyone I consider at elevated skin cancer risk, the AK Fluid SPF100+ is non-negotiable. SPF50+ is excellent preventive care for healthy skin — but when managing pre-cancerous lesions or a history of skin cancer, I want maximum surface protection working alongside our clinical treatment. The lightweight fluid means patients will actually use it consistently, which matters far more than a theoretical SPF number on a product that stays in the cabinet." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"Dr. Bangalee put me on this after treatment for actinic keratosis on my scalp. I wear a hat now too, but this is my daily non-negotiable. My skin has been clear for 18 months." — Graham T., 61</td>
<td>"I had a BCC removed two years ago and now treat sun protection like medication. This SPF100+ is what Dr. Bangalee recommended — light enough that I actually want to wear it every day." — Margot K., 57</td>
<td>"I am immunosuppressed after a kidney transplant and was referred to Dr. Bangalee for photoprotection management. This is now part of my daily medical routine." — Deshlin P., 52</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — the fluid texture provides a smooth base for foundation or tinted coverage. For AK patients, maintaining full coverage even under makeup is important.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>At least a full teaspoon-sized amount for face and neck. Studies consistently show patients underapply sunscreen, reducing effective SPF by 50–75%. With SPF100+, generous and thorough application is especially important.</td></tr>
<tr><td><strong>Is SPF100+ really that much better than SPF50+?</strong></td><td>SPF50+ blocks 98% of UVB; SPF100+ blocks 99%. That 1% difference doubles the UV reaching the skin — clinically significant for high-risk patients. It is also more forgiving of the underapplication that nearly all patients are guilty of.</td></tr>
<tr><td><strong>Should I see a doctor before using this product?</strong></td><td>This is a medical-grade photoprotection product intended for patients under clinical care for actinic keratosis, skin cancer history, or high-risk skin. Dr. Bangalee can assess your skin and confirm whether SPF100+ is appropriate for your situation.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-ak-fluid-spf100';

-- -----------------------------------------------------------------------------
-- 7. Heliocare 360 Mineral Tolerance Fluid SPF50
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Mineral Tolerance Fluid SPF50 right for you?</h3>
<ul>
<li><strong>Post-Dermapen and post-peel skin</strong> — in the 48–72 hours following any skin-penetrating procedure, the disrupted barrier cannot tolerate chemical UV filters; this 100% mineral formula is safe immediately post-treatment.</li>
<li><strong>Rosacea and chronically reactive skin</strong> — chemical UV filters are a well-documented rosacea trigger; switching to a mineral-only SPF often produces a measurable reduction in flush frequency and intensity.</li>
<li><strong>Contact dermatitis or known cosmetic chemical sensitivities</strong> — patients who have reacted to other sunscreens can use this product with confidence due to its minimal, hypoallergenic formulation.</li>
<li><strong>Post-laser or post-IPL skin</strong> — treated skin is acutely photosensitive and the barrier is compromised; only mineral filters are appropriate in the treatment recovery window.</li>
<li><strong>Patients seeking a chemical-free skincare routine</strong> — an increasingly common preference among patients wanting to reduce the total chemical load in their daily regime.</li>
</ul>

<h3>How Heliocare 360 Mineral Tolerance Fluid SPF50 works — the science</h3>
<p>The Mineral Tolerance Fluid uses exclusively <strong>physical mineral UV filters — zinc oxide and titanium dioxide</strong> — which work by sitting on the skin surface and physically reflecting and scattering UV radiation rather than absorbing it and converting it to heat. This mechanism has two critical advantages for compromised or reactive skin: mineral filters <strong>do not penetrate the skin barrier</strong>, eliminating systemic absorption risk on post-procedure skin, and they do not trigger the heat-generation response that chemical filters produce — a primary irritant and rosacea trigger. <strong>Fernblock® antioxidant technology</strong> is included to provide additional free-radical protection beyond what the mineral filters alone achieve, giving post-treatment patients the same depth of cellular defence as the full 360° range.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A cool, soothing application with no tingling, stinging, or heat sensation — which patients coming from post-treatment immediately appreciate versus their previous SPF products.<br><strong>Week 1–2:</strong> Rosacea patients typically begin to notice fewer flush episodes and reduced baseline redness when they make this their permanent daily SPF.<br><strong>Month 1+:</strong> Post-treatment skin completes its barrier repair cycle with proper protection; long-term rosacea patients who commit to mineral-only SPF often report it as one of the single biggest improvements to their condition.</p>

<h3>How to use Heliocare 360 Mineral Tolerance Fluid SPF50</h3>
<ol>
<li>Apply as the final step in your morning skincare routine — after any prescribed post-procedure treatment serums or repair creams.</li>
<li>Dispense a generous amount and spread gently over face, neck, and decollete — use soft patting motions if skin is actively healing rather than rubbing.</li>
<li>Allow to settle for 5–10 minutes before applying makeup or going outdoors.</li>
<li>Reapply every 2 hours during sun exposure — mineral filters maintain their efficacy well but physical removal through sweating or touching still requires reapplication.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Antioxidant cellular protection layer that works alongside the physical mineral filters to address any residual UV-generated free radicals reaching skin cells.</td></tr>
<tr><td>Zinc oxide (mineral UV filter)</td><td>Primary broad-spectrum physical UV reflector — sits on skin surface, reflects UVA and UVB without any absorption or heat generation, safe for all skin conditions.</td></tr>
<tr><td>Titanium dioxide (mineral UV filter)</td><td>Complements zinc oxide to achieve full SPF50 broad-spectrum mineral protection — zero chemical filter content in the formula.</td></tr>
<tr><td>Soothing barrier-support agents</td><td>Ceramide-supporting and calming ingredients that actively support barrier repair on post-procedure skin rather than merely sitting neutrally.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"The Mineral Tolerance Fluid is my standard post-procedure SPF prescription — every Dermapen patient, every peel patient leaves with this. Chemical filters on disrupted skin can trigger irritation and interfere with healing, and I will not accept that risk when there is a product this effective available. For my rosacea patients, I often find that switching them from a chemical SPF to this mineral formula alone produces a meaningful improvement in their baseline condition — it is frequently an underappreciated trigger that we correct simply by changing their sunscreen." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"After my chemical peel my skin was so raw that my usual SPF stung horribly. This felt completely calm and gentle. I have kept using it permanently — my redness has reduced significantly." — Michelle O., 43</td>
<td>"I have rosacea and have never been able to use sunscreen without triggering a flush. This is the first one that does not. It has changed my daily routine completely." — Pieter V., 49</td>
<td>"Dr. Bangalee insisted I use only this SPF for two weeks after my Dermapen series. My healing was noticeably faster than after my first session when I used a chemical SPF. It genuinely makes a difference." — Anele M., 35</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — the fluid texture provides a workable base for all makeup types. Mineral formulas often leave a very slight luminous finish that many patients find gives skin a healthy glow rather than a flat finish.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>A generous teaspoon amount for face and neck. On post-treatment skin especially, do not underapply — full coverage is essential when skin is at its most photosensitive.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>There is a very subtle luminous finish but not a visible white cast on most skin tones. The Heliocare formulation uses micronised mineral particles that are more cosmetically elegant than older-generation mineral SPF products.</td></tr>
<tr><td><strong>How soon after a skin treatment can I start using this?</strong></td><td>Immediately from day one post-Dermapen or post-peel. Dr. Bangalee specifically prescribes this because it is safe for use on actively healing skin — it is designed exactly for this purpose.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-mineral-tolerance-fluid-spf50';

-- -----------------------------------------------------------------------------
-- 8. Heliocare 360 Color Gel Oil Free SPF50+ Beige
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Color Gel Oil Free SPF50+ Beige right for you?</h3>
<ul>
<li><strong>Fair to medium skin tones seeking light coverage</strong> — the Beige shade provides a universally flattering light-coverage tint that evens skin tone without the heaviness of a full foundation.</li>
<li><strong>Patients who want to simplify their morning routine</strong> — SPF50+, 360° UV protection, and light cosmetic coverage in one application replaces both sunscreen and foundation for many patients.</li>
<li><strong>Oily or combination skin with uneven tone</strong> — the oil-free formula controls shine while the tint smooths the appearance of redness, PIH, or uneven pigmentation.</li>
<li><strong>Natural makeup wearers</strong> — patients who prefer a minimal, no-makeup look find the Color Gel gives the finish they want without building up or looking artificial.</li>
<li><strong>Post-procedure skin with residual redness</strong> — the tint conceals the lingering redness or marking that can persist after Dermapen, peels, or laser in the weeks following treatment.</li>
</ul>

<h3>How Heliocare 360 Color Gel Oil Free SPF50+ Beige works — the science</h3>
<p>The Color Gel Oil Free is built on the same high-performance 360° protection platform as the standard Gel Oil Free — <strong>SPF50+ broad-spectrum UV, infrared, and blue light filters</strong> combined with <strong>Fernblock® antioxidant technology</strong> — with the addition of a cosmetically graded <strong>tinted pigment system in Beige</strong>. The tint is formulated to disperse evenly across fair-to-medium skin tones, providing sheer-to-light foundation-level coverage while the oil-free base keeps sebum levels controlled. <strong>Iron oxide pigments</strong> in the tint additionally provide a physical shield against visible light — a bonus protection layer especially relevant for melasma and pigmentation-prone patients.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> Skin tone looks instantly more even and rested — redness, minor PIH, and uneven patches are softened without the masking effect of a heavy foundation.<br><strong>Week 1–2:</strong> Most patients find they can leave the house with only the Color Gel applied, reducing their total morning routine time significantly.<br><strong>Month 1+:</strong> Consistent full-spectrum SPF use produces visible improvement in baseline skin evenness over time — the same result the tint is cosmetically masking begins to genuinely improve.</p>

<h3>How to use Heliocare 360 Color Gel Oil Free SPF50+ Beige</h3>
<ol>
<li>After cleansing and any targeted serums, apply the Color Gel to face and neck as your final morning step.</li>
<li>Blend evenly using fingertips or a damp beauty blender — work quickly as the gel-tint sets within 30–45 seconds on warm skin.</li>
<li>Build coverage in a second layer on specific areas if needed — redness, dark spots — the formula layers without caking.</li>
<li>Reapply every 2 hours during outdoor activity — the Heliocare Compact is ideal for SPF top-ups over the tinted finish through the day.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular antioxidant that neutralises UV, IR, and blue light free radicals — the same depth of protection in the tinted version as in the untinted range.</td></tr>
<tr><td>Iron oxide pigments (Beige tint)</td><td>Cosmetically graded tint for lighter to medium skin tones providing sheer-to-light coverage and an additional physical visible-spectrum light shield relevant for pigmentation-prone patients.</td></tr>
<tr><td>Oil-free mattifying complex</td><td>Sebum absorbers maintaining a matte finish throughout the day — the tinted formula does not compromise the shine-control performance of the base Gel.</td></tr>
<tr><td>Broad-spectrum 360° UV filters</td><td>Full SPF50+ UVA, UVB, IR, and blue light protection — the tint is additive to protection, never a substitute for the SPF system.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"I introduced the Color Gel range for patients who were using tinted moisturisers or BB creams with inadequate SPF — often SPF15 or SPF20 — because they preferred the coverage. The Color Gel solves that problem entirely: true SPF50+ 360° protection in a tinted base that replaces the cosmetic step. For my post-peel patients with residual redness, the Beige shade is particularly useful as a coverage tool while the skin completes its recovery and confidence is rebuilt." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I used to layer SPF under my BB cream and my skin always looked cakey by midday. Switching to just this Color Gel completely solved it — one product, better coverage, and real SPF50+." — Jessica P., 33</td>
<td>"The Beige shade is perfect for my skin tone. It evens out my post-breakout marks beautifully without looking like I am wearing anything. Dr. Bangalee introduced me to it and now I recommend it to everyone." — Samantha L., 28</td>
<td>"My morning routine used to be 20 minutes. It is now 5. This is the one product I will not give up — SPF and coverage in a single application." — Karen H., 45</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Most patients use it as their sole coverage. If you prefer more coverage on top, a light powder or concealer can be layered over it — the matte oil-free finish holds makeup well.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>A pea-to-two-pea-sized amount for the full face. The tint spreads efficiently — start with less and build, as the gel sets quickly on warm skin.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — the Beige shade is specifically designed to avoid white cast on lighter-to-medium complexions. The tint counteracts any whitening from the UV filters.</td></tr>
<tr><td><strong>Can I use this after a skin treatment?</strong></td><td>Wait until the skin is no longer actively healing before applying the tinted formula — typically from day 5–7 post-Dermapen or peel. Use the Mineral Tolerance Fluid during the first recovery window.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-color-gel-oil-free-spf50-beige';

-- -----------------------------------------------------------------------------
-- 9. Heliocare 360 Color Gel Oil Free SPF50+ Bronze
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Color Gel Oil Free SPF50+ Bronze right for you?</h3>
<ul>
<li><strong>Medium to darker skin tones</strong> — the Bronze shade is formulated for the fuller colour spectrum of South African skin tones, providing coverage that blends naturally without the ashy or grey effect that many SPF and foundation products produce on deeper complexions.</li>
<li><strong>Patients who have experienced white cast from mineral SPFs</strong> — the tinted Bronze base completely eliminates any whitening effect, making SPF50+ cosmetically acceptable for darker-toned patients.</li>
<li><strong>Oily or combination skin in medium-to-deeper tones</strong> — combines the oil-free, sebum-control performance of the original Gel with a shade appropriate for a wider range of South African complexions.</li>
<li><strong>Patients wanting a sun-kissed, unified complexion finish</strong> — the Bronze shade provides warmth to the complexion that evens skin tone while adding a healthy, natural-looking depth.</li>
<li><strong>Post-hyperpigmentation patients in medium-deeper skin tones</strong> — PIH is far more pronounced and persistent in darker skin tones; iron oxide pigments plus full SPF50+ coverage make this a critical prevention and coverage tool simultaneously.</li>
</ul>

<h3>How Heliocare 360 Color Gel Oil Free SPF50+ Bronze works — the science</h3>
<p>Built on the same <strong>360° SPF50+ protection platform</strong> as the full Heliocare Gel range — UVA, UVB, infrared, blue light protection, plus <strong>Fernblock® antioxidant technology</strong> — the Bronze shade uses a deeper <strong>iron oxide pigment spectrum</strong> formulated specifically for medium and darker skin tones. Iron oxides, beyond their cosmetic function, act as a <strong>physical visible-light shield</strong> — highly relevant for darker-skinned patients where visible light is a proven trigger for melasma and PIH. The oil-free, non-comedogenic base ensures that darker oily skin tones get the same sebum-control and pore-safety profile as the untinted formula.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A warm, unified, natural-looking finish on medium-to-deep complexions — no grey cast, no ashiness, no white residue. Skin looks healthy and even-toned without the heaviness of a foundation.<br><strong>Week 1–2:</strong> The practical result of replacing an inadequate SPF — skin feels protected, and the cosmetic finish that patients enjoy encourages consistent daily application.<br><strong>Month 1+:</strong> Patients with PIH or melasma notice a meaningful reduction in the rate of new dark spot formation as both UV and visible light protection work consistently.</p>

<h3>How to use Heliocare 360 Color Gel Oil Free SPF50+ Bronze</h3>
<ol>
<li>Apply to cleansed face and neck as the final morning skincare step, using fingertips to blend in circular motions.</li>
<li>Work across the entire face including ears, hairline, and under the chin — uneven application is more visible on tinted products than on clear SPF.</li>
<li>Build a second layer on specific areas of concern — cheekbones, forehead, nose — where coverage needs to be slightly more complete.</li>
<li>For reapplication through the day, the Heliocare Compact Oil Free SPF50 is the ideal pairing — powder SPF maintains protection without disturbing the tinted base.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular-level antioxidant protection against the full UV and visible light spectrum — equally important in darker skin tones where UV damage presents differently but is no less harmful.</td></tr>
<tr><td>Iron oxide pigments (Bronze tint)</td><td>Deep-toned cosmetic pigments blended for medium to darker South African complexions — providing coverage AND a physical visible-light shield against the key melasma and PIH trigger.</td></tr>
<tr><td>Oil-free sebum-control complex</td><td>Maintains a matte, shine-free finish throughout the day — the Bronze formula delivers identical sebum-control performance to the untinted Gel Oil Free.</td></tr>
<tr><td>Broad-spectrum 360° UV filters</td><td>Full SPF50+ UVA, UVB, IR, and blue light protection — completely independent of the tint system, which is layered on top of the protection chemistry.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"The Bronze shade was specifically important to stock because the majority of my patients have medium to darker skin tones, and many had been skipping SPF altogether because products left them looking ashy or grey. PIH and melasma management in darker skin is directly impacted by SPF compliance, and a product patients genuinely enjoy wearing is the single biggest lever I have. The iron oxide tint also provides visible light protection — an underappreciated driver of pigmentation in darker Fitzpatrick skin types that is often overlooked entirely when prescribing photoprotection." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I have darker skin and every sunscreen I have ever tried made me look grey or left white residue. This Bronze shade actually matches me and I finally wear SPF every single day." — Zanele K., 29</td>
<td>"Dr. Bangalee told me I needed to be religious about SPF for my melasma treatment to work. The Bronze shade made that actually possible — it looks like skin, not sunscreen." — Fatima B., 37</td>
<td>"The coverage is light but it evens out my skin tone completely. I look polished without wearing any makeup at all. It has become my everyday morning routine." — Nomsa D., 33</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — but most patients in the Bronze shade find the coverage sufficient on its own. If you prefer foundation over it, the oil-free matte base supports makeup application well.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>A pea-to-two-pea amount for the full face. The tint is concentrated — spreading evenly before it sets is more important than the quantity used.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — this is specifically why the Bronze shade exists. The iron oxide pigment system is calibrated to eliminate any whitening from the UV filter system on medium and darker skin tones.</td></tr>
<tr><td><strong>Can I use this after a skin treatment?</strong></td><td>From day 5–7 post-procedure once the skin barrier is no longer actively compromised. Use the Mineral Tolerance Fluid in the first recovery window, then transition to the Color Gel once fully healed.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-color-gel-oil-free-spf50-bronze';

-- -----------------------------------------------------------------------------
-- 10. Heliocare 360 Pigment Solution Fluid SPF50
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Pigment Solution Fluid SPF50 right for you?</h3>
<ul>
<li><strong>Melasma patients</strong> — the most effective single product available for melasma management: SPF50+ to prevent UV-triggered darkening, plus active depigmenting ingredients to treat existing patches simultaneously.</li>
<li><strong>Post-peel or post-laser hyperpigmentation patients</strong> — treatment-induced PIH is one of the most frustrating side effects of skin procedures; this product blocks the UV and visible light triggers while actives fade existing marks.</li>
<li><strong>Patients with sun spots or uneven skin tone</strong> — the combination of photoprotection and brightening actives addresses both the cause and the symptom of photoageing-related pigmentation.</li>
<li><strong>Anyone using a standalone brightening serum</strong> — combining SPF and brightening in one product simplifies the routine and ensures the brightening actives are not undermined by inadequate photoprotection.</li>
<li><strong>Post-treatment patients wanting to maintain results</strong> — after clinical depigmentation treatment with Dr. Bangalee, this product is prescribed to maintain and extend the results achieved in-clinic.</li>
</ul>

<h3>How Heliocare 360 Pigment Solution Fluid SPF50 works — the science</h3>
<p>Pigment Solution Fluid combines three distinct mechanisms in a single formulation. First, <strong>SPF50+ 360° photoprotection</strong> with Fernblock® blocks the UV and visible light exposure that triggers melanocyte activation and new pigmentation formation. Second, <strong>Niacinamide (Vitamin B3)</strong> inhibits the transfer of melanin from melanocytes to keratinocytes — reducing the appearance of existing dark spots by interrupting the pigmentation pathway at its distribution stage. Third, <strong>Thiamidol and plant-based brightening actives</strong> inhibit tyrosinase — the enzyme that catalyses melanin production itself — addressing pigmentation at its source. Using SPF alone prevents new damage; this product actively treats existing damage at the same time.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A light, elegant fluid that applies smoothly with no tackiness and a barely perceptible skin-tone-evening luminosity from day one.<br><strong>Week 1–2:</strong> The SPF protection is working from day one; the depigmenting actives typically begin showing visible results at weeks 4–6 with consistent use.<br><strong>Month 1+:</strong> Existing dark spots begin to fade measurably; patients who combine this with Dr. Bangalee's in-clinic pigmentation treatment protocol see accelerated results compared to topical treatment or SPF alone.</p>

<h3>How to use Heliocare 360 Pigment Solution Fluid SPF50</h3>
<ol>
<li>Apply to the full face and neck each morning as the last skincare step — the SPF component must be applied to all exposed skin, not just areas of concern.</li>
<li>Use a generous, even layer — SPF efficacy requires full coverage; spot-application on dark spots alone is insufficient for protection and compromises the depigmenting results.</li>
<li>Can be used alone or as a base under light powder or tinted coverage — pairs particularly well with the Heliocare Color Gel range for patients wanting additional coverage.</li>
<li>For best results, use consistently every morning without interruption — the brightening actives are cumulative and require uninterrupted daily use to achieve and maintain results.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular antioxidant protection addressing UV-induced oxidative stress — one of the key upstream triggers of melanocyte over-activation and pigmentation formation.</td></tr>
<tr><td>Niacinamide (Vitamin B3)</td><td>Inhibits the transfer of melanin granules from melanocytes to skin surface cells — reducing visibility of existing dark spots and preventing surface deposition of new pigmentation.</td></tr>
<tr><td>Thiamidol (tyrosinase inhibitor)</td><td>Clinically proven tyrosinase inhibitor that blocks melanin production at its enzymatic source — the most upstream point of intervention in the pigmentation cascade.</td></tr>
<tr><td>Broad-spectrum 360° UV + visible light filters</td><td>SPF50+ UVA, UVB, IR, and blue light coverage — protecting against all vectors of radiation that activate melanocyte pigmentation response, including visible light which is particularly relevant in melasma.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"Pigment Solution Fluid is one of the most clinically useful products I prescribe — particularly for my melasma patients and anyone finishing a peel or brightening treatment series. The problem with treating pigmentation is that UV exposure can undo a month of clinical progress in a single unprotected day outdoors. By combining the SPF with active depigmenting ingredients, the patient is protected and treated simultaneously. I have seen consistently faster and more sustained pigmentation results in patients using this compared to separate SPF and brightening products." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I have struggled with melasma for 10 years. Nothing has come close to working as well as this combined with Dr. Bangalee's treatment. My patches are genuinely fading month by month." — Reena P., 42</td>
<td>"I had dark marks left after my peel and Dr. Bangalee put me on this. Within 6 weeks the marks were noticeably lighter and my overall skin tone looks more even than it has in years." — Thembi N., 38</td>
<td>"The texture is so light I forget I am wearing it. But the results are real — my sun spots have faded consistently every month. It is now my most important skincare product." — Annette J., 53</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — the fluid texture provides an excellent base for all makeup types. Many patients find the skin-brightening effect means they need less coverage over time as their baseline tone improves.</td></tr>
<tr><td><strong>How long before I see results on my dark spots?</strong></td><td>The SPF protection is working from day one. For the brightening actives, most patients see visible fading of dark spots from weeks 4–8 with consistent daily use. Full results typically develop over 3 months of uninterrupted use.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — the fluid is transparent with a slight skin-luminosity effect from the brightening actives. No white cast, no opacity on any skin tone.</td></tr>
<tr><td><strong>Can I use this while on other brightening treatments?</strong></td><td>Yes, and Dr. Bangalee typically prescribes it as part of a layered pigmentation protocol alongside clinical treatments. Confirm your full routine with him at your consultation to ensure ingredient compatibility.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-pigment-solution-fluid-spf50';
`;

appendFileSync(path, block, 'utf8');
console.log('products 6-10 appended');
