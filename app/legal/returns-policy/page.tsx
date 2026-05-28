import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { RotateCcw, ChevronRight, Mail, Phone, MapPin, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = buildPageMetadata({
  title: "Returns & Refunds Policy | Star Aesthetic Centre Durban",
  description:
    "Returns, refunds, and cancellation policy for Star Aesthetic Centre — covering skincare products, treatment bookings, packages, gift vouchers, and special circumstances. Governed by the South African Consumer Protection Act.",
  path: "/legal/returns-policy",
});

const lastUpdated = "19 September 2025";
const effectiveDate = "19 September 2025";

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ReturnsPolicyPage() {
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
            <span className="text-[#1A1917]">Returns & Refunds Policy</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E5E4E0] bg-white">
              <RotateCcw size={20} className="text-[#1B3D6E]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-[#1A1917] sm:text-4xl">
                Returns & Refunds Policy
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#6B6966]">
                <span>Effective: <strong className="text-[#1A1917]">{effectiveDate}</strong></span>
                <span>·</span>
                <span>Last updated: <strong className="text-[#1A1917]">{lastUpdated}</strong></span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B6966]">
                This policy covers returns and refunds for skincare products purchased from our online shop and
                in-practice, as well as cancellations and refunds for treatment bookings, packages, and gift
                vouchers. Your statutory rights under the South African Consumer Protection Act (CPA) are always
                upheld.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Reference ──────────────────────────────────────── */}
      <section className="border-b border-[#E5E4E0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">
            Quick Reference
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: "Product Returns", value: "14 days", sub: "Unopened only" },
              { icon: Clock, label: "Damage Report", value: "48 hours", sub: "With photos" },
              { icon: Clock, label: "Refund Processing", value: "5–10 days", sub: "Business days" },
              { icon: Clock, label: "Dissatisfaction", value: "14 days", sub: "Contact us" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="border border-[#E5E4E0] bg-[#F8F8F7] px-5 py-4 text-center">
                <Icon size={16} className="mx-auto mb-2 text-[#939EBA]" strokeWidth={1.5} />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6966]">{label}</p>
                <p className="mt-1 text-lg font-bold text-[#1B3D6E]">{value}</p>
                <p className="text-[11px] text-[#6B6966]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B6966]">Contents</p>
              <nav className="space-y-1">
                {[
                  ["#products", "1. Skincare Products"],
                  ["#non-returnable", "2. Non-Returnable Items"],
                  ["#return-process", "3. Return Process"],
                  ["#damaged", "4. Damaged or Defective"],
                  ["#treatments", "5. Treatment Cancellations"],
                  ["#packages", "6. Treatment Packages"],
                  ["#consultations", "7. Consultation Fees"],
                  ["#gift-vouchers", "8. Gift Vouchers"],
                  ["#dissatisfaction", "9. Treatment Dissatisfaction"],
                  ["#medical", "10. Medical Contraindications"],
                  ["#force-majeure", "11. Force Majeure"],
                  ["#refund-processing", "12. Refund Processing"],
                  ["#cpa", "13. Consumer Protection Act"],
                  ["#contact", "14. Contact Us"],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]">
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
                  <Link href="/legal/terms-and-conditions" className="block rounded px-3 py-2 text-xs text-[#6B6966] transition-colors hover:bg-[#F2F1EF] hover:text-[#1B3D6E]">
                    Terms & Conditions
                  </Link>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0 space-y-12">

            {/* 1 — Products */}
            <section id="products" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                1. Skincare Product Returns
              </h2>
              <div className="space-y-5 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  We want you to be completely satisfied with every product you purchase from Star Aesthetic Centre.
                  Products may be returned or exchanged under the following conditions:
                </p>

                {/* Returnable vs Not */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border border-[#E5E4E0] bg-white p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle size={15} className="text-emerald-600" strokeWidth={2} />
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Eligible for Return</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Unopened and unused within 14 days of purchase",
                        "Defective or damaged upon receipt",
                        "Wrong item shipped",
                        "In original, undamaged packaging with receipt",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6B6966]">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-[#E5E4E0] bg-white p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <XCircle size={15} className="text-red-500" strokeWidth={2} />
                      <p className="text-xs font-bold uppercase tracking-wider text-red-600">Not Eligible for Return</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Opened, used, or partially used products",
                        "Products returned after 14 days",
                        "Items without original packaging or proof of purchase",
                        "Products purchased on promotion or at a discounted price (unless defective)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6B6966]">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 2 — Non-Returnable */}
            <section id="non-returnable" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                2. Non-Returnable Items
              </h2>
              <div className="mb-4 flex items-start gap-3 border-l-4 border-amber-400 bg-amber-50 px-5 py-4">
                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2} />
                <p className="text-sm text-amber-900">
                  Due to health and hygiene regulations, the following items <strong>cannot be returned once opened or used</strong>, regardless of the reason, unless they are faulty or not as described.
                </p>
              </div>
              <ul className="space-y-2 pl-1 text-sm text-[#6B6966]">
                {[
                  "Skincare serums, creams, moisturisers, and cleansers",
                  "Exfoliants, toners, and treatment oils",
                  "Sunscreen and SPF products",
                  "Eye creams and lip treatments",
                  "Any personal care product that has been opened, tested, or partially used",
                  "Products where the hygiene seal has been broken",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#6B6966]">
                This policy is in place to protect the health and safety of all our customers and complies with
                applicable South African health regulations. It does not affect your statutory rights under the
                Consumer Protection Act where a product is defective.
              </p>
            </section>

            {/* 3 — Return Process */}
            <section id="return-process" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                3. How to Return a Product
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>To initiate a return or exchange, please follow these steps:</p>

                <div className="space-y-3">
                  {[
                    {
                      step: "01",
                      title: "Contact us within 14 days",
                      desc: "Email info@staraesthetic.co.za or call 031 573 1325 within 14 days of receiving your order. Include your order number, the product name, and the reason for the return.",
                    },
                    {
                      step: "02",
                      title: "Receive return authorisation",
                      desc: "We will review your request and, if eligible, issue a return authorisation and provide return instructions. Do not send items back without prior authorisation.",
                    },
                    {
                      step: "03",
                      title: "Package and return the item",
                      desc: "Return the product in its original, unopened packaging with proof of purchase. Items must be in the same condition as received.",
                    },
                    {
                      step: "04",
                      title: "Refund or exchange processed",
                      desc: "Once we receive and inspect the returned item, we will process your refund or exchange within 5–10 business days. You will be notified by email.",
                    },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 border border-[#E5E4E0] bg-[#F8F8F7] p-5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#1B3D6E] text-xs font-bold text-white">
                        {step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1917]">{title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#6B6966]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p>
                  Return shipping costs are the responsibility of the customer unless the item is defective, damaged,
                  or incorrectly shipped. We recommend using a tracked delivery service as we cannot accept
                  responsibility for items lost in transit.
                </p>
              </div>
            </section>

            {/* 4 — Damaged */}
            <section id="damaged" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                4. Damaged or Defective Products
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  If your order arrives damaged, defective, or incorrect, please contact us within <strong className="text-[#1A1917]">48 hours of receipt</strong>. We ask that you:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Take clear photographs of the damaged packaging and product before discarding anything",
                    "Email the photographs along with your order number to info@staraesthetic.co.za",
                    "Do not dispose of the damaged item until we have assessed your claim",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  Upon verification, we will offer you the choice of a <strong className="text-[#1A1917]">full refund</strong>,
                  a <strong className="text-[#1A1917]">replacement product</strong>, or equivalent
                  <strong className="text-[#1A1917]"> store credit</strong>. Return shipping costs for defective items
                  will be covered by Star Aesthetic Centre.
                </p>
              </div>
            </section>

            {/* 5 — Treatment Cancellations */}
            <section id="treatments" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                5. Treatment Booking Cancellations
              </h2>
              <div className="space-y-5 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  Our cancellation terms are designed to be fair to both patients and the practice, given that
                  appointment slots are reserved exclusively for individual patients.
                </p>

                {/* Cancellation table */}
                <div className="overflow-hidden border border-[#E5E4E0]">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F2F1EF]">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">
                          Notice Given
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">
                          Outcome
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E4E0]">
                      {[
                        {
                          notice: "48+ hours",
                          outcome: "Full refund or free rescheduling",
                          color: "text-emerald-700 bg-emerald-50",
                        },
                        {
                          notice: "24–48 hours",
                          outcome: "50% cancellation fee applies; 50% refunded or credited",
                          color: "text-amber-700 bg-amber-50",
                        },
                        {
                          notice: "Less than 24 hours",
                          outcome: "Full treatment fee charged — no refund",
                          color: "text-red-700 bg-red-50",
                        },
                        {
                          notice: "No-show",
                          outcome: "Full treatment fee charged — no refund. Deposit may be required for future bookings",
                          color: "text-red-700 bg-red-50",
                        },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                          <td className="px-5 py-3 font-semibold text-[#1A1917]">{row.notice}</td>
                          <td className={`px-5 py-3 text-xs font-medium ${row.color} px-3 py-1`}>
                            {row.outcome}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p>
                  To cancel or reschedule, please contact us by phone on <a href="tel:+27315731325" className="text-[#1B3D6E] underline underline-offset-2">031 573 1325</a> or
                  by email at <a href="mailto:info@staraesthetic.co.za" className="text-[#1B3D6E] underline underline-offset-2">info@staraesthetic.co.za</a> as early as possible.
                </p>
              </div>
            </section>

            {/* 6 — Packages */}
            <section id="packages" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                6. Treatment Packages
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  Prepaid treatment packages offer a discounted rate in exchange for commitment to a course of
                  treatments. The following terms apply:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Unused portions of a prepaid package may be refunded within 30 days of purchase, calculated pro-rata based on the full (non-discounted) price per treatment, minus the value of treatments already received.",
                    "After 30 days, packages are non-refundable but may be transferred to another patient or applied as credit toward alternative treatments, subject to approval by the practice.",
                    "Packages must be used within 12 months of purchase unless otherwise stated at the time of purchase.",
                    "Package sessions may not be split across different treatment types without prior written agreement.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 7 — Consultation Fees */}
            <section id="consultations" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                7. Consultation Fees
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  Consultation fees cover Dr. Bangalee's time, assessment, and treatment planning and are
                  <strong className="text-[#1A1917]"> non-refundable</strong>.
                </p>
                <p>
                  However, if you proceed with a treatment booking within <strong className="text-[#1A1917]">30 days</strong> of
                  your consultation, your consultation fee may be credited toward the cost of that treatment.
                  Please advise us of this at the time of booking.
                </p>
              </div>
            </section>

            {/* 8 — Gift Vouchers */}
            <section id="gift-vouchers" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                8. Gift Vouchers & Prepaid Services
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <ul className="space-y-2 pl-1">
                  {[
                    "Gift vouchers are valid for 12 months from the date of issue.",
                    "Gift vouchers are non-refundable but are fully transferable to another person.",
                    "Vouchers cannot be exchanged for cash.",
                    "In the event of a documented medical emergency that prevents use before expiry, we will consider an extension on a case-by-case basis — please contact us with supporting documentation.",
                    "Lost or stolen vouchers cannot be replaced.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 9 — Dissatisfaction */}
            <section id="dissatisfaction" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                9. Treatment Dissatisfaction
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  Your satisfaction is important to us. If you are unhappy with the outcome of a treatment, please
                  contact us within <strong className="text-[#1A1917]">14 days</strong> of your appointment. We will
                  assess each situation individually.
                </p>
                <p>Possible remedies, at the discretion of Dr. Bangalee, may include:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "A complimentary follow-up assessment and/or corrective treatment",
                    "A partial refund, where clinically and commercially appropriate",
                    "Credit toward a future treatment or product",
                    "Referral to a specialist if clinically indicated",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  As aesthetic outcomes vary between individuals and are not guaranteed, dissatisfaction with a
                  result alone — where the treatment was performed correctly and no complication occurred — does not
                  automatically entitle a patient to a refund. Each case will be reviewed with care and fairness.
                </p>
              </div>
            </section>

            {/* 10 — Medical Contraindications */}
            <section id="medical" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                10. Medical Contraindications
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  If a treatment cannot proceed because a medical contraindication is identified at or before your
                  appointment, you will receive a <strong className="text-[#1A1917]">full refund</strong> of any
                  prepayment with no cancellation fee applied.
                </p>
                <p>
                  In these circumstances, Dr. Bangalee will discuss appropriate alternative options or refer you to
                  a suitable specialist where applicable.
                </p>
              </div>
            </section>

            {/* 11 — Force Majeure */}
            <section id="force-majeure" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                11. Force Majeure
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  In circumstances beyond our reasonable control — including but not limited to natural disasters,
                  power outages, pandemics, or governmental directives — the following applies:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Flexible rescheduling will be offered at the earliest available opportunity, at no additional charge.",
                    "Refunds will be considered on a case-by-case basis if rescheduling is not possible.",
                    "Store credit will be offered as an alternative to a refund where possible.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#939EBA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 12 — Refund Processing */}
            <section id="refund-processing" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                12. Refund Processing
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>Once a refund has been approved, it will be processed as follows:</p>
                <div className="overflow-hidden border border-[#E5E4E0]">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F2F1EF]">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">Refund Method</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#1A1917]">Processing Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E4E0]">
                      {[
                        { method: "Original payment method (card/EFT)", time: "5–10 business days (plus 3–5 days bank processing)" },
                        { method: "Cash refund", time: "Same day or next business day" },
                        { method: "Store credit", time: "Issued within 1–2 business days" },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                          <td className="px-5 py-3 font-medium text-[#1A1917]">{row.method}</td>
                          <td className="px-5 py-3 text-[#6B6966]">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Refunds are issued to the original payment method used at the time of purchase. If this is not
                  possible, we will discuss an alternative with you. You will be notified by email or phone once
                  the refund has been processed.
                </p>
              </div>
            </section>

            {/* 13 — CPA */}
            <section id="cpa" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                13. Your Rights Under the Consumer Protection Act
              </h2>
              <div className="mb-4 flex items-start gap-3 border-l-4 border-[#1B3D6E] bg-[#F8F8F7] px-5 py-4">
                <CheckCircle size={15} className="mt-0.5 shrink-0 text-[#1B3D6E]" strokeWidth={2} />
                <p className="text-sm font-semibold text-[#1A1917]">
                  Nothing in this policy overrides or limits your statutory rights under the Consumer Protection Act
                  68 of 2008 (CPA) of South Africa.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-[#6B6966]">
                <p>
                  Under the CPA, you have the right to receive goods and services of acceptable quality. Where a
                  product is defective, unsafe, or not as described, you are entitled to a repair, replacement, or
                  refund regardless of the timeframes stated in this policy.
                </p>
                <p>
                  If you believe your statutory consumer rights have been infringed and we are unable to resolve
                  the matter directly, you may refer the matter to the <strong className="text-[#1A1917]">National Consumer Commission (NCC)</strong> at{" "}
                  <a href="https://www.thencc.gov.za" target="_blank" rel="noopener noreferrer" className="text-[#1B3D6E] underline underline-offset-2 hover:no-underline">
                    www.thencc.gov.za
                  </a>.
                </p>
              </div>
            </section>

            {/* 14 — Contact */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="mb-5 border-b border-[#E5E4E0] pb-3 text-xl font-bold text-[#1A1917]">
                14. Contact Us
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[#6B6966]">
                For any returns, refund requests, or queries about this policy, please get in touch:
              </p>
              <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1B3D6E]">
                  Star Aesthetic Centre
                </p>
                <div className="space-y-3">
                  <a href="mailto:info@staraesthetic.co.za" className="flex items-center gap-3 text-sm text-[#6B6966] transition-colors hover:text-[#1B3D6E]">
                    <Mail size={14} className="shrink-0 text-[#939EBA]" />
                    info@staraesthetic.co.za
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
              © {new Date().getFullYear()} Star Aesthetic Centre · All rights reserved
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/legal/privacy-policy" className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors">
                ← Privacy Policy
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-xs text-[#6B6966] hover:text-[#1B3D6E] transition-colors">
                ← Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
