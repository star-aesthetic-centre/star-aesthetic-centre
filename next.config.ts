import type { NextConfig } from "next";

// ─── Allow self-signed SSL cert for LocalWP in development ───────────────────
// star-aesthetic-centre.local uses a LocalWP-managed self-signed certificate
// which Node.js rejects by default. This is safe in local dev only.
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // LocalWP dev
      {
        protocol: "http",
        hostname: "star-aesthetic-centre.local",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "star-aesthetic-centre.local",
        pathname: "/wp-content/uploads/**",
      },
      // Legacy WordPress hosts
      {
        protocol: "https",
        hostname: "staraesthetic.co.za",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.staraesthetic.site",
        pathname: "/wp-content/uploads/**",
      },
      // Supabase Storage — product images for all brands
      {
        protocol: "https",
        hostname: "kprfezokgsmbizisvcrb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["star-aesthetic-centre.local"],
    },
  },
};

export default nextConfig;
