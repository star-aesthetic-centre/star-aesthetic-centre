import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/lib/cart-context";

/** Decode WPGraphQL global ID → numeric WooCommerce database ID
 *  e.g. "cHJvZHVjdDoxNzY=" → atob → "product:176" → 176
 */
function decodeProductId(globalId: string): number {
    try {
        const decoded = atob(globalId); // "product:176"
        return parseInt(decoded.split(":")[1], 10);
    } catch {
        return 0;
    }
}

export async function POST(req: NextRequest) {
    try {
        const { items, billing } = (await req.json()) as {
            items: CartItem[];
            billing: {
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                address1: string;
                address2?: string;
                city: string;
                province: string;
                postalCode: string;
            };
        };

        if (!items?.length) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        const lineItems = items.map((item) => ({
            product_id: decodeProductId(item.id),
            quantity: item.quantity,
        }));

        const orderPayload = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: false,
            status: "pending",
            billing: {
                first_name: billing.firstName,
                last_name: billing.lastName,
                address_1: billing.address1,
                address_2: billing.address2 ?? "",
                city: billing.city,
                state: billing.province,
                postcode: billing.postalCode,
                country: "ZA",
                email: billing.email,
                phone: billing.phone,
            },
            shipping: {
                first_name: billing.firstName,
                last_name: billing.lastName,
                address_1: billing.address1,
                address_2: billing.address2 ?? "",
                city: billing.city,
                state: billing.province,
                postcode: billing.postalCode,
                country: "ZA",
            },
            line_items: lineItems,
            customer_note: "Order placed via Star Aesthetic Centre website",
        };

        const credentials = Buffer.from(
            `${process.env.WC_KEY}:${process.env.WC_SECRET}`
        ).toString("base64");

        const wcRes = await fetch(
            `${process.env.WC_API_URL}/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${credentials}`,
                },
                body: JSON.stringify(orderPayload),
                // @ts-expect-error — Node fetch doesn't have rejectUnauthorized in types
                agent: undefined,
            }
        );

        if (!wcRes.ok) {
            const errBody = await wcRes.json().catch(() => ({}));
            console.error("[orders/route] WooCommerce HTTP", wcRes.status, errBody);
            // In dev, surface the full WC error so we can diagnose it
            return NextResponse.json(
                {
                    error: "Failed to create order in WooCommerce",
                    wcStatus: wcRes.status,
                    wcError: errBody,
                    lineItems,
                },
                { status: 502 }
            );
        }

        const order = await wcRes.json();

        return NextResponse.json({
            orderId: order.id,
            orderKey: order.order_key,
        });
    } catch (err) {
        console.error("[orders/route] Unexpected error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
