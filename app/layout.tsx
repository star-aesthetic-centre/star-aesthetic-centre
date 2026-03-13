import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";

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
        default: "Star Aesthetic Centre — Dr. Rajeev Bangalee, Durban",
    },
    description:
        "Doctor-led aesthetic treatments and curated medical skincare — delivered with personalised care and effortless elegance. Durban North, KZN.",
    metadataBase: new URL("https://staraesthetic.co.za"),
    openGraph: {
        siteName: "Star Aesthetic Centre",
        locale: "en_ZA",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-ZA" className={`${roboto.variable} ${robotoCondensed.variable}`}>
            <body suppressHydrationWarning className="antialiased bg-white text-[#696969] text-[15px] font-[family-name:var(--font-roboto)] font-light leading-[1.6]">
                <SiteNav />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
