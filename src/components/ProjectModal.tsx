"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/types/project";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Play,
  Maximize2,
  Coffee,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";
import { Language, DICTIONARY } from "@/data/i18n";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSponsor?: () => void;
  language: Language;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenSponsor,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "sandbox">("overview");
  const t = DICTIONARY[language].modal;
  const tCat = DICTIONARY[language].categories;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e15] shadow-2xl shadow-cyan-950/40">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 bg-[#10121c]/80 p-5 sm:p-6 backdrop-blur-xl">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono tracking-wide text-zinc-300 uppercase">
                {tCat[project.category] || project.categoryLabel}
              </span>
              {project.badge && (
                <span className="rounded-md border border-brand-copper/30 bg-brand-copper/10 px-2.5 py-0.5 text-xs font-medium text-brand-copperLight">
                  {project.badge}
                </span>
              )}
              <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {project.statusLabel || t.statusLive}
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              {project.title}
            </h2>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-2 text-zinc-400 hover:border-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs (Overview vs Live Sandbox) */}
        {project.sandboxPreview?.enabled && (
          <div className="flex border-b border-white/10 bg-zinc-950/40 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`border-b-2 py-2.5 px-3 text-xs font-medium transition-colors ${
                activeTab === "overview"
                  ? "border-brand-copper text-brand-copperLight"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t.tabOverview}
            </button>
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-1.5 border-b-2 py-2.5 px-3 text-xs font-medium transition-colors ${
                activeTab === "sandbox"
                  ? "border-brand-copper text-brand-copperLight"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Play className="h-3 w-3 text-emerald-400" />
              <span>{t.tabSandbox}</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === "overview" ? (
            <>
              {/* Chrome Web Store Highlight Banner */}
              {project.links.chromeWebStore && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-zinc-900/70 to-zinc-900/40 p-4 shadow-lg shadow-sky-950/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/40 bg-sky-950/80 text-sky-400 shadow-glow-cyan/20">
                      <ChromeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {language === "de" ? "Google Chrome Web Store" : "Google Chrome Web Store"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {language === "de"
                          ? "Offiziell im Chrome Web Store verfügbar & verifiziert"
                          : "Officially published & verified on the Chrome Web Store"}
                      </div>
                    </div>
                  </div>
                  <a
                    href={project.links.chromeWebStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-sky-400/50 bg-sky-500 px-4 py-2 text-xs font-semibold text-zinc-950 shadow-glow-cyan/30 transition-all hover:bg-sky-400 hover:shadow-glow-cyan/50 whitespace-nowrap"
                  >
                    <span>{language === "de" ? "Im Web Store öffnen" : "Open in Web Store"}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-950" />
                  </a>
                </div>
              )}

              {/* Problem Statement */}
              <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-red-300 font-semibold">
                  {t.problemTitle}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {project.problemStatement}
                </p>
              </div>

              {/* Technical Solution */}
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  {t.solutionTitle}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {project.technicalSolution}
                </p>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  {t.archTitle}
                </h4>
                <div className="mt-3 grid gap-2.5">
                  {project.architectureHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-zinc-900/40 p-2.5 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  {t.techTitle}
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-xs font-mono text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Support Callout inside the Case Study */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-brand-copper/30 bg-brand-copper/10 p-4 text-xs">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Coffee className="h-4 w-4 text-brand-copper shrink-0" />
                  <span>{t.supportPrompt}</span>
                </div>
                <a
                  href="https://buymeacoffee.com/mellowsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-brand-copper/50 bg-brand-copper px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap shadow-glow-copper/20 hover:brightness-110"
                >
                  {t.supportBtn}
                </a>
              </div>
            </>
          ) : (
            /* Live Sandbox Preview Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{t.sandboxTitle}</span>
                {project.sandboxPreview?.embedUrl && (
                  <a
                    href={project.sandboxPreview.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:underline"
                  >
                    <span>{t.openInNewTab}</span>
                    <Maximize2 className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                {project.sandboxPreview?.embedUrl ? (
                  <iframe
                    src={project.sandboxPreview.embedUrl}
                    title={project.title}
                    className="h-full w-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                    {t.noEmbedUrl}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#10121c]/80 p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {project.links.chromeWebStore && (
              <a
                href={project.links.chromeWebStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-2 text-xs font-medium text-cyan-300 shadow-glow-cyan/20 transition-all hover:bg-cyan-900/50"
              >
                <ChromeIcon className="h-4 w-4" />
                <span>{t.chromeStore}</span>
              </a>
            )}

            {project.links.demoUrl && (
              <a
                href={project.links.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-white transition-all hover:border-cyan-500/40 hover:bg-zinc-800"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t.liveDemo}</span>
              </a>
            )}

            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>{t.sourceCode}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
