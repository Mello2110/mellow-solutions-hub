---
id: "mellow-solutions-hub"
title: "Mellow Solutions Hub"
tagline: "Curated portfolio & product showcase for developer utilities, Chrome extensions, and web applications."
category: "webapp"
status: "production"
featured: false
badge: "Portfolio & Hub"
problemStatement: "Developer portfolios often suffer from fragmented repositories, buried live demos, and a lack of architectural depth required for technical evaluations."
technicalSolution: "A performance-tuned Next.js 15 web platform featuring viewport-snapping stages, instant client-side catalog filtering, and structured markdown ingestion."
techStack:
  - "Next.js 15 (App Router)"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS"
  - "Lucide Icons"
  - "Zod"
architectureHighlights:
  - "3-stage viewport snapping engine with zero-jitter catalog pinning"
  - "Bilingual dictionary architecture with instant EN/DE switching"
  - "Strict Zod-validated data pipeline for project case studies and live sandbox embeds"
  - "Dark Swiss-precision aesthetic with high-resolution 2D vector branding"
links:
  chromeWebStore: ""
  demoUrl: "http://localhost:3000"
  githubUrl: "https://github.com/Mello2110/mellow-solutions-hub"
sandbox:
  enabled: true
  type: "remote"
  embedUrl: "http://localhost:3000"
  notes: "Live interactive showcase and product directory"
stats:
  version: "v1.0.0"
---

# Mellow Solutions Hub

[![Status](https://img.shields.io/badge/Status-Active-emerald?style=flat-square)](#)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](#)

> Curated portfolio & product showcase for developer utilities, Chrome extensions, and web applications.

<!-- QUICK ACCESS / CALL TO ACTION -->
<p align="left">
  <a href="http://localhost:3000"><b>🚀 Live Platform / Demo</b></a> &nbsp;|&nbsp;
  <a href="https://github.com/Mello2110/mellow-solutions-hub"><b>💻 GitHub Repository</b></a> &nbsp;|&nbsp;
  <a href="https://github.com/Mello2110"><b>🌐 Author Profile</b></a>
</p>

---

## 📌 Problem & Motivation

Engineers and technical recruiters frequently face portfolios that are either generic template pages without technical rigor or disconnected links across GitHub where code quality and live execution are difficult to assess. 

**Mellow Solutions Hub** was built to solve this by providing a unified, high-performance stage that brings together Chrome extensions, fullstack webapps, client-side HTML/canvas tools, and automations into an interactive, cohesive showcase with transparent problem/solution breakdowns and live previews.

## ⚡ The Solution

A bespoke, dark-canvas platform inspired by Swiss typography and precision industrial aesthetics (Google Antigravity meets Logitech MX):

1. **Segment 01 — Hero Entrance:** Clean 2D typographic lockup with single-line philosophy, bilingual tagline, and unified viewport navigation.
2. **Segment 02 — Spotlight Stage:** Dedicated stage for featured flagship projects with architecture metrics, problem/solution cards, and store links.
3. **Segment 03 — Product Directory & Toolbox:** Instant fuzzy search (`Ctrl+K`), category tabs, technology filter chips, and interactive case study slide-over drawers with sandbox iframes.

## 🚀 Key Features

- **Viewport-Snapping Architecture:** Smooth, predictable snapping between the 3 core segments with zero layout jitter.
- **Instant Client-Side Filtering:** Filter by categories (`extensions`, `webapps`, `tools`, `automation`, `other`) or click individual tech-stack chips with instant position pinning.
- **Interactive Case Study Modals:** In-depth case study drawers detailing problem statements, technical solutions, architecture highlights, and embedded sandbox previews.
- **Command Palette (`Ctrl+K`):** Global spotlight search for rapid keyboard navigation across all products and tech tags.
- **Bilingual Interface:** Real-time, instant toggling between English (default) and German across all UI elements and disclaimers.
- **Portfolio & Non-Commercial Notice:** Transparent disclaimer clarifying the hobby/open-source context and as-is utility licensing.

## 🛠️ Architecture & Tech Stack

```
mellow-solutions-hub/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Inter font & dark theme canvas
│   │   ├── page.tsx           # Main 3-segment orchestrator & filter state
│   │   └── globals.css        # Custom scrollbar & typography utilities
│   ├── components/
│   │   ├── Header.tsx         # Sticky navigation, logo, [EN|DE] toggle, Ctrl+K
│   │   ├── Hero.tsx           # Segment 01 entrance with 2D typographic lockup
│   │   ├── SpotlightShowcase  # Segment 02 featured flagship stage
│   │   ├── CategoryFilter.tsx # Category tabs and tech chip filters
│   │   ├── ProjectCard.tsx    # Equal-height catalog cards
│   │   ├── ProjectModal.tsx   # Case study slide-over with sandbox iframe
│   │   ├── SponsorModal.tsx   # Buy Me a Coffee support popup
│   │   ├── CommandPalette.tsx # Global Ctrl+K spotlight search
│   │   └── Footer.tsx         # Disclaimer, credits, and social links
│   ├── data/
│   │   ├── projects.ts        # Structured projects database & metadata
│   │   └── i18n.ts            # Complete EN/DE bilingual dictionary
│   └── types/
│       └── project.ts         # Zod schemas & TypeScript type definitions
└── public/
    └── assets/                # High-resolution 2D logos, marks & icons
```

- **Framework:** Next.js 15 (App Router) with React 19
- **Type Safety:** TypeScript & Zod runtime schemas
- **Styling:** Tailwind CSS with custom glassmorphism and subtle ambient glows
- **Icons:** Lucide React & custom brand SVGs

## 📦 Installation & Local Development

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/Mello2110/mellow-solutions-hub.git

# 2. Enter directory
cd mellow-solutions-hub

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

## 📄 License & Disclaimer

Part of the **Mellow Solutions** portfolio. Provided under the [MIT License](LICENSE) as-is for non-commercial and personal utility.
