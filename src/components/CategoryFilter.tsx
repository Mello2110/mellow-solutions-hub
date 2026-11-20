"use client";

import React, { useState } from "react";
import { CategoryMeta } from "@/types/project";
import {
  LayoutGrid,
  Puzzle,
  Globe,
  Wrench,
  Cpu,
  Package,
  Filter,
  X,
  Boxes,
  ChevronDown,
} from "lucide-react";
import { Language, DICTIONARY } from "@/data/i18n";

interface CategoryFilterProps {
  categories: CategoryMeta[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  availableTechStacks: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  categoryCounts: Record<string, number>;
  language: Language;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="h-4 w-4" />,
  Puzzle: <Puzzle className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  Wrench: <Wrench className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
  Package: <Package className="h-4 w-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  availableTechStacks,
  selectedTech,
  onSelectTech,
  categoryCounts,
  language,
}) => {
  const [isTechExpanded, setIsTechExpanded] = useState(false);
  const t = DICTIONARY[language].catalog;
  const tCat = DICTIONARY[language].categories;

  return (
    <div className="space-y-4">
      {/* Category Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          const categoryName = tCat[cat.id as keyof typeof tCat] || cat.label;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                isSelected
                  ? "border-[#C76C6A]/60 bg-[#C76C6A]/20 text-white shadow-glow-copper/25"
                  : "border-white/10 bg-[#0e1017]/70 text-zinc-400 hover:border-white/20 hover:bg-[#131622] hover:text-zinc-200"
              }`}
            >
              <span
                className={`${
                  isSelected
                    ? "text-[#C76C6A]"
                    : "text-zinc-400 group-hover:text-zinc-300"
                }`}
              >
                {ICONS_MAP[cat.iconName] || <Boxes className="h-4 w-4" />}
              </span>
              <span>{categoryName}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono tabular-nums ${
                  isSelected
                    ? "bg-[#C76C6A]/40 text-white"
                    : "bg-white/5 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tech Stack Chips Filter (Collapsible) */}
      {availableTechStacks.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTechExpanded((prev) => !prev)}
              aria-expanded={isTechExpanded}
              className="group flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/50 px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              <Filter className="h-3 w-3 text-cyan-400" />
              <span className="text-[11px] uppercase tracking-wider font-mono">
                {t.techFilter}
              </span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono tabular-nums text-zinc-400">
                {availableTechStacks.length}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${
                  isTechExpanded ? "rotate-180 text-cyan-400" : ""
                }`}
              />
            </button>

            {selectedTech && !isTechExpanded && (
              <button
                type="button"
                onClick={() => onSelectTech(null)}
                className="flex items-center gap-1 rounded-lg border border-cyan-500/60 bg-cyan-950/50 px-2.5 py-1 text-[11px] font-mono text-cyan-300 transition-colors hover:border-cyan-400"
              >
                <span>{selectedTech}</span>
                <X className="h-2.5 w-2.5 ml-0.5" />
              </button>
            )}

            {selectedTech && (
              <button
                type="button"
                onClick={() => onSelectTech(null)}
                className="text-[11px] text-zinc-400 hover:text-[#C76C6A] underline underline-offset-2 ml-1"
              >
                {t.clearFilter}
              </button>
            )}
          </div>

          {isTechExpanded && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {availableTechStacks.map((tech) => {
                const isSelected = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => onSelectTech(isSelected ? null : tech)}
                    className={`flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-mono transition-all ${
                      isSelected
                        ? "border-cyan-500/60 bg-cyan-950/50 text-cyan-300 shadow-glow-cyan/20"
                        : "border-white/5 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
                    }`}
                  >
                    <span>{tech}</span>
                    {isSelected && <X className="h-2.5 w-2.5 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
