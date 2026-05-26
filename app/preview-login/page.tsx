"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function PreviewLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/preview-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F2647] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/images/star-aesthetic-centre-durban-logo-001.webp"
          alt="Star Aesthetic Centre"
          width={200}
          height={80}
          className="object-contain brightness-0 invert"
          unoptimized
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center bg-[#C8A882]/15">
            <Lock size={16} className="text-[#C8A882]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA]">
              Preview Access
            </p>
            <p className="text-sm font-semibold text-[#1A1917]">
              Site under construction
            </p>
          </div>
        </div>

        <p className="text-sm text-[#6B6966] leading-relaxed mb-6">
          This site is currently in preview. Enter the access password to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className="w-full border border-[#E5E4E0] bg-white px-4 py-3 pr-11 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#939EBA] hover:text-[#6B6966]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-[#C8A882] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#0F2647] transition-colors hover:bg-[#A08060] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Checking…
              </>
            ) : (
              "Enter Site"
            )}
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs text-[#939EBA]">
        Star Aesthetic Centre · Durban North · staraesthetic.co.za
      </p>
    </div>
  );
}
