import {redirect} from "@remix-run/node"
import * as remix from "@remix-run/react"
import {renderHook} from "@testing-library/react"
import bcrypt from "bcryptjs"
import {describe, expect, test, vitest} from "vitest"

import {mockUser} from "~/mocks/users"
import {
    requireUser,
    signIn,
    signOut,
    signUp,
    useAuth,
} from "~/utils/auth.server"
import * as session from "~/utils/session.server"
import * as users from "~/utils/users.server"

const getUserByEmailSpy = vitest.spyOn(users, "getUserByEmail")
const createUserSpy = vitest.spyOn(users, "createUser")
const createSessionSpy = vitest.spyOn(session, "createSession")
const deleteSessionSpy = vitest.spyOn(session, "deleteSession")
const getUserFromSessionSpy = vitest.spyOn(session, "getUserFromSession")
const compareSpy = vitest.spyOn(bcrypt, "compare")
const useRouteLoaderDataSpy = vitest.spyOn(remix, "useRouteLoaderData")

describe("signUp", () => {
    test("user signs up", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(null)
        createUserSpy.mockResolvedValueOnce(mockUser)

        const request = new Request("http://example.com")

        await signUp({
            request,
            email: mockUser.email,
            password: "password",
            passwordConfirmation: "password",
        })

        expect(createSessionSpy).toHaveBeenCalledTimes(1)

        expect(createSessionSpy).toHaveBeenLastCalledWith({
            request,
            userId: mockUser.id,
        })
    })

    test("user already exists", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(mockUser)

        const request = new Request("http://example.com")

        const signUpPromise = signUp({
            request,
            email: mockUser.email,
            password: "password",
            passwordConfirmation: "password",
        })

        await expect(() => signUpPromise).rejects.toThrowError(
            "User already exists",
        )
    })

    test("passwords do not match", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        const signUpPromise = signUp({
            request,
            email: mockUser.email,
            password: "password",
            passwordConfirmation: "different-password",
        })

        await expect(() => signUpPromise).rejects.toThrowError(
            "Passwords do not match",
        )
    })
})

describe("signIn", () => {
    test("user signs in", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(mockUser)

        // @ts-expect-error bcrypt compare type
        compareSpy.mockResolvedValueOnce(true)

        const request = new Request("http://example.com")

        await signIn({
            request,
            email: mockUser.email,
            password: "password",
        })

        expect(createSessionSpy).toHaveBeenCalledTimes(1)

        expect(createSessionSpy).toHaveBeenLastCalledWith({
            request,
            userId: mockUser.id,
        })
    })

    test("user not found", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        const signInPromise = signIn({
            request,
            email: mockUser.email,
            password: "password",
        })

        await expect(signInPromise).rejects.toThrowError("User not found")
    })

    test("invalid password", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(mockUser)

        // @ts-expect-error bcrypt compare type
        compareSpy.mockResolvedValueOnce(false)

        const request = new Request("http://example.com")

        const signInPromise = signIn({
            request,
            email: mockUser.email,
            password: "password",
        })

        await expect(signInPromise).rejects.toThrowError("Invalid password")
    })
})

describe("signOut", () => {
    test("user signs out", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(mockUser)

        const request = new Request("http://example.com")

        await signOut({request})

        expect(deleteSessionSpy).toHaveBeenCalledTimes(1)
        expect(deleteSessionSpy).toHaveBeenLastCalledWith(request)
    })

    test("handles no user", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        await signOut({request})

        expect(deleteSessionSpy).toHaveBeenCalledTimes(1)
        expect(deleteSessionSpy).toHaveBeenLastCalledWith(request)
    })
})

describe("requireUser", () => {
    test("requires user", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(mockUser)

        const request = new Request("http://example.com")

        const user = await requireUser(request)
        expect(user).toEqual(mockUser)
    })

    test("handles no user", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        await expect(() => requireUser(request)).rejects.toEqual(
            redirect("/signin"),
        )
    })
})

describe("useAuth", () => {
    test("uses authentication", () => {
        useRouteLoaderDataSpy.mockReturnValueOnce({user: mockUser})

        const {result} = renderHook(() => useAuth())
        expect(result.current).toEqual(mockUser)
    })

    test("handles no user", () => {
        useRouteLoaderDataSpy.mockReturnValueOnce(null)

        const {result} = renderHook(() => useAuth())
        expect(result.current).toEqual(null)
    })
})
