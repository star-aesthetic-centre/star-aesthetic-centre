import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/preview-login"],
      },
    ],
    sitemap: "https://www.staraesthetic.online/sitemap.xml",
  };
}
