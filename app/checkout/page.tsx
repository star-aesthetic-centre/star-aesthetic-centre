"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BANK_DETAILS } from "@/lib/constants/banking";
import { useRouter } from "next/navigation";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

/* ─── SA Provinces ─────────────────────────────────────────────── */
const PROVINCES = [
    { value: "KZN", label: "KwaZulu-Natal" },
    { value: "GP", label: "Gauteng" },
    { value: "WC", label: "Western Cape" },
    { value: "EC", label: "Eastern Cape" },
    { value: "FS", label: "Free State" },
    { value: "LP", label: "Limpopo" },
    { value: "MP", label: "Mpumalanga" },
    { value: "NW", label: "North West" },
    { value: "NC", label: "Northern Cape" },
];

/* ─── Types ─────────────────────────────────────────────────────── */
type BillingForm = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    province: string;
    postalCode: string;
};

type FormErrors = Partial<Record<keyof BillingForm, string>>;

/* ─── Input style ───────────────────────────────────────────────── */
const inputClass =
    "w-full border border-[#E2E2E6] bg-white px-4 py-3 text-sm text-[#1A1A1F] placeholder:text-[#939EBA]/60 focus:outline-none focus:border-[#939EBA] transition-colors";
const errorInputClass =
    "w-full border border-red-400 bg-white px-4 py-3 text-sm text-[#1A1A1F] placeholder:text-[#939EBA]/60 focus:outline-none focus:border-red-500 transition-colors";

