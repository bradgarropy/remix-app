import {expect, test} from "@playwright/test"

test("home page", async ({page}) => {
    await page.goto("localhost:3000")
    await expect(page).toHaveTitle("💿 remix app | home")

    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

    await expect(page.getByRole("link", {name: "Home"})).toBeVisible()
    await expect(page.getByRole("link", {name: "Sign up"})).toBeVisible()
    await expect(page.getByRole("link", {name: "Sign in"})).toBeVisible()
})
