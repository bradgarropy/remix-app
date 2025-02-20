import {expect, test} from "@playwright/test"

test.only("sign up", async ({page}) => {
    await page.goto("http://localhost:3000")
    await page.getByRole("link", {name: "Sign up"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill("marge@gmail.com")

    await page
        .getByRole("textbox", {name: "Password", exact: true})
        .fill("password")

    await page
        .getByRole("textbox", {name: "Confirm password", exact: true})
        .fill("password")

    await page.getByRole("button", {name: "Sign up"}).click()

    await expect(page.getByText("Home")).toBeVisible()
})

test.only("sign in", async ({page}) => {
    await page.goto("http://localhost:3000")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill("homer@gmail.com")
    await page.getByRole("textbox", {name: "Password"}).fill("password")
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByText("Home")).toBeVisible()
})

test.only("sign out", async ({page}) => {
    await page.goto("http://localhost:3000")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill("homer@gmail.com")
    await page.getByRole("textbox", {name: "Password"}).fill("password")
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page.getByText("Home")).toBeVisible()

    await page.getByRole("link", {name: "Sign out"}).click()

    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
})

test("authenticated content", async ({page}) => {
    await page.goto("http://localhost:3000")
    await page.getByRole("link", {name: "Dashboard"}).click()

    await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()
})
