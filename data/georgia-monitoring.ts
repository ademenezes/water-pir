import type { MonitoringIndicator } from "../src/types";

// Georgia, sector monitoring & evidence base.
//
// The honest finding is that Georgia largely cannot see its own water sector.
// The only national access baseline is a single GEOSTAT 2020 survey (77.6% water,
// 79.2% sanitation), surfaced in the 2021 WSS Vision and never refreshed; there is
// no measurement of non-revenue water; household metering is deferred to municipal
// plans that do not yet exist; and systematic river-basin monitoring is legislated
// (2023 Water Resources Management Law) but not operative until 1 September 2026.
// The one place a real number exists is the financing need, and even that is a
// one-off 2021 OECD modelled scenario rather than a live tracking system.
//
// Every value below was read from the cited source online on 2026-06-10:
//   - WSS Vision & Policy Statement (MRDI, Nov 2021, unofficial English translation),
//     para 50 + footnote 7 carry the GEOSTAT-2020 access baseline verbatim.
//   - GNERC normative water-loss rule (Res. 45/2017, FAOLEX) caps allowed losses for
//     tariff purposes but measures no actual NRW.
//   - OECD 10th National Policy Dialogue (2024) leaves the metering target "to be
//     determined"; OECD water-policy outlook (2021), Table 2.11, holds the GEL 793.4M
//     financing requirement.
//   - 2023 Water Resources Management Law (FAOLEX LEX-FAOC219653) mandates basin
//     monitoring, operative from 1 Sept 2026.
//
// Status is observability, not legal coverage: measured ≈ green, partial/stale ≈
// amber, not_measured ≈ red (see MonitoringIndicator in src/types.ts).

const faolexUrl = (id: string) =>
  `https://www.fao.org/faolex/results/details/en/c/${id}/`;

const WSS_VISION_2021 =
  "https://moi.gov.ge/files/1/%E1%83%A1%E1%83%94%E1%83%A5%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%90/Vision%20and%20Policy.pdf";
const OECD_WATER_OUTLOOK_2021 =
  "https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/07/developing-a-water-policy-outlook-for-georgia-the-republic-of-moldova-and-ukraine_a1b2f035/512a52aa-en.pdf";
const OECD_NPD_GEORGIA_2024 =
  "https://www.oecd.org/content/dam/oecd/en/about/programmes/water-policy-reforms-in-eecca/georgia/overview_10th_georgia_npd_jan_2024.pdf";

export const GEORGIA_MONITORING: MonitoringIndicator[] = [
  {
    domain: "water_access",
    level: "national",
    indicator: "Population with access to a water supply",
    current_value: "77.6% nationally (urban access higher than rural)",
    as_of_year: "2020",
    producer: "GEOSTAT",
    status: "stale",
    source: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "para 50, fn 7",
      national_url: WSS_VISION_2021,
      verbatim_short: "Nationally, 77.6% have access to water supply (GEOSTAT, 2020)",
    },
    gap_note:
      "The only national access baseline is this single GEOSTAT 2020 figure, surfaced in the 2021 WSS Vision and not since refreshed. Because supply is not 24/7, households rely on storage tanks that may not be safe to drink.",
  },
  {
    domain: "sanitation",
    level: "national",
    indicator: "Population with access to sanitation services",
    current_value: "79.2% nationally (urban access higher than rural)",
    as_of_year: "2020",
    producer: "GEOSTAT",
    status: "stale",
    source: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "para 50, fn 7",
      national_url: WSS_VISION_2021,
      verbatim_short: "79.2% have access to sanitation services (GEOSTAT, 2020)",
    },
    gap_note:
      "Same single-survey caveat as water access. This is a broad connectivity measure, not 'safely managed' sanitation: the WSS Vision itself flags discharges of untreated or inadequately treated sewage.",
  },
  {
    domain: "performance",
    level: "national",
    indicator: "Non-revenue water (system water losses)",
    current_value: "Not measured as a national indicator",
    producer: "No designated producer",
    status: "not_measured",
    source: {
      short: "GNERC normative water-loss rule (2017)",
      article: "Resolution No. 45 of 2017",
      faolex_url: faolexUrl("LEX-FAOC187451"),
    },
    gap_note:
      "GNERC's normative-loss rule caps the loss level recoverable in tariffs, but no system measures actual NRW. The 2021 WSS Vision lists reduced NRW only as a hoped-for benefit of private-sector entry (para 30), implying it is not currently tracked.",
  },
  {
    domain: "performance",
    level: "local",
    indicator: "Household water-metering coverage",
    current_value: "No national figure; deferred to municipal plans",
    producer: "Municipalities and local suppliers",
    status: "not_measured",
    source: {
      short: "OECD 10th National Policy Dialogue (2024)",
      article: "monitoring indicator",
      national_url: OECD_NPD_GEORGIA_2024,
    },
    gap_note:
      "The metering-coverage target is left 'to be determined by regional development plans' (OECD 10th NPD, 2024). Municipalities hold the duty to ensure water supply (Local Self-Government Code) but mostly lack the capacity to meter and monitor it.",
  },
  {
    domain: "resource",
    level: "basin",
    indicator: "River-basin and water-resource monitoring",
    current_value: "NEA hydromet network; no systematic basin-scale monitoring yet",
    producer: "National Environmental Agency (NEA), under MEPA",
    status: "partial",
    source: {
      short: "Water Resources Management Law (2023)",
      article: "basin monitoring, operative 1 Sept 2026",
      faolex_url: faolexUrl("LEX-FAOC219653"),
    },
    gap_note:
      "The 2023 Water Resources Management Law mandates river-basin monitoring and management plans, but its operative norms bind only from 1 September 2026; basin-scale water-balance data is not yet systematically produced.",
  },
  {
    domain: "financing",
    level: "national",
    indicator: "Additional finance needed to meet the 2030 WSS goals",
    current_value: "GEL 793.4M (EUR 198.9M) present-value requirement to 2030",
    as_of_year: "2021",
    producer: "OECD / MEPA assessment",
    status: "partial",
    source: {
      short: "OECD water-policy outlook (2021)",
      article: "Table 2.11, full-reform scenario",
      national_url: OECD_WATER_OUTLOOK_2021,
    },
    gap_note:
      "A one-off 2021 OECD modelled scenario, not a recurring public financing-tracking system; of which GEL 784.0M is water-supply and wastewater capital, largely donor-dependent.",
  },
];
