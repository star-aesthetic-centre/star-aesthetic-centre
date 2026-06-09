import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, Clock, Star, Shield, Award, ChevronRight } from "lucide-react";
import ContactForm from "./ContactForm";
import { StaffLoginFooter } from "@/components/layout/StaffLoginFooter";
import { buildPageMetadata } from "@/lib/seo";
import { getSitePageContent } from "@/lib/queries/site-pages";

export async function generateMetadata(): Promise<Metadata> {
    const content = await getSitePageContent("contact");
    return buildPageMetadata({
        title: content.seo.title,
        description: content.seo.description,
        path: "/contact",
        keywords: [
            "contact star aesthetic centre",
            "book aesthetic consultation durban north",
            "dr rajeev bangalee contact",
            "aesthetic clinic durban north",
            "cosmetic treatment enquiry durban",
        ],
    });
}

const trustBadges = [
    { icon: Award, label: "MB, BS Qualified GP" },
    { icon: Star, label: "5★ Google Rated" },
    { icon: Shield, label: "HPCSA Registered" },
    { icon: Clock, label: "20+ Years Experience" },
];

export default async function ContactPage() {
    const content = await getSitePageContent("contact");
    const { hero, formIntro, doctorCard, contact, hours: hoursRows, testimonials } = content;
    const phoneTel = contact.phone.replace(/\D/g, "");
    const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27601230000").replace(/\D/g, "");
    const waUrl = `https://wa.me/${whatsappDigits.startsWith("27") ? whatsappDigits : `27${whatsappDigits}`}`;

    return (
        <>
            {/* ── Breadcrumb ── */}
            <nav aria-label="Breadcrumb" className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-[#6B6966]">
                    <Link href="/" className="hover:text-[#0F2647] transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <span className="text-[#1A1917]">Contact Us</span>
                </div>
            </nav>

            {/* ── Hero strip ── */}
            <section className="bg-[#0F2647] py-14 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-[#939EBA] mb-4">
                        {hero.overline}
                    </p>
                    <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4">
                        {hero.title}
                    </h1>
                    <p className="text-[#A8B4CC] text-base sm:text-lg max-w-xl mx-auto">
                        {hero.subtitle}
                    </p>

                    {/* Trust badges row */}
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        {trustBadges.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-2 border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-sm">
                                <Icon className="h-5 w-5 text-[#C8A882]" />
                                <span className="text-xs font-semibold text-white/80 text-center leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Main content ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                        {/* LEFT: Form + social proof */}
                        <div className="lg:col-span-3">

                            {/* Social proof — above form */}
                            <div className="mb-8 flex items-center gap-4 border-l-2 border-[#C8A882] pl-4">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#C8A882] text-[#C8A882]" />
                                    ))}
                                </div>
                                <p className="text-sm text-[#6B6966]">
                                    <span className="font-semibold text-[#1A1917]">5.0</span> on Google · Rated by our patients
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-heading text-2xl font-bold text-[#1A1917] mb-2">
                                    {formIntro.title}
                                </h2>
                                <p className="text-sm text-[#6B6966]">
                                    {formIntro.body}
                                </p>
                            </div>

                            {/* The form */}
                            <ContactForm />

                            {/* Testimonials — below form */}
                            <div className="mt-12 pt-10 border-t border-[#E5E4E0]">
                                <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-6">
                                    What Our Patients Say
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {testimonials.map((t) => (
                                        <div key={t.name} className="border border-[#E5E4E0] bg-[#F8F8F7] p-5">
                                            <div className="flex gap-0.5 mb-3">
                                                {[...Array(t.rating)].map((_, i) => (
                                                    <Star key={i} className="h-3.5 w-3.5 fill-[#C8A882] text-[#C8A882]" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-[#1A1917] leading-relaxed mb-4 italic">
                                                &ldquo;{t.text}&rdquo;
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-semibold text-[#1A1917]">{t.name}</p>
                                                    <p className="text-xs text-[#6B6966]">{t.location}</p>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#C8A882] font-semibold border border-[#E5E4E0] px-2 py-1">
                                                    {t.treatment}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact info + Dr. Bangalee + hours */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Dr. Bangalee trust card */}
                            <div className="bg-[#0F2647] p-6 text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-[#C8A882]">
                                        <Image
                                            src="/images/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-002.webp"
                                            alt="Dr. Rajeev Bangalee"
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-base leading-tight">Dr. Rajeev Bangalee</p>
                                        <p className="text-xs text-[#939EBA] mt-0.5">MB, BS · Aesthetic Medicine</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#A8B4CC] leading-relaxed">
                                    {doctorCard.body}
                                </p>
                                <Link
                                    href="/dr-rajeev-bangalee"
                                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C8A882] hover:text-white transition-colors"
                                >
                                    Meet the Doctor <ChevronRight size={12} />
                                </Link>
                            </div>

                            {/* Contact methods */}
                            <div className="border border-[#E5E4E0] p-6 space-y-5">
                                <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                                    Reach Us Directly
                                </h3>

                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#25D366] text-white">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">WhatsApp</p>
                                        <p className="text-sm font-semibold text-[#1A1917] group-hover:text-[#0F2647] transition-colors">
                                            {contact.whatsappNote}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:+27${phoneTel.replace(/^0/, "")}`}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E5E4E0] text-[#0F2647]">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">Phone</p>
                                        <p className="text-sm font-semibold text-[#1A1917] group-hover:text-[#0F2647] transition-colors">
                                            {contact.phoneDisplay}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E5E4E0] text-[#0F2647]">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">Email</p>
                                        <p className="text-sm font-semibold text-[#1A1917] group-hover:text-[#0F2647] transition-colors">
                                            {contact.email}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href="https://maps.google.com/?q=22+Ennisdale+Drive+Durban+North"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E5E4E0] text-[#0F2647]">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">Address</p>
                                        <p className="text-sm font-semibold text-[#1A1917] group-hover:text-[#0F2647] transition-colors leading-relaxed">
                                            {contact.addressLine1}<br />{contact.addressLine2}
                                        </p>
                                    </div>
                                </a>

                                <StaffLoginFooter className="!mt-0 !pt-5" />
                            </div>

                            {/* Hours */}
                            <div className="border border-[#E5E4E0] p-6">
                                <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-4">
                                    Consulting Hours
                                </h3>
                                <div className="space-y-2.5 text-sm">
                                    {hoursRows.map(({ day, hours }) => (
                                        <div key={day} className="flex justify-between items-center">
                                            <span className="text-[#6B6966]">{day}</span>
                                            <span className={`font-semibold ${hours === "Closed" ? "text-[#A9A8A4]" : "text-[#1A1917]"}`}>
                                                {hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs text-[#6B6966] bg-[#F8F8F7] p-3 border-l-2 border-[#C8A882]">
                                    Appointments are recommended. Walk-ins are welcome subject to availability.
                                </p>
                            </div>

                            {/* Book Now CTA */}
                            <a
                                href="https://www.staraesthetic.co.za/book"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-[#C8A882] text-center py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#A08060] transition-colors"
                            >
                                Book Online Now »
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Google Map ── */}
            <section className="h-[400px] w-full border-t border-[#E5E4E0]">
                <iframe
                    title="Star Aesthetic Centre — 22 Ennisdale Drive, Durban North"
                    src="https://maps.google.com/maps?q=22+Ennisdale+Drive,+Durban+North,+4051,+South+Africa&output=embed&z=16"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>

            {/* ── FAQ strip ── */}
            <section className="bg-[#F8F8F7] py-16 border-t border-[#E5E4E0]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-[#939EBA] text-center mb-3">
                        — Common Questions
                    </p>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A1917] text-center mb-10">
                        Before You Get in Touch
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                q: "Do I need a referral?",
                                a: "No referral is needed. You can contact us directly to book a consultation.",
                            },
                            {
                                q: "Is there a consultation fee?",
                                a: "Yes, a consultation fee applies and may be credited toward your treatment if you proceed within 30 days.",
                            },
                            {
                                q: "How quickly will you respond?",
                                a: "We aim to respond to all enquiries within 2 business hours during working hours.",
                            },
                            {
                                q: "Can I WhatsApp instead of calling?",
                                a: "Absolutely. WhatsApp is often the fastest way to reach us — tap the green button above.",
                            },
                            {
                                q: "Is parking available?",
                                a: "Yes, free parking is available on-site at 22 Ennisdale Drive, Durban North.",
                            },
                            {
                                q: "What should I bring to my first appointment?",
                                a: "A list of current medications, your medical aid details if applicable, and any skin concerns you'd like addressed.",
                            },
                        ].map(({ q, a }) => (
                            <div key={q} className="border border-[#E5E4E0] bg-white p-5">
                                <p className="font-semibold text-sm text-[#1A1917] mb-2">{q}</p>
                                <p className="text-sm text-[#6B6966] leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
