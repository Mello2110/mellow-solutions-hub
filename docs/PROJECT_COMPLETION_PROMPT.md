# Mellow Solutions Hub — Projekt-Abschluss-Prompt (Standard-Vorlage)

> **Zweck:** Diesen Prompt am Ende jedes abgeschlossenen Projekts ausführen (ideal mit Browser-/Playwright-/DevTools-Zugriff), um das Repository aufzuräumen, Branding & Standard-Links zu prüfen, gestochen scharfe und inhaltlich unterschiedliche Feature-Screenshots zu erzeugen und eine 100 % `sync_projects.py`-kompatible `README.md` zu generieren.

---

```markdown
Du bist ein erfahrener Principal Software Engineer, Open-Source-Maintainer und technischer Redakteur.

### 🌐 KONTEXT & ZIELSETZUNG
Dieses Projekt ist Teil des **Mellow Solutions Hub** (gebaut mit Next.js 15, TypeScript und Tailwind CSS). Der Hub präsentiert praxisnahe Software, Chrome-Erweiterungen, Webapps, Entwickler-Tools und Lösungen für Klienten für Bewerbungen im IT-Bereich sowie für potenzielle Auftraggeber.

Der Hub verfügt über eine **automatisierte Import-Pipeline (`scripts/sync_projects.py`)**: Sie liest die `README.md`-Dateien aller Repositories aus und parst das an oberster Stelle stehende **YAML-Frontmatter**, um daraus Produktkarten, Detailseiten (`/projects/[id]`), Filter, Suchindizes, Screenshot-Galerien und Sandbox-Vorschauen zu generieren.

Deine Aufgabe ist es, dieses Projekt am Abschluss einmal sauber aufzuräumen, Branding & Standard-Links zu prüfen, 2–3 aussagekräftige und hochauflösende Screenshots zu erzeugen (falls eine UI existiert) und eine `README.md` direkt im Projekt-Root zu erstellen, die sowohl auf GitHub repräsentativ wirkt als auch 100 % maschinenlesbar für `sync_projects.py` ist.

---

### SCHRITT 1: AUFRÄUMEN & SAUBERE ORDNERSTRUKTUR
Prüfe vor der Dokumentation die Repository-Hygiene:
1. **Temporäre & verwaiste Dateien entfernen:** Lösche offensichtliche Test-Artefakte, Debug-Logs, ungenutzte Scratch-Dateien, veraltete Screenshot-Entwürfe (`desktop.png`/`mobile.png`-Duplikate) oder doppelte Assets (keine produktiven Quell- oder Konfigurationsdateien antasten).
2. **`.gitignore` prüfen:** Stelle sicher, dass `node_modules/`, `.next/`, `dist/`, `build/`, `.env*`, `*.log` und IDE-Caches sauber ignoriert werden.
3. **Asset- & Screenshot-Ordner normieren (festes Namensmuster):**
   - Lege Screenshots innerhalb des Projekt-Repos einheitlich unter `docs/screenshots/` ab:
     - `docs/screenshots/<id>-01-overview.png`
     - `docs/screenshots/<id>-02-feature.png`
     - Optional: `docs/screenshots/<id>-03-detail.png`
   - Falls du Zugriff auf das Hub-Repository (`C:\Coding\MellowSolutionsHub`) hast, spiegele dieselben Dateien zusätzlich nach `public/screenshots/<id>/01-overview.png`, `02-feature.png` (und optional `03-detail.png`), damit der Hub sie direkt unter `/screenshots/<id>/...` ausliefern kann.

---

### SCHRITT 2: BRANDING- & STANDARD-LINKS-CHECK (MIT FALLBACK)
Prüfe, ob das Projekt (sofern es ein eigenes Produkt/Tool ist und kein reines Klientenprojekt mit Kunden-Branding) das **Mellow Solutions**-Branding und die Standard-Links sauber integriert hat:
1. **Standard-Links (im UI-Footer / About-Dialog sowie im README):**
   - **GitHub:** `https://github.com/Mello2110`
   - **Buy Me a Coffee:** `https://buymeacoffee.com/mellowsolutions`
