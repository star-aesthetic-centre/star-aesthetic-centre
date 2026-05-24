import OpenNikiButton from "@/components/shop/OpenNikiButton";

const steps = [
  {
    number: "01",
    title: "Describe Your Skin",
    body: "Tell Niki your concerns — acne, pigmentation, ageing, sensitivity, or anything in between.",
  },
  {
    number: "02",
    title: "Share Your Profile",
    body: "Age, skin tone, lifestyle, medications. Three minutes. Everything Niki needs to make a safe, accurate recommendation.",
  },
  {
    number: "03",
    title: "Get Your Regime",
    body: "Receive a personalised product regime from the brand that fits your skin — with a clinical explanation of every choice.",
  },
];

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-[#0F2647] py-20 lg:py-28">
      {/* Diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Accent line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#939EBA]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT — Copy */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#939EBA]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
                Free · 3 Minutes · Powered by Niki AI
              </span>
            </div>

            <h2 className="font-heading text-[clamp(2.4rem,4.5vw,4rem)] font-bold uppercase leading-[1.05] tracking-wide text-white">
              Not sure which
              <br />
              products are right
              <br />
              <em className="not-italic text-[#939EBA]">for your skin?</em>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[#A8B4CC]">
              Six world-class brands. Thousands of products. Finding the right combination for{" "}
              <em className="not-italic font-semibold text-white">your</em> skin shouldn't be a
              guessing game. Niki — our AI skin consultant — will ask the right questions and give
              you a personalised product regime in minutes.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#636E85]">
              {[
                "Considers your age & skin tone",
                "Checks medication safety",
                "Recommends the right brand for you",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#939EBA]" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <OpenNikiButton />
              <a
                href="#shop-products"
                className="text-sm font-semibold text-[#A8B4CC] underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                Browse all products ↓
              </a>
            </div>
          </div>

          {/* RIGHT — How it works card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              {/* Card header */}
              <div className="border border-[#939EBA]/25 bg-[#0A1E38] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#939EBA]">
                    Skin Assessment
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-[#636E85]">Niki is ready</span>
                  </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-[#939EBA]/40 to-transparent" />

                {/* Steps */}
                <div className="mt-5 space-y-5">
                  {steps.map((step, i) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="shrink-0">
                        <span className="font-heading text-2xl font-bold text-[#939EBA]/30">
                          {step.number}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#9AADC8]">{step.body}</p>
                        {i < steps.length - 1 && (
                          <div className="mt-4 ml-1 h-4 w-px bg-[#939EBA]/20" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent to-[#939EBA]/40" />
                <p className="mt-4 text-center text-[10px] text-[#636E85]">
                  Reviewed by Dr. Rajeev Bangalee · MB, BS
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
