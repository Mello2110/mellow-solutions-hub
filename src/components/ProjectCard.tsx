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
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-white/10 bg-[#0d0f17]/85 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-copper/50 hover:shadow-2xl hover:shadow-glow-copper/20">
      {/* Top Ambient Glow on Hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-brand-copper/15 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-copper/25" />

      <div>
        {/* Header: Category Badge + Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono tracking-wide text-zinc-300 uppercase">
              {project.categoryLabel}
            </span>
            {project.badge && (
              <span className="rounded-lg border border-brand-copper/30 bg-brand-copper/10 px-2.5 py-1 text-[10px] font-medium text-brand-copperLight">
                {project.badge}
              </span>
            )}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-zinc-400">
              {project.statusLabel || "Live"}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-4 text-lg font-bold text-white sm:text-xl transition-colors group-hover:text-brand-copperLight">
          {project.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm line-clamp-2">
          {project.tagline}
        </p>

        {/* Problem Statement Box */}
        <div className="mt-5 rounded-2xl border border-white/5 bg-black/40 p-4 text-left">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Fokus / Problemstellung:
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 line-clamp-2">
            {project.problemStatement}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/5 bg-zinc-900/70 px-2.5 py-1 text-[10px] font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-lg border border-white/5 bg-zinc-900/40 px-2 py-1 text-[10px] font-mono text-zinc-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Metrics/Stats (if available) */}
        {project.stats && (
          <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-[11px] text-zinc-400">
            {project.stats.users && (
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                <span>{project.stats.users}</span>
              </div>
            )}
            {project.stats.rating && (
              <div className="flex items-center gap-1.5 text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{project.stats.rating}</span>
              </div>
            )}
            {project.stats.version && (
              <div className="ml-auto font-mono text-[10px] text-zinc-400">
                {project.stats.version}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        {/* External Links */}
        <div className="flex items-center gap-2">
          {project.links.chromeWebStore && (
            <a
              href={project.links.chromeWebStore}
              target="_blank"
              rel="noopener noreferrer"
              title="Im Chrome Web Store öffnen"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300"
            >
              <ChromeIcon className="h-4 w-4" />
            </a>
          )}

          {project.links.demoUrl && (
            <a
              href={project.links.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo / GitHub Page öffnen"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository ansehen"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Deep Dive Case Study Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/70 px-3.5 py-2 text-xs font-medium text-zinc-200 transition-all hover:border-brand-copper/60 hover:bg-brand-copper/15 hover:text-white hover:shadow-glow-copper/20"
        >
          <span>Architektur &amp; Details</span>
          <ChevronRight className="h-3.5 w-3.5 text-brand-copper" />
        </button>
      </div>
    </article>
  );
};
