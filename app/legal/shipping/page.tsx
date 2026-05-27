import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Shipping & Delivery | Star Aesthetic Centre",
  description: "Shipping rates and delivery information for Star Aesthetic Centre online shop. Free delivery on orders over R800 across South Africa.",
  path: "/legal/shipping",
  keywords: ["skincare delivery South Africa", "Star Aesthetic Centre shipping", "medical skincare online delivery"],
});

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#0F2647] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8A882] mb-3">Online Shop</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">Shipping &amp; Delivery</h1>
          <p className="mt-4 text-[#939EBA] text-sm leading-relaxed">
            We ship nationwide via The Courier Guy. All orders are carefully packaged and dispatched from Durban North.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Rates table */}
          <div>
            <h2 className="font-heading text-xl font-bold text-[#1A1917] mb-1">Delivery Rates</h2>
            <p className="text-sm text-[#6B6966] mb-6">All prices include VAT. Delivered via The Courier Guy.</p>

            <div className="border border-[#E5E4E0] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-[#0F2647] text-white text-xs font-bold uppercase tracking-wider px-5 py-3">
                <span>Service</span>
                <span>Delivery Time</span>
                <span className="text-right">Rate</span>
              </div>

              {/* Free shipping */}
              <div className="grid grid-cols-3 items-center px-5 py-4 bg-[#C8A882]/10 border-b border-[#E5E4E0]">
                <div>
                  <p className="text-sm font-semibold text-[#1A1917]">Free Standard Delivery</p>
                  <p className="text-xs text-[#6B6966] mt-0.5">Orders R800 and above</p>
                </div>
                <p className="text-sm text-[#6B6966]">2–4 business days</p>
                <p className="text-right text-sm font-bold text-[#C8A882]">FREE</p>
              </div>

              {/* Standard */}
              <div className="grid grid-cols-3 items-center px-5 py-4 border-b border-[#E5E4E0]">
                <div>
                  <p className="text-sm font-semibold text-[#1A1917]">Standard Delivery</p>
                  <p className="text-xs text-[#6B6966] mt-0.5">Orders under R800</p>
                </div>
                <p className="text-sm text-[#6B6966]">2–4 business days</p>
                <p className="text-right text-sm font-semibold text-[#1A1917]">R120</p>
              </div>

              {/* Express */}
              <div className="grid grid-cols-3 items-center px-5 py-4 border-b border-[#E5E4E0]">
                <div>
                  <p className="text-sm font-semibold text-[#1A1917]">Express Overnight</p>
                  <p className="text-xs text-[#6B6966] mt-0.5">Major metros only</p>
                </div>
                <p className="text-sm text-[#6B6966]">Next business day</p>
                <p className="text-right text-sm font-semibold text-[#1A1917]">R190</p>
              </div>

              {/* Outlying */}
              <div className="grid grid-cols-3 items-center px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-[#1A1917]">Outlying / Remote Areas</p>
                  <p className="text-xs text-[#6B6966] mt-0.5">Rural &amp; hard-to-reach zones</p>
                </div>
                <p className="text-sm text-[#6B6966]">3–6 business days</p>
                <p className="text-right text-sm font-semibold text-[#1A1917]">R180</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#6B6966]">
              * Major metros include Johannesburg, Cape Town, Durban, Pretoria, Port Elizabeth, and East London CBDs.
            </p>
          </div>

          {/* How it works */}
          <div>
            <h2 className="font-heading text-xl font-bold text-[#1A1917] mb-6">How It Works</h2>
            <div className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Place Your Order",
                  body: "Complete checkout and choose your delivery option. You'll receive an order confirmation email immediately.",
                },
                {
                  step: "2",
                  title: "We Prepare Your Order",
                  body: "Orders placed before 12:00 on business days are dispatched the same day. Orders placed after 12:00 or on weekends are dispatched the next business day.",
                },
                {
                  step: "3",
                  title: "Tracking Notification",
                  body: "Once dispatched, you'll receive a tracking number via email so you can follow your parcel in real time on The Courier Guy website.",
                },
                {
                  step: "4",
                  title: "Delivered to Your Door",
                  body: "Your order arrives securely packaged. A signature may be required on delivery. If you're not available, The Courier Guy will attempt re-delivery or leave a collection card.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-5">
                  <div className="shrink-0 w-9 h-9 bg-[#0F2647] text-white text-sm font-bold flex items-center justify-center rounded-full">
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1917] mb-1">{title}</p>
                    <p className="text-sm text-[#6B6966] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important notes */}
          <div className="bg-[#F8F8F7] border border-[#E5E4E0] p-6 space-y-3">
            <h3 className="font-heading text-base font-bold text-[#1A1917]">Important Notes</h3>
            <ul className="space-y-2 text-sm text-[#6B6966] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C8A882] font-bold shrink-0">—</span> Delivery times are estimates and exclude weekends and public holidays.</li>
              <li className="flex gap-2"><span className="text-[#C8A882] font-bold shrink-0">—</span> We are not liable for delays caused by The Courier Guy or circumstances beyond our control.</li>
              <li className="flex gap-2"><span className="text-[#C8A882] font-bold shrink-0">—</span> Please ensure your delivery address is correct at checkout — we cannot redirect parcels once dispatched.</li>
              <li className="flex gap-2"><span className="text-[#C8A882] font-bold shrink-0">—</span> Damaged or missing parcels must be reported within 24 hours of delivery.</li>
              <li className="flex gap-2"><span className="text-[#C8A882] font-bold shrink-0">—</span> We currently ship to South Africa only.</li>
            </ul>
          </div>

          {/* Questions */}
          <div className="text-center pt-2">
            <p className="text-sm text-[#6B6966] mb-4">Questions about your delivery?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:info@staraesthetic.co.za"
                className="inline-block bg-[#0F2647] text-white text-sm font-semibold px-8 py-3 hover:bg-[#1B3D6E] transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/27315731325"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#0F2647] text-[#0F2647] text-sm font-semibold px-8 py-3 hover:bg-[#0F2647] hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
