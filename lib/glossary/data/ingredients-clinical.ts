import type { GlossaryTerm } from "../types";

/**
 * Clinical actives that anchor the brands Star Aesthetic Centre stocks.
 *
 * Kept in a separate file from ingredients.ts purely so the original 48 KB
 * file stays untouched — index.ts documents new data files as the extension
 * point. Same shape, same depth, same house style.
 *
 * Each term here was chosen because it maps to a brand on the shelf or a
 * treatment on the menu: Fernblock is Heliocare's whole proposition, ferulic
 * acid is why SkinCeuticals C E Ferulic exists, PHAs are NeoStrata's heritage,
 * retinaldehyde is Dermaceutic's signature retinoid, and salicylic acid
 * underpins the acne protocol.
 */
export const CLINICAL_INGREDIENT_TERMS: GlossaryTerm[] = [
  {
    slug: "salicylic-acid",
    term: "Salicylic Acid",
    category: "ingredient",
    shortDescription:
      "Salicylic acid is a beta hydroxy acid (BHA) that dissolves oil, so it can travel into the pore itself rather than working only on the surface. It is the single most useful ingredient for blackheads, congestion and oily, breakout-prone skin.",
    matchTerms: ["salicylic acid", "BHA", "beta hydroxy acid"],
    title: "What is Salicylic Acid? BHA for Acne, Blackheads & Oily Skin | Star Aesthetic Centre",
    metaDescription:
      "Expert guide to salicylic acid: how this oil-soluble BHA clears blocked pores, treats blackheads and calms acne. Includes guidance for deeper South African skin tones and how we use it in clinic in Durban North.",
    keywords: [
      "what is salicylic acid",
      "salicylic acid for acne",
      "BHA vs AHA",
      "salicylic acid blackheads",
      "beta hydroxy acid",
      "salicylic acid south africa",
      "acne treatment durban north",
      "oily skin treatment",
    ],
    heroLine:
      "Salicylic acid is the exfoliant that gets inside the pore — an oil-soluble beta hydroxy acid that dissolves the plug of sebum and dead cells behind blackheads and breakouts, rather than simply polishing the skin's surface.",
    sections: [
      {
        heading: "What is salicylic acid?",
        paragraphs: [
          "Salicylic acid is a beta hydroxy acid, or BHA — chemically related to aspirin and derived originally from willow bark. It is the only widely used exfoliating acid that is oil-soluble, and that single property is what sets it apart from the alpha hydroxy acids such as glycolic and lactic acid.",
          "Because skin oil (sebum) is itself a lipid, an oil-soluble acid can pass through it. Salicylic acid therefore travels down into the pore lining, while water-soluble AHAs stay largely on the surface. If the problem is congestion — blackheads, closed comedones, the rough bumpy texture across the forehead and chin — salicylic acid reaches where the problem actually is.",
        ],
      },
      {
        heading: "How salicylic acid works",
        paragraphs: [
          "Inside the follicle, salicylic acid breaks down the bonds holding dead keratinocytes together and dissolves the sebum binding them into a plug. The blockage loosens and clears, which both empties existing blackheads and prevents the next generation forming.",
          "It is also genuinely anti-inflammatory, again reflecting its relationship to aspirin. That matters for inflamed acne, where redness and swelling are as distressing as the lesion itself. Salicylic acid calms the surrounding skin rather than only stripping it.",
          "At the concentrations used in clinic peels it additionally has a keratolytic effect across the whole treated area, smoothing texture and helping other actives penetrate more evenly afterwards.",
        ],
      },
      {
        heading: "Salicylic acid on deeper skin tones",
        paragraphs: [
          "For Fitzpatrick Type IV–VI skin, salicylic acid is often the safer choice over aggressive AHA peels. Its anti-inflammatory action reduces the risk of post-inflammatory hyperpigmentation — the stubborn dark marks that outlast the spot that caused them and are frequently the real complaint rather than the acne itself.",
          "That said, no acid is risk-free on deeper tones. Over-exfoliation, layering multiple actives, or using a peel strength unsuited to the skin can all provoke exactly the pigmentation you are trying to avoid. Frequency and strength matter more than potency: a well-judged 2% used consistently beats an aggressive peel that leaves marks for six months.",
        ],
      },
      {
        heading: "How to use it",
        paragraphs: [
          "In home care, salicylic acid appears at 0.5–2% in cleansers, toners and targeted serums. A leave-on product at 2% used two to three evenings a week is a sensible starting point; a cleanser is gentler still, since contact time is short.",
          "Do not layer salicylic acid with retinoids in the same routine while your skin is adjusting — alternate evenings instead. And as with every exfoliating acid, daily broad-spectrum SPF 50+ is not optional afterwards.",
        ],
      },
    ],
    clinicRelevance:
      "Salicylic acid runs through our acne protocol at Star Aesthetic Centre. Dr. Bangalee uses it in clinic as part of a tailored peel programme for congestion and active breakouts, and prescribes home-care concentrations to hold the result between visits. Because acne on deeper skin tones so often leaves pigmentation behind, the strength and frequency are matched to your skin rather than applied from a standard menu.",
    faq: [
      {
        q: "What is the difference between salicylic acid and glycolic acid?",
        a: "Salicylic acid is oil-soluble and works inside the pore, which suits congestion, blackheads and oily skin. Glycolic acid is water-soluble and works on the skin surface, which suits dullness, fine lines and uneven texture. Many people benefit from both, used on different days rather than together.",
      },
      {
        q: "Can I use salicylic acid every day?",
        a: "In a cleanser, usually yes. As a leave-on serum, start with two to three evenings a week and build up only if your skin stays comfortable. Tightness, stinging or flaking means you are using it too often, not that it is working.",
      },
      {
        q: "Is salicylic acid safe in pregnancy?",
        a: "Topical salicylic acid in low concentrations is generally considered acceptable, but oral salicylates and high-strength peels are not recommended. Discuss any active with Dr. Bangalee during your consultation if you are pregnant or breastfeeding.",
      },
      {
        q: "Will it help with the dark marks left behind by acne?",
        a: "Indirectly, yes. By reducing inflammation and clearing lesions faster, it limits how much post-inflammatory pigmentation forms in the first place. For marks already present, it is usually combined with a targeted pigmentation ingredient such as azelaic or tranexamic acid.",
      },
    ],
    relatedTerms: ["glycolic-acid", "azelaic-acid", "niacinamide", "retinaldehyde", "polyhydroxy-acid"],
  },

  {
    slug: "fernblock",
    term: "Fernblock",
    category: "ingredient",
    shortDescription:
      "Fernblock is a standardised extract of the fern Polypodium leucotomos, taken orally or applied topically to reduce UV damage from the inside. It is the active behind the Heliocare range and is used as a support to sunscreen, never as a replacement for it.",
    matchTerms: ["Fernblock", "Polypodium leucotomos", "oral sun protection"],
    title: "What is Fernblock (Polypodium leucotomos)? Oral Sun Protection Explained | Star Aesthetic Centre",
    metaDescription:
      "Fernblock explained: how Polypodium leucotomos extract reduces UV-induced skin damage from within, why it supports rather than replaces sunscreen, and how we use Heliocare for melasma and pigmentation in Durban North.",
    keywords: [
      "what is fernblock",
      "polypodium leucotomos",
      "heliocare oral capsules",
      "oral sun protection",
      "sun protection tablets south africa",
      "melasma supplement",
      "heliocare durban",
      "antioxidant sun damage",
    ],
    heroLine:
      "Fernblock is a standardised extract of a Central American fern, and the reason Heliocare exists — a way to reduce the cellular damage ultraviolet light causes, working from inside the skin rather than only as a film on top of it.",
    sections: [
      {
        heading: "What is Fernblock?",
        paragraphs: [
          "Fernblock is the trademarked, standardised extract of Polypodium leucotomos, a fern native to Central and South America. Standardisation matters: it means each dose contains a consistent quantity of the active polyphenols, which is what allows it to be studied and prescribed in a predictable way rather than sold as a vague botanical.",
          "It is the signature active in the Heliocare range, available both as oral capsules and within topical formulations. Ferns evolved defences against oxidative stress when they moved from water onto land, and Fernblock is a refinement of that biology into a clinical product.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Ultraviolet light damages skin along several routes at once: it generates free radicals that degrade collagen, it damages DNA directly, and it triggers the inflammatory cascade that drives pigmentation. Sunscreen addresses the first step by absorbing or reflecting UV before it enters the skin — but no sunscreen blocks everything, and almost nobody applies enough.",
          "Fernblock works on what gets through. Its polyphenols act as antioxidants inside the skin, neutralising the free radicals UV generates, helping preserve the skin's own antioxidant systems, and reducing UV-induced inflammation. Research also points to a protective effect on Langerhans cells, the immune cells in the epidermis that UV exposure suppresses.",
          "This is a second line of defence, not a first. Fernblock reduces the consequences of the UV that reaches your skin; it does not stop the UV arriving.",
        ],
      },
      {
        heading: "Why it matters for pigmentation and melasma",
        paragraphs: [
          "Melasma is the condition where Fernblock earns its place most clearly. Melasma is exquisitely sensitive to UV and to heat, and it relapses readily — a single unprotected afternoon can undo months of careful treatment. Anything that lowers the total daily UV insult improves the odds of holding a result.",
          "For patients on a pigmentation programme, oral Fernblock provides a level of protection that does not depend on remembering to reapply sunscreen at midday, or on how much of it sweated off. In the Durban climate — high UV index, humid, outdoors much of the year — that gap between the sunscreen people intend to apply and what actually stays on the skin is substantial.",
        ],
      },
      {
        heading: "What it does not do",
        paragraphs: [
          "Fernblock is not a sunscreen and carries no SPF rating. It cannot be described in those terms and should never be used as a reason to apply less sun protection or spend longer in direct sun. Any product or claim suggesting otherwise is misrepresenting it.",
          "The correct framing is additive: broad-spectrum SPF 50+ applied properly and reapplied, protective clothing and shade as the foundation, with Fernblock supporting all of that. It is most valuable for people with melasma or pigmentation, those on treatments that increase photosensitivity, and anyone with substantial unavoidable outdoor exposure.",
        ],
      },
    ],
    clinicRelevance:
      "We stock Heliocare at Star Aesthetic Centre and Dr. Bangalee frequently recommends the oral capsules alongside pigmentation and melasma treatment, and after peels or laser when the skin is temporarily more photosensitive. It is always prescribed as an addition to daily SPF 50+, never as a substitute — the protocol is sunscreen first, Fernblock as reinforcement.",
    faq: [
      {
        q: "Does Fernblock replace sunscreen?",
        a: "No, and it should never be used that way. It has no SPF rating and does not block UV from reaching your skin. It reduces the damage caused by the UV that gets through your sunscreen, which is always more than people expect.",
      },
      {
        q: "How long before sun exposure should I take it?",
        a: "Oral Heliocare is typically taken around 30 minutes before exposure, with a second capsule during prolonged days outdoors. Dr. Bangalee will advise dosing for your situation at consultation.",
      },
      {
        q: "Is it safe to take every day?",
        a: "Polypodium leucotomos has a long-standing safety record in the published literature and is generally well tolerated for daily use. As with any supplement, tell Dr. Bangalee about your other medications and conditions before starting.",
      },
      {
        q: "Will it clear my melasma on its own?",
        a: "No. It is a protective adjunct, not a treatment. Melasma needs a combined approach — pigment-targeting actives, in-clinic treatment where appropriate, and rigorous photoprotection. Fernblock strengthens the photoprotection part.",
      },
    ],
    relatedTerms: ["tranexamic-acid", "vitamin-c", "niacinamide", "azelaic-acid"],
  },

  {
    slug: "ferulic-acid",
    term: "Ferulic Acid",
    category: "ingredient",
    shortDescription:
      "Ferulic acid is a plant antioxidant used mainly to stabilise vitamin C and vitamin E and make them work harder. It is the third ingredient in the classic C E Ferulic formulation and the reason that combination outperforms vitamin C alone.",
    matchTerms: ["ferulic acid", "C E Ferulic"],
    title: "What is Ferulic Acid? The Antioxidant That Stabilises Vitamin C | Star Aesthetic Centre",
    metaDescription:
      "Ferulic acid explained: how this plant antioxidant stabilises vitamin C and vitamin E, doubles their photoprotective effect, and why SkinCeuticals C E Ferulic remains the benchmark antioxidant serum.",
    keywords: [
      "what is ferulic acid",
      "C E ferulic",
      "skinceuticals c e ferulic",
      "vitamin c serum stability",
      "antioxidant serum",
      "ferulic acid benefits",
      "skinceuticals durban",
      "best vitamin c serum south africa",
    ],
    heroLine:
      "Ferulic acid is the quiet third ingredient that makes the most famous antioxidant serum in skincare work — stabilising vitamin C and vitamin E, and roughly doubling the photoprotection the pair provide on their own.",
    sections: [
      {
        heading: "What is ferulic acid?",
        paragraphs: [
          "Ferulic acid is a plant-derived antioxidant found in the cell walls of rice bran, oats, apple seeds and other plants, where its job is to defend against oxidative stress. In skincare it is rarely the headline ingredient, because its most valuable role is what it does for the ingredients beside it.",
          "It came to prominence through the Duke University research that produced the C E Ferulic formulation — the combination of 15% L-ascorbic acid, 1% alpha tocopherol (vitamin E) and 0.5% ferulic acid at low pH that SkinCeuticals built into its best-known product, and which almost every antioxidant serum since has imitated.",
        ],
      },
      {
        heading: "How it works with vitamin C",
        paragraphs: [
          "Pure L-ascorbic acid is powerful and notoriously unstable. Exposed to light, heat and air it oxidises — which is why a vitamin C serum turns from clear to yellow to brown, and why an old bottle does considerably less than a fresh one. Oxidised vitamin C is not merely inert; it can itself contribute to free-radical activity on the skin.",
          "Ferulic acid slows that degradation substantially, extending the serum's useful life and keeping more of the active intact by the time it reaches your face. It also works as an antioxidant in its own right, and the three together cover a broader range of free radicals than any one of them alone.",
          "The published finding that made the formulation famous was that adding ferulic acid roughly doubled the photoprotection of the vitamin C and E pairing. This is antioxidant protection — reducing UV-induced damage — not sun protection. It sits under your sunscreen, it does not replace it.",
        ],
      },
      {
        heading: "Getting the benefit in practice",
        paragraphs: [
          "Apply an antioxidant serum in the morning, on clean dry skin, before moisturiser and sunscreen. The point of morning use is to have antioxidant defence in place before the day's UV and pollution exposure, not afterwards.",
          "Store it away from light and heat, close it properly, and pay attention to colour. Deep amber or brown means it has oxidised and should be replaced. In a Durban bathroom — warm and humid — that happens faster than the packaging suggests, so a cupboard is better than a windowsill.",
        ],
      },
    ],
    clinicRelevance:
      "SkinCeuticals C E Ferulic is one of the products we stock most consistently at Star Aesthetic Centre, and it sits in most of Dr. Bangalee's anti-ageing and pigmentation regimens as the morning antioxidant step. It pairs particularly well with a retinoid at night — antioxidant defence by day, cellular renewal by night — and supports the results of in-clinic treatments between visits.",
    faq: [
      {
        q: "Do I need ferulic acid, or is vitamin C enough?",
        a: "Vitamin C alone works, but degrades quickly and delivers less photoprotection. A formulation combining vitamin C, vitamin E and ferulic acid stays active longer and protects better. If you are buying one antioxidant serum, buy the combination.",
      },
      {
        q: "Why has my serum turned brown?",
        a: "It has oxidised. Light, heat and air exposure all accelerate it. A brown serum has lost most of its benefit and should be replaced — and stored somewhere cool and dark next time.",
      },
      {
        q: "Can I use it with retinol?",
        a: "Yes, but at opposite ends of the day. Antioxidant serum in the morning, retinoid at night. Using both together increases irritation without adding benefit.",
      },
      {
        q: "Does it replace sunscreen?",
        a: "No. It reduces the free-radical damage caused by UV that reaches your skin, which is a different job from blocking UV. Broad-spectrum SPF 50+ every morning, regardless.",
      },
    ],
    relatedTerms: ["vitamin-c", "niacinamide", "retinol", "fernblock"],
  },

  {
    slug: "polyhydroxy-acid",
    term: "Polyhydroxy Acid (PHA)",
    category: "ingredient",
    shortDescription:
      "Polyhydroxy acids are next-generation exfoliating acids with larger molecules that penetrate more slowly and gently than AHAs. They suit sensitive, rosacea-prone and reactive skin that cannot tolerate glycolic acid, and they hydrate as they exfoliate.",
    matchTerms: ["polyhydroxy acid", "PHA", "gluconolactone", "lactobionic acid"],
    title: "What are Polyhydroxy Acids (PHAs)? Gentle Exfoliation for Sensitive Skin | Star Aesthetic Centre",
    metaDescription:
      "PHAs explained: how gluconolactone and lactobionic acid exfoliate sensitive and rosacea-prone skin without the sting of glycolic acid, why the molecule size matters, and where NeoStrata fits in a Durban North routine.",
    keywords: [
      "what is PHA",
      "polyhydroxy acid",
      "gluconolactone",
      "lactobionic acid",
      "PHA vs AHA",
      "exfoliant for sensitive skin",
      "neostrata pha",
      "rosacea exfoliation",
    ],
    heroLine:
      "Polyhydroxy acids are the answer for skin that needs exfoliation but cannot tolerate it — larger, slower molecules that resurface gently, hold water in the skin, and rarely produce the sting that makes people abandon glycolic acid.",
    sections: [
      {
        heading: "What are polyhydroxy acids?",
        paragraphs: [
          "PHAs are chemically related to the alpha hydroxy acids but carry multiple hydroxyl groups on a substantially larger molecule. The two you will encounter are gluconolactone and lactobionic acid. NeoStrata pioneered their use in skincare, which is why the brand is so closely associated with sensitive-skin exfoliation.",
          "Molecule size is the whole story. Glycolic acid is the smallest AHA, which is why it penetrates fast and works quickly — and why it stings, reddens and overwhelms compromised skin. A PHA molecule is too large to rush in, so it works at the surface, gradually, with far less provocation.",
        ],
      },
      {
        heading: "How they differ from AHAs",
        paragraphs: [
          "The exfoliating mechanism is broadly the same: loosening the bonds between dead surface cells so they shed, revealing smoother, brighter skin. The difference is pace and tolerability. PHAs deliver a similar destination over a longer road, which is precisely what reactive skin needs.",
          "PHAs also do something AHAs do not: they are humectants, drawing and holding water in the skin. So rather than leaving skin tight and stripped after exfoliation, they leave it better hydrated. For a barrier that is already struggling, that combination is unusually well suited.",
          "They carry antioxidant activity as well, and unlike glycolic acid they do not appear to increase UV sensitivity to the same degree — though daily SPF 50+ remains non-negotiable with any exfoliant.",
        ],
      },
      {
        heading: "Who they suit",
        paragraphs: [
          "PHAs are the sensible starting point for anyone with rosacea, eczema-prone or genuinely sensitive skin, and for anyone who has tried glycolic acid and found it intolerable. They are also useful for a compromised barrier — over-exfoliated, over-treated skin that still needs gentle renewal while it recovers.",
          "They suit deeper skin tones well for the same reason they suit sensitive skin: less inflammation means less risk of post-inflammatory hyperpigmentation. For Fitzpatrick IV–VI skin nervous about acids, a PHA is a far lower-risk introduction than a glycolic peel.",
          "The trade-off is honest: results come more slowly. If your skin tolerates glycolic acid comfortably and you want faster resurfacing, an AHA will get you there sooner. PHAs are about making exfoliation possible for skin that otherwise could not have it.",
        ],
      },
    ],
    clinicRelevance:
      "We stock NeoStrata at Star Aesthetic Centre, and PHA-based products are what Dr. Bangalee reaches for when a patient's skin is too reactive for conventional acids — rosacea, a damaged barrier, or a history of irritation and subsequent pigmentation. They are also useful as a step-down after a course of in-clinic peels, maintaining smoothness without over-treating skin that has already had plenty.",
    faq: [
      {
        q: "Are PHAs less effective than AHAs?",
        a: "They work more gradually rather than less effectively. For sensitive skin the comparison is academic — an AHA that causes irritation and pigmentation is not the more effective choice for that person, whatever it does in a laboratory.",
      },
      {
        q: "Can I use a PHA every day?",
        a: "Most people can, which is one of the advantages. Start at three or four times a week, and move to daily if your skin remains comfortable.",
      },
      {
        q: "Can I use PHAs with retinol?",
        a: "Usually yes, and the combination is often better tolerated than retinol with glycolic acid. Introduce them one at a time and on alternate evenings at first, so you can tell which is responsible if something disagrees with you.",
      },
      {
        q: "Are they suitable for rosacea?",
        a: "PHAs are among the few exfoliants generally tolerated by rosacea-prone skin, but rosacea is a medical condition and warrants a proper consultation before adding any active.",
      },
    ],
    relatedTerms: ["glycolic-acid", "salicylic-acid", "ceramides", "niacinamide"],
  },

  {
    slug: "retinaldehyde",
    term: "Retinaldehyde",
    category: "ingredient",
    shortDescription:
      "Retinaldehyde sits between retinol and prescription tretinoin in the vitamin A family. It converts to active retinoic acid in a single step rather than two, making it markedly more potent than retinol while remaining better tolerated than prescription strength.",
    matchTerms: ["retinaldehyde", "retinal"],
    title: "What is Retinaldehyde? The Retinoid Between Retinol and Tretinoin | Star Aesthetic Centre",
    metaDescription:
      "Retinaldehyde explained: why one conversion step instead of two makes it stronger than retinol, how it compares to prescription tretinoin, and how Dr. Bangalee uses Dermaceutic retinoids in Durban North.",
    keywords: [
      "what is retinaldehyde",
      "retinal vs retinol",
      "retinaldehyde benefits",
      "dermaceutic retinol",
      "strongest retinoid without prescription",
      "retinaldehyde south africa",
      "anti ageing durban north",
      "vitamin A skincare",
    ],
    heroLine:
      "Retinaldehyde is the step up most people should take before considering prescription strength — one conversion away from active retinoic acid instead of two, which makes it several times more potent than retinol without the adjustment period tretinoin demands.",
    sections: [
      {
        heading: "Where retinaldehyde sits in the retinoid family",
        paragraphs: [
          "Every retinoid ultimately has to become retinoic acid to do anything, because that is the only form the skin's receptors recognise. What separates the members of the family is how many enzymatic conversions that takes, and each conversion loses potency.",
          "Retinyl esters are the weakest, needing three steps. Retinol needs two. Retinaldehyde needs one. Prescription tretinoin is retinoic acid already and needs none. The practical consequence: retinaldehyde is meaningfully stronger than retinol at the same concentration, while remaining gentler than tretinoin — which is why it occupies such a useful middle ground, and why Dermaceutic built much of its range around it.",
        ],
      },
      {
        heading: "What it does",
        paragraphs: [
          "The effects are the retinoid effects, delivered more efficiently: accelerated cell turnover so dull surface cells shed and fresh skin arrives sooner; stimulation of fibroblasts to lay down new collagen; inhibition of the enzymes that break existing collagen down; and reduced melanin production, which fades pigmentation and post-inflammatory marks.",
          "Retinaldehyde also carries antibacterial activity against Cutibacterium acnes, the organism involved in acne, which retinol does not to the same degree. That makes it a particularly sensible choice where ageing and breakouts coexist — a combination that becomes common from the mid-thirties onwards and is often treated as though it were one problem or the other.",
        ],
      },
      {
        heading: "Tolerating it",
        paragraphs: [
          "Everything true of retinoids generally is true here, slightly amplified. Expect an adjustment period of several weeks with some dryness and flaking. Start twice a week, at night, on completely dry skin, and build frequency only once your skin settles. Buffering — applying moisturiser first, then the retinoid — takes the edge off without wasting the product.",
          "For Fitzpatrick IV–VI skin the caution is the familiar one: irritation risks post-inflammatory hyperpigmentation, so building slowly is not timidity but strategy. Retinoids are contraindicated in pregnancy and breastfeeding, and should not be combined with oral isotretinoin.",
          "Daily broad-spectrum SPF 50+ the following morning is mandatory. A retinoid accelerates cell turnover, leaving newer skin at the surface; unprotected UV exposure undoes the collagen benefit you are paying for.",
        ],
      },
    ],
    clinicRelevance:
      "Dermaceutic is one of the core brands on our shelves at Star Aesthetic Centre, and retinaldehyde is the active Dr. Bangalee most often steps patients up to when retinol has been tolerated but results have plateaued. It also does useful work alongside in-clinic peels, maintaining renewal between appointments. Which strength, and how quickly to build it, is decided against your skin type and history rather than from a standard chart.",
    faq: [
      {
        q: "Is retinaldehyde stronger than retinol?",
        a: "Yes — it needs only one conversion to reach active retinoic acid rather than two, so more of what you apply becomes active. Expect a stronger effect and a slightly more demanding adjustment period at equivalent concentrations.",
      },
      {
        q: "Should I use retinaldehyde or prescription tretinoin?",
        a: "Retinaldehyde is the sensible middle rung: stronger than retinol, more tolerable than tretinoin. Tretinoin is a prescription medicine and appropriate for some patients, which is a decision for consultation rather than a shelf.",
      },
      {
        q: "How long until I see results?",
        a: "Texture and brightness usually shift within four to six weeks. Collagen changes and fine lines take three to six months of consistent use — retinoids reward persistence rather than intensity.",
      },
      {
        q: "Can I use it with vitamin C?",
        a: "Yes, at opposite ends of the day. Antioxidant serum in the morning, retinoid at night. Together they irritate more without achieving more.",
      },
    ],
    relatedTerms: ["retinol", "vitamin-c", "salicylic-acid", "niacinamide", "glycolic-acid"],
  },
];
