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
| `/` | `views/HomePage.tsx` | Magazine cover (Spread 1) + thesis/Brazil-at-a-glance chart (2) + three numbered findings (3) + world map + featured insight (4) + Wizard CTA band (5). Rendered with `<Layout fullBleed>` so spreads can break out of the default container. |
| `/wsip-matrix` | `views/WsipMatrixTab.tsx` | The Matrix tab. Chapter cover + editorial masthead ("SHOWING country · VIEW mode") + four views via `?view=`: `country` (default, single Matrix), `compare` (side-by-side), `by-subsector` (countries × dimensions for one sub-sector), `by-dimension` (countries × sub-sectors for one dimension). URL params: `?country=BRA&compare=KEN&view=…`. Cells open in `MatrixCellPanel` slide-over. Rendered `fullBleed`. |
| `/pir-comparator` | *(redirect)* | Legacy route — redirects to `/wsip-matrix?view=by-subsector`. The comparator is folded into the Matrix tab. |
| `/countries` | `views/CountriesPage.tsx` | Editorial directory listing — chapter cover ("02 · Countries"), cohort-glyph small-multiples strip, inline link filters, tabular row directory (live rows have a teal left-stripe, pipeline/planned are dimmed). |
| `/wizard` | `views/ProjectWizard.tsx` | Picker + per-project slice. Supports `?project=urban_wss_ppp&country=BRA`. (Editorial restyle deferred to a later phase.) |
| `/about` | `views/AboutPage.tsx` | Editorial about — chapter cover ("04 · About"), numbered TOC, then chapters: (01) The two frameworks with `WsipSchematic` + `PirWheel` as Figure 1 + Figure 2, (02) Source discipline with FAOLEX worked-example sand callout, (03) What we did/didn't, (04) How to flag an error, (05) Phasing. |
| `/country/:code` | `views/CountryDashboard.tsx` | Country sheet — huge name + region/status/updated eyebrow, intro on the right, 6-up coverage-by-PIR-dimension stat strip, **Key insights** section (only if `country.key_insights` is set), shared `Matrix` + slide-over panel in main col with marginalia gutter, **Mandate swim-lane** section (only if `country.mandate_records` is set), sub-sector drill-in cards below. Rendered `fullBleed`. |
| `/country/:code/matrix` | `views/MatrixView.tsx` | Per-country matrix (legacy backlinks). Uses the same shared `Matrix` component + slide-over panel as the Matrix tab. |
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

### Canonical-source audit trail

For instruments that aren't indexed in FAOLEX, the convention is to keep a per-country manifest at `documents/<code>/manifest.json` (see `documents/brazil/manifest.json` for the pattern). The manifest captures: instrument short name, canonical URL (e.g. Planalto for Brazilian federal law), local PDF/HTML filename for offline verification, status (`indexed_in_faolex` | `not_in_faolex_confirmed` | `pending_check`), and the date verified. Article-level citations in `mandate_records[*].legal_basis` and `key_insights[*].legal_basis` should be re-checkable against the manifest.

### Mandate records and key insights

In addition to the `subsectors` matrix, a country may carry two optional, article-level data layers:

- **`mandate_records: MandateRecord[]`** — who holds which function (`policy | norm_setting | regulation | planning | service_delivery | financing`) at which level (`national | state | local | basin`). One row per (actor × level × function), anchored to a specific article via `legal_basis`. Drives the swim-lane diagram on the country dashboard.
- **`key_insights: KeyInsight[]`** — short evidence-backed cards (<= 12-word title, <= 50-word body) tagged `strength | tension | gap` and anchored to a specific article. Each insight optionally references a `pir_dimension` and/or `wsip_solution_id`. Drives the "Key insights" section on the country dashboard.

Both are optional on `CountryProfile`; the dashboard renders the corresponding sections only when the data is present. Brazil is currently the only country with both layers populated (see `data/brazil-mandates.ts` and `data/brazil-insights.ts`).

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
- Tailwind 3 with these palettes:
  - `brand.{ink, teal, deep, sand, amber, olive, rule}` — visual identity tokens, pulled from the BOSIB PIR PDF (Circle Graphics, 2022). Used for chrome, hero, eyebrows, editorial pull-quotes.
  - `pillar-{people, food, planet}` — semantic, for WSIP solution rows in the matrix.
  - `pir-{policy, institutions, igc, financing, regulation, resilience}` — semantic, for PIR dimension columns/arcs.
  - `coverage-{green, yellow, red, gray}` — semantic, for matrix cell status. **Single source of truth: `CELL_BG` in `src/components/CoverageDot.tsx`.** Don't duplicate elsewhere.
- Typography pairing: **Inter** (`font-display`, `font-sans`) at weights 400–900 + **Source Serif 4** (`font-serif`) regular/italic at 400/600. Loaded via Google Fonts in `index.html`. Use `font-display font-black` for cover-style headlines, `font-serif` for body voice and pull-quotes.
- React Router v6, `BrowserRouter`. Future-flag warnings are noise; ignore.
- World map: `react-simple-maps` + `world-atlas/countries-110m.json` (served from `public/`).
- No backend, no database, no API calls. Everything is bundled JSON-ish TypeScript modules.

