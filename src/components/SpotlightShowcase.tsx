"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import {
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";
import { Language, DICTIONARY } from "@/data/i18n";

interface SpotlightShowcaseProps {
  featuredProjects: Project[];
  onOpenDetails: (project: Project) => void;
  onScrollToCatalog: () => void;
  language: Language;
}

export const SpotlightShowcase: React.FC<SpotlightShowcaseProps> = ({
  featuredProjects,
  onOpenDetails,
  onScrollToCatalog,
  language,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = DICTIONARY[language].spotlight;

  if (!featuredProjects || featuredProjects.length === 0) return null;

  const current = featuredProjects[activeIndex] || featuredProjects[0];

  return (
    <section
      id="spotlight"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col justify-between py-12 sm:py-16 scroll-mt-16"
    >
      <div className="my-auto w-full">
        {/* Main Spotlight Card Container: Deep, calm midnight blue gradient */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0c101d] via-[#080b14] to-[#06070c] p-7 sm:p-9 lg:p-11 shadow-2xl backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          {/* Calm, De-saturated Dark Blue Ambient Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-950/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-sky-950/30 blur-3xl" />

          {/* Top Bar: Category Pill & Project Switcher */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 rounded-full bg-[#C76C6A]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                {t.flagshipBadge}
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span className="rounded-lg border border-sky-500/25 bg-sky-950/35 px-2.5 py-1 text-xs font-mono text-sky-300">
                {current.categoryLabel}
              </span>
              {current.badge && (
                <span className="rounded-lg border border-[#C76C6A]/30 bg-[#C76C6A]/15 px-2.5 py-1 text-xs font-mono text-white">
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
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                      activeIndex === idx
                        ? "border border-sky-500/40 bg-sky-950/40 text-white shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2-Column Content */}
          <div className="relative z-10 mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {current.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {current.tagline}
                </p>
              </div>

              {/* Problem & Solution Cards with Clean Internal Highlight Colors */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-900/30 bg-rose-950/15 p-5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-rose-300 uppercase tracking-wider font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    {t.problemTitle}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    {current.problemStatement}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/30 bg-sky-950/25 p-5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-sky-300 uppercase tracking-wider font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {t.solutionTitle}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    {current.technicalSolution}
                  </p>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-zinc-400 mr-1">
                  {t.techTitle}
                </span>
                {current.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-0.5 text-xs font-mono text-sky-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Highlights & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/85 p-6 space-y-5 shadow-inner">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                    {t.archTitle}
                  </span>
                  <span className="font-mono text-xs text-[#C76C6A] font-medium">
                    {current.stats?.version || "v1.0.0"}
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {current.architectureHighlights.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {current.stats && (
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-black/50 p-2.5 text-center">
                    {current.stats.users && (
                      <div>
                        <div className="text-[10px] text-zinc-400">{t.users}</div>
                        <div className="text-xs font-semibold text-white">
                          {current.stats.users}
                        </div>
                      </div>
                    )}
                    {current.stats.rating && (
                      <div>
                        <div className="text-[10px] text-zinc-400">{t.rating}</div>
                        <div className="text-xs font-semibold text-amber-300">
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
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-gradient-to-r from-sky-950/50 to-zinc-900 px-4 py-2.5 text-xs font-semibold text-sky-200 transition-all hover:border-sky-400 hover:text-white"
                >
                  <span>{t.openCaseStudy}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex gap-2">
                  {current.links.chromeWebStore && (
                    <a
                      href={current.links.chromeWebStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-sky-500/30 hover:text-white"
                    >
                      <ChromeIcon className="h-3.5 w-3.5 text-sky-400" />
                      <span>{t.chromeStore}</span>
                    </a>
                  )}
                  {current.links.demoUrl && (
                    <a
                      href={current.links.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-500/30 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{t.liveDemo}</span>
                    </a>
                  )}
                  {current.links.githubUrl && (
                    <a
                      href={current.links.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
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

      {/* Unified Single Scroll-Down Button (Identical styling to Hero) */}
      <div className="mx-auto flex flex-col items-center pb-4 text-zinc-500">
        <button
          onClick={onScrollToCatalog}
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-2.5 text-xs font-medium text-zinc-300 shadow-sm transition-all hover:border-white/25 hover:bg-zinc-800 hover:text-white"
        >
          <span>{t.scrollPrompt}</span>
          <ChevronDown className="h-4 w-4 text-[#C76C6A] transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
