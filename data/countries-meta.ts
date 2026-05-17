// 27 WSIP Water Compact priority countries (WBG WSIP, Dec 2025, Ch. 5).
// ISO numeric codes match the world-atlas TopoJSON used by the map.
// Status: "live" = full data; "pipeline" = first cohort with data planned; "planned" = added later.

export type CountryStatus = "live" | "pipeline" | "planned";

export interface CountryMeta {
  code: string; // ISO 3166-1 alpha-3
  iso_numeric: string; // matches TopoJSON id (zero-padded 3 digits)
  name: string;
  region: string;
  status: CountryStatus;
  flag: string;
  /** Short reform-relevant note shown on cards and tooltips. */
  blurb?: string;
}

export const WSIP_COUNTRIES: CountryMeta[] = [
  {
    code: "BRA",
    iso_numeric: "076",
    name: "Brazil",
    region: "Latin America & Caribbean",
    status: "live",
    flag: "🇧🇷",
    blurb:
      "2020 Marco Legal (Law 14.026), expanded ANA mandate; universal-access targets for 2033.",
  },
  {
    code: "ALB",
    iso_numeric: "008",
    name: "Albania",
    region: "Europe & Central Asia",
    status: "pipeline",
    flag: "🇦🇱",
  },
  {
    code: "ARM",
    iso_numeric: "051",
    name: "Armenia",
    region: "Europe & Central Asia",
    status: "pipeline",
    flag: "🇦🇲",
  },
  {
    code: "BDI",
    iso_numeric: "108",
    name: "Burundi",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇧🇮",
  },
  {
    code: "KHM",
    iso_numeric: "116",
    name: "Cambodia",
    region: "East Asia & Pacific",
    status: "pipeline",
    flag: "🇰🇭",
    blurb: "First-cohort Water Compact (April 2026 launch).",
  },
  {
    code: "CMR",
    iso_numeric: "120",
    name: "Cameroon",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇨🇲",
  },
  {
    code: "TCD",
    iso_numeric: "148",
    name: "Chad",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇹🇩",
    blurb: "First-cohort Water Compact.",
  },
  {
    code: "CHL",
    iso_numeric: "152",
    name: "Chile",
    region: "Latin America & Caribbean",
    status: "pipeline",
    flag: "🇨🇱",
  },
  {
    code: "COD",
    iso_numeric: "180",
    name: "DR Congo",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇨🇩",
  },
  {
    code: "ETH",
    iso_numeric: "231",
    name: "Ethiopia",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇪🇹",
    blurb: "ONE WASH Program, multi-donor rural sanitation platform.",
  },
  {
    code: "GIN",
    iso_numeric: "324",
    name: "Guinea",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇬🇳",
  },
  {
    code: "HND",
    iso_numeric: "340",
    name: "Honduras",
    region: "Latin America & Caribbean",
    status: "pipeline",
    flag: "🇭🇳",
  },
  {
    code: "JOR",
    iso_numeric: "400",
    name: "Jordan",
    region: "Middle East & North Africa",
    status: "pipeline",
    flag: "🇯🇴",
    blurb: "Drought management systems & contingency planning.",
  },
  {
    code: "KEN",
    iso_numeric: "404",
    name: "Kenya",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇰🇪",
    blurb:
      "WASREB pro-poor performance indicators (BOSIB Box 6.1); devolved WSS to counties.",
  },
  {
    code: "MDG",
    iso_numeric: "450",
    name: "Madagascar",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇲🇬",
  },
  {
    code: "NPL",
    iso_numeric: "524",
    name: "Nepal",
    region: "South Asia",
    status: "pipeline",
    flag: "🇳🇵",
  },
  {
    code: "PAK",
    iso_numeric: "586",
    name: "Pakistan",
    region: "South Asia",
    status: "pipeline",
    flag: "🇵🇰",
  },
  {
    code: "PER",
    iso_numeric: "604",
    name: "Peru",
    region: "Latin America & Caribbean",
    status: "pipeline",
    flag: "🇵🇪",
    blurb:
      "SUNASS, independent national WSS regulator with strong tariff methodology.",
  },
  {
    code: "PHL",
    iso_numeric: "608",
    name: "Philippines",
    region: "East Asia & Pacific",
    status: "pipeline",
    flag: "🇵🇭",
  },
  {
    code: "YEM",
    iso_numeric: "887",
    name: "Yemen",
    region: "Middle East & North Africa",
    status: "pipeline",
    flag: "🇾🇪",
    blurb: "First-cohort Water Compact (FCV context).",
  },
  {
    code: "SEN",
    iso_numeric: "686",
    name: "Senegal",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇸🇳",
    blurb:
      "First desalination plant (4 million people); ONAS / SONES PPP model.",
  },
  {
    code: "SOM",
    iso_numeric: "706",
    name: "Somalia",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇸🇴",
  },
  {
    code: "TZA",
    iso_numeric: "834",
    name: "Tanzania",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇹🇿",
    blurb: "Rural Water Supply and Sanitation Agency capacity building.",
  },
  {
    code: "TUR",
    iso_numeric: "792",
    name: "Türkiye",
    region: "Europe & Central Asia",
    status: "pipeline",
    flag: "🇹🇷",
  },
  {
    code: "UZB",
    iso_numeric: "860",
    name: "Uzbekistan",
    region: "Europe & Central Asia",
    status: "pipeline",
    flag: "🇺🇿",
    blurb: "First-cohort Water Compact; centralized irrigation reform.",
  },
  {
    code: "ZMB",
    iso_numeric: "894",
    name: "Zambia",
    region: "Sub-Saharan Africa",
    status: "pipeline",
    flag: "🇿🇲",
    blurb:
      "1997 WSS Act triggered de jure–de facto reforms (BOSIB Box 2.2 / Figure 1.3).",
  },
  // Phase 3 additions beyond WSIP cohort (suggested in plan)
  {
    code: "COL",
    iso_numeric: "170",
    name: "Colombia",
    region: "Latin America & Caribbean",
    status: "planned",
    flag: "🇨🇴",
    blurb:
      "CRA, Comisión de Regulación de Agua: 25-year regulatory evolution (BOSIB Figure 6.1).",
  },
  {
    code: "IDN",
    iso_numeric: "360",
    name: "Indonesia",
    region: "East Asia & Pacific",
    status: "planned",
    flag: "🇮🇩",
    blurb: "Citywide inclusive sanitation; performance-based grants.",
  },
];

export function getCountryMeta(code: string): CountryMeta | undefined {
  return WSIP_COUNTRIES.find(
    (c) => c.code === code.toUpperCase() || c.iso_numeric === code
  );
}

export function isoNumericToMeta(): Record<string, CountryMeta> {
  return Object.fromEntries(WSIP_COUNTRIES.map((c) => [c.iso_numeric, c]));
}
