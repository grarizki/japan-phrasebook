import { test, expect } from "@playwright/test"

test.describe("Japan Phrasebook smoke", () => {
  test("loads with correct title and default category", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/フレーズブック|Phrasebook/)

    // Default category trigger shows Convenience Store
    const trigger = page.getByTestId("category-trigger").filter({ visible: true })
    await expect(trigger).toContainText("Convenience Store")
    await expect(trigger).toContainText("9 phrases")
  })

  test("category sheet shows grouped sections", async ({ page }) => {
    await page.goto("/")
    await page.getByTestId("category-trigger").filter({ visible: true }).click()
    const sheet = page.locator(".max-w-lg")
    await expect(sheet).toBeVisible()
    await expect(sheet).toContainText("JLPT Study")
    await expect(sheet).toContainText("Slang")
    await expect(sheet).toContainText("JLPT N5")
    await expect(sheet).toContainText("Casual Slang")
  })

  test("selecting a category filters phrases", async ({ page }) => {
    await page.goto("/")
    await page.getByTestId("category-trigger").filter({ visible: true }).click()
    await page.locator(".max-w-lg button", { hasText: "JLPT N5" }).click()

    const cards = page.locator("main .rounded-2xl")
    await expect(cards).toHaveCount(45)
    await expect(cards.first()).toContainText("私は学生です")
    await expect(page.getByTestId("category-trigger").filter({ visible: true })).toContainText("JLPT N5")
  })

  test("URL category param restores category on load", async ({ page }) => {
    await page.goto("/?cat=cat18")
    await expect(page.getByTestId("category-trigger").filter({ visible: true })).toContainText("JLPT N3")
    await expect(page.locator("main .rounded-2xl")).toHaveCount(40)
  })

  test("URL tab param opens saved tab", async ({ page }) => {
    await page.goto("/?tab=favorites")
    await expect(page.getByText("No saved phrases yet")).toBeVisible()
  })

  test("expanding a card shows translation and pronunciation", async ({
    page,
  }) => {
    await page.goto("/")
    await page.locator("main .rounded-2xl button").first().click()
    const card = page.locator("main .rounded-2xl").first()
    await expect(card).toContainText("すみません、お菓子はどこにありますか？")
    await expect(card).toContainText("Sumimasen")
  })

  test("verified phrase shows confirmation badge", async ({ page }) => {
    await page.goto("/?cat=cat16") // JLPT N5 — conv129 is verified
    await expect(page.locator("main .rounded-2xl").first()).toContainText(
      "✓ 確認済み",
    )
    await expect(page.locator("main .rounded-2xl").nth(1)).not.toContainText(
      "✓ 確認済み",
    )
  })
})
