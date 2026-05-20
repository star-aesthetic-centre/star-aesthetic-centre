import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MemberLoginForm } from "@/components/member/MemberLoginForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Login",
  description: "Sign in to your Star Aesthetic Centre member account.",
  path: "/member/login",
  noIndex: true,
});

export default function MemberLoginPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#6B6966]">
          <Link href="/" className="hover:text-[#0F2647] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1917]">Member login</span>
        </div>
      </nav>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-3">
            Star Aesthetic Centre
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1917] mb-3">
            Member login
          </h1>
          <p className="text-sm text-[#6B6966] leading-relaxed mb-10 max-w-xl">
            Sign in with the email address you used when you registered. Your full dashboard —
            including order history and Star Light Rewards — is being prepared.
          </p>

          <MemberLoginForm />

          <p className="mt-8 text-sm text-[#6B6966]">
            Don&apos;t have an account?{" "}
            <Link href="/member/signup" className="font-semibold text-[#0F2647] hover:text-[#C8A882]">
              Member signup
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
