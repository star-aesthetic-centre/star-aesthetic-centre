import { redirect } from "next/navigation";

// /about is reserved for the Star Aesthetic Centre practice page.
// Dr. Bangalee's profile has moved to /dr-rajeev-bangalee.
export default function AboutRedirect() {
  redirect("/dr-rajeev-bangalee");
}
