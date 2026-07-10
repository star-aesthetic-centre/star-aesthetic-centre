/**
 * Lightweight in-memory rate limiter (fixed window per key).
 *
 * NOTE: state lives in the process, so on serverless each instance keeps its
 * own counters — this is a best-effort speed bump against a single abuser
 * hammering one instance, NOT a distributed guarantee. For hard limits at
 * scale, back this with Upstash/Redis. It meaningfully raises the bar against
 * casual scraping and email enumeration with zero added infrastructure.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Returns true if the request is ALLOWED, false if the limit is exceeded.
 * @param key     unique identifier (e.g. `"rewards-lookup:<ip>"`)
 * @param limit   max requests permitted within the window
 * @param windowMs window length in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map can't grow unbounded.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (now >= b.resetAt) buckets.delete(k);
    }
    return true;
  }

  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}
