import type { KeyInsight } from "../src/types";

// Georgia, key evidence-backed insights for the country dashboard.
// Canonical source is matsne.gov.ge; FAOLEX is cited where indexed. Article
// numbers are asserted only for instruments confirmed against a rendered primary
// page (Law on Energy and Water Supply 2019, Law on Water Users Organisations
// 2019, Law on Public Safety 2014). For the 2023 Water Resources Management Law
// the provision is named in words, not by article number (see
// documents/georgia/manifest.json).

const MATSNE_GNERC_2019 = "https://matsne.gov.ge/en/document/view/4747785";
const FAOLEX_GNERC_2019 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC193147/";
const MATSNE_WUO_2019 = "https://matsne.gov.ge/en/document/view/4736322";
const MATSNE_PUBLIC_SAFETY_2014 = "https://matsne.gov.ge/en/document/view/2363013";
const FAOLEX_WRM_2023 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC219653/";
const MRDI_WATER = "https://mrdi.gov.ge/en/agencies/water";
const EU_ASSOC_AGREEMENT =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:22014A0830(02)";

export const GEORGIA_INSIGHTS: KeyInsight[] = [
  {
    title: "2023 water law transposes the EU WFD but is not yet in force",
    body:
      "The 2023 Law on Water Resources Management restores river-basin districts, management plans and a special water-use permit regime, transposing the EU Water Framework Directive. Its operative norms bind only from 1 September 2026; basin districts, councils and plans are not yet established.",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "river-basin management framework",
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
      "Tbilisi, Mtskheta and Rustavi are served by privately-owned Georgian Water and Power; the rest of the country by the state-owned United Water Supply Company of Georgia, which merged 66 local utilities in 2010 and is widely assessed as financially weak. Adjara runs its own operators.",
    legal_basis: {
      short: "Order No. 1-1/13 (2010)",
      article: "establishment of UWSCG",
      national_url: MRDI_WATER,
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
    title: "EU accession drives reform, yet the drinking-water standard is still missing",
    body:
      "The 2014 EU-Georgia Association Agreement commits Georgia to approximate the EU Water Framework and Drinking Water Directives, the stated driver of the 2023 water law. Yet the implementing drinking-water quality regulation is still not adopted, with revised standards reportedly slipping to 2030.",
    legal_basis: {
      short: "EU-Georgia Association Agreement (2014)",
      article: "environmental annex",
      national_url: EU_ASSOC_AGREEMENT,
    },
    pir_dimension: "regulation",
    wsip_solution_id: 1,
    severity: "tension",
  },
];
