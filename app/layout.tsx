import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { SITE_URL, DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_LOCALE } from "@/lib/seo";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/shop/CartDrawer";
import CookieConsent from "@/components/layout/CookieConsent";
import { NikiProvider } from "@/components/niki/NikiProvider";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto-condensed",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Star Aesthetic Centre",
        default: "Star Aesthetic Centre — Dr. Rajeev Bangalee, Durban North",
    },
    description:
        "Doctor-led aesthetic treatments and curated medical skincare in Durban North. Botox, fillers, skin peels, microneedling & more — by Dr. Rajeev Bangalee (MB, BS).",
    metadataBase: new URL(SITE_URL),
    keywords: DEFAULT_KEYWORDS,
    alternates: { canonical: SITE_URL },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        type: "website",
        title: "Star Aesthetic Centre — Dr. Rajeev Bangalee, Durban North",
        description: "Doctor-led aesthetic treatments and curated medical skincare in Durban North. Botox, fillers, skin peels, microneedling & more.",
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Star Aesthetic Centre — Doctor-led aesthetics in Durban North",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Star Aesthetic Centre — Dr. Rajeev Bangalee, Durban North",
        description: "Doctor-led aesthetic treatments and curated medical skincare in Durban North.",
        images: [DEFAULT_OG_IMAGE],
    },
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "name": "Star Aesthetic Centre",
    "alternateName": "Star Aesthetic Centre Durban North",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/star-aesthetic-centre-durban-logo-001.png`,
    "image": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "description": "Doctor-led aesthetic treatments and curated medical skincare in Durban North by Dr. Rajeev Bangalee (MB, BS). Botox, fillers, skin peels, microneedling and more.",
    "telephone": "+27315731325",
    "email": "info@staraesthetic.co.za",
    "priceRange": "R850–R2500",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "22 Ennisdale Drive",
        "addressLocality": "Durban North",
        "postalCode": "4051",
        "addressRegion": "KwaZulu-Natal",
        "addressCountry": "ZA",
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-29.7489",
        "longitude": "31.0047",
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "13:00",
        },
    ],
    "founder": {
        "@type": "Person",
        "name": "Dr. Rajeev Bangalee",
        "jobTitle": "Aesthetic Physician",
        "description": "MB, BS — HPCSA registered aesthetic medicine practitioner",
    },
    "medicalSpecialty": "Aesthetic Medicine",
    "sameAs": [
        "https://instagram.com/staraesthetic",
        "https://facebook.com/staraesthetic",
    ],
    "knowsAbout": [
        "Botox", "Lip Fillers", "Dermal Fillers", "Dermapen Microneedling",
        "Skin Peels", "Pigmentation Treatment", "Excessive Sweating Treatment",
        "Body Contouring", "Vitamin Drips", "Varicose Vein Treatment",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-ZA" className={`${roboto.variable} ${robotoCondensed.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body suppressHydrationWarning className="antialiased bg-white text-[#696969] text-[15px] font-[family-name:var(--font-roboto)] font-light leading-[1.6]">
                <CartProvider>
                    <NikiProvider>
                        <SiteNav />
                        <CartDrawer />
                        <main>{children}</main>
                        <Footer />
                        <CookieConsent />
                    </NikiProvider>
                </CartProvider>
            </body>
        </html>
    );
}
