import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INITIAL_PROJECTS } from "@/data/projects";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

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
      title: "Project Not Found",
    };
  }

  const ogImage = project.screenshots?.[0] || DEFAULT_OG_IMAGE;

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | ${SITE_NAME}`,
      description: project.tagline,
      url: `/projects/${project.id}`,
      images: [{ url: ogImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${SITE_NAME}`,
      description: project.tagline,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.tagline,
    url: `${SITE_URL}/projects/${project.id}`,
    applicationCategory:
      project.category === "extension"
        ? "BrowserApplication"
        : "WebApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
