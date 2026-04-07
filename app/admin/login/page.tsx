"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[#F2F1EF] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-28 w-80">
            <Image
              src="/images/star-aesthetic-centre-durban-logo.webp"
              alt="Star Aesthetic Centre"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E4E0] p-8">
          <h1 className="text-xl font-bold text-[#1A1917] mb-1">Admin Portal</h1>
          <p className="text-sm text-[#6B6966] mb-6">Staff access only</p>

          <form action={action} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                autoFocus
                className="w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#0F2647] text-white text-sm font-semibold uppercase tracking-widest py-3 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#6B6966] mt-4">
          Star Aesthetic Centre · Staff Portal
        </p>
      </div>
    </div>
  );
}