## Design language (editorial, not SaaS)

The visual reference is the BOSIB PIR Synthesis Report PDF (Circle Graphics / Chris Phillips, Aug 2022). The tool should read as a designed publication — Bloomberg country brief / FT data essay / Apple environmental report — **not** a Tailwind SaaS landing page. Discipline at the detail level is what makes it feel professional.

**Do:**
- Pair Inter (utility, nav, captions) with Source Serif 4 (body, pull-quotes, "voice").
- 12-column grid (`grid-cols-12 gap-8/12`) with asymmetric breaks (cols 1-7 / 8-12, etc.). Default width is `max-w-[88rem]` (~1408px) for magazine-spread feel.
- Use horizontal rules (`.rule`, `border-brand-rule`) and white space as default structural devices. Cards only when content fundamentally differs from neighbours.
- Use the editorial utility classes in `src/index.css`: `.eyebrow`, `.eyebrow-ink`, `.eyebrow-white`, `.display-hero`, `.chapter-numeral`, `.prose-editorial`, `.pull-quote` (with auto amber drop-cap), `.figure-caption`, `.marginalia`, `.link-editorial`.
- Write copy with a thesis / POV, not generic "explore" / "see at a glance" CTAs.

**Don't:**
- `rounded-2xl shadow-lg` as default container.
- Identical 3-card rows ("title + body + chevron").
- Gradient hero blocks. Bento grids.
- Lucide/Heroicon ornaments. Icons are reserved for `Droplet` (coverage marks + wordmark) and the pipework illustration.
- "How it works in 3 steps" sections. "Trusted by these institutions" logo bars.
- Pill-shaped status badges as decoration.

**Brand SVGs** (in `src/components/brand/`):
- `Droplet` — 4-variant water-droplet glyph (`filled` / `half` / `outline` / `dotted`). **Doubles as the coverage data mark in the matrix**: green → `filled`, yellow → `half`, red → `outline`, gray → `dotted`. Default colors come from the coverage palette; pass `color` to override.
- `DropletO` — inline droplet sized to cap-height for use inside display headlines and the header wordmark.
- `PipeNetwork` — cover artwork. Used **once**, prominently, on the Home hero. Not a tileable background.
- `PipeDivider` — thin pipe-line section divider with mid-line elbow. Use **sparingly** (≤ once per page).
- `PirWheel` — donut of the 6 PIR dimensions, repainted to match BOSIB Figure 1.2: teal Policy / orange Regulation / olive Institutions / mid-teal Intergovernmental Context / light teal Financing / brand-deep Resilience core. Used on the About page (Figure 2). Accepts `highlight`, `onHover`, `onClick` props for interactive use (queued for Phase 4 — hover-link inside the Matrix tab).

**Matrix components** (in `src/components/Matrix/`):
- `Matrix` — shared 7×6 grid for one country. Editorial cell design: pillar-stripe row headers with display numeral, droplet coverage mark, eyebrow status word, serif mandate snippet (3-line clamp). Takes `country` + optional `onCellOpen(target)` callback. Both `/wsip-matrix` and `/country/:code/matrix` use this — **don't duplicate the cell-building logic**.
- `MatrixCellPanel` — slide-over (right-aligned, 44rem max-w) styled as a magazine sidebar: chapter mini-cover, mandate in serif, numbered legal-instrument citations with FAOLEX links, responsible-institution table, de-jure/de-facto callout (sand bg, amber border), "Open full deep-dive →" link. Closes on Escape and backdrop click.

**Country-dashboard sections** (in `src/components/`):
- `KeyInsightsSection` — renders an array of `KeyInsight` records as editorial mini-features (2 per row). Each insight is anchored to a specific law article; severity is shown as a coloured top-stripe + eyebrow (strength→emerald, tension→amber, gap→rose, picking up the coverage palette). Reads `country.key_insights` on the dashboard; conditional render.
- `MandateSwimLanes` — 4 government levels × 6 water-sector functions diagram. Each chip is a click-to-open popover with the legal-basis citation, an optional <15-word verbatim quote, a de-jure/de-facto note (sand callout + amber rule), and the canonical source link. Empty cells render a dashed "mandate gap" placeholder so constitutional silences are visible. Mobile fallback: `<details>` accordion grouped by level. Reads `country.mandate_records`; conditional render.

**Layout wrapper**: `<Layout>` adds the teal stripe, header (5-tab underline nav, droplet wordmark), and navy footer. Pages get a default `max-w-7xl px-6 py-8` content container; pass `<Layout fullBleed>` to opt out (HomePage and the Matrix tab use this for magazine spreads).

## Code style

- Functional components. No class components.
- One component per file unless tiny helpers (`CoverageDot` + `CoverageLegend` share a file because they're tightly coupled).
- Tailwind classes inline, not extracted into `@apply` unless the same pattern repeats across files. Editorial utilities (`.eyebrow`, `.chapter-numeral`, `.pull-quote`, etc.) and the legacy `.pill` / `.coverage-dot` live in `src/index.css`.
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
