const stats = [
 { value: "20+", label: "Years Experience" },
 { value: "12", label: "Expert Treatments" },
 { value: "6", label: "Skincare Brands" },
 { value: "5★", label: "Patient Rating" },
 { value: "100%", label: "Doctor-Led" },
];

export default function TrustStrip() {
 return (
 <section className="border-y border-[#E2E2E6] bg-white">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="flex items-stretch divide-x divide-[#E2E2E6] overflow-x-auto">
 {stats.map((stat) => (
 <div
 key={stat.label}
 className="flex min-w-[120px] flex-1 flex-col items-center justify-center px-6 py-6 text-center"
 >
 <span className="font-heading text-2xl font-bold tracking-tight text-[#939EBA]">
 {stat.value}
 </span>
 <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#636374]">
 {stat.label}
 </span>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
