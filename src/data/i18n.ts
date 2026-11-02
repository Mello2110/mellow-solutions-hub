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
    disclaimerBadge: string;
    disclaimerTitle: string;
    disclaimerP1: string;
    disclaimerP2: string;
  };
  categories: {
    all: string;
    extension: string;
    webapp: string;
    tool: string;
    automation: string;
    other: string;
  };
  modal: {
    tabOverview: string;
    tabSandbox: string;
    statusLive: string;
    problemTitle: string;
    solutionTitle: string;
    archTitle: string;
    techTitle: string;
    supportPrompt: string;
    supportBtn: string;
    sandboxTitle: string;
    openInNewTab: string;
    noEmbedUrl: string;
    chromeStore: string;
    liveDemo: string;
    sourceCode: string;
    close: string;
  };
  commandPalette: {
    placeholder: string;
    noResults: (query: string) => string;
    productsCount: (count: number) => string;
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
      title: "Crafted with Precision & Purpose",
      subtitle: "Solutions for Daily Struggles and Business Procedures.",
      description:
        "Independent browser extensions, web applications, and developer utilities. Free to use, built to help, and crafted for lasting utility.",
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
      p1: "All extensions and tools are free to use, crafted with dedication to eliminate everyday friction and make digital procedures easier.",
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
      tagline: "Software crafted with love &bull; Free to use &bull; Built to help",
      supportBtn: "Buy me a coffee",
      disclaimerBadge: "Portfolio & Non-Commercial Notice",
      disclaimerTitle: "Personal Developer Showcase & Free Utilities",
      disclaimerP1:
        "Mellow Solutions is an independent developer portfolio and sandbox created to showcase modern software architecture, Chrome extensions, and web utilities. All tools are provided free of charge in the spirit of open, problem-solving craft.",
      disclaimerP2:
        "Unless explicitly stated otherwise, all tools and services are provided 'as is' without warranties of any kind. Use of the software is at your own discretion and responsibility. No commercial service-level agreements or guarantees of availability are implied.",
    },
    categories: {
      all: "All Products",
      extension: "Extensions",
      webapp: "Web Apps",
      tool: "HTML Tools",
      automation: "Automation",
      other: "Other & Utilities",
    },
    modal: {
      tabOverview: "Architecture & Details",
      tabSandbox: "Live In-Hub Sandbox",
      statusLive: "Live & Active",
      problemTitle: "1. Problem & Motivation:",
      solutionTitle: "2. Technical Solution & Methodology:",
      archTitle: "Architecture Highlights & Best Practices:",
      techTitle: "Technologies & APIs Used:",
      supportPrompt: "Like this tool? Support independent development on Buy Me a Coffee.",
      supportBtn: "Buy me a coffee",
      sandboxTitle: "Interactive test run in Hub Sandbox frame",
      openInNewTab: "Open in new tab",
      noEmbedUrl: "No live embed URL available.",
      chromeStore: "Chrome Web Store",
      liveDemo: "Live Demo / Web App",
      sourceCode: "Source Code",
      close: "Close",
    },
    commandPalette: {
      placeholder: "Type to search (e.g. Extension, React, Manifest V3)...",
      noResults: (query: string) => `No projects matching "${query}" found.`,
      productsCount: (count: number) => `Products (${count})`,
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
      title: "Mit Präzision & Zweckmäßigkeit gefertigt",
      subtitle: "Lösungen für alltägliche Herausforderungen und Geschäftsprozesse.",
      description:
        "Unabhängige Chrome-Extensions, Webanwendungen und Entwickler-Tools. Kostenlos nutzbar, darauf ausgelegt Menschen zu helfen und Hürden nachhaltig zu überwinden.",
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
      p1: "Alle hier vorgestellten Extensions und Tools sind kostenlos nutzbar, mit Hingabe gebaut und darauf ausgelegt, alltägliche Hürden zu verringern.",
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
      tagline: "Software mit Liebe gebaut &bull; Kostenlos nutzbar &bull; Entwickelt, um zu helfen",
      supportBtn: "Kaffee spendieren",
      disclaimerBadge: "Portfolio & Haftungsausschluss",
      disclaimerTitle: "Persönliches Entwickler-Portfolio & Werkzeuge",
      disclaimerP1:
        "Mellow Solutions dient als persönliches Entwickler-Portfolio und Projekt-Showcase für praxiserprobte Webapplikationen, Chrome-Extensions und Hilfswerkzeuge. Sämtliche Tools werden unentgeltlich und im Rahmen unabhängiger Entwicklung aus Eigenbedarf und Freude am Coden bereitgestellt.",
      disclaimerP2:
        "Sofern nicht ausdrücklich anders ausgewiesen, erfolgt die Bereitstellung der Software 'as is' ohne gewerbliche Gewährleistung oder garantierte Verfügbarkeit. Die Nutzung erfolgt eigenverantwortlich und auf eigenes Risiko.",
    },
    categories: {
      all: "Alle Produkte",
      extension: "Extensions",
      webapp: "Web Apps",
      tool: "HTML Tools",
      automation: "Automatisierung",
      other: "Sonstige & Werkzeuge",
    },
    modal: {
      tabOverview: "Architektur & Details",
      tabSandbox: "Live In-Hub Sandbox",
      statusLive: "Live & Aktiv",
      problemTitle: "1. Problemstellung & Motivation:",
      solutionTitle: "2. Technische Lösung & Methodik:",
      archTitle: "Architektur-Highlights & Best Practices:",
      techTitle: "Eingesetzte Technologien & APIs:",
      supportPrompt: "Gefällt dir dieses Tool? Unterstütze die unabhängige Weiterentwicklung auf Buy Me a Coffee.",
      supportBtn: "Kaffee spendieren",
      sandboxTitle: "Interaktiver Testlauf im Hub Sandbox-Frame",
      openInNewTab: "In neuem Tab öffnen",
      noEmbedUrl: "Keine Einbettungs-URL hinterlegt.",
      chromeStore: "Chrome Web Store",
      liveDemo: "Live Demo / Web App",
      sourceCode: "Source Code",
      close: "Schließen",
    },
    commandPalette: {
      placeholder: "Tippe zur Schnellsuche (z.B. Extension, React, Manifest V3)...",
      noResults: (query: string) => `Kein Projekt passend zu "${query}" gefunden.`,
      productsCount: (count: number) => `Produkte (${count})`,
    },
  },
};
