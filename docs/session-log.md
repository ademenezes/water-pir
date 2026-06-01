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
- Real user-testing with one Brazilian sector specialist; confirm "who regulates wastewater reuse in Brazil" answerable in <60s.
- Phase 3: Colombia, Kenya, Peru, Indonesia data ingestion. Once two are live, the side-by-side compare mode becomes meaningfully useful.
- Phase 4: AI-assisted FAOLEX bulk CSV ingestion into the schema.

---

## 2026-05-16 to 2026-05-17 · Editorial redesign (Phases 1 to 4)

**User feedback that drove the rewrite.** Initial UI proposal rejected with "It needs to look like a professionally designed webpage, not generic AI design." Plan re-anchored in publication design (Bloomberg country brief, FT data essay, BOSIB PIR PDF by Circle Graphics) rather than SaaS landing pages. The full brief and the "we will / we will NOT" discipline list lives in `.claude/plans/let-s-work-on-ui-eager-narwhal.md`.

**Phase 1 (foundation + Home cover).** New Tailwind palette: `brand.{ink, teal, deep, sand, amber, olive, rule}` pulled from the BOSIB cover. Inter + Source Serif 4 type pairing loaded from Google Fonts. Editorial utilities in `src/index.css` (`.eyebrow`, `.display-hero`, `.prose-editorial`, `.pull-quote`, `.figure-caption`, `.marginalia`). Brand SVGs: `Droplet` (4 variants), `PipeNetwork` (cover artwork), `PipeDivider`. Layout gained a `fullBleed` prop so the Home page can break out of the centred container. HomePage rewritten as a sequence of magazine-style spreads: cover with pipe-network artwork, thesis + Brazil-at-a-glance custom data graphic, world map, wizard CTA. Top nav: 5 tabs (Home, Matrix, Countries, Wizard, About).

**Phase 2 (Matrix as protagonist).** Shared `src/components/Matrix/Matrix.tsx` extracted so `/wsip-matrix` and `/country/:code/matrix` stop duplicating cell-building logic. Coverage status rendered as the custom droplet glyph (filled / half / outline / dotted) rather than generic icons; `CELL_BG` stays the single source of truth. New `MatrixCellPanel` slide-over styled as a magazine sidebar: chapter mini-cover, numbered legal-instrument citations, responsible-institution table, amber-ruled de-jure / de-facto callout. PIR Comparator folded into the Matrix tab as two of four view modes (`country`, `compare`, `by-subsector`, `by-dimension`); the old `/pir-comparator` route now 301s to `/wsip-matrix?view=by-subsector`. `src/views/PirComparator.tsx` deleted.

**Phase 3 (interior surfaces).** New `PirWheel` SVG (BOSIB Fig 1.2 palette: teal Policy, orange Regulation, olive Institutions, mid-teal IGC, light teal Financing, brand-deep Resilience core). `WsipSchematic` repainted, no card chrome. `AboutPage` rewritten with a numbered TOC and `WsipSchematic` + `PirWheel` rendered as Figure 1 / Figure 2. `CountriesPage` reframed as an editorial directory listing (cohort-glyph small-multiples strip, inline-link filters, tabular rows with a teal left-stripe for live countries). `CountryDashboard` rebuilt as a Bloomberg-style country sheet: huge country name + region eyebrow, 6-up coverage stat strip, the matrix, a marginalia gutter, sub-sector drill-in cards. `/country/:code` switched to `fullBleed`.

**Merge from `claude/nifty-ellis-a781de`.** A parallel branch had added four new types (`MandateFunction`, `MandateLegalBasis`, `MandateRecord`, `KeyInsight`) and two new components (`KeyInsightsSection`, `MandateSwimLanes`) anchored to Planalto-verified Brazilian articles. Cherry-picked the additive parts (types, 30 mandate records, 6 key insights, `documents/brazil/manifest.json` audit trail) and rebuilt the two visible components in the editorial register (no card chrome, severity rendered as a coloured top-stripe + eyebrow, swim-lane chips as typographic units with a popover that matches MatrixCellPanel). Integrated into `CountryDashboard` conditionally on `country.key_insights` and `country.mandate_records`. The branch was deleted after.

**Polish round (May 17).** Designed a new `Logo` (circular monogram, teal ring on navy field, droplet) replacing the small "W in slate square" wordmark. Removed the "Brazil pilot" subtitle. Dropped the "Three findings" and "Did you know" sections from Home; the map now spans the full sand band. Removed every "Chapter · 0X" eyebrow + huge numeral (pages now lead with a short eyebrow + headline + intro). About trimmed to two sections: "The two frameworks" and "Phasing". Type scale bumped (eyebrow 12 to 13, body 18 to 19, page H1s clamp 34-60 to clamp 40-80, matrix cell mandate 14 to 15). Global em-dash purge (`s/ — /, /` across all .ts / .tsx); zero em-dashes remain in `src/` or `data/`. Added the "Pillar" column on the left of the matrix with rowSpan colored blocks (Water for People, Food, Planet), label words stacking vertically. Footer simplified to logo + "Questions or comments? ademenezes1@worldbank.org".

