"use client";

import React from "react";
import { Search, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

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
    <section className="relative overflow-hidden pt-10 pb-4 sm:pt-14 sm:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtle Top Indicator with Copper/Cyan Gradient Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-copper/30 bg-gradient-to-r from-brand-copper/15 to-cyan-950/30 px-3.5 py-1 text-xs text-brand-copperLight backdrop-blur-md mb-5 shadow-glow-copper/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-copper animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Independent Software & Engineering Hub
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pragmatische Software &amp;{" "}
            <span className="bg-gradient-to-r from-brand-copper via-pink-300 to-cyan-400 bg-clip-text text-transparent">
              Precision Tools.
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-7">
            Nachhaltige und qualitative Lösungen für alltägliche und komplexe
            Workflow-Herausforderungen. Keine überflüssigen Abhängigkeiten, kein Tracking –
            konzentriert auf den tatsächlichen Nutzen und saubere Architektur.
          </p>

          {/* Realtime Search Field */}
          <div className="relative mx-auto mt-7 max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Suche nach Name, Technologie (z.B. Manifest V3, Next.js, Canvas) oder Problem..."
              className="w-full rounded-2xl border border-white/10 bg-[#0e1017]/90 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 shadow-card-subtle backdrop-blur-xl transition-all focus:border-brand-copper/60 focus:outline-none focus:ring-2 focus:ring-brand-copper/20"
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
