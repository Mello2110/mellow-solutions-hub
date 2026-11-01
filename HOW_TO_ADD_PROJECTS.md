# Leitfaden: So fügst du neue Extensions, Apps & Tools hinzu

Das **Mellow Solutions Hub** ist so konzipiert, dass du neue Produkte in **unter 2 Minuten** hinzufügen kannst, ohne jemals UI- oder React-Code anfassen zu müssen.

Alle Daten liegen zentral und typisiert in:
📁 `src/data/projects.ts`

---

## 1. Eine neue Chrome Extension hinzufügen

Öffne `src/data/projects.ts` und füge im Array `INITIAL_PROJECTS` einfach ein neues Objekt ein:

```typescript
{
  id: "meine-neue-extension",
  title: "Meine Neue Chrome Extension",
  tagline: "Kurze, prägnante Einzeiler-Beschreibung für die Karte.",
  category: "extension",                 // "extension" | "webapp" | "tool" | "automation"
  categoryLabel: "Chrome Extension",
  status: "production",                  // "production" | "beta" | "wip" | "archived"
  statusLabel: "Im Chrome Web Store",
  featured: true,                        // Optional: Hebt die Karte hervor
  badge: "Manifest V3",                  // Kleines Akzent-Badge oben rechts

  // 1. Problemstellung (Für Recruiter & Nutzer)
  problemStatement:
    "Welcher Pain Point existierte? Warum war bestehende Software unzureichend?",

  // 2. Technische Umsetzung (Beweis für Entwickler-Kompetenz)
  technicalSolution:
    "Wie hast du das Problem technisch gelöst? (z.B. Service Worker, Offscreen Documents, IndexedDB)",

  // 3. Wichtige Architektur-Highlights
  architectureHighlights: [
    "Manifest V3 Service Worker mit Alarm-gesteuerter Hintergrundsynchronisation",
    "Tailwind CSS Popup-UI mit optimierter Bundle-Größe unter 100KB",
    "Lokale Speicherung via chrome.storage.local ohne externe Server",
  ],

  // 4. Verwendete Technologien
  techStack: ["TypeScript", "Chrome Extensions API", "Manifest V3", "Tailwind CSS"],

  // 5. Links
  links: {
    chromeWebStore: "https://chromewebstore.google.com/detail/deine-id",
    githubUrl: "https://github.com/dein-username/dein-repo",
    demoUrl: "https://dein-username.github.io/demo",
  },

  // 6. Optionale Metriken & Bewertungen
  stats: {
    users: "500+ aktive Nutzer",
    rating: "5.0 ★",
    version: "v1.0.0",
    releaseDate: "2025",
  },
}
```

---

## 2. Ein HTML-Tool / Web-Tool mit Live-Sandbox im Hub einbinden

Für clientseitige HTML-Tools oder Mini-Apps kannst du zusätzlich das Feld `sandboxPreview` aktivieren. Dadurch können Besucher und Bewerter das Tool direkt im Hub ausprobieren:

```typescript
{
  id: "mein-html-canvas-tool",
  title: "Canvas Pixel Grid Generator",
  tagline: "Clientseitiger Grid-Maker mit SVG-Export.",
  category: "tool",
  categoryLabel: "HTML Canvas Tool",
  status: "production",
  badge: "In-Browser Sandbox",
  problemStatement: "Schnelles Erstellen von Pixelrastern ohne schwere Grafikprogramme.",
  technicalSolution: "Reine HTML5 Canvas API mit requestAnimationFrame für 60fps.",
  architectureHighlights: [
    "Zero-Dependency Architektur",
    "Lokaler Export als SVG und PNG",
  ],
  techStack: ["JavaScript", "HTML5 Canvas", "CSS3"],
  links: {
    demoUrl: "https://dein-username.github.io/pixel-grid",
    githubUrl: "https://github.com/dein-username/pixel-grid",
  },
  sandboxPreview: {
    enabled: true,
    embedUrl: "https://dein-username.github.io/pixel-grid",
    description: "Kann direkt im Sandbox-Modal des Hubs getestet werden.",
  },
}
```

---

## 3. Eine neue Kategorie / Rubrik anlegen

Möchtest du neben *Extensions*, *Web Apps*, *HTML Tools* und *Automatisierung* eine weitere Rubrik (z.B. *Mobile Apps* oder *APIs*) hinzufügen:

1. In `src/types/project.ts`:
   Füge den neuen Wert in `ProjectCategorySchema` hinzu:
   ```typescript
   export const ProjectCategorySchema = z.enum([
     "extension",
     "webapp",
     "tool",
     "automation",
     "mobile", // <-- Neu!
   ]);
   ```
2. In `src/data/projects.ts`:
   Füge die Kategorie im `CATEGORIES`-Array hinzu:
   ```typescript
   {
     id: "mobile",
     label: "Mobile Apps",
     description: "Native und plattformübergreifende iOS & Android Apps.",
     iconName: "Smartphone",
   }
   ```
Fertig! Die Tabs, Filter, Zähler und Badges passen sich automatisch an.
