import type { SectorTarget } from "../src/types";

// Georgia, sector targets & ambitions.
//
// The honest finding is that Georgia has set very few quantified national
// water and sanitation targets: most rows below are "not set", "qualitative"
// or "to be determined". The subnational layer is thinner still: municipalities
// hold the legal duty to ensure water supply (Local Self-Government Code) but are
// too resource-weak to exercise it, and the only target assigned to them is left
// "to be determined by regional development plans"; the autonomous republic of
// Adjara runs its own operators but sets no verified quantitative target; the
// one place subnational targets are forming is the river-basin level, via the
// 2023 Water Resources Management Law (basin councils due 2023 / 2025, lagging).
//
// Sources are primary where a law or regulator fixes the goal (FAOLEX), and OECD
// assessments (secondary, but endorsed via the OECD / MEPA National Policy
// Dialogue) for the financing gap and the EU-approximation milestones. No figure
// is asserted that was not read from the cited source on 2026-06-02; see
// documents/georgia/manifest.json (_targets_and_financing).
//
// Cross-country caution: the "2014-2030 WSS Strategy" and "entire population by
// 2028" figures in the same 2021 OECD report belong to Moldova, not Georgia, and
// are deliberately excluded here.

const faolexUrl = (id: string) =>
  `https://www.fao.org/faolex/results/details/en/c/${id}/`;

const OECD_WATER_OUTLOOK_2021 =
  "https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/07/developing-a-water-policy-outlook-for-georgia-the-republic-of-moldova-and-ukraine_a1b2f035/512a52aa-en.pdf";
const OECD_NPD_GEORGIA_2024 =
  "https://www.oecd.org/content/dam/oecd/en/about/programmes/water-policy-reforms-in-eecca/georgia/overview_10th_georgia_npd_jan_2024.pdf";

export const GEORGIA_TARGETS: SectorTarget[] = [
  {
    domain: "water_access",
    level: "national",
    indicator: "Continuous, safe drinking-water supply for the population",
    target_value: "Qualitative aim only ('24-hour supply')",
    status: "qualitative",
    issuing_body: "Government of Georgia (Georgia 2020 strategy)",
    source: {
      short: "OECD water-policy outlook (2021)",
      article: "strategic-vision review",
      national_url: OECD_WATER_OUTLOOK_2021,
    },
    note: "The OECD assessment finds Georgia's vision lacks a results-oriented, quantified access target.",
  },
  {
    domain: "sanitation",
    level: "national",
    indicator: "Population with safely managed sanitation",
    target_value: "No quantified national target",
    status: "not_set",
    issuing_body: "No national target",
    source: {
      short: "OECD water-policy outlook (2021)",
      article: "strategic-vision review",
      national_url: OECD_WATER_OUTLOOK_2021,
    },
  },
  {
    domain: "sanitation",
    level: "national",
    indicator: "Urban wastewater treatment plants in major settlements",
    target_value: "At least 10 urban WWTPs constructed or rehabilitated",
    target_year: "2026",
    status: "slipping",
    issuing_body: "MRDI / UWSCG (EU Urban Waste Water Directive approximation)",
    source: {
      short: "OECD 10th National Policy Dialogue (2024)",
      article: "UWWTD approximation milestone",
      national_url: OECD_NPD_GEORGIA_2024,
    },
    note: "Deadline pushed back from 2021 to 2025 to 2026; the treatment-coverage baseline has not yet been assessed.",
  },
  {
    domain: "performance",
    level: "national",
    indicator: "Non-revenue water (drinking-water losses)",
    target_value: "No reduction target set",
    status: "not_set",
    issuing_body: "GNERC (normative loss cap only)",
    source: {
      short: "GNERC normative water-loss rule (2017)",
      article: "Resolution No. 45 of 2017",
      faolex_url: faolexUrl("LEX-FAOC187451"),
    },
    note: "GNERC's rule caps the loss level recoverable in tariffs, a regulatory ceiling rather than an NRW-reduction target; the exact percentage is not asserted here.",
  },
  {
    domain: "performance",
    level: "local",
    indicator: "Household water-metering coverage",
    target_value: "To be determined by regional development plans",
    status: "to_be_determined",
    issuing_body: "Municipalities and local suppliers (with MEPA, GNERC)",
    source: {
      short: "OECD 10th National Policy Dialogue (2024)",
      article: "monitoring indicator",
      national_url: OECD_NPD_GEORGIA_2024,
    },
    note: "Municipalities hold the duty to ensure water supply (Local Self-Government Code) but the metering target itself is deferred to subnational plans not yet adopted.",
  },
  {
    domain: "financing",
    level: "national",
    indicator: "Additional finance to meet the 2030 water and sanitation goals",
    baseline: "current spend below need",
    target_value: "GEL 793.4M (EUR 198.9M) present-value requirement",
    target_year: "2030",
    status: "set",
    issuing_body: "OECD / MEPA assessment (full-reform scenario)",
    source: {
      short: "OECD water-policy outlook (2021)",
      article: "Table 2.11, full-reform scenario",
      national_url: OECD_WATER_OUTLOOK_2021,
    },
    note: "Of which GEL 784.0M (EUR 196.5M) is wastewater and water-supply capital, largely donor-dependent.",
  },
  {
    domain: "wrm",
    level: "basin",
    indicator: "River-basin councils and management plans (EU WFD)",
    target_value: "Five river-basin councils established (three by 2023, two by 2025)",
    target_year: "2025",
    status: "slipping",
    issuing_body: "MEPA with municipalities (2023 Law on Water Resources Management)",
    source: {
      short: "OECD 10th National Policy Dialogue (2024)",
      article: "river-basin council milestone",
      national_url: OECD_NPD_GEORGIA_2024,
    },
    note: "The basin tier is the only subnational level setting targets; councils and plans are lagging ahead of the law's full entry into force on 1 September 2026 (FAOLEX LEX-FAOC219653).",
  },
];
