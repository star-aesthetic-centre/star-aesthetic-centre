import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import type { Metadata } from "next";
import treatmentsData from "@/lib/data/treatments.json";

const WP = "https://star-aesthetic-centre.local/wp-content/uploads";

export const metadata: Metadata = {
 title: "Treatments | Star Aesthetic Centre",
 description:
 "Explore our full range of doctor-led aesthetic treatments — from medical skin treatments and injectables to health & wellness programmes and body treatments.",
};

const treatmentCategories = [
 {
 slug: "medical-skin",
 name: "Medical Skin Treatments",
 treatments: [
 { slug: "acne", image: `${WP}/acne-scarring-treatment-durban-north.webp` },
 { slug: "pigmentation", image: `${WP}/pigmentation-melasma-treatment-durban.webp` },
 { slug: "skin-peel", image: `${WP}/chemical-skin-peel-rejuvenation.webp` },
 { slug: "dermapen-microneedling", image: `${WP}/dermapen-microneedling-skin-renewal.webp` },
 ],
 },
 {
 slug: "injectables",
 name: "Injectables & Facial Aesthetics",
 treatments: [
 { slug: "botox", image: `${WP}/botox-anti-aging-injections-durban.webp` },
 { slug: "lip-filler", image: `${WP}/lip-filler-augmentation-durban-north.webp` },
 { slug: "jaw-chin-contouring", image: `${WP}/jaw-chin-contouring-filler-durban.webp` },
 ],
 },
 {
 slug: "health-wellness",
 name: "Health & Wellness Programmes",
 treatments: [
 { slug: "vitamin-drips", image: `${WP}/vitamin-drip-iv-therapy-wellness.webp` },
 { slug: "medi-lean", image: `${WP}/medi-lean-weight-loss-diet-program.webp` },
 { slug: "excessive-sweating", image: `${WP}/excessive-sweating-hyperhidrosis-treatment.webp` },
 ],
 },
 {
 slug: "body",
 name: "Body Treatments",
 treatments: [
 { slug: "body-contouring", image: `${WP}/body-contouring-fat-reduction-durban.webp` },
 { slug: "varicose-veins", image: `${WP}/varicose-vein-removal-sclerotherapy.webp` },
 ],
 },
];

// Combine the static image/category data with the rich JSON data
const allTreatments = treatmentCategories.flatMap((cat) =>
 cat.treatments.map((t) => {
 const richData = treatmentsData.find((jsonItem: any) => jsonItem.slug === t.slug);
 return {
 ...t,
 categoryName: cat.name,
 categorySlug: cat.slug,
 title: richData?.title || t.slug,
 quickSummary: richData?.quickSummary || "",
 priceFrom: richData?.priceFrom || "",
 };
 })
);

export default function TreatmentsPage() {
 return (
 <div className="bg-[#F7F7F8] min-h-screen">
 <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

 {/* Breadcrumbs */}
 <nav className="mb-6 flex items-center gap-2 text-xs text-[#636374]">
 <Link href="/" className="transition-colors hover:text-[#939EBA]">Home</Link>
 <span className="text-[#E2E2E6]">›</span>
 <span className="text-[#1A1A1F] font-semibold">Treatments</span>
 </nav>

 {/* Page Heading */}
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
 <div className="max-w-2xl">
 <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1A1F] mb-4">
 Expert Treatments
 </h1>
 <p className="text-lg text-[#636374] leading-relaxed">
 Every treatment at Star Aesthetic Centre is personally recommended by Dr. Rajeev Bangalee — a qualified GP and Aesthetic Medicine specialist with 15+ years of experience.
 </p>
 </div>
 <div>
 <a
 href="#book"
 className="inline-flex items-center justify-center bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#7A87A6] shadow-sm"
 >
 Book Consultation
 </a>
 </div>
 </div>

 <div className="flex flex-col lg:flex-row gap-8">

 {/* Sidebar */}
 <aside className="w-full lg:w-72 shrink-0">
 <div className="sticky top-24 uk-card-default bg-white p-6 border border-[#E2E2E6]">
 <div className="mb-6">
 <h3 className="font-heading text-xl font-bold text-[#1A1A1F] mb-1">Categories</h3>
 <p className="text-sm text-[#636374]">Filter by treatment type</p>
 </div>

 <div className="flex flex-col gap-2">
 <div className="flex items-center gap-3 px-4 py-3 bg-[#EEF0F6] text-[#939EBA] cursor-pointer transition-colors">
 <span className="text-sm font-bold">All Services</span>
 </div>

 {treatmentCategories.map((cat) => (
 <div key={cat.slug} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F7F7F8] text-[#636374] cursor-pointer transition-colors">
 <span className="text-sm font-medium">{cat.name}</span>
 </div>
 ))}
 </div>

 </div>
 </aside>

 {/* Main Content Area */}
 <div className="flex-1">
 <div className="flex items-center justify-between mb-6">
 <h3 className="font-heading text-2xl font-bold text-[#1A1A1F]">Available Treatments ({allTreatments.length})</h3>
 </div>

 {/* Service Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

 {allTreatments.map((treatment) => (
 <div key={treatment.slug} className="group flex flex-col bg-white overflow-hidden border border-[#E2E2E6] uk-card-default transition-all hover:border-[#939EBA] pb-2">

 <div className="relative h-48 w-full overflow-hidden bg-[#EEF0F6]">
 <Image
 src={treatment.image}
 alt={treatment.title}
 fill
 unoptimized={true}
 className="object-cover transition-transform duration-500 group-hover:scale-105"
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
 </div>

 <div className="p-6 flex flex-col flex-1">
 <div className="flex justify-between items-start mb-4 gap-2">
 <span className="inline-block px-3 py-1 bg-[#EEF0F6] text-[#939EBA] text-[10px] font-bold uppercase tracking-wider ">
 {treatment.categoryName}
 </span>
 </div>

 <h4 className="font-heading text-[#1A1A1F] text-xl font-bold mb-3 leading-tight">
 {treatment.title}
 </h4>

 <p className="text-[#636374] text-sm line-clamp-3 mb-6 leading-relaxed">
 {treatment.quickSummary}
 </p>

 <div className="mt-auto flex gap-3 pt-4 border-t border-[#E2E2E6]/50">
 <Link
 href={`/treatments/${treatment.categorySlug}/${treatment.slug}`}
 className="flex-1 flex items-center justify-center bg-[#939EBA] text-white text-sm font-semibold h-11 hover:bg-[#7A87A6] transition-colors"
 >
 Learn More
 </Link>
 <Link
 href={`/treatments/${treatment.categorySlug}/${treatment.slug}`}
 className="flex items-center justify-center px-4 bg-[#F7F7F8] text-[#1A1A1F] hover:bg-[#E2E2E6] transition-colors"
 aria-label="View details"
 >
 <Eye size={18} className="text-[#636374]" />
 </Link>
 </div>
 </div>

 </div>
 ))}

 </div>
 </div>
 </div>

 </main>
 </div>
 );
}
