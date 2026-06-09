import { NextRequest, NextResponse } from "next/server";
import { createLead, contactReasonToInterest } from "@/lib/crm/leads";
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
        metadata: { answers, skinScore: answers?.lifestyleScore },
      });
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown lead type" }, { status: 400 });
  } catch (err) {
    console.error("[leads]", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
