import type { MetadataRoute } from "next";
import { publicPaths, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
