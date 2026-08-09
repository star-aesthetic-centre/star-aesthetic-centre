import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { deleteReview, setReviewApproval } from "@/lib/reviews/queries";
import { sendReviewPublishedEmail } from "@/lib/utils/review-admin-email";

/** Moderation endpoints. Every review is unapproved until a human acts here. */

async function requireAdmin(req: NextRequest) {
  return isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
}

/** GET — the full queue, pending first. Includes email, which the public
 *  endpoints deliberately never return. */
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("approved", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[reviews/admin] read failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ reviews: data ?? [] });
}

/** POST — { id, action: "approve" | "unapprove" | "delete" } */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action } = await req.json();
  if (!id || !action) {
    return NextResponse.json({ error: "id and action are required" }, { status: 400 });
  }

  if (action === "delete") {
    const result = await deleteReview(String(id));
    return result.ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: result.error }, { status: 500 });
  }

  if (action === "approve" || action === "unapprove") {
    // Read first: after unapproving we still want the row, and after approving
    // we need the reviewer's address to tell them it is live.
    const supabase = createSupabaseAdmin();
    const { data: review } = await supabase
      .from("reviews")
      .select("name, email, headline, subject_label, treatment_slug, approved")
      .eq("id", String(id))
      .single();

    const wasApproved = review?.approved === true;
    const result = await setReviewApproval(String(id), action === "approve");
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Only on the transition into published, so re-approving something already
    // live cannot email the same person twice.
    if (action === "approve" && review && !wasApproved) {
      await sendReviewPublishedEmail({
        name: review.name,
        email: review.email,
        headline: review.headline,
        subjectLabel: review.subject_label ?? "your experience",
        treatmentSlug: review.treatment_slug ?? null,
      });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
