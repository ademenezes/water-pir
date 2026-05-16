import type { KeyInsight } from "../src/types";

// Brazil — key evidence-backed insights for the country dashboard.
// Each insight cites a specific article from a Brazilian federal instrument,
// verified against the canonical Planalto text (see documents/brazil/manifest.json).

const PLANALTO_CF = "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm";
const PLANALTO_9433 = "https://www.planalto.gov.br/ccivil_03/leis/l9433.htm";
const PLANALTO_9984 = "https://www.planalto.gov.br/ccivil_03/leis/l9984.htm";
const PLANALTO_11445 = "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11445.htm";
const FAOLEX_11445 = "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469";
const PLANALTO_14026 = "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14026.htm";

export const BRAZIL_INSIGHTS: KeyInsight[] = [
  {
    title: "Concurrent federal/municipal competence drives sanitation litigation",
    body:
      "The Constitution lists health and housing as concurrent (Art. 23) and grants municipalities local-interest legislation (Art. 30, I). Law 11.445/2007 Art. 8-A confirms municipalities as titulares, while Law 14.026/2020 mandates regionalisation — generating ongoing STF litigation.",
    legal_basis: {
      short: "CF/1988 + Law 11.445/2007 + Law 14.026/2020",
      article: "CF Art. 23 / Art. 30; LNSB Art. 8-A",
      faolex_url: FAOLEX_11445,
      national_url: PLANALTO_11445,
    },
    pir_dimension: "institutions",
    wsip_solution_id: 1,
    severity: "tension",
  },
  {
    title: "ANA reference norms are voluntary — but federal funding is conditional",
    body:
      "Law 9.984/2000 Art. 4-A (added by Marco Legal) gives ANA power to issue national reference norms for sanitation. Art. 4-B makes adoption visible: only regulators on ANA's public list keep access to federal funds and BNDES/Caixa financing.",
    legal_basis: {
      short: "Law 9.984/2000 (per Lei 14.026/2020)",
      article: "Art. 4-A and 4-B",
      national_url: PLANALTO_9984,
    },
    pir_dimension: "regulation",
    wsip_solution_id: 1,
    severity: "strength",
  },
  {
    title: "Water-use charging is mandatory in law, implemented in few basins",
    body:
      "Law 9.433/1997 Art. 19–22 makes water-use charging a core PNRH instrument; Art. 38, VI tasks basin committees with setting values. Revenue must be reinvested in the basin (Art. 22). In practice, charging is operational in roughly seven federal/state basins.",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 19–22; Art. 38, VI",
      national_url: PLANALTO_9433,
    },
    pir_dimension: "financing",
    wsip_solution_id: 7,
    severity: "gap",
  },
  {
    title: "Marco Legal ended direct contracts; sanitation now requires competitive bidding",
    body:
      "Law 14.026/2020 amends Law 11.107/2005 to bar the contrato de programa for the public services of Art. 175 of the Constitution. Combined with Law 11.445/2007 Art. 10-A, every new sanitation contract requires an open competitive process — a generation-defining shift.",
    legal_basis: {
      short: "Law 14.026/2020",
      article: "Art. 16 (amends Lei 11.107/2005)",
      national_url: PLANALTO_14026,
    },
    pir_dimension: "institutions",
    wsip_solution_id: 1,
    severity: "strength",
  },
  {
    title: "Hydraulic-energy potentials are Union goods — siloed from WRM",
    body:
      "CF/1988 Art. 20, VIII lists hydraulic-energy potentials as Union goods, and Art. 21, XII (b) gives the Union the energy concession. The result: ANEEL regulates hydropower while ANA regulates water resources — coordination gaps surface during droughts and reservoir disputes.",
    legal_basis: {
      short: "CF/1988",
      article: "Art. 20, VIII; Art. 21, XII (b)",
      national_url: PLANALTO_CF,
    },
    pir_dimension: "igc",
    wsip_solution_id: 5,
    severity: "tension",
  },
  {
    title: "PNRH bases water management on the basin, not the political unit",
    body:
      "Law 9.433/1997 Art. 1, V declares the river basin the territorial unit for PNRH implementation. Art. 33 lists CNRH, ANA, state councils, basin committees and water agencies as SINGREH members — a decentralised, multi-actor architecture that pre-dates global Solution 7 guidance.",
    legal_basis: {
      short: "Law 9.433/1997",
      article: "Art. 1, V; Art. 33",
      national_url: PLANALTO_9433,
    },
    pir_dimension: "policy",
    wsip_solution_id: 7,
    severity: "strength",
  },
];
