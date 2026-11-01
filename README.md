# Mellow Solutions Hub 🚀

> Zentrales Produkt-Hub und interaktives Entwickler-Portfolio für Chrome Extensions, Web-Applikationen und HTML-Tools.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/Design-Google%20Antigravity%20%7C%20Logitech%20MX-00f0ff?style=for-the-badge)

---

## 🌟 Features & Highlights

- **Google Antigravity & Logitech Designsprache:**
  - Taktile, hardware-inspirierte Oberflächen (`border-white/10`, matte Dark-Canvas Panels `#08090d`).
  - Dezente Ambient Glows in Cyan (`#00f0ff`), Purple und Emerald.
  - Mikro-Interaktionen, fließende Übergänge und Status-LEDs.
- **Problem- & Architektur-Fokus (Case Studies):**
  - Jede Karte enthält ein strukturiertes Problemstellung-Feld.
  - Das interaktive **Slide-Over Detail-Modal** präsentiert Problem, Lösung, Architektur-Highlights und eingesetzte APIs.
- **Echtzeit-Suche & Filter-Matrix:**
  - Rubriken-Tabs (*Alle*, *Extensions*, *Web Apps*, *HTML Tools*, *Automatisierung*).
  - Dynamischer Tech-Stack Filter (z.B. nach *Manifest V3*, *IndexedDB*, *Next.js*, *Canvas*).
  - Globale **Command Palette (`Ctrl + K` / `Cmd + K`)** für Tastatur-Navigation.
- **In-Hub Live-Sandbox:**
  - Clientseitige HTML-Tools können direkt in einem isolierten Modal im Hub ausgeführt werden.
- **Wartung in unter 2 Minuten:**
  - Neue Produkte werden einfach als typisiertes Objekt in `src/data/projects.ts` angelegt.

---

## 🛠️ Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build testen
npm run build
```

Die Website ist anschließend unter `http://localhost:3000` erreichbar.

---

## 📖 Neue Produkte hinzufügen

Siehe den ausführlichen Leitfaden:
👉 [HOW_TO_ADD_PROJECTS.md](file:///c:/Coding/MellowSolutionsHub/HOW_TO_ADD_PROJECTS.md)
