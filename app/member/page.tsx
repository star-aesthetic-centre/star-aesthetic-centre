import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, LogIn, UserPlus } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Account",
  description: "Sign up or sign in to your Star Aesthetic Centre member account.",
  path: "/member",
  noIndex: true,
});

export default function MemberHubPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#6B6966]">
          <Link href="/" className="hover:text-[#0F2647] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1917]">Member account</span>
        </div>
      </nav>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-3">
            Star Aesthetic Centre
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1917] mb-3">
            Member account
          </h1>
          <p className="text-sm text-[#6B6966] leading-relaxed mb-12">
            Shop medical-grade skincare, earn Star Light Rewards, and access your account.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/member/signup"
              className="group flex flex-col items-center gap-4 border-2 border-[#E5E4E0] bg-white p-8 transition-colors hover:border-[#C8A882] hover:bg-[#FFF8F0]"
            >
              <span className="flex h-14 w-14 items-center justify-center bg-[#0F2647] text-[#C8A882] transition-colors group-hover:bg-[#1B3D6E]">
                <UserPlus size={26} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block font-heading text-lg font-bold text-[#1A1917] group-hover:text-[#0F2647]">
                  Sign up
                </span>
                <span className="mt-1 block text-xs text-[#6B6966] leading-relaxed">
                  Create your member account
                </span>
              </span>
            </Link>

            <Link
              href="/member/login"
              className="group flex flex-col items-center gap-4 border-2 border-[#E5E4E0] bg-white p-8 transition-colors hover:border-[#939EBA] hover:bg-[#F8F9FC]"
            >
              <span className="flex h-14 w-14 items-center justify-center border-2 border-[#0F2647] text-[#0F2647] transition-colors group-hover:bg-[#0F2647] group-hover:text-white">
                <LogIn size={26} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block font-heading text-lg font-bold text-[#1A1917] group-hover:text-[#0F2647]">
                  Login
                </span>
                <span className="mt-1 block text-xs text-[#6B6966] leading-relaxed">
                  Sign in with your email
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
