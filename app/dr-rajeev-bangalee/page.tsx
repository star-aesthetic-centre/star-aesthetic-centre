import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  MapPin,
  Users,
  Stethoscope,
  Star,
  ChevronRight,
  Camera,
  FileText,
  Heart,
  Shield,
  Clock,
} from "lucide-react";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = buildPageMetadata({
  title: "Dr. Rajeev Bangalee | Aesthetic Medicine Specialist | Star Aesthetic Centre Durban",
  description:
    "Dr. Rajeev Bangalee — General Practitioner and Aesthetic Medicine Specialist with 15+ years of clinical experience. Director of Star Aesthetic Centre, Durban North. Botox, dermal fillers, skin peels, microneedling and more.",
  path: "/dr-rajeev-bangalee",
  ogType: "profile",
  ogImage: "/images/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp",
  keywords: [
    "Dr Rajeev Bangalee",
    "aesthetic doctor Durban North",
    "aesthetic medicine specialist Durban",
    "cosmetic doctor KwaZulu-Natal",
    "Botox doctor Durban",
    "dermal fillers Durban",
    "skin treatment Durban North",
    "Star Aesthetic Centre director",
    "GP aesthetic medicine Durban",
    "medical aesthetic clinic Durban North",
    "anti ageing treatment KwaZulu-Natal",
    "lip filler specialist Durban",
  ],
});

/* ─── JSON-LD Schemas ────────────────────────────────────────────────── */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Rajeev Bangalee",
  honorificPrefix: "Dr.",
  jobTitle: "General Practitioner & Aesthetic Medicine Specialist",
  description:
    "Dr. Rajeev Bangalee is the Director of Star Aesthetic Centre in Durban North, KwaZulu-Natal. A qualified GP specialising in Aesthetic Medicine with over 15 years of clinical experience in South Africa and the United Kingdom.",
  image:
    "/images/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp",
  url: `${SITE_URL}/dr-rajeev-bangalee`,
  worksFor: {
    "@type": "MedicalClinic",
    name: "Star Aesthetic Centre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durban North",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    medicalSpecialty: "Aesthetic Medicine",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of the Witwatersrand",
      address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressCountry: "ZA" },
    },
  ],
  memberOf: [
    { "@type": "Organization", name: "Durban Independent Practitioners Association" },
    { "@type": "Organization", name: "KZN Doctors Healthcare Coalition" },
    { "@type": "Organization", name: "South African Medical Association (SAMA)" },
    { "@type": "Organization", name: "Aesthetic and Cosmetic Association of South Africa (ACASA)" },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "MB, BS — Bachelor of Medicine and Bachelor of Surgery",
      credentialCategory: "Medical Degree",
      recognizedBy: { "@type": "Organization", name: "University of the Witwatersrand" },
      dateCreated: "2001",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Diploma in Aesthetic Medicine",
      credentialCategory: "Specialist Diploma",
      recognizedBy: {
        "@type": "Organization",
        name: "American Academy of Aesthetic Medicine (AAAM)",
      },
      dateCreated: "2012",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Clinical Management in Dermatology",
      credentialCategory: "Certificate",
      dateCreated: "2015",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What qualifications does Dr. Bangalee hold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Bangalee holds an MB, BS from the University of the Witwatersrand (2001), a Diploma in Aesthetic Medicine from the American Academy of Aesthetic Medicine (2012), and a Clinical Management in Dermatology certificate (2015). He is a member of SAMA, ACASA, the Durban Independent Practitioners Association, and the KZN Doctors Healthcare Coalition.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dr. Bangalee a qualified medical doctor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dr. Bangalee is a fully qualified General Practitioner (GP) who has specialised in Aesthetic Medicine. All treatments at Star Aesthetic Centre are performed or directly overseen by a licensed medical professional, not a beauty therapist or unqualified practitioner.",
      },
    },
    {
      "@type": "Question",
      name: "How long has Dr. Bangalee been practising aesthetic medicine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Bangalee has over 15 years of clinical experience. After qualifying from Wits in 2001, he gained additional experience in the United Kingdom before returning to South Africa and establishing Star Aesthetic Centre in Durban North.",
      },
    },
    {
      "@type": "Question",
      name: "What aesthetic treatments does Dr. Bangalee offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Bangalee personally performs Botox, dermal fillers, lip augmentation, jaw and chin contouring, Dermapen microneedling, chemical skin peels, pigmentation treatment, acne treatment, varicose vein sclerotherapy, vitamin IV drips, body contouring, and medical weight loss programmes.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Star Aesthetic Centre located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Star Aesthetic Centre is located in Durban North, KwaZulu-Natal. The practice serves patients from Durban, Umhlanga, La Lucia, Ballito, and across the broader KZN region.",
      },
    },
    {
      "@type": "Question",
      name: "Does Dr. Bangalee offer a consultation before treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every patient journey begins with a thorough one-on-one consultation. Dr. Bangalee takes time to understand your goals, review your health history, and design a personalised treatment plan. There is no pressure and no one-size-fits-all approach.",
      },
    },
    {
      "@type": "Question",
      name: "What skincare brands does Dr. Bangalee recommend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Bangalee personally selects every product stocked at Star Aesthetic Centre. Current brands include Dermaceutic (pharmaceutical-grade skincare from France), Heliocare (advanced sun protection powered by Fernblock®), ISDIN, Mesoestetic, NeoStrata, and SkinCeuticals — all chosen for clinical efficacy and evidence-based results.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a consultation with Dr. Bangalee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a consultation by clicking the Book Now button on our website, or by contacting the practice directly. We offer flexible scheduling and aim to accommodate new patient enquiries promptly.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Dr. Rajeev Bangalee",
      item: `${SITE_URL}/dr-rajeev-bangalee`,
    },
  ],
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const stats = [
  { value: "15+", label: "Years of Clinical Experience" },
  { value: "2001", label: "Year of Graduation — Wits" },
  { value: "2012", label: "Aesthetic Medicine Diploma" },
  { value: "100%", label: "Personally Performed by Dr. Bangalee" },
];

