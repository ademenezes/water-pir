# Water PIR

Diagrammatic explorer of a country's water-sector laws, institutions and regulators against the **WSIP × PIR framework**, with every claim linked back to its primary source (FAOLEX where indexed, national gazettes otherwise). Designed for government officials and sector reformers preparing or assessing water-related projects.

**Live:** https://ademenezes.github.io/water-pir/ (password-protected preview).

**Live countries:** Brazil (pilot, 8 sub-sectors, 30 mandate records, 6 key insights) and Georgia (8 sub-sectors, 13 mandate records, 9 key insights, plus sector-target and monitoring & evidence-base layers). Georgia is a live case study **outside** the 27-country WSIP Water Compact cohort (`compact: false`); the "27" framing counts Compact members only.

## Frameworks

- **WSIP, Water Strategy Implementation Plan** (World Bank Group, Dec 2025, Figure 4). Three pillars (Water for People / Food / Planet), seven scalable solutions, three enablers.
- **PIR, Policies, Institutions, Regulation** (World Bank Group, WSS PIR Synthesis Aug 2022, Figure 1.2). Six analytical dimensions: Policy, Institutions, Intergovernmental Context, Financing, Regulation, Resilience.

## Tabs

| Tab | What it does |
|---|---|
| **Home** | Cover hero (pipe-network artwork), thesis + Brazil-at-a-glance custom data graphic, world map of the 27 WSIP Water Compact countries (plus any live case studies), wizard CTA. |
| **Matrix** | 7 WSIP solutions × 6 PIR dimensions matrix with a "Pillar" column on the left. Four views via `?view=` query: `country` (single matrix, default), `compare` (side-by-side), `by-subsector` (countries × dimensions), `by-dimension` (countries × sub-sectors). Cells open a slide-over panel with mandate, numbered legal-instrument citations, responsible institutions, de-jure / de-facto note. |
| **Countries** | Editorial directory listing. Cohort-glyph small-multiples strip, inline-link filters, tabular rows (live countries have a teal left-stripe). |
| **Wizard** | Pick a project archetype (Urban WSS PPP, Wastewater PPP, Desalination, Rural WSS, Farmer-led irrigation, Centralised irrigation, Flood & drought, River basin restoration). Returns the slice of the country framework most relevant to that project: critical PIR dimensions, coverage, responsible institutions, questions to answer. |
| **About** | The two frameworks (with WsipSchematic + PirWheel as Figure 1 / Figure 2) and the deployment phasing. |

The **country dashboard** at `/country/:code` opens a Bloomberg-style country sheet: large country name + region eyebrow, 6-up coverage stat strip, key insights section, a **targets & ambitions** panel and a **monitoring & evidence base** panel (each shown only where the country carries the data), the matrix, a mandate swim-lane (4 levels × 6 functions), and sub-sector drill-in cards. Country flags render as bundled SVGs (`public/flags/`), not emoji, so they appear on every platform.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
```

To smoke-test the production bundle locally (asset paths use the `/water-pir/` base):

```bash
npm run build
npx vite preview --port 4173
# open http://localhost:4173/water-pir/
```

## Deploy

The site deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`. The workflow type-checks, builds, and pushes `dist/` through `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`. Pages settings → Source must be **GitHub Actions**.

`vite.config.ts` sets `base: "/water-pir/"`. `public/404.html` is the SPA fallback that lets deep routes like `/water-pir/wsip-matrix` resolve client-side.

## Password gate

`src/components/PasswordGate.tsx` wraps the app. The bundle carries a SHA-256 hash of the password, not the plaintext. The unlock flag is stored in `localStorage` under `water-pir.unlocked`.

This is a **soft gate**, not real authentication. Anyone who can read the JS bundle or brute-force the hash bypasses it. To rotate:

```bash
printf 'NewPassword!' | shasum -a 256
# paste digest into PASSWORD_HASH in src/components/PasswordGate.tsx
```

## Data model

One TypeScript module per country in `data/<country>.ts`, typed against `src/types.ts`.

```
CountryProfile
  ├─ subsectors: Subsector[]
  │   └─ SubsectorPirCell × 6 (one per PIR dimension)
  │       ├─ legal_instruments[]   title, year, type, faolex_id, faolex_url, articles
  │       ├─ responsible_institutions[]   name, role, level
  │       ├─ mandate_text
  │       ├─ coverage_status (green / yellow / red / gray)
  │       ├─ de_facto_note (de jure-de facto gap)
  │       └─ last_verified_date
  ├─ mandate_records?: MandateRecord[]    one row per (actor × level × function)
  ├─ key_insights?: KeyInsight[]           evidence-backed cards (tension / gap / strength)
  ├─ targets?: SectorTarget[]              commitments — what the country aims for
  └─ monitoring?: MonitoringIndicator[]    observability — what it can measure today
```

`MandateRecord` and `KeyInsight` are optional, article-anchored data layers introduced for the swim-lane and "key insights" sections of the country dashboard. Brazil and Georgia both carry these layers (`data/brazil-mandates.ts` / `data/brazil-insights.ts`, `data/georgia-mandates.ts` / `data/georgia-insights.ts`).

