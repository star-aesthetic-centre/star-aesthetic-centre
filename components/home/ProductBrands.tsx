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

                {/* Flex wrap container: 2-3 per row on mobile, single row on large desktop */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-12 sm:gap-x-16 lg:gap-y-16">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/shop/brands/${brand.slug}`}
                            className="group relative flex items-center justify-center transition-transform hover:scale-105"
                            title={`Shop ${brand.name} Skincare`}
                        >
                            <div className="relative h-20 w-40 sm:h-24 sm:w-48 lg:h-32 lg:w-64">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
