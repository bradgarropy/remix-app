import {redirect} from "@remix-run/node"
import bcrypt from "bcryptjs"
import {describe, expect, test, vitest} from "vitest"

import {mockExpiredResetToken, mockResetToken} from "~/mocks/resetTokens"
import {homer} from "~/mocks/users"
import * as resetTokens from "~/models/resetTokens.server"
import * as users from "~/models/users.server"
import {
    requireUser,
    resetPassword,
    signIn,
    signOut,
    signUp,
} from "~/utils/auth.server"
import * as session from "~/utils/session.server"

const getUserByIdSpy = vitest.spyOn(users, "getUserById")
const getUserByEmailSpy = vitest.spyOn(users, "getUserByEmail")
const createUserSpy = vitest.spyOn(users, "createUser")
const updatePasswordSpy = vitest.spyOn(users, "updatePassword")
const createSessionSpy = vitest.spyOn(session, "createSession")
const deleteSessionSpy = vitest.spyOn(session, "deleteSession")
const getUserFromSessionSpy = vitest.spyOn(session, "getUserFromSession")
const compareSpy = vitest.spyOn(bcrypt, "compare")
const getResetTokenSpy = vitest.spyOn(resetTokens, "getResetToken")
const deleteResetTokenSpy = vitest.spyOn(resetTokens, "deleteResetToken")

describe("signUp", () => {
    test("user signs up", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(null)
        createUserSpy.mockResolvedValueOnce(homer)

        const request = new Request("http://example.com")

        await signUp({
            request,
            email: homer.email,
            password: "password",
            passwordConfirmation: "password",
        })

        expect(createSessionSpy).toHaveBeenCalledTimes(1)

        expect(createSessionSpy).toHaveBeenLastCalledWith({
            request,
            userId: homer.id,
            remember: false,
            redirectUrl: "/",
        })
    })

    test("user already exists", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(homer)

        const request = new Request("http://example.com")

        const signUpPromise = signUp({
            request,
            email: homer.email,
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
            email: homer.email,
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
        getUserByEmailSpy.mockResolvedValueOnce(homer)

        // @ts-expect-error bcrypt compare type
        compareSpy.mockResolvedValueOnce(true)

        const request = new Request("http://example.com")

        await signIn({
            request,
            email: homer.email,
            password: "password",
            redirectUrl: "/",
        })

        expect(createSessionSpy).toHaveBeenCalledTimes(1)

        expect(createSessionSpy).toHaveBeenLastCalledWith({
            request,
            userId: homer.id,
            remember: true,
            redirectUrl: "/",
        })
    })

    test("user not found", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        const signInPromise = signIn({
            request,
            email: homer.email,
            password: "password",
            redirectUrl: "/",
        })

        await expect(signInPromise).rejects.toThrowError("User not found")
    })

    test("invalid password", async () => {
        getUserByEmailSpy.mockResolvedValueOnce(homer)

        // @ts-expect-error bcrypt compare type
        compareSpy.mockResolvedValueOnce(false)

        const request = new Request("http://example.com")

        const signInPromise = signIn({
            request,
            email: homer.email,
            password: "password",
            redirectUrl: "/",
        })

        await expect(signInPromise).rejects.toThrowError("Invalid password")
    })
})

describe("signOut", () => {
    test("user signs out", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(homer)

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
        getUserFromSessionSpy.mockResolvedValueOnce(homer)

        const request = new Request("http://example.com")

        const user = await requireUser(request)
        expect(user).toEqual(homer)
    })

    test("handles no user", async () => {
        getUserFromSessionSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        await expect(() => requireUser(request)).rejects.toEqual(
            redirect("/signin?redirectUrl=/"),
        )
    })
})

describe("resetPassword", () => {
    test("resets password", async () => {
        getResetTokenSpy.mockResolvedValueOnce(mockResetToken)
        getUserByIdSpy.mockResolvedValueOnce(homer)
        updatePasswordSpy.mockResolvedValueOnce(homer)
        getUserByEmailSpy.mockResolvedValueOnce(homer)

        // @ts-expect-error bcrypt compare type
        compareSpy.mockResolvedValueOnce(true)

        const request = new Request("http://example.com")

        await resetPassword({
            request,
            token: mockResetToken.token,
            newPassword: "new-password",
            newPasswordConfirmation: "new-password",
        })

        expect(updatePasswordSpy).toHaveBeenCalledTimes(1)
        expect(updatePasswordSpy).toHaveBeenLastCalledWith({
            id: mockResetToken.userId,
            password: "new-password",
        })

        expect(deleteResetTokenSpy).toHaveBeenCalledTimes(1)
        expect(deleteResetTokenSpy).toHaveBeenLastCalledWith(mockResetToken.id)
    })

    test("invalid reset token", async () => {
        getResetTokenSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        const resetPasswordPromise = resetPassword({
            request,
            token: "invalid-reset-token",
            newPassword: "new-password",
            newPasswordConfirmation: "new-password",
        })

        await expect(resetPasswordPromise).rejects.toThrowError(
            "Invalid reset token",
        )
    })

    test("reset token is expired", async () => {
        getResetTokenSpy.mockResolvedValueOnce(mockExpiredResetToken)

        const request = new Request("http://example.com")

        const resetPasswordPromise = resetPassword({
            request,
            token: mockExpiredResetToken.token,
            newPassword: "new-password",
            newPasswordConfirmation: "new-password",
        })

        await expect(resetPasswordPromise).rejects.toThrowError(
            "Reset token is expired",
        )

        expect(deleteResetTokenSpy).toHaveBeenCalledTimes(1)

        expect(deleteResetTokenSpy).toHaveBeenLastCalledWith(
            mockExpiredResetToken.id,
        )
    })

    test("user not found", async () => {
        getResetTokenSpy.mockResolvedValueOnce(mockResetToken)
        getUserByIdSpy.mockResolvedValueOnce(null)

        const request = new Request("http://example.com")

        const resetPasswordPromise = resetPassword({
            request,
            token: mockResetToken.token,
            newPassword: "new-password",
            newPasswordConfirmation: "new-password",
        })

        await expect(resetPasswordPromise).rejects.toThrowError(
            "User not found",
        )
    })

    test("passwords do not match", async () => {
        getResetTokenSpy.mockResolvedValueOnce(mockResetToken)
        getUserByIdSpy.mockResolvedValueOnce(homer)

        const request = new Request("http://example.com")

        const resetPasswordPromise = resetPassword({
            request,
            token: mockResetToken.token,
            newPassword: "new-password",
            newPasswordConfirmation: "new-password-confirmation",
        })

        await expect(resetPasswordPromise).rejects.toThrowError(
            "Passwords do not match",
        )
    })
})
