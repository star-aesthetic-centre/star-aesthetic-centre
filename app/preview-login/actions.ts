"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function previewLoginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const from = (formData.get("from") as string) || "/";

  const previewPassword = process.env.PREVIEW_PASSWORD;

  if (!previewPassword || password !== previewPassword) {
    redirect(`/preview-login?error=1&from=${encodeURIComponent(from)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("preview_session", previewPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect(from.startsWith("/") ? from : "/");
}