const qualifications = [
  {
    year: "2001",
    degree: "MB, BS — Bachelor of Medicine & Surgery",
    institution: "University of the Witwatersrand, Johannesburg",
    icon: GraduationCap,
    note: "Graduated with distinction. Commenced General Practice.",
  },
  {
    year: "2001–2006",
    degree: "General Practice & Specialist Clinical Work",
    institution: "United Kingdom",
    icon: Stethoscope,
    note: "Extensive post-graduate clinical experience across NHS and private practices in the UK.",
  },
  {
    year: "2012",
    degree: "Diploma in Aesthetic Medicine",
    institution: "American Academy of Aesthetic Medicine (AAAM)",
    icon: Award,
    note: "Internationally recognised qualification in aesthetic medicine techniques and protocols.",
  },
  {
    year: "2015",
    degree: "Clinical Management in Dermatology",
    institution: "Dermatology Certification Programme",
    icon: Shield,
    note: "Certified in advanced dermatological diagnosis, treatment planning, and clinical skin management.",
  },
];

const affiliations = [
  "South African Medical Association (SAMA)",
  "Aesthetic & Cosmetic Association of South Africa (ACASA)",
  "Durban Independent Practitioners Association",
  "KZN Doctors Healthcare Coalition",
];

const treatments = [
  { label: "Botox & Anti-Ageing", href: "/treatments/face/botox", category: "Face" },
  { label: "Lip Fillers", href: "/treatments/face/lip-filler", category: "Face" },
  { label: "Jaw & Chin Contouring", href: "/treatments/face/jaw-amp-chin-contouring", category: "Face" },
  { label: "Dermapen Microneedling", href: "/treatments/face/dermapen-microneedling", category: "Skin" },
  { label: "Skin Peels", href: "/treatments/skin/skin-peel", category: "Skin" },
  { label: "Pigmentation Treatment", href: "/treatments/skin/pigmentation-treatment", category: "Skin" },
  { label: "Acne Treatment", href: "/treatments/skin/acne", category: "Skin" },
  { label: "Excessive Sweating", href: "/treatments/skin/excessive-sweating", category: "Skin" },
  { label: "Body Contouring", href: "/treatments/body-wellness/body-contouring", category: "Body & Wellness" },
  { label: "Medi-Lean Weight Loss", href: "/treatments/body-wellness/medi-lean", category: "Body & Wellness" },
  { label: "Varicose Vein Treatment", href: "/treatments/body-wellness/varicose-veins", category: "Body & Wellness" },
  { label: "Vitamin Drips", href: "/treatments/body-wellness/vitamin-drips", category: "Body & Wellness" },
];

