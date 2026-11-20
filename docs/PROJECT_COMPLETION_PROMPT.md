# Mellow Solutions Hub — Projekt-Abschluss-Prompt (Standard-Vorlage)

> **Zweck:** Diesen Prompt am Ende jedes abgeschlossenen Projekts ausführen (ideal mit aktiviertem Browser-/DevTools-Zugriff), um das Repository aufzuräumen, Branding & Standard-Links zu prüfen, normierte Screenshots zu erzeugen und eine 100 % `sync_projects.py`-kompatible `README.md` zu generieren.

---

```markdown
Du bist ein erfahrener Principal Software Engineer, Open-Source-Maintainer und technischer Redakteur.

### 🌐 KONTEXT & ZIELSETZUNG
Dieses Projekt ist Teil des **Mellow Solutions Hub** (gebaut mit Next.js 15, TypeScript und Tailwind CSS). Der Hub präsentiert praxisnahe Software, Chrome-Erweiterungen, Webapps, Entwickler-Tools und Lösungen für Klienten für Bewerbungen im IT-Bereich sowie für potenzielle Auftraggeber.

Der Hub verfügt über eine **automatisierte Import-Pipeline (`scripts/sync_projects.py`)**: Sie liest die `README.md`-Dateien aller Repositories aus und parst das an oberster Stelle stehende **YAML-Frontmatter**, um daraus Produktkarten, Detailseiten (`/projects/[id]`), Filter, Suchindizes, Screenshot-Galerien und Sandbox-Vorschauen zu generieren.

Deine Aufgabe ist es, dieses Projekt am Abschluss einmal sauber aufzuräumen, Branding & Standard-Links zu prüfen, standardisierte Screenshots zu erzeugen (falls ausführbar/darstellbar) und eine `README.md` direkt im Projekt-Root zu erstellen, die sowohl auf GitHub repräsentativ wirkt als auch 100 % maschinenlesbar für `sync_projects.py` ist.

---

### SCHRITT 1: AUFRÄUMEN & SAUBERE ORDNERSTRUKTUR
Prüfe vor der Dokumentation die Repository-Hygiene:
1. **Temporäre & verwaiste Dateien entfernen:** Lösche offensichtliche Test-Artefakte, Debug-Logs, ungenutzte Scratch-Dateien oder doppelte Asset-Entwürfe (keine produktiven Quell- oder Konfigurationsdateien antasten).
2. **`.gitignore` prüfen:** Stelle sicher, dass `node_modules/`, `.next/`, `dist/`, `build/`, `.env*`, `*.log` und IDE-Caches sauber ignoriert werden.
3. **Asset- & Screenshot-Ordner normieren:**
   - Lege Screenshots innerhalb des Projekt-Repos einheitlich unter `docs/screenshots/` ab:
     - `docs/screenshots/<id>-desktop.png` (1440×900)
     - Optional: `docs/screenshots/<id>-mobile.png` (390×844) oder `docs/screenshots/<id>-popup.png` (für Chrome Extensions)
   - Falls du Zugriff auf das Hub-Repository (`MellowSolutionsHub`) hast, spiegele dieselben Dateien zusätzlich nach `public/screenshots/<id>/desktop.png` (und `mobile.png` / `popup.png`), damit der Hub sie direkt unter `/screenshots/<id>/...` ausliefern kann.

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
   - Sandbox-Regel: `sandbox.enabled: false`, `sandbox.type: "none"`.

---

### SCHRITT 5: AUTOMATISCHE SCREENSHOT-ERSTELLUNG (Browser / DevTools)
Erstelle – sofern eine lauffähige UI vorhanden ist (Live-URL, lokaler Dev-Server oder Extension-Popup) – automatisiert über Browser/DevTools die normierten Screenshots:
- **Desktop:** `1440×900` → `docs/screenshots/<id>-desktop.png` (bzw. `/screenshots/<id>/desktop.png` im Hub).
- **Mobile (bei Webapps/Tools):** `390×844` → `docs/screenshots/<id>-mobile.png` (bzw. `/screenshots/<id>/mobile.png` im Hub).
- **Extension-Popup / Options-UI:** Passende Fenstergröße → `docs/screenshots/<id>-popup.png`.
- Prüfe beim Erstellen kurz die Browser-Konsole auf 0 Fehler. Falls keine UI existiert (z. B. reines CLI-Skript), lasse `screenshots` als leere Liste bzw. weg.

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
- `screenshots`: Liste der Pfade im Hub-Format (`/screenshots/<id>/desktop.png`, `/screenshots/<id>/mobile.png`), sofern Screenshots erzeugt wurden.
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
  - "/screenshots/<id>/desktop.png"
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
