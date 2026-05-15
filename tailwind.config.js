/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand identity — pulled from BOSIB PIR Synthesis Report cover
        // (Circle Graphics / Chris Phillips, August 2022).
        brand: {
          ink: "#0F2A44",   // dark navy — pipes, body headings, footer band
          teal: "#5BC4E2",  // cover background — primary brand
          deep: "#0FAACB",  // saturated teal — chapter numerals, links, primary action, eyebrow
          sand: "#F5EFE6",  // warm callout/sidebar bg (alt to slate-50)
          amber: "#F59A3B", // regulation arc, chart bar accent, drop-caps
          olive: "#A8B946", // institutions arc, secondary accent
          rule: "#D9D2C7",  // warm-neutral horizontal rule
        },
        // WSIP pillar palette (Figure 4) — semantic, kept for matrix coloring
        pillar: {
          people: "#5BC4E2",
          food: "#5AB17F",
          planet: "#F4B400",
        },
        // PIR dimension accents — semantic
        pir: {
          policy: "#1f6c8c",
          institutions: "#117a65",
          igc: "#9c640c",
          financing: "#7d3c98",
          regulation: "#cc6600",
          resilience: "#117864",
        },
        // Coverage status — single source of truth is CELL_BG in CoverageDot.tsx
        coverage: {
          green: "#16a34a",
          yellow: "#eab308",
          red: "#dc2626",
          gray: "#9ca3af",
        },
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Source Serif 4"', '"Source Serif Pro"', "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};
