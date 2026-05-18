import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site from a sub-path matching the repo name
// (https://<user>.github.io/water-pir/). The base URL must match so asset
// references resolve. In dev (`npm run dev`) Vite still uses "/" for the dev
// server, but bundled assets use this base.
export default defineConfig({
  base: "/water-pir/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
});
