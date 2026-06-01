import type { CountryProfile, Institution, LegalInstrument } from "../src/types";
import { GEORGIA_MANDATES } from "./georgia-mandates";
import { GEORGIA_INSIGHTS } from "./georgia-insights";

// Georgia, water sector PIR snapshot.
// Canonical source is matsne.gov.ge (Legislative Herald of Georgia, the official
// gazette); FAOLEX (https://www.fao.org/faolex/) is cited where the instrument is
// indexed there. Local copies are gitignored; documents/georgia/manifest.json is
// the audit trail. Article numbers are asserted only where confirmed against a
// rendered primary page; for the 2023 Water Resources Management Law, the Land
// Amelioration Law and the 2010 UWSCG order, provisions are named in words and
// pinpoint article numbers are NOT asserted (the matsne/FAOLEX pages are
// JavaScript-rendered). Coverage status legend: green = law + regulator + practice
// broadly aligned; yellow = law exists but implementation/regulation partial;
// red = significant gap (no specific law or regulator); gray = not yet mapped.
// The framework applies countrywide; Abkhazia and the Tskhinvali Region / South
// Ossetia are within Georgia's recognised territory but outside effective national
// administration, recorded as a de-facto governance gap, not a scope exclusion.

const today = "2026-06-01";

const MATSNE_CONSTITUTION = "https://matsne.gov.ge/en/document/view/30346";
const MATSNE_WATER_1997 = "https://matsne.gov.ge/en/document/view/33448";
const MATSNE_GNERC_2019 = "https://matsne.gov.ge/en/document/view/4747785";
const MATSNE_WUO_2019 = "https://matsne.gov.ge/en/document/view/4736322";
const MATSNE_PUBLIC_SAFETY_2014 = "https://matsne.gov.ge/en/document/view/2363013";
const FAOLEX_WRM_2023 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC219653/";
const FAOLEX_GNERC_2019 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC193147/";
const FAOLEX_AMELIORATION = "https://faolex.fao.org/docs/pdf/geo54807.pdf";
const FAOLEX_IRRIGATION_STRATEGY = "https://faolex.fao.org/docs/pdf/geo171443.pdf";
const FAOLEX_CLIMATE = "https://faolex.fao.org/docs/pdf/geo209870.pdf";
const EU_ASSOC_AGREEMENT =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:22014A0830(02)";

// ── Legal instruments (defined once, referenced by cells) ──────────────────────
const I_CONSTITUTION: LegalInstrument = {
  title: "Constitution of Georgia",
  short: "Constitution of Georgia",
  year: 1995,
  type: "constitution",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_CONSTITUTION,
  articles_cited:
    "Art. 5(5) (environmental protection), Art. 29 (right to a healthy environment)",
};

const I_WATER_1997: LegalInstrument = {
  title: "Law of Georgia on Water",
  short: "Law on Water (1997)",
  year: 1997,
  type: "sectoral_law",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_WATER_1997,
  note: "Registration No. 936, adopted 16 Oct 1997. In force but expiring 1 Sept 2026, when the 2023 Water Resources Management Law takes over. State ownership of water bodies; general vs special water use; sanitary protection zones.",
};

const I_WRM_2023: LegalInstrument = {
  title: "Law of Georgia on Water Resources Management",
  short: "Water Resources Management Law (2023)",
  year: 2023,
  type: "framework_law",
  faolex_id: "LEX-FAOC219653",
  faolex_url: FAOLEX_WRM_2023,
  note: "Adopted 30 June 2023; transposes the EU Water Framework Directive (river-basin districts, basin plans, environmental flows, restored special water-use permits). Operative norms bind from 1 Sept 2026 and repeal the 1997 Law on Water. Pinpoint article numbers not asserted (matsne text is JS-rendered).",
};