2. **Logo & visuelles Branding (zum Projekt-Design passend einfügen):**
   - Prüfe zuerst, ob im Projekt bereits ein Mellow-Logo liegt oder ob die zentralen Assets unter `C:\Coding\MellowSolutionsHub\public\assets\` erreichbar sind (z. B. `mellow-mark.svg`, `mellow-mark-2d-white.png` für dunkle UIs, `mellow-mark-2d-dark.png` für helle UIs oder `MellowSolutionsLogoWeißOBG_tight.png`).
   - **Wenn ein passendes Logo-Asset verfügbar ist und eine UI existiert:** Integriere es dezent (z. B. im Footer, Info-/About-Modal oder Extension-Popup) – farblich, typografisch und von den Abständen her **exakt auf das Design des Projekts abgestimmt** (kein Fremdkörper).
   - **Fallback (falls kein Zugriff auf Logo-Assets besteht oder es ein reines CLI/Backend-Repo ist):** Ergänze in der UI bzw. im README einen sauberen, unaufdringlichen typografischen Hinweis (`Mellow Solutions` + GitHub- & Buy-Me-a-Coffee-Link) im bestehenden Stil der App.
   - **Klientenprojekte:** Bei Auftragsarbeiten für Dritte bleibt das Kunden-Branding führend; füge eigene Credits/Links nur ein, wenn es ausdrücklich vorgesehen ist.

---

### SCHRITT 3: AUTONOME PROJEKT-ANALYSE
Untersuche selbstständig die Codebasis:
1. **Konfiguration & Abhängigkeiten:** Prüfe `package.json`, `manifest.json`, `tsconfig.json`, `requirements.txt`, `pyproject.toml` oder äquivalente Dateien auf Name, Version, Skripte und Dependencies.
2. **Git-Konfiguration:** Prüfe `.git/config` oder Git-Befehle, um die offizielle GitHub-Repository-URL (`githubUrl`) zu ermitteln.
3. **Quellcode (`src/`, `app/`, etc.):** Analysiere die Hauptdateien, um Zweck, Architektur, State-Management und APIs präzise zu erfassen.

---

### SCHRITT 4: ENTSCHEIDUNGSBAUM FÜR DIE KATEGORISIERUNG
Ordne das Projekt exakt EINER dieser 5 Kategorien zu:
1. `category: "extension"`
   - Kriterium: Enthält `manifest.json`, nutzt `chrome.*` / `browser.*` APIs oder ist als Browser-Add-on konzipiert.
   - Sandbox-Regel: IMMER `sandbox.enabled: false`, `sandbox.type: "none"`.
2. `category: "webapp"`
   - Kriterium: Vollständige Webanwendung mit Routing, State Management, mehreren Views oder Backend/API-Anbindung.
   - Sandbox-Regel: `sandbox.enabled: true`, wenn eine öffentliche Live-Web-URL vorliegt, die Framing erlaubt, sonst `false`.
3. `category: "tool"`
   - Kriterium: Eigenständiges Single-Purpose-Utility (z. B. SVG Cleaner, JSON Diff, Canvas Generator).
   - Sandbox-Regel: `sandbox.enabled: true`, `sandbox.type: "remote"` (oder `"local"`).
4. `category: "automation"`
   - Kriterium: CLI-Tools, Node/Python-Skripte, Scraper, Cron-Jobs, GitHub Actions.
   - Sandbox-Regel: IMMER `sandbox.enabled: false`, `sandbox.type: "none"`.
5. `category: "other"`
   - Kriterium: Libraries, Daten-Pipelines, UI-Kits, Templates oder experimentelle Prototypen.
   - Sandbox-Regel: IMMER `sandbox.enabled: false`, `sandbox.type: "none"`.

---

### SCHRITT 5: HOCHAUFLÖSENDE FEATURE-SCREENSHOTS (QUALITÄTS-STANDARD)
Erstelle – sofern eine UI vorhanden ist – **2 bis 3 inhaltlich verschiedene, aussagekräftige Screenshots** statt zweimal denselben Startbildschirm in Desktop & Mobile abzulichten!

**Verbindliche Qualitätsregeln:**
1. **Keine leeren Startscreens & keine Desktop/Mobile-Doppelungen:**
   - **Webapps & HTML-Tools:**
     - `01-overview.png`: Hauptansicht **mit aktivem, sinnvollem Beispielzustand** (z. B. echte Beispieldaten, ausgewählte Ansicht, ausgeführte Berechnung).
     - `02-feature.png`: Eine **zweite zentrale Funktion oder Unteransicht** (z. B. anderes Tab, Datenstandard, Analyse-/Ergebnis-Ansicht, Modal oder zweiter Modus).
     - Optional `03-detail.png`: Weitere markante Ansicht (z. B. Export/Settings oder ein eigenständiges Mobile-Layout, sofern sich die UX dort wesentlich unterscheidet).
   - **Chrome Extensions:**
     - `01-overview.png`: Geöffnetes **Extension-Popup** mit realistischen Beispieldaten (in natürlicher Popup-Größe, nicht künstlich beschnitten).
     - `02-feature.png`: **In-Page-Wirkung / Overlay / Options-Seite** im Browser (`1440×900`).
2. **Scharfe Auflösung & sauberes Seitenverhältnis (KEIN `fullPage: true`, KEIN 1×-Low-Res):**
   - Nutze für alle Desktop-Shots zwingend **16:10-Landscape (`1440×900` oder `1280×800`) mit `deviceScaleFactor: 2` (Retina)** → ergibt gestochen scharfe `2880×1800` bzw. `2560×1600` PNGs.
   - Nutze **IMMER `fullPage: false`** (sauberer Viewport-Ausschnitt ohne überlange Scroll-Streifen).
   - Bei Extension-Popups ebenfalls `deviceScaleFactor: 2` verwenden (z. B. `420×600` Popup → `840×1200` PNG).
   - Achte auf eine saubere, ruhige Darstellung ohne DevTools-Overlays, abgeschnittene Modals oder Browser-Fehlermeldungen (Konsole = 0 Fehler).
3. **Pflicht-Check vor Abschluss:** Prüfe die erzeugten Bilddateien (Pixelmaße & Sichtprüfung): Desktop-Shots müssen mindestens `1440px` Breite haben (bzw. `2560px+` bei 2× DPR) und unterschiedliche App-Zustände zeigen. Falls keine UI existiert (reines CLI-Skript), lasse `screenshots` weg.

---

### SCHRITT 6: REGELN FÜR DAS YAML-FRONTMATTER (`sync_projects.py`-kompatibel)
WICHTIG: Der Parser in `scripts/sync_projects.py` arbeitet zeilenbasiert! Halte diese Syntax-Regeln strikt ein:
- **Keine mehrzeiligen YAML-Strings (`|` oder `>`):** Alle Textfelder (`tagline`, `problemStatement`, `technicalSolution`) müssen jeweils in **einer einzigen Zeile** in doppelten Anführungszeichen stehen.
- `id`: Strikt lowercase `kebab-case` (z. B. `quick-json-diff`, keine Umlaute, keine Großbuchstaben).
- `tagline`: Genau 1 prägnanter englischer Satz (max. 110 Zeichen).
- `problemStatement`: 2–3 sachliche Sätze auf Englisch (kein Marketing-Hype).
- `technicalSolution`: 2–3 sachliche Sätze auf Englisch zur technischen Architektur.
- `techStack`: Liste aus kanonischen Namen (`- "TypeScript"`).
- `architectureHighlights`: Genau 3 bis 4 präzise technische Stichpunkte.
- `screenshots`: Liste der erzeugten Hub-Pfade (`/screenshots/<id>/01-overview.png`, `/screenshots/<id>/02-feature.png`, ...).
- `status`: `"production"` | `"beta"` | `"wip"` | `"archived"`.
- `featured`: IMMER `false` (wird nur zentral im Hub für das Flaggschiff gesetzt).
- `sandbox`: `enabled` als echtes Boolean `true` oder `false` (niemals als String `"true"`).
- **Randfälle:** Keine `package.json` → Dateitypen/Shebangs analysieren; kein Git-Remote → `githubUrl: ""`; keine Demo → `demoUrl: ""` + `sandbox.enabled: false`; keine Version → `version: "v1.0.0"`.

---

### SCHRITT 7: ERSTELLUNG DER `README.md`
Erstelle oder überschreibe `README.md` im Projekt-Root exakt nach folgendem Schema:

```yaml
---
id: "<kebab-case-id>"
title: "<Offizieller Projekttitel>"
tagline: "<1 prägnanter englischer Satz>"
category: "<extension | webapp | tool | automation | other>"
status: "production"
featured: false
badge: "<z. B. Chrome Web Store, Active, Open Source>"
problemStatement: "<2-3 sachliche Sätze auf Englisch in einer Zeile>"
technicalSolution: "<2-3 sachliche Sätze auf Englisch in einer Zeile>"
techStack:
  - "<Tech 1>"
  - "<Tech 2>"
