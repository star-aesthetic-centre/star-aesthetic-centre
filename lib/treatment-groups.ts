import { TREATMENT_CARDS, type TreatmentCardItem } from "@/lib/treatment-cards";

/**
 * The three homepage treatment groups, in the order and grouping Dr. Bangalee
 * specified: Injectables (7), Skin & Hair (6), Medical Services (3).
 *
 * Seven of the sixteen have no treatment page yet — dermal fillers, skin
 * boosters, collagen biostimulators, thread lift, dermaplaning, PRP and hair
 * restoration. Rather than link them to a 404 or invent a stock photo for a
 * treatment we have no image of, those render as compact enquiry cards in the
 * same visual family and route to /book. That keeps the counts Dr. Bangalee
 * asked for while every card still goes somewhere real.
 */

export interface GroupedTreatment {
  name: string;
  /** Present when a real treatment page exists. */
  card?: TreatmentCardItem;
  /** Shown on enquiry-only cards in place of the price line. */
  note?: string;
}

export interface TreatmentGroup {
  key: string;
  title: string;
  blurb: string;
  items: GroupedTreatment[];
}

const bySlug = (slug: string) => TREATMENT_CARDS.find((c) => c.slug === slug);

export const TREATMENT_GROUPS: TreatmentGroup[] = [
  {
    key: "injectables",
    title: "Injectables",
    blurb:
      "Every injectable treatment is personally assessed and performed by Dr. Bangalee, with dosing and placement planned around your anatomy.",
    items: [
      { name: "Anti-Wrinkle Injections", card: bySlug("anti-wrinkle-treatment") },
      { name: "Lip Filler", card: bySlug("lip-filler") },
      { name: "Dermal Fillers", note: "Assessed at consultation" },
      { name: "Jawline & Chin Contouring", card: bySlug("jaw-amp-chin-contouring") },
      { name: "Skin Boosters", note: "Assessed at consultation" },
      { name: "Collagen Biostimulators", note: "Assessed at consultation" },
      { name: "Facial Thread Lift", note: "Assessed at consultation" },
    ],
  },
  {
    key: "skin-hair",
    title: "Skin & Hair",
    blurb:
      "Assessed and planned by Dr. Bangalee. Selected skin treatments may be performed by a trained assistant under his clinic protocols.",
    items: [
      { name: "Dermapen® Microneedling", card: bySlug("dermapen-microneedling") },
      { name: "Professional Peels", card: bySlug("skin-peel") },
      { name: "Dermaplaning", note: "Assessed at consultation" },
      { name: "Pigmentation & Melasma", card: bySlug("pigmentation-treatment") },
      { name: "Medical Acne Care", card: bySlug("acne") },
      { name: "PRP & Hair Restoration", note: "Assessed at consultation" },
    ],
  },
  {
    key: "medical",
    title: "Medical Services",
    blurb:
      "Doctor-led programmes that begin with a medical assessment rather than a treatment booking.",
    items: [
      { name: "Hyperhidrosis", card: bySlug("excessive-sweating") },
      { name: "Medical Weight Management", card: bySlug("medi-lean") },
      { name: "Medically Assessed IV Nutrient Therapy", card: bySlug("vitamin-drips") },
    ],
  },
];
