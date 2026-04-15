import { MetadataRoute } from "next";
import { getAllModules, getAllLessonSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://epiphany.help";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/modules`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/rewards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const modules = getAllModules();
  const moduleRoutes: MetadataRoute.Sitemap = modules.map((mod) => ({
    url: `${base}/modules/${mod.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const lessonSlugs = getAllLessonSlugs();
  const lessonRoutes: MetadataRoute.Sitemap = lessonSlugs.map(({ moduleId, slug }) => ({
    url: `${base}/modules/${moduleId}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...moduleRoutes, ...lessonRoutes];
}
