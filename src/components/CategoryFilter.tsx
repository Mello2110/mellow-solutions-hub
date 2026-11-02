"use client";

import React from "react";
import { CategoryMeta } from "@/types/project";
import {
  LayoutGrid,
  Puzzle,
  Globe,
  Wrench,
  Cpu,
  Filter,
  X,
  Boxes,
} from "lucide-react";

interface CategoryFilterProps {
  categories: CategoryMeta[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  availableTechStacks: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  categoryCounts: Record<string, number>;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="h-4 w-4" />,
  Puzzle: <Puzzle className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  Wrench: <Wrench className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  availableTechStacks,
  selectedTech,
  onSelectTech,
  categoryCounts,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

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
              <span>{cat.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono ${
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

      {/* Tech Stack Chips Filter */}
      {availableTechStacks.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mr-2">
            <Filter className="h-3 w-3 text-cyan-400" />
            <span className="text-[11px] uppercase tracking-wider font-mono">
              Technologie:
            </span>
          </div>

          {availableTechStacks.map((tech) => {
            const isSelected = selectedTech === tech;
            return (
              <button
                key={tech}
                onClick={() => onSelectTech(isSelected ? null : tech)}
                className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-mono transition-all ${
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

          {selectedTech && (
            <button
              onClick={() => onSelectTech(null)}
              className="text-[11px] text-zinc-400 hover:text-[#C76C6A] underline underline-offset-2 ml-1"
            >
              Filter aufheben
            </button>
          )}
        </div>
      )}
    </div>
  );
};
