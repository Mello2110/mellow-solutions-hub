"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { CATEGORIES, INITIAL_PROJECTS } from "@/data/projects";
import { Project, ProjectCategory } from "@/types/project";
import { Sparkles, Terminal, RotateCcw } from "lucide-react";

export default function HomePage() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: projects.length,
    };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Compute available unique tech stacks
  const availableTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => {
      p.techStack.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on category, search, and tech stack
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      // Tech Stack filter
      if (selectedTech && !project.techStack.includes(selectedTech)) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesTagline = project.tagline.toLowerCase().includes(q);
        const matchesProblem = project.problemStatement.toLowerCase().includes(q);
        const matchesSolution = project.technicalSolution.toLowerCase().includes(q);
        const matchesTech = project.techStack.some((t) =>
          t.toLowerCase().includes(q)
        );
        const matchesCategory = project.categoryLabel.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesTagline &&
          !matchesProblem &&
          !matchesSolution &&
          !matchesTech &&
          !matchesCategory
        ) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Top Header */}
      <Header
        projectCount={projects.length}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalProjects={projects.length}
        />

        {/* Catalog / Showcase Area */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          {/* Category Tabs & Tech Filters */}
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            availableTechStacks={availableTechStacks}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            categoryCounts={categoryCounts}
          />

          {/* Active Filter Indicators & Count */}
          <div className="mt-6 flex items-center justify-between text-xs text-zinc-400">
            <div>
              Zeige{" "}
              <span className="font-semibold text-white">
                {filteredProjects.length}
              </span>{" "}
              von {projects.length} Produkten
              {(selectedCategory !== "all" || selectedTech || searchQuery) && (
                <span className="ml-1 text-cyan-400">(gefiltert)</span>
              )}
            </div>

            {(selectedCategory !== "all" || selectedTech || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Filter zurücksetzen</span>
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={(p) => setActiveProject(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-zinc-500">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Keine passenden Produkte gefunden
              </h3>
              <p className="mt-1 text-xs text-zinc-400 max-w-sm">
                Versuche einen anderen Suchbegriff oder setze die aktiven
                Kategorie- und Technologie-Filter zurück.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-900/40"
              >
                Alle Filter zurücksetzen
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Keyboard Quick Navigation Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(p) => setActiveProject(p)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