Two further optional layers are populated for Georgia so far: `SectorTarget` (`data/georgia-targets.ts`) drives the **targets & ambitions** panel, and `MonitoringIndicator` (`data/georgia-monitoring.ts`) drives the **monitoring & evidence base** panel — what a country can actually *measure* (access baselines, hydromet, non-revenue water), as distinct from what it *commits to*. `MonitoringStatus` (`measured` / `partial` / `stale` / `not_measured` / `unmapped`) maps onto the existing coverage palette; no new colour tokens. All four optional layers render conditionally, so a country without them simply omits the section.

Sub-sector taxonomy lives in `src/framework.ts` → `SUBSECTOR_LABELS`. Country metadata in `data/countries-meta.ts`. Lessons-from-practice cases in `data/lessons.ts`, project archetypes in `data/project-types.ts`, rotating insights in `data/insights.ts`.

## Source discipline

For instruments not indexed in FAOLEX, the convention is a per-country manifest at `documents/<code>/manifest.json` (see `documents/brazil/manifest.json`). The manifest captures instrument short name, canonical URL (e.g. Planalto for Brazilian federal law), local PDF/HTML filename, indexing status, and the date verified. Article-level citations in `mandate_records[*].legal_basis` and `key_insights[*].legal_basis` should be re-checkable against the manifest.

Other rules:
- Prefer a FAOLEX or AQUALEX record; fall back to a national gazette URL only when both are confirmed missing.
- Every legal instrument declares a year, type, and at least one URL.
- Cells without a verified source show coverage `gray` (not assessed); never invent a FAOLEX ID.
- Use the `de_facto_note` field whenever the law and practice diverge; cite the source for the divergence.
- Re-verify URLs at least annually (`last_verified_date`).

## Adding a country

1. Copy `data/brazil.ts` to `data/<new-country>.ts`.
2. Replace the seed content; keep the schema.
3. Register the module in `data/index.ts`.
4. Flip the country's `status` to `"live"` in `data/countries-meta.ts` (set `compact: false` if it is a live case study outside the 27-country Water Compact cohort, like Georgia).
5. Verify every source URL resolves; set `last_verified_date`.
6. Type-check: `npx tsc --noEmit`.

The map, the Countries page, the Matrix tab and the Wizard pick up the new country with no further code change.

## Stack

React 18 + TypeScript + Vite + Tailwind 3 + React Router 6 + react-simple-maps (+ world-atlas TopoJSON). Inter and Source Serif 4 from Google Fonts. No backend, no database.

## Project layout

```
.
├── .github/workflows/deploy.yml    GitHub Pages CI
├── data/
│   ├── brazil.ts                   full PIR snapshot for the pilot
│   ├── brazil-mandates.ts          30 article-level mandate records
│   ├── brazil-insights.ts          6 evidence-backed key insights
│   ├── georgia.ts                  second live country (live, non-Compact)
│   ├── georgia-mandates.ts         13 article-level mandate records
│   ├── georgia-insights.ts         9 evidence-backed key insights
│   ├── georgia-targets.ts          sector targets & ambitions layer
│   ├── georgia-monitoring.ts       monitoring & evidence-base (observability) layer
│   ├── countries-meta.ts           27 WSIP Water Compact countries + live case studies
│   ├── insights.ts                 rotating home-page insights
│   ├── lessons.ts                  BOSIB / WSIP curated reform cases
│   ├── project-types.ts            8 project archetypes
│   └── index.ts                    country registry
├── documents/
│   ├── BOSIB-...pdf                PIR synthesis (Aug 2022)
│   ├── P165586...pdf               WSIP / Water Forward (Dec 2025)
│   ├── brazil/manifest.json        per-country audit trail
│   └── georgia/manifest.json       per-country audit trail (instruments, revisions, misnamed-file flags)
├── public/
│   ├── 404.html                    SPA fallback for GitHub Pages
│   ├── countries-110m.json         world atlas TopoJSON
│   └── flags/                      29 country flag SVGs (render everywhere; emoji don't on Windows)
├── src/
│   ├── components/
│   │   ├── brand/                  Logo, Droplet, PipeNetwork, PipeDivider, PirWheel
│   │   ├── Matrix/                 shared Matrix + MatrixCellPanel slide-over
│   │   ├── KeyInsightsSection.tsx
│   │   ├── TargetsPanel.tsx        targets & ambitions (commitments)
│   │   ├── MonitoringPanel.tsx     monitoring & evidence base (observability)
│   │   ├── MandateSwimLanes.tsx
│   │   ├── Flag.tsx                SVG flag (decodes emoji → public/flags/<a2>.svg)
│   │   ├── PasswordGate.tsx
│   │   ├── Layout.tsx
│   │   ├── CoverageDot.tsx         single source of truth for CELL_BG
│   │   ├── SearchBox.tsx, WorldMap.tsx, WsipSchematic.tsx, PirSchematic.tsx, ...
│   ├── views/                      HomePage, WsipMatrixTab, CountriesPage, ProjectWizard,
│   │                                AboutPage, CountryDashboard, MatrixView, SubsectorDeepDive
│   ├── framework.ts                WSIP_SOLUTIONS, PIR_DIMENSIONS, taxonomy maps
│   ├── types.ts                    data-model types
│   ├── App.tsx                     routing (wrapped in PasswordGate)
│   ├── main.tsx                    entry, BrowserRouter with basename
│   ├── vite-env.d.ts               Vite client types
│   └── index.css                   Tailwind + editorial utilities
├── docs/session-log.md             chronological build log
├── CLAUDE.md                       conventions and contribution guide
└── README.md                       this file
```
