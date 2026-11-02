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
import { Language, DICTIONARY } from "@/data/i18n";
import { Terminal, RotateCcw, ChevronRight, Search } from "lucide-react";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const t = DICTIONARY[language].catalog;

  // Toggle Language between English and German
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

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

  // Precise pinning to Catalog header with zero jitter
  const pinToCatalog = (behavior: ScrollBehavior = "instant") => {
    const catalogEl = document.getElementById("katalog");
    if (!catalogEl) return;
    const headerHeight = 64; // height of sticky header
    const targetY = catalogEl.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: targetY,
      behavior: behavior,
    });
  };

  // Fixed Category Selection: Update category and instantly pin to exact catalog top
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

  // Fixed Tech Stack Selection: Update tech chip and instantly pin to exact catalog top
  const handleSelectTech = (tech: string | null) => {
    setSelectedTech(tech);
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

  // Smooth scroll to top / Segment 01
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Smooth scroll from Hero to Spotlight
  const scrollToSpotlight = () => {
    const el = document.getElementById("spotlight");
    if (el) {
      const headerHeight = 64;
      const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  // Smooth scroll from Spotlight to Catalog
  const scrollToCatalog = () => {
    pinToCatalog("smooth");
  };

  // Reset all filters and re-align
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

  // Active categories to display in the grouped view
  const visibleCategories = useMemo(() => {
    if (selectedCategory === "all") {
      return CATEGORIES.filter((c) => c.id !== "all");
    }
    return CATEGORIES.filter((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-[#07080b]">
      {/* Sticky Top Header with Language Toggle */}
      <Header
        projectCount={projects.length}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onScrollToTop={scrollToTop}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
      />

      <main className="flex-1">
        {/* ========================================================
            SEGMENT 01: Hero Viewport (Full Screen Entrance)
           ======================================================== */}
        <Hero
          onScrollToSpotlight={scrollToSpotlight}
          totalProjects={projects.length}
          language={language}
        />

        {/* ========================================================
            SEGMENT 02: Flagship Spotlight Stage (Full Viewport Focus)
           ======================================================== */}
        <SpotlightShowcase
          featuredProjects={featuredProjects}
          onOpenDetails={(p) => setActiveProject(p)}
          onScrollToCatalog={scrollToCatalog}
          language={language}
        />

        {/* ========================================================
            SEGMENT 03: Categorized Product Catalog
            min-h-[140vh] guarantees that even with a single card,
            the browser NEVER clamps the scroll position into Spotlight!
           ======================================================== */}
        <section
          id="katalog"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 scroll-mt-16 min-h-[140vh] pb-52"
        >
          {/* Main Title & Personal Motto */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-8 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                {t.title}
              </h3>
              <p className="text-xs text-zinc-300 sm:text-sm mt-2 max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Quick Search Field in Catalog Header */}
            <div className="relative w-full md:w-80 shrink-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-[#0d0e15] py-2.5 pl-10 pr-4 text-xs text-zinc-100 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-zinc-400 hover:text-white"
                >
                  {t.clearSearch}
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
            onSelectTech={handleSelectTech}
            categoryCounts={categoryCounts}
            language={language}
          />

          {/* Filter Status Bar */}
          <div className="mt-7 flex items-center justify-between text-xs text-zinc-400">
            <div>
              {t.showingCount(
                filteredProjects.length,
                projects.length,
                selectedCategory !== "all" || !!selectedTech || !!searchQuery
              )}
            </div>

            {(selectedCategory !== "all" || selectedTech || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            )}
          </div>

          {/* Consistent Segmented Category Views */}
          {filteredProjects.length > 0 ? (
            <div className="mt-12 space-y-16">
              {visibleCategories.map((cat) => {
                const catProjects = filteredProjects.filter((p) => p.category === cat.id);
                if (catProjects.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-semibold text-white">
                          {DICTIONARY[language].categories[cat.id] || cat.label}
                        </h4>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                          {catProjects.length}
                        </span>
                      </div>

                      {selectedCategory === "all" && (
                        <button
                          onClick={() => handleSelectCategory(cat.id)}
                          className="flex items-center gap-1 text-xs text-[#C76C6A] hover:underline"
                        >
                          <span>{t.viewCategoryOnly(DICTIONARY[language].categories[cat.id] || cat.label)}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Equal-Height Cards Grid */}
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                      {catProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onOpenDetails={(p) => setActiveProject(p)}
                          language={language}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Search State */
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-12 text-center">
              <Terminal className="h-6 w-6 text-zinc-600 mb-3" />
              <h3 className="text-sm font-semibold text-white">
                {t.emptyTitle}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                {t.emptySubtitle}
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {t.resetFilters}
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
        language={language}
      />

      {/* Support / Coffee Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        language={language}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(p) => setActiveProject(p)}
        language={language}
      />

      {/* Footer with Portfolio Notice / Disclaimer */}
      <Footer
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
        language={language}
      />
    </div>
  );
}
