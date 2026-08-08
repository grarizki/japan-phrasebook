import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173/japan-phrasebook/",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { browserName: "chromium", viewport: { width: 390, height: 844 } },
    },
    {
      name: "desktop-chromium",
      use: { browserName: "chromium", viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: {
    command: "pnpm dev --port 5173",
    url: "http://localhost:5173/japan-phrasebook/",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
