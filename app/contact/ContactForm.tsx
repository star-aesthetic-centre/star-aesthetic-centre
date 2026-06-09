"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { HoneypotField } from "@/components/security/HoneypotField";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";

const REASONS = [
    "Book a Consultation",
    "Treatment Enquiry",
    "Product / Skincare Advice",
    "Pricing & Packages",
    "Other",
];

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        reason: "",
        message: "",
        website: "",
    });
    const [turnstileToken, setTurnstileToken] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
        if (siteKey && !turnstileToken) {
            setErrorMessage("Please complete the security check below.");
            setStatus("error");
            return;
        }

        setStatus("sending");
        const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "contact",
                name: form.name,
                email: form.email,
                phone: form.phone,
                reason: form.reason,
                message: form.message,
                turnstileToken: turnstileToken || undefined,
                website: form.website,
            }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setStatus("error");
            setErrorMessage(data.error ?? "Something went wrong. Please try again.");
            return;
        }
        setStatus("sent");
    };

    if (status === "sent") {
        return (
            <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2647]/10">
                    <CheckCircle2 className="h-8 w-8 text-[#0F2647]" />
                </div>
                <div>
                    <p className="font-heading text-xl font-semibold text-[#1A1917]">
                        Thank you, {form.name.split(" ")[0]}!
                    </p>
                    <p className="mt-1 text-sm text-[#6B6966]">
                        We&apos;ve received your message and will be in touch within 2 business hours.
                    </p>
                </div>
                <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", reason: "", message: "", website: "" }); setTurnstileToken(""); }}
                    className="text-xs text-[#939EBA] underline underline-offset-2 hover:text-[#0F2647] transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="relative space-y-4">
            <HoneypotField value={form.website} onChange={(website) => setForm((prev) => ({ ...prev, website }))} />

            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                    Full Name <span className="text-[#C8A882]">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder:text-[#A9A8A4] focus:border-[#939EBA] focus:outline-none transition-colors"
                />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                        Email <span className="text-[#C8A882]">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@email.com"
                        className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder:text-[#A9A8A4] focus:border-[#939EBA] focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="082 000 0000"
                        className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder:text-[#A9A8A4] focus:border-[#939EBA] focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Reason */}
            <div>
                <label htmlFor="reason" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                    How Can We Help?
                </label>
                <select
                    id="reason"
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none transition-colors appearance-none"
                >
                    <option value="">Select a reason…</option>
                    {REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about your concern or what you'd like to achieve…"
                    className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder:text-[#A9A8A4] focus:border-[#939EBA] focus:outline-none transition-colors resize-none"
                />
            </div>

            <TurnstileWidget
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                className="flex justify-center"
            />

            {status === "error" && errorMessage && (
                <p className="text-center text-sm text-red-700">{errorMessage}</p>
            )}

            {/* Submit */}
            <div className="pt-1">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 bg-[#0F2647] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1B3D6E] disabled:opacity-60"
                >
                    {status === "sending" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                        <><Send className="h-4 w-4" /> Send Message</>
                    )}
                </button>
                <p className="mt-3 text-center text-xs text-[#A9A8A4]">
                    🔒 Your information is private and will never be shared. No spam, ever.
                </p>
            </div>
        </form>
    );
}
