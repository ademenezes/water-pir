import type { CountryProfile, Institution, LegalInstrument } from "../src/types";
import { GEORGIA_MANDATES } from "./georgia-mandates";
import { GEORGIA_INSIGHTS } from "./georgia-insights";
import { GEORGIA_TARGETS } from "./georgia-targets";
import { GEORGIA_MONITORING } from "./georgia-monitoring";

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

const today = "2026-06-10";

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
// WSS Vision & Policy Statement (MRDI, Nov 2021): published as an English unofficial
// translation on the ministry file server (Georgian-language path, percent-encoded).
const WSS_VISION_2021 =
  "https://moi.gov.ge/files/1/%E1%83%A1%E1%83%94%E1%83%A5%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%90/Vision%20and%20Policy.pdf";
// Drinking-water Technical Regulation, Govt Decree N58 (15 Jan 2014): matsne is
// canonical (Georgian-only; not FAOLEX-indexed). The WSS Vision's Appendix 3
// independently cites this decree as the in-force drinking-water-quality standard.
const MATSNE_DRINKING_N58 = "https://matsne.gov.ge/ka/document/view/2196792";
const MATSNE_HIGH_MOUNTAIN_2015 = "https://matsne.gov.ge/en/document/view/2924386";

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
  articles_cited:
    "Art. 6.2 (MEPA competence), Art. 16–17 (special water-use permits), Art. 21–22 (basin districts), Art. 23–24 (six-year basin plans), Art. 25 (consultative basin councils), Art. 26–27 (water-status standards), Art. 30 (urban-wastewater discharge), Art. 31 (control bodies)",
  note: "Adopted 30 June 2023; transposes the EU Water Framework Directive (river-basin districts, basin plans, environmental flows, restored special water-use permits). Operative norms bind from 1 Sept 2026 and repeal the 1997 Law on Water. Article numbers read 2026-06-10 from the consolidated Georgian full text (unofficial translation of article headings); see documents/georgia/manifest.json.",
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
  faolex_id: "LEX-FAOC193150",
  faolex_url: "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC193150/",
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

const I_WSS_VISION_2021: LegalInstrument = {
  title: "Georgia: Water Supply and Sanitation — Vision and Policy Statement",
  short: "WSS Vision & Policy (2021)",
  year: 2021,
  type: "policy",
  faolex_id: null,
  faolex_url: null,
  national_url: WSS_VISION_2021,
  articles_cited:
    "Paras 10, 15 (2030 universal-access goals; 24/7-supply target), para 50 + fn 7 (GEOSTAT-2020 access baseline 77.6% / 79.2%)",
  note: "MRDI, November 2021; the first national WSS policy of its kind, published as an English unofficial translation. A vision/policy statement, not a binding WSS framework law. MRDI was reorganised in 2025 and its WSS functions passed to the Ministry of Infrastructure of Georgia (moi.gov.ge), which now hosts this document.",
};

const I_DRINKING_WATER_N58: LegalInstrument = {
  title:
    "Technical Regulation on Drinking Water (Government of Georgia Decree No. 58)",
  short: "Drinking-water Technical Regulation (2014)",
  year: 2014,
  type: "regulation",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_DRINKING_N58,
  note: "Govt Decree N58, dated 15 Jan 2014; sets drinking-water-quality standards. matsne is canonical (Georgian only; not FAOLEX-indexed); cited as in force in the WSS Vision's Appendix 3. The EU-aligned revision of the standard is reportedly pending to ~2030.",
};

const I_HIGH_MOUNTAIN_2015: LegalInstrument = {
  title: "Law of Georgia on the Development of High Mountainous Regions",
  short: "High Mountainous Regions Law (2015)",
  year: 2015,
  type: "sectoral_law",
  faolex_id: null,
  faolex_url: null,
  national_url: MATSNE_HIGH_MOUNTAIN_2015,
  note: "No. 4036-RS, adopted 16 Jul 2015. Framework for the socio-economic development of high-mountain settlements; the legal hook for prioritising rural / high-mountain service obligations. The implementing development strategy is not separately citable online.",
};

