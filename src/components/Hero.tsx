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
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Pill / Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3.5 py-1 text-xs text-cyan-300 backdrop-blur-md mb-6 shadow-glow-cyan/10">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Developer Hub & Portfolio
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Software, Extensions &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Precision Tools.
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-7">
            Willkommen im zentralen Portfolio und Product-Hub. Hier präsentiere ich
            meine entwickelten Chrome-Extensions, reaktiven Webapplikationen und
            HTML-Utilities – jeweils mit Fokus auf Problemstellung, Architektur und
            technischer Umsetzung.
          </p>

          {/* Realtime Search Field */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Suche nach Name, Technologie (z.B. Manifest V3, Next.js, Canvas) oder Problem..."
              className="w-full rounded-2xl border border-white/10 bg-[#0e1017]/90 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 shadow-card-subtle backdrop-blur-xl transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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

          {/* Feature Badges (Logitech / Antigravity Style) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-zinc-900/40 p-2.5 text-left backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold text-zinc-200">
                  Manifest V3
                </div>
                <div className="text-[10px] text-zinc-400">
                  Chrome Store konform
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-zinc-900/40 p-2.5 text-left backdrop-blur-sm">
              <Zap className="h-4 w-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold text-zinc-200">
                  High Performance
                </div>
                <div className="text-[10px] text-zinc-400">
                  Minimale Latenz
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-zinc-900/40 p-2.5 text-left backdrop-blur-sm">
              <Layers className="h-4 w-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold text-zinc-200">
                  Modulare Architektur
                </div>
                <div className="text-[10px] text-zinc-400">
                  Clean & Wartbar
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-zinc-900/40 p-2.5 text-left backdrop-blur-sm">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-400 shrink-0">
                {totalProjects}
              </div>
              <div>
                <div className="text-[11px] font-semibold text-zinc-200">
                  Produkte
                </div>
                <div className="text-[10px] text-zinc-400">
                  Dokumentiert & live
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