**Nested-anchor fix.** `CountriesPage` was wrapping each live row in a `Link` (whole-row click) AND embedding a second `Link` to the matrix inside, which is invalid HTML. Replaced the outer Link with a `role="link"` div using `useNavigate`; keyboard behaviour preserved via Enter / Space handlers.

---

## 2026-05-18 · GitHub Pages deploy + soft password gate

**User request.** Deploy to GitHub Pages, with a password gate landing page.

**Decisions.**
- Repo: `ademenezes/water-pir`, public (free-plan Pages requires public; password gate is the access barrier regardless).
- Password: `Reg-2026!`. Stored in the bundle as a SHA-256 digest (`964652200ed837e7aeacc3f6c183912e8c085245611109a5659d1295e4b583bd`), never in plaintext.
- Acceptance: soft gate only. Anyone who reads the JS bundle or brute-forces the hash bypasses it. If real auth is needed later, move off Pages (Cloudflare Pages + Worker, Vercel password protection, Netlify basic-auth).

**Build + routing.**
- `vite.config.ts` set `base: "/water-pir/"`.
- `main.tsx` reads `import.meta.env.BASE_URL`, trims the trailing slash, passes it as `basename` to `BrowserRouter`.
- `WorldMap.tsx` and the favicon `<link>` in `index.html` reference assets via `import.meta.env.BASE_URL` / `%BASE_URL%`.
- `public/404.html` is the rafgraph/spa-github-pages fallback: GH Pages serves it for any deep route, the script encodes the path as `?p=…` and redirects to `/water-pir/`, where the snippet in `index.html` restores the URL via `history.replaceState` before React Router boots.
- `src/vite-env.d.ts` added so `import.meta.env` compiles.
- `vite.config.js` and `vite.config.d.ts` (emitted by `tsc -b`) added to `.gitignore`.

**Password gate.** `src/components/PasswordGate.tsx` wraps the routes in `App.tsx`. Editorial cover styling (teal background + pipe network + italic Enter link). Uses `crypto.subtle.digest("SHA-256", …)` to hash the user's input and compare against the bundled digest. Unlock flag stored in `localStorage` under `water-pir.unlocked`; syncs across tabs via the `storage` event.

