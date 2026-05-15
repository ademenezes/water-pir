# Session log

Chronological build log for the Water PIR Tool. Each entry records what was decided and why, so a future contributor can reconstruct rationale without re-reading the conversation.

---

## 2026-05-15 · Brainstorm + Brazil pilot scaffolded

**Goal stated by user.** "Create a website where users can view in a diagrammatic way what are the policies and regulations of a country in relation to water sector and its many sub areas (e.g. WSS, WRM, irrigation) according to the WBG WSIP framework. Map mandates by sub-sector. Always point to the FAO source link."

**Source documents.** Two PDFs in `documents/`:

- `BOSIB-ec7fe78d-...pdf` — World Bank Group "WSS Policies, Institutions and Regulation" synthesis report (August 2022). Defines the **PIR framework** (Figure 1.2): six analytical dimensions — Policy, Institutions, Intergovernmental Context, Financing, Regulation, Resilience.
- `P165586002283004a086e105a00d8430696.pdf` — World Bank Group "Water Forward / Water Strategy Implementation Plan" (December 2025). Defines the **WSIP framework** (Figure 4): three pillars, seven scalable solutions, three enablers.

**FAO data sources investigated.**

- FAOLEX (https://www.fao.org/faolex/en/) — no public API. Bulk CSV downloads at https://www.fao.org/faolex/opendata/en/ . Record URL pattern `https://www.fao.org/faolex/results/details/en/c/LEX-FAOC######` is stable.
- AQUALEX (https://aqualex.fao.org/) — water-specific subset of FAOLEX, ~26 000 records. No API either.

**Decisions (via AskUserQuestion).**

- **Pilot country:** Brazil.
- **Framework axis:** WSIP × PIR matrix (not WSIP-only).
- **Entry points:** country-first; plus a cross-country sub-sector comparator.
- **Audience:** government officials and sector reformers.

**Stack chosen.** React 18 + TypeScript + Vite + Tailwind + React Router. No backend. JSON-like TypeScript modules per country. Data lives in `data/`, components in `src/components/`, page views in `src/views/`.

**Brazil seed data.** 5 sub-sectors: Urban WSS (full 6-cell coverage), Rural WSS, Wastewater/Reuse/Desal, WRM Basin, Flood & Drought. Sources include 1988 Federal Constitution, Law 9.433/1997 (PNRH), Law 9.984/2000 (ANA), Law 11.445/2007 (Sanitation, FAOLEX LEX-FAOC074469), Law 14.026/2020 (Marco Legal), CONAMA Resolutions, Law 12.334/2010 (Dam Safety). De jure–de facto notes capture regionalisation lag, ANA NR voluntary adoption, ~50% sewage treatment.

**Initial views shipped.** Country dashboard, WSIP × PIR matrix (per country), sub-sector deep-dive with mandate map (RACI-style by role × government level), sub-sector comparator scaffold, methodology page.

---

## 2026-05-15 · Home page redesign + 5-tab navigation

**User feedback.** "First a home page (not too dense in text), with a map of countries, succinct description of the tool, schematics of WSIP and PIR. Tabs: Home, WSIP Matrix, PIR Comparator, Countries, Methodology."

**Decisions (via AskUserQuestion).**

- **Countries tab:** cards grid (not a sortable table) per country.
- **PIR Comparator:** dual-mode (sub-sector → countries × 6 PIR dimensions; OR PIR dimension → countries × sub-sectors).
- **Map scope:** the 27 WSIP Water Compact priority cohort from chapter 5 of P165586 (Brazil = live, others = pipeline).

**Added.**

- `data/countries-meta.ts` — 27 WSIP Water Compact countries with ISO numeric (matching world-atlas TopoJSON), region, status, blurb. Plus Colombia + Indonesia as Phase-3 planned.
- `src/components/WorldMap.tsx` — react-simple-maps + `public/countries-110m.json`. Hover tooltip, click navigates only for live countries.
- `src/components/WsipSchematic.tsx`, `PirSchematic.tsx` — visual mini-mirrors of Figure 4 and Figure 1.2 on the home page.
- `src/views/WsipMatrixTab.tsx` — standalone matrix tab with country selector.
- `src/views/CountriesPage.tsx` — cards grid with status filter + region filter.
- `src/views/PirComparator.tsx` — dual-mode (replaces the earlier Comparator).

**Nav becomes:** Home · WSIP Matrix · PIR Comparator · Countries · Methodology.

---

## 2026-05-15 · Legend clarity fix

**User feedback.** "What does this part mean? This is not clear" — referring to the coverage legend labels "Aligned · Partial / uneven · Gap · Not assessed".

**First pass.** Renamed labels to "Strong · Partial · Gap · Not mapped" with a "?" affordance opening a popover with the full sentence-level definition. Added `title` tooltips on every dot.

**Follow-up feedback.** "How does this label connect with the matrix (is it by colour?). This is not clear."

**Resolution.** Made the connection explicit in three places:

1. Legend chips are now **mini matrix cells** — same background colour, same dot — prefixed by "Cell colour =". The legend swatch and the matrix cell are visually identical.
2. Each **matrix cell** now carries its **status word inline** ("Strong" / "Partial" / "Gap" / "Not mapped") next to the dot, so every cell is self-labelling and doesn't depend on the legend.
3. `CELL_BG` is now exported from `src/components/CoverageDot.tsx` as the single source of truth, imported by both views and the legend, so they can't drift.

---

## 2026-05-15 · Six feature additions

User asked to implement six deferred features in one round.

**1. Deep-link from country cards to a pre-filtered matrix.** Each "Live" country card on `/countries` now has **two** action buttons: "Open dashboard →" and "Matrix" → routes to `/wsip-matrix?country=BRA`.

**2. URL-stateful country selection on the matrix tab.** `WsipMatrixTab` now reads `?country=` and `?compare=` from the URL via `useSearchParams`. Selection survives reloads and is shareable.

**3. Featured "Did you know?" rotator.** `data/insights.ts` curates five facts from Brazil and the framework docs. `FeaturedInsight` picks one **deterministically per date** so reloads keep the same card within a day. Five seeds: Brazil Marco Legal, the 7×6 matrix size, Brazil basin charging gap, the 27 Water Compact cohort, BOSIB Figure 1.1 fragmentation finding.

**4. Search box.** `src/components/SearchBox.tsx` builds an in-memory index over countries (live + pipeline), sub-sectors, legal instruments, WSIP solutions, PIR dimensions, lessons, and project types. Tokenised AND-match, scored by position; up to 10 results with kind-tagged badges. Keyboard navigation (↑↓ Enter Esc).

**5. Lessons-from-practice grid.** `data/lessons.ts` curates five BOSIB / WSIP cases: Brazil tariff reform (WSIP Annex III), Kenya WASREB pro-poor indicators (BOSIB Box 6.1), Colombia 25-year regulatory evolution (BOSIB Figure 6.1), Zambia 1997 WSS Act (BOSIB Box 2.2), Senegal desalination (WSIP Figure 14). `LessonsGrid` renders cards that link to the live deep-dive when available, otherwise to `/countries`.

**6. Project Wizard.** `data/project-types.ts` defines 8 archetypes (Urban WSS PPP, Wastewater PPP, Desalination, Rural WSS, Farmer-led irrigation, Centralised irrigation, Flood & drought, River basin restoration). Each archetype maps to sub-sector keys, WSIP solutions, critical PIR dimensions, and readiness questions. `views/ProjectWizard.tsx` shows the picker grid; selecting one (`?project=urban_wss_ppp&country=BRA`) returns the slice — critical PIR dimensions with the country's coverage, mandate text, questions to answer, and direct links to the sub-sector deep-dive.

**7. Country comparison.** `WsipMatrixTab` accepts `?compare=KEN`. If the second country is live, two matrices render side-by-side at `xl` width and stacked below. If the second country is pipeline, the live matrix renders alone next to a `PipelineMatrixPlaceholder` card explaining when data will populate.

**Nav extended to 6 tabs:** Home · WSIP Matrix · PIR Comparator · Countries · Project Wizard · Methodology.

---

## State at end of 2026-05-15

- TypeScript clean (`npx tsc --noEmit` exits 0).
- No browser console errors.
- All 6 tabs verified in the running preview.
- ~30 TypeScript files in `src/`, ~7 data files in `data/`, 1 TopoJSON in `public/`.
- Production build path validated via `tsc -b && vite build` (script wired in `package.json`).

## Open follow-ups (for future sessions)

- Map: clarify Colombia + Indonesia visual treatment vs the 25 WSIP pipeline countries (currently three-state legend: live / pipeline / planned).
- Pipeline matrix placeholder could include a "Notify when ready" CTA.
- Insight rotation could pull from a JSON feed at build time.
- Real user-testing with one Brazilian sector specialist — confirm "who regulates wastewater reuse in Brazil" answerable in <60s.
- Phase 3: Colombia, Kenya, Peru, Indonesia data ingestion. Once two are live, the side-by-side compare mode becomes meaningfully useful.
- Phase 4: AI-assisted FAOLEX bulk CSV ingestion into the schema.
