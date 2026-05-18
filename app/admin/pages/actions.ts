"use server";

import { revalidatePath } from "next/cache";
import { saveSitePageContent } from "@/lib/queries/site-pages";
import type { SitePageContentMap, SitePageSlug } from "@/lib/content/site-pages-types";

export async function updateSitePageAction<S extends SitePageSlug>(
  slug: S,
  content: SitePageContentMap[S]
): Promise<{ success: boolean; error?: string }> {
  const result = await saveSitePageContent(slug, content);

  if (result.success) {
    const paths: Record<SitePageSlug, string> = {
      home: "/",
      contact: "/contact",
      "dr-rajeev-bangalee": "/dr-rajeev-bangalee",
    };
    revalidatePath(paths[slug]);
    revalidatePath(`/admin/pages/${slug}/edit`);
    revalidatePath("/admin/pages");
  }

  return result;
}
