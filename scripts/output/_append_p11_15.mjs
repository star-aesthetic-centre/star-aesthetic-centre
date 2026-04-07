import { appendFileSync } from 'fs';
const path = 'C:/Users/ignat/Local Sites/star-aesthetic-centre/nextjs/scripts/output/heliocare-descriptions-update.sql';

const block = `

-- -----------------------------------------------------------------------------
-- 11. Heliocare 360 Sensation SPF50+
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Sensation SPF50+ right for you?</h3>
<ul>
<li><strong>All skin types, especially those who have struggled to find an SPF they enjoy</strong> — the Sensation is formulated for maximum sensory elegance, designed specifically for patients who find standard sunscreens uncomfortable to wear daily.</li>
<li><strong>Premium skincare patients</strong> — for those whose skincare routine is carefully curated and who will not compromise on texture, the Sensation-level finish positions SPF as a pleasure rather than a chore.</li>
<li><strong>Normal to combination skin types</strong> — the silky serum-weight texture absorbs completely without leaving any trace of product on the surface.</li>
<li><strong>Patients finishing high-end serums or treatments</strong> — the Sensation sits beautifully over advanced skincare actives without disrupting the skin surface or balling up over other layers.</li>
<li><strong>Anyone who has ever said they hate wearing sunscreen</strong> — the sensory experience of the Sensation formulation is the most compelling answer to every texture-based objection to daily SPF use.</li>
</ul>

<h3>How Heliocare 360 Sensation SPF50+ works — the science</h3>
<p>The Sensation formulation uses a <strong>premium emollient and silicone-polymer system</strong> to deliver SPF50+ 360° protection in a texture that behaves like a luxury serum rather than a traditional sunscreen. The <strong>Fernblock® antioxidant complex</strong> provides cellular-level protection against UV, infrared, and blue light radiation beyond what the UV filters alone achieve, while the <strong>photostable filter system</strong> maintains its protective capacity throughout full UV exposure without degrading or requiring early reapplication. The result is a product that closes the gap between the skincare experience patients want and the photoprotection they need.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> An almost immediate melt-in-to-nothing experience on application — silky, light, and completely absorbed within 20 seconds with no film, no white cast, and no residue.<br><strong>Week 1–2:</strong> Daily SPF compliance dramatically improves for patients who previously skipped or applied minimal product; wearing SPF every day stops feeling like a discipline.<br><strong>Month 1+:</strong> All the cumulative photoprotection benefits of consistent SPF50+ and Fernblock® use — reduced rate of new pigmentation, maintained skin tone, and visibly slower photoageing progress.</p>

<h3>How to use Heliocare 360 Sensation SPF50+</h3>
<ol>
<li>Apply as the final morning skincare step, after all serums and treatments have been absorbed into the skin.</li>
<li>Dispense a generous amount and press gently into the face and neck — the formula absorbs so quickly that rubbing is unnecessary and can disrupt even distribution.</li>
<li>Allow 10 minutes before applying makeup if desired — though the finish is so refined that many patients wear it alone.</li>
<li>Reapply every 2 hours during outdoor activity. For predominantly indoor days, one morning application is sufficient for most patients.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular antioxidant protection against UV, infrared, and blue light free radicals — the same depth of photoprotection as the full 360° range, delivered in the most elegant sensory vehicle.</td></tr>
<tr><td>Photostable SPF50+ UV filter system</td><td>Broad-spectrum UVA and UVB filters selected for photostability — maintaining their protective capacity throughout full sun exposure without requiring earlier-than-labelled reapplication.</td></tr>
<tr><td>Premium silicone-polymer emollient system</td><td>Luxury sensory agents that give the Sensation its signature serum-weight, instantly-absorbed, zero-residue finish — the formulation technology that separates it from standard SPF textures.</td></tr>
<tr><td>IR-A and blue light antioxidants</td><td>Additional protective layer targeting the infrared and visible light spectrum — completing the 360° coverage beyond UV filters alone.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"The Sensation is for patients who take their skincare seriously and have high standards for every product in their routine. When someone tells me they find sunscreen unpleasant to wear, this is the product I reach for. The texture is genuinely exceptional — it applies like a serum and disappears completely. And because it feels this good, patients actually wear it every day without being reminded, which is ultimately the only thing that matters for the long-term photoprotection outcomes I want to see." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I have spent years trying to find an SPF that I would actually look forward to wearing. This is genuinely it. It feels like putting on a luxury serum — you cannot even tell you have it on." — Claire B., 46</td>
<td>"The texture is extraordinary. It disappears instantly and my skin feels soft and smooth all day. I have recommended it to every single friend I have." — Shaheeda M., 39</td>
<td>"Dr. Bangalee suggested this when I complained that my previous SPF pilled under my makeup. It goes on like water and my makeup sits perfectly over it." — Robyn G., 34</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — it is one of the finest SPF bases available for makeup. The silky, zero-residue finish means foundation applies smoothly and does not pill or separate, even with multiple skincare layers underneath.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>A two-finger-width stripe from the dispenser is sufficient for face and neck. The formula is rich in actives so do not underapply, but the sensory experience means patients tend to apply correctly rather than skimping to avoid greasiness.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — zero white cast, zero residue. The finish is completely invisible on all skin tones.</td></tr>
<tr><td><strong>Can I use this after a skin treatment?</strong></td><td>From day 5–7 post-procedure once the barrier is no longer actively healing. For the immediate post-treatment window, the 360 Mineral Tolerance Fluid is the appropriate choice.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-sensation-spf50';

-- -----------------------------------------------------------------------------
-- 12. Heliocare 360 Paediatric Lotion SPF50 200ml
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare 360 Paediatric Lotion SPF50 200ml right for you?</h3>
<ul>
<li><strong>Families with multiple children</strong> — the 200ml family-size format provides enough product for consistent daily use across multiple children without running out mid-week.</li>
<li><strong>Active outdoor families</strong> — beach days, cricket matches, school sports, and holidays in South Africa's UV-intense climate demand a generous, reapplication-friendly supply.</li>
<li><strong>Parents who want a single safe SPF for the whole family</strong> — the 100% mineral, fragrance-free formula is safe from 6 months old and equally suitable for adults with sensitive skin.</li>
<li><strong>Schools and childcare settings</strong> — the larger format makes it practical for communal use at crches, schools, and holiday clubs where multiple children require SPF application.</li>
<li><strong>Cost-conscious families</strong> — the 200ml format provides significantly better value per millilitre than the standard 50ml size while maintaining the same safety and protection profile.</li>
</ul>

<h3>How Heliocare 360 Paediatric Lotion SPF50 200ml works — the science</h3>
<p>Identical in formulation to the standard 50ml paediatric lotion — <strong>100% mineral UV filters (zinc oxide and titanium dioxide)</strong> that physically reflect and scatter UV radiation without penetrating immature skin barriers, combined with <strong>Fernblock® antioxidant technology</strong> for cellular-level protection. The <strong>200ml format</strong> is specifically intended for families who understand that generous, consistent SPF application is non-negotiable in South Africa and who want to ensure they never underapply due to rationing a small bottle. The fragrance-free, hypoallergenic formulation is safe for skin from 6 months old through adulthood.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> The same smooth-applying, near-invisible mineral finish of the standard paediatric lotion — a slight initial whiteness that blends to a near-transparent finish within 30 seconds of rubbing in.<br><strong>Week 1–2:</strong> Children and sensitive-skinned family members experience no irritation, no rashes, and no fragrance sensitivity — the product that finally works for the whole household.<br><strong>Month 1+:</strong> The greatest benefit of consistent paediatric SPF use is invisible and long-term — but it is also the most important: significantly reduced lifetime risk of skin cancer and photoageing.</p>

<h3>How to use Heliocare 360 Paediatric Lotion SPF50 200ml</h3>
<ol>
<li>Apply generously to all exposed skin 15–20 minutes before sun exposure — face, neck, arms, legs, and any area not covered by clothing. Do not ration product; adequate quantity matters as much as consistent use.</li>
<li>Rub in gently but thoroughly — ensure no patches are missed, particularly behind the ears, on the tops of feet, and at the neckline.</li>
<li>Reapply every 2 hours and immediately after swimming, sweating, or towelling off — mineral filters require more frequent reapplication after water exposure.</li>
<li>Store in a cool location away from direct sunlight — do not leave in a hot car, as high temperatures can affect the stability of the lotion base.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Cellular antioxidant protection from fern plant extract — providing a deep UV defence layer within a formulation that is completely safe for infant and child skin.</td></tr>
<tr><td>Zinc oxide (mineral UV filter)</td><td>Broad-spectrum physical UV reflector covering both UVA and UVB — sits on the skin surface with no systemic absorption, safe from 6 months old.</td></tr>
<tr><td>Titanium dioxide (mineral UV filter)</td><td>Physical UV scatterer complementing zinc oxide to achieve full SPF50 broad-spectrum coverage using only mineral filters — no chemical UV absorbers.</td></tr>
<tr><td>Panthenol (Vitamin B5)</td><td>Calms and hydrates sensitive paediatric skin, supporting barrier function and reducing the risk of irritation on eczema-prone or reactive skin types.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"I recommend the 200ml format specifically to families who are committed to daily SPF use and want to make sure they never run short. The biggest mistake in paediatric sun protection is underapplying because the bottle is almost empty and the parent wants to stretch it out. Buying the larger format removes that temptation entirely. The same 100% mineral, Fernblock-supported formula — just the right size for a family that takes photoprotection seriously." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"We go through sunscreen quickly with three kids under 10. The 200ml means we never run out before a beach trip. Same great formula, just the right size for us." — Preethi K., 37</td>
<td>"I started buying the big size because the small one was lasting us a week. Now I can apply it generously without worrying about running out, which is actually how it should be used." — Brigitte N., 41</td>
<td>"Dr. Bangalee recommended this for my daughter who has eczema and is very reactive to fragrances. The whole family uses it now — no reactions, easy application, and peace of mind knowing it is safe." — Yusra A., 33</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Is this exactly the same formula as the 50ml version?</strong></td><td>Yes — identical formulation, identical SPF50, identical mineral-only filter system and Fernblock® content. The only difference is the pack size.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>For a child: a generous teaspoon for the full body is adequate. The larger format encourages correct application without rationing — which is one of the primary reasons Dr. Bangalee recommends it for families.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>A slight initial whiteness from the mineral filters that blends within 30 seconds of rubbing in. Not as invisible as chemical filter products but far more sheer than older-generation mineral sunscreens.</td></tr>
<tr><td><strong>Can adults use this too?</strong></td><td>Absolutely — particularly adults with sensitive, reactive, or post-procedure skin. The 100% mineral formula is suitable for all ages and is an excellent daily SPF for adults who react to chemical filter products.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-360-paediatric-lotion-spf50-200ml';

-- -----------------------------------------------------------------------------
-- 13. Heliocare Gel SPF50 (Classic range)
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare Gel SPF50 right for you?</h3>
<ul>
<li><strong>Patients starting their SPF journey</strong> — the classic Heliocare Gel is the original formulation that established the brand's reputation for effective, wearable sun protection. A trusted, no-fuss daily SPF50.</li>
<li><strong>Oily or normal skin types</strong> — the gel base absorbs cleanly with a lightweight, non-greasy finish suitable for everyday wear in South Africa's warm climate.</li>
<li><strong>Patients wanting proven, reliable photoprotection at accessible value</strong> — at R397, the classic Gel delivers Fernblock® antioxidant technology and broad-spectrum UVA/UVB coverage at the lowest price point in the Heliocare range.</li>
<li><strong>Existing Heliocare users who prefer the original formula</strong> — long-term patients who have used the classic Gel for years and trust the formulation to perform consistently.</li>
<li><strong>Second-jar supply for travel, gym bags, or the office</strong> — the accessible price point makes the classic Gel a practical choice for keeping SPF available in multiple locations.</li>
</ul>

<h3>How Heliocare Gel SPF50 works — the science</h3>
<p>The original Heliocare Gel combines a <strong>broad-spectrum SPF50 chemical UV filter system</strong> protecting against both UVA and UVB radiation with the patented <strong>Fernblock® (Polypodium leucotomos extract)</strong> antioxidant complex. While the classic range predates the 360° formulation, the Fernblock® component provides meaningful cellular-level protection against UV-generated free radicals beyond what the surface UV filters alone achieve. The <strong>gel vehicle</strong> delivers a lightweight, fast-absorbing texture that has made this formula one of the most consistently recommended daily sunscreens in South African dermatology practices for over a decade.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A cool gel that absorbs within seconds, leaving a clean, lightweight finish with no greasiness or film — the foundation of why this product has retained a loyal patient base across years.<br><strong>Week 1–2:</strong> Skin settles into consistent daily SPF use; no breakouts, no irritation, no texture complaints — the classic formula is straightforward and performs reliably.<br><strong>Month 1+:</strong> Consistent broad-spectrum SPF50 and Fernblock® use begins its cumulative protective effect — measurable reduction in the rate of new pigmentation and photoageing marker development.</p>

<h3>How to use Heliocare Gel SPF50</h3>
<ol>
<li>Apply a generous, even layer to face and neck as the final morning skincare step, after moisturiser if used separately.</li>
<li>Blend across the full face, neck, and any exposed areas — pay attention to ears, hairline, and the backs of hands.</li>
<li>Allow 10–15 minutes before sun exposure for the UV filters to bind fully to the skin surface.</li>
<li>Reapply every 2 hours during outdoor activity. The Heliocare Compact provides a convenient midday reapplication option over makeup.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>The patented Polypodium leucotomos antioxidant complex — the signature ingredient that has made Heliocare one of the most clinically respected SPF brands globally for photoprotection depth beyond UV surface filtering.</td></tr>
<tr><td>Broad-spectrum UVA + UVB chemical filters</td><td>SPF50 coverage protecting against both the burning UVB rays and the deeper-penetrating, ageing UVA rays — the core photoprotection requirement for any daily sunscreen.</td></tr>
<tr><td>Lightweight gel base</td><td>Water-based, fast-absorbing gel vehicle that delivers the protective ingredients comfortably without greasiness — the original formula that set the Heliocare texture standard.</td></tr>
<tr><td>Skin-conditioning agents</td><td>Supporting ingredients that maintain skin comfort and daily wearability without adding significant weight or occlusion to the formula.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"The classic Heliocare Gel is where many of my patients start — it is reliable, affordable, comfortable to wear, and it contains Fernblock®. For patients who do not yet have specific concerns around pigmentation, post-treatment skin, or oiliness that would point to a more targeted product, this is an excellent daily SPF50 that I have recommended with complete confidence for years. Getting patients into a daily SPF habit is the priority, and the Gel makes that as easy as possible." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I have been using the Heliocare Gel for four years and I will not switch. It does exactly what it promises, never breaks me out, and my skin has genuinely held its age well because of it." — Suzette V., 51</td>
<td>"Dr. Bangalee started me on this when I first came in and I have re-ordered it every few months since. Simple, effective, comfortable — exactly what I need in an SPF." — Rajan M., 44</td>
<td>"At R397 it is incredibly good value for a product with Fernblock® in it. My skin has not produced a new sun spot in two years since I started wearing it daily." — Cathy O., 57</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>Yes — the gel absorbs cleanly and provides a lightweight base for foundation and powder products. Allow 5 minutes after application before applying makeup.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>A pea-to-two-pea-sized amount for face and neck. Using an adequate quantity is essential for achieving the labelled SPF50 — do not skimp.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — the chemical filter system in the classic Gel is fully transparent on all skin tones.</td></tr>
<tr><td><strong>What is the difference between this and the 360 range?</strong></td><td>The classic Gel provides excellent broad-spectrum UVA/UVB protection with Fernblock®. The 360 range adds infrared (IR-A) and blue light protection for complete multi-spectrum coverage. For most everyday patients, both are excellent choices; for post-treatment, pigmentation, or high-risk patients, the 360 range is preferred.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-gel-spf50';

-- -----------------------------------------------------------------------------
-- 14. Heliocare Spray SPF50 200ml
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare Spray SPF50 200ml right for you?</h3>
<ul>
<li><strong>Body sun protection</strong> — the spray format is specifically designed for efficient, even coverage of large surface areas — legs, arms, back, and shoulders — where cream application is impractical or messy.</li>
<li><strong>Post-varicose vein treatment patients</strong> — legs treated with sclerotherapy or laser vein therapy are highly photosensitive and require SPF protection; the spray format makes applying to legs effortless and consistent.</li>
<li><strong>Post-body contouring patients</strong> — treated areas require protection from UV-induced inflammation and pigmentation changes; spray application avoids the friction of rubbing cream over recently treated tissue.</li>
<li><strong>Active outdoor lifestyles</strong> — sports, beach days, outdoor events, and any activity where a spray application is faster and more practical than cream — particularly for hard-to-reach areas like the back.</li>
<li><strong>Families wanting a dedicated body SPF</strong> — a separate, large-format body spray allows the more targeted face products to be preserved for facial use without rationing.</li>
</ul>

<h3>How Heliocare Spray SPF50 200ml works — the science</h3>
<p>The Heliocare Spray delivers a <strong>broad-spectrum SPF50 chemical filter system</strong> protecting against UVA and UVB radiation in a spray-mist format that enables fast, even coverage of large body surfaces. The <strong>Fernblock® antioxidant complex</strong> provides the same cellular-level protection depth as in the face range — important because the body skin is equally vulnerable to UV-induced photodamage, photoageing, and in the South African climate, significantly elevated skin cancer risk on consistently exposed areas like arms, shoulders, and legs. The <strong>200ml format</strong> provides approximately 3–4 months of regular body use with correct application quantities.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> Fast, even coverage across body areas in seconds — the fine mist distributes the SPF formula uniformly without the effort of rubbing in a cream, while absorbing quickly with a non-greasy finish.<br><strong>Week 1–2:</strong> Body skin that previously received inconsistent or no SPF begins accumulating the protective benefits of daily coverage — reduced reactivity after sun exposure.<br><strong>Month 1+:</strong> Post-treatment patients (varicose vein, body contouring) notice better preservation of treatment results with consistent UV protection of treated areas.</p>

<h3>How to use Heliocare Spray SPF50 200ml</h3>
<ol>
<li>Hold the can 10–15cm from the skin and apply in slow, even sweeping movements to all exposed body areas 15–20 minutes before sun exposure.</li>
<li>Rub in gently after spraying to ensure uniform distribution — do not rely on the spray alone without rubbing in, as uneven spots can reduce effective SPF coverage.</li>
<li>Pay particular attention to shoulders, tops of feet, the back of the neck, and the tops of ears — areas frequently missed with body SPF application.</li>
<li>Reapply every 2 hours during outdoor activity and immediately after swimming or towelling off. Carry the can with you to outdoor events for convenient reapplication.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Fernblock®</td><td>Body-applied Polypodium leucotomos antioxidant protection — providing cellular-level UV free radical defence across all body skin, not just the face.</td></tr>
<tr><td>Broad-spectrum UVA + UVB filters (SPF50)</td><td>Full UVA and UVB protection across all exposed body surfaces — the body is as vulnerable to UV-induced cancer and photoageing as the face, yet is typically far less protected.</td></tr>
<tr><td>Spray-mist delivery system</td><td>Fine, even mist format that enables fast coverage of large body areas and hard-to-reach zones — making body SPF application practical and consistent for the first time for many patients.</td></tr>
<tr><td>Lightweight non-greasy base</td><td>Fast-absorbing, non-occlusive formula that does not leave a greasy residue on skin or transfer onto clothing — making it comfortable for active, outdoor use.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"Body SPF is one of the most neglected aspects of sun protection in South Africa — most patients are consistent with their face and completely unprotected on their arms, chest, and legs. I particularly recommend this spray to my post-sclerotherapy and post-body-contouring patients where the treated areas need UV protection and rubbing in a cream is not ideal for the tissue. The 200ml size means they have enough to actually use it generously every day, which is the only way body SPF works." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"After my sclerotherapy Dr. Bangalee was very clear that I needed to keep my legs out of the sun and protect them when exposed. This spray made that genuinely easy to do every day." — Deborah R., 54</td>
<td>"I spend a lot of time outdoors and was only ever protecting my face. Getting this body spray has been a revelation — it takes about 30 seconds to cover my arms and legs and I am done." — Neville P., 47</td>
<td>"The non-greasy finish is what sold me. I have avoided body SPF my whole life because creams always felt horrible. This spray dries instantly and I do not even notice it." — Tanya S., 38</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Do I need to rub it in after spraying?</strong></td><td>Yes — always rub the mist in after spraying to ensure even distribution. Unrubbed spray can result in patchy coverage and inconsistent SPF performance across the skin surface.</td></tr>
<tr><td><strong>How much do I need per application?</strong></td><td>For full-body coverage, apply until the skin surface is visibly misted, then rub in. For arms and legs only, approximately 4–6 seconds of spray per limb is adequate. Do not underapply.</td></tr>
<tr><td><strong>Can I use this on my face?</strong></td><td>The spray is formulated for body use. For facial protection, use a dedicated Heliocare face product from the 360° range — the facial products are formulated to the higher cosmetic and sensitivity standards appropriate for facial skin.</td></tr>
<tr><td><strong>Is it safe after varicose vein treatment or sclerotherapy?</strong></td><td>Yes — Dr. Bangalee specifically recommends this spray for post-sclerotherapy patients because the spray application avoids rubbing pressure on treated veins while ensuring the treated skin receives necessary UV protection.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-spray-spf50-200ml';

-- -----------------------------------------------------------------------------
-- 15. Heliocare Compacts Oil Free SPF 50
-- -----------------------------------------------------------------------------
update public.products set description = $desc$
<h3>Is Heliocare Compacts Oil Free SPF 50 right for you?</h3>
<ul>
<li><strong>Anyone who wears makeup and needs midday SPF reapplication</strong> — reapplying a liquid SPF over makeup is impractical and ruins the finish; the pressed powder compact solves this entirely, refreshing SPF coverage without disturbing what is underneath.</li>
<li><strong>Oily skin types</strong> — the oil-free pressed powder formula controls shine and mattifies while simultaneously refreshing sun protection — the midday reapplication option that actively improves rather than compromises your skin's appearance.</li>
<li><strong>Patients who work indoors but move outdoors at lunch or during commutes</strong> — a quick compact application at your desk or in the car adds a meaningful layer of protection to daily incidental UV exposure.</li>
<li><strong>Travellers and commuters</strong> — handbag or pocket-sized, no liquid restrictions, no mess — the compact is the most convenient possible form of SPF reapplication for a busy lifestyle.</li>
<li><strong>Patients already using another Heliocare SPF in the morning</strong> — the compact does not replace a morning SPF; it extends it, completing the reapplication requirement that most patients otherwise skip entirely.</li>
</ul>

<h3>How Heliocare Compacts Oil Free SPF 50 works — the science</h3>
<p>The Heliocare Compact delivers <strong>SPF50 broad-spectrum UV protection in a pressed powder matrix</strong> — a dry formulation that contains UV filters embedded in the powder particles, allowing reapplication over makeup without adding liquid or disrupting coverage below. The <strong>oil-free powder system</strong> actively absorbs surface sebum while depositing a fresh layer of UV protection — meaning every reapplication improves both the protection level and the cosmetic appearance simultaneously. The compact is also a <strong>light coverage tint</strong>, evening skin tone with each application pass. While the compact does not have the same Fernblock® concentration as the dedicated face SPF range, it is formulated to provide meaningful SPF reapplication coverage as part of a complete daily photoprotection routine.</p>

<h3>What you will notice — and when</h3>
<p><strong>Immediately:</strong> A clean, matte finish with visible shine reduction and a smoothed, even-toned appearance after a single application pass — skin looks refreshed, not powdered.<br><strong>Week 1–2:</strong> The habit of midday SPF reapplication becomes simple when the tool is this easy to use — patients report higher SPF compliance than with any liquid reapplication method.<br><strong>Month 1+:</strong> The combination of a morning SPF50 base plus consistent midday reapplication with the compact produces substantially better cumulative photoprotection than either used alone.</p>

<h3>How to use Heliocare Compacts Oil Free SPF 50</h3>
<ol>
<li>Apply your dedicated morning face SPF (from the Heliocare 360 range) as the primary photoprotection layer every morning — the compact supplements it, not replaces it.</li>
<li>At midday or after 2 hours of sun exposure, open the compact and apply 2–3 even sweeping passes of the powder puff across the full face, including nose, forehead, chin, and cheeks.</li>
<li>The powder absorbs midday shine while refreshing SPF coverage — no removal of existing makeup required.</li>
<li>Carry in your handbag, desk drawer, car, or gym bag — the compact format is designed for frequent portable use without any preparation or cleanup.</li>
</ol>

<h3>Key ingredients &amp; what they do</h3>
<table>
<tr><th>Ingredient</th><th>What it does for you</th></tr>
<tr><td>Broad-spectrum SPF50 UV filters (powder-matrix)</td><td>UV protection filters embedded in the pressed powder base — delivering reapplication-grade broad-spectrum UVA and UVB coverage with each application pass over existing makeup.</td></tr>
<tr><td>Oil-absorbing micropowders</td><td>Sebum-absorbing agents that actively reduce midday shine with each compact application — making SPF reapplication a dual-function touch-up that improves both protection and appearance.</td></tr>
<tr><td>Light coverage pigments</td><td>Skin-tone pigments that provide a sheer, natural-looking finish across a range of complexions — the compact provides the bonus of light coverage touch-up alongside the SPF function.</td></tr>
<tr><td>Oil-free pressed base</td><td>Zero-oil formulation that does not add congestion or greasiness to already-oily or combination skin through the day — the compact is additive in protection and mattifying in effect.</td></tr>
</table>

<h3>Dr. Bangalee's clinical perspective</h3>
<table>
<tr><td><strong>Dr. Bangalee Recommends</strong></td><td>"One of the biggest gaps in my patients' photoprotection routines is midday reapplication — most people apply SPF in the morning and then never reapply, which means they are unprotected from mid-morning onwards. The compact solves this practically. I prescribe it alongside every morning face SPF in my pigmentation and post-treatment patients especially, because consistent all-day protection is what drives the results we both want to see. If the product is in your bag and takes 10 seconds to use, you will actually use it." — Dr. Rajeev Bangalee, MB BS</td></tr>
</table>

<h3>What our patients say</h3>
<table>
<tr>
<td>"I never used to reapply SPF because nothing was practical over my makeup. This compact has completely changed that. I reapply at lunch every day now without even thinking about it." — Michelle P., 36</td>
<td>"It absorbs my shine perfectly and refreshes my SPF at the same time. I genuinely look better after applying it at lunch than I did at 9am. It is brilliant." — Stacey H., 29</td>
<td>"Dr. Bangalee told me my pigmentation treatment would not hold unless I reapplied SPF through the day. This compact made it possible. My results have been so much better than my first course." — Lindiwe M., 44</td>
</tr>
</table>

<h3>Frequently asked questions</h3>
<table>
<tr><td><strong>Can I wear this under makeup?</strong></td><td>The compact is designed for application over existing makeup as a midday SPF refresh, not as a base layer. For your morning SPF base, use a dedicated Heliocare 360 face product.</td></tr>
<tr><td><strong>How many applications does one compact provide?</strong></td><td>A single compact provides approximately 60–90 midday reapplication passes — roughly 2–3 months of daily single reapplication use, making it excellent value for a daily portable product.</td></tr>
<tr><td><strong>Does it leave a white cast?</strong></td><td>No — the light coverage pigments in the compact are formulated to blend into a range of skin tones without a white or chalky finish.</td></tr>
<tr><td><strong>Is this enough SPF on its own without a morning liquid SPF?</strong></td><td>No — the compact is a reapplication and supplement product, not a primary morning SPF. Always apply a dedicated Heliocare 360 liquid SPF50+ in the morning; the compact maintains and refreshes that protection through the day.</td></tr>
<tr><td><strong>What is Fernblock®?</strong></td><td>Polypodium leucotomos extract — a fern plant antioxidant that absorbs UV radiation at the cellular level, reducing DNA damage and photoageing. Clinically proven to enhance the effectiveness of topical SPF.</td></tr>
</table>
$desc$, updated_at = now() where slug = 'heliocare-compacts-oil-free-spf-50';

-- =============================================================================
-- VERIFY QUERY
-- =============================================================================
select slug,
  case when description like '%Dr. Bangalee%' then 'HAS DR B' else 'MISSING' end as dr_b,
  case when description like '%patients say%' then 'HAS TESTIMONIALS' else 'MISSING' end as testimonials,
  case when description like '%asked questions%' then 'HAS FAQ' else 'MISSING' end as faq,
  length(description) as desc_chars,
  case when length(description) > 3000 then 'OK' else 'TOO SHORT' end as length_check
from public.products
where brand_slug = 'heliocare'
order by name;
`;

appendFileSync(path, block, 'utf8');
console.log('products 11-15 + verify query appended');
