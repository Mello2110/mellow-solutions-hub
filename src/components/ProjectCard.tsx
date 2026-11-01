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

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
}) => {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f17]/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-[#11131e]">
      <div>
        {/* Header: Category Badge + Status */}
        <div className="flex h-6 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono tracking-wide text-zinc-300 uppercase">
              {project.categoryLabel}
            </span>
            {project.badge && (
              <span className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                {project.badge}
              </span>
            )}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-zinc-400">
              {project.statusLabel || "Live"}
            </span>
          </div>
        </div>

        {/* Uniform Title Box (exact height across all cards) */}
        <div className="mt-3.5 h-12 flex items-center">
          <h3 className="text-base font-semibold text-zinc-100 line-clamp-2 leading-snug transition-colors group-hover:text-white">
            {project.title}
          </h3>
        </div>

        {/* Uniform Tagline Box (exact height across all cards) */}
        <div className="mt-1 h-9">
          <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Uniform Problem Statement Box (exact identical height across all cards) */}
        <div className="mt-4 h-24 rounded-xl border border-white/5 bg-zinc-950/70 p-3 flex flex-col justify-between">
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Problemstellung:
          </div>
          <p className="text-xs leading-relaxed text-zinc-300 line-clamp-2">
            {project.problemStatement}
          </p>
        </div>

        {/* Uniform Tech Stack Pills Box */}
        <div className="mt-4 h-12 flex flex-wrap content-start gap-1.5 overflow-hidden">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/5 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded border border-white/5 bg-zinc-900/40 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Metrics/Stats Area */}
        <div className="mt-2 h-7 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            {project.stats?.users && (
              <div className="flex items-center gap-1 text-zinc-300 text-[10px]">
                <Users className="h-3 w-3 text-zinc-400" />
                <span>{project.stats.users}</span>
              </div>
            )}
            {project.stats?.rating && (
              <div className="flex items-center gap-1 text-amber-300/90 text-[10px]">
                <Star className="h-3 w-3 fill-amber-400/80 text-amber-400" />
                <span>{project.stats.rating}</span>
              </div>
            )}
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            {project.stats?.version || "v1.0"}
          </div>
        </div>
      </div>

      {/* Footer Actions (Anchored at the bottom) */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
        {/* External Links */}
        <div className="flex items-center gap-1.5">
          {project.links.chromeWebStore && (
            <a
              href={project.links.chromeWebStore}
              target="_blank"
              rel="noopener noreferrer"
              title="Chrome Web Store"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
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
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Details Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:bg-zinc-800 hover:text-white"
        >
          <span>Details</span>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
        </button>
      </div>
    </article>
  );
};
