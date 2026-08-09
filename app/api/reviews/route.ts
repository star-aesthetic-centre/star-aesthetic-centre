import { NextRequest, NextResponse } from "next/server";
import { saveReview } from "@/lib/reviews/queries";
import {
  buildAnswers,
  compileBody,
  isKnownTreatmentSlug,
  subjectLabelFor,
} from "@/lib/reviews/questions";
import { rateLimit } from "@/lib/security/rate-limit";
import {
  sendReviewAdminNotification,
  sendReviewPendingEmail,
} from "@/lib/utils/review-admin-email";
import {
  getClientIp,
  guardFailureResponse,
  verifyPublicFormSubmission,
} from "@/lib/security/public-form-guard";

/**
 * Public review submission.
 *
 * Reuses the site's existing public-form guard (honeypot, Turnstile, preview
 * gate, throwaway-name/email checks) rather than inventing a second set of
 * spam rules that would drift from the others.
 *
 * Everything lands unapproved. Nothing written here is publicly visible until
 * an admin approves it.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req) ?? "unknown";
    if (!rateLimit(`reviews-create:${ip}`, 3, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();

    const guard = await verifyPublicFormSubmission(req, {
      turnstileToken: body.turnstileToken,
      website: body.website,
      email: body.email,
      name: body.name,
    });
    if (!guard.ok) {
      const failure = guardFailureResponse(guard);
      return NextResponse.json(failure.body, { status: failure.status });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const city = String(body.city ?? "").trim();
    const headline = String(body.headline ?? "").trim();
    const rating = Number(body.rating);

    if (!name || !email || !headline) {
      return NextResponse.json(
        { error: "Please fill in your name, email and a short headline." },
        { status: 400 }
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Please choose a star rating." }, { status: 400 });
    }

    // Treatment slug is validated against the canonical list — a review must
    // not attach itself to a slug that has no page.
    const rawSlug = String(body.treatmentSlug ?? "").trim();
    const treatmentSlug = rawSlug && isKnownTreatmentSlug(rawSlug) ? rawSlug : null;
    if (rawSlug && !treatmentSlug) {
      return NextResponse.json({ error: "Unknown treatment selected." }, { status: 400 });
    }

    const rawAnswers = (body.answers ?? {}) as Record<string, string>;
    // Questions are resolved from the treatment server-side, so the stored
    // question text always matches the set for that treatment — a client
    // can't relabel an answer by posting its own question strings.
    const answers = buildAnswers(treatmentSlug, rawAnswers);

    // Require enough substance to be useful, but count across the whole set so
    // someone who wrote one thorough answer isn't blocked on a box they had
    // nothing to say about.
    const totalLength = answers.reduce((n, a) => n + a.answer.length, 0);
    if (answers.length === 0 || totalLength < 80) {
      return NextResponse.json(
        { error: "Please tell us a little more — a sentence or two in any one question is plenty." },
        { status: 400 }
      );
    }

    const result = await saveReview({
      name,
      email,
      city,
      scope: treatmentSlug ? "treatment" : "general",
      treatmentSlug,
      subjectLabel: subjectLabelFor(treatmentSlug),
      rating,
      headline,
      answers,
      body: compileBody(answers),
      bookingReference: String(body.bookingReference ?? "").trim() || null,
    });

    if ("error" in result) {
      return NextResponse.json(
        { error: "We couldn't save your review just now. Please try again." },
        { status: 500 }
      );
    }

    // Tell the clinic. Reviews are held unapproved, so without this a review
    // sits invisible until someone happens to open the admin panel — and a
    // complaint arriving as a one-star review needs answering quickly.
    const subjectLabel = subjectLabelFor(treatmentSlug);

    await Promise.all([
      sendReviewAdminNotification({
        id: result.id,
        name,
        email,
        city,
        rating,
        headline,
        subjectLabel,
        answers,
      }),
      // The reviewer is told their review is with a person and will not appear
      // instantly. Without this, moderation looks like the review vanished.
      sendReviewPendingEmail({ name, email, headline, subjectLabel }),
    ]);

    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error("[reviews] POST failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
