import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Relative base so assets resolve under the GitHub Pages project subpath
  // (/openhko/) and at a custom-domain root (/) without a config change.
  base: "./",
  plugins: [react()],
});