// ── Water-specific subsidiary instruments ──────────────────────────────────────
// Enumerated from the FAOLEX water-area corpus for Georgia (query AREA:WA AND
// CC:GEO, non-repealed; 59 records on 2026-06-01) and cross-checked against the
// OECD/MEPA National Policy Dialogue review (Jan 2024). Each FAOLEX id below was
// returned by the FAOLEX query endpoint itself, so the ids are primary-verified;
// the detail pages are JavaScript-rendered, so pinpoint article numbers are not
// asserted. faolexUrl() builds the canonical detail URL from a record id.
const faolexUrl = (id: string) =>
  `https://www.fao.org/faolex/results/details/en/c/${id}/`;

const I_SUBSOIL_1996: LegalInstrument = {
  title: "Law of Georgia on Subsoil",
  short: "Law on Subsoil (1996)",
  year: 1996,
  type: "sectoral_law",
  faolex_id: "LEX-FAOC031883",
  faolex_url: faolexUrl("LEX-FAOC031883"),
  articles_cited:
    "Art. 4 (groundwater as a mineral-resource type), Art. 6 (subsoil use needs a licence; groundwater-regime monitoring exempt, Art. 6.3), Art. 7.6 (groundwater-deposit sanitary-protection zone), Art. 10.2(e) (underground-water licence up to 25 years)",
  note: "No. 242-IIS, adopted 17 May 1996. Treats underground water (potable, mineral, thermal, industrial, technical) as a licensed subsoil resource under the National Agency of Subsoil Resources. General and agricultural groundwater abstraction falls under the water-use regime, not the subsoil licence. Article numbers read 2026-06-10 from the matsne English full text.",
};

const I_GROUNDWATER_RESERVES_2017: LegalInstrument = {
  title:
    "Order No. 42 of 2017 of the Minister of Environment and Natural Resources on Guidelines for Classification and Drafting Reports for Assessment of Reserves and Predicted Resources of Underground Water",
  short: "Underground-water reserves order (2017)",
  year: 2017,
  type: "regulation",
  faolex_id: "LEX-FAOC174852",
  faolex_url: faolexUrl("LEX-FAOC174852"),
  note: "Classifies and assesses reserves of potable, mineral, industrial, technical and thermal underground water; the basis for groundwater-reserve accounting.",
};

const I_GROUNDWATER_SANITARY_2019: LegalInstrument = {
  title:
    "Resolution No. 161 of 2019 of the Government of Georgia on Rules for Determining and Approving Sanitary Protection Zones of Groundwater Objects under Mineral Extraction Licence",
  short: "Groundwater sanitary zones (2019)",
  year: 2019,
  type: "resolution",
  faolex_id: "LEX-FAOC193838",
  faolex_url: faolexUrl("LEX-FAOC193838"),
  note: "Sets sanitary protection zones around groundwater objects subject to a mineral-extraction licence.",
};

const I_ENGINEERING_PROTECTION_2000: LegalInstrument = {
  title:
    "Law of Georgia on Regulation and Engineering Protection of Seas, Water Objects and River Coastlines",
  short: "Engineering Protection of Water Objects Law (2000)",
  year: 2000,
  type: "sectoral_law",
  faolex_id: "LEX-FAOC170449",
  faolex_url: faolexUrl("LEX-FAOC170449"),
  note: "No. 576-IS, adopted 27 Oct 2000. Governs engineering protection of river coastlines, water objects and the sea coast against flooding and bank erosion, and assigns flood-defence and bank-protection works.",
};

const I_GNERC_TARIFF_2017: LegalInstrument = {
  title:
    "Resolution No. 21 of 2017 of GNERC on the Methodology of Calculating Water Supply Tariffs",
  short: "GNERC water-tariff methodology (2017)",
  year: 2017,
  type: "resolution",
  faolex_id: "LEX-FAOC187453",
  faolex_url: faolexUrl("LEX-FAOC187453"),
  note: "Methodology for calculating drinking-water-supply tariffs; the basis for per-licensee water tariffs (GWP, UWSCG, Adjara operators).",
};

const I_GNERC_LOSSES_2017: LegalInstrument = {
  title:
    "Resolution No. 45 of 2017 of GNERC on Calculating Normative Losses of Potable Water",
  short: "GNERC normative water-loss rule (2017)",
  year: 2017,
  type: "resolution",
  faolex_id: "LEX-FAOC187451",
  faolex_url: faolexUrl("LEX-FAOC187451"),
  note: "Rule for calculating the normative (allowed) losses of potable water, an input to the tariff methodology.",
};

