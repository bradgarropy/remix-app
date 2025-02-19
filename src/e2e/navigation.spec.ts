import {expect, test} from "@playwright/test"

test("unauthenticated", async ({page}) => {
    await page.goto("http://localhost:3000")

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

    await page.getByRole("link", {name: "About"}).click()

    await expect(page).toHaveTitle("💿 remix app | about")
    await expect(page.getByRole("heading", {name: "About"})).toBeVisible()

    await page.getByRole("link", {name: "Dashboard"}).click()

    await expect(page).toHaveTitle("💿 remix app | sign in")
    await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()

    await page.getByRole("link", {name: "Sign up"}).click()

    await expect(page).toHaveTitle("💿 remix app | sign up")
    await expect(page.getByRole("heading", {name: "Sign up"})).toBeVisible()

    await page.getByRole("link", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | sign in")
    await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()

    await page.getByRole("link", {name: "Sentry"}).click()

    await expect(page).toHaveTitle("💿 remix app | sentry")
    await expect(page.getByRole("heading", {name: "Sentry"})).toBeVisible()
})

test("authenticated", async ({page}) => {
    await page.goto("http://localhost:3000")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill("homer@gmail.com")
    await page.getByRole("textbox", {name: "Password"}).fill("password")
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

    await page.getByRole("link", {name: "Home"}).click()

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

    await page.getByRole("link", {name: "About"}).click()

    await expect(page).toHaveTitle("💿 remix app | about")
    await expect(page.getByRole("heading", {name: "About"})).toBeVisible()

    await page.getByRole("link", {name: "Dashboard"}).click()

    await expect(page).toHaveTitle("💿 remix app | dashboard")
    await expect(page.getByRole("heading", {name: "Dashboard"})).toBeVisible()

    await page.getByRole("link", {name: "Sentry"}).click()

    await expect(page).toHaveTitle("💿 remix app | sentry")
    await expect(page.getByRole("heading", {name: "Sentry"})).toBeVisible()

    await page.getByRole("link", {name: "Sign out"}).click()

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
})
