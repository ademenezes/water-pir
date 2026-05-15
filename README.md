# Water PIR Tool

Diagrammatic explorer of a country's water-sector laws, institutions and regulators against the **WSIP × PIR framework**, with every claim linked back to its FAOLEX / AQUALEX source. Designed for government officials and sector reformers preparing or assessing water-related projects.

**Pilot country:** Brazil 🇧🇷 (5 sub-sectors mapped, ~20 legal instruments, ~30 institutions).

## Frameworks

- **WSIP — Water Strategy Implementation Plan** (World Bank Group, Dec 2025, Figure 4). Three pillars (Water for People / Food / Planet) × seven scalable solutions × three enablers.
- **PIR — Policies, Institutions, Regulation** (World Bank Group, WSS PIR Synthesis Aug 2022, Figure 1.2). Six analytical dimensions: **Policy, Institutions, Intergovernmental Context, Financing, Regulation, Resilience.**

## Tabs

| Tab | What it does |
|---|---|
| **Home** | Hero, autocomplete search, featured "did you know?", 3-step how-to-use, clickable world map of the 27 WSIP Water Compact countries, schematics of the WSIP and PIR frameworks, lessons-from-practice grid. |
| **WSIP Matrix** | 7 WSIP solutions × 6 PIR dimensions matrix for a selected country. Cells are colour-coded by coverage status and self-labelled (Strong / Partial / Gap / Not mapped). Supports `?country=BRA&compare=KEN` for side-by-side country comparison. |
| **PIR Comparator** | Dual-mode: (A) sub-sector → countries × 6 PIR dimensions, or (B) PIR dimension → countries × sub-sectors. |
| **Countries** | Card grid with status badge (Live / Pipeline / Planned), filter chips, region filter, and direct deep-link buttons to the country dashboard or its pre-filtered WSIP Matrix. |
| **Project Wizard** | Pick a project type (e.g., "Urban WSS PPP", "Wastewater treatment & reuse PPP", "Desalination", "Rural WSS", "Farmer-led irrigation", "Centralised irrigation", "Flood & drought risk management", "River basin restoration") → tool returns the slice of the framework most relevant to that project, including critical PIR dimensions and reform-readiness questions. |
| **Methodology** | Frameworks, legal data sources, coverage-status definitions, citation rules, phasing. |

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
```

## Data model

One TypeScript module per country in `data/<country>.ts`, typed against `src/types.ts`.

```
Country
  └─ Subsector
      └─ SubsectorPirCell × 6 (one per PIR dimension)
          ├─ legal_instruments[]   ← title, year, type, faolex_id, faolex_url, articles
          ├─ responsible_institutions[]   ← name, role, level
          ├─ mandate_text
          ├─ coverage_status (green / yellow / red / gray)
          ├─ de_facto_note (de jure–de facto gap)
          └─ last_verified_date
```

Sub-sector taxonomy (`src/framework.ts → SUBSECTOR_LABELS`) bridges WSIP solutions to the traditional FAOLEX/AQUALEX vocabulary (WSS urban / rural, wastewater & reuse, decentralised & centralised irrigation, WRM basin, groundwater, flood & drought).

Country-level metadata (status, region, blurb, ISO numeric for the map) lives in `data/countries-meta.ts`. Lessons-from-practice cases in `data/lessons.ts`, project archetypes in `data/project-types.ts`, rotating insights in `data/insights.ts`.

## Adding a country

1. Copy `data/brazil.ts` to `data/<new-country>.ts`.
2. Replace the seed content; keep the schema.
3. Register the new module in `data/index.ts`.
4. Flip the country's `status` to `"live"` in `data/countries-meta.ts`.
5. Verify every FAOLEX URL resolves; set `last_verified_date`.
6. Type-check (`npx tsc --noEmit`).

The Map, the Countries page, the PIR Comparator, and the Project Wizard pick up the new country automatically.

## Source rules

- Prefer a FAOLEX or AQUALEX record; otherwise fall back to a national gazette URL clearly tagged as "National source".
- Every legal instrument must declare a year, type, and at least one URL.
- Cells without a verified source must show coverage `gray` (not assessed) — never invent.
- Use the `de_facto_note` field whenever the law and practice diverge; cite the source for the divergence.
- Re-verify every URL at least annually (`last_verified_date` field).

## Coverage status

| Status | Meaning |
|---|---|
| 🟢 **Strong** | Law + active regulator + practice are broadly consistent. |
| 🟡 **Partial** | Law or policy exists but regulation / enforcement / implementation is incomplete or uneven. |
| 🔴 **Gap** | No specific law or regulator covers this intersection. |
| ⚪ **Not mapped** | Cell has not been assessed for this country (data pending). |

## Phasing

1. **Phase 1 (current):** Brazil end-to-end. Six tabs live, including project wizard and comparator. Brazil pilot has 5 sub-sectors populated.
2. **Phase 2:** Fill remaining sub-sectors for Brazil (irrigation, river/aquifer protection, rural depth).
3. **Phase 3:** Add 4 comparator countries — Colombia, Kenya, Peru, Indonesia (referenced in BOSIB/WSIP as reform exemplars). Country comparison mode becomes meaningful.
4. **Phase 4:** AI-assisted ingestion pipeline against FAOLEX / AQUALEX bulk-download CSV; curator review workflow.

## Stack

React 18 + TypeScript + Vite + Tailwind + React Router + react-simple-maps (+ world-atlas TopoJSON). No backend, no database — JSON-like TypeScript modules in `data/`.

## Project layout

```
.
├── data/                         # source-of-truth country and framework metadata
│   ├── brazil.ts                 # full PIR snapshot for the pilot
│   ├── countries-meta.ts         # 27 WSIP Water Compact countries (+ planned add-ons)
│   ├── insights.ts               # "did you know?" rotation pool
│   ├── lessons.ts                # BOSIB / WSIP curated reform cases
│   ├── project-types.ts          # 8 project archetypes for the wizard
│   └── index.ts                  # country registry
├── documents/                    # the two World Bank source PDFs
├── public/
│   └── countries-110m.json       # world atlas TopoJSON used by the map
├── src/
│   ├── components/               # CoverageDot, MandateMap, SearchBox, WorldMap,
│   │                             # WsipSchematic, PirSchematic, FeaturedInsight,
│   │                             # LessonsGrid, SourceCitation, Layout
│   ├── views/                    # HomePage, CountryDashboard, WsipMatrixTab,
│   │                             # MatrixView (country-scoped), PirComparator,
│   │                             # CountriesPage, ProjectWizard, SubsectorDeepDive,
│   │                             # AboutPage
│   ├── framework.ts              # WSIP_SOLUTIONS, PIR_DIMENSIONS, taxonomy maps
│   ├── types.ts                  # data-model types
│   ├── App.tsx                   # routing
│   ├── main.tsx                  # entry
│   └── index.css                 # Tailwind + component classes
├── docs/
│   └── session-log.md            # chronological build log
├── CLAUDE.md                     # conventions and contribution guide
└── README.md                     # this file
```
