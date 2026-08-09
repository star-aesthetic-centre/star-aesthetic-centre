import { NextRequest, NextResponse } from "next/server";
import { createLead, contactReasonToInterest } from "@/lib/crm/leads";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  guardFailureResponse,
  verifyPublicFormSubmission,
} from "@/lib/security/public-form-guard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const guard = await verifyPublicFormSubmission(req, {
      turnstileToken: body.turnstileToken,
      website: body.website,
      email: body.email,
      name: body.name,
    });
    if (!guard.ok) {
      const fail = guardFailureResponse(guard);
      return NextResponse.json(fail.body, { status: fail.status });
    }

    if (body.type === "contact") {
      const { name, email, phone, reason, message } = body;
      const { interestType, interestValue } = contactReasonToInterest(reason ?? "");
      const parts = String(name ?? "").trim().split(/\s+/);
      const result = await createLead({
        email,
        phone,
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
        source: "contact",
        interestType,
        interestValue,
        notes: message,
        metadata: { reason, message },
      });
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    if (body.type === "skin_assessment") {
      const { name, email, phone, answers } = body;
      const parts = String(name ?? "").trim().split(/\s+/);
      const primaryConcern = answers?.concerns?.[0] ?? "general";
      const result = await createLead({
        email,
        phone,
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
        source: "skin_assessment",
        interestType: "treatment",
        interestValue: primaryConcern,
        metadata: {
          answers: sanitiseAnswers(answers),
          skinScore: answers?.lifestyleScore,
          // The lead is written at the email gate, mid-survey. Without this
          // flag a partial assessment is indistinguishable from a finished
          // one, and the score reads as final when it isn't.
          completed: false,
        },
      });
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      // Returning the id lets the client complete this same record when the
      // remaining questions are answered, instead of creating a duplicate.
      return NextResponse.json({ ok: true, leadId: result.id });
    }

    return NextResponse.json({ error: "Unknown lead type" }, { status: 400 });
  } catch (err) {
    console.error("[leads]", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

/**
 * Strip the photo before storing.
 *
 * photoPreview is a base64 data URL of the patient's face — hundreds of
 * kilobytes inside a jsonb column, duplicated on every read of the leads
 * table, and health-related personal information under POPIA that nothing in
 * the admin panel actually displays. Keep the fact a photo was offered; drop
 * the image itself.
 */
function sanitiseAnswers(answers: Record<string, unknown> | undefined) {
  if (!answers || typeof answers !== "object") return {};
  const { photoPreview, ...rest } = answers as { photoPreview?: unknown };
  return { ...rest, photoProvided: Boolean(photoPreview) };
}

/**
 * Complete an in-progress assessment.
 *
 * The survey continues past the email gate — desired outcome, main obstacle,
 * preferred approach — and those are the answers a consultation actually
 * turns on. This merges them into the record created earlier rather than
 * writing a second lead for the same person.
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const leadId = String(body.leadId ?? "").trim();
    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    const { data: existing, error: readErr } = await supabase
      .from("leads")
      .select("metadata, source")
      .eq("id", leadId)
      .single();

    if (readErr || !existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    // Only assessment leads may be completed this way — the endpoint takes an
    // id from the browser, so it must not become a way to edit arbitrary leads.
    if (existing.source !== "skin_assessment") {
      return NextResponse.json({ error: "Not an assessment lead" }, { status: 400 });
    }

    const prev = (existing.metadata ?? {}) as Record<string, unknown>;
    const prevAnswers = (prev.answers ?? {}) as Record<string, unknown>;

    const { error: updateErr } = await supabase
      .from("leads")
      .update({
        metadata: {
          ...prev,
          answers: { ...prevAnswers, ...sanitiseAnswers(body.answers) },
          skinScore: body.answers?.lifestyleScore ?? prev.skinScore,
          completed: true,
          completedAt: new Date().toISOString(),
        },
      })
      .eq("id", leadId);

    if (updateErr) {
      console.error("[leads] assessment completion failed:", updateErr.message);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] PATCH", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