const brands = [
  { name: "Dermaceutic", href: "/shop/brands/dermaceutic", tagline: "Pharmaceutical-grade French skincare", color: "#939EBA" },
  { name: "Heliocare", href: "/shop/brands/heliocare", tagline: "360° sun protection — Fernblock® powered", color: "#F47920" },
  { name: "ISDIN", href: "/shop/brands/isdin", tagline: "Dermatology-led science", color: "#0072BC" },
  { name: "SkinCeuticals", href: "/shop/brands/skinceuticals", tagline: "Advanced skincare — backed by science", color: "#C8A96E" },
];

const faqs = [
  {
    q: "What qualifications does Dr. Bangalee hold?",
    a: "Dr. Bangalee holds an MB, BS from the University of the Witwatersrand (2001), a Diploma in Aesthetic Medicine from the American Academy of Aesthetic Medicine (2012), and a Clinical Management in Dermatology certificate (2015). He is a member of SAMA, ACASA, the Durban Independent Practitioners Association, and the KZN Doctors Healthcare Coalition.",
  },
  {
    q: "Is Dr. Bangalee a qualified medical doctor?",
    a: "Yes. Dr. Bangalee is a fully qualified General Practitioner (GP) who has specialised in Aesthetic Medicine. All treatments at Star Aesthetic Centre are performed or directly overseen by a licensed medical professional — not a beauty therapist or unqualified practitioner. This distinction is critically important for patient safety.",
  },
  {
    q: "How long has Dr. Bangalee been practising aesthetic medicine?",
    a: "Dr. Bangalee has over 15 years of clinical experience. After graduating from Wits in 2001, he gained broad clinical experience in the United Kingdom before returning to South Africa and establishing Star Aesthetic Centre in Durban North.",
  },
  {
    q: "What aesthetic treatments does Dr. Bangalee personally perform?",
    a: "Dr. Bangalee personally performs Botox, dermal fillers, lip augmentation, jaw and chin contouring, Dermapen microneedling, chemical skin peels, pigmentation therapy, acne treatment, varicose vein sclerotherapy, vitamin IV drip infusions, body contouring, and medical weight loss (Medi-Lean) programmes.",
  },
  {
    q: "Where is Star Aesthetic Centre located?",
    a: "Star Aesthetic Centre is located in Durban North, KwaZulu-Natal, South Africa. The practice serves patients from Durban, Umhlanga, La Lucia, Ballito, and across the broader KZN region.",
  },
  {
    q: "Does Dr. Bangalee offer a consultation before any treatment?",
    a: "Absolutely. Every patient journey begins with a thorough one-on-one consultation. Dr. Bangalee takes time to understand your goals, assess your skin and general health, and design a personalised treatment plan. There is no pressure and no one-size-fits-all approach — your safety and natural results always come first.",
  },
  {
    q: "What skincare brands does Dr. Bangalee stock and recommend?",
    a: "Dr. Bangalee personally selects every product stocked at Star Aesthetic Centre. Current brands include Dermaceutic (pharmaceutical-grade skincare from France), Heliocare (advanced sun protection powered by Fernblock®), ISDIN, Mesoestetic, NeoStrata, and SkinCeuticals — all chosen for clinical efficacy, safety, and evidence-based results.",
  },
  {
    q: "How do I book a consultation with Dr. Bangalee?",
    a: "You can book a consultation by clicking the Book Now button on our website, or by contacting the practice directly by phone. We offer flexible scheduling and do our best to accommodate new patient enquiries as quickly as possible.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function DrBangaleePage() {
  const WP = "/images";

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white">

        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[93vh] overflow-hidden bg-[#0F2647]">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid min-h-[93vh] grid-cols-1 items-center gap-0 lg:grid-cols-2">

              {/* Left copy */}
              <div className="py-16 lg:py-24 lg:pr-12">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-white/40">
                  <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                  <ChevronRight size={12} />
                  <span className="text-white/70">Dr. Rajeev Bangalee</span>
                </nav>

                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#939EBA]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                    Meet the Director
                  </span>
                </div>

                <h1 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-bold uppercase leading-[1.08] tracking-wide text-white">
                  DR. RAJEEV <span className="text-[#939EBA]">BANGALEE</span>
                </h1>

                <p className="mt-4 text-base font-medium text-white/70">
                  MB, BS · Aesthetic Medicine Specialist · Durban North
                </p>

                <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                  A qualified GP with 15+ years of clinical experience in South Africa and the UK.
                  Every treatment at Star Aesthetic Centre is personally performed by Dr. Bangalee.
                </p>

                {/* Credential pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {["GP · 15+ Years", "Wits Graduate 2001", "Aesthetic Med Diploma 2012", "Durban North"].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium text-white/70"
                      >
                        {pill}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 bg-[#939EBA] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
                  >
                    Book a Consultation
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/treatments"
                    className="inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    View All Treatments
                  </Link>
                </div>
              </div>

              {/* Right: photo — desktop only */}
              <div className="relative hidden h-full items-center justify-center lg:flex">
                <div className="relative w-[340px]">
                  <Image
                    src={`${WP}/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp`}
                    alt="Dr. Rajeev Bangalee — Director and Aesthetic Medicine Specialist at Star Aesthetic Centre, Durban North"
                    width={340}
                    height={460}
                    unoptimized
                    priority
                    className="object-cover object-top shadow-2xl"
                  />
                  {/* Experience badge */}
                  <div className="absolute bottom-6 left-6 border border-[#939EBA]/30 bg-[#0F2647]/90 px-5 py-4 backdrop-blur-sm">
                    <p className="font-heading text-3xl font-bold text-[#939EBA]">15+</p>
                    <p className="text-[11px] font-medium text-white/60">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STATS STRIP ──────────────────────────────────────── */}
        <section className="border-b border-[#E5E4E0] bg-[#F8F8F7]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-[#E5E4E0] lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.value} className="px-6 py-8 text-center">
                  <p className="font-heading text-3xl font-bold text-[#1B3D6E]">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-[#6B6966]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. BIOGRAPHY ─────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">

              {/* Left: primary photo */}
              <div className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F2F1EF] shadow-lg">
                  <Image
                    src={`${WP}/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp`}
                    alt="Dr. Rajeev Bangalee — General Practitioner and Aesthetic Medicine Specialist"
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                    <p className="text-sm font-semibold text-white">Dr. Rajeev Bangalee</p>
                    <p className="text-xs text-white/70">Director · Star Aesthetic Centre</p>
                  </div>
                </div>
                <p className="text-center text-xs text-[#6B6966]">
                  Dr. Bangalee at Star Aesthetic Centre, Durban North
                </p>
              </div>

              {/* Right: bio text */}
              <div className="flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#939EBA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                    Biography
                  </span>
                </div>

                <h2 className="font-heading text-3xl font-bold text-[#1A1917] sm:text-4xl">
                  A Doctor Who Takes Aesthetics Seriously
                </h2>

                <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[#6B6966]">
                  <p>
                    Dr. Rajeev Bangalee is the founder and director of Star Aesthetic Medical Centre in Durban North,
                    KwaZulu-Natal. He is a qualified General Practitioner who has dedicated his post-graduate career
                    to the science — and the art — of aesthetic medicine.
                  </p>
                  <p>
                    After completing his MB, BS at the University of the Witwatersrand in 2001, Dr. Bangalee pursued
                    extensive clinical experience in the United Kingdom, working across specialised fields and gaining
                    exposure to high standards of care and a broad patient base. This period abroad shaped his
                    disciplined, evidence-first approach to medicine.
                  </p>
                  <p>
                    Returning to South Africa, Dr. Bangalee formalised his aesthetic medicine training with a Diploma
                    from the American Academy of Aesthetic Medicine in 2012 — one of the most respected internationally
                    recognised qualifications in the field. He has since added certification in Clinical Management in
                    Dermatology, continuously expanding his skill set through local and international workshops and
                    conferences.
                  </p>
                  <p>
                    What sets Dr. Bangalee apart is not only his credentials — it is his philosophy. He believes that
                    every patient deserves a personalised plan, every product must be clinically vetted, and every result
                    should look natural. No cookie-cutter solutions. No unnecessary procedures. Just honest, medical-grade
                    care tailored to you.
                  </p>
                </div>

                {/* Philosophy quote */}
                <blockquote className="mt-10 border-l-4 border-[#939EBA] pl-6">
                  <p className="text-base italic leading-relaxed text-[#1A1917]">
                    "My goal is simple — to help you look naturally radiant and feel beautifully you.
                    Every treatment is customised, every product carefully chosen."
                  </p>
                  <footer className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#939EBA]">
                    — Dr. Rajeev Bangalee
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PHOTO GALLERY ─────────────────────────────────────── */}
        <section className="bg-[#F8F8F7] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#939EBA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                  Gallery
                </span>
                <span className="h-px w-8 bg-[#939EBA]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917]">Dr. Bangalee at Work</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6966]">
                A glimpse into Star Aesthetic Centre and the environment where exceptional care happens daily.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Photo 1 — Real */}
              <div className="group relative aspect-[3/4] overflow-hidden bg-[#E5E4E0] shadow-sm">
                <Image
                  src={`${WP}/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp`}
                  alt="Dr. Rajeev Bangalee — Aesthetic Medicine Specialist, Durban North"
                  fill
                  unoptimized
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">Dr. Bangalee</p>
                  <p className="text-xs text-white/70">Director, Star Aesthetic Centre</p>
                </div>
              </div>

              {/* Photo 2 — Dummy placeholder */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E4E0]">
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60">
                    <Camera size={28} className="text-[#939EBA]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1917]">Photo Coming Soon</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6966]">
                      Additional images of Dr. Bangalee will be added here.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#939EBA]/40 bg-white/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#636374]">
                    Placeholder
                  </span>
                </div>
              </div>

              {/* Photo 3 — Dummy placeholder */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EDECEA]">
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60">
                    <Camera size={28} className="text-[#939EBA]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1917]">Photo Coming Soon</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6966]">
                      Clinic and treatment room imagery will be added here.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#939EBA]/40 bg-white/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#636374]">
                    Placeholder
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. EDUCATION & QUALIFICATIONS ───────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-[#939EBA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                    Education & Training
                  </span>
                  <span className="h-px w-8 bg-[#939EBA]" />
                </div>
                <h2 className="font-heading text-3xl font-bold text-[#1A1917]">
                  Qualifications & Academic Background
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6966]">
                  A commitment to continuous learning and international clinical excellence.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative space-y-0">
                <div className="absolute left-[23px] top-0 h-full w-px bg-[#E5E4E0] sm:left-[31px]" />
                {qualifications.map((q, i) => {
                  const Icon = q.icon;
                  return (
                    <div key={i} className="relative flex gap-6 pb-10 sm:gap-8">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#E5E4E0] bg-white shadow-sm sm:h-16 sm:w-16">
                        <Icon size={20} className="text-[#1B3D6E]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 pb-2 pt-1">
                        <div className="mb-1 inline-block rounded-full bg-[#1B3D6E]/8 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1B3D6E]">
                          {q.year}
                        </div>
                        <h3 className="mt-1 text-base font-bold text-[#1A1917]">{q.degree}</h3>
                        <p className="mt-0.5 text-sm font-medium text-[#939EBA]">{q.institution}</p>
                        <p className="mt-2 text-sm leading-relaxed text-[#6B6966]">{q.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CERTIFICATIONS ────────────────────────────────────── */}
        <section className="bg-[#F8F8F7] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#939EBA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                  Certifications
                </span>
                <span className="h-px w-8 bg-[#939EBA]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917]">Professional Certifications</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B6966]">
                Dr. Bangalee holds internationally recognised certifications in Aesthetic Medicine and Clinical Dermatology.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">

              {/* Certificate 1 — AAAM Diploma */}
              <div className="relative overflow-hidden border-2 border-dashed border-[#939EBA]/30 bg-white p-8">
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-[#939EBA]/30 bg-[#F8F8F7] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#636374]">
                    Image Pending
                  </span>
                </div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-[#E5E4E0] bg-[#F2F1EF]">
                  <FileText size={28} className="text-[#939EBA]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-[#1A1917]">Diploma in Aesthetic Medicine</h3>
                <p className="mt-1 text-sm font-medium text-[#939EBA]">American Academy of Aesthetic Medicine (AAAM)</p>
                <p className="mt-2 text-xs text-[#6B6966]">Issued 2012 · Internationally recognised</p>
                <div className="mt-6 flex aspect-[4/3] items-center justify-center border border-[#E5E4E0] bg-[#F8F8F7]">
                  <div className="text-center">
                    <Camera size={24} className="mx-auto text-[#939EBA]/50" strokeWidth={1.5} />
                    <p className="mt-2 text-[11px] text-[#6B6966]">Certificate image will be uploaded here</p>
                  </div>
                </div>
              </div>

              {/* Certificate 2 — Dermatology */}
              <div className="relative overflow-hidden border-2 border-dashed border-[#939EBA]/30 bg-white p-8">
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-[#939EBA]/30 bg-[#F8F8F7] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#636374]">
                    Image Pending
                  </span>
                </div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-[#E5E4E0] bg-[#F2F1EF]">
                  <FileText size={28} className="text-[#939EBA]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-[#1A1917]">Clinical Management in Dermatology</h3>
                <p className="mt-1 text-sm font-medium text-[#939EBA]">Dermatology Certification Programme</p>
                <p className="mt-2 text-xs text-[#6B6966]">Issued 2015 · Advanced clinical certification</p>
                <div className="mt-6 flex aspect-[4/3] items-center justify-center border border-[#E5E4E0] bg-[#F8F8F7]">
                  <div className="text-center">
                    <Camera size={24} className="mx-auto text-[#939EBA]/50" strokeWidth={1.5} />
                    <p className="mt-2 text-[11px] text-[#6B6966]">Certificate image will be uploaded here</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 7. AFFILIATIONS ──────────────────────────────────────── */}
        <section className="border-y border-[#E5E4E0] bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6966]">
              Professional Memberships & Affiliations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {affiliations.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2.5 rounded-full border border-[#E5E4E0] bg-[#F8F8F7] px-5 py-2.5"
                >
                  <Shield size={13} className="shrink-0 text-[#1B3D6E]" strokeWidth={2} />
                  <span className="text-xs font-medium text-[#1A1917]">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. PHILOSOPHY ────────────────────────────────────────── */}
        <section className="bg-[#0F2647] py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Heart size={28} className="mx-auto mb-8 text-[#939EBA]" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              The Philosophy Behind Every Treatment
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65">
              Aesthetic medicine, done well, should never shout. Dr. Bangalee&apos;s approach is built on
              restraint, precision, and deep respect for each individual&apos;s natural features. The goal
              is never to change who you are — it is to help you look like the best, most refreshed version
              of yourself.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65">
              Every consultation starts with listening. Every treatment plan is tailored. Every product
              is personally evaluated and endorsed. There are no shortcuts at Star Aesthetic Centre —
              only honest, evidence-based medicine carried out with care.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-3">
              {[
                { icon: Stethoscope, title: "Medically Led", desc: "Every treatment performed by a qualified GP." },
                { icon: Star, title: "Natural Results", desc: "Enhance, never alter. Subtlety is always the goal." },
                { icon: Users, title: "Personalised Care", desc: "No two patients — or treatment plans — are alike." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="border border-white/8 bg-white/5 px-8 py-8 text-center backdrop-blur-sm"
                >
                  <Icon size={22} className="mx-auto mb-4 text-[#939EBA]" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. TREATMENTS CROSS-LINK ─────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#939EBA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                  Treatments
                </span>
                <span className="h-px w-8 bg-[#939EBA]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917]">
                Treatments Offered by Dr. Bangalee
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6966]">
                Every procedure below is personally performed by Dr. Bangalee — no delegation to assistants or
                non-medical staff.
              </p>
            </div>

            {(["Face", "Skin", "Body & Wellness"] as const).map((cat) => (
              <div key={cat} className="mb-10">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3D6E]">{cat}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {treatments
                    .filter((t) => t.category === cat)
                    .map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="group flex items-center justify-between border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3.5 transition-all hover:border-[#939EBA] hover:bg-white"
                      >
                        <span className="text-sm font-medium text-[#1A1917]">{t.label}</span>
                        <ChevronRight
                          size={14}
                          className="shrink-0 text-[#939EBA] transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    ))}
                </div>
              </div>
            ))}

            <div className="mt-6 text-center">
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 border border-[#1B3D6E] px-8 py-3.5 text-sm font-semibold text-[#1B3D6E] transition-all hover:bg-[#1B3D6E] hover:text-white"
              >
                View All Treatments
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 10. SHOP / BRANDS CROSS-LINK ─────────────────────────── */}
        <section className="bg-[#F8F8F7] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#939EBA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                  Skincare Shop
                </span>
                <span className="h-px w-8 bg-[#939EBA]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917]">
                Dr. Bangalee&apos;s Recommended Brands
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6966]">
                Every product stocked at Star Aesthetic Centre has been personally vetted and approved by
                Dr. Bangalee. Only clinically proven, evidence-based formulations make the cut.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {brands.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="group flex flex-col gap-3 border border-[#E5E4E0] bg-white p-6 transition-all hover:border-[#939EBA] hover:shadow-sm"
                >
                  <div
                    className="h-1 w-10 rounded-full transition-all group-hover:w-16"
                    style={{ backgroundColor: b.color }}
                  />
                  <p className="text-base font-bold text-[#1A1917]">{b.name}</p>
                  <p className="text-xs leading-relaxed text-[#6B6966]">{b.tagline}</p>
                  <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-[#1B3D6E]">
                    Shop {b.name} <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-[#939EBA] px-8 py-3.5 text-sm font-semibold text-[#636374] transition-all hover:bg-[#939EBA] hover:text-white"
              >
                Browse All Products
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 11. FAQ ───────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#939EBA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">FAQ</span>
                <span className="h-px w-8 bg-[#939EBA]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917]">Frequently Asked Questions</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B6966]">
                Everything you need to know about Dr. Bangalee, his qualifications, and how we can help you.
              </p>
            </div>

            <div className="divide-y divide-[#E5E4E0] border border-[#E5E4E0]">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-[#1A1917] transition-colors hover:bg-[#F8F8F7]">
                    <span>{faq.q}</span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#E5E4E0] bg-[#F2F1EF] text-[#939EBA] transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-[#E5E4E0] bg-[#F8F8F7] px-6 py-5">
                    <p className="text-sm leading-relaxed text-[#6B6966]">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. BOOK NOW CTA ─────────────────────────────────────── */}
        <section className="bg-[#0F2647] py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#939EBA]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                Get Started
              </span>
              <span className="h-px w-8 bg-[#939EBA]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to Meet Dr. Bangalee?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
              Book a one-on-one consultation and discover what a personalised, medically led aesthetic
              plan can do for you. No pressure. Just honest, expert advice.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#939EBA] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
              >
                Book a Consultation
                <ChevronRight size={15} />
              </Link>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Explore Treatments
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Contact the Practice
              </Link>
            </div>
            {/* Trust line */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-10 text-xs text-white/40">
              <span className="flex items-center gap-2">
                <MapPin size={12} /> Durban North, KwaZulu-Natal
              </span>
              <span className="flex items-center gap-2">
                <Clock size={12} /> 15+ Years Clinical Experience
              </span>
              <span className="flex items-center gap-2">
                <Shield size={12} /> Medically Qualified GP
              </span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
