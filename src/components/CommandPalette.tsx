"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import {
  Search,
  X,
  Terminal,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowRight,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery("");
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = projects.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette Panel */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e15] shadow-2xl shadow-cyan-950/40">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3.5 bg-[#10121b]">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tippe zur Schnellsuche (z.B. Extension, React, Manifest V3)..."
            className="ml-3 w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              Kein Projekt passend zu &quot;{query}&quot; gefunden.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Produkte ({filtered.length})
              </div>
              {filtered.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-900/80 hover:text-cyan-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#141724] text-zinc-400 group-hover:border-cyan-500/40 group-hover:text-cyan-400">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {proj.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                      {proj.categoryLabel}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between border-t border-white/5 bg-[#090b11] px-4 py-2 text-[11px] text-zinc-400">
          <span>Drücke [ESC] zum Schließen</span>
          <span className="font-mono">Mellow Solutions Hub</span>
        </div>
      </div>
    </div>
  );
};
