"use client";

import React from "react";
import { Project } from "@/types/project";
import {
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Users,
  Code2,
  PlayCircle,
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
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0e1017]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-card-subtle hover:shadow-glow-cyan/15">
      {/* Top Ambient Glow on Hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-cyan-500/20" />

      <div>
        {/* Header: Category Badge + Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono tracking-wide text-zinc-300 uppercase">
              {project.categoryLabel}
            </span>
            {project.badge && (
              <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                {project.badge}
              </span>
            )}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
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
        <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 line-clamp-2">
          {project.tagline}
        </p>

        {/* Problem Statement Box */}
        <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3 text-left">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Fokus / Problemstellung:
          </div>
          <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
            {project.problemStatement}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/5 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
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

        {/* Metrics/Stats (if available) */}
        {project.stats && (
          <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3 text-[11px] text-zinc-400">
            {project.stats.users && (
              <div className="flex items-center gap-1 text-zinc-300">
                <Users className="h-3 w-3 text-cyan-400" />
                <span>{project.stats.users}</span>
              </div>
            )}
            {project.stats.rating && (
              <div className="flex items-center gap-1 text-amber-300">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
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
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
        {/* External Links: Chrome Store / Demo / GitHub */}
        <div className="flex items-center gap-1.5">
          {project.links.chromeWebStore && (
            <a
              href={project.links.chromeWebStore}
              target="_blank"
              rel="noopener noreferrer"
              title="Im Chrome Web Store öffnen"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300"
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
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300"
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
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Deep Dive Case Study Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/40 hover:shadow-glow-cyan/20"
        >
          <span>Architektur & Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
