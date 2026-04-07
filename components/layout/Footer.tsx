import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const treatmentLinks = [
    { label: "Botox & Anti-Ageing", href: "/treatments/face/botox" },
    { label: "Lip Fillers", href: "/treatments/face/lip-filler" },
    { label: "Jaw & Chin Contouring", href: "/treatments/face/jaw-amp-chin-contouring" },
    { label: "Skin Peels", href: "/treatments/skin/skin-peel" },
    { label: "Pigmentation Treatment", href: "/treatments/skin/pigmentation-treatment" },
    { label: "Acne Treatment", href: "/treatments/skin/acne" },
    { label: "Vitamin Drips", href: "/treatments/body-wellness/vitamin-drips" },
    { label: "Body Contouring", href: "/treatments/body-wellness/body-contouring" },
];

const shopLinks = [
    { label: "Dermaceutic", href: "/shop/brands/dermaceutic" },
    { label: "Heliocare", href: "/shop/brands/heliocare" },
    { label: "ISDIN", href: "/shop/brands/isdin" },
    { label: "Mesoestetic", href: "/shop/brands/mesoestetic" },
    { label: "NeoStrata", href: "/shop/brands/neostrata" },
    { label: "SkinCeuticals", href: "/shop/brands/skinceuticals" },
];

export default function Footer() {
    return (
        <footer className="bg-[#F7F7F8] border-t border-[#E2E2E6]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/star-aesthetic-centre-durban-logo-001.png"
                                alt="Star Aesthetic Centre Durban"
                                width={200}
                                height={66}
                                unoptimized
                                className="h-auto w-[200px] object-contain"
                            />
                        </Link>
                        <p className="text-sm text-[#636374] leading-relaxed mb-6">
                            Doctor-led aesthetic treatments and curated medical skincare —
                            delivered with personalised care and effortless elegance.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://instagram.com/staraesthetic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center border border-[#E2E2E6] text-[#636374] transition-colors hover:border-[#939EBA] hover:text-[#939EBA]"
                                aria-label="Instagram"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="https://facebook.com/staraesthetic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center border border-[#E2E2E6] text-[#636374] transition-colors hover:border-[#939EBA] hover:text-[#939EBA]"
                                aria-label="Facebook"
                            >
                                <Facebook size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Treatments column */}
                    <div>
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-[#939EBA] mb-4">
                            Treatments
                        </h3>
                        <ul className="space-y-2.5">
                            {treatmentLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#636374] transition-colors hover:text-[#939EBA]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop column */}
                    <div>
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-[#939EBA] mb-4">
                            Shop by Brand
                        </h3>
                        <ul className="space-y-2.5">
                            {shopLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#636374] transition-colors hover:text-[#939EBA]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div>
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-[#939EBA] mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-[#636374]">
                                <MapPin size={15} className="mt-0.5 shrink-0 text-[#939EBA]" />
                                <span>Durban North, KwaZulu-Natal, South Africa</span>
                            </li>
                            <li>
                                <a
                                    href="tel:+27315731325"
                                    className="flex items-center gap-3 text-sm text-[#636374] transition-colors hover:text-[#939EBA]"
                                >
                                    <Phone size={15} className="shrink-0 text-[#939EBA]" />
                                    +27 (0)31 573 1325
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@staraesthetic.site"
                                    className="flex items-center gap-3 text-sm text-[#636374] transition-colors hover:text-[#939EBA]"
                                >
                                    <Mail size={15} className="shrink-0 text-[#939EBA]" />
                                    info@staraesthetic.site
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h4 className="text-xs font-semibold text-[#1A1A1F] mb-1">
                                Hours
                            </h4>
                            <p className="text-sm text-[#636374]">
                                Mon – Fri: 8:00 – 17:00
                                <br />
                                Sat: 8:00 – 13:00
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-[#E2E2E6] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#636374]">
                        © {new Date().getFullYear()} Star Aesthetic Centre · Dr. Rajeev Bangalee · All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-5">
                        <Link href="/legal/privacy-policy" className="text-xs text-[#636374] hover:text-[#939EBA] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/legal/terms-and-conditions" className="text-xs text-[#636374] hover:text-[#939EBA] transition-colors">
                            Terms &amp; Conditions
                        </Link>
                        <Link href="/legal/returns-policy" className="text-xs text-[#636374] hover:text-[#939EBA] transition-colors">
                            Returns Policy
                        </Link>
                        <Link href="/contact" className="text-xs text-[#636374] hover:text-[#939EBA] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}