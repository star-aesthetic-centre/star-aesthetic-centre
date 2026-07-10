"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminSessionToken } from "@/lib/security/admin-auth";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  // Fail closed if credentials aren't configured on the server.
  if (
    validUsername &&
    validPassword &&
    username === validUsername &&
    password === validPassword
  ) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, await adminSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    redirect("/admin/products");
  }

  return { error: "Incorrect username or password. Please try again." };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
