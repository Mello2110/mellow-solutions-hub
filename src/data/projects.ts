import { Project, CategoryMeta } from "@/types/project";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "all",
    label: "Alle Produkte",
    description: "Komplettübersicht aller Extensions, Web-Applikationen und Entwickler-Tools.",
    iconName: "LayoutGrid",
  },
  {
    id: "extension",
    label: "Extensions",
    description: "Browser-Erweiterungen für Google Chrome & Chromium mit Fokus auf Manifest V3, Performance und Datenschutz.",
    iconName: "Puzzle",
  },
  {
    id: "webapp",
    label: "Web Apps",
    description: "Vollwertige moderne Webanwendungen mit reaktiven Benutzeroberflächen und Cloud-Anbindung.",
    iconName: "Globe",
  },
  {
    id: "tool",
    label: "HTML Tools",
    description: "Leichtgewichtige, clientseitige Helferwerkzeuge für Browser, Canvas und Produktivität.",
    iconName: "Wrench",
  },
  {
    id: "automation",
    label: "Automatisierung",
    description: "CLI-Skripte, Hintergrundprozesse und API-Integrationen zur Workflow-Optimierung.",
    iconName: "Cpu",
  },
  {
    id: "other",
    label: "Sonstige & Experimente",
    description: "Bibliotheken, APIs, Templates, Daten-Pipelines und experimentelle Utilities.",
    iconName: "Package",
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "tab-sentinel-extension",
    title: "Tab Sentinel Pro",
    tagline: "Intelligenter Tab-Suspender & Memory-Optimizer für rechenintensive Workflows.",
    category: "extension",
    categoryLabel: "Chrome Extension",
    status: "production",
    statusLabel: "Im Chrome Web Store",
    featured: true,
    badge: "Manifest V3",
    problemStatement:
      "Moderne Web-Applikationen und Dev-Tools verbrauchen bei Dutzenden offenen Tabs gigabyte-weise Arbeitsspeicher und belasten die CPU im Hintergrund kontinuierlich.",
    technicalSolution:
      "Entwicklung einer ressourcenschonenden Manifest V3 Extension mit Alarms API und IndexedDB State-Caching. Inaktive Tabs werden nach konfigurierbarem Schwellenwert in einen leichtgewichtigen Snapshot überführt und per Ein-Klick mit intaktem Scroll- und Formularzustand reaktiviert.",
    architectureHighlights: [
      "Manifest V3 Service Worker Architektur ohne permanente Hintergrundlast",
      "IndexedDB Snapshot-Engine für verlustfreien Session-Restore",
      "Tailwind CSS + Preact Popup UI mit < 15ms Latenz",
      "100% lokal: Null externe Serverabfragen für maximalen Datenschutz",
    ],
    techStack: ["TypeScript", "Chrome Extensions API", "Manifest V3", "Preact", "IndexedDB", "Tailwind CSS"],
    links: {
      chromeWebStore: "https://chromewebstore.google.com",
      githubUrl: "https://github.com/example/tab-sentinel-pro",
      demoUrl: "https://example.github.io/tab-sentinel-pro-demo",
    },
    stats: {
      users: "3.500+ aktive Nutzer",
      rating: "4.9 ★ (48 Bewertungen)",
      version: "v2.1.4",
      releaseDate: "2025",
    },
  },
  {
    id: "quick-diff-visualizer",
    title: "QuickDiff Inspector",
    tagline: "Echtzeit-Text- und JSON-Vergleichstool direkt im Browser-Seitenpanel.",
    category: "extension",
    categoryLabel: "Chrome Side Panel Extension",
    status: "production",
    statusLabel: "Live",
    featured: false,
    badge: "Side Panel API",
    problemStatement:
      "Entwickler müssen während des Codens oder API-Debugging häufig JSON-Payloads oder Logs vergleichen und dafür den Tab wechseln oder externe Webseiten mit sensiblen Daten füttern.",
    technicalSolution:
      "Nutzung der nativen Chrome Side Panel API zur Bereitstellung eines permanent erreichbaren side-by-side Diffing-Panels mit Monaco Editor Engine und lokaler Token-Berechnung.",
    architectureHighlights: [
      "Chrome Side Panel Integration für unterbrechungsfreien Workflow",
      "Diff-Algorithmus (Myers diff) vollständig im WebAssembly/Web Worker ausgeführt",
      "End-to-End lokal, keine Cloud-Uploads sensibler Payload-Daten",
    ],
    techStack: ["TypeScript", "Side Panel API", "Web Workers", "Monaco Editor", "Tailwind CSS"],
    links: {
      chromeWebStore: "https://chromewebstore.google.com",
      githubUrl: "https://github.com/example/quick-diff-inspector",
    },
    stats: {
      users: "1.200+ Nutzer",
      rating: "5.0 ★",
      version: "v1.2.0",
    },
  },
  {
    id: "mellow-solutions-hub",
    title: "Mellow Solutions Hub",
    tagline: "Curated portfolio & product showcase for developer utilities, Chrome extensions, and web applications.",
    category: "webapp",
    categoryLabel: "Fullstack Web App",
    status: "production",
    statusLabel: "Live",
    featured: false,
    badge: "Portfolio & Hub",
    problemStatement:
      "Developer portfolios often suffer from fragmented repositories, buried live demos, and a lack of architectural depth required for technical evaluations.",
    technicalSolution:
      "A performance-tuned Next.js 15 web platform featuring viewport-snapping stages, instant client-side catalog filtering, and structured markdown ingestion.",
    architectureHighlights: [
      "3-stage viewport snapping engine with zero-jitter catalog pinning",
      "Bilingual dictionary architecture with instant EN/DE switching",
      "Strict Zod-validated data pipeline for project case studies and live sandbox embeds",
      "Dark Swiss-precision aesthetic with high-resolution 2D vector branding",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Lucide Icons", "Zod"],
    links: {
      githubUrl: "https://github.com/Mello2110/mellow-solutions-hub",
      demoUrl: "https://mellow-solutions-hub.vercel.app",
    },
    sandboxPreview: {
      enabled: true,
      embedUrl: "https://mellow-solutions-hub.vercel.app",
      description: "Interactive live preview of the Mellow Solutions Hub platform.",
    },
    stats: {
      version: "v1.0.0",
      releaseDate: "2026",
    },
  },
  {
    id: "dev-hub-dashboard",
    title: "Mellow DevHub & Snippet Cloud",
    tagline: "Zentrales Entwickler-Dashboard für wiederverwendbare Micro-Components und Snippets.",
    category: "webapp",
    categoryLabel: "Fullstack Web App",
    status: "production",
    statusLabel: "Production Ready",
    featured: true,
    badge: "Next.js 15 & Supabase",
    problemStatement:
      "Codefragmente, Regex-Muster und Config-Templates sind oft über verschiedene Notiz-Apps und Repositories verstreut, was zu wiederholter Recherchearbeit führt.",
    technicalSolution:
      "Erstellung einer hochperformanten Webanwendung mit Instant-Search, Tag-Taxonomie, Live-Code-Vorschau und sicherer Cloud-Synchronisation.",
    architectureHighlights: [
      "Server Components (RSC) für blitzschnelle initiale Ladezeiten",
      "Optimistisches UI-Update für verzögerungsfreie Interaktionen",
      "Volltextsuche mit PostgreSQL pg_trgm und clientseitigem Fallback-Cache",
    ],
    techStack: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS", "Framer Motion"],
    links: {
      demoUrl: "https://mellowsolutions.dev",
      githubUrl: "https://github.com/example/mellow-devhub",
      docsUrl: "https://mellowsolutions.dev/docs",
    },
    stats: {
      users: "Eigenes Kern-Werkzeug",
      version: "v3.0.1",
    },
  },
  {
    id: "svg-path-optimizer-tool",
    title: "SVG Flow & Precision Optimizer",
    tagline: "Clientseitiger SVG-Bereiniger, Komprimierer und Pfad-Visualisierer.",
    category: "tool",
    categoryLabel: "HTML / Canvas Tool",
    status: "production",
    statusLabel: "Open Source",
    featured: true,
    badge: "In-Browser Sandbox",
    problemStatement:
      "Aus Figma oder Illustrator exportierte SVGs enthalten oft unnötige Metadaten, unpräzise Dezimalstellen und redundante Pfadbefehle, die Web-Assets aufblähen.",
    technicalSolution:
      "Ein reines Single-Page HTML5/Canvas-Tool mit Drag-and-Drop, Echtzeit-Vorschau vor/nach Komprimierung und direkter Kopierfunktion für JSX- und CSS-Sprites.",
    architectureHighlights: [
      "Zero-Dependency Architektur (reine Web APIs: DOMParser, Canvas2D, FileReader)",
      "Vollständige Offline-Fähigkeit via Service Worker (PWA)",
      "Echtzeit-Berechnung von Byte-Ersparnis und DOM-Knoten-Reduktion",
    ],
    techStack: ["Vanilla JavaScript", "HTML5 Canvas", "CSS Glassmorphism", "SVG Path API"],
    links: {
      demoUrl: "https://example.github.io/svg-precision-optimizer",
      githubUrl: "https://github.com/example/svg-precision-optimizer",
    },
    sandboxPreview: {
      enabled: true,
      embedUrl: "https://example.github.io/svg-precision-optimizer",
      description: "Kann direkt im Sandbox-Modal ausprobiert werden.",
    },
    stats: {
      version: "v1.4.0",
      releaseDate: "2024",
    },
  },
  {
    id: "markdown-cheatsheet-runner",
    title: "Markdown Live Engine & HTML Converter",
    tagline: "Minimalistischer, tastaturgesteuerter Markdown-zu-HTML-Compiler mit Preset-Export.",
    category: "tool",
    categoryLabel: "HTML Utility",
    status: "production",
    statusLabel: "Live",
    featured: false,
    badge: "Client-side",
    problemStatement:
      "Schnelles Erstellen und Testen von formatiertem Markdown für GitHub Readmes oder Blogartikel ohne überladene Editoren.",
    technicalSolution:
      "Einfaches und responsives Split-Screen Tool mit sofortigem Syntax-Highlighting, Clean-HTML-Export und GitHub-Flavored Markdown Unterstützung.",
    architectureHighlights: [
      "Blitzschneller Tokenizer mit synchronisierter Scroll-Position",
      "Exportoptionen: Clean HTML, Tailwind Markup, Minified HTML",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript ES6", "GitHub Pages"],
    links: {
      demoUrl: "https://example.github.io/markdown-live-engine",
      githubUrl: "https://github.com/example/markdown-live-engine",
    },
    sandboxPreview: {
      enabled: true,
      embedUrl: "https://example.github.io/markdown-live-engine",
    },
    stats: {
      version: "v1.1.0",
    },
  },
  {
    id: "auto-deploy-pipeline-bot",
    title: "Release & Changelog Automator",
    tagline: "GitHub Action & Node.js CLI zur automatisierten Versionierung und Release-Publizierung.",
    category: "automation",
    categoryLabel: "Automation / CLI",
    status: "production",
    statusLabel: "Open Source",
    featured: false,
    badge: "Node.js / CI-CD",
    problemStatement:
      "Manuelle Versionserhöhung und das Zusammentragen von Git-Commits für Release-Notes kosten bei mehreren Extensions und Repositories wertvolle Zeit.",
    technicalSolution:
      "Ein CI/CD GitHub Action Tool, das Conventional Commits parst, `manifest.json` und `package.json` synchronisiert und automatisiert Chrome Web Store Zip-Artefakte packt.",
    architectureHighlights: [
      "Automatische SemVer-Berechnung aus Git-History",
      "Automatische Erstellung von Chrome Extension Zip-Bundles",
      "Versand von Discord/Slack Webhook-Meldungen bei erfolgreichem Release",
    ],
    techStack: ["Node.js", "GitHub Actions", "Shell / Bash", "REST APIs"],
    links: {
      githubUrl: "https://github.com/example/release-changelog-automator",
      docsUrl: "https://github.com/example/release-changelog-automator#readme",
    },
    stats: {
      version: "v2.0.0",
    },
  },
];
