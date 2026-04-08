import { Suspense } from "react";
import { previewLoginAction } from "./actions";
import Image from "next/image";

export const metadata = { title: "Preview Access — Star Aesthetic Centre" };

function PreviewLoginForm({ from, error }: { from: string; error: boolean }) {
  return (
    <div className="min-h-screen bg-[#F8F8F7] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/images/star-aesthetic-centre-durban-logo-001.png"
            alt="Star Aesthetic Centre"
            width={180}
            height={60}
            className="mx-auto h-auto w-[160px] object-contain mb-6"
            unoptimized
          />
          <h1 className="font-heading text-xl font-bold text-[#1A1917] mb-2">
            Preview Access
          </h1>
          <p className="text-sm text-[#6B6966]">
            This site is currently in private preview.<br />
            Enter the access password to continue.
          </p>
        </div>

        {/* Form */}
        <form action={previewLoginAction} className="space-y-4">
          <input type="hidden" name="from" value={from} />

          <div>
            <input
              type="password"
              name="password"
              placeholder="Access password"
              autoFocus
              required
              className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder:text-[#939EBA] focus:outline-none focus:border-[#C8A882] transition-colors"
            />
            {error && (
              <p className="mt-2 text-xs text-red-600">Incorrect password — please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F2647] text-white py-3 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors"
          >
            Enter Site
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#939EBA]">
          Star Aesthetic Centre · Durban North
        </p>
      </div>
    </div>
  );
}

export default async function PreviewLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const params = await searchParams;
  const from = params.from ?? "/";
  const error = params.error === "1";

  return (
    <Suspense>
      <PreviewLoginForm from={from} error={error} />
    </Suspense>
  );
}