**Workflow.** `.github/workflows/deploy.yml` triggers on push to `main`. Steps: checkout, setup-node@v4 (Node 20, npm cache), `npm ci`, type-check, `npm run build`, sanity-check `dist/404.html` exists, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`. First push to `main` deployed cleanly after Pages was enabled via `gh api -X POST /repos/ademenezes/water-pir/pages -f build_type=workflow`.

**Live.** https://ademenezes.github.io/water-pir/. Smoke-tested: root 200, topojson 200, deep-route 404 (expected, served by the SPA fallback, restored client-side).

---

## State at end of 2026-05-18

- TypeScript clean (`npx tsc --noEmit` exits 0).
- 6-commit deploy chain on `main` (initial + 5 redesign phases + deploy scaffolding).
- 8 sub-sectors mapped for Brazil. 30 mandate records, 6 key insights, ~10 instruments verified against Planalto canonical text (manifest at `documents/brazil/manifest.json`).
- Live at https://ademenezes.github.io/water-pir/ behind a soft password gate.
- Source at https://github.com/ademenezes/water-pir (public).

---

## 2026-06-01 · Georgia added as a second live country (live, non-Compact)

**User goal.** Expand the tool from one fully-built country to two by building **Georgia** (the Caucasus state, ISO 268) to full Brazil parity, demonstrating the framework on a very different case: a small unitary EU-accession state whose water sector is mid-reform. The full brief lives in `.claude/plans/let-s-expand-the-work-sharded-hellman.md`.

**Why Georgia.** A recent, citable reform story: the 2023 Law on Water Resources Management transposes the EU Water Framework Directive (river-basin districts, basin management plans, a restored water-use permit regime); GNERC has set water/wastewater tariffs since 2008 (a rare unified energy-and-water regulator); urban WSS is split across a private utility (Georgian Water & Power, Tbilisi), a weak public utility (UWSCG, rest of country) and the Adjara provider; irrigation is recentralised under Georgian Amelioration (World Bank GRAIL project).

**Decisions locked with the user.**

- Full Brazil parity: subsector matrix + mandate swim-lane + key insights + a `documents/georgia/manifest.json` audit trail.
- All **8** sub-sectors, and the matrix is **always a complete 7×6 grid**. Gaps are shown as explicit `red`/`gray` cells (never omitted, no "Dimension not yet assessed" placeholder), so the tool flags exactly where reform action is needed.
- Coverage is **countrywide**. Georgian water law applies de jure across the internationally recognised territory; the two Russian-occupied regions (Abkhazia, Tskhinvali Region / South Ossetia) are recorded as a **de-facto governance gap** via `de_facto_note` + one intro line, not a scope exclusion.
- Status **`live`**, but Georgia is **explicitly NOT one of the 27 Water Compact countries**. Treatment: neutral, minimal copy (no "WSIP Water Compact" eyebrow on its dashboard; a small "Non-compact" tag in the directory; the "27" framing stays accurate).
- Honest coverage: the 2023 WRM law's operative norms (basin districts, permits) only bind from 1 September 2026, so the matrix is mostly `yellow`, with `red`/`gray` in genuinely thin areas (farmer-led irrigation, groundwater operationalisation, basin self-finance, rural sanitation). The honesty is the point.

**Data added.**

- `data/georgia.ts` — 8 sub-sectors, every one carrying all 6 PIR cells. One `green` (urban WSS regulation = GNERC), the rest a mix of `yellow` / `red` / `gray`.
- `data/georgia-mandates.ts` — 13 article-level mandate records (MEPA, NEA, GNERC, MRDI, MoF; basin districts; Adjara; UWSCG / GWP / Georgian Amelioration).
- `data/georgia-insights.ts` — 6 evidence-backed key insights (WFD transposition, GNERC, the urban split, the restored permit regime, irrigation recentralisation, fragmented flood/drought early warning).
- `documents/georgia/manifest.json` — 13-instrument audit trail (FAOLEX where indexed, `matsne.gov.ge` Legislative Herald as the canonical fallback). Local law-text copies are gitignored; only the manifest + extracted citations are committed.
- Registered in `data/index.ts` (`GEO: GEORGIA`).

**Sourcing.** FAOLEX first, `matsne.gov.ge` for article-level text. Two FAOLEX ids verified live: LEX-FAOC219653 (2023 WRM Law) and LEX-FAOC193147 (2019 Energy & Water Supply). Where an instrument is not indexed, `faolex_id: null` + a matsne `national_url` + a note (mirroring Brazil's Law 14.026 treatment). No fabricated ids.

**UI: the "live but non-Compact" case the UI could not previously express.** Adding a Compact country would be pure data; Georgia needed one optional field threaded through three spots.

- `data/countries-meta.ts` — added `compact?: boolean` (omitted = Compact; Georgia sets `compact: false`). GEO entry added (ISO 268).
- `CountryDashboard.tsx` — header eyebrow drops "· WSIP Water Compact" when `compact === false`. Added `SWIMLANE_OVERRIDES` so Georgia's swim-lane reads National / Adjara A.R. / Municipal / Basin instead of Brazil's Federal / CF-1988 labels.
- `MandateSwimLanes.tsx` — made country-agnostic: a new optional `labels` prop (`SwimLaneLabels`) overrides the heading, the four level labels/blurbs and the source note, defaulting to Brazil.
- `CountriesPage.tsx` — the "27" prose, cohort glyphs and status-filter counts now scope to Compact members only (`compact !== false`); non-Compact live countries render in a separate "Beyond the Water Compact" block with a "Non-compact" row tag.
- No change to `WorldMap` (Georgia simply appears as a second `live` teal country; its live tooltip makes no Compact claim).

**Shared-component bug fixed.** `bestCellAcross` in `Matrix.tsx` initialised `best` with no sub-sector and replaced it only on a strictly higher rank, so an all-`gray` (but mapped) cell never took over and the matrix fell back to the "Dimension not yet assessed" placeholder. Now the first real cell is always assigned (`!best.subsector || …`), so a mapped gap renders its own note. The fix only ever reduces placeholders; it is shared by both Matrix surfaces.

**Verification.**

- `npx tsc --noEmit` clean.
- `/country/GEO`: no Compact eyebrow, 6-up stat strip, key insights, 8 sub-sector cards, matrix slide-over with a live FAOLEX link, swim-lane with Adjara labels + visible mandate gaps + Georgia's manifest source note. No "Dimension not yet assessed" anywhere.
- `/wsip-matrix?country=GEO`: full 42-cell grid, no placeholder. The compare view confirmed the only remaining placeholder is in Brazil's own table (pre-existing data gap, flagged for a separate pass).
- `/countries`: "27" framing and tallies intact; Georgia in the "Beyond the Water Compact" block with a "Non-compact" tag.
- `/wizard?project=…&country=GEO`: Georgia selectable; project slices resolve to GEO sub-sector deep-dives.
- `/` world map: two `live` teal countries (Brazil + Georgia; was one).

---

## State at end of 2026-06-01

- TypeScript clean (`npx tsc --noEmit` exits 0).
- Two live countries: Brazil (Compact pilot) and Georgia (live case study, non-Compact). 8 sub-sectors each.
- Georgia: 13 mandate records, 6 key insights, 13 instruments in `documents/georgia/manifest.json`.
- The 27-country WSIP Water Compact framing and cohort tallies are unchanged (Georgia is not counted).
- Live at https://ademenezes.github.io/water-pir/ behind the soft password gate.
