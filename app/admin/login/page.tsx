"use client";

import { useActionState, useState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

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
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                autoFocus
                className="w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full border border-[#E5E4E0] bg-white px-3 py-2.5 pr-10 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-[#6B6966] hover:text-[#1A1917] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    /* Eye-off */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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
