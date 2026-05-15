import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { FileText, ChevronRight, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions | Star Aesthetic Centre Durban",
  description:
    "Terms and Conditions governing the use of Star Aesthetic Centre's website, booking of treatments, purchase of products, and all related services. Governed by South African law.",
  path: "/legal/terms-and-conditions",
});

const lastUpdated = "19 September 2025";
const effectiveDate = "19 September 2025";

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function TermsPage() {
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
            <span className="text-[#1A1917]">Terms & Conditions</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E5E4E0] bg-white">
              <FileText size={20} className="text-[#1B3D6E]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-[#1A1917] sm:text-4xl">
                Terms & Conditions
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#6B6966]">
                <span>Effective: <strong className="text-[#1A1917]">{effectiveDate}</strong></span>
                <span>·</span>
                <span>Last updated: <strong className="text-[#1A1917]">{lastUpdated}</strong></span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B6966]">
                These Terms & Conditions govern your use of the Star Aesthetic Centre website, the booking of
                treatments, and the purchase of skincare products. Please read them carefully. By accessing our
                website or booking a service, you agree to be bound by these terms.
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
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">Contents</p>
              <nav className="space-y-1">
                {[
                  ["#acceptance", "1. Acceptance of Terms"],
                  ["#medical-disclaimer", "2. Medical Disclaimer"],
                  ["#eligibility", "3. Eligibility & Age"],
                  ["#consultations", "4. Consultations & Consent"],
                  ["#bookings", "5. Bookings & Cancellations"],
                  ["#payments", "6. Payments"],
                  ["#results", "7. Treatment Results"],
                  ["#photography", "8. Photography & Images"],
                  ["#online-shop", "9. Online Shop"],
                  ["#website-use", "10. Website Use"],
                  ["#intellectual-property", "11. Intellectual Property"],
                  ["#third-party-links", "12. Third-Party Links"],
                  ["#disclaimers", "13. Disclaimers"],
                  ["#liability", "14. Limitation of Liability"],
                  ["#indemnification", "15. Indemnification"],
                  ["#termination", "16. Termination"],
                  ["#governing-law", "17. Governing Law"],
                  ["#changes", "18. Changes to Terms"],
                  ["#contact", "19. Contact Us"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-10 border-t border-[#E5E4E0] pt-6">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">Also Read</p>
                <nav className="space-y-1">
                  <Link href="/legal/privacy-policy" className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]">
                    Privacy Policy
                  </Link>
                  <Link href="/legal/returns-policy" className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]">
                    Returns Policy
                  </Link>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0 space-y-12">

            {/* 1 */}
            <section id="acceptance" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>By accessing or using the Star Aesthetic Centre website (staraesthetic.co.za), booking a consultation or treatment, or purchasing a product from our online shop, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions and our <Link href="/legal/privacy-policy" className="text-[#1B3D6E] underline underline-offset-2 hover:no-underline">Privacy Policy</Link>.</p>
                <p>If you do not agree with any part of these terms, you must discontinue use of the website and refrain from booking our services.</p>
                <p>These terms apply to all visitors, patients, and online shop customers of Star Aesthetic Medical Centre, a medical aesthetic practice registered in South Africa and directed by Dr. Rajeev Bangalee, MB, BS.</p>
              </div>
            </section>

            {/* 2 */}
            <section id="medical-disclaimer" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">2. Medical Disclaimer</h2>
              <div className="mb-5 flex items-start gap-3 border-l-4 border-amber-400 bg-amber-50 px-5 py-4">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2} />
                <p className="text-sm font-semibold text-amber-900">
                  The information provided on this website is for general informational purposes only and does not
                  constitute medical advice. It should not replace a consultation with a qualified healthcare professional.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>All treatments at Star Aesthetic Centre are performed or directly supervised by Dr. Rajeev Bangalee, a qualified General Practitioner. However, the content on this website — including treatment descriptions, educational articles, and product information — is provided for informational purposes only.</p>
                <p>No content on this website should be used to self-diagnose, self-treat, or make decisions about your health without consulting a qualified medical professional. Results of aesthetic treatments vary between individuals and are not guaranteed.</p>
                <p>Certain treatments may not be suitable for all patients. A thorough consultation and medical assessment will be conducted before any procedure is recommended or undertaken.</p>
              </div>
            </section>

            {/* 3 */}
            <section id="eligibility" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">3. Eligibility & Age Requirements</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>You must be at least 18 years of age to book a treatment, create an account, or purchase products from our online shop without parental or guardian consent.</p>
                <p>Patients under the age of 18 may receive treatment only with the written consent of a parent or legal guardian, who must be present during the consultation and consent process. Certain treatments are not available to minors regardless of consent.</p>
                <p>By using our services, you represent and warrant that you are at least 18 years old, or that you have the necessary parental or guardian consent to do so.</p>
              </div>
            </section>

            {/* 4 */}
            <section id="consultations" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">4. Consultations & Informed Consent</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>All new patients are required to attend a consultation with Dr. Bangalee prior to any treatment. During this consultation, your medical history, suitability for treatment, and expected outcomes will be assessed and discussed.</p>
                <p>Before any procedure is performed, you will be required to sign an informed consent form. This form confirms that:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "You have been informed of the nature, purpose, and risks of the proposed treatment",
                    "You have had the opportunity to ask questions and have received satisfactory answers",
                    "You understand that results are not guaranteed and may vary",
                    "You have disclosed all relevant medical history, medications, allergies, and previous treatments",
                    "You consent to the treatment being performed by Dr. Bangalee or under his direct supervision",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>Consent may be withdrawn at any time before a procedure commences. Once a procedure has begun, withdrawal of consent may not be possible without risk to the patient.</p>
              </div>
            </section>

            {/* 5 */}
            <section id="bookings" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">5. Bookings & Cancellation Policy</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <h3 className="text-sm font-bold text-[#1A1917]">Making a Booking</h3>
                <p>Appointments may be made via the online booking system on our website, by telephone, or by email. A booking is confirmed only once you have received written or verbal confirmation from the practice.</p>

                <h3 className="text-sm font-bold text-[#1A1917]">Cancellations & Rescheduling</h3>
                <ul className="space-y-2 pl-1">
                  {[
                    "We require a minimum of 24 hours' notice to cancel or reschedule an appointment.",
                    "Cancellations made with less than 24 hours' notice may be subject to a cancellation fee.",
                    "Repeated no-shows or late cancellations may result in a deposit being required for future bookings.",
                    "To cancel or reschedule, please contact us as early as possible by phone or email.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-bold text-[#1A1917]">Practice Cancellations</h3>
                <p>We reserve the right to cancel or reschedule appointments in exceptional circumstances (e.g., medical emergency, equipment failure, or unforeseen closure). We will provide as much notice as possible and will offer an alternative appointment at the earliest convenience. No fees will be charged for practice-initiated cancellations.</p>

                <h3 className="text-sm font-bold text-[#1A1917]">Late Arrivals</h3>
                <p>Please arrive at least 5 minutes before your scheduled appointment. Arriving significantly late may result in a shortened treatment or the need to reschedule, at the discretion of the practice.</p>
              </div>
            </section>

            {/* 6 */}
            <section id="payments" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">6. Payments</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Payment for treatments is due at the time of service unless a prior arrangement has been made in writing. We accept cash, debit card, and major credit cards. EFT payments may be accepted by prior arrangement.</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "All prices are quoted in South African Rand (ZAR) and are inclusive of VAT where applicable.",
                    "Prices are subject to change without notice. The price confirmed at the time of booking will apply.",
                    "We do not currently accept medical aid as direct payment; however, we can provide detailed invoices for you to claim from your scheme.",
                    "Online shop orders are processed via a secure payment gateway. Card details are not stored by the practice.",
                    "Any promotional pricing or specials are subject to availability and are time-limited as stated in the relevant promotion.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 7 */}
            <section id="results" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">7. Treatment Results</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Aesthetic medicine is not an exact science. While Dr. Bangalee applies his full clinical expertise and uses only clinically validated techniques and products, the results of any treatment cannot be guaranteed.</p>
                <p>Outcomes vary depending on individual factors including age, skin type, lifestyle, underlying health conditions, and adherence to aftercare instructions. Before-and-after photographs used on our website or social media represent individual patient experiences and are not a guarantee of outcomes for other patients.</p>
                <p>Any complications, dissatisfaction, or unexpected outcomes should be reported to the practice promptly. Dr. Bangalee will assess the situation and determine the most appropriate course of action in the patient's best interest.</p>
              </div>
            </section>

            {/* 8 */}
            <section id="photography" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">8. Photography & Clinical Images</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Before-and-after photographs may be taken for clinical documentation purposes as part of your patient record. These photographs are stored securely and form part of your confidential medical records.</p>
                <p>We will never use your clinical photographs for marketing, social media, or educational purposes without your <strong className="text-[#1A1917]">explicit written consent</strong>. This consent is entirely voluntary and does not affect the quality of care you receive.</p>
                <p>You may withdraw your consent for the use of your photographs at any time by contacting us in writing. Previously published images cannot be retroactively removed from third-party platforms (e.g., social media) where they may have been shared prior to your withdrawal.</p>
              </div>
            </section>

            {/* 9 */}
            <section id="online-shop" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">9. Online Shop</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Our online shop allows you to purchase pharmaceutical-grade skincare products selected and endorsed by Dr. Bangalee. By placing an order, you agree to the following:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "All products are genuine and sourced directly from authorised distributors.",
                    "Product descriptions, ingredient lists, and usage instructions are provided for informational purposes. If you have any medical conditions, allergies, or concerns, consult a healthcare professional before use.",
                    "Orders are subject to product availability. We reserve the right to cancel an order if a product is out of stock, with a full refund provided.",
                    "Delivery timelines are estimates and may vary. Risk of loss passes to you upon delivery.",
                    "Please review our Returns Policy for information on returns, exchanges, and refunds.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  <Link href="/legal/returns-policy" className="text-[#1B3D6E] underline underline-offset-2 hover:no-underline">
                    View our full Returns Policy →
                  </Link>
                </p>
              </div>
            </section>

            {/* 10 */}
            <section id="website-use" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">10. Website Use & Licence</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Star Aesthetic Centre grants you a limited, non-exclusive, non-transferable, revocable licence to access and use this website for personal, non-commercial purposes only. This licence does not include:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Copying, reproducing, or distributing any website content without our prior written consent",
                    "Modifying or creating derivative works from any content on this site",
                    "Using the website or its content for commercial purposes",
                    "Reverse engineering any software underlying the website",
                    "Removing any copyright, trademark, or proprietary notices from materials",
                    "Using automated tools (bots, scrapers, crawlers) to access or extract content",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>We also prohibit the use of our website for any unlawful purpose, to harass or harm others, to transmit malicious code, or to submit false or misleading information. We reserve the right to terminate access immediately for any violation of these terms.</p>
              </div>
            </section>

            {/* 11 */}
            <section id="intellectual-property" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">11. Intellectual Property</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>All content on this website — including text, graphics, logos, photographs, icons, treatment descriptions, and software — is the exclusive property of Star Aesthetic Medical Centre or its licensed content providers and is protected by South African and international copyright and trademark laws.</p>
                <p>The Star Aesthetic Centre name, logo, and brand identity may not be used without our prior written permission. Unauthorised use of any trademarks, trade dress, or brand assets belonging to Star Aesthetic Centre is strictly prohibited.</p>
              </div>
            </section>

            {/* 12 */}
            <section id="third-party-links" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">12. Third-Party Links</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Our website may contain links to third-party websites, social media platforms, or external resources. These links are provided for convenience only. Star Aesthetic Centre has no control over the content, privacy practices, or terms of third-party websites and accepts no responsibility for them.</p>
                <p>We encourage you to review the terms and privacy policies of any third-party site you visit. The inclusion of a link does not constitute endorsement of any third-party site, product, or service.</p>
              </div>
            </section>

            {/* 13 */}
            <section id="disclaimers" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">13. Disclaimers</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>The information and materials on this website are provided on an <strong className="text-[#1A1917]">"as is"</strong> and <strong className="text-[#1A1917]">"as available"</strong> basis without any representations or warranties of any kind, either express or implied.</p>
                <p>To the fullest extent permitted by South African law, Star Aesthetic Centre disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                <p>We do not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components. We reserve the right to modify, suspend, or discontinue any aspect of the website at any time without notice.</p>
              </div>
            </section>

            {/* 14 */}
            <section id="liability" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">14. Limitation of Liability</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>To the maximum extent permitted by applicable South African law, Star Aesthetic Centre, its directors, employees, partners, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Your use of or inability to use the website or its content",
                    "Any reliance placed on information obtained from this website",
                    "Unauthorised access to or alteration of your data",
                    "Any third-party content or conduct accessible through our website",
                    "Any other matter relating to this website",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>Nothing in these terms limits or excludes our liability for death or personal injury caused by negligence, fraud, or any other matter that cannot be excluded by law.</p>
              </div>
            </section>

            {/* 15 */}
            <section id="indemnification" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">15. Indemnification</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>You agree to defend, indemnify, and hold harmless Star Aesthetic Centre, its directors, employees, contractors, agents, licensors, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Your use of this website or its content",
                    "Any breach of these Terms & Conditions by you",
                    "Any false or misleading information provided by you",
                    "Your violation of any applicable law or the rights of a third party",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 16 */}
            <section id="termination" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">16. Termination</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>We reserve the right to suspend or terminate your access to this website or any account associated with it, immediately and without prior notice, at our sole discretion, for any reason — including breach of these terms.</p>
                <p>You may also discontinue use of the website at any time. Termination of your access does not affect any provisions of these terms which by their nature should survive termination, including intellectual property rights, disclaimers, and limitations of liability.</p>
              </div>
            </section>

            {/* 17 */}
            <section id="governing-law" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">17. Governing Law & Jurisdiction</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>These Terms & Conditions are governed by and interpreted in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.</p>
                <p>Any disputes arising from or related to these terms or the use of our services shall be subject to the exclusive jurisdiction of the courts of South Africa. You consent to the personal jurisdiction of such courts.</p>
              </div>
            </section>

            {/* 18 */}
            <section id="changes" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">18. Changes to These Terms</h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>We reserve the right to modify these Terms & Conditions at any time. Where changes are material, we will provide at least 30 days' notice by updating the "Last Updated" date on this page and, where appropriate, notifying patients directly.</p>
                <p>Your continued use of our website or services after any changes become effective constitutes your acceptance of the revised terms. We encourage you to review this page periodically.</p>
                <p>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</p>
              </div>
            </section>

            {/* 19 */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">19. Contact Us</h2>
              <p className="mb-5 text-sm leading-relaxed text-[#6B6966]">
                For any questions or concerns about these Terms & Conditions, please contact us:
              </p>
              <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1B3D6E]">
                  Star Aesthetic Medical Centre
                </p>
                <div className="space-y-3">
                  <a href="mailto:info@staraesthetic.site" className="flex items-center gap-3 text-sm text-[#6B6966] transition-colors hover:text-[#1B3D6E]">
                    <Mail size={14} className="shrink-0 text-[#939EBA]" />
                    info@staraesthetic.site
                  </a>
                  <a href="tel:+27315731325" className="flex items-center gap-3 text-sm text-[#6B6966] transition-colors hover:text-[#1B3D6E]">
                    <Phone size={14} className="shrink-0 text-[#939EBA]" />
                    031 573 1325
                  </a>
                  <div className="flex items-start gap-3 text-sm text-[#6B6966]">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#939EBA]" />
                    22 Ennisdale Drive, Durban North, 4051
                  </div>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* ── Footer nav ───────────────────────────────────────────── */}
      <section className="border-t border-[#E5E4E0] bg-[#F8F8F7] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#6B6966]">
              © {new Date().getFullYear()} Star Aesthetic Medical Centre · All rights reserved
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/legal/privacy-policy" className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors">
                ← Privacy Policy
              </Link>
              <Link href="/legal/returns-policy" className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors">
                Returns Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
