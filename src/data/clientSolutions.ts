import { ClientSolution } from "@/types/project";
import { Language } from "@/data/i18n";

export const CLIENT_SOLUTIONS: Record<Language, ClientSolution[]> = {
  en: [
    {
      id: "b2b-workflow-portal-template",
      title: "Digital Order & Scheduling Portal (Showcase Template)",
      clientContext: "Service Business • SMB (Anonymized Structure Template)",
      role: "Architecture, Fullstack Development & Deployment",
      timeframe: "2025 • Showcase Template",
      featuredInHub: false,
      clientGoal:
        "Replace fragmented email and spreadsheet coordination with a central web portal where inquiries, status updates, and documents are captured and tracked in one place.",
      challenges: [
        "Inconsistent legacy spreadsheets with no unified validation rules.",
        "Simple usability required for non-technical staff during daily operations.",
        "Clean separation between client-facing intake and internal processing views at low hosting cost.",
      ],
      solutionApproach:
        "Built a focused Next.js web application with strict schema validation (Zod), a clear status pipeline, and role-based views without bloated ERP overhead.",
      outcome:
        "Traceable end-to-end workflow from initial inquiry to completion — ready as a template for real client case studies.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "PostgreSQL"],
      sandboxPreview: {
        enabled: false,
        description:
          "Showcase template — real client commissions will link their live sandbox or screenshots here.",
      },
      screenshots: [],
    },
  ],
  de: [
    {
      id: "b2b-workflow-portal-template",
      title: "Digitales Auftrags- & Terminportal (Beispiel-Vorlage)",
      clientContext: "Dienstleistungsbetrieb • KMU (Anonymisierte Strukturvorlage)",
      role: "Konzeption, Fullstack-Entwicklung & Deployment",
      timeframe: "2025 • Showcase-Vorlage",
      featuredInHub: false,
      clientGoal:
        "Ablösung manueller E-Mail- und Excel-Abstimmungen durch ein zentrales Web-Portal, über das Anfragen, Status-Updates und Dokumente strukturiert erfasst und nachverfolgt werden können.",
      challenges: [
        "Heterogene Datenstände aus gewachsenen Excel-Listen ohne einheitliche Validierung.",
        "Einfache Bedienbarkeit für nicht-technische Sachbearbeiter im laufenden Tagesgeschäft.",
        "Saubere Trennung von Kunden- und interner Bearbeitungsansicht bei geringen Betriebskosten.",
      ],
      solutionApproach:
        "Entwicklung einer schlanken Next.js-Webanwendung mit strikt typisierter Formularvalidierung (Zod), klarer Status-Pipeline und rollenbasierter Ansicht ohne überladene ERP-Komplexität.",
      outcome:
        "Strukturierter, nachvollziehbarer Ablauf von der Anfrage bis zum Abschluss — bereit als Vorlage für reale Klienten-Case-Studies.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "PostgreSQL"],
      sandboxPreview: {
        enabled: false,
        description:
          "Platzhalter-Vorlage — reale Klientenprojekte werden hier mit Live-Sandbox oder Screenshots verknüpft.",
      },
      screenshots: [],
    },
  ],
};
