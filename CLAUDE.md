# Claude conventions for the Water PIR Tool

This file gives Claude (and any contributor) the conventions and "load-bearing" facts to be effective in this repo without re-deriving them.

## What this project is

A single-page React app that visualises how a country's water-sector laws, institutions and regulators map onto two World Bank frameworks:

- **WSIP** (Water Strategy Implementation Plan, December 2025) — 3 pillars × 7 scalable solutions × 3 enablers, anchored on Figure 4 of the source PDF.
- **PIR** (Policies, Institutions, Regulation, August 2022) — 6 analytical dimensions, anchored on Figure 1.2 of the BOSIB PDF.

The two source PDFs live in `documents/`. Don't move them.

**Audience:** government officials and sector reformers preparing water-related projects. Prefer terse, citation-first writing over WBG jargon.

## Tabs / routes

| Route | View | Purpose |
|---|---|---|
| `/` | `views/HomePage.tsx` | Search, featured insight, how-to, world map, schematics, lessons |
| `/wsip-matrix` | `views/WsipMatrixTab.tsx` | Country-selectable WSIP × PIR matrix. Supports `?country=BRA` and `?compare=KEN`. |
| `/pir-comparator` | `views/PirComparator.tsx` | Dual-mode: sub-sector × countries × dimensions, or dimension × countries × sub-sectors. |
| `/countries` | `views/CountriesPage.tsx` | Cards grid with filters; each Live card has "Open dashboard" + "Matrix" deep-link buttons. |
| `/wizard` | `views/ProjectWizard.tsx` | Picker + per-project slice. Supports `?project=urban_wss_ppp&country=BRA`. |
| `/about` | `views/AboutPage.tsx` | Methodology / sources. |
| `/country/:code` | `views/CountryDashboard.tsx` | Country dashboard mirroring WSIP at a Glance. |
| `/country/:code/matrix` | `views/MatrixView.tsx` | Per-country matrix (legacy from before WSIP Matrix tab; kept for backlinks). |
| `/country/:code/subsector/:subKey` | `views/SubsectorDeepDive.tsx` | Full deep-dive with mandate map and PIR dimension cards. |

## Data model

Everything is typed in `src/types.ts`. Country files in `data/<code>.ts` export a single `CountryProfile`.

**Don't invent data.** If a cell has no verified source, set `coverage_status: "gray"` and leave `legal_instruments: []`. Never make up a FAOLEX URL.

### Required fields per legal instrument

```ts
{
  title: string;           // full title
  short: string;           // citation-style short ("Law 14.026/2020")
  year: number;
  type: InstrumentType;    // constitution | framework_law | sectoral_law | decree | regulation | resolution | policy | plan
  faolex_id: string | null;       // null if not in FAOLEX
  faolex_url: string | null;      // null if not in FAOLEX
  national_url?: string;           // fallback gazette/ministry URL
  articles_cited?: string;
  note?: string;
}
```

Prefer FAOLEX URLs (pattern `https://www.fao.org/faolex/results/details/en/c/LEX-FAOC######`). Fall back to national gazettes only when FAOLEX coverage is confirmed missing — never as a shortcut.

### Coverage colours (do not invent new statuses)

| Status | Cell background | Dot | Meaning |
|---|---|---|---|
| `green` | `bg-emerald-50` | green | Law + regulator + practice broadly aligned |
| `yellow` | `bg-amber-50` | yellow | Law exists, implementation/regulation partial |
| `red` | `bg-rose-50` | red | No specific law or regulator |
| `gray` | `bg-slate-50` | grey | Not yet mapped |

The single source of truth for these colours is `CELL_BG` in `src/components/CoverageDot.tsx`. Import from there — don't duplicate Tailwind class strings in the views.

## Frameworks (source of truth)