/* ─── Component ─────────────────────────────────────────────────── */
export default function CheckoutPage() {
    const router = useRouter();
    const { state, dispatch, subtotal } = useCart();
    const { items } = state;

    const [form, setForm] = useState<BillingForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        postalCode: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Gift voucher
    const [voucherInput, setVoucherInput] = useState("");
    const [voucherChecking, setVoucherChecking] = useState(false);
    const [voucherError, setVoucherError] = useState("");
    const [appliedVoucher, setAppliedVoucher] = useState<{
        code: string;
        balance_rands: number;
        recipient_name: string;
    } | null>(null);

    /* ── Empty cart guard ──────────────────────────────────────── */
    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] bg-[#F7F7F8]">
                <div className="mx-auto max-w-lg px-4 py-24 text-center">
                    <ShoppingCart
                        size={56}
                        strokeWidth={1}
                        className="mx-auto mb-6 text-[#E2E2E6]"
                    />
                    <h1 className="font-heading mb-4 text-2xl font-bold text-[#1A1A1F]">
                        Your cart is empty
                    </h1>
                    <p className="mb-8 text-sm text-[#636374]">
                        You need to add products before checking out.
                    </p>
                    <Link
                        href="/shop"
                        className="bg-[#1B3D6E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    /* ── Validation ────────────────────────────────────────────── */
    function validate(): boolean {
        const newErrors: FormErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "Required";
        if (!form.lastName.trim()) newErrors.lastName = "Required";
        if (!form.email.trim() || !form.email.includes("@"))
            newErrors.email = "Valid email required";
        if (!form.phone.trim()) newErrors.phone = "Required";
        if (!form.address1.trim()) newErrors.address1 = "Required";
        if (!form.city.trim()) newErrors.city = "Required";
        if (!form.province) newErrors.province = "Required";
        if (!form.postalCode.trim()) newErrors.postalCode = "Required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    /* ── Field helper ──────────────────────────────────────────── */
    function field(name: keyof BillingForm) {
        return {
            value: form[name],
            onChange: (
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            ) => {
                setForm((f) => ({ ...f, [name]: e.target.value }));
                if (errors[name])
                    setErrors((err) => ({ ...err, [name]: undefined }));
            },
            className: errors[name] ? errorInputClass : inputClass,
        };
    }

    /* ── Shipping ─────────────────────────────────────────────── */
    const FREE_SHIPPING_THRESHOLD = 800;
    const STANDARD_SHIPPING = 120;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

    /* ── Voucher discount ──────────────────────────────────────── */
    const voucherDiscount = appliedVoucher
        ? Math.min(appliedVoucher.balance_rands, subtotal)
        : 0;
    const orderTotal = Math.max(0, subtotal + shippingCost - voucherDiscount);

    async function checkVoucher() {
        const code = voucherInput.trim().toUpperCase();
        if (!code) return;
        setVoucherChecking(true);
        setVoucherError("");
        try {
            const res = await fetch(`/api/vouchers/validate?code=${encodeURIComponent(code)}`);
            const data = await res.json();
            if (data.valid) {
                setAppliedVoucher({ code, balance_rands: data.balance_rands, recipient_name: data.recipient_name });
                setVoucherInput("");
            } else {
                setVoucherError(data.error ?? "Invalid voucher code.");
            }
        } catch {
            setVoucherError("Could not check voucher — please try again.");
        } finally {
            setVoucherChecking(false);
        }
    }

    /* ── Submit ────────────────────────────────────────────────── */
    async function handlePlaceOrder() {
        if (!validate()) return;
        setIsSubmitting(true);
        setSubmitError("");
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, billing: form, voucher_code: appliedVoucher?.code ?? null }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                // Surface full WC error details in dev for easy diagnosis
                throw new Error(errData.error ?? "Order submission failed");
            }
            const { orderId, orderKey } = await res.json();
            dispatch({ type: "CLEAR_CART" });
            router.push(
                `/order-confirmation?orderId=${orderId}&key=${orderKey}`
            );
        } catch (err: unknown) {
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again or contact us."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    /* ── Render ────────────────────────────────────────────────── */
    return (
        <div className="min-h-screen bg-[#F7F7F8]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="font-heading mb-8 text-3xl font-bold text-[#1A1A1F]">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* ── Left: Billing form (2/3) ──────────────── */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Contact details */}
                        <div className="border border-[#E2E2E6] bg-white p-6">
                            <h2 className="font-heading mb-5 text-base font-bold text-[#1A1A1F]">
                                Contact Details
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Jane"
                                        {...field("firstName")}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Smith"
                                        {...field("lastName")}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        {...field("email")}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="082 000 0000"
                                        {...field("phone")}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Shipping address */}
                        <div className="border border-[#E2E2E6] bg-white p-6">
                            <h2 className="font-heading mb-5 text-base font-bold text-[#1A1A1F]">
                                Shipping Address
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Address Line 1 *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="12 Ocean Drive"
                                        {...field("address1")}
                                    />
                                    {errors.address1 && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.address1}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Address Line 2
                                        <span className="ml-1 font-normal text-[#939EBA]">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Apartment, suite, unit..."
                                        {...field("address2")}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                            City / Town *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Durban North"
                                            {...field("city")}
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                            Province *
                                        </label>
                                        <select
                                            value={form.province}
                                            onChange={(e) => {
                                                setForm((f) => ({
                                                    ...f,
                                                    province: e.target.value,
                                                }));
                                                if (errors.province)
                                                    setErrors((err) => ({
                                                        ...err,
                                                        province: undefined,
                                                    }));
                                            }}
                                            className={
                                                errors.province
                                                    ? errorInputClass
                                                    : inputClass
                                            }
                                        >
                                            <option value="">
                                                Select province...
                                            </option>
                                            {PROVINCES.map((p) => (
                                                <option
                                                    key={p.value}
                                                    value={p.value}
                                                >
                                                    {p.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.province && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.province}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:w-1/2">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#636374]">
                                        Postal Code *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="4051"
                                        {...field("postalCode")}
                                    />
                                    {errors.postalCode && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.postalCode}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Order summary (1/3) ─────────────── */}
                    <div className="self-start space-y-4">

                        {/* Items */}
                        <div className="border border-[#E2E2E6] bg-white p-5">
                            <h2 className="font-heading mb-4 text-base font-bold text-[#1A1A1F]">
                                Order Summary
                            </h2>

                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative h-12 w-12 shrink-0 border border-[#E2E2E6] bg-[#F7F7F8] overflow-hidden">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="truncate text-xs font-semibold text-[#1A1A1F]">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-[#636374]">
                                                × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="shrink-0 text-xs font-bold text-[#1A1A1F]">
                                            R{" "}
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 border-t border-[#E2E2E6] pt-4 space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#636374]">
                                        Subtotal
                                    </span>
                                    <span className="font-semibold text-[#1A1A1F]">
                                        R {subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#636374]">
                                        Shipping
                                        {subtotal < FREE_SHIPPING_THRESHOLD && (
                                            <span className="ml-1 text-[10px] text-[#939EBA]">
                                                (free over R{FREE_SHIPPING_THRESHOLD})
                                            </span>
                                        )}
                                    </span>
                                    {shippingCost === 0 ? (
                                        <span className="font-semibold text-green-600">Free</span>
                                    ) : (
                                        <span className="font-semibold text-[#1A1A1F]">R {shippingCost.toFixed(2)}</span>
                                    )}
                                </div>

                                {/* Gift voucher input */}
                                {!appliedVoucher ? (
                                    <div className="pt-2">
                                        <p className="text-xs font-semibold text-[#636374] mb-1.5">Gift Voucher</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={voucherInput}
                                                onChange={e => { setVoucherInput(e.target.value.toUpperCase()); setVoucherError(""); }}
                                                onKeyDown={e => e.key === "Enter" && checkVoucher()}
                                                placeholder="SAC-XXXX-XXXX-XXXX"
                                                className="flex-1 border border-[#E2E2E6] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C8A882] bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={checkVoucher}
                                                disabled={voucherChecking || !voucherInput.trim()}
                                                className="px-3 py-2 bg-[#0F2647] text-white text-xs font-semibold hover:bg-[#1B3D6E] transition-colors disabled:opacity-50 whitespace-nowrap"
                                            >
                                                {voucherChecking ? "…" : "Apply"}
                                            </button>
                                        </div>
                                        {voucherError && (
                                            <p className="text-xs text-red-600 mt-1">{voucherError}</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-between text-sm items-center bg-green-50 border border-green-200 px-3 py-2">
                                        <div>
                                            <span className="font-semibold text-green-800">Voucher applied</span>
                                            <p className="font-mono text-[10px] text-green-700">{appliedVoucher.code}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-green-800">−R {voucherDiscount.toFixed(2)}</span>
                                            <button
                                                type="button"
                                                onClick={() => setAppliedVoucher(null)}
                                                className="text-green-600 hover:text-green-800 text-xs"
                                                title="Remove voucher"
                                            >✕</button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between border-t border-[#E2E2E6] pt-3">
                                    <span className="font-bold text-[#1A1A1F]">
                                        Total
                                    </span>
                                    <span className="font-bold text-[#1A1A1F]">
                                        R {orderTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment: Direct Bank Transfer */}
                        <div className="border border-[#E2E2E6] bg-[#F7F7F8] p-5">
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#939EBA]">
                                Payment Method
                            </p>
                            <p className="mb-4 text-sm font-semibold text-[#1A1A1F]">
                                Direct Bank Transfer (EFT)
                            </p>
                            <dl className="space-y-2 text-sm">
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">
                                        Bank
                                    </dt>
                                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.bank}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">Account Name</dt>
                                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountName}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">Account No</dt>
                                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountNo}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">Branch Code</dt>
                                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.branchCode}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">Account Type</dt>
                                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountType}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-28 shrink-0 text-[#636374]">
                                        Reference
                                    </dt>
                                    <dd className="text-[#636374]">
                                        Your order number (emailed to you)
                                    </dd>
                                </div>
                            </dl>
                            <p className="mt-4 text-xs leading-relaxed text-[#636374]">
                                Your order will be processed once payment is
                                confirmed. Please email proof of payment to{" "}
                                <a
                                    href="mailto:info@staraesthetic.site"
                                    className="text-[#939EBA] hover:underline"
                                >
                                    info@staraesthetic.site
                                </a>
                                .
                            </p>
                        </div>

                        {/* Submit error */}
                        {submitError && (
                            <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                <AlertCircle
                                    size={16}
                                    className="mt-0.5 shrink-0"
                                />
                                <p>{submitError}</p>
                            </div>
                        )}

                        {/* Place Order */}
                        <button
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className="w-full bg-[#1B3D6E] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#162f56] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Placing Order…" : "Place Order"}
                        </button>

                        <p className="text-center text-xs text-[#636374]">
                            By placing your order you agree to our{" "}
                            <Link
                                href="/terms"
                                className="text-[#939EBA] hover:underline"
                            >
                                terms & conditions
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
