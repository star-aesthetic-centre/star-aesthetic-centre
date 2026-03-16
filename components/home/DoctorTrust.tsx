import Link from "next/link";
import Image from "next/image";

const credentials = [
 "MBChB · University of Natal",
 "Aesthetic Medicine Specialist",
 "Member: SAMA · ACASA",
 "15+ Years Clinical Experience",
];

export default function DoctorTrust() {
 return (
 <section className="bg-white py-24">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

 {/* ── Left: Doctor image ──────────────────────── */}
 <div className="group relative mx-auto w-full max-w-md lg:max-w-none">

 {/* Image frame */}
 <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F7F8] shadow-xl">
 <Image
  src="https://star-aesthetic-centre.local/wp-content/uploads/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp"
  alt="Dr. Rajeev Bangalee — Director of Star Aesthetic Centre Durban"
  fill
  unoptimized
  className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
 />

 {/* Experience badge */}
 <div className="absolute bottom-4 right-4 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
 <p className="font-heading text-2xl font-bold text-[#939EBA]">15+</p>
 <p className="text-[10px] font-medium text-[#636374]">Years Experience</p>
 </div>
 </div>
 </div>

 {/* ── Right: Copy ─────────────────────────────── */}
 <div>
 <div className="mb-6 flex items-center gap-3">
 <span className="h-px w-8 bg-[#939EBA]" />
 <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
 Meet Your Doctor
 </span>
 </div>

 <h2 className="font-heading text-4xl font-bold sm:text-5xl">
 Dr. Rajeev
 <br />Bangalee
 </h2>
 <p className="mt-1.5 text-lg font-medium text-[#939EBA]">
 GP · Aesthetic Medicine Specialist
 </p>

 {/* Quote block */}
 <blockquote className="my-8 border-l-4 border-[#939EBA] pl-6">
 <p className="text-base italic leading-relaxed text-[#636374]">
 "My goal is simple — to help you look naturally radiant and feel
 beautifully you. Every treatment is customised, every product
 carefully chosen."
 </p>
 </blockquote>

 <p className="mb-8 text-sm leading-relaxed text-[#636374]">
 A qualified GP with specialisation in Aesthetic Medicine,
 Dr. Bangalee brings clinical precision and an artistic eye to every
 consultation. Based in Durban North, he personally recommends every
 treatment and product at Star Aesthetic Centre.
 </p>

 {/* Credential grid */}
 <div className="mb-10 grid grid-cols-2 gap-2.5">
 {credentials.map((c) => (
 <div
 key={c}
 className="flex items-center gap-2.5 border border-[#E2E2E6] bg-[#F7F7F8] px-4 py-3"
 >
 <span className="h-1.5 w-1.5 shrink-0 bg-[#939EBA]" />
 <span className="text-xs font-medium text-[#636374]">{c}</span>
 </div>
 ))}
 </div>

 <Link
 href="/dr-rajeev-bangalee"
 className="inline-flex items-center gap-2.5 border border-[#939EBA] px-8 py-3.5 text-sm font-semibold text-[#939EBA] transition-all hover:bg-[#EEF0F6] hover:-translate-y-0.5"
 >
 About Dr. Bangalee
 <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
 <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </Link>
 </div>
 </div>
 </div>
 </section>
 );
}
