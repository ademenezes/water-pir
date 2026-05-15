// Project archetypes that government officials / sector reformers / WBG teams typically prepare.
// Each maps to one or more WSIP scalable solutions, the sub-sectors a country dashboard would expose,
// and the PIR dimensions most load-bearing for that project type.

import type { PirDimension, WsipSolutionId } from "../src/types";

export interface ProjectType {
  key: string;
  label: string;
  pillar: "people" | "food" | "planet";
  short_desc: string;
  /** Sub-sector keys (matching the country data schema) that this project relates to. */
  subsector_keys: string[];
  /** WSIP scalable solution IDs that this project advances. */
  wsip_solutions: WsipSolutionId[];
  /** The PIR dimensions that most matter for project readiness. */
  critical_dimensions: PirDimension[];
  /** Questions that the project team will need to answer when reading the framework. */
  readiness_questions: string[];
}

export const PROJECT_TYPES: ProjectType[] = [
  {
    key: "urban_wss_ppp",
    label: "Urban water & sanitation utility reform / PPP",
    pillar: "people",
    short_desc:
      "Reforming an urban utility's tariffs, governance and service-delivery model — often with a PPP, concession or performance-based contract.",
    subsector_keys: ["wss_urban"],
    wsip_solutions: [1],
    critical_dimensions: ["policy", "institutions", "financing", "regulation"],
    readiness_questions: [
      "Who is the titular holder of the service (constitutional / local-government law)?",
      "Is there an independent regulator empowered to set tariffs?",
      "Does the legal framework allow competitive contracting of the operator?",
      "What conditionalities apply to federal / development-bank funding?",
    ],
  },
  {
    key: "wastewater_ppp",
    label: "Wastewater treatment & reuse PPP",
    pillar: "people",
    short_desc:
      "Bankable wastewater treatment and reuse projects — often through hybrid PPP structures with viability-gap funding.",
    subsector_keys: ["wastewater_reuse_desal", "wss_urban"],
    wsip_solutions: [2],
    critical_dimensions: ["policy", "regulation", "financing", "resilience"],
    readiness_questions: [
      "Are effluent and reuse quality standards legally defined?",
      "Who regulates discharges (sectoral regulator? environmental agency? both)?",
      "Is there a tariff structure that recovers wastewater O&M?",
      "Is reuse legally permitted and incentivised for industry and agriculture?",
    ],
  },
  {
    key: "desalination",
    label: "Desalination plant (bulk water)",
    pillar: "people",
    short_desc:
      "New bulk-water supply through desalination — typically a long-term offtake contract with a private operator under IFC / MIGA risk-cover.",
    subsector_keys: ["wastewater_reuse_desal", "wss_urban"],
    wsip_solutions: [2],
    critical_dimensions: ["policy", "institutions", "financing", "regulation"],
    readiness_questions: [
      "Is there a legal framework for bulk-water offtake contracts?",
      "Who is the contracting authority for the bulk-water purchase?",
      "Are political-risk and currency-risk guarantees available under national law?",
      "Are environmental permits (intake, brine discharge) clearly assigned?",
    ],
  },
  {
    key: "rural_wss",
    label: "Rural water & sanitation programme",
    pillar: "people",
    short_desc:
      "Community-managed or hybrid rural service delivery with results-based grants, capacity building and aggregated operators.",
    subsector_keys: ["wss_rural"],
    wsip_solutions: [3],
    critical_dimensions: ["policy", "institutions", "financing"],
    readiness_questions: [
      "Is there a legal mandate for rural service provision, and who holds it?",
      "Are community-based associations legally recognised operators?",
      "What financing channels (national grants, performance-based) are open?",
    ],
  },
  {
    key: "farmer_irrigation",
    label: "Farmer-led irrigation programme",
    pillar: "food",
    short_desc:
      "Smallholder access to equipment, finance and markets for decentralised irrigation (with subsidies, solar pumps, agribusiness).",
    subsector_keys: ["irrigation_decentralized"],
    wsip_solutions: [4],
    critical_dimensions: ["policy", "institutions", "financing"],
    readiness_questions: [
      "Is there a national irrigation policy or sub-sectoral strategy?",
      "Are smallholder water-use rights legally protected?",
      "Are subsidies / matching grants for irrigation equipment legally provided?",
    ],
  },
  {
    key: "centralized_irrigation",
    label: "Centralised irrigation modernisation",
    pillar: "food",
    short_desc:
      "Modernising a public irrigation system — performance-based O&M, technology upgrades, restored cost-recovery.",
    subsector_keys: ["irrigation_centralized"],
    wsip_solutions: [5],
    critical_dimensions: ["institutions", "regulation", "financing"],
    readiness_questions: [
      "Who manages the centralised system (state, parastatal, water-user association)?",
      "Is there a legal basis for performance-based operator contracts?",
      "How are O&M costs allocated (tariff, subsidy, both)?",
    ],
  },
  {
    key: "flood_drought",
    label: "Flood & drought risk management",
    pillar: "planet",
    short_desc:
      "Early warning, dam safety, green-grey infrastructure, drought monitoring and contingency planning.",
    subsector_keys: ["flood_drought"],
    wsip_solutions: [6],
    critical_dimensions: ["policy", "institutions", "regulation", "resilience"],
    readiness_questions: [
      "Is there a national civil-protection / disaster-risk law?",
      "Who regulates dam safety, and across which sectors?",
      "Is there a legally-defined drought-monitoring authority?",
    ],
  },
  {
    key: "river_basin",
    label: "River basin / watershed restoration",
    pillar: "planet",
    short_desc:
      "Pollution abatement, source-water protection, basin-scale management, transboundary cooperation.",
    subsector_keys: ["wrm_basin"],
    wsip_solutions: [7],
    critical_dimensions: ["policy", "institutions", "igc", "financing"],
    readiness_questions: [
      "Is the basin the legal unit of water management?",
      "Are water-use rights (abstraction, discharge) priced?",
      "Are basin organisations (committees / agencies) legally constituted?",
    ],
  },
];

export function getProjectType(key: string): ProjectType | undefined {
  return PROJECT_TYPES.find((p) => p.key === key);
}
