import type { MandateRecord } from "../src/types";

// Mandate records for Georgia's water-sector framework.
// Canonical source is matsne.gov.ge (Legislative Herald of Georgia); FAOLEX is
// cited where the instrument is indexed there. Article numbers are cited only
// where confirmed against a rendered primary page (Constitution, Law on Energy
// and Water Supply 2019, Law on Water Users Organisations 2019, Law on Public
// Safety 2014). For the 2023 Water Resources Management Law, the Land Amelioration
// Law and the 2010 UWSCG order, pinpoint article numbers were NOT confirmed, so
// the legal_basis names the provision in words rather than asserting a number
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
const MRDI_WATER = "https://mrdi.gov.ge/en/agencies/water";

export const GEORGIA_MANDATES: MandateRecord[] = [
  // ===================== NATIONAL =====================
  {
    actor: "Ministry of Environmental Protection and Agriculture",
    acronym: "MEPA",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "river-basin management framework",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "Operative norms bind only from 1 September 2026, when the law repeals the 1997 Law on Water; until then the river-basin regime is not yet in force.",
  },
  {
    actor: "MEPA, environmental-flow and water-quality norms",
    acronym: "MEPA",
    level: "national",
    function: "norm_setting",
    legal_basis: {
      short: "Water Resources Management Law (2023)",
      article: "environmental-flow and quality norms",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "Environmental-flow and water-quality norms are introduced by the 2023 law but take effect from 1 September 2026; a drinking-water quality regulation is still not adopted.",
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
      article: "special water-use permit regime",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "The abstraction-permit regime (abolished in 2008) is restored by the 2023 law but becomes operative only from 1 September 2026; NEA is the implementing agency under MEPA.",
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
    actor: "Ministry of Regional Development and Infrastructure",
    acronym: "MRDI",
    level: "national",
    function: "policy",
    legal_basis: {
      short: "Order No. 1-1/13 (2010)",
      article: "establishment of UWSCG",
      national_url: MRDI_WATER,
    },
    de_facto_note:
      "MRDI owns and oversees UWSCG, the state water utility established by Minister of Economy Order No. 1-1/13 (2010); that order is not published on matsne, so institutional facts are corroborated via MRDI and OECD/MEPA.",
  },
  {
    actor: "United Water Supply Company of Georgia",
    acronym: "UWSCG",
    level: "national",
    function: "service_delivery",
    legal_basis: {
      short: "Order No. 1-1/13 (2010)",
      article: "establishment of UWSCG",
      national_url: MRDI_WATER,
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
      national_url: MRDI_WATER,
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
      article: "river-basin plans and district councils",
      faolex_url: FAOLEX_WRM_2023,
    },
    de_facto_note:
      "Seven river basins are grouped into management districts with consultative councils under MEPA; districts, councils and basin plans are not yet established and become operative from 1 September 2026.",
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
