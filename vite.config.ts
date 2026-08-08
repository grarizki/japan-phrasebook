// @ts-nocheck
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"
import type { Plugin } from "vite"

function inlineCSS(): Plugin {
  return {
    name: "inline-css",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        const cssEntry = Object.entries(bundle).find(
          ([, v]: [string, any]) =>
            v.type === "asset" && v.fileName.endsWith(".css"),
        )
        if (!cssEntry) return html
        const [cssKey, cssAsset] = cssEntry as [string, any]
        const css = cssAsset.source as string
        delete bundle[cssKey]
        return html.replace(
          /<link[^>]+href="[^"]*\.css"[^>]*>/,
          `<style>${css}</style>`,
        )
      },
    },
  }
}

export default defineConfig({
  base: "/japan-phrasebook/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "日本語フレーズブック",
        short_name: "フレーズブック",
        description: "Offline Japanese phrasebook for daily life in Japan",
        theme_color: "#1a1209",
        background_color: "#1a1209",
        display: "standalone",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg}"],
      },
    }),
    inlineCSS(),
  ],
  build: {
    cssCodeSplit: false,
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react")) return "vendor-react"
          if (id.includes("node_modules/framer-motion")) return "vendor-motion"
          if (id.includes("node_modules/localforage")) return "vendor-storage"
        },
      },
    },
  },
})
