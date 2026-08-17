import { TREATMENT_CARDS, type TreatmentCardItem } from "@/lib/treatment-cards";

/**
 * The three treatment groups, matching the Treatments dropdown exactly:
 * Face, Skin, Body & Wellness. The homepage and the /treatments pillar page
 * both render from here, so the menu and the two pages can never disagree.
 *
 * Dr. Bangalee's brief grouped these as Injectables / Skin & Hair / Medical
 * Services. Those are kept as the group descriptions rather than the headings,
 * because the headings have to match the navigation a patient just clicked.
 */

export interface GroupedTreatment {
  name: string;
  /** Present when a real treatment page exists. */
  card?: TreatmentCardItem;
  /**
   * Unpublished treatments stay in this file rather than being deleted, so
   * they can be switched back on in one edit once Nakita confirms what the
   * clinic actually offers. `published: false` hides them from every grid.
   */
  published?: boolean;
  note?: string;
}

export interface TreatmentGroup {
  key: string;
  title: string;
  blurb: string;
  items: GroupedTreatment[];
}

const bySlug = (slug: string) => TREATMENT_CARDS.find((c) => c.slug === slug);

const ALL_GROUPS: TreatmentGroup[] = [
  {
    key: "injectables",
    title: "Injectables",
    blurb:
      "Injectables. Every one is personally assessed and performed by Dr. Bangalee, with dosing and placement planned around your anatomy.",
    items: [
      { name: "Anti-Wrinkle Treatment", card: bySlug("anti-wrinkle-treatment") },
      { name: "Lip Fillers", card: bySlug("lip-filler") },
      { name: "Jaw & Chin Contouring", card: bySlug("jaw-amp-chin-contouring") },
      { name: "Dermapen Microneedling", card: bySlug("dermapen-microneedling") },

      // Awaiting confirmation from the clinic — kept, not deleted. Flip
      // published to true (and add a card image) to bring one back.
      { name: "Dermal Fillers", published: false, note: "Assessed at consultation" },
      { name: "Skin Boosters", published: false, note: "Assessed at consultation" },
      { name: "Collagen Biostimulators", published: false, note: "Assessed at consultation" },
      { name: "Facial Thread Lift", published: false, note: "Assessed at consultation" },
    ],
  },
  {
    key: "skin-hair",
    title: "Skin & Hair",
    blurb:
      "Skin and hair. Assessed and planned by Dr. Bangalee; selected treatments may be performed by a trained assistant under his clinic protocols.",
    items: [
      { name: "Skin Peels", card: bySlug("skin-peel") },
      { name: "Pigmentation Treatment", card: bySlug("pigmentation-treatment") },
      { name: "Acne Treatment", card: bySlug("acne") },
      { name: "Excessive Sweating", card: bySlug("excessive-sweating") },

      { name: "Dermaplaning", published: false, note: "Assessed at consultation" },
      { name: "PRP & Hair Restoration", published: false, note: "Assessed at consultation" },
    ],
  },
  {
    key: "medical-services",
    title: "Medical Services",
    blurb:
      "Medical services. Doctor-led programmes that begin with a medical assessment rather than a treatment booking.",
    items: [
      { name: "Body Contouring", card: bySlug("body-contouring") },
      { name: "Medi-Lean Weight Loss", card: bySlug("medi-lean") },
      { name: "Varicose Veins", card: bySlug("varicose-veins") },
      { name: "Vitamin Drips", card: bySlug("vitamin-drips") },
    ],
  },
];

/** Published treatments only — what every public grid renders. */
export const TREATMENT_GROUPS: TreatmentGroup[] = ALL_GROUPS.map((g) => ({
  ...g,
  items: g.items.filter((i) => i.published !== false),
}));

/** Including unpublished, for admin or future use. */
export const ALL_TREATMENT_GROUPS = ALL_GROUPS;
