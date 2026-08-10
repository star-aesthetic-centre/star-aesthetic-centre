import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/brands";

export default function ProductBrands() {
    return (
        <section className="border-t border-[#E2E2E6] bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#636374]">
                        Pharmaceutical Brands We Stock
                    </span>
                </div>

                {/*
                  Fixed 3-column grid — six brands land as a clean 3 × 2 block.
                  The previous flex-wrap produced a ragged 4-then-2, which reads
                  as an afterthought rather than a considered stockist list for
                  brands at this price point.
                */}
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#E2E2E6] bg-[#E2E2E6] md:grid-cols-3">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/shop/brands/${brand.slug}`}
                            className="group flex flex-col items-center justify-center gap-4 bg-white px-6 py-12 transition-colors hover:bg-[#FBFBFC] lg:py-16"
                            title={`Shop ${brand.name} Skincare`}
                        >
                            {/* Doubled from h-16 / 190px — at 64px tall these
                                logos read as footer marks rather than the
                                clinical brands the shop is built on. */}
                            <div className="relative h-28 w-full max-w-[300px] transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:max-w-[380px]">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                    sizes="(max-width: 768px) 80vw, 380px"
                                />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9C9D1] transition-colors group-hover:text-[#939EBA]">
                                Shop range →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
