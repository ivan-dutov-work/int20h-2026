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
      strictPort: false,
      middlewareMode: false,
      allowedHosts: ['int20h.best-kyiv.org', 'localhost'],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4321,
  },
  preview: {
    host: "0.0.0.0",
    port: 4321,
    allowedHosts: ['int20h.best-kyiv.org', 'localhost'],
  },
  integrations: [react()],
});
