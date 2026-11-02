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
    "id": "kiniffler-stammtisch-app",
    "title": "KANPAI - Stammtisch Web App",
    "tagline": "All-in-one meetup hub featuring digital Yahtzee, automated treasury tracking, and event scheduling.",
    "category": "webapp",
    "status": "production",
    "featured": true,
    "badge": "Active",
    "problemStatement": "Organizing regular social clubs ('Stammtisch') typically suffers from fragmented communication, manual scorekeeping with pen and paper, and cumbersome cash management for collective group expenses and penalty fines. Traditional chat groups lack centralized event attendance polling, while paper-based game records and unrecorded financial obligations lead to accounting friction and lost records over time.",
    "technicalSolution": "KANPAI provides a serverless PWA built with Next.js 16 and Firebase, delivering an interactive multiplayer Kniffel game engine alongside full event scheduling and treasury tracking. Cloud Functions automate PayPal payment reconciliation via IMAP email ingestion, while Firestore with multi-tab IndexedDB caching ensures instantaneous updates and resilient offline operation.",
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Firebase Firestore",
      "Firebase Auth",
      "Firebase Cloud Functions",
      "Cloudinary",
      "PWA"
    ],
    "architectureHighlights": [
      "Automated Financial Reconciliation via Cloud Functions & IMAP PayPal ingestion",
      "Persistent Multi-Tab Offline Caching with Firestore & IndexedDB",
      "Component-Driven Modular Architecture with Next.js App Router & Tailwind CSS 4",
      "Real-Time Multiplayer Game State Synchronization with Optimistic UI Updates"
    ],
    "links": {
      "demoUrl": "https://webapp-stammtisch.web.app",
      "githubUrl": "https://github.com/Mello2110/Kiniffler-Stammtisch-App"
    },
    "stats": {
      "version": "v0.1.0"
    },
    "categoryLabel": "Web App / PWA",
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://webapp-stammtisch.web.app",
      "description": "Live PWA hosted on Firebase Hosting with responsive mobile layout and guest access."
    }
  },
  {
    "id": "listz",
    "title": "Listz",
    "tagline": "Local-first PWA for smart shopping lists, recipes, and nested tasks with instant offline sync.",
    "category": "webapp",
    "status": "production",
    "featured": true,
    "badge": "Live PWA",
    "problemStatement": "Everyday organization is often hindered by fragmented apps for grocery shopping, recipes, and to-do lists, leading to tedious manual copying and high friction. Most modern task managers depend heavily on continuous cloud connectivity, causing frustrating latency and failures in offline environments like grocery stores or during travel. Furthermore, existing tools lack intelligent synchronization between recipe ingredients and shopping checklists.",
    "technicalSolution": "Listz provides a resilient local-first Progressive Web App built with React 18, TypeScript, and Dexie IndexedDB that delivers instantaneous zero-latency UI interactions offline and online. An outbox synchronization queue and Supabase Realtime channel propagate changes across devices while gracefully handling intermittent connectivity. The system includes an automated ingredient parser with smart merge addition, hierarchical subtasks with auto-completion, and physical database pruning to prevent storage bloat.",
    "techStack": [
      "React 18",
      "TypeScript",
      "Vite",
      "Dexie.js (IndexedDB)",
      "Supabase (PostgreSQL 15)",
      "Progressive Web App (PWA)",
      "@dnd-kit",
      "Cloudflare Pages"
    ],
    "architectureHighlights": [
      "Local-First Architecture: 0 ms interaction latency via Dexie.js and IndexedDB with background outbox synchronization",
      "Real-Time Collaboration: Supabase WebSockets with automated presence, reconnection handling, and battery-friendly delta sync",
      "Smart Ingredient Engine: Natural language ingredient parsing and automatic quantity aggregation during recipe transfers",
      "Hierarchical Task Automations: Nested checklist steps with automatic parent task resolution and physical database garbage collection"
    ],
    "links": {
      "demoUrl": "https://listz.pages.dev",
      "githubUrl": "https://github.com/Mello2110/Listz"
    },
    "stats": {
      "version": "v0.1.0"
    },
    "categoryLabel": "Web App / PWA",
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://listz.pages.dev",
      "description": "Mobile-first touch UI optimized for handheld viewports (390x844)."
    }
  },
  {
    "id": "lazyshorts",
    "title": "LazyShorts",
    "tagline": "Hands-free auto-advance and intelligent skipping for YouTube Shorts and TikTok.",
    "category": "extension",
    "status": "production",
    "featured": true,
    "badge": "Manifest V3",
    "problemStatement": "Short-form video platforms like YouTube Shorts and TikTok loop videos indefinitely by default, forcing users into continuous manual interaction to proceed. Additionally, navigating past unwanted content or skipping after negative feedback requires repetitive clicks or keyboard inputs. This disrupts hands-free viewing, multitasking, and causes unnecessary interaction fatigue.",
    "technicalSolution": "LazyShorts employs an event-driven Manifest V3 architecture featuring a content script with a dual video-end detection engine and loop-freeze protection. It tracks single-page application (SPA) navigations via chrome.webNavigation and executes safe, multi-tiered DOM scrolling with automatic focus blurring. User interactions such as disliking or selecting 'Not interested' are captured instantly via event delegation to auto-advance playback.",
    "techStack": [
      "JavaScript (ES2022+)",
      "Chrome Extension Manifest V3",
      "Chrome Web APIs",
      "HTML5 Video API",
      "CSS3 Design System"
    ],
    "architectureHighlights": [
      "Dual-Trigger Video End Engine with Loop-Freeze Protection",
      "Declarative SPA History State Routing via Background Service Worker",
      "Safe Multi-Tiered DOM Navigation with Focus Blurring Safeguards",
      "Zero-Telemetry Architecture with 100% Client-Side Privacy"
    ],
    "links": {
      "githubUrl": "https://github.com/Mello2110/LazyShorts"
    },
    "stats": {
      "version": "v1.5.1"
    },
    "categoryLabel": "Chrome Extension",
    "sandboxPreview": {
      "enabled": false
    }
  },
  {
    "id": "colorcheck",
    "title": "ColorCheck",
    "tagline": "Perceptual OKLCH eyedropper, 60-30-10 palette extractor, and WCAG contrast studio for web designers.",
    "category": "extension",
    "status": "production",
    "featured": false,
    "badge": "Chrome Extension",
    "problemStatement": "Digital designers and front-end developers struggle to sample true on-screen colors due to browser color-space clipping and non-uniform legacy RGB models. Extracting harmonious, accessible palettes from complex interfaces requires tedious manual calculations across multiple external tools. Furthermore, verifying WCAG contrast compliance and color vision deficiency legibility disrupts active design workflows.",
    "technicalSolution": "ColorCheck integrates an in-browser perceptual color science engine based on OKLab/OKLCH with native DeltaE distance calculations directly into a Manifest V3 extension. It pairs a high-precision canvas loupe eyedropper with a 60-30-10 dominant color clustering pipeline, real-time Daltonization preview filters, and multi-format CSS/Tailwind code generators.",
    "techStack": [
      "JavaScript (ES2022)",
      "Chrome Extension Manifest V3",
      "OKLab / OKLCH Color Engine",
      "HTML5 Canvas API",
      "Chrome Storage API",
      "CSS3 Custom Properties"
    ],
    "architectureHighlights": [
      "Native OKLab & OKLCH perceptual engine with DeltaEOK distance calculation and gamuts",
      "Manifest V3 background service worker with zero-latency tab communication via Scripting API",
      "Client-side Daltonization matrix transformations for Protan, Deutan, Tritan, and Mono previews",
      "Proportional 60-30-10 palette clustering with instant CSS Variables & Tailwind configuration export"
    ],
    "links": {
      "githubUrl": "https://github.com/Mello2110/ColorCheck"
    },
    "stats": {
      "version": "v2.3.0"
    },
    "categoryLabel": "Chrome Extension",
    "sandboxPreview": {
      "enabled": false
    }
  },
  {
    "id": "track-dat-baby",
    "title": "BabyTrack",
    "tagline": "Collaborative child-care web app for tracking meals, milestones, growth, and health in real time.",
    "category": "webapp",
    "status": "production",
    "featured": false,
    "badge": "Web App",
    "problemStatement": "New parents and caregivers frequently struggle to coordinate feeding routines, medication schedules, growth metrics, and daily milestones across fragmented notes or chat messages. Without a synchronized timeline, handoffs between partners, babysitters, and family members lead to duplicate feedings or missed health observations. In addition, sensitive infant wellness records often lack centralized, privacy-first access control.",
    "technicalSolution": "BabyTrack delivers a real-time Next.js application backed by Firebase Firestore for instantaneous synchronization and granular document-level security. Caregiver collaboration is enforced via time-limited cryptographic invite tokens and role-based permissions, while an integrated QStash pipeline drives scheduled feeding and medication reminders. The interface utilizes a zero-overhead CSS custom property theming system and client-side internationalization for seamless everyday usage.",
    "techStack": [
      "Next.js 14",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Tailwind CSS",
      "Upstash QStash",
      "Lucide React",
      "date-fns"
    ],
    "architectureHighlights": [
      "Real-time NoSQL state synchronization with Firebase Firestore",
      "Role-based caregiver access control with expiring single-use invite tokens",
      "Zero-runtime CSS custom properties theming engine (Light, Dark, Baby aesthetic)",
      "Serverless scheduled health alarms via Upstash QStash and Firebase Admin"
    ],
    "links": {
      "demoUrl": "https://track-dat-baby.vercel.app/",
      "githubUrl": "https://github.com/Mello2110/TrackDatBaby"
    },
    "stats": {
      "version": "v0.1.0"
    },
    "categoryLabel": "Web App / PWA",
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://track-dat-baby.vercel.app/",
      "description": "Interactive sandbox preview of BabyTrack."
    }
  },
  {
    "id": "spieletag",
    "title": "Spieletag System",
    "tagline": "Turnkey game night manager with weighted game drawing, live scoring, and real-time cloud sync.",
    "category": "webapp",
    "status": "production",
    "featured": false,
    "badge": "Open Source",
    "problemStatement": "Coordinating game nights and party tournaments is often disrupted by chaotic scorekeeping, decision fatigue, and disjointed rule management. Traditional manual setups lack dynamic replay balancing, turn-by-turn fairness, and instant state sharing across participants' individual devices. Hosts frequently spend more time managing session logistics than actually playing.",
    "technicalSolution": "The application implements a lightweight, dependency-free Progressive Web App driven by a phase-based state machine and a hybrid urn-randomization algorithm with real-time probability redistribution. It combines local state persistence, procedural Web Audio generation, and Canvas animations with Firebase Realtime Database for live guest synchronization and community presets. A custom Service Worker caching strategy ensures full offline operability for local play.",
    "techStack": [
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Firebase Realtime Database",
      "Firebase Authentication",
      "Service Worker API (PWA)",
      "Web Audio API",
      "HTML5 Canvas API"
    ],
    "architectureHighlights": [
      "Zero-dependency single-page architecture with state-driven view transitions",
      "Hybrid urn-based weighted random algorithm with real-time probability recalculation",
      "Real-time multi-device synchronization via Firebase Realtime Database and Auth",
      "Offline-first PWA caching with background state persistence and reload recovery"
    ],
    "links": {
      "demoUrl": "https://mello2110.github.io/spieletag/",
      "githubUrl": "https://github.com/Mello2110/spieletag"
    },
    "stats": {
      "version": "v1.0.0"
    },
    "categoryLabel": "Web App / PWA",
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://mello2110.github.io/spieletag/",
      "description": "Interactive sandbox preview of Spieletag System."
    }
  },
  {
    "id": "bingo-multiplayer",
    "title": "Bingo — Realtime Multiplayer",
    "tagline": "Zero-install, real-time multiplayer bingo PWA powered by Firebase Realtime Database.",
    "category": "webapp",
    "status": "production",
    "featured": false,
    "badge": "Live Demo",
    "problemStatement": "Organizing spontaneous team games, icebreakers, or watch-party activities usually requires cumbersome account registrations, app installations, or static paper sheets. Existing digital bingo tools rarely provide real-time state synchronization or force users into rigid, pre-configured buzzword lists. This introduces high friction for distributed teams and casual social groups wanting an instant, customizable game.",
    "technicalSolution": "Bingo Multiplayer implements a zero-build single-file progressive web application backed by Firebase Realtime Database for sub-second state propagation. A distributed client-side state machine coordinates game phases (lobby, card preparation, active play) with persistent local session recovery. Procedural matrix evaluation dynamically computes winning lines across configurable grid sizes (3x3 to 5x5) without requiring dedicated backend compute.",
    "techStack": [
      "JavaScript (ES2022)",
      "HTML5",
      "CSS3",
      "Firebase Realtime Database",
      "Progressive Web App (PWA)",
      "Service Workers"
    ],
    "architectureHighlights": [
      "Single-File PWA Architecture with Zero-Build Overhead",
      "Sub-Second State Synchronization via Firebase Realtime Database",
      "Session-Resilient Local State Recovery & Sparse Array Normalization",
      "Algorithmic Procedural Win Detection across Dynamic Grid Sizes (3x3 - 5x5)"
    ],
    "links": {
      "demoUrl": "https://mello2110.github.io/bingo/",
      "githubUrl": "https://github.com/Mello2110/bingo"
    },
    "stats": {
      "version": "v1.0.0"
    },
    "categoryLabel": "Web App / PWA",
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://mello2110.github.io/bingo/",
      "description": "Interactive sandbox preview of Bingo — Realtime Multiplayer."
    }
  },
  {
    "id": "mellow-solutions-hub",
    "title": "Mellow Solutions Hub",
    "tagline": "Curated portfolio & product showcase for developer utilities, Chrome extensions, and web applications.",
    "category": "webapp",
    "categoryLabel": "Fullstack Web App",
    "status": "production",
    "statusLabel": "Live Platform",
    "featured": false,
    "badge": "Portfolio & Hub",
    "problemStatement": "Developer portfolios often suffer from fragmented repositories, buried live demos, and a lack of architectural depth required for technical evaluations.",
    "technicalSolution": "A performance-tuned Next.js 15 web platform featuring viewport-snapping stages, instant client-side catalog filtering, and structured markdown ingestion.",
    "techStack": [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Lucide Icons",
      "Zod"
    ],
    "architectureHighlights": [
      "3-stage viewport snapping engine with zero-jitter catalog pinning",
      "Bilingual dictionary architecture with instant EN/DE switching",
      "Strict Zod-validated data pipeline for project case studies and live sandbox embeds",
      "Dark Swiss-precision aesthetic with high-resolution 2D vector branding"
    ],
    "links": {
      "githubUrl": "https://github.com/Mello2110/mellow-solutions-hub",
      "demoUrl": "https://mellow-solutions-hub.vercel.app"
    },
    "sandboxPreview": {
      "enabled": true,
      "embedUrl": "https://mellow-solutions-hub.vercel.app",
      "description": "Interactive live preview of the Mellow Solutions Hub platform."
    },
    "stats": {
      "version": "v1.0.0",
      "releaseDate": "2026"
    }
  }
];
