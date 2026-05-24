import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getMemberSession } from "@/lib/member/session";
import { fetchMemberProfileData } from "@/lib/member/profile-data";
import MemberDashboard from "@/components/member/MemberDashboard";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "My Account | Star Aesthetic Centre",
  description: "Your Star Aesthetic Centre member dashboard.",
  path: "/member/dashboard",
  noIndex: true,
});

export default async function MemberDashboardPage() {
  const email = await getMemberSession();
  if (!email) redirect("/member/login");

  const data = await fetchMemberProfileData(email);
  if (!data) redirect("/member/login");

  return <MemberDashboard data={data} />;
}
