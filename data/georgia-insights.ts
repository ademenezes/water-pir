import type { KeyInsight } from "../src/types";

// Georgia, key evidence-backed insights for the country dashboard.
// Canonical source is matsne.gov.ge; FAOLEX is cited where indexed. Article
// numbers are asserted only for instruments confirmed against a rendered primary
// page (Law on Energy and Water Supply 2019, Law on Water Users Organisations
// 2019, Law on Public Safety 2014) or against the full primary text. The 2023
// Water Resources Management Law articles (16-17 permits; 22-25 basin districts,
// plans and councils) were read on 2026-06-10 from the consolidated Georgian text
// (unofficial translation of article headings); see documents/georgia/manifest.json.

const MATSNE_GNERC_2019 = "https://matsne.gov.ge/en/document/view/4747785";
const FAOLEX_GNERC_2019 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC193147/";
const MATSNE_WUO_2019 = "https://matsne.gov.ge/en/document/view/4736322";
const MATSNE_PUBLIC_SAFETY_2014 = "https://matsne.gov.ge/en/document/view/2363013";
const FAOLEX_WRM_2023 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC219653/";
const WSS_VISION_2021 =
  "https://moi.gov.ge/files/1/%E1%83%A1%E1%83%94%E1%83%A5%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%90/Vision%20and%20Policy.pdf";
const MATSNE_DRINKING_N58 = "https://matsne.gov.ge/ka/document/view/2196792";
const EU_ASSOC_AGREEMENT =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:22014A0830(02)";
const OECD_WATER_OUTLOOK_2021 =
  "https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/07/developing-a-water-policy-outlook-for-georgia-the-republic-of-moldova-and-ukraine_a1b2f035/512a52aa-en.pdf";
const OECD_NPD_GEORGIA_2024 =
  "https://www.oecd.org/content/dam/oecd/en/about/programmes/water-policy-reforms-in-eecca/georgia/overview_10th_georgia_npd_jan_2024.pdf";

