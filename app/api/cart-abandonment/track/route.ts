import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/lib/cart-context";
import { upsertAbandonedCheckout } from "@/lib/queries/abandoned-checkouts";

type Billing = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: CartItem[];
      billing: Billing;
    };

    const { items, billing } = body;
    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const result = await upsertAbandonedCheckout({
      email: billing.email,
      phone: billing.phone,
      firstName: billing.firstName,
      lastName: billing.lastName,
      items,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, recoveryToken: result.recoveryToken });
  } catch (err) {
    console.error("[cart-abandonment/track]", err);
    return NextResponse.json({ error: "Could not save checkout" }, { status: 500 });
  }
}
