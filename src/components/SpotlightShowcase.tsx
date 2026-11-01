"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import {
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";
import { MellowLogo } from "@/components/MellowLogo";

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
    <section className="relative mx-auto mt-8 mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Container with Chamfered Glass Border, generous padding and depth */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#111320] via-[#0d0e18] to-[#08090f] p-7 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl">
        {/* Soft Ambient Radial Backlights */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-brand-copper/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Ambient Watermark in the Right Corner */}
        <div className="pointer-events-none absolute -right-16 -bottom-16 opacity-[0.04]">
          <MellowLogo variant="emblemOnly" size={320} />
        </div>

        {/* Top Header Bar: Spotlight Indicator + Project Tabs */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-copper animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-wider text-brand-copperLight uppercase">
              Spotlight Flaggschiff
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 text-[11px] font-mono text-cyan-300">
              {current.categoryLabel}
            </span>
            {current.badge && (
              <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-zinc-300">
                {current.badge}
              </span>
            )}
          </div>

          {/* Project Switcher if multiple */}
          {featuredProjects.length > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-black/40 p-1">
              {featuredProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    activeIndex === idx
                      ? "border border-brand-copper/50 bg-brand-copper/20 text-white shadow-glow-copper/20"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main 2-Column Grid with Generous Spacing */}
        <div className="relative z-10 mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Narrative (Title, Problem & Solution) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {current.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-7">
                {current.tagline}
              </p>
            </div>

            {/* Problem & Solution Story Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/15 bg-red-950/15 p-5">
                <div className="font-mono text-[10px] text-red-300 uppercase tracking-wider font-semibold">
                  Das Ausgangsproblem:
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                  {current.problemStatement}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/15 bg-cyan-950/15 p-5">
                <div className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">
                  Der Mellow Lösungsansatz:
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                  {current.technicalSolution}
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-zinc-400 mr-1">
                Eingesetzte Technologien:
              </span>
              {current.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1 text-xs font-mono text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Architecture Highlights & Action Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#090b12]/95 p-6 sm:p-7 shadow-inner space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                <span className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Architektur &amp; Kennzahlen
                </span>
                <span className="font-mono text-xs text-brand-copperLight">
                  {current.stats?.version || "v1.0.0"}
                </span>
              </div>

              {/* Highlights List */}
              <div className="mt-4 space-y-2.5">
                {current.architectureHighlights.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stats Counters */}
              {current.stats && (
                <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-zinc-950/80 p-3 text-center">
                  {current.stats.users && (
                    <div>
                      <div className="text-[10px] text-zinc-400">Nutzer</div>
                      <div className="text-xs font-semibold text-white">
                        {current.stats.users}
                      </div>
                    </div>
                  )}
                  {current.stats.rating && (
                    <div>
                      <div className="text-[10px] text-zinc-400">Bewertung</div>
                      <div className="text-xs font-semibold text-amber-300">
                        {current.stats.rating}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-3 border-t border-white/5">
              <button
                onClick={() => onOpenDetails(current)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 to-zinc-900 px-4 py-3 text-xs font-semibold text-cyan-200 shadow-glow-cyan/15 transition-all hover:border-cyan-400 hover:text-white"
              >
                <span>Vollständige Case Study öffnen</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex gap-2">
                {current.links.chromeWebStore && (
                  <a
                    href={current.links.chromeWebStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-500/30 hover:text-white"
                  >
                    <ChromeIcon className="h-3.5 w-3.5" />
                    <span>Chrome Store</span>
                  </a>
                )}
                {current.links.demoUrl && (
                  <a
                    href={current.links.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-500/30 hover:text-white"
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
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
    </section>
  );
};
