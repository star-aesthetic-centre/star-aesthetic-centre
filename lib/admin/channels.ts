/**
 * Marketing channels shown on the admin dashboard.
 *
 * The clinic has TWO Facebook pages (a duplicate to be merged) plus Instagram.
 * Follower counts are only available through Meta's Graph API with a page
 * access token — there is no public endpoint and scraping breaches Meta's
 * terms. So each channel reports one of three honest states:
 *
 *   connected   — a token is configured and Meta answered
 *   error       — a token is configured and Meta refused (expired, wrong scope)
 *   unconfigured— no token; the panel says which env var is missing
 *
 * It never guesses a number. A dashboard that shows a plausible-looking
 * follower count nobody can trace is worse than one that says "not connected".
 */

export type ChannelState = "connected" | "error" | "unconfigured";

export type Channel = {
  key: string;
  label: string;
  url: string;
  handle: string;
  state: ChannelState;
  followers: number | null;
  /** Connection status — why there is or isn't a number. */
  note: string;
  /** Standing editorial context, shown regardless of connection state. */
  context: string;
};

/** Meta page IDs, if the clinic has supplied them. Names match .env.example. */
const META_TOKEN = process.env.META_PAGE_ACCESS_TOKEN?.trim() ?? "";
const FB_PAGE_1_ID = process.env.META_FB_PAGE_1_ID?.trim() ?? "";
const FB_PAGE_2_ID = process.env.META_FB_PAGE_2_ID?.trim() ?? "";
const IG_ACCOUNT_ID = process.env.META_IG_ACCOUNT_ID?.trim() ?? "";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID?.trim() ?? "";

async function fetchFollowers(
  id: string,
  field: "followers_count" | "fan_count"
): Promise<{ followers: number | null; state: ChannelState; note: string }> {
  if (!META_TOKEN) {
    return {
      followers: null,
      state: "unconfigured",
      note: "Set META_PAGE_ACCESS_TOKEN to show live numbers.",
    };
  }
  if (!id) {
    return { followers: null, state: "unconfigured", note: "Page/account ID not set." };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${id}?fields=${field}&access_token=${encodeURIComponent(META_TOKEN)}`,
      { next: { revalidate: 3600 } }
    );
    const body = await res.json();
    if (!res.ok || body.error) {
      return {
        followers: null,
        state: "error",
        note: body?.error?.message ?? `Graph API returned ${res.status}`,
      };
    }
    return { followers: Number(body[field] ?? 0), state: "connected", note: "" };
  } catch (err) {
    return {
      followers: null,
      state: "error",
      note: err instanceof Error ? err.message : "Request failed",
    };
  }
}

export async function getChannels(): Promise<Channel[]> {
  const [fb1, fb2, ig] = await Promise.all([
    fetchFollowers(FB_PAGE_1_ID, "fan_count"),
    fetchFollowers(FB_PAGE_2_ID, "fan_count"),
    fetchFollowers(IG_ACCOUNT_ID, "followers_count"),
  ]);

  return [
    {
      key: "fb1",
      label: "Facebook — Durban North",
      url: "https://www.facebook.com/StarAestheticC",
      handle: "/StarAestheticC",
      ...fb1,
      context: "Indexed by Google. Likely the page to keep when the duplicate is merged.",
    },
    {
      key: "fb2",
      label: "Facebook — Star Aesthetic Centre",
      url: "https://www.facebook.com/staraesthetic.centre",
      handle: "@staraesthetic.centre",
      ...fb2,
      context:
        "Duplicate page. Export BOTH before merging: Meta combines followers but permanently deletes the absorbed page's posts, photos and videos.",
    },
    {
      key: "ig",
      label: "Instagram",
      url: "https://www.instagram.com/staraestheticcentre",
      handle: "@staraestheticcentre",
      ...ig,
      context: "Bio currently links to the old staraesthetic.site — point it at staraesthetic.co.za.",
    },
  ];
}

export type AnalyticsStatus = {
  state: ChannelState;
  note: string;
  propertyId: string;
};

/**
 * Google Analytics.
 *
 * Live GA4 numbers need the Data API and a service account, which is a real
 * dependency and real credentials. Neither exists yet — the practice's Google
 * account was disabled in 2024 and is under appeal — so this reports status
 * only rather than shipping an integration that cannot be run or tested.
 */
export function getAnalyticsStatus(): AnalyticsStatus {
  if (!GA4_PROPERTY_ID) {
    return {
      state: "unconfigured",
      propertyId: "",
      note: "No GA4 property yet. Create one under a current Google account (not the disabled info@staraesthetic.site), then set GA4_PROPERTY_ID.",
    };
  }
  return {
    state: "unconfigured",
    propertyId: GA4_PROPERTY_ID,
    note: "Property ID set. Live reporting still needs a service account and the GA4 Data API — ask for it and it can be wired up.",
  };
}
