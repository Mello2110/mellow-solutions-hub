import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INITIAL_PROJECTS } from "@/data/projects";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Mellow Solutions Hub",
    };
  }

  return {
    title: `${project.title} | Mellow Solutions Hub`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
