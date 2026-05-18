import { NextRequest, NextResponse } from "next/server";
import { getAbandonedCheckoutByToken } from "@/lib/queries/abandoned-checkouts";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const row = await getAbandonedCheckoutByToken(token);
  if (!row) {
    return NextResponse.json({ error: "Cart not found or expired" }, { status: 404 });
  }

  return NextResponse.json({
    items: row.cart_items,
    billing: {
      firstName: row.first_name ?? "",
      lastName: row.last_name ?? "",
      email: row.email,
      phone: row.phone,
    },
  });
}