const I_ENERGY_WATER_2019: LegalInstrument = {
  title: "Law of Georgia on Energy and Water Supply",
  short: "Law on Energy and Water Supply (2019)",
  year: 2019,
  type: "framework_law",
  faolex_id: "LEX-FAOC193147",
  faolex_url: FAOLEX_GNERC_2019,
  national_url: MATSNE_GNERC_2019,
  articles_cited:
    "Art. 1(9) (GNERC water-supply regulation), Art. 3 (licensing terms), Art. 11 (licence requirement)",
};

const I_WUO_2019: LegalInstrument = {
  title: "Law of Georgia on Water Users Organisations",
  short: "Law on Water Users Organisations (2019)",
  year: 2019,
  type: "sectoral_law",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_WUO_2019,
  articles_cited:
    "Art. 3 (irrigation infrastructure), Art. 6 (public-law entity), Art. 7 (founding by >50% of users)",
};

const I_PUBLIC_SAFETY_2014: LegalInstrument = {
  title: "Law of Georgia on Public Safety",
  short: "Law on Public Safety (2014)",
  year: 2014,
  type: "framework_law",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_PUBLIC_SAFETY_2014,
  articles_cited:
    "Art. 5(2) (unified system), Art. 28 (prevention, forecasting, monitoring), Art. 32 (population warning)",
};

const I_AMELIORATION: LegalInstrument = {
  title: "Law of Georgia on Land Amelioration",
  short: "Law on Land Amelioration",
  year: 1997,
  type: "sectoral_law",
  faolex_id: null,
  faolex_url: FAOLEX_AMELIORATION,
  note: "FAO-hosted PDF (geo54807). Assigns state management of irrigation and drainage to the agriculture ministry; addresses water-consumption limits and filtration losses. matsne id and FAOLEX LEX-FAOC record not resolved.",
};

const I_IRRIGATION_STRATEGY: LegalInstrument = {
  title: "Irrigation Strategy for Georgia 2017-2025",
  short: "Irrigation Strategy 2017-2025",
  year: 2017,
  type: "policy",
  faolex_id: null,
  faolex_url: FAOLEX_IRRIGATION_STRATEGY,
  note: "FAO-hosted PDF (geo171443). Documents the post-2012 recentralisation of irrigation under Georgian Amelioration LLC as a single main-system provider.",
};

const I_CLIMATE_2030: LegalInstrument = {
  title: "Georgia's 2030 Climate Change Strategy and 2021-2023 Action Plan",
  short: "Georgia 2030 Climate Strategy",
  year: 2021,
  type: "policy",
  faolex_id: null,
  faolex_url: FAOLEX_CLIMATE,
  note: "FAO-hosted PDF (geo209870). Adaptation priorities include agriculture and water.",
};

const I_EU_AA: LegalInstrument = {
  title: "Association Agreement between the European Union and Georgia",
  short: "EU-Georgia Association Agreement (2014)",
  year: 2014,
  type: "policy",
  faolex_id: null,
  faolex_url: null,
  national_url: EU_ASSOC_AGREEMENT,
  articles_cited:
    "Environmental annex (Water Framework and Drinking Water Directive approximation)",
};

