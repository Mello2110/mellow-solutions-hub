import { z } from "zod";

export const ProjectCategorySchema = z.enum([
  "extension",
  "webapp",
  "tool",
  "automation",
  "other",
]);

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;

export const ProjectStatusSchema = z.enum([
  "production",
  "beta",
  "wip",
  "archived",
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: ProjectCategorySchema,
  categoryLabel: z.string(),
  status: ProjectStatusSchema.default("production"),
  statusLabel: z.string().optional(),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  problemStatement: z.string(),
  technicalSolution: z.string(),
  architectureHighlights: z.array(z.string()),
  techStack: z.array(z.string()),
  links: z.object({
    chromeWebStore: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
  }),
  stats: z
    .object({
      users: z.string().optional(),
      rating: z.string().optional(),
      version: z.string().optional(),
      releaseDate: z.string().optional(),
    })
    .optional(),
  sandboxPreview: z
    .object({
      enabled: z.boolean(),
      embedUrl: z.string().url().optional(),
      description: z.string().optional(),
    })
    .optional(),
  screenshots: z.array(z.string()).optional(),
  clientSolutionId: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ClientSolutionSchema = z.object({
  id: z.string(),
  title: z.string(),
  clientContext: z.string(),
  role: z.string(),
  timeframe: z.string(),
  featuredInHub: z.boolean().default(false),
  clientGoal: z.string(),
  challenges: z.array(z.string()),
  solutionApproach: z.string(),
  outcome: z.string(),
  techStack: z.array(z.string()),
  links: z
    .object({
      demoUrl: z.string().url().optional(),
      githubUrl: z.string().url().optional(),
    })
    .optional(),
  sandboxPreview: z
    .object({
      enabled: z.boolean(),
      embedUrl: z.string().url().optional(),
      description: z.string().optional(),
    })
    .optional(),
  screenshots: z.array(z.string()).optional(),
});

export type ClientSolution = z.infer<typeof ClientSolutionSchema>;

export interface CategoryMeta {
  id: ProjectCategory | "all";
  label: string;
  count?: number;
  description: string;
  iconName: string;
}
