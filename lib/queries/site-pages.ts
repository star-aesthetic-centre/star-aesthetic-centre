import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { getDefaultSitePageContent } from "@/lib/content/site-pages-defaults";
import { mergeSitePageContent } from "@/lib/content/merge-site-page";
import type { SitePageContentMap, SitePageSlug } from "@/lib/content/site-pages-types";

let sitePagesTableAvailable: boolean | null = null;

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error?.message) return false;
  const msg = error.message.toLowerCase();
  return (
    error.code === "42P01" ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("could not find") ||
    msg.includes("site_pages")
  );
}

async function checkSitePagesTable(): Promise<boolean> {
  if (sitePagesTableAvailable !== null) return sitePagesTableAvailable;
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("site_pages").select("slug").limit(1);
    sitePagesTableAvailable = !error || !isMissingTableError(error);
  } catch {
    sitePagesTableAvailable = false;
  }
  return sitePagesTableAvailable;
}

export async function getSitePageContent<S extends SitePageSlug>(
  slug: S
): Promise<SitePageContentMap[S]> {
  const defaults = getDefaultSitePageContent(slug) as SitePageContentMap[S];

  if (!(await checkSitePagesTable())) {
    return defaults;
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("site_pages")
      .select("content")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data?.content) {
      return defaults;
    }

    return mergeSitePageContent(
      defaults as Record<string, unknown>,
      data.content
    ) as SitePageContentMap[S];
  } catch {
    return defaults;
  }
}

export async function saveSitePageContent<S extends SitePageSlug>(
  slug: S,
  content: SitePageContentMap[S]
): Promise<{ success: boolean; error?: string }> {
  if (!(await checkSitePagesTable())) {
    return {
      success: false,
      error:
        "The site_pages table is not set up yet. Run scripts/output/site-pages-schema.sql in Supabase.",
    };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("site_pages").upsert(
      {
        slug,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
