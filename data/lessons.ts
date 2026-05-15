// Curated "lessons from practice" drawn from the World Bank's WSS PIR Synthesis
// (BOSIB, August 2022) and the WBG WSIP (P165586, December 2025) annexes.
// Each lesson is a country case that illustrates how a specific reform changed
// outcomes — useful as a teaching aid on the home page and discoverable from
// the country comparator.

export interface Lesson {
  key: string;
  country_code: string; // ISO alpha-3
  country_flag: string;
  country_name: string;
  /** Sub-sector key, if the lesson maps to a specific cell in the matrix. */
  subsector_key?: string;
  /** WSIP solution(s) this lesson illustrates. */
  wsip_solutions: number[];
  /** PIR dimension this lesson primarily speaks to. */
  pir_dimension: string;
  title: string;
  body: string;
  source: string; // Short citation
}

export const LESSONS: Lesson[] = [
  {
    key: "brazil_tariff_reform",
    country_code: "BRA",
    country_flag: "🇧🇷",
    country_name: "Brazil",
    subsector_key: "wss_urban",
    wsip_solutions: [1],
    pir_dimension: "financing",
    title:
      "Cost-recovery tariffs and transparent methodology mobilised private capital",
    body:
      "Brazil's move toward cost-recovery tariffs, national guidelines, and stronger utility balance sheets — combined with ANA's transparent tariff methodology under Law 14.026 — depoliticised tariff adjustments and supported a pipeline of commercially-viable WSS projects. Investor trust grew while affordability safeguards were preserved.",
    source: "WSIP (P165586) Annex III, Solution 1",
  },
  {
    key: "kenya_wasreb",
    country_code: "KEN",
    country_flag: "🇰🇪",
    country_name: "Kenya",
    subsector_key: "wss_urban",
    wsip_solutions: [1, 3],
    pir_dimension: "regulation",
    title: "WASREB's pro-poor performance indicators changed utility behaviour",
    body:
      "Kenya's national WSS regulator WASREB introduced explicit pro-poor key performance indicators (e.g. proportion of low-income population served, water kiosk pricing). Public benchmarking against these indicators shifted utility focus — peri-urban access improved without amending the underlying constitutional devolution.",
    source: "BOSIB (WSS PIR Synthesis 2022) Box 6.1",
  },
  {
    key: "colombia_cra",
    country_code: "COL",
    country_flag: "🇨🇴",
    country_name: "Colombia",
    subsector_key: "wss_urban",
    wsip_solutions: [1],
    pir_dimension: "regulation",
    title:
      "25 years of regulatory cycles turned CRA into a leading WSS regulator",
    body:
      "Colombia's Comisión de Regulación de Agua (CRA) was strengthened over 25 years through carefully timed regulatory cycles — revising rules every few years to absorb new lessons and reflect shocks (climate, COVID-19). The Colombia trajectory is the textbook case of incremental, long-term PIR reform.",
    source: "BOSIB Figure 6.1; WSIP P165586 Annex III",
  },
  {
    key: "zambia_1997_act",
    country_code: "ZMB",
    country_flag: "🇿🇲",
    country_name: "Zambia",
    subsector_key: "wss_urban",
    wsip_solutions: [1],
    pir_dimension: "policy",
    title: "A water law that triggered de-jure / de-facto reform",
    body:
      "Zambia's 1997 Water Supply and Sanitation Act expanded utility mandates from sewerage to include on-site sanitation. The National Water and Sanitation Council translated the law into clarifying regulations, licences and targets — closing the gap between legislative intent and operational practice.",
    source: "BOSIB Box 2.2; Figure 1.3",
  },
  {
    key: "senegal_acwa",
    country_code: "SEN",
    country_flag: "🇸🇳",
    country_name: "Senegal",
    subsector_key: "wastewater_reuse_desal",
    wsip_solutions: [2],
    pir_dimension: "financing",
    title: "First desalination plant — IDA-IFC-MIGA blended de-risking",
    body:
      "Senegal's first desalination plant (4 million beneficiaries) combined WB IDA to make the plant financially viable, IFC investment to bring in private capital, and potential MIGA guarantees against political and payment risk — a template for high-stake bulk-water PPPs in fiscally-constrained markets.",
    source: "WSIP P165586 Figure 14",
  },
];

export function getLesson(key: string): Lesson | undefined {
  return LESSONS.find((l) => l.key === key);
}