// ── Institutions (defined once, referenced by cells) ───────────────────────────
const INST_MEPA: Institution = {
  name: "Ministry of Environmental Protection and Agriculture",
  acronym: "MEPA",
  role: "policy_maker",
  level: "national",
  url: "https://mepa.gov.ge/",
};
const INST_NEA: Institution = {
  name: "National Environmental Agency",
  acronym: "NEA",
  role: "regulator",
  level: "national",
  url: "https://nea.gov.ge/",
};
const INST_GNERC: Institution = {
  name: "Georgian National Energy and Water Supply Regulatory Commission",
  acronym: "GNERC",
  role: "regulator",
  level: "national",
  url: "https://gnerc.org/",
};
const INST_MRDI: Institution = {
  name: "Ministry of Regional Development and Infrastructure",
  acronym: "MRDI",
  role: "policy_maker",
  level: "national",
  url: "https://mrdi.gov.ge/",
};
const INST_UWSCG: Institution = {
  name: "United Water Supply Company of Georgia",
  acronym: "UWSCG",
  role: "service_provider",
  level: "national",
};
const INST_GWP: Institution = {
  name: "Georgian Water and Power (Georgia Global Utilities)",
  acronym: "GWP",
  role: "service_provider",
  level: "local",
};
const INST_ADJARA: Institution = {
  name: "Batumi Water & Kobuleti Water (Adjara A.R.)",
  role: "service_provider",
  level: "state",
};
const INST_AMELIORATION: Institution = {
  name: "Georgian Amelioration",
  role: "service_provider",
  level: "national",
};
const INST_WUO: Institution = {
  name: "Water Users Organisations",
  acronym: "WUOs",
  role: "user_rep",
  level: "local",
};
const INST_EMA: Institution = {
  name: "Emergency Management Agency",
  acronym: "EMA",
  role: "service_provider",
  level: "national",
};
const INST_NFA: Institution = {
  name: "National Food Agency",
  acronym: "NFA",
  role: "regulator",
  level: "national",
};
const INST_MUNICIPALITIES: Institution = {
  name: "Self-governing municipalities",
  role: "asset_owner",
  level: "local",
};

