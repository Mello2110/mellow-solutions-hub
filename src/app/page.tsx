"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SpotlightShowcase } from "@/components/SpotlightShowcase";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SponsorModal } from "@/components/SponsorModal";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { CATEGORIES, INITIAL_PROJECTS } from "@/data/projects";
import { Project } from "@/types/project";
import { Terminal, RotateCcw, ChevronRight, Search } from "lucide-react";

export default function HomePage() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  // Featured flagship projects for the Spotlight Stage
  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.featured);
  }, [projects]);

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

  // Clean category selection without unwanted jumping
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Explicit scroll helper from Segment 1 (Hero) to Segment 2 (Spotlight)
  const scrollToSpotlight = () => {
    const el = document.getElementById("spotlight");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Explicit scroll helper from Segment 2 (Spotlight) to Segment 3 (Katalog)
  const scrollToCatalog = () => {
    const el = document.getElementById("katalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
  };

  const isDefaultView = selectedCategory === "all" && !selectedTech && !searchQuery;

  return (
    <div className="flex min-h-screen flex-col bg-[#07080b]">
      {/* Sticky Top Header */}
      <Header
        projectCount={projects.length}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
      />

      <main className="flex-1">
        {/* ========================================================
            SEGMENT 01: Hero Viewport (Above the Fold)
           ======================================================== */}
        <Hero
          onScrollToSpotlight={scrollToSpotlight}
          totalProjects={projects.length}
        />

        {/* ========================================================
            SEGMENT 02: Flagship Spotlight Stage
           ======================================================== */}
        {!searchQuery && (
          <SpotlightShowcase
            featuredProjects={featuredProjects}
            onOpenDetails={(p) => setActiveProject(p)}
            onScrollToCatalog={scrollToCatalog}
          />
        )}

        {/* ========================================================
            SEGMENT 03: Categorized Product Catalog
           ======================================================== */}
        <section id="katalog" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          {/* Segment Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-7">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                Segment 03 &bull; Verzeichnis &amp; Werkzeuge
              </span>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              {filteredProjects.length} Produkte verfügbar
            </div>
          </div>

          {/* Section Main Title & Search Input */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                Produkt-Katalog nach Rubriken
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Wähle eine Rubrik oder nutze die Suche. Jedes Projekt enthält
                detaillierte Architektur-Informationen, Problemstellungen und Live-Links.
              </p>
            </div>

            {/* Quick Search Field */}
            <div className="relative w-full md:w-80 shrink-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Projekt suchen (z.B. Manifest V3)..."
                className="w-full rounded-xl border border-white/10 bg-[#0d0e15] py-2.5 pl-10 pr-4 text-xs text-zinc-100 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-zinc-400 hover:text-white"
                >
                  Löschen
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs & Tech Filter Bar */}
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            availableTechStacks={availableTechStacks}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            categoryCounts={categoryCounts}
          />

          {/* Filter Status Bar */}
          <div className="mt-7 flex items-center justify-between text-xs text-zinc-400">
            <div>
              Zeige{" "}
              <span className="font-semibold text-white">
                {filteredProjects.length}
              </span>{" "}
              von {projects.length} Produkten
              {(selectedCategory !== "all" || selectedTech || searchQuery) && (
                <span className="ml-1 text-[#C76C6A]">(gefiltert)</span>
              )}
            </div>

            {(selectedCategory !== "all" || selectedTech || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Filter zurücksetzen</span>
              </button>
            )}
          </div>

          {/* Directory Cards Display */}
          {isDefaultView ? (
            /* Segmented by Category with Pixel-Perfect Equal Heights */
            <div className="mt-10 space-y-16">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const catProjects = projects.filter((p) => p.category === cat.id);
                if (catProjects.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-6">
                    {/* Sub-Header per Category */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-semibold text-white">
                          {cat.label}
                        </h4>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                          {catProjects.length}
                        </span>
                      </div>

                      <button
                        onClick={() => handleSelectCategory(cat.id)}
                        className="flex items-center gap-1 text-xs text-[#C76C6A] hover:underline"
                      >
                        <span>Nur {cat.label} anzeigen</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Equal-Height Cards Grid */}
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                      {catProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onOpenDetails={(p) => setActiveProject(p)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredProjects.length > 0 ? (
            /* Filtered View with Equal-Height Cards */
            <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={(p) => setActiveProject(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty Search State */
            <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-12 text-center">
              <Terminal className="h-6 w-6 text-zinc-600 mb-3" />
              <h3 className="text-sm font-semibold text-white">
                Keine passenden Produkte gefunden
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Passe deinen Suchbegriff an oder setze die Filter zurück.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenSponsor={() => {
          setActiveProject(null);
          setIsSponsorModalOpen(true);
        }}
      />

      {/* Support / Coffee Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(p) => setActiveProject(p)}
      />

      {/* Footer */}
      <Footer onOpenSponsor={() => setIsSponsorModalOpen(true)} />
    </div>
  );
}
