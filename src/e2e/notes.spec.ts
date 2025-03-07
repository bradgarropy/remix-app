import {expect, test} from "@playwright/test"

import {mockNotes} from "~/mocks/notes"
import {homer, marge} from "~/mocks/users"

test("view note", async ({page}) => {
    await page.goto("/notes")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()
    await expect(page.getByText("⊕ New note")).toBeVisible()

    for (const mockNote of mockNotes) {
        await expect(page.getByText(mockNote.content)).toBeVisible()
    }

    await page.getByText(mockNotes[0].content).click()

    await expect(page).toHaveTitle("💿 remix app | note")
    await expect(page.getByRole("heading", {name: "Update note"})).toBeVisible()
    await expect(page.getByText("⊖ Delete note")).toBeVisible()
    await expect(page.getByLabel("Note")).toHaveValue(mockNotes[0].content)
    await expect(page.getByRole("button", {name: "Update"})).toBeVisible()
})

test("create note", async ({page}) => {
    await page.goto("/notes")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await page.getByText("⊕ New note").click()

    await expect(page).toHaveTitle("💿 remix app | new note")
    await expect(page.getByRole("heading", {name: "New note"})).toBeVisible()
    await expect(page.getByLabel("Note")).toBeEmpty()
    await expect(page.getByRole("button", {name: "Create"})).toBeVisible()

    await page.getByLabel("Note").fill("Fourth note")
    await page.getByRole("button", {name: "Create"}).click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()

    for (const mockNote of mockNotes) {
        await expect(page.getByText(mockNote.content)).toBeVisible()
    }

    await expect(page.getByText("Fourth note")).toBeVisible()
})

test("update note", async ({page}) => {
    await page.goto("/note/3")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | note")
    await expect(page.getByRole("heading", {name: "Update note"})).toBeVisible()
    await expect(page.getByText("⊖ Delete note")).toBeVisible()
    await expect(page.getByLabel("Note")).toHaveValue(mockNotes[2].content)
    await expect(page.getByRole("button", {name: "Update"})).toBeVisible()

    await page.getByLabel("Note").fill("Third note updated")
    await page.getByRole("button", {name: "Update"}).click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()

    await expect(page.getByText(mockNotes[0].content)).toBeVisible()
    await expect(page.getByText(mockNotes[1].content)).toBeVisible()

    await expect(
        page.getByText(mockNotes[2].content, {exact: true}),
    ).not.toBeVisible()

    await expect(page.getByText("Third note updated")).toBeVisible()
})

test("delete note", async ({page}) => {
    await page.goto("/note/3")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(homer.email)
    await page.getByRole("textbox", {name: "Password"}).fill(homer.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | note")
    await expect(page.getByRole("heading", {name: "Update note"})).toBeVisible()
    await expect(page.getByText("⊖ Delete note")).toBeVisible()
    await expect(page.getByLabel("Note")).toHaveValue(mockNotes[2].content)
    await expect(page.getByRole("button", {name: "Update"})).toBeVisible()

    await page.getByText("⊖ Delete note").click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()
    await expect(page.getByText(mockNotes[0].content)).toBeVisible()
    await expect(page.getByText(mockNotes[1].content)).toBeVisible()
    await expect(page.getByText(mockNotes[2].content)).not.toBeVisible()
})

test("restricted note", async ({page}) => {
    await page.goto("/notes")
    await page.getByRole("link", {name: "Sign in"}).click()

    await page.getByRole("textbox", {name: "Email"}).fill(marge.email)
    await page.getByRole("textbox", {name: "Password"}).fill(marge.password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveTitle("💿 remix app | notes")
    await expect(page.getByRole("heading", {name: "Notes"})).toBeVisible()
    await expect(page.getByText("⊕ New note")).toBeVisible()

    for (const mockNote of mockNotes) {
        await expect(page.getByText(mockNote.content)).not.toBeVisible()
    }

    await page.goto("/note/1")
    await expect(page.getByText("Error: Unexpected Server Error")).toBeVisible()
})
