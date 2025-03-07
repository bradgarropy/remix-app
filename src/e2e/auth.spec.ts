import {expect, test} from "@playwright/test"

import {homer} from "~/mocks/users"

test("sign up", async ({page}) => {
    await page.goto("/")
    await page.getByRole("link", {name: "Sign up"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill("bart@gmail.com")

    await page
        .getByRole("textbox", {name: "Password", exact: true})
        .fill("password")

    await page
        .getByRole("textbox", {name: "Confirm password", exact: true})
        .fill("password")

    await page.getByRole("button", {name: "Sign up"}).click()

    await expect(page.getByText("bart@gmail.com")).toBeVisible()
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
})

test("sign in", async ({page}) => {
    await page.goto("/")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByText(homer.email)).toBeVisible()
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
    await expect(page.getByRole("link", {name: "Sign out"})).toBeVisible()
})

test("sign out", async ({page}) => {
    await page.goto("/")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByText(homer.email)).toBeVisible()

    await page.getByRole("link", {name: "Sign out"}).click()

    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
    await expect(page.getByText(homer.email)).not.toBeVisible()
})

test("authorization", async ({page}) => {
    await page.goto("/notes")
    await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()
})

test("redirection", async ({page}) => {
    await page.goto("/notes")
    await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByText(homer.email)).toBeVisible()
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()
    await expect(page.getByRole("link", {name: "Sign out"})).toBeVisible()
})
