import type { MandateRecord } from "../src/types";

// Mandate records for Georgia's water-sector framework.
// Canonical source is matsne.gov.ge (Legislative Herald of Georgia); FAOLEX is
// cited where the instrument is indexed there. Article numbers are cited only
// where confirmed against a rendered primary page (Constitution, Law on Energy
// and Water Supply 2019, Law on Water Users Organisations 2019, Law on Public
// Safety 2014) or against the full primary text. The 2023 Water Resources
// Management Law article numbers below were read on 2026-06-10 from the
// consolidated Georgian text in the OneDrive drop (article HEADINGS, an
// unofficial translation): Art. 6 competent authorities (6.2 = MEPA competences),
// Art. 16-17 special water-use permit regime, Art. 22-25 river-basin districts /
// management plans / consultative basin councils, Art. 26-27 water-status
// classification and target indicators, Art. 30 urban-wastewater discharge, Art.
// 31 control bodies. For the Land Amelioration Law (full text NOT in the drop, see
// the manifest's misnamed-file flag) and the 2010 UWSCG order, pinpoint article
// numbers remain unconfirmed, so the legal_basis names the provision in words
// (see documents/georgia/manifest.json). Government-level values reuse the
// existing GovernmentLevel type; on the Georgia dashboard "national" displays as
// "National", "state" as "Adjara A.R.", "local" as "Municipal", "basin" as
// "Basin". verbatim_short is omitted throughout: the matsne and FAOLEX pages are
// JavaScript-rendered and exact wording was not scraped, so no quotation is asserted.

const MATSNE_CONSTITUTION = "https://matsne.gov.ge/en/document/view/30346";
const MATSNE_GNERC_2019 = "https://matsne.gov.ge/en/document/view/4747785";
const FAOLEX_GNERC_2019 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC193147/";
const MATSNE_WUO_2019 = "https://matsne.gov.ge/en/document/view/4736322";
const MATSNE_PUBLIC_SAFETY_2014 = "https://matsne.gov.ge/en/document/view/2363013";
const FAOLEX_WRM_2023 =
  "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC219653/";
const FAOLEX_AMELIORATION = "https://faolex.fao.org/docs/pdf/geo54807.pdf";
// Ministry of Infrastructure of Georgia, the water-supply agency page (lists
// UWSCG). The Ministry of Infrastructure is the successor to MRDI after the
// 2025 government reorganisation; the old mrdi.gov.ge/en/agencies/water page no
// longer resolves.
const MOI_WATER = "https://moi.gov.ge/en/agencies/water";

