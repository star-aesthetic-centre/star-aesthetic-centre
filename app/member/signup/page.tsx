import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MemberSignupForm } from "@/components/member/MemberSignupForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Signup",
  description:
    "Create your Star Aesthetic Centre member account — shop, rewards, and bookings in one place.",
  path: "/member/signup",
  noIndex: true,
});

export default function MemberSignupPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#6B6966]">
          <Link href="/" className="hover:text-[#0F2647] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1917]">Member signup</span>
        </div>
      </nav>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-3">
            Star Aesthetic Centre
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1917] mb-3">
            Member signup
          </h1>
          <p className="text-sm text-[#6B6966] leading-relaxed mb-10 max-w-xl">
            Create your member account to shop medical-grade skincare, earn Star Light Rewards, and
            access your dashboard as we roll out order history and account features.
          </p>

          <div className="border border-[#E5E4E0] bg-white p-6 sm:p-8 shadow-sm">
            <MemberSignupForm />
          </div>

          <p className="mt-8 text-center text-sm text-[#6B6966]">
            Already registered?{" "}
            <Link href="/member/login" className="font-semibold text-[#0F2647] hover:text-[#C8A882]">
              Member login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
