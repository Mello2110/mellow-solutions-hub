"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import {
  ExternalLink,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";

interface SpotlightShowcaseProps {
  featuredProjects: Project[];
  onOpenDetails: (project: Project) => void;
}

export const SpotlightShowcase: React.FC<SpotlightShowcaseProps> = ({
  featuredProjects,
  onOpenDetails,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!featuredProjects || featuredProjects.length === 0) return null;

  const current = featuredProjects[activeIndex] || featuredProjects[0];

  return (
    <div className="relative mx-auto mt-6 mb-16 max-w-7xl">
      {/* Container: Muted, mature titanium canvas with subtle borders */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d14] p-6 sm:p-8 lg:p-10 shadow-card-subtle">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#C76C6A]" />
            <span className="font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
              Spotlight Flaggschiff
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-zinc-300">
              {current.categoryLabel}
            </span>
            {current.badge && (
              <span className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                {current.badge}
              </span>
            )}
          </div>

          {/* Project Switcher if multiple */}
          {featuredProjects.length > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-950 p-1">
              {featuredProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    activeIndex === idx
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Content */}
        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {current.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {current.tagline}
              </p>
            </div>

            {/* Structured Problem & Solution Cards (Muted, mature) */}
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-4">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                  Problemstellung:
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                  {current.problemStatement}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-4">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                  Lösungsansatz:
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                  {current.technicalSolution}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">
                Technologien:
              </span>
              {current.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Highlights & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-950/70 p-5 sm:p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Architektur &amp; Kennzahlen
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {current.stats?.version || "v1.0.0"}
                </span>
              </div>

              <div className="mt-3.5 space-y-2">
                {current.architectureHighlights.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {current.stats && (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-white/5 bg-black/40 p-2.5 text-center">
                  {current.stats.users && (
                    <div>
                      <div className="text-[10px] text-zinc-500">Nutzer</div>
                      <div className="text-xs font-medium text-zinc-200">
                        {current.stats.users}
                      </div>
                    </div>
                  )}
                  {current.stats.rating && (
                    <div>
                      <div className="text-[10px] text-zinc-500">Bewertung</div>
                      <div className="text-xs font-medium text-amber-300/90">
                        {current.stats.rating}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <button
                onClick={() => onOpenDetails(current)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900/90 px-4 py-2.5 text-xs font-medium text-zinc-100 transition-colors hover:border-white/30 hover:bg-zinc-800"
              >
                <span>Case Study öffnen</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex gap-2">
                {current.links.chromeWebStore && (
                  <a
                    href={current.links.chromeWebStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/50 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <ChromeIcon className="h-3.5 w-3.5" />
                    <span>Store</span>
                  </a>
                )}
                {current.links.demoUrl && (
                  <a
                    href={current.links.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/50 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {current.links.githubUrl && (
                  <a
                    href={current.links.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
