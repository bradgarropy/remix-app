import crypto from "node:crypto"

import {describe, expect, test, vitest} from "vitest"

import {mockDb} from "~/mocks/db"
import {mockResetToken} from "~/mocks/resetTokens"
import {
    createResetToken,
    deleteResetToken,
    getResetToken,
} from "~/utils/resetTokens.server"

vitest.mock("node:crypto", () => {
    return {
        default: {
            hash: vitest.fn(),
            randomUUID: vitest.fn(),
        },
    }
})

const hashMock = vitest.mocked(crypto.hash)
const randomUUIDMock = vitest.mocked(crypto.randomUUID)

describe("getResetToken", () => {
    test("gets reset token", async () => {
        mockDb.resetToken.findUnique.mockResolvedValueOnce(mockResetToken)

        const resetToken = await getResetToken(mockResetToken.token)
        expect(resetToken).toEqual(mockResetToken)
    })
})

describe("createResetToken", () => {
    test("creates reset token", async () => {
        hashMock.mockReturnValueOnce(mockResetToken.token)
        randomUUIDMock.mockReturnValueOnce("aaa-bbb-ccc-ddd-eee")
        mockDb.resetToken.create.mockResolvedValueOnce(mockResetToken)

        const resetToken = await createResetToken({
            userId: mockResetToken.userId,
        })

        expect(resetToken).toEqual("aaa-bbb-ccc-ddd-eee")
    })
})

describe("deleteResetToken", () => {
    test("deletes reset token", async () => {
        mockDb.resetToken.delete.mockResolvedValueOnce(mockResetToken)

        const resetToken = await deleteResetToken(mockResetToken.id)
        expect(resetToken).toEqual(mockResetToken)
    })
})
