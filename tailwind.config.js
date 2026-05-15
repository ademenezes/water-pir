/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // WSIP pillar palette (drawn from Figure 4)
        pillar: {
          people: "#5BC4E2",   // light blue - Water for People
          food: "#5AB17F",     // green - Water for Food
          planet: "#F4B400",   // amber - Water for Planet
        },
        // PIR dimension accents
        pir: {
          policy: "#1f6c8c",
          institutions: "#117a65",
          igc: "#9c640c",
          financing: "#7d3c98",
          regulation: "#cc6600",
          resilience: "#117864",
        },
        coverage: {
          green: "#16a34a",
          yellow: "#eab308",
          red: "#dc2626",
          gray: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
