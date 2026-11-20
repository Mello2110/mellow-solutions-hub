"use client";

import React from "react";
import { Project } from "@/types/project";
import {
  ExternalLink,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";
import { Language, DICTIONARY } from "@/data/i18n";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  language: Language;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  language,
}) => {
  const t = DICTIONARY[language].catalog;
  const tCat = DICTIONARY[language].categories;
  const tModal = DICTIONARY[language].modal;

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f17]/90 p-5 sm:p-6 transition-all duration-300 sm:hover:-translate-y-0.5 hover:border-[#C76C6A]/50 hover:shadow-card-subtle">
      <div>
        {/* Header: Category Badge + Status */}
        <div className="flex h-6 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-zinc-300 uppercase">
              {tCat[project.category] || project.categoryLabel}
            </span>
            {project.badge && (
              <span className="rounded-md border border-[#C76C6A]/30 bg-[#C76C6A]/15 px-2 py-0.5 text-[10px] font-medium text-white">
                {project.badge}
              </span>
            )}
          </div>

          {/* Calm Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-zinc-400">
              {project.statusLabel || tModal.statusLive}
            </span>
          </div>
        </div>

        {/* Uniform Title Box */}
        <div className="mt-4 min-h-[2.75rem] flex items-center">
          <h3 className="text-base font-semibold text-zinc-100 line-clamp-2 leading-snug transition-colors group-hover:text-white">
            {project.title}
          </h3>
        </div>

        {/* Uniform Tagline Box */}
        <div className="mt-1 min-h-[2.25rem]">
          <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Editorial Problem Statement (De-boxed) */}
        <div className="mt-4 border-l border-white/15 pl-3 py-0.5">
          <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
            {t.problem}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-zinc-300 line-clamp-2">
            {project.problemStatement}
          </p>
        </div>

        {/* Uniform Tech Stack Pills Box */}
        <div className="mt-4 h-12 flex flex-wrap content-start gap-1.5 overflow-hidden">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/5 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-mono text-cyan-200/90"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Metrics/Stats Area */}
        <div className="mt-2 h-7 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-zinc-400 tabular-nums">
          <div className="flex items-center gap-3">
            {project.stats?.users && (
              <div className="flex items-center gap-1 text-zinc-300 text-[10px]">
                <Users className="h-3 w-3 text-cyan-400" />
                <span>{project.stats.users}</span>
              </div>
            )}
            {project.stats?.rating && (
              <div className="flex items-center gap-1 text-amber-300 text-[10px]">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{project.stats.rating}</span>
              </div>
            )}
          </div>
          <div className="font-mono text-[10px] text-zinc-400 tabular-nums">
            {project.stats?.version || "v1.0"}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
        {/* External Links */}
        <div className="flex items-center gap-1.5">
          {project.links.chromeWebStore && (
            <a
              href={project.links.chromeWebStore}
              target="_blank"
              rel="noopener noreferrer"
              title="Chrome Web Store"
              aria-label={`Chrome Web Store: ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-sky-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-sky-300"
            >
              <ChromeIcon className="h-3.5 w-3.5" />
            </a>
          )}

          {project.links.demoUrl && (
            <a
              href={project.links.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              aria-label={`Live Demo: ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              aria-label={`GitHub Repository: ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Details Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="flex min-h-[36px] items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all hover:border-[#C76C6A]/60 hover:bg-[#C76C6A]/15 hover:text-white"
        >
          <span>{t.details}</span>
          <ChevronRight className="h-3.5 w-3.5 text-[#C76C6A]" />
        </button>
      </div>
    </article>
  );
};