const I_GNERC_AMELIORATION_2011: LegalInstrument = {
  title: "Resolution No. 2 of 2011 of GNERC on Tariffs for Amelioration Services",
  short: "GNERC amelioration-tariff rule (2011)",
  year: 2011,
  type: "resolution",
  faolex_id: "LEX-FAOC187452",
  faolex_url: faolexUrl("LEX-FAOC187452"),
  note: "Standing tariff instrument for amelioration (irrigation and drainage) services, predating the revised irrigation tariffs that apply from 1 April 2026.",
};

const I_SEWERAGE_DISCHARGE_2018: LegalInstrument = {
  title:
    "Resolution No. 431 of 2018 of the Government of Georgia on Rules for Discharging and Receiving Water Flowing into the Sewerage System and Permitted Limits of Pollutants",
  short: "Sewerage discharge-limits rule (2018)",
  year: 2018,
  type: "resolution",
  faolex_id: "LEX-FAOC181491",
  faolex_url: faolexUrl("LEX-FAOC181491"),
  note: "Rules for discharging into and receiving water from the sewerage system, with permitted pollutant limits; the operative urban-wastewater discharge standard.",
};

const I_SURFACE_CONTAMINANT_2013: LegalInstrument = {
  title:
    "Resolution No. 414 of 2013 of the Government of Georgia on Calculation of Permitted Limits of Contaminants in Waters Flowing into Surface Water Objects",
  short: "Surface-water contaminant-limits rule (2013)",
  year: 2013,
  type: "resolution",
  faolex_id: "LEX-FAOC167616",
  faolex_url: faolexUrl("LEX-FAOC167616"),
  note: "Method for calculating permitted limits of contaminants in waters discharged to surface water objects.",
};

const I_PERMIT_2005: LegalInstrument = {
  title:
    "Resolution No. 137 of 2005 of the Government of Georgia on Rules for Issuance of Permits for Extracting Water from and Releasing Water into Surface Water Objects",
  short: "Surface-water permit rule (2005)",
  year: 2005,
  type: "resolution",
  faolex_id: "LEX-FAOC167937",
  faolex_url: faolexUrl("LEX-FAOC167937"),
  note: "Legacy rules for issuing permits to extract water from, and release water into, surface water objects; predates the 2008 deregulation of special water use and the 2023 restored permit regime.",
};

const I_SURFACE_POLLUTION_2013: LegalInstrument = {
  title:
    "Resolution No. 425 of 2013 of the Government of Georgia on Protection of Surface Waters of Georgia from Pollution",
  short: "Surface-water pollution-protection rule (2013)",
  year: 2013,
  type: "resolution",
  faolex_id: "LEX-FAOC167680",
  faolex_url: faolexUrl("LEX-FAOC167680"),
  note: "Measures for protecting Georgia's surface waters from pollution.",
};

const I_WATER_PROTECTION_ZONES_2013: LegalInstrument = {
  title:
    "Resolution No. 440 of 2013 of the Government of Georgia on Water Protection Zones",
  short: "Water-protection-zones rule (2013)",
  year: 2013,
  type: "resolution",
  faolex_id: "LEX-FAOC167673",
  faolex_url: faolexUrl("LEX-FAOC167673"),
  note: "Establishes water-protection zones along water bodies.",
};

const I_IRRIGATION_REGIME_2023: LegalInstrument = {
  title:
    "Order No. 2-686 of 2023 of the Minister of Environmental Protection and Agriculture on Rules for the Water-Supply Regime and Irrigation Regulations",
  short: "Irrigation-regime order (2023)",
  year: 2023,
  type: "regulation",
  faolex_id: "LEX-FAOC219649",
  faolex_url: faolexUrl("LEX-FAOC219649"),
  note: "Rules for the water-supply regime and irrigation regulations operated by Georgian Amelioration.",
};

const I_AMELIORATION_SYSTEMS_2013: LegalInstrument = {
  title:
    "Resolution No. 409 of 2013 of the Government of Georgia on Technical Use of Amelioration Systems",
  short: "Amelioration-systems use rule (2013)",
  year: 2013,
  type: "resolution",
  faolex_id: "LEX-FAOC167725",
  faolex_url: faolexUrl("LEX-FAOC167725"),
  note: "Rules for the technical use of amelioration (irrigation and drainage) systems.",
};

