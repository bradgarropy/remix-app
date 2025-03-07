import {expect, test} from "@playwright/test"

import {homer} from "~/mocks/users"

test("unauthenticated", async ({page}) => {
    await page.goto("/")

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

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
    await page.goto("/")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()

    await page.getByRole("link", {name: "Notes"}).click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()

    await page.getByRole("link", {name: "Sentry"}).click()

    await expect(page).toHaveTitle("💿 remix app | sentry")
    await expect(page.getByRole("heading", {name: "Sentry"})).toBeVisible()

    await page.getByRole("link", {name: "Sign out"}).click()

    await expect(page).toHaveTitle("💿 remix app | home")
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
})