export const GEORGIA_INSIGHTS: KeyInsight[] = [
  {
    title: "A national WSS policy now exists, but as a vision, not a binding law",
    body:
      "Georgia adopted a Water Supply and Sanitation Vision and Policy Statement (MRDI, November 2021) setting a 2030 universal-access goal and a 24/7-supply target, cities by end-2025 and rural areas by end-2030. It is a policy statement, not a binding WSS framework law, and is published only as an unofficial English translation.",
    legal_basis: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "Vision & Policy Statement, MRDI (Nov 2021)",
      national_url: WSS_VISION_2021,
    },
    pir_dimension: "policy",
    wsip_solution_id: 1,
    severity: "strength",
  },
  {
    title: "2023 water law transposes the EU WFD but is not yet in force",
    body:
      "The 2023 Law on Water Resources Management restores river-basin districts (Art. 22), six-year basin management plans with consultative councils (Art. 23–25) and a special water-use permit regime (Art. 16–17), transposing the EU Water Framework Directive. Its operative norms bind only from 1 September 2026; basin districts, councils and plans are not yet established.",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "Art. 16–17, 22–25 (permits; basin districts, plans, councils)",
      faolex_url: FAOLEX_WRM_2023,
    },
    pir_dimension: "policy",
    wsip_solution_id: 7,
    severity: "gap",
  },
  {
    title: "GNERC is a rare unified energy-and-water economic regulator",
    body:
      "The 2019 Law on Energy and Water Supply extends GNERC's economic regulation to water supply (Art. 1(9)) and requires a licence to provide the service (Art. 11). GNERC sets the potable-water tariff methodology and per-licensee tariffs, and from April 2026 irrigation tariffs.",
    legal_basis: {
      short: "Law on Energy and Water Supply (2019)",
      article: "Art. 1(9), 11",
      faolex_url: FAOLEX_GNERC_2019,
      national_url: MATSNE_GNERC_2019,
    },
    pir_dimension: "regulation",
    wsip_solution_id: 1,
    severity: "strength",
  },
  {
    title: "Urban water is split between private GWP and weak public UWSCG",
    body:
      "Tbilisi and Mtskheta are served by privately-owned Georgian Water and Power; Rustavi by the separately-licensed Rustavi Water. The rest of the country is served by the state-owned United Water Supply Company of Georgia, which merged 66 local utilities in 2010 and is widely assessed as financially weak. Adjara runs its own operators.",
    legal_basis: {
      short: "Georgia WSS Vision & Policy (2021)",
      article: "Appendix 2, Table 1 (licensed-utility roster)",
      national_url: WSS_VISION_2021,
    },
    pir_dimension: "institutions",
    wsip_solution_id: 1,
    severity: "tension",
  },
  {
    title: "Irrigation is recentralised; farmer-led irrigation stays informal",
    body:
      "Main-system irrigation and drainage are recentralised under state-owned Georgian Amelioration. The 2019 Law on Water Users Organisations enables membership-based user organisations (Art. 6, 7), but uptake is limited and most on-farm, farmer-led irrigation remains informal.",
    legal_basis: {
      short: "Law on Water Users Organisations (2019)",
      article: "Art. 6, 7",
      national_url: MATSNE_WUO_2019,
    },
    pir_dimension: "institutions",
    wsip_solution_id: 4,
    severity: "gap",
  },
  {
    title: "Flood and drought response sits in civil-protection law; monitoring is thin",
    body:
      "The 2014 Law on Public Safety assigns emergency prevention through forecasting and monitoring (Art. 28) and population warning (Art. 32) to the Emergency Management Agency. Hydrometeorological monitoring by the National Environmental Agency is sparse and EU-funded modernisation is still under way.",
    legal_basis: {
      short: "Law on Public Safety (2014)",
      article: "Art. 28, 32",
      national_url: MATSNE_PUBLIC_SAFETY_2014,
    },
    pir_dimension: "resilience",
    wsip_solution_id: 6,
    severity: "gap",
  },
  {
    title: "Drinking-water standard exists since 2014; the EU-aligned revision is pending",
    body:
      "The 2014 EU-Georgia Association Agreement commits Georgia to approximate the EU Water Framework and Drinking Water Directives, the stated driver of the 2023 water law. A national drinking-water-quality standard has been in force since 2014 (Government Decree N58); what remains pending is its EU-aligned revision, reportedly slipping to around 2030.",
    legal_basis: {
      short: "Drinking-water technical regulation (Decree N58, 2014)",
      article: "Government Decree N58 of 15 January 2014",
      national_url: MATSNE_DRINKING_N58,
    },
    pir_dimension: "regulation",
    wsip_solution_id: 1,
    severity: "tension",
  },
  {
    title: "WSS reform carries a roughly GEL 793 million financing gap",
    body:
      "An OECD and MEPA outlook puts the present value of additional finance needed to meet Georgia's 2030 water and sanitation goals at GEL 793.4 million (EUR 198.9 million), of which GEL 784 million is wastewater and water-supply capital, expected to lean heavily on donors.",
    legal_basis: {
      short: "OECD water-policy outlook (2021)",
      article: "Table 2.11, full-reform scenario",
      national_url: OECD_WATER_OUTLOOK_2021,
    },
    pir_dimension: "financing",
    wsip_solution_id: 1,
    severity: "gap",
  },
  {
    title: "Access goals are qualitative; ten urban WWTPs due by 2026",
    body:
      "The 2021 WSS Vision sets a 2030 universal-access goal but no firm quantified intermediate targets, and metering goals are left 'to be determined'. GNERC caps allowed drinking-water losses (Resolution No. 45 of 2017) but sets no non-revenue-water reduction target. Its firmest sanitation milestone, ten urban wastewater plants, has slipped from 2021 to 2026.",
    legal_basis: {
      short: "OECD 10th National Policy Dialogue (2024)",
      article: "UWWTD approximation milestone",
      national_url: OECD_NPD_GEORGIA_2024,
    },
    pir_dimension: "policy",
    wsip_solution_id: 2,
    severity: "gap",
  },
];
