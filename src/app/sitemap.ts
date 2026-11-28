import type { MetadataRoute } from "next";
import { INITIAL_PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = INITIAL_PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: project.featured ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...projectRoutes];
}
