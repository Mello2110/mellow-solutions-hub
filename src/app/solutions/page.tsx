"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorModal } from "@/components/SponsorModal";
import { CommandPalette } from "@/components/CommandPalette";
import { INITIAL_PROJECTS } from "@/data/projects";
import { CLIENT_SOLUTIONS } from "@/data/clientSolutions";
import { ClientSolution } from "@/types/project";
import { Language, DICTIONARY } from "@/data/i18n";
import {
  ArrowLeft,
  Play,
  X,
  Maximize2,
  ExternalLink,
  Mail,
} from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

export default function SolutionsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("en");
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<ClientSolution | null>(null);

  const t = DICTIONARY[language].solutions;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!previewItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewItem]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07080b]">
      <Header
        projectCount={INITIAL_PROJECTS.length}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="flex-1 pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Title */}
          <div className="border-b border-white/[0.07] pb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#C76C6A]" />
              <span>{t.backToHub}</span>
            </Link>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {t.subtitle}
            </p>
          </div>

          {/* Client Case Studies */}
          <div className="mt-10 space-y-10">
            {CLIENT_SOLUTIONS[language].map((item) => {
              const hasPreview =
                Boolean(item.sandboxPreview?.enabled && item.sandboxPreview?.embedUrl) ||
                Boolean(item.screenshots && item.screenshots.length > 0);

              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="rounded-2xl border border-white/10 bg-[#0d0f17]/90 p-6 sm:p-8 scroll-mt-24"
                >
                  {/* Case Study Header */}
                  <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400">
                        <span>{item.clientContext}</span>
                        <span>&bull;</span>
                        <span className="tabular-nums">{item.timeframe}</span>
                        {item.featuredInHub && (
                          <span className="rounded-md border border-[#C76C6A]/35 bg-[#C76C6A]/15 px-2 py-0.5 text-[10px] text-zinc-100">
                            {t.featuredBadge}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-zinc-400">
                        <span className="font-mono uppercase tracking-wider text-zinc-400">
                          {t.roleLabel}:{" "}
                        </span>
                        <span className="text-zinc-200">{item.role}</span>
                      </p>
                    </div>

                    {/* Preview / External Action */}
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {hasPreview ? (
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-950/40 px-3.5 py-2 text-xs font-semibold text-sky-200 transition-colors hover:border-sky-400 hover:text-white"
                        >
                          <Play className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{t.previewButton}</span>
                        </button>
                      ) : (
                        <span className="rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-[11px] text-zinc-400">
                          {t.previewUnavailable}
                        </span>
                      )}

                      {item.links?.demoUrl && (
                        <a
                          href={item.links.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-xs font-medium text-zinc-300 hover:border-white/20 hover:text-white"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* 3-Step Creation Process */}
                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* 01 Goal */}
                    <div className="border-l border-white/15 pl-4">
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#C76C6A]">
                        {t.stepGoal}
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                        {item.clientGoal}
                      </p>
                    </div>

                    {/* 02 Challenges */}
                    <div className="border-l border-white/15 pl-4">
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                        {t.stepChallenges}
                      </div>
                      <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-zinc-300">
                        {item.challenges.map((ch, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 03 Solution & Outcome */}
                    <div className="border-l border-cyan-400/40 pl-4">
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                        {t.stepSolution}
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                        {item.solutionApproach}
                      </p>
                      <div className="mt-3 border-t border-white/[0.07] pt-2.5 text-xs text-zinc-200">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                          {t.outcomeLabel}:{" "}
                        </span>
                        {item.outcome}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-zinc-900/80 px-2.5 py-0.5 text-[11px] font-mono text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Neutral Contact & Applications Placeholder */}
          <section className="mt-14 rounded-2xl border border-white/10 bg-[#0b0d14]/90 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#C76C6A]">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{t.contactTitle}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-200">{t.contactBody}</p>
                <p className="mt-1.5 text-xs text-zinc-400">{t.contactPlaceholder}</p>
              </div>

              <a
                href="https://github.com/Mello2110"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub @Mello2110</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Preview Modal for Client Solutions */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setPreviewItem(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="solution-preview-title"
            className="relative z-10 flex max-h-[88dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e15] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 id="solution-preview-title" className="text-sm font-semibold text-white">
                  {previewItem.title}
                </h3>
                {previewItem.sandboxPreview?.embedUrl && (
                  <a
                    href={previewItem.sandboxPreview.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                  >
                    <span>{DICTIONARY[language].modal.openInNewTab}</span>
                    <Maximize2 className="h-3 w-3" />
                  </a>
                )}
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                aria-label={DICTIONARY[language].modal.close}
                className="rounded-xl border border-white/10 bg-zinc-900/60 p-2 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-4">
              {previewItem.sandboxPreview?.enabled && previewItem.sandboxPreview.embedUrl && (
                <div className="h-[55dvh] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                  <iframe
                    src={previewItem.sandboxPreview.embedUrl}
                    title={previewItem.title}
                    className="h-full w-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              )}

              {previewItem.screenshots && previewItem.screenshots.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {previewItem.screenshots.map((src, idx) => (
                    <a
                      key={idx}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-64 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#07080b] p-3 transition-colors hover:border-cyan-500/40"
                    >
                      <img
                        src={src}
                        alt={`${previewItem.title} Screenshot ${idx + 1}`}
                        className="max-h-full w-auto max-w-full rounded-lg object-contain"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        language={language}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={INITIAL_PROJECTS}
        onSelectProject={(p) => router.push(`/projects/${p.id}`)}
        language={language}
      />

      <Footer
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
        language={language}
      />
    </div>
  );
}