export const GEORGIA: CountryProfile = {
  code: "GEO",
  name: "Georgia",
  flag_emoji: "🇬🇪",
  intro:
    "Georgia's water sector is in mid-reform. The 1997 Law on Water still governs, but the 2023 Law on Water Resources Management, which transposes the EU Water Framework Directive with river-basin districts, basin plans and a restored special water-use permit regime, takes over from 1 September 2026. Economic regulation is unusual: GNERC, the energy regulator, also sets water-supply tariffs (since 2008) and, from 2026, irrigation tariffs. Urban service is split between privately-owned Georgian Water and Power (Tbilisi and Mtskheta), the weak state-owned United Water Supply Company of Georgia (most other towns) and Adjara's own operators; main-system irrigation is recentralised under state-owned Georgian Amelioration. The framework described here applies countrywide; Abkhazia and the Tskhinvali Region / South Ossetia are within Georgia's recognised territory but outside effective national administration, a de-facto governance gap rather than a legal exclusion.",
  last_updated: today,
  subsectors: [
    // -----------------------------------------------------------------------
    // 1. URBAN WATER SUPPLY & SANITATION
    // -----------------------------------------------------------------------
    {
      key: "wss_urban",
      label: "Urban Water Supply & Sanitation",
      wsip_solutions: [1, 2],
      headline:
        "Urban water is Georgia's most-developed sub-sector, but it is institutionally split: privately-owned GWP serves Tbilisi, Mtskheta and Rustavi; state-owned UWSCG serves most other towns; Adjara runs its own operators. GNERC, unusually, sets tariffs for all of them.",
      reform_lessons: [
        "A single economic regulator for energy and water (GNERC) gives urban tariff-setting unusual coherence, but does not fix the financial weakness of the state utility.",
        "Private operation in the capital (GWP) coexists with a grant-dependent state utility elsewhere, so service quality and cost recovery diverge sharply by territory.",
      ],
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_WATER_1997, I_EU_AA],
          responsible_institutions: [INST_MEPA, INST_MRDI],
          mandate_text:
            "There is no consolidated urban-WSS policy law. Direction is set indirectly: the 1997 Law on Water frames water use, MRDI owns the state utility, and the EU-Georgia Association Agreement commits Georgia to approximate the EU drinking-water and urban-wastewater directives.",
          de_facto_note:
            "OECD and MEPA reviews note the absence of a single national WSS strategy; policy is fragmented across MRDI, MEPA and GNERC.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019],
          responsible_institutions: [INST_GWP, INST_UWSCG, INST_ADJARA, INST_MRDI],
          mandate_text:
            "Urban service is delivered by three actor types: privately-owned GWP (Tbilisi, Mtskheta, Rustavi), state-owned UWSCG (most other urban-type settlements, under MRDI), and Adjara's Batumi and Kobuleti Water companies.",
          de_facto_note:
            "UWSCG, formed in 2010 by merging 66 local companies, is widely assessed as financially weak and grant-dependent, while GWP operates the capital on commercial terms.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_CONSTITUTION],
          responsible_institutions: [INST_MRDI, INST_ADJARA, INST_MUNICIPALITIES],
          mandate_text:
            "Georgia is a unitary state. Urban water service is effectively centralised at national level through UWSCG rather than held by municipalities; Adjara, as an autonomous republic, runs its own operators.",
          de_facto_note:
            "Municipalities have a limited role in water service; in Abkhazia and the Tskhinvali Region / South Ossetia national institutions do not operate.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019],
          responsible_institutions: [INST_GNERC, INST_UWSCG, INST_MRDI],
          mandate_text:
            "GNERC sets tariffs intended to support cost recovery, but urban WSS capital is largely funded from the state budget and donors (World Bank, ADB, EIB, KfW) rather than tariff revenue.",
          de_facto_note:
            "UWSCG tariffs sit below full cost recovery and the utility depends on capital transfers; GWP is closer to commercial viability in the capital.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "green",
          legal_instruments: [I_ENERGY_WATER_2019],
          responsible_institutions: [INST_GNERC, INST_NFA],
          mandate_text:
            "GNERC licenses water-supply service and sets the tariff methodology and per-licensee tariffs (Art. 1(9), 11), giving urban economic regulation real teeth, a relatively rare unified energy-and-water regulator.",
          de_facto_note:
            "Economic regulation is robust, but drinking-water quality regulation is weaker: the government technical regulation on drinking-water quality is not yet adopted (reportedly slipping to 2030), with monitoring assigned to the National Food Agency.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_CLIMATE_2030],
          responsible_institutions: [INST_EMA, INST_MEPA],
          mandate_text:
            "Water-supply emergencies are covered generically by the civil-protection system (2014 Law on Public Safety), and climate adaptation for water is flagged in the 2030 Climate Strategy.",
          de_facto_note:
            "There is no drinking-water-supply-specific contingency or climate-resilience regulation; utility-level resilience planning is nascent.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 2. WASTEWATER, REUSE & DESALINATION
    // -----------------------------------------------------------------------
    {
      key: "wastewater_reuse_desal",
      label: "Wastewater, Reuse & Desalination",
      wsip_solutions: [2],
      headline:
        "Wastewater is Georgia's weakest urban-water link: most collected sewage is discharged untreated, treatment plants are few, and there is no dedicated reuse or desalination framework. EU-accession commitments are the main pressure for change.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "red",
          legal_instruments: [I_WATER_1997, I_EU_AA],
          responsible_institutions: [INST_MEPA, INST_MRDI],
          mandate_text:
            "There is no dedicated wastewater, reuse or desalination policy. The EU-Georgia Association Agreement commits Georgia to approximate the Urban Waste Water Treatment Directive, but no domestic policy instrument operationalises it.",
          de_facto_note:
            "Most urban wastewater is discharged with little or no treatment; reuse and desalination are not on the policy agenda.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "red",
          legal_instruments: [I_ENERGY_WATER_2019],
          responsible_institutions: [INST_UWSCG, INST_GWP, INST_ADJARA],
          mandate_text:
            "Sewage collection and treatment are nominally the responsibility of the same water utilities (GWP, UWSCG, Adjara operators), but treatment infrastructure is sparse and no specialised wastewater institution exists.",
          de_facto_note:
            "Functioning treatment plants are concentrated in Tbilisi and the Adjara coast; most towns collect sewage without treating it.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Intergovernmental responsibility for wastewater treatment is not clearly defined in current law and is not mapped here.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [I_EU_AA],
          responsible_institutions: [INST_MRDI],
          mandate_text:
            "Wastewater-treatment capital depends almost entirely on donor finance (EU, EIB, ADB, KfW); there is no domestic financing or charging framework for treatment.",
          de_facto_note:
            "Treatment investment is project-driven and partial; tariffs do not fund sewage treatment.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_WATER_1997, I_WRM_2023],
          responsible_institutions: [INST_NEA, INST_MEPA],
          mandate_text:
            "Effluent discharge is regulated under environmental norms administered by NEA; the 2023 Water Resources Management Law will tighten water-quality and environmental-flow protection once operative from 1 September 2026.",
          de_facto_note:
            "Monitoring and enforcement of discharge limits are weak; the strengthened 2023 regime is not yet in force.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Climate and shock resilience of wastewater systems is not addressed in current instruments and is not mapped here.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 3. RURAL WATER SUPPLY & SANITATION
    // -----------------------------------------------------------------------
    {
      key: "wss_rural",
      label: "Rural Water Supply & Sanitation",
      wsip_solutions: [3],
      headline:
        "Rural water is Georgia's biggest blind spot. UWSCG's mandate covers urban-type settlements, leaving dispersed villages to self-supply with no dedicated rural policy, institution, financing window or quality oversight.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "red",
          legal_instruments: [I_WATER_1997],
          responsible_institutions: [INST_MRDI, INST_MEPA],
          mandate_text:
            "There is no dedicated rural-WSS policy. Rural water falls between UWSCG's urban-type mandate and unserved villages, with no programmatic framework for dispersed settlements.",
          de_facto_note:
            "Many rural settlements rely on self-supply (wells, springs) outside any utility.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_UWSCG, INST_MUNICIPALITIES],
          mandate_text:
            "No institution clearly owns rural water service. UWSCG serves urban-type settlements; dispersed rural areas are largely unserved and there is no community-management model at national scale.",
          de_facto_note:
            "Unlike comparators with formal community-operator networks, Georgia has no equivalent rural-service institution.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Responsibility for rural water service is not clearly allocated across national, Adjara or municipal levels and is not mapped here.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_MRDI],
          mandate_text:
            "Rural water investment is sporadic and donor or project-driven; there is no programmatic rural financing window.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_GNERC, INST_NFA],
          mandate_text:
            "Rural and self-supply systems sit outside GNERC's licensed perimeter and outside effective drinking-water-quality oversight.",
          de_facto_note:
            "Rural water quality is essentially unregulated; the missing drinking-water standard compounds the gap.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Rural water resilience to drought and contamination is not addressed in current instruments and is not mapped here.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 4. FARMER-LED / DECENTRALIZED IRRIGATION
    // -----------------------------------------------------------------------
    {
      key: "irrigation_decentralized",
      label: "Farmer-Led / Decentralized Irrigation",
      wsip_solutions: [4],
      headline:
        "Farmer-led irrigation is mostly informal. The 2019 Law on Water Users Organisations creates a legal route for membership-based tertiary irrigation, but uptake is limited and most on-farm watering happens outside any organisation, financing window or permit.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_WUO_2019, I_IRRIGATION_STRATEGY, I_AMELIORATION],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "The 2019 Law on Water Users Organisations provides a legal route for farmer-led tertiary irrigation, and the Irrigation Strategy 2017-2025 recognises on-farm needs, but no active programme drives organisation formation.",
          de_facto_note:
            "Policy attention concentrates on the recentralised main system; farmer-led irrigation is acknowledged but not programmatically supported.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_WUO_2019],
          responsible_institutions: [INST_WUO, INST_AMELIORATION],
          mandate_text:
            "Water Users Organisations may form as public-law entities when more than 50% of a service area's users join (Art. 6, 7), taking over tertiary canals from Georgian Amelioration.",
          de_facto_note:
            "In practice few WUOs have formed and most on-farm irrigation is managed informally by individual farmers.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Coordination between Water Users Organisations, municipalities and national Georgian Amelioration is not formally allocated and is not mapped here.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_WUO, INST_MRDI],
          mandate_text:
            "There is no dedicated financing window for farmer-led irrigation. Water Users Organisations are meant to fund tertiary systems from member fees, which thin membership leaves them unable to raise.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "red",
          legal_instruments: [I_WRM_2023],
          responsible_institutions: [INST_NEA, INST_GNERC],
          mandate_text:
            "On-farm abstraction is effectively unregulated: small-scale agricultural use falls outside permits, the restored special water-use permit regime is not operative until 1 September 2026, and GNERC's irrigation tariff covers the main system, not farmer-led schemes.",
          de_facto_note:
            "Until 2026 there is no operative abstraction control over farmer-led irrigation, and quality of return flows is unmonitored.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "red",
          legal_instruments: [I_CLIMATE_2030],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "Drought resilience for rain-fed and farmer-led irrigated farming is flagged in the 2030 Climate Strategy but has no operational instrument, water-saving incentive or on-farm efficiency programme.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 5. CENTRALIZED / PUBLIC IRRIGATION
    // -----------------------------------------------------------------------
    {
      key: "irrigation_centralized",
      label: "Centralized / Public Irrigation",
      wsip_solutions: [5],
      headline:
        "Main-system irrigation and drainage are recentralised under state-owned Georgian Amelioration as the single provider. Rehabilitation is World Bank-backed, and GNERC begins setting an irrigation service tariff from April 2026, a first move toward cost recovery.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_AMELIORATION, I_IRRIGATION_STRATEGY],
          responsible_institutions: [INST_MEPA, INST_AMELIORATION],
          mandate_text:
            "The Law on Land Amelioration assigns state management of irrigation and drainage, and the Irrigation Strategy 2017-2025 sets the post-2012 recentralisation direction under a single main-system provider.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_AMELIORATION],
          responsible_institutions: [INST_AMELIORATION, INST_MEPA],
          mandate_text:
            "State-owned Georgian Amelioration operates the main irrigation and drainage systems nationwide as the single provider, under MEPA's oversight.",
          de_facto_note:
            "Much of the network is ageing and operating below design command area; rehabilitation is ongoing under the World Bank GRAIL project.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_WUO_2019],
          responsible_institutions: [INST_AMELIORATION, INST_WUO],
          mandate_text:
            "Main systems sit with national Georgian Amelioration; tertiary distribution is meant to pass to local Water Users Organisations under the 2019 law.",
          de_facto_note:
            "The handover of tertiary canals to user organisations is largely unrealised, so the national company effectively runs the chain end to end.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [I_IRRIGATION_STRATEGY, I_ENERGY_WATER_2019],
          responsible_institutions: [INST_AMELIORATION, INST_GNERC],
          mandate_text:
            "Rehabilitation is funded from the state budget and the World Bank (GRAIL project); GNERC sets an irrigation service tariff that applies from 1 April 2026, a first step toward cost recovery.",
          de_facto_note:
            "Irrigation service charges have historically covered only a fraction of operating cost, leaving the system reliant on budget transfers.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019, I_WRM_2023],
          responsible_institutions: [INST_GNERC, INST_NEA],
          mandate_text:
            "Economic regulation arrives in 2026 through the GNERC irrigation tariff; bulk abstraction for irrigation will fall under the 2023 special water-use permit regime once it is operative.",
          de_facto_note:
            "Neither the irrigation tariff nor the abstraction-permit regime is in force yet, so regulation of the main system is still prospective.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_CLIMATE_2030, I_IRRIGATION_STRATEGY],
          responsible_institutions: [INST_AMELIORATION, INST_MEPA],
          mandate_text:
            "Irrigation is central to climate adaptation in the 2030 Climate Strategy; reducing conveyance losses and modernising ageing infrastructure are the main resilience tasks.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 6. FLOOD & DROUGHT RISK MANAGEMENT
    // -----------------------------------------------------------------------
    {
      key: "flood_drought",
      label: "Flood & Drought Risk Management",
      wsip_solutions: [6],
      headline:
        "Flood and drought response sits inside the 2014 civil-protection framework run by the Emergency Management Agency. Hydrometeorological monitoring by the National Environmental Agency is thin, and EU-funded modernisation of the observation network is still under way.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_CLIMATE_2030],
          responsible_institutions: [INST_EMA, INST_MEPA],
          mandate_text:
            "Disaster risk including floods and drought is framed by the 2014 Law on Public Safety, with climate-adaptation priorities for water set out in the 2030 Climate Strategy.",
          de_facto_note:
            "There is no standalone water-related disaster-risk-reduction strategy; flood and drought sit within generic civil-protection and climate policy.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014],
          responsible_institutions: [INST_EMA, INST_NEA],
          mandate_text:
            "The Emergency Management Agency runs the unified civil-protection system (Art. 5(2)); hydrometeorological forecasting and monitoring sit with the National Environmental Agency under MEPA.",
          de_facto_note:
            "The hydrometeorological observation network is sparse, weakening the forecasting base for early warning.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014],
          responsible_institutions: [INST_EMA, INST_MUNICIPALITIES, INST_ADJARA],
          mandate_text:
            "Civil protection is nationally led through the Emergency Management Agency, with response roles for municipalities and the Adjara autonomous republic; coordination is centralised.",
          de_facto_note:
            "Municipal response capacity is uneven; in Abkhazia and the Tskhinvali Region / South Ossetia national agencies do not operate.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_EMA, INST_MRDI],
          mandate_text:
            "There is no dedicated, programmatic flood-and-drought financing instrument. Flood-protection works and disaster response are funded ad hoc from the state budget and donors.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014],
          responsible_institutions: [INST_EMA, INST_NEA],
          mandate_text:
            "Emergency prevention through forecasting and monitoring (Art. 28) and population warning (Art. 32) are mandated, but monitoring-network density and early-warning coverage remain limited.",
          de_facto_note:
            "Flood-hazard mapping and basin-scale early-warning systems are incomplete; EU-funded hydromet modernisation is ongoing.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_CLIMATE_2030],
          responsible_institutions: [INST_EMA, INST_MEPA],
          mandate_text:
            "Resilience rests on the civil-protection system plus climate-adaptation planning; structural flood defences and drought-preparedness measures are being strengthened with donor support.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 7. WATER RESOURCES MANAGEMENT (BASIN / SURFACE)
    // -----------------------------------------------------------------------
    {
      key: "wrm_basin",
      label: "Water Resources Management (Basin / Surface)",
      wsip_solutions: [7],
      headline:
        "The flagship reform. The 2023 Law on Water Resources Management restores river-basin districts, basin plans and a special water-use permit regime to transpose the EU Water Framework Directive, but its operative norms bind only from 1 September 2026, so the new architecture does not yet exist.",
      reform_lessons: [
        "Transposing the EU Water Framework Directive gives Georgia a modern basin-management law on paper, but districts, councils and plans do not exist until the 2026 commencement, so the reform is still entirely prospective.",
        "Sequencing matters: the permit regime and environmental-flow norms were legislated ahead of the monitoring networks and institutions needed to run them, the capacity gap the transition period to 2026 is meant to close.",
      ],
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_WATER_1997, I_EU_AA],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "The 2023 Water Resources Management Law sets a WFD-aligned basin-management policy (river-basin districts, basin plans, environmental flows), driven by the EU-Georgia Association Agreement; until 1 September 2026 the 1997 Law on Water still governs.",
          de_facto_note:
            "The policy is adopted but dormant: the operative river-basin regime begins only in 2026, so today's practice still runs on the older 1997 framework.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023],
          responsible_institutions: [INST_MEPA, INST_NEA],
          mandate_text:
            "MEPA is the lead water authority and the National Environmental Agency the implementing body; the river-basin management districts and councils created by the 2023 law are not yet established.",
          de_facto_note:
            "Basin-level institutions exist only on paper until 2026; capacity to run basin planning and permitting is still being built with EU support.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_CONSTITUTION],
          responsible_institutions: [INST_MEPA, INST_NEA, INST_ADJARA],
          mandate_text:
            "Basin management will group Georgia's seven river basins into management districts with consultative councils under MEPA, cutting across municipal and Adjara boundaries rather than following them.",
          de_facto_note:
            "Districts and councils are not yet established (operative from 2026); in Abkhazia and the Tskhinvali Region / South Ossetia national institutions cannot operate, leaving parts of the Enguri and other basins outside effective national management.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [I_WRM_2023],
          responsible_institutions: [INST_MEPA, INST_NEA],
          mandate_text:
            "There is no abstraction-charging or basin self-financing mechanism. The 2023 law restores permits but gives basin management no dedicated revenue source, so it will depend on the central budget.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_WATER_1997],
          responsible_institutions: [INST_NEA],
          mandate_text:
            "Surface-water abstraction was largely uncontrolled after special water-use permits were abolished in 2008; the 2023 law restores a special water-use permit regime administered by the National Environmental Agency, operative from 1 September 2026.",
          de_facto_note:
            "Between 2008 and the 2026 commencement, abstraction is effectively unlicensed, so the regulatory mandate exists in law but not yet in practice.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_CLIMATE_2030],
          responsible_institutions: [INST_MEPA, INST_NEA],
          mandate_text:
            "Environmental-flow protection and basin planning under the 2023 law are the main resilience tools, reinforced by the 2030 Climate Strategy; neither is operational yet.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 8. GROUNDWATER MANAGEMENT
    // -----------------------------------------------------------------------
    {
      key: "wrm_groundwater",
      label: "Groundwater Management",
      wsip_solutions: [7],
      headline:
        "Groundwater is the thinnest link in water resources management. The 2023 law's restored permit regime will cover abstraction from 2026, but until then groundwater use is largely unlicensed, unmonitored and unmapped as a distinct resource.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_WATER_1997],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "Groundwater falls under the same state-ownership and water-use framework as surface water; the 2023 law brings it into the basin-management and special water-use permit regime, but not before 1 September 2026.",
          de_facto_note:
            "There is no groundwater-specific policy or aquifer-protection strategy; it is treated as part of general water resources.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "red",
          legal_instruments: [I_WRM_2023],
          responsible_institutions: [INST_NEA],
          mandate_text:
            "No institution actively manages groundwater as a distinct resource. The National Environmental Agency will license abstraction once the 2023 regime is operative, but groundwater monitoring and assessment capacity is minimal.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Intergovernmental responsibility for groundwater is not separately allocated and is not mapped here.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "There is no charging or financing mechanism specific to groundwater abstraction or aquifer protection.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "red",
          legal_instruments: [I_WRM_2023],
          responsible_institutions: [INST_NEA],
          mandate_text:
            "Groundwater abstraction has been effectively unregulated since special water-use permits were abolished in 2008; the restored permit regime does not bite until 1 September 2026.",
          de_facto_note:
            "Unlicensed wells are common and abstraction volumes are not systematically recorded.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "gray",
          legal_instruments: [],
          responsible_institutions: [],
          mandate_text:
            "Aquifer-level resilience, recharge and over-abstraction risk are not assessed in current instruments and are not mapped here.",
          last_verified_date: today,
        },
      ],
    },
  ],
  mandate_records: GEORGIA_MANDATES,
  key_insights: GEORGIA_INSIGHTS,
};
