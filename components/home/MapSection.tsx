import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export default function MapSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

                {/* Section label */}
                <div className="mb-10 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#939EBA]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                        Find Us
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E5E4E0] overflow-hidden">

                    {/* Info panel */}
                    <div className="bg-[#0F2647] p-8 sm:p-10 flex flex-col justify-between">
                        <div>
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8 leading-snug">
                                Visit Us in<br />
                                <span className="text-[#C8A882]">Durban North</span>
                            </h2>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <MapPin size={16} className="shrink-0 text-[#C8A882] mt-1" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#939EBA] mb-1">Address</p>
                                        <p className="text-sm text-white leading-relaxed">
                                            22 Ennisdale Drive<br />
                                            Durban North, 4051<br />
                                            KwaZulu-Natal
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone size={16} className="shrink-0 text-[#C8A882] mt-1" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#939EBA] mb-1">Phone</p>
                                        <a href="tel:+27315731325" className="text-sm text-white hover:text-[#C8A882] transition-colors">
                                            +27 (0)31 573 1325
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Clock size={16} className="shrink-0 text-[#C8A882] mt-1" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#939EBA] mb-1">Hours</p>
                                        <p className="text-sm text-white leading-relaxed">
                                            Mon – Fri: 08:00 – 17:00<br />
                                            Saturday: 08:00 – 13:00<br />
                                            <span className="text-[#636E85]">Sunday: Closed</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="https://maps.google.com/?q=22+Ennisdale+Drive+Durban+North+4051"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 border border-[#C8A882]/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#C8A882] hover:bg-[#C8A882]/10 transition-colors self-start"
                        >
                            Get Directions
                            <MapPin size={13} />
                        </Link>
                    </div>

                    {/* Map embed — spans 2 columns on desktop */}
                    <div className="lg:col-span-2 min-h-[320px] sm:min-h-[400px]">
                        <iframe
                            src="https://maps.google.com/maps?q=22+Ennisdale+Drive,+Durban+North,+4051,+South+Africa&output=embed&z=16"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "320px" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Star Aesthetic Centre — 22 Ennisdale Drive, Durban North"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