- `src/framework.ts` exports `WSIP_SOLUTIONS` (7), `PIR_DIMENSIONS` (6), `SUBSECTOR_LABELS`, `PILLAR_LABELS`.
- WSIP solution IDs are stable integers 1–7 from Figure 4. Don't re-order them.
- PIR dimensions: `policy | institutions | igc | financing | regulation | resilience`.
- Sub-sector keys are stable snake_case: `wss_urban`, `wss_rural`, `wastewater_reuse_desal`, `irrigation_decentralized`, `irrigation_centralized`, `flood_drought`, `wrm_basin`, `wrm_groundwater`.

## Adding a new country

1. Copy `data/brazil.ts` to `data/<code>.ts`. Replace content.
2. Register in `data/index.ts` (`COUNTRIES[<CODE>] = <PROFILE>`).
3. Flip status in `data/countries-meta.ts` from `pipeline` → `live`. Set the ISO numeric (3-digit) so the world map highlights it.
4. Verify every FAOLEX URL resolves. Set `last_verified_date` to today (ISO).
5. Run `npx tsc --noEmit`.

The Map, Countries page, comparator, wizard, and Brazilian comparison pick up the new country with no further code change.

## Adding a new project archetype

Edit `data/project-types.ts`. Each entry maps to `subsector_keys[]` and `critical_dimensions[]`. The wizard reads from this file directly; no other change needed.

## Stack and conventions

- React 18 + TypeScript + Vite. Strict mode on.
- Tailwind 3 with semantic colours: `pillar-people` (sky), `pillar-food` (emerald), `pillar-planet` (amber); plus `coverage-{green,yellow,red,gray}` for dots.
- React Router v6, `BrowserRouter`. Future-flag warnings are noise; ignore.
- World map: `react-simple-maps` + `world-atlas/countries-110m.json` (served from `public/`).
- No backend, no database, no API calls. Everything is bundled JSON-ish TypeScript modules.

## Code style

- Functional components. No class components.
- One component per file unless tiny helpers (`CoverageDot` + `CoverageLegend` share a file because they're tightly coupled).
- Tailwind classes inline, not extracted into `@apply` unless the same pattern repeats across files — see `.pill`, `.coverage-dot` in `src/index.css`.
- Prefer composing existing components. Before creating a new card / pill / chip / legend variant, check `src/components/` for one that fits.
- Don't add a dependency without checking that an existing one already covers it.

## Testing in the browser

The preview server is wired in `.claude/launch.json` (`water-pir-dev`, port 5173). Verify changes by:

1. Type-check: `npx tsc --noEmit` (must be clean).
2. Reload the preview and check console for runtime errors.
3. Click through the affected routes — don't trust HMR alone; sometimes a hard reload is needed.

## Source rules (citation discipline)

- Every fact in a country file should be traceable to a primary source (FAOLEX, national gazette, ANA resolution, etc.).
- WBG analysis (BOSIB Box X.Y, WSIP Figure Z) is acceptable as a *secondary* source for things like coverage assessments and lessons — but the underlying law/regulation must always be linked.
- The "de jure–de facto" note is where to record where law and practice diverge. Be specific and cite the source for the divergence (e.g., "SNIS 2024 data shows ~50% sewage treatment").

## What not to do

- Don't fabricate FAOLEX IDs or URLs. If unsure, leave `faolex_id: null` and use a `national_url` with a note.
- Don't introduce new coverage colours / status names.
- Don't re-order or rename WSIP solutions or PIR dimensions; their keys/IDs are stable.
- Don't add a backend or database for v1.
- Don't add tracking/analytics scripts.
- Don't write English speculation in lieu of a citation.

## When in doubt

Re-read the framework PDFs in `documents/`:

- `BOSIB-ec7fe78d-2f66-4223-bee1-7bf4b7cf412a.pdf` — PIR synthesis (Aug 2022).
- `P165586002283004a086e105a00d8430696.pdf` — WSIP / Water Forward (Dec 2025), Figure 4.
