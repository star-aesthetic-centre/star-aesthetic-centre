import Link from "next/link";
import { SITE_PAGE_LABELS } from "@/lib/content/site-pages-defaults";
import type { SitePageSlug } from "@/lib/content/site-pages-types";

const SLUGS: SitePageSlug[] = ["home", "contact", "dr-rajeev-bangalee"];

export default function AdminPagesListPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#0F2647]">Pages</h1>
        <p className="mt-2 text-sm text-[#6B6966]">
          Edit homepage, contact, and Dr. Bangalee page copy. Layout and images stay fixed — text and contact details update here.
        </p>
      </div>

      <div className="space-y-3">
        {SLUGS.map((slug) => {
          const { title, path } = SITE_PAGE_LABELS[slug];
          return (
            <div
              key={slug}
              className="flex items-center justify-between border border-[#E5E4E0] bg-white px-5 py-4"
            >
              <div>
                <p className="font-semibold text-[#1A1917]">{title}</p>
                <p className="text-xs text-[#6B6966] mt-0.5">{path}</p>
              </div>
              <Link
                href={`/admin/pages/${slug}/edit`}
                className="text-xs font-bold uppercase tracking-widest bg-[#0F2647] text-white px-4 py-2.5 hover:bg-[#1B3D6E] transition-colors"
              >
                Edit
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
