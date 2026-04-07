import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client using the SERVICE ROLE key.
 * Bypasses Row Level Security — use only in server actions and server routes.
 * NEVER import in client components.
 */
export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
