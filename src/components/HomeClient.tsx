"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SpotlightShowcase } from "@/components/SpotlightShowcase";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SponsorModal } from "@/components/SponsorModal";
import { CommandPalette } from "@/components/CommandPalette";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { Footer } from "@/components/Footer";
import { CATEGORIES, INITIAL_PROJECTS } from "@/data/projects";
import { Project } from "@/types/project";
import { Language, DICTIONARY } from "@/data/i18n";
import {
  Terminal,
  RotateCcw,
  ChevronRight,
  Search,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface HomeClientProps {
  initialFlagshipIds: string[];
  initialIsAdmin: boolean;
}

export const HomeClient: React.FC<HomeClientProps> = ({
  initialFlagshipIds,
  initialIsAdmin,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [flagshipIds, setFlagshipIds] = useState<string[]>(initialFlagshipIds);
  const [isAdmin, setIsAdmin] = useState<boolean>(initialIsAdmin);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [togglingIds, setTogglingIds] = useState<Record<string, boolean>>({});
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const t = DICTIONARY[language].catalog;

  // Merge dynamic flagship IDs into project list
  const projects = useMemo<Project[]>(() => {
    const flagshipSet = new Set(flagshipIds);
    return INITIAL_PROJECTS.map((p) => ({
      ...p,
      featured: flagshipSet.has(p.id),
    }));
  }, [flagshipIds]);

  // Keep <html lang="..."> synchronized with the active UI language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Auto-dismiss admin toast
  useEffect(() => {
    if (!adminToast) return;
    const timer = setTimeout(() => setAdminToast(null), 4000);
    return () => clearTimeout(timer);
  }, [adminToast]);

  // Hidden Admin Access Triggers:
  // 1) Keyboard shortcut: Ctrl+Shift+M (or Cmd+Shift+M)
  // 2) URL query parameter: ?admin=1 (cleans URL immediately)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1") {
      params.delete("admin");
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${
        nextSearch ? `?${nextSearch}` : ""
      }${window.location.hash}`;
      window.history.replaceState({}, "", nextUrl);
      if (!isAdmin) {
        setIsAdminModalOpen(true);
      }
    }
  }, [isAdmin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        if (!isAdmin) {
          setIsAdminModalOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  const handleLogoutAdmin = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAdmin(false);
    }
  }, []);

  const handleOpenOrExitAdmin = useCallback(() => {
    if (isAdmin) {
      void handleLogoutAdmin();
    } else {
      setIsAdminModalOpen(true);
    }
  }, [isAdmin, handleLogoutAdmin]);

  const handleToggleFlagship = useCallback(
    async (project: Project) => {
      if (!isAdmin || togglingIds[project.id]) return;

      const nextFeatured = !project.featured;
      const previousIds = flagshipIds;

      // Optimistic update
      setTogglingIds((prev) => ({ ...prev, [project.id]: true }));
      setFlagshipIds((prev) =>
        nextFeatured
          ? prev.includes(project.id)
            ? prev
            : [...prev, project.id]
          : prev.filter((id) => id !== project.id)
      );

      try {
        const res = await fetch("/api/flagship", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: project.id,
            featured: nextFeatured,
          }),
        });

        const data = (await res.json().catch(() => ({}))) as {
          flagshipIds?: string[];
          error?: string;
        };

        if (!res.ok || !Array.isArray(data.flagshipIds)) {
          throw new Error(data.error || "Failed to save Flagship change.");
        }

        setFlagshipIds(data.flagshipIds);
      } catch (err) {
        // Rollback on failure
        setFlagshipIds(previousIds);
        const message =
          err instanceof Error ? err.message : "Failed to save Flagship change.";
        setAdminToast(message);
      } finally {
        setTogglingIds((prev) => {
          const next = { ...prev };
          delete next[project.id];
          return next;
        });
      }
    },
    [isAdmin, togglingIds, flagshipIds]
  );

  // Toggle Language between English and German
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  // Featured flagship projects for the Spotlight Stage (preserving flagshipIds order)
  const featuredProjects = useMemo(() => {
    const byId = new Map(projects.map((p) => [p.id, p]));
    return flagshipIds
      .map((id) => byId.get(id))
      .filter((p): p is Project => Boolean(p));
  }, [projects, flagshipIds]);

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
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      if (selectedTech && !project.techStack.includes(selectedTech)) {
        return false;
      }

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

  const getHeaderHeight = () => {
    if (typeof document === "undefined") return 64;
    return document.querySelector("header")?.getBoundingClientRect().height ?? 64;
  };

  const pinToCatalog = (behavior: ScrollBehavior = "instant") => {
    const catalogEl = document.getElementById("katalog");
    if (!catalogEl) return;
    const headerHeight = getHeaderHeight();
    const targetY =
      catalogEl.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: targetY,
      behavior: behavior,
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

  const handleSelectTech = (tech: string | null) => {
    setSelectedTech(tech);
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSpotlight = () => {
    const el = document.getElementById("spotlight");
    if (el) {
      const headerHeight = getHeaderHeight();
      const targetY =
        el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const scrollToCatalog = () => {
    pinToCatalog("smooth");
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
    requestAnimationFrame(() => {
      pinToCatalog("instant");
    });
  };

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
      />

      <main className="flex-1 pt-[calc(3.5rem+env(safe-area-inset-top))] sm:pt-[calc(4rem+env(safe-area-inset-top))]">
        {/* SEGMENT 01: Hero Viewport */}
        <Hero
          onScrollToSpotlight={scrollToSpotlight}
          totalProjects={projects.length}
          language={language}
        />

        {/* SEGMENT 02: Flagship Spotlight Stage */}
        <SpotlightShowcase
          featuredProjects={featuredProjects}
          onOpenDetails={(p) => setActiveProject(p)}
          onScrollToCatalog={scrollToCatalog}
          language={language}
          isAdmin={isAdmin}
          onRemoveFlagship={(p) => void handleToggleFlagship(p)}
        />

        {/* SEGMENT 03: Categorized Product Catalog */}
        <section
          id="katalog"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 scroll-mt-[calc(3.5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top))] min-h-[100dvh] sm:min-h-[140vh] pb-24 sm:pb-52"
        >
          {/* Main Title & Quick Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-8 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                {t.title}
              </h2>
              <p className="text-xs text-zinc-300 sm:text-sm mt-2 max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>

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

          {filteredProjects.length > 0 ? (
            <div className="mt-12 space-y-16">
              {visibleCategories.map((cat) => {
                const catProjects = filteredProjects.filter(
                  (p) => p.category === cat.id
                );
                if (catProjects.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-semibold text-white">
                          {DICTIONARY[language].categories[cat.id] || cat.label}
                        </h3>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono tabular-nums text-zinc-300">
                          {catProjects.length}
                        </span>
                      </div>

                      {selectedCategory === "all" && (
                        <button
                          onClick={() => handleSelectCategory(cat.id)}
                          className="flex items-center gap-1 text-xs text-[#C76C6A] hover:underline"
                        >
                          <span>
                            {t.viewCategoryOnly(
                              DICTIONARY[language].categories[cat.id] || cat.label
                            )}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                      {catProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onOpenDetails={(p) => setActiveProject(p)}
                          language={language}
                          isAdmin={isAdmin}
                          isTogglingFlagship={Boolean(togglingIds[project.id])}
                          onToggleFlagship={(p) => void handleToggleFlagship(p)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-12 text-center">
              <Terminal className="h-6 w-6 text-zinc-600 mb-3" />
              <h3 className="text-sm font-semibold text-white">
                {t.emptyTitle}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">{t.emptySubtitle}</p>
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

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenSponsor={() => {
          setActiveProject(null);
          setIsSponsorModalOpen(true);
        }}
        language={language}
      />

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        language={language}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(p) => setActiveProject(p)}
        onOpenAdmin={handleOpenOrExitAdmin}
        isAdmin={isAdmin}
        language={language}
      />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => setIsAdmin(true)}
        language={language}
      />

      {/* Discreet Floating Admin Pill (visible only when logged in) */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full border border-[#C76C6A]/40 bg-[#0c0e15]/95 px-3.5 py-2 text-xs text-zinc-200 shadow-2xl backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#C76C6A]" />
          <ShieldCheck className="h-3.5 w-3.5 text-[#C76C6A]" />
          <span className="font-mono text-[11px]">
            Admin &bull; {flagshipIds.length} Flagship
          </span>
          <button
            type="button"
            onClick={() => void handleLogoutAdmin()}
            title={language === "de" ? "Abmelden" : "Log out"}
            aria-label="Log out of Admin Mode"
            className="ml-1 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <LogOut className="h-3 w-3" />
            <span>{language === "de" ? "Logout" : "Exit"}</span>
          </button>
        </div>
      )}

      {/* Brief Error Toast if persistence fails */}
      {adminToast && (
        <div className="fixed bottom-16 right-4 z-50 max-w-xs rounded-xl border border-rose-500/40 bg-rose-950/90 px-3.5 py-2.5 text-xs text-rose-200 shadow-xl backdrop-blur-md">
          {adminToast}
        </div>
      )}

      <Footer
        onOpenSponsor={() => setIsSponsorModalOpen(true)}
        language={language}
      />
    </div>
  );
};
