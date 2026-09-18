import type { MetadataRoute } from "next";
import { site, locations, equipment } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/method",
    "/sessions",
    "/locations",
    "/equipment",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const locationRoutes = locations
    .filter((l) => l.status === "active")
    .map((l) => ({
      url: `${base}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const equipmentRoutes = equipment.map((e) => ({
    url: `${base}/equipment/${e.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...locationRoutes, ...equipmentRoutes];
}
