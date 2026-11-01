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
import { Terminal, RotateCcw, ChevronRight } from "lucide-react";

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

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
  };

  // Grouped projects for the categorized view (when no search or subcategory is active)
  const isDefaultView = selectedCategory === "all" && !selectedTech && !searchQuery;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Top Header */}
      <Header
        projectCount={projects.length}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
      />

      <main className="flex-1 pb-20">
        {/* Hero Section with Generous Breathing Room */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalProjects={projects.length}
        />

        {/* VARIATION C: Featured Spotlight Showcase Stage (Oben) */}
        {!searchQuery && selectedCategory === "all" && !selectedTech && (
          <SpotlightShowcase
            featuredProjects={featuredProjects}
            onOpenDetails={(p) => setActiveProject(p)}
          />
        )}

        {/* Geordneter Rubriken-Katalog */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          {/* Section Headline */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-5 mb-8 gap-3">
            <div>
              <div className="font-mono text-xs text-brand-copperLight uppercase tracking-wider">
                Verzeichnis &amp; Werkzeuge
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight sm:text-2xl mt-1">
                Produkt-Katalog nach Rubriken
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Wähle eine Rubrik oder scrolle durch die Produkt-Sparten. Jedes Projekt enthält
                ausführliche Architekturdaten und direkte Links.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              {filteredProjects.length} Einträge verfügbar
            </div>
          </div>

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

          {/* Active Filter Indicators & Reset Option */}
          <div className="mt-8 flex items-center justify-between text-xs text-zinc-400">
            <div>
              Zeige{" "}
              <span className="font-semibold text-white">
                {filteredProjects.length}
              </span>{" "}
              von {projects.length} Produkten
              {(selectedCategory !== "all" || selectedTech || searchQuery) && (
                <span className="ml-1 text-brand-copperLight">(gefiltert)</span>
              )}
            </div>

            {(selectedCategory !== "all" || selectedTech || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-copperLight transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Filter zurücksetzen</span>
              </button>
            )}
          </div>

          {/* Content Views: Structured Categorized Rails vs Filtered Grid */}
          {isDefaultView ? (
            /* Categorized Snap-Rail Sections for maximum breathing room & structure */
            <div className="mt-10 space-y-16">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const catProjects = projects.filter((p) => p.category === cat.id);
                if (catProjects.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-6">
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white sm:text-lg flex items-center gap-2">
                          <span>{cat.label}</span>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                            {catProjects.length}
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {cat.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className="hidden sm:flex items-center gap-1 text-xs text-brand-copperLight hover:underline"
                      >
                        <span>Nur {cat.label} anzeigen</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Snap Rail Container (Scrollable or 2-3 Column Grid with generous padding) */}
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
            /* Filtered Cards Grid (When search or category is active) */
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
            /* Empty State */
            <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-950/40 p-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500">
                <Terminal className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Keine passenden Produkte gefunden
              </h3>
              <p className="mt-1 text-xs text-zinc-400 max-w-sm">
                Versuche einen anderen Suchbegriff oder setze die Filter zurück.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 rounded-xl border border-brand-copper/30 bg-brand-copper/15 px-5 py-2.5 text-xs font-medium text-brand-copperLight hover:bg-brand-copper/25"
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
        onOpenSponsor={() => {
          setActiveProject(null);
          setIsSponsorModalOpen(true);
        }}
      />

      {/* Support / Buy Me a Coffee Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

      {/* Keyboard Quick Navigation Command Palette (Ctrl+K) */}
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
