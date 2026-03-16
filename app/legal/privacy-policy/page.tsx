import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Privacy Policy | Star Aesthetic Centre Durban",
  description:
    "Privacy Policy for Star Aesthetic Centre — how we collect, use, and protect your personal and medical information in accordance with POPIA and HPCSA guidelines.",
  alternates: { canonical: "https://staraesthetic.co.za/legal/privacy-policy" },
  robots: { index: true, follow: true },
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const lastUpdated = "19 September 2025";
const effectiveDate = "19 September 2025";

const sections = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: [
      {
        type: "text",
        value:
          "Star Aesthetic Medical Centre (\"Star Aesthetic Centre\", \"we\", \"us\", or \"our\") is a medical aesthetic practice located at 22 Ennisdale Drive, Durban North, 4051, KwaZulu-Natal, South Africa.",
      },
      {
        type: "text",
        value:
          "We operate this website at staraesthetic.co.za and provide medical aesthetic treatments and pharmaceutical-grade skincare products under the direction of Dr. Rajeev Bangalee, a qualified General Practitioner and Aesthetic Medicine Specialist.",
      },
      {
        type: "text",
        value:
          "We are committed to protecting your privacy and handling your personal and medical information responsibly, in accordance with the Protection of Personal Information Act, 4 of 2013 (POPIA) and the Health Professions Council of South Africa (HPCSA) guidelines.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      {
        type: "text",
        value:
          "We collect different categories of information depending on how you interact with us:",
      },
      {
        type: "subheading",
        value: "Personal Information",
      },
      {
        type: "bullets",
        value: [
          "Full name, date of birth, and gender",
          "South African ID number or passport number",
          "Contact details: phone number, email address, and physical address",
          "Medical aid / health insurance details and membership numbers",
          "Payment information (processed securely — we do not store card details)",
        ],
      },
      {
        type: "subheading",
        value: "Medical & Health Information",
      },
      {
        type: "bullets",
        value: [
          "Medical history, current medications, and known allergies",
          "Treatment records, clinical notes, and consultation summaries",
          "Before-and-after photographs taken for clinical documentation purposes",
          "Informed consent records",
          "Adverse event or complication records",
        ],
      },
      {
        type: "subheading",
        value: "Website & Technical Information",
      },
      {
        type: "bullets",
        value: [
          "IP address and approximate geographic location",
          "Browser type, operating system, and device information",
          "Pages visited, time spent on pages, and referring URLs",
          "Cookie data and session identifiers (see our Cookie Policy below)",
        ],
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    content: [
      {
        type: "text",
        value: "We use your information only for legitimate, lawful purposes:",
      },
      {
        type: "subheading",
        value: "Primary Purposes (Medical Care)",
      },
      {
        type: "bullets",
        value: [
          "To provide medical aesthetic consultations, treatments, and follow-up care",
          "To maintain accurate and complete patient medical records as required by the HPCSA",
          "To schedule, confirm, and manage appointments",
          "To process payments and issue invoices or receipts",
          "To contact you regarding your care, results, or safety follow-ups",
          "To comply with legal and regulatory obligations under South African law",
        ],
      },
      {
        type: "subheading",
        value: "Secondary Purposes (with your consent)",
      },
      {
        type: "bullets",
        value: [
          "To send you newsletters, promotions, or information about new treatments and products",
          "To share before-and-after photographs on our website or social media (only with your explicit written consent)",
          "To conduct patient satisfaction surveys and improve our services",
          "To analyse website usage and improve the online experience",
        ],
      },
      {
        type: "text",
        value:
          "You may withdraw consent for secondary uses at any time by contacting us at info@staraesthetic.site. Withdrawal of consent will not affect the lawfulness of any processing carried out before the withdrawal.",
      },
    ],
  },
  {
    id: "sharing-information",
    title: "4. Sharing Your Information",
    content: [
      {
        type: "highlight",
        value:
          "We DO NOT sell, trade, or rent your personal information to third parties.",
      },
      {
        type: "text",
        value: "We may share your information only in the following limited circumstances:",
      },
      {
        type: "bullets",
        value: [
          "With other medical professionals involved in your care (e.g., referring doctors, specialists, or pharmacists) where clinically necessary and with your knowledge",
          "With trusted service providers who assist us in operating our practice (e.g., appointment booking systems, payment processors, accounting software) — these parties are contractually bound to keep your information confidential and may not use it for any other purpose",
          "With medical aids or insurers for the purposes of billing and authorisation, where applicable",
          "Where required by law, court order, or a regulatory or governmental authority",
          "In a medical emergency, where disclosure is necessary to protect your life or the life of another person",
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: [
      {
        type: "text",
        value:
          "We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These measures include:",
      },
      {
        type: "bullets",
        value: [
          "Encrypted data transmission (SSL/TLS) on our website",
          "Secure, access-controlled servers for storing digital records",
          "Role-based access controls — only authorised staff can access patient records",
          "Regular staff training on data privacy and information security",
          "Physical security measures at our premises",
        ],
      },
      {
        type: "text",
        value:
          "While we take every reasonable precaution, no method of electronic transmission or storage is 100% secure. We will notify you and the Information Regulator of South Africa promptly in the event of a data breach that is likely to affect your rights.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "6. How Long We Keep Your Information",
    content: [
      {
        type: "text",
        value:
          "We retain your information only for as long as is necessary for the purposes for which it was collected, or as required by law:",
      },
      {
        type: "table",
        value: [
          { category: "Patient medical records", period: "Minimum 6 years (HPCSA requirement)" },
          { category: "Minor patient records", period: "Until age 21 or 6 years post-treatment (whichever is longer)" },
          { category: "Financial & billing records", period: "5 years (SARS requirement)" },
          { category: "Consent forms & photographs", period: "Duration of care + 6 years" },
          { category: "Marketing communications", period: "Until you unsubscribe" },
          { category: "Website analytics data", period: "26 months" },
        ],
      },
      {
        type: "text",
        value:
          "Upon expiry of the applicable retention period, we will securely delete or anonymise your personal information.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights Under POPIA",
    content: [
      {
        type: "text",
        value:
          "As a data subject under the Protection of Personal Information Act (POPIA), you have the following rights:",
      },
      {
        type: "bullets",
        value: [
          "Right to access — you may request a copy of the personal information we hold about you",
          "Right to correction — you may request that inaccurate or incomplete information be corrected",
          "Right to deletion — you may request deletion of information where there is no longer a lawful basis to retain it (subject to our legal obligations as a medical practice)",
          "Right to object — you may object to the processing of your information for direct marketing purposes at any time",
          "Right to complain — you may lodge a complaint with the Information Regulator of South Africa",
        ],
      },
      {
        type: "text",
        value:
          "To exercise any of these rights, please contact us using the details below. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies & Website Tracking",
    content: [
      {
        type: "text",
        value:
          "Our website uses cookies — small text files placed on your device — to improve your browsing experience, remember your preferences, and analyse how visitors use the site.",
      },
      {
        type: "bullets",
        value: [
          "Essential cookies — required for the website to function (e.g., shopping cart, session management)",
          "Analytics cookies — help us understand how visitors use our site (e.g., Google Analytics)",
          "Marketing cookies — used to deliver relevant advertising (only with your consent)",
        ],
      },
      {
        type: "text",
        value:
          "You can manage or disable cookies through your browser settings at any time. Please note that disabling cookies may affect the functionality of certain parts of our website.",
      },
    ],
  },
  {
    id: "minors",
    title: "9. Children & Minors",
    content: [
      {
        type: "text",
        value:
          "We do not knowingly collect personal information from persons under the age of 18 through our website without the consent of a parent or legal guardian. Where a minor requires treatment, a parent or legal guardian must provide written consent prior to any consultation or procedure.",
      },
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: [
      {
        type: "text",
        value:
          "We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. When we make material changes, we will update the 'Last Updated' date at the top of this page and, where appropriate, notify patients directly.",
      },
      {
        type: "text",
        value:
          "We encourage you to review this policy periodically. Your continued use of our services after any changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "11. How to Contact Us",
    content: [
      {
        type: "text",
        value:
          "For any questions, concerns, or requests relating to this Privacy Policy or the handling of your personal information, please contact our Information Officer:",
      },
    ],
  },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">

      {/* ── Hero banner ──────────────────────────────────────────── */}
      <section className="border-b border-[#E5E4E0] bg-[#F8F8F7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#6B6966]">
            <Link href="/" className="hover:text-[#1B3D6E] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/legal" className="hover:text-[#1B3D6E] transition-colors">Legal</Link>
            <ChevronRight size={12} />
            <span className="text-[#1A1917]">Privacy Policy</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E5E4E0] bg-white">
              <Shield size={20} className="text-[#1B3D6E]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-[#1A1917] sm:text-4xl">
                Privacy Policy
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#6B6966]">
                <span>Effective: <strong className="text-[#1A1917]">{effectiveDate}</strong></span>
                <span>·</span>
                <span>Last updated: <strong className="text-[#1A1917]">{lastUpdated}</strong></span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B6966]">
                This policy explains how Star Aesthetic Medical Centre collects, uses, and protects your personal
                and medical information in accordance with the Protection of Personal Information Act (POPIA) and
                HPCSA guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">

          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">
                Contents
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]"
                  >
                    {s.title}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]"
                >
                  11. Contact Us
                </a>
              </nav>

              {/* Related legal links */}
              <div className="mt-10 border-t border-[#E5E4E0] pt-6">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">
                  Also Read
                </p>
                <nav className="space-y-1">
                  <Link
                    href="/legal/terms-and-conditions"
                    className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/legal/returns-policy"
                    className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]"
                  >
                    Returns Policy
                  </Link>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((block, i) => {
                    if (block.type === "text") {
                      return (
                        <p key={i} className="text-sm leading-relaxed text-[#6B6966]">
                          {block.value as string}
                        </p>
                      );
                    }
                    if (block.type === "subheading") {
                      return (
                        <h3 key={i} className="mt-6 mb-2 text-sm font-bold text-[#1A1917]">
                          {block.value as string}
                        </h3>
                      );
                    }
                    if (block.type === "highlight") {
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 border-l-4 border-[#1B3D6E] bg-[#F8F8F7] px-5 py-4"
                        >
                          <Shield size={16} className="mt-0.5 shrink-0 text-[#1B3D6E]" strokeWidth={2} />
                          <p className="text-sm font-semibold text-[#1A1917]">
                            {block.value as string}
                          </p>
                        </div>
                      );
                    }
                    if (block.type === "bullets") {
                      return (
                        <ul key={i} className="space-y-2 pl-1">
                          {(block.value as string[]).map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-[#6B6966]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "table") {
                      return (
                        <div key={i} className="overflow-hidden border border-[#E5E4E0]">
                          <table className="w-full text-sm">
                            <thead className="bg-[#F2F1EF]">
                              <tr>
                                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">
                                  Data Category
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">
                                  Retention Period
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E4E0]">
                              {(block.value as { category: string; period: string }[]).map(
                                (row, j) => (
                                  <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                                    <td className="px-5 py-3 font-medium text-[#1A1917]">
                                      {row.category}
                                    </td>
                                    <td className="px-5 py-3 text-[#6B6966]">{row.period}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            ))}

            {/* Contact section */}
            <section id="contact-details" className="scroll-mt-24">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Practice contact */}
                <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1B3D6E]">
                    Star Aesthetic Medical Centre
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:info@staraesthetic.site"
                      className="flex items-center gap-3 text-sm text-[#6B6966] transition-colors hover:text-[#1B3D6E]"
                    >
                      <Mail size={14} className="shrink-0 text-[#939EBA]" />
                      info@staraesthetic.site
                    </a>
                    <a
                      href="tel:+27315731325"
                      className="flex items-center gap-3 text-sm text-[#6B6966] transition-colors hover:text-[#1B3D6E]"
                    >
                      <Phone size={14} className="shrink-0 text-[#939EBA]" />
                      031 573 1325
                    </a>
                    <div className="flex items-start gap-3 text-sm text-[#6B6966]">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-[#939EBA]" />
                      22 Ennisdale Drive, Durban North, 4051
                    </div>
                  </div>
                </div>

                {/* Information Regulator */}
                <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1B3D6E]">
                    Information Regulator — South Africa
                  </p>
                  <p className="mb-3 text-xs text-[#6B6966]">
                    If you are not satisfied with how we handle your complaint, you may escalate to:
                  </p>
                  <a
                    href="https://www.justice.gov.za/inforeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[#1B3D6E] hover:underline"
                  >
                    www.justice.gov.za/inforeg
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* ── Footer nav between legal pages ───────────────────────── */}
      <section className="border-t border-[#E5E4E0] bg-[#F8F8F7] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#6B6966]">
              © {new Date().getFullYear()} Star Aesthetic Medical Centre · All rights reserved
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/legal/terms-and-conditions"
                className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors"
              >
                Terms & Conditions →
              </Link>
              <Link
                href="/legal/returns-policy"
                className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors"
              >
                Returns Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
