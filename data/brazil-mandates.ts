import type { MandateRecord } from "../src/types";

// Mandate records for Brazil's federal water-sector framework.
// Each record cites a specific article from a Brazilian federal instrument,
// verified against the canonical Planalto text (see documents/brazil/manifest.json).
// Government-level values reuse the existing GovernmentLevel type
// ("national" displays as "Federal"; "local" displays as "Municipal").

const PLANALTO_CF = "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm";
const PLANALTO_9433 = "https://www.planalto.gov.br/ccivil_03/leis/l9433.htm";
const PLANALTO_9984 = "https://www.planalto.gov.br/ccivil_03/leis/l9984.htm";
const PLANALTO_11445 = "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11445.htm";
const FAOLEX_11445 = "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469";
const PLANALTO_12334 = "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12334.htm";
const PLANALTO_14026 = "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14026.htm";
const PLANALTO_12608 = "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12608.htm";
const PLANALTO_12787 = "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12787.htm";

export const BRAZIL_MANDATES: MandateRecord[] = [
  // ===================== FEDERAL (national) =====================
  {
    actor: "União (Federal Government)",
    acronym: "União",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 21, XIX",
      national_url: PLANALTO_CF,
      verbatim_short: "Institute national WRM system; define outorga criteria.",
    },
  },
  {
    actor: "União (urban-development & sanitation guidelines)",
    acronym: "União",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 21, XX",
      national_url: PLANALTO_CF,
      verbatim_short: "Set guidelines for urban development, sanitation, transport.",
    },
  },
  {
    actor: "União (calamity prevention, droughts and floods)",
    acronym: "União",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 21, XVIII",
      national_url: PLANALTO_CF,
      verbatim_short: "Plan permanent defence against droughts and floods.",
    },
  },
  {
    actor: "Conselho Nacional de Recursos Hídricos",
    acronym: "CNRH",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 35",
      national_url: PLANALTO_9433,
      verbatim_short: "Approve PNRH; set criteria for outorga and charging.",
    },
  },
  {
    actor: "Ministério da Integração e do Desenvolvimento Regional",
    acronym: "MIDR",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 36 (Lei 14.600/2023)",
      national_url: PLANALTO_9433,
      verbatim_short: "MIDR Minister chairs CNRH (current redação).",
    },
  },
  {
    actor: "ANA, Agência Nacional de Águas e Saneamento Básico",
    acronym: "ANA",
    level: "national",
    function: "norm_setting",
    legal_basis: {
      short: "Law 9.984/2000",
      article: "Art. 4-A (per Lei 14.026/2020)",
      national_url: PLANALTO_9984,
      verbatim_short: "Institute national reference norms for sanitation regulation.",
    },
    de_facto_note:
      "ANA Resoluções 76-79/2022 set tariff, quality and indicator NRs; state-regulator adherence remains uneven.",
  },
  {
    actor: "ANA, outorga over federal waters",
    acronym: "ANA",
    level: "national",
    function: "regulation",
    legal_basis: {
      short: "Law 9.984/2000",
      article: "Art. 4, IV–V",
      national_url: PLANALTO_9984,
      verbatim_short: "Outorga and oversight of Union-domain water uses.",
    },
  },
  {
    actor: "ANA, dam-safety information system (SNISB)",
    acronym: "ANA",
    level: "national",
    function: "regulation",
    legal_basis: {
      short: "Law 12.334/2010",
      article: "via Lei 9.984/2000 Art. 4, XX–XXII",
      national_url: PLANALTO_12334,
      verbatim_short: "Operate the national dam-safety information system.",
    },
  },
  {
    actor: "ANA, federal water charging",
    acronym: "ANA",
    level: "national",
    function: "financing",
    legal_basis: {
      short: "Law 9.984/2000",
      article: "Art. 4, VIII–IX",
      national_url: PLANALTO_9984,
      verbatim_short: "Implement, collect and apply water-use charging on Union waters.",
    },
  },
  {
    actor: "ANA, Plano Nacional de Recursos Hídricos support",
    acronym: "ANA",
    level: "national",
    function: "planning",
    legal_basis: {
      short: "Law 9.984/2000",
      article: "Art. 4, XVIII",
      national_url: PLANALTO_9984,
      verbatim_short: "Participate in PNRH elaboration and oversee implementation.",
    },
  },
  {
    actor: "Ministry of Cities (federal sanitation policy)",
    acronym: "MCidades",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Law 11.445/2007",
      article: "Art. 52",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
      verbatim_short: "Federal sanitation policy and PLANSAB coordination.",
    },
  },
  {
    actor: "BNDES, Caixa Econômica Federal (federal financiers)",
    acronym: "BNDES/Caixa",
    level: "national",
    function: "financing",
    legal_basis: {
      short: "Law 14.026/2020",
      article: "Art. 7 (Lei 11.445/2007 Art. 50)",
      national_url: PLANALTO_14026,
      verbatim_short: "Federal funds conditioned on adopting ANA reference norms.",
    },
    de_facto_note:
      "Access to federal financing now requires the receiving state/municipal regulator to adopt ANA reference norms (Lei 9.984/2000 Art. 4-B).",
  },
  {
    actor: "Civil Defence (national coordination)",
    acronym: "SEDEC",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Law 12.608/2012",
      article: "Art. 6",
      national_url: PLANALTO_12608,
      verbatim_short: "National civil protection policy, risk prevention coordination.",
    },
  },

  // ===================== STATE =====================
  {
    actor: "States (state-domain water resources)",
    acronym: "Estados",
    level: "state",
    function: "policy",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 26, I",
      national_url: PLANALTO_CF,
      verbatim_short: "State waters: surface and groundwater within the state.",
    },
  },
  {
    actor: "State Water Resources Councils",
    acronym: "CERH",
    level: "state",
    function: "planning",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 33, II",
      national_url: PLANALTO_9433,
      verbatim_short: "State councils integrate the SINGREH.",
    },
  },
  {
    actor: "States, outorga over state waters",
    acronym: "Estados",
    level: "state",
    function: "regulation",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 30, I",
      national_url: PLANALTO_9433,
      verbatim_short: "State outorga and oversight of state-domain water uses.",
    },
  },
  {
    actor: "State sanitation regulators (ARSESP, ARSAE-MG, AGENERSA…)",
    acronym: "Reg. estaduais",
    level: "state",
    function: "regulation",
    legal_basis: {
      short: "Law 11.445/2007",
      article: "Art. 21–23",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
      verbatim_short: "Local sanitation regulation; must follow ANA NRs to keep federal eligibility.",
    },
    de_facto_note:
      "Adoption of ANA reference norms is uneven across state regulators; capacity varies considerably.",
  },
  {
    actor: "State water-resource agencies (DAEE-SP, IGAM-MG, INEMA-BA…)",
    acronym: "Estaduais RH",
    level: "state",
    function: "regulation",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 30",
      national_url: PLANALTO_9433,
      verbatim_short: "Outorga and oversight of state-domain water uses; tied to state law.",
    },
  },
  {
    actor: "State sanitation companies (CESBs, Sabesp, Copasa, Cedae, Sanepar, Embasa)",
    acronym: "CESBs",
    level: "state",
    function: "service_delivery",
    legal_basis: {
      short: "Law 14.026/2020",
      article: "Art. 16 (amends Lei 11.107/2005)",
      national_url: PLANALTO_14026,
      verbatim_short: "Contrato de programa for sanitation services is barred; competitive bidding required.",
    },
    de_facto_note:
      "Sabesp privatised in 2024; other CESBs still public but most have signed new contracts via competitive process.",
  },

  // ===================== MUNICIPAL (local) =====================
  {
    actor: "Municipalities (titulares of sanitation services)",
    acronym: "Municípios",
    level: "local",
    function: "policy",
    legal_basis: {
      short: "Law 11.445/2007",
      article: "Art. 8-A (per Lei 14.026/2020)",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
      verbatim_short: "Municipalities and DF are titulares of public sanitation services.",
    },
  },
  {
    actor: "Municipalities, local interest legislation",
    acronym: "Municípios",
    level: "local",
    function: "policy",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 30, I",
      national_url: PLANALTO_CF,
      verbatim_short: "Municipal competence over matters of local interest.",
    },
  },
  {
    actor: "Municipal sanitation plans (planos municipais)",
    acronym: "PMSB",
    level: "local",
    function: "planning",
    legal_basis: {
      short: "Law 11.445/2007",
      article: "Art. 19",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
      verbatim_short: "Sanitation services require a municipal plan as condition.",
    },
  },
  {
    actor: "Municipal autarquias / SAAEs and private concessionárias",
    acronym: "SAAEs",
    level: "local",
    function: "service_delivery",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 175",
      national_url: PLANALTO_CF,
      verbatim_short: "Public-service provision via direct execution, concession or permission.",
    },
  },
  {
    actor: "Tariff revenue (sanitation cost recovery)",
    acronym: "Tarifa",
    level: "local",
    function: "financing",
    legal_basis: {
      short: "Law 11.445/2007",
      article: "Art. 29",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
      verbatim_short: "Services must be economically and financially sustainable via tariff.",
    },
  },

  // ===================== BASIN =====================
  {
    actor: "Comitês de Bacia Hidrográfica",
    acronym: "CBH",
    level: "basin",
    function: "planning",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 38, III",
      national_url: PLANALTO_9433,
      verbatim_short: "Approve the basin water-resources plan.",
    },
  },
  {
    actor: "Comitês de Bacia (set charging values)",
    acronym: "CBH",
    level: "basin",
    function: "financing",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 38, VI",
      national_url: PLANALTO_9433,
      verbatim_short: "Establish charging mechanisms and propose charging values.",
    },
    de_facto_note:
      "Charging operational in only a subset of federal/state basins (PCJ, Paraíba do Sul, Doce, São Francisco and others).",
  },
  {
    actor: "Agências de Água / Basin Agencies",
    acronym: "AdA",
    level: "basin",
    function: "service_delivery",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 44, III",
      national_url: PLANALTO_9433,
      verbatim_short: "Collect water-use charges by delegation from the outorgante.",
    },
  },
  {
    actor: "Agências de Água, basin plan elaboration",
    acronym: "AdA",
    level: "basin",
    function: "planning",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 44, X",
      national_url: PLANALTO_9433,
      verbatim_short: "Elaborate the basin plan for committee approval.",
    },
  },
  {
    actor: "Charging revenue reinvested in basin",
    acronym: "Cobrança",
    level: "basin",
    function: "financing",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 22",
      national_url: PLANALTO_9433,
      verbatim_short: "Charging revenue applied prioritarily in the basin where generated.",
    },
  },
];