export const GEORGIA_MANDATES: MandateRecord[] = [
  // ===================== NATIONAL =====================
  {
    actor: "Ministry of Environmental Protection and Agriculture",
    acronym: "MEPA",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "Art. 6.2, 21–22 (MEPA competences; basin management system)",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "MEPA holds the state water-policy competence (Art. 6.2) and introduces the river-basin management system (Art. 21–22); operative norms bind only from 1 September 2026, when the law repeals the 1997 Law on Water, so until then the river-basin regime is not yet in force.",
  },
  {
    actor: "MEPA, environmental-flow and water-quality norms",
    acronym: "MEPA",
    level: "national",
    function: "norm_setting",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "Art. 26–27 (water-status standards), 30 (discharge norms)",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "The surface-water-quality (status) standard and target indicators are set under Art. 26–27 and urban-wastewater discharge / environmental-flow norms under Art. 30; these take effect from 1 September 2026. The drinking-water-quality standard is a separate instrument, in force since 2014 (Decree N58), with its EU-aligned revision still pending.",
  },
  {
    actor: "Georgian National Energy and Water Supply Regulatory Commission",
    acronym: "GNERC",
    level: "national",
    function: "regulation",
    legal_basis: {
      short: "Law on Energy and Water Supply (2019)",
      article: "Art. 1(9), 11",
      faolex_url: FAOLEX_GNERC_2019,
      national_url: MATSNE_GNERC_2019,
    },
    de_facto_note:
      "GNERC sets the potable-water tariff methodology and approves per-licensee tariffs (GWP, UWSCG, Adjara operators); irrigation tariffs apply from 1 April 2026.",
  },
  {
    actor: "National Environmental Agency, water-use permits",
    acronym: "NEA",
    level: "national",
    function: "regulation",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "Art. 16–17 (special water-use permits)",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "Special (abstraction) water use over a surface water object and the permit-issuing rules sit in Art. 16–17; the issuing competence is MEPA's (Art. 6.2), implemented by NEA. The regime (abolished in 2008) is restored by the 2023 law but becomes operative only from 1 September 2026.",
  },
  {
    actor: "Emergency Management Agency (Ministry of Internal Affairs)",
    acronym: "EMA",
    level: "national",
    function: "planning",
    legal_basis: {
      short: "Law on Public Safety (2014)",
      article: "Art. 28",
      national_url: MATSNE_PUBLIC_SAFETY_2014,
    },
    de_facto_note:
      "EMA runs the unified civil-protection system; hydrometeorological forecasting and monitoring are provided by the National Environmental Agency under MEPA and remain thin.",
  },
  {
    actor: "Ministry of Infrastructure of Georgia",
    acronym: "MoI",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Order No. 1-1/13 (2010)",
      article: "establishment of UWSCG",
      national_url: MOI_WATER,
    },
    de_facto_note:
      "The Ministry of Regional Development and Infrastructure (MRDI) was reorganised in 2025; its infrastructure and water-supply functions, including ownership of UWSCG and lead on WSS policy, passed to the new Ministry of Infrastructure of Georgia (moi.gov.ge), which lists UWSCG among its agencies. UWSCG was established by Minister of Economy Order No. 1-1/13 (2010); that order is not published on matsne, so institutional facts are corroborated via the Ministry of Infrastructure's agency listing and OECD/MEPA. The exact reorganisation decree/effective date is not yet pinned to a resolvable primary instrument.",
  },
  {
    actor: "United Water Supply Company of Georgia",
    acronym: "UWSCG",
    level: "national",
    function: "service_delivery",
    legal_basis: {
      short: "Order No. 1-1/13 (2010)",
      article: "establishment of UWSCG",
      national_url: MOI_WATER,
    },
    de_facto_note:
      "UWSCG (100% state-owned) serves urban-type settlements except Tbilisi, Mtskheta, Rustavi, Gardabani and Adjara; it merged 66 local water companies in 2010 and is widely assessed as financially weak and grant-dependent.",
  },
  {
    actor: "Georgian Amelioration, main-system irrigation and drainage",
    acronym: "Amelioration",
    level: "national",
    function: "service_delivery",
    legal_basis: {
      short: "Law on Land Amelioration",
      article: "state management of amelioration",
      faolex_url: FAOLEX_AMELIORATION,
    },
    de_facto_note:
      "Irrigation and drainage were recentralised under state-owned Georgian Amelioration as the single main-system provider after 2012; rehabilitation is backed by the World Bank GRAIL project.",
  },
  {
    actor: "EMA, emergency response and population warning",
    acronym: "EMA",
    level: "national",
    function: "service_delivery",
    legal_basis: {
      short: "Law on Public Safety (2014)",
      article: "Art. 5(2), 32",
      national_url: MATSNE_PUBLIC_SAFETY_2014,
    },
  },
  {
    actor: "State budget, capital subsidies to UWSCG and Amelioration",
    acronym: "State budget",
    level: "national",
    function: "financing",
    legal_basis: {
      short: "Annual State Budget Law",
      article: "capital transfers",
      national_url: MOI_WATER,
    },
    de_facto_note:
      "Urban WSS and main-system irrigation rely heavily on central-budget capital transfers and donor finance (World Bank, ADB, EIB, KfW); tariff revenue covers only part of operating cost.",
  },

  // ===================== BASIN =====================
  {
    actor: "River-basin management district councils",
    acronym: "RBM districts",
    level: "basin",
    function: "planning",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "Art. 22–25 (basin districts, plans, councils)",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "River basins are grouped into management districts (Art. 22); each district gets a six-year management plan approved by the Government (Art. 23–24) prepared with a consultative-coordination basin council of MEPA, municipalities, water users and NGOs (Art. 25). Districts, councils and plans are not yet established and become operative from 1 September 2026.",
  },

  // ===================== STATE (Adjara A.R.) =====================
  {
    actor: "Batumi Water & Kobuleti Water (Adjara A.R.)",
    acronym: "Adjara operators",
    level: "state",
    function: "service_delivery",
    legal_basis: {
      short: "Adjara A.R. public utilities",
      article: "regional WSS provision",
    },
    de_facto_note:
      "WSS in the Autonomous Republic of Adjara is provided by Batumi Water LLC and Kobuleti Water LLC, outside UWSCG's national footprint; GNERC regulates their tariffs. No single canonical establishing instrument was located.",
  },

  // ===================== LOCAL =====================
  {
    actor: "Water Users Organisations",
    acronym: "WUOs",
    level: "local",
    function: "service_delivery",
    legal_basis: {
      short: "Law on Water Users Organisations (2019)",
      article: "Art. 6, 7",
      national_url: MATSNE_WUO_2019,
    },
    de_facto_note:
      "WUOs are membership-based public-law entities (Art. 6) that may form when more than 50% of a service area's users join (Art. 7), managing tertiary irrigation infrastructure; uptake is limited and most on-farm irrigation remains informal.",
  },
];
