const testimonials = [
 {
 quote: "Dr. Bangalee is profoundly professional and meticulous. The clinic is absolutely stunning and I felt completely safe. My skin has never looked better.",
 author: "Sarah J.",
 treatment: "Dermapen Microneedling"
 },
 {
 quote: "I've been going to Star Aesthetic for two years. The results are incredibly natural, and I never feel pressured into treatments I don't need.",
 author: "Michelle",
 treatment: "Anti-Ageing Injections"
 },
 {
 quote: "A true masterclass in aesthetic medicine. The consultation was thorough, the environment is premium, and the aftercare check-ins are so appreciated.",
 author: "K. Reddy",
 treatment: "Pigmentation Treatment"
 }
];

export default function Testimonials() {
 return (
 <section className="bg-[#F7F7F8] py-24">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

 {/* Header */}
 <div className="mb-16 text-center">
 <div className="mb-4 inline-flex items-center gap-3">
 <span className="h-px w-8 bg-[#939EBA]" />
 <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
 Patient Experiences
 </span>
 <span className="h-px w-8 bg-[#939EBA]" />
 </div>
 <h2 className="font-heading text-4xl font-bold sm:text-5xl">
 Real results.
 <br />Real confidence.
 </h2>
 </div>

 {/* Grid */}
 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
 {testimonials.map((t, index) => (
 <div
 key={index}
 className="uk-card uk-card-default flex flex-col justify-between"
 >
 <div className="uk-card-body">
 {/* 5 Stars */}
 <div className="mb-6 flex gap-1">
 {[...Array(5)].map((_, i) => (
 <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#939EBA" className="opacity-80">
 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
 </svg>
 ))}
 </div>

 <blockquote className="text-[15px] italic leading-relaxed text-[#636374]">
 "{t.quote}"
 </blockquote>

 <div className="mt-8 border-t border-[#E2E2E6] pt-4">
 <p className="font-heading text-lg font-bold m-0">{t.author}</p>
 <p className="mt-0.5 text-xs font-semibold text-[#939EBA] uppercase tracking-wider">{t.treatment}</p>
 </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}
