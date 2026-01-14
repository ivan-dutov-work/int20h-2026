// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import react from "@astrojs/react";

// https://astro.build/config

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        $fonts: resolve("./src/assets/fonts"),
      },
    },
    preview: {
      allowedHosts: ['int20h.best-kyiv.org', 'localhost']
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  integrations: [react()],
});