const I_IRRIGATION_SERVICE_2021: LegalInstrument = {
  title:
    "Order No. 2-268 of 2021 of the Minister of Environmental Protection and Agriculture on Terms of Irrigation Service Agreements with Primary Water Users and Water User Organisations",
  short: "Irrigation-service-agreement order (2021)",
  year: 2021,
  type: "regulation",
  faolex_id: "LEX-FAOC202261",
  faolex_url: faolexUrl("LEX-FAOC202261"),
  note: "Terms of irrigation-service agreements between Georgian Amelioration and primary water users / Water Users Organisations.",
};

const I_WUO_CHARTER_2020: LegalInstrument = {
  title:
    "Order No. 2-531 of 2020 of the Minister of Environmental Protection and Agriculture on the Template Charter for a Water User Organisation",
  short: "WUO charter-template order (2020)",
  year: 2020,
  type: "regulation",
  faolex_id: "LEX-FAOC196555",
  faolex_url: faolexUrl("LEX-FAOC196555"),
  note: "Template charter for Water Users Organisations, an implementing order under the 2019 WUO Law.",
};

const I_WUO_REGISTRY_2020: LegalInstrument = {
  title:
    "Order No. 2-569 of 2020 of the Minister of Environmental Protection and Agriculture on Rules for Maintaining the Water User Organisations' Registry",
  short: "WUO registry order (2020)",
  year: 2020,
  type: "regulation",
  faolex_id: "LEX-FAOC205316",
  faolex_url: faolexUrl("LEX-FAOC205316"),
  note: "Rules for maintaining the Water Users Organisations registry, an implementing order under the 2019 WUO Law.",
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
const INST_MOI: Institution = {
  // Successor to the Ministry of Regional Development and Infrastructure (MRDI),
  // which was reorganised in 2025; the water-supply / UWSCG functions sit here.
  name: "Ministry of Infrastructure of Georgia",
  acronym: "MoI",
  role: "policy_maker",
  level: "national",
  url: "https://moi.gov.ge/en",
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
const INST_SUBSOIL: Institution = {
  name: "National Agency of Subsoil Resources",
  acronym: "NASR",
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
        "Urban water is Georgia's most-developed sub-sector, but it is institutionally split: privately-owned GWP serves Tbilisi and Mtskheta; the separately-licensed Rustavi Water and the weak state-owned UWSCG serve most other towns; Adjara runs its own operators. GNERC, unusually, sets tariffs for all of them.",
      reform_lessons: [
        "A single economic regulator for energy and water (GNERC) gives urban tariff-setting unusual coherence, but does not fix the financial weakness of the state utility.",
        "Private operation in the capital (GWP) coexists with a grant-dependent state utility elsewhere, so service quality and cost recovery diverge sharply by territory.",
      ],
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [I_WSS_VISION_2021, I_WATER_1997, I_EU_AA],
          responsible_institutions: [INST_MOI, INST_MEPA],
          mandate_text:
            "A national WSS policy now exists: the Water Supply and Sanitation Vision and Policy Statement (MRDI, November 2021) sets 2030 universal-access goals and a 24/7-supply target (cities by end-2025, rural by end-2030). It is a vision/policy statement rather than a binding WSS framework law; the 1997 Law on Water still frames water use, the Ministry of Infrastructure (the 2025 successor to MRDI) owns the state utility, and the EU-Georgia Association Agreement commits Georgia to approximate the EU drinking-water and urban-wastewater directives.",
          de_facto_note:
            "The 2021 WSS Vision closes the long-noted gap of a single national WSS policy, but it is an unofficial-translation policy statement, not enforceable framework law; delivery still spans the Ministry of Infrastructure (ex-MRDI), MEPA and GNERC with no binding WSS statute.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019, I_WSS_VISION_2021],
          responsible_institutions: [INST_GWP, INST_UWSCG, INST_ADJARA, INST_MOI],
          mandate_text:
            "Urban service is delivered by three actor types: privately-owned GWP (Tbilisi and Mtskheta, the latter merged into GWP), state-owned UWSCG (most other urban-type settlements, under the Ministry of Infrastructure), and Adjara's Batumi and Kobuleti Water companies.",
          de_facto_note:
            "The WSS Vision's licensed-utility roster (Appendix 2, Table 1) lists eight licensed operators, GWP (~1.2M people, Mtskheta merged in), UWSCG (~0.8M), Rustavi Water (~125k), Batumi Water (~160k), Kobuleti Water (~16k) and the small Marneuli, Sachkhere and Soguri companies; municipalities' non-licensed utilities serve mostly rural areas. UWSCG, formed in 2010 by merging 66 local companies, is widely assessed as financially weak and grant-dependent, while GWP operates the capital on commercial terms.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_CONSTITUTION],
          responsible_institutions: [INST_MOI, INST_ADJARA, INST_MUNICIPALITIES],
          mandate_text:
            "Georgia is a unitary state. Urban water service is effectively centralised at national level through UWSCG rather than held by municipalities; Adjara, as an autonomous republic, runs its own operators.",
          de_facto_note:
            "Municipalities have a limited role in water service; in Abkhazia and the Tskhinvali Region / South Ossetia national institutions do not operate.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019, I_GNERC_TARIFF_2017, I_GNERC_LOSSES_2017],
          responsible_institutions: [INST_GNERC, INST_UWSCG, INST_MOI],
          mandate_text:
            "GNERC sets tariffs to support cost recovery using a published methodology (Resolution No. 21 of 2017) and a normative water-loss rule (Resolution No. 45 of 2017), but urban WSS capital is still largely funded from the state budget and donors (World Bank, ADB, EIB, KfW) rather than tariff revenue.",
          de_facto_note:
            "UWSCG tariffs sit below full cost recovery and the utility depends on capital transfers; GWP is closer to commercial viability in the capital. An OECD water-policy outlook (2021) estimates the present value of additional finance needed to meet the 2030 water and sanitation goals at GEL 793.4 million (EUR 198.9 million), most of it donor-funded wastewater and water-supply capital.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "green",
          legal_instruments: [I_ENERGY_WATER_2019, I_GNERC_TARIFF_2017, I_DRINKING_WATER_N58],
          responsible_institutions: [INST_GNERC, INST_NFA],
          mandate_text:
            "GNERC licenses water-supply service and sets the tariff methodology (Resolution No. 21 of 2017) and per-licensee tariffs (Art. 1(9), 11), giving urban economic regulation real teeth, a relatively rare unified energy-and-water regulator. Drinking-water quality is governed by a technical regulation (Government Decree N58 of 2014).",
          de_facto_note:
            "Economic regulation is robust, and a drinking-water-quality standard has been in force since 2014 (Government Decree N58); what remains pending is the EU-aligned revision of that standard (reportedly to ~2030), with quality monitoring assigned to the National Food Agency.",
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
          responsible_institutions: [INST_MEPA, INST_MOI],
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
          responsible_institutions: [INST_MOI],
          mandate_text:
            "Wastewater-treatment capital depends almost entirely on donor finance (EU, EIB, ADB, KfW); there is no domestic financing or charging framework for treatment.",
          de_facto_note:
            "Treatment investment is project-driven and partial; tariffs do not fund sewage treatment.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_SEWERAGE_DISCHARGE_2018, I_SURFACE_CONTAMINANT_2013, I_WRM_2023],
          responsible_institutions: [INST_NEA, INST_MEPA],
          mandate_text:
            "Effluent discharge is governed by adopted limits: permitted pollutants for water entering the sewerage system (Resolution No. 431 of 2018) and contaminant limits for discharges to surface water objects (Resolution No. 414 of 2013), administered by NEA; the 2023 Water Resources Management Law tightens water-quality and environmental-flow protection once operative from 1 September 2026.",
          de_facto_note:
            "Discharge limits exist on paper, but monitoring and enforcement are weak and most collected sewage is released with little or no treatment; the strengthened 2023 regime is not yet in force.",
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
          legal_instruments: [I_WSS_VISION_2021, I_HIGH_MOUNTAIN_2015, I_WATER_1997],
          responsible_institutions: [INST_MOI, INST_MEPA],
          mandate_text:
            "There is no dedicated rural-WSS policy. The 2021 WSS Vision sets a rural 24/7-supply target for end-2030 and the 2015 Law on the Development of High Mountainous Regions offers a high-mountain service hook, but neither is a rural-WSS-specific framework; rural water falls between UWSCG's urban-type mandate and unserved villages, with no programmatic framework for dispersed settlements.",
          de_facto_note:
            "Many rural settlements rely on self-supply (wells, springs) outside any utility; the WSS Vision's own rural target is set without a delivery programme behind it.",
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
          responsible_institutions: [INST_MOI],
          mandate_text:
            "Rural water investment is sporadic and donor or project-driven; there is no programmatic rural financing window.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "red",
          legal_instruments: [I_DRINKING_WATER_N58],
          responsible_institutions: [INST_GNERC, INST_NFA],
          mandate_text:
            "Rural and self-supply systems sit outside GNERC's licensed perimeter and outside effective drinking-water-quality oversight.",
          de_facto_note:
            "Rural water quality is essentially unenforced: the 2014 drinking-water standard (Government Decree N58) applies on paper, but rural and self-supply systems sit outside GNERC's licensed perimeter and outside any effective quality monitoring.",
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
          legal_instruments: [I_WUO_2019, I_WUO_CHARTER_2020, I_WUO_REGISTRY_2020],
          responsible_institutions: [INST_WUO, INST_AMELIORATION],
          mandate_text:
            "Water Users Organisations may form as public-law entities when more than 50% of a service area's users join (Art. 6, 7), taking over tertiary canals from Georgian Amelioration; implementing orders supply a template charter (Order No. 2-531 of 2020) and a WUO registry (Order No. 2-569 of 2020).",
          de_facto_note:
            "Despite the implementing orders being in place, few WUOs have actually formed and most on-farm irrigation is managed informally by individual farmers.",
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
          responsible_institutions: [INST_WUO, INST_MOI],
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
          legal_instruments: [I_AMELIORATION, I_IRRIGATION_REGIME_2023],
          responsible_institutions: [INST_AMELIORATION, INST_MEPA],
          mandate_text:
            "State-owned Georgian Amelioration operates the main irrigation and drainage systems nationwide as the single provider, under MEPA's oversight; a 2023 MEPA order (Order No. 2-686 of 2023) sets the water-supply regime and irrigation rules it follows.",
          de_facto_note:
            "Much of the network is ageing and operating below design command area; rehabilitation is ongoing under the World Bank GRAIL project.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [I_WUO_2019, I_IRRIGATION_SERVICE_2021],
          responsible_institutions: [INST_AMELIORATION, INST_WUO],
          mandate_text:
            "Main systems sit with national Georgian Amelioration; tertiary distribution is meant to pass to local Water Users Organisations under the 2019 law, with a 2021 MEPA order (Order No. 2-268 of 2021) setting the terms of irrigation-service agreements between the company and primary water users.",
          de_facto_note:
            "The handover of tertiary canals to user organisations is largely unrealised, so the national company effectively runs the chain end to end.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [I_IRRIGATION_STRATEGY, I_ENERGY_WATER_2019, I_GNERC_AMELIORATION_2011],
          responsible_institutions: [INST_AMELIORATION, INST_GNERC],
          mandate_text:
            "Rehabilitation is funded from the state budget and the World Bank (GRAIL project). GNERC has set amelioration-service tariffs since 2011 (Resolution No. 2 of 2011) and sets a revised irrigation service tariff that applies from 1 April 2026, a first step toward fuller cost recovery.",
          de_facto_note:
            "Irrigation service charges have historically covered only a fraction of operating cost, leaving the system reliant on budget transfers.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_ENERGY_WATER_2019, I_GNERC_AMELIORATION_2011, I_AMELIORATION_SYSTEMS_2013, I_WRM_2023],
          responsible_institutions: [INST_GNERC, INST_NEA],
          mandate_text:
            "GNERC has regulated amelioration-service tariffs since 2011 (Resolution No. 2 of 2011), and technical-use rules govern the systems (Resolution No. 409 of 2013); a revised irrigation tariff applies from 1 April 2026 and bulk abstraction for irrigation will fall under the 2023 special water-use permit regime once it is operative.",
          de_facto_note:
            "Tariff and technical regulation exist, but the revised cost-recovery tariff and the abstraction-permit regime both bite only from 2026, so economic regulation of the main system is still being built up.",
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
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_ENGINEERING_PROTECTION_2000, I_CLIMATE_2030],
          responsible_institutions: [INST_EMA, INST_MEPA],
          mandate_text:
            "Disaster risk including floods and drought is framed by the 2014 Law on Public Safety; the 2000 Law on Engineering Protection of water objects and river coastlines underpins flood-defence and bank-protection works, with climate-adaptation priorities for water set out in the 2030 Climate Strategy.",
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
          responsible_institutions: [INST_EMA, INST_MOI],
          mandate_text:
            "There is no dedicated, programmatic flood-and-drought financing instrument. Flood-protection works and disaster response are funded ad hoc from the state budget and donors.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_ENGINEERING_PROTECTION_2000],
          responsible_institutions: [INST_EMA, INST_NEA],
          mandate_text:
            "Emergency prevention through forecasting and monitoring (Art. 28) and population warning (Art. 32) are mandated, and the 2000 Engineering Protection Law governs flood-defence and bank-protection works on rivers and coastlines, but monitoring-network density and early-warning coverage remain limited.",
          de_facto_note:
            "Flood-hazard mapping and basin-scale early-warning systems are incomplete; EU-funded hydromet modernisation is ongoing.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_PUBLIC_SAFETY_2014, I_ENGINEERING_PROTECTION_2000, I_CLIMATE_2030],
          responsible_institutions: [INST_EMA, INST_MEPA],
          mandate_text:
            "Resilience rests on the civil-protection system, the 2000 Engineering Protection Law's flood-defence and bank-protection works, and climate-adaptation planning; structural defences and drought-preparedness measures are being strengthened with donor support.",
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
          legal_instruments: [I_WRM_2023, I_PERMIT_2005, I_WATER_1997],
          responsible_institutions: [INST_NEA],
          mandate_text:
            "Surface-water abstraction and discharge were governed by a 2005 permit rule (Resolution No. 137 of 2005) until special water-use permits were abolished in 2008; the 2023 law restores a special water-use permit regime administered by the National Environmental Agency, operative from 1 September 2026.",
          de_facto_note:
            "Between 2008 and the 2026 commencement, abstraction is effectively unlicensed, so the regulatory mandate exists in law but not yet in practice.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [I_WRM_2023, I_SURFACE_POLLUTION_2013, I_WATER_PROTECTION_ZONES_2013, I_CLIMATE_2030],
          responsible_institutions: [INST_MEPA, INST_NEA],
          mandate_text:
            "Standing rules protect surface waters from pollution (Resolution No. 425 of 2013) and establish water-protection zones along water bodies (Resolution No. 440 of 2013); the 2023 law adds environmental-flow protection and basin planning, reinforced by the 2030 Climate Strategy, but those newer tools are not operational until 2026.",
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
          legal_instruments: [I_WRM_2023, I_SUBSOIL_1996, I_WATER_1997],
          responsible_institutions: [INST_MEPA],
          mandate_text:
            "Groundwater is split across two frameworks: mineral, thermal and industrial underground waters are licensed subsoil resources under the 1996 Law on Subsoil, while general and agricultural groundwater falls under the water-use regime. The 2023 law brings the latter into basin management and the special water-use permit regime, but not before 1 September 2026.",
          de_facto_note:
            "There is no integrated groundwater or aquifer-protection strategy; the resource is treated partly as subsoil and partly as general water, with no unified management.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [I_SUBSOIL_1996, I_GROUNDWATER_RESERVES_2017, I_WRM_2023],
          responsible_institutions: [INST_SUBSOIL, INST_NEA],
          mandate_text:
            "Mineral, thermal and industrial groundwater is managed as a licensed subsoil resource by the National Agency of Subsoil Resources, with a 2017 order setting how underground-water reserves are classified and assessed; the National Environmental Agency will license general abstraction once the 2023 regime is operative.",
          de_facto_note:
            "Institutional coverage is split and partial: the subsoil agency handles licensed mineral and thermal waters, but no body actively manages general aquifers, and groundwater monitoring capacity is minimal.",
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
          coverage_status: "yellow",
          legal_instruments: [I_SUBSOIL_1996, I_GROUNDWATER_SANITARY_2019, I_WRM_2023],
          responsible_institutions: [INST_SUBSOIL, INST_NEA],
          mandate_text:
            "Mineral and thermal groundwater abstraction is licensed under the 1996 Subsoil Law, with sanitary protection zones set around licensed groundwater objects (Resolution No. 161 of 2019); general groundwater abstraction has been effectively unregulated since special water-use permits were abolished in 2008, and the restored permit regime does not bite until 1 September 2026.",
          de_facto_note:
            "Regulation is bifurcated: licensed mineral and thermal waters are controlled, but general aquifer abstraction is not, unlicensed wells are common and volumes are not systematically recorded.",
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
  targets: GEORGIA_TARGETS,
  monitoring: GEORGIA_MONITORING,
};
