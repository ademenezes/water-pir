import type { WsipSolution, PirDimensionDef } from "./types";

// WSIP 7 Scalable Solutions, anchored in WSIP Figure 4 (P165586, Dec 2025)
export const WSIP_SOLUTIONS: WsipSolution[] = [
  {
    id: 1,
    shortName: "Urban WSS",
    fullName: "Urban Water and Sanitation Service Optimization",
    pillar: "people",
    description:
      "Pricing, regulation, policies, incentives for utility turnaround. Service delivery efficiency and financial sustainability of urban water and sanitation operators.",
    traditionalSubsectors: ["wss_urban"],
  },
  {
    id: 2,
    shortName: "Bankable Bulk / Wastewater / Reuse / Desal",
    fullName: "Bankable Investments for Water, Wastewater, Reuse, and Desalination",
    pillar: "people",
    description:
      "Viability gap funding, guarantees, PPPs for bulk water, wastewater treatment, reuse and desalination infrastructure.",
    traditionalSubsectors: ["wastewater_reuse_desal", "wss_urban"],
  },
  {
    id: 3,
    shortName: "Rural WSS",
    fullName: "Rural Water Supply and Sanitation Provision",
    pillar: "people",
    description:
      "Decentralized, community-managed systems for rural water supply and sanitation, with appropriate management models.",
    traditionalSubsectors: ["wss_rural"],
  },
  {
    id: 4,
    shortName: "Farmer-Led Irrigation",
    fullName: "Farmer-Led Sustainable Irrigation (Decentralized)",
    pillar: "food",
    description:
      "Smallholder access to irrigation equipment, finance, markets, and digital tools. Decentralized irrigation services.",
    traditionalSubsectors: ["irrigation_decentralized"],
  },
  {
    id: 5,
    shortName: "Centralized Irrigation",
    fullName: "Increased Water and Energy Efficiency (Centralized Irrigation)",
    pillar: "food",
    description:
      "Modernization of centralized irrigation systems through performance-based contracts, technology upgrades, and bulk water management.",
    traditionalSubsectors: ["irrigation_centralized"],
  },
  {
    id: 6,
    shortName: "Flood & Drought",
    fullName: "Flood and Drought Risk Reduction",
    pillar: "planet",
    description:
      "Early warning, land and water policies, physical and nature-based protection, dam safety, drought monitoring and response.",
    traditionalSubsectors: ["flood_drought"],
  },
  {
    id: 7,
    shortName: "Rivers & Aquifers",
    fullName: "Restoration and Protection of Rivers and Aquifers",
    pillar: "planet",
    description:
      "Basin-level planning, pollution abatement, ecosystem restoration, source-water protection, groundwater management.",
    traditionalSubsectors: ["wrm_basin", "wrm_groundwater"],
  },
];

// PIR dimensions, anchored in BOSIB Figure 1.2 (WSS PIR Synthesis, Aug 2022)
export const PIR_DIMENSIONS: PirDimensionDef[] = [
  {
    key: "policy",
    label: "Policy",
    blurb:
      "The signals, laws, strategies and plans that set the direction of the sector and define who is responsible for what.",
  },
  {
    key: "institutions",
    label: "Institutions",
    blurb:
      "The organisations that operationalise sector functions, ministries, agencies, utilities, service providers and user representatives.",
  },
  {
    key: "igc",
    label: "Intergovernmental Context",
    blurb:
      "How responsibilities, accountabilities and resources are shared across national, state/regional and local government.",
  },
  {
    key: "financing",
    label: "Financing",
    blurb:
      "The flow of public, private and tariff resources into the sector, the 3Ts (tariffs, taxes, transfers), subsidies and risk-sharing instruments.",
  },
  {
    key: "regulation",
    label: "Regulation",
    blurb:
      "The rules governing tariffs, quality, access and performance, and the bodies empowered to monitor and enforce them.",
  },
  {
    key: "resilience",
    label: "Resilience",
    blurb:
      "The sector's capacity to anticipate, absorb, adapt to and recover from shocks (climate, public health, fiscal, political).",
  },
];

// Sub-sector taxonomy, bridges WSIP solutions to the traditional sub-sector vocabulary
// used in FAOLEX, AQUALEX and national legislation.
export const SUBSECTOR_LABELS: Record<string, string> = {
  wss_urban: "Urban Water Supply & Sanitation",
  wss_rural: "Rural Water Supply & Sanitation",
  wastewater_reuse_desal: "Wastewater, Reuse & Desalination",
  irrigation_decentralized: "Farmer-Led / Decentralized Irrigation",
  irrigation_centralized: "Centralized / Public Irrigation",
  flood_drought: "Flood & Drought Risk Management",
  wrm_basin: "Water Resources Management (Basin / Surface)",
  wrm_groundwater: "Groundwater Management",
};

export const PILLAR_LABELS: Record<string, string> = {
  people: "Water for People",
  food: "Water for Food",
  planet: "Water for Planet",
};
