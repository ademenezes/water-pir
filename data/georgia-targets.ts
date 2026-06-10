import type { SectorTarget } from "../src/types";

// Georgia, sector targets & ambitions.
//
// The honest finding is that Georgia's national water and sanitation targets are
// headline aims, not tracked metrics. The 2021 WSS Vision & Policy Statement does
// set a 2030 universal-access goal for water and adequate sanitation, but against
// a single one-off 2020 GEOSTAT baseline (77.6% / 79.2%) and with no quantified
// intermediate target; the remaining rows are "slipping", "to be determined" or a
// regulatory loss cap. The subnational layer is thinner still: municipalities hold
// the legal duty to ensure water supply (Local Self-Government Code) but are too
// resource-weak to exercise it, and the only target assigned to them is left "to
// be determined by regional development plans"; the autonomous republic of Adjara
// runs its own operators but sets no verified quantitative target; the one place
// subnational targets are forming is the river-basin level, via the 2023 Water
// Resources Management Law (basin councils due 2023 / 2025, lagging).
//
// Sources are primary where a law, regulator or national policy fixes the goal
// (the 2021 WSS Vision for the access goals + baseline; FAOLEX for the GNERC loss
// cap), and OECD assessments (secondary, but endorsed via the OECD / MEPA National
// Policy Dialogue) for the financing gap and the EU-approximation milestones. No
// figure is asserted that was not read from the cited source on 2026-06-10; see
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
const WSS_VISION_2021 =
  "https://moi.gov.ge/files/1/%E1%83%A1%E1%83%94%E1%83%A5%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%90/Vision%20and%20Policy.pdf";

export const GEORGIA_TARGETS: SectorTarget[] = [
  {
    domain: "water_access",
    level: "national",
    indicator: "Population with access to a safe water supply",
    baseline: "77.6% (GEOSTAT, 2020)",
    target_value: "Universal access to safe water; 24/7 supply (cities by end-2025, rural by end-2030)",
    target_year: "2030",
    status: "set",
    issuing_body: "MRDI (WSS Vision & Policy Statement, 2021); WSS lead now the Ministry of Infrastructure (2025 reorganisation)",
    source: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "Vision section; para 50, fn 7 (baseline)",
      national_url: WSS_VISION_2021,
    },
    note: "The 2021 WSS Vision sets a 2030 universal-access goal, but the only baseline is a one-off 2020 GEOSTAT survey and there is no quantified intermediate target; the OECD outlook flags the lack of a results-oriented metric.",
  },
  {
    domain: "sanitation",
    level: "national",
    indicator: "Population with access to adequate sanitation",
    baseline: "79.2% (GEOSTAT, 2020)",
    target_value: "Universal access to adequate sanitation",
    target_year: "2030",
    status: "set",
    issuing_body: "MRDI (WSS Vision & Policy Statement, 2021); WSS lead now the Ministry of Infrastructure (2025 reorganisation)",
    source: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "Vision section; para 50, fn 7 (baseline)",
      national_url: WSS_VISION_2021,
    },
    note: "The 2021 WSS Vision sets a 2030 goal for 'adequate' (not 'safely managed') sanitation against a one-off 2020 GEOSTAT baseline; the Vision itself flags discharges of untreated or inadequately treated sewage.",
  },
  {
    domain: "sanitation",
    level: "national",
    indicator: "Urban wastewater treatment plants in major settlements",
    target_value: "At least 10 urban WWTPs constructed or rehabilitated",
    target_year: "2026",
    status: "slipping",
    issuing_body: "Ministry of Infrastructure (ex-MRDI) / UWSCG (EU Urban Waste Water Directive approximation)",
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
