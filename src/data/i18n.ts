export type Language = "en" | "de";

export interface Translations {
  nav: {
    productsCount: (count: number) => string;
    searchPlaceholder: string;
    ctrlK: string;
    support: string;
    github: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    quote: string;
    quoteAuthor: string;
    scrollPrompt: string;
  };
  spotlight: {
    flagshipBadge: string;
    problemTitle: string;
    solutionTitle: string;
    techTitle: string;
    archTitle: string;
    users: string;
    rating: string;
    openCaseStudy: string;
    chromeStore: string;
    liveDemo: string;
    scrollPrompt: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    techFilter: string;
    clearFilter: string;
    showingCount: (shown: number, total: number, filtered: boolean) => string;
    viewCategoryOnly: (category: string) => string;
    emptyTitle: string;
    emptySubtitle: string;
    resetFilters: string;
    problem: string;
    details: string;
  };
  sponsor: {
    title: string;
    subtitle: string;
    p1: string;
    whyTitle: string;
    reasons: string[];
    coffeeButton: string;
    copyButton: string;
    copied: string;
  };
  footer: {
    tagline: string;
    supportBtn: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    nav: {
      productsCount: (count) => `${count} PRODUCTS`,
      searchPlaceholder: "Search...",
      ctrlK: "Ctrl K",
      support: "Support",
      github: "GitHub",
    },
    hero: {
      title: "Crafted with Precision & Purpose.",
      subtitle: "Solutions for Daily Struggles and Business Procedures.",
      description:
        "Independent browser extensions, web applications, and developer utilities. Ad-free, privacy-first, and built for lasting utility.",
      quote: "“Everything should be made as simple as possible, but not simpler.”",
      quoteAuthor: "Albert Einstein",
      scrollPrompt: "Explore Featured Flagship",
    },
    spotlight: {
      flagshipBadge: "Featured Flagship",
      problemTitle: "The Core Problem:",
      solutionTitle: "The Mellow Solution:",
      techTitle: "Technologies:",
      archTitle: "Architecture & Metrics",
      users: "Users",
      rating: "Rating",
      openCaseStudy: "Read Full Case Study",
      chromeStore: "Chrome Store",
      liveDemo: "Live Demo",
      scrollPrompt: "Continue to Product Directory",
    },
    catalog: {
      title: "Product Directory & Toolbox",
      subtitle:
        "Apps, Tools and Extensions crafted with Love to make my Life easier. Maybe you find something useful here too - I'd love to share.",
      searchPlaceholder: "Search projects or tech (e.g. Manifest V3)...",
      clearSearch: "Clear",
      techFilter: "Technology:",
      clearFilter: "Clear filter",
      showingCount: (shown, total, filtered) =>
        `Showing ${shown} of ${total} products ${filtered ? "(filtered)" : ""}`,
      viewCategoryOnly: (cat) => `Only show ${cat}`,
      emptyTitle: "No matching products found",
      emptySubtitle: "Try adjusting your search query or reset the active filters.",
      resetFilters: "Reset all filters",
      problem: "Focus / Problem:",
      details: "Architecture & Details",
    },
    sponsor: {
      title: "Support Mellow Solutions",
      subtitle: "Independent & Transparent Software Development",
      p1: "All extensions and tools are 100% ad-free, privacy-first, and built without third-party tracking.",
      whyTitle: "What are contributions used for?",
      reasons: [
        "Chrome Web Store developer registration and API fees",
        "Domain & cloud hosting infrastructure",
        "Active maintenance and continuous feature updates",
      ],
      coffeeButton: "Buy Me a Coffee",
      copyButton: "Copy direct donation link",
      copied: "Link copied to clipboard!",
    },
    footer: {
      tagline: "Software crafted with love &bull; 100% ad-free &bull; Zero tracking",
      supportBtn: "Buy me a coffee",
    },
  },
  de: {
    nav: {
      productsCount: (count) => `${count} PRODUKTE`,
      searchPlaceholder: "Suche...",
      ctrlK: "Strg K",
      support: "Support",
      github: "GitHub",
    },
    hero: {
      title: "Präzision & Zweckmäßigkeit.",
      subtitle: "Lösungen für alltägliche Herausforderungen und Geschäftsprozesse.",
      description:
        "Unabhängige Chrome-Extensions, Webanwendungen und Entwickler-Tools. Werbefrei, datenschutzorientiert und auf echten Nutzen ausgelegt.",
      quote: "„Alles sollte so einfach wie möglich gemacht werden, aber nicht einfacher.“",
      quoteAuthor: "Albert Einstein",
      scrollPrompt: "Flaggschiff erkunden",
    },
    spotlight: {
      flagshipBadge: "Flaggschiff Spotlight",
      problemTitle: "Das Ausgangsproblem:",
      solutionTitle: "Der Mellow Lösungsansatz:",
      techTitle: "Technologien:",
      archTitle: "Architektur & Kennzahlen",
      users: "Nutzer",
      rating: "Bewertung",
      openCaseStudy: "Vollständige Case Study öffnen",
      chromeStore: "Chrome Store",
      liveDemo: "Live Demo",
      scrollPrompt: "Weiter zum Produkt-Katalog",
    },
    catalog: {
      title: "Verzeichnis & Werkzeuge",
      subtitle:
        "Apps, Tools und Extensions mit Liebe gebaut, um das Leben einfacher zu machen. Vielleicht findest du hier etwas Nützliches – ich teile es gerne.",
      searchPlaceholder: "Projekt oder Technologie suchen...",
      clearSearch: "Löschen",
      techFilter: "Technologie:",
      clearFilter: "Filter aufheben",
      showingCount: (shown, total, filtered) =>
        `Zeige ${shown} von ${total} Produkten ${filtered ? "(gefiltert)" : ""}`,
      viewCategoryOnly: (cat) => `Nur ${cat} anzeigen`,
      emptyTitle: "Keine passenden Produkte gefunden",
      emptySubtitle: "Passe deinen Suchbegriff an oder setze die Filter zurück.",
      resetFilters: "Alle Filter zurücksetzen",
      problem: "Fokus / Problemstellung:",
      details: "Architektur & Details",
    },
    sponsor: {
      title: "Mellow Solutions unterstützen",
      subtitle: "Unabhängige & transparente Softwareentwicklung",
      p1: "Alle hier vorgestellten Extensions und Tools sind vollkommen werbefrei, ohne Tracking und auf Langlebigkeit ausgelegt.",
      whyTitle: "Wofür werden Spenden genutzt?",
      reasons: [
        "Entwickler- & API-Gebühren des Chrome Web Stores",
        "Hosting- und Domain-Infrastruktur",
        "Weiterentwicklung und zügige Bugfixes neuer Versionen",
      ],
      coffeeButton: "Kaffee via Buy Me a Coffee spendieren",
      copyButton: "Direkten Spenden-Link kopieren",
      copied: "Link in die Zwischenablage kopiert!",
    },
    footer: {
      tagline: "Software mit Liebe gebaut &bull; 100% werbefrei &bull; Zero Tracking",
      supportBtn: "Kaffee spendieren",
    },
  },
};
