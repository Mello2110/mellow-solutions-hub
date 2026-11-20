"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorModal } from "@/components/SponsorModal";
import { INITIAL_PROJECTS } from "@/data/projects";
import { Project } from "@/types/project";
import { Language, DICTIONARY } from "@/data/i18n";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Coffee,
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/BrandIcons";

interface ProjectDetailClientProps {
  project: Project;
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const t = DICTIONARY[language].modal;
  const tCat = DICTIONARY[language].categories;
  const tPage = DICTIONARY[language].projectPage;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07080b]">
      <Header
        projectCount={INITIAL_PROJECTS.length}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      <main className="flex-1 pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#katalog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#C76C6A]" />
            <span>{tPage.backToHub}</span>
          </Link>

          {/* Project Title & Meta */}
          <div className="mt-6 border-b border-white/[0.08] pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono uppercase tracking-wide text-zinc-300">
                {tCat[project.category] || project.categoryLabel}
              </span>
              {project.badge && (
                <span className="rounded-md border border-[#C76C6A]/30 bg-[#C76C6A]/15 px-2.5 py-0.5 text-xs font-medium text-white">
                  {project.badge}
                </span>
              )}
              <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {project.statusLabel || t.statusLive}
              </span>
              {project.stats?.version && (
                <span className="font-mono text-xs tabular-nums text-zinc-400">
                  {project.stats.version}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {project.tagline}
            </p>

            {/* Primary Links */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.links.chromeWebStore && (
                <a
                  href={project.links.chromeWebStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-400/50 bg-sky-500 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-sky-400"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors hover:border-cyan-400 hover:text-white"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>{t.sourceCode}</span>
                </a>
              )}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <section className="border-l border-rose-400/40 pl-4 py-1">
              <h2 className="text-xs font-mono uppercase tracking-wider text-rose-300 font-semibold">
                {t.problemTitle}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                {project.problemStatement}
              </p>
            </section>

            <section className="border-l border-cyan-400/40 pl-4 py-1">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                {t.solutionTitle}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                {project.technicalSolution}
              </p>
            </section>
          </div>

          {/* Architecture Highlights */}
          <section className="mt-10">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              {t.archTitle}
            </h2>
            <div className="mt-3 grid gap-2.5">
              {project.architectureHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-zinc-900/40 p-3.5 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mt-8">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              {t.techTitle}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1 text-xs font-mono text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Interactive Sandbox */}
          {project.sandboxPreview?.enabled && project.sandboxPreview.embedUrl && (
            <section className="mt-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  {tPage.previewHeading}
                </h2>
                <a
                  href={project.sandboxPreview.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                >
                  <span>{t.openInNewTab}</span>
                  <Maximize2 className="h-3 w-3" />
                </a>
              </div>
              <div className="h-[55dvh] sm:h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
                <iframe
                  src={project.sandboxPreview.embedUrl}
                  title={project.title}
                  className="h-full w-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </section>
          )}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                {tPage.screenshotsHeading}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.screenshots.map((src, idx) => (
                  <a
                    key={idx}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07080b] p-3 transition-colors hover:border-cyan-500/40"
                    title={t.openInNewTab}
                  >
                    <img
                      src={src}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="max-h-full w-auto max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Support Callout */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#C76C6A]/30 bg-[#C76C6A]/10 p-4 text-xs">
            <div className="flex items-center gap-2.5 text-zinc-200">
              <Coffee className="h-4 w-4 text-[#C76C6A] shrink-0" />
              <span>{t.supportPrompt}</span>
            </div>
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="rounded-lg border border-[#C76C6A]/50 bg-[#C76C6A] px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap hover:brightness-110"
            >
              {t.supportBtn}
            </button>
          </div>
        </div>
      </main>

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        language={language}
      />

      <Footer
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
        language={language}
      />
    </div>
  );
};
