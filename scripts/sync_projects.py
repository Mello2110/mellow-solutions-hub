import os
import re
import json

def parse_frontmatter(text):
    parts = text.split('---')
    if len(parts) < 3:
        return None
    raw = parts[1]
    data = {}
    current_key = None
    current_sub = None
    current_list = None
    
    for line in raw.split('\n'):
        line_clean = line.rstrip()
        if not line_clean or line_clean.strip().startswith('#'):
            continue
            
        # List item: '  - "item"'
        if line_clean.strip().startswith('- '):
            val = line_clean.strip()[2:].strip().strip('"').strip("'")
            if current_list is not None:
                current_list.append(val)
            continue
            
        # Sub-key: '  key: val'
        if line_clean.startswith('  ') and ':' in line_clean:
            parts_sub = line_clean.strip().split(':', 1)
            k = parts_sub[0].strip()
            v = parts_sub[1].strip().strip('"').strip("'")
            if v == 'true': v = True
            elif v == 'false': v = False
            elif v == '': v = None
            if current_sub is not None:
                current_sub[k] = v
            continue
            
        # Top-level key
        if ':' in line_clean:
            parts_top = line_clean.split(':', 1)
            k = parts_top[0].strip()
            v = parts_top[1].strip()
            if v == '':
                if k in ['techStack', 'architectureHighlights', 'screenshots']:
                    current_list = []
                    data[k] = current_list
                    current_key = k
                    current_sub = None
                else:
                    current_sub = {}
                    data[k] = current_sub
                    current_key = k
                    current_list = None
            else:
                v_clean = v.strip('"').strip("'")
                if v_clean == 'true': v_clean = True
                elif v_clean == 'false': v_clean = False
                data[k] = v_clean
                current_key = k
                current_sub = None
                current_list = None
                
    return data

folder_order = [
    'WebAppStammtisch',
    'Listz',
    'LazyShorts',
    'ColorCheck',
    'TrackDatBaby',
    'SpieletagSystem',
    'Bingo',
]

cat_labels = {
    'extension': 'Chrome Extension',
    'webapp': 'Web App / PWA',
    'tool': 'HTML Tool',
    'automation': 'Automatisierung',
    'other': 'Sonstiges',
}

featured_ids = {'kiniffler-stammtisch-app', 'listz', 'lazyshorts'}

projects = []

for folder in folder_order:
    path = os.path.join(r'C:\Coding', folder, 'README.md')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            d = parse_frontmatter(f.read())
            if d:
                # Clean up title
                if 'title' in d:
                    d['title'] = d['title'].replace('\ufffd', '—')
                d['categoryLabel'] = cat_labels.get(d.get('category'), 'Web App')
                d['featured'] = d.get('id') in featured_ids
                
                # Format links
                raw_links = d.get('links', {})
                clean_links = {}
                if raw_links.get('chromeWebStore'): clean_links['chromeWebStore'] = raw_links['chromeWebStore']
                if raw_links.get('demoUrl'): clean_links['demoUrl'] = raw_links['demoUrl']
                if raw_links.get('githubUrl'): clean_links['githubUrl'] = raw_links['githubUrl']
                if raw_links.get('docsUrl'): clean_links['docsUrl'] = raw_links['docsUrl']
                d['links'] = clean_links
                
                # Sandbox
                raw_sandbox = d.get('sandbox', {})
                if raw_sandbox.get('enabled') and raw_sandbox.get('embedUrl'):
                    d['sandboxPreview'] = {
                        'enabled': True,
                        'embedUrl': raw_sandbox['embedUrl'],
                        'description': raw_sandbox.get('notes') or f"Interactive sandbox preview of {d['title']}."
                    }
                else:
                    d['sandboxPreview'] = {
                        'enabled': False
                    }
                if 'sandbox' in d:
                    del d['sandbox']
                    
                projects.append(d)

# Add Mellow Solutions Hub itself as the 8th project
hub_project = {
    "id": "mellow-solutions-hub",
    "title": "Mellow Solutions Hub",
    "tagline": "Curated portfolio & product showcase for developer utilities, Chrome extensions, and web applications.",
    "category": "webapp",
    "categoryLabel": "Fullstack Web App",
    "status": "production",
    "statusLabel": "Live Platform",
    "featured": False,
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
        "enabled": True,
        "embedUrl": "https://mellow-solutions-hub.vercel.app",
        "description": "Interactive live preview of the Mellow Solutions Hub platform."
    },
    "stats": {
        "version": "v1.0.0",
        "releaseDate": "2026"
    }
}
projects.append(hub_project)

# Generate src/data/projects.ts
ts_content = '''import { Project, CategoryMeta } from "@/types/project";

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

export const INITIAL_PROJECTS: Project[] = ''' + json.dumps(projects, indent=2, ensure_ascii=False) + ';\n'

with open(r'C:\Coding\MellowSolutionsHub\src\data\projects.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/projects.ts with {len(projects)} REAL projects! Zero mock data.")
for p in projects:
    print(f"[{'FEATURED' if p.get('featured') else 'CATALOG '}] {p['id']}: {p['title']} ({p['categoryLabel']})")
