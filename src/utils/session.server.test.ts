import {createCookie} from "@remix-run/node"
import {describe, expect, test, vitest} from "vitest"

import {homer} from "~/mocks/users"
import * as users from "~/models/users.server"
import {
    createSession,
    deleteSession,
    getSession,
    getUserFromSession,
} from "~/utils/session.server"

const getUserByIdSpy = vitest.spyOn(users, "getUserById")

describe("createSession", () => {
    test("creates a session", async () => {
        const request = new Request("https://example.com")

        const response = await createSession({
            request,
            userId: homer.id,
            redirectUrl: "/",
        })

        const location = response.headers.get("location")
        const cookie = response.headers.get("set-cookie")

        expect(response.status).toEqual(302)
        expect(location).toEqual("/")
        expect(cookie).toContain("__session")
        expect(cookie).not.toContain("Max-Age=604800")
        expect(cookie).toContain("Path=/")
        expect(cookie).toContain("HttpOnly")
        expect(cookie).toContain("SameSite=Lax")
    })

    test("remembers a session", async () => {
        const request = new Request("https://example.com")

        const response = await createSession({
            request,
            userId: homer.id,
            remember: true,
            redirectUrl: "/",
        })

        const location = response.headers.get("location")
        const cookie = response.headers.get("set-cookie")

        expect(response.status).toEqual(302)
        expect(location).toEqual("/")
        expect(cookie).toContain("__session")
        expect(cookie).toContain("Max-Age=604800")
        expect(cookie).toContain("Path=/")
        expect(cookie).toContain("HttpOnly")
        expect(cookie).toContain("SameSite=Lax")
    })
})

describe("getSession", () => {
    test("gets session", async () => {
        const cookie = await createCookie("__session", {
            secrets: [import.meta.env.VITE_SESSION_SECRET],
        }).serialize({userId: homer.id})

        const request = new Request("https://example.com", {
            headers: {cookie},
        })

        const session = await getSession(request)
        expect(session.get("userId")).toEqual(homer.id)
    })
})

describe("getUserFromSession", () => {
    test("gets user from session", async () => {
        getUserByIdSpy.mockResolvedValueOnce(homer)

        const cookie = await createCookie("__session", {
            secrets: [import.meta.env.VITE_SESSION_SECRET],
        }).serialize({userId: homer.id})

        const request = new Request("https://example.com", {
            headers: {cookie},
        })

        const user = await getUserFromSession(request)
        expect(user).toEqual(homer)
    })

    test("handles no user", async () => {
        const cookie = await createCookie("__session", {
            secrets: [import.meta.env.VITE_SESSION_SECRET],
        }).serialize({})

        const request = new Request("https://example.com", {
            headers: {cookie},
        })

        const user = await getUserFromSession(request)
        expect(user).toEqual(null)
    })
})

describe("deleteSession", () => {
    test("deletes session", async () => {
        const cookie = await createCookie("__session", {
            secrets: [import.meta.env.VITE_SESSION_SECRET],
        }).serialize({userId: homer.id})

        const request = new Request("https://example.com", {
            headers: {cookie},
        })

        const response = await deleteSession(request)

        const location = response.headers.get("location")
        const cookieHeader = response.headers.get("set-cookie")

        expect(response.status).toEqual(302)
        expect(location).toEqual("/")
        expect(cookieHeader).toContain("__session")
        expect(cookieHeader).toContain("Path=/")
        expect(cookieHeader).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT")
        expect(cookieHeader).toContain("HttpOnly")
        expect(cookieHeader).toContain("SameSite=Lax")
    })
})