architectureHighlights:
  - "<Highlight 1>"
  - "<Highlight 2>"
  - "<Highlight 3>"
screenshots:
  - "/screenshots/<id>/01-overview.png"
  - "/screenshots/<id>/02-feature.png"
links:
  chromeWebStore: "<URL oder leer lassen>"
  demoUrl: "<URL oder leer lassen>"
  githubUrl: "<Gefundene GitHub-Repo-URL oder leer lassen>"
sandbox:
  enabled: <true | false>
  type: "<remote | local | none>"
  embedUrl: "<URL oder leer lassen>"
  notes: "<Kurze Notiz oder leer lassen>"
stats:
  version: "<Ausgelesene Version, z. B. v1.0.0>"
---

# <Offizieller Projekttitel>

[![Status](https://img.shields.io/badge/Status-Active-emerald?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](#)

> <Tagline>

<!-- Zeige nur die Links an, die tatsächlich existieren -->
<p align="left">
  <a href="<demoUrl>"><b>Live Demo / Web App</b></a> &nbsp;|&nbsp;
  <a href="<chromeWebStore>"><b>Chrome Web Store</b></a> &nbsp;|&nbsp;
  <a href="https://github.com/Mello2110"><b>Mellow Solutions on GitHub</b></a> &nbsp;|&nbsp;
  <a href="https://buymeacoffee.com/mellowsolutions"><b>Buy Me a Coffee</b></a>
</p>

---

## Problem & Motivation
<Ausführlichere Erklärung des Problems>

## Technical Solution
<Wie das Tool das Problem technisch löst>

## Architecture & Tech Stack
- **Languages & Frameworks:** <Details>
- **Core Architecture:** <Details zu State, Storage, DOM, APIs>

## Installation & Usage
<Schritt-für-Schritt-Anleitung für Endnutzer bzw. Entwickler>

## License & Disclaimer
Part of the **Mellow Solutions** portfolio. Provided under the MIT License as-is for non-commercial and personal utility.
```

*(Optional – nur falls das Projekt ein Klientenauftrag für `/solutions` ist: Gib mir am Ende zusätzlich einen fertigen `ClientSolution`-Eintrag für `src/data/clientSolutions.ts` im Hub aus mit `clientGoal`, `challenges[]`, `solutionApproach` und `outcome`.)*
```
