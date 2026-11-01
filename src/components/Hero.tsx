"use client";

import React from "react";
import { Search } from "lucide-react";
import { MellowLogo } from "@/components/MellowLogo";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProjects: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  totalProjects,
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16">
      {/* Background Subtle Large Watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150">
        <MellowLogo variant="emblemOnly" size={500} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center text-center">
          {/* Large Hero Studio Emblem */}
          <div className="mb-6">
            <MellowLogo variant="emblemOnly" size={88} />
          </div>

          {/* Studio Tag & Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0f18]/80 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md mb-6 shadow-card-subtle">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widebrand text-zinc-300">
              Mellow Solutions Studio
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="font-mono text-[11px] text-brand-copperLight">
              {totalProjects} Werkzeuge &amp; Extensions
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl">
            Pragmatische Software, Extensions &amp;{" "}
            <span className="bg-gradient-to-r from-brand-copper via-[#e09391] to-cyan-400 bg-clip-text text-transparent">
              Precision Tools.
            </span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-8 max-w-2xl">
            Nachhaltige Lösungen für alltägliche und komplexe Workflow-Herausforderungen.
            Vollkommen werbefrei, ohne unnötige Abhängigkeiten und mit Fokus auf
            verlässliche Architektur.
          </p>

          {/* Realtime Search Field with Generous Space */}
          <div className="relative mx-auto mt-9 w-full max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Suche nach Name, Technologie (z.B. Manifest V3, Next.js, Canvas) oder Problem..."
              className="w-full rounded-2xl border border-white/10 bg-[#0e1017]/90 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 shadow-card-subtle backdrop-blur-xl transition-all focus:border-brand-copper/60 focus:outline-none focus:ring-2 focus:ring-brand-copper/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs text-zinc-400 hover:text-white"
              >
                Löschen
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
