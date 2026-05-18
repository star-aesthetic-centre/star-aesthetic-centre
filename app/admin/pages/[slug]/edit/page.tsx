import Link from "next/link";
import { notFound } from "next/navigation";
import { getSitePageContent } from "@/lib/queries/site-pages";
import { SITE_PAGE_LABELS } from "@/lib/content/site-pages-defaults";
import type { SitePageSlug } from "@/lib/content/site-pages-types";
import EditPageClient from "./EditPageClient";

const VALID_SLUGS: SitePageSlug[] = ["home", "contact", "dr-rajeev-bangalee"];

function isValidSlug(slug: string): slug is SitePageSlug {
  return VALID_SLUGS.includes(slug as SitePageSlug);
}

export default async function EditSitePagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const content = await getSitePageContent(slug);
  const { title, path } = SITE_PAGE_LABELS[slug];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Link
          href="/admin/pages"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← All pages
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">Edit {title}</h1>
        <p className="mt-1 text-sm text-[#6B6966]">
          Public URL:{" "}
          <a href={path} target="_blank" rel="noopener noreferrer" className="text-[#939EBA] hover:underline">
            {path}
          </a>
        </p>
      </div>

      <EditPageClient slug={slug} initialContent={content} />
    </main>
  );
}
