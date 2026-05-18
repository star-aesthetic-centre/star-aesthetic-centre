import { MessageCircle, Phone } from "lucide-react";
import type { HomePageContent } from "@/lib/content/site-pages-types";

type Props = {
  content: HomePageContent["bookingCta"];
};

export default function BookingCTA({ content }: Props) {
 const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "27315731325";
 const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20a%20consultation%20at%20Star%20Aesthetic%20Centre.`;

 return (
 <section className="relative overflow-hidden bg-[#F7F7F8] py-24">

 {/* ── Decorative rings ──────────────────────────────────────── */}
 <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 border border-[#939EBA]/10" />
 <div className="pointer-events-none absolute -left-12 -top-12 h-72 w-72 border border-[#939EBA]/5" />
 <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 border border-[#939EBA]/10" />
 <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 border border-[#939EBA]/5" />

 <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

 {/* ── Left: Copy ─────────────────────────────────────────── */}
 <div>
 {/* Overline */}
 <div className="mb-6 flex items-center gap-3">
 <span className="h-px w-8 bg-[#939EBA]" />
 <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
 {content.overline}
 </span>
 </div>

 <h2 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
 {content.titleLine1}
 <br />
 <em className="not-italic text-[#939EBA]">{content.titleEmphasis}</em> today.
 </h2>

 <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#636374]">
 {content.body}
 </p>

 {/* Contact buttons */}
 <div className="mt-10 flex flex-col gap-3 sm:flex-row">
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2.5 bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#939EBA]/25 transition-all hover:-translate-y-0.5 hover:bg-[#7A87A6] hover:shadow-[#939EBA]/30 no-underline"
 >
 <MessageCircle size={16} />
 WhatsApp Us
 </a>
 <a
 href="tel:+27315731325"
 className="inline-flex items-center justify-center gap-2.5 border border-[#939EBA] px-8 py-4 text-sm font-semibold text-[#939EBA] transition-all hover:-translate-y-0.5 hover:bg-[#EEF0F6] no-underline"
 >
 <Phone size={16} />
 Call the Clinic
 </a>
 </div>

 {/* Trust note */}
 <p className="mt-6 text-xs text-[#636374]">
 ✓ No spam · We respond within 1 business hour · Durban North, KZN
 </p>
 </div>

 {/* ── Right: Contact card ─────────────────────────────────── */}
 <div className="uk-card uk-card-default">
 <div className="uk-card-body">
 <h3 className="font-heading text-[24px] font-bold m-0">
 Send us a message
 </h3>
 <p className="mt-1 text-sm text-[#636374]">
 We'll reach out to confirm your appointment.
 </p>

 <form className="mt-7 space-y-4">
 {/* Name */}
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-[#636374]">
 Your name
 </label>
 <input
 type="text"
 placeholder="e.g. Thandiwe Mokoena"
 className="w-full border border-[#E2E2E6] px-4 py-3 text-sm text-[#1A1A1F] placeholder-[#C0C9DD] outline-none transition-colors focus:border-[#939EBA] focus:ring-2 focus:ring-[#939EBA]/20"
 />
 </div>

 {/* Phone */}
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-[#636374]">
 Phone / WhatsApp
 </label>
 <input
 type="tel"
 placeholder="+27 XX XXX XXXX"
 className="w-full border border-[#E2E2E6] px-4 py-3 text-sm text-[#1A1A1F] placeholder-[#C0C9DD] outline-none transition-colors focus:border-[#939EBA] focus:ring-2 focus:ring-[#939EBA]/20"
 />
 </div>

 {/* Treatment select */}
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-[#636374]">
 Treatment of interest
 </label>
 <select className="w-full border border-[#E2E2E6] bg-white px-4 py-3 text-sm text-[#636374] outline-none transition-colors focus:border-[#939EBA] focus:ring-2 focus:ring-[#939EBA]/20">
 <option value="">Select a treatment…</option>
 <optgroup label="Medical Skin">
 <option>Acne &amp; Acne Scarring</option>
 <option>Pigmentation Treatment</option>
 <option>Skin Peel Treatment</option>
 <option>Dermapen Microneedling</option>
 </optgroup>
 <optgroup label="Injectables">
 <option>Botox Treatment</option>
 <option>Lip Filler Treatment</option>
 <option>Jaw &amp; Chin Contouring</option>
 </optgroup>
 <optgroup label="Health &amp; Wellness">
 <option>Vitamin Drips</option>
 <option>Medi Lean Weight Loss</option>
 <option>Excessive Sweating</option>
 </optgroup>
 <optgroup label="Body">
 <option>Body Contouring</option>
 <option>Varicose Veins</option>
 </optgroup>
 </select>
 </div>

 <button
 type="submit"
 className="w-full bg-[#939EBA] py-4 text-[15px] font-semibold text-white transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
 >
 Request Consultation →
 </button>
 </form>
 </div>
 </div>

 </div>
 </div>
 </section>
 );
}
