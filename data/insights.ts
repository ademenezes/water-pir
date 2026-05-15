// "Did you know?" facts curated from the country data and the WSIP / PIR source
// documents. Used on the home page in a rotating featured-insight card.
// The rotator picks one per session (seeded by the date) so visitors see
// fresh content but the same card on reloads within a day.

export interface Insight {
  key: string;
  title: string;
  body: string;
  link?: { href: string; label: string };
  source: string;
}

export const INSIGHTS: Insight[] = [
  {
    key: "brazil_marco_legal",
    title:
      "Brazil's 2020 Marco Legal expanded ANA's mandate to issue national reference norms",
    body:
      "Law 14.026 turned the federal water agency into a sanitation reference-norm issuer. State regulators now align with ANA norms to remain eligible for federal funding — a soft-power harmonisation tool.",
    link: { href: "/country/BRA/subsector/wss_urban", label: "See Brazil's WSS urban deep-dive →" },
    source: "Brazil dashboard · Law 14.026/2020",
  },
  {
    key: "matrix_cells",
    title: "Every country has 42 framework cells (7 WSIP × 6 PIR)",
    body:
      "Each country's full diagnostic surface is a 7-row × 6-column grid: 7 WSIP scalable solutions × 6 PIR dimensions (policy, institutions, IGC, financing, regulation, resilience). Empty cells = reform priorities.",
    link: { href: "/wsip-matrix", label: "Open the matrix →" },
    source: "Tool framework",
  },
  {
    key: "brazil_basin_charging",
    title:
      "Brazil's water-use charging is universal in law but operational in only a handful of basins",
    body:
      "The 1997 PNRH (Law 9.433) provides for water-use charges across all river basins, but in practice it is operational mainly in PCJ, Paraíba do Sul, Doce, São Francisco — a textbook de-jure / de-facto gap.",
    link: { href: "/country/BRA/subsector/wrm_basin", label: "See Brazil's WRM deep-dive →" },
    source: "Brazil dashboard · Law 9.433/1997 art. 19–22",
  },
  {
    key: "water_compact",
    title: "27 WSIP Water Compact countries are the WBG priority cohort",
    body:
      "The WBG identified 27 countries for first-cohort Water Compacts under the 2025 WSIP, with the first six finalising for the IMF–WBG 2026 Spring Meetings: Brazil, Cambodia, Chad, Yemen, Senegal, Uzbekistan.",
    link: { href: "/countries", label: "Browse countries →" },
    source: "WSIP P165586 Chapter 5",
  },
  {
    key: "fragmentation",
    title:
      "Institutional fragmentation is the #1 challenge to good water management",
    body:
      "In a 2021 survey of 86 ministers and agency heads, 'fragmented water institutions' was ranked the top challenge — ahead of inadequate data, conflicts between user groups, or weak infrastructure.",
    link: { href: "/about", label: "About the frameworks →" },
    source: "BOSIB Figure 1.1 (Water Policy Group 2021)",
  },
];

/**
 * Pick an insight deterministically for the current session.
 * The same day shows the same insight; reloads don't re-shuffle.
 */
export function pickInsightForToday(today = new Date()): Insight {
  const dayKey = today.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < dayKey.length; i++) {
    hash = (hash * 31 + dayKey.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % INSIGHTS.length;
  return INSIGHTS[idx];
}
