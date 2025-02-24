import {hash, randomUUID} from "node:crypto"

import type {ResetToken} from "@prisma/client"

import {db} from "~/utils/database.server"

const getResetToken = async (token: ResetToken["token"]) => {
    const hashedToken = hash("sha256", token, "hex")

    const resetToken = await db.resetToken.findUnique({
        where: {token: hashedToken},
    })

    return resetToken
}

type CreateResetParams = {
    userId: ResetToken["userId"]
}

const createResetToken = async ({userId}: CreateResetParams) => {
    const token = randomUUID()
    const hashedToken = hash("sha256", token, "hex")

    const FIFTEEN_MINUTES_FROM_NOW = new Date(
        Date.now() + 1000 * 60 * 15,
    ).toISOString()

    await db.resetToken.create({
        data: {
            userId,
            token: hashedToken,
            expiresAt: FIFTEEN_MINUTES_FROM_NOW,
        },
    })

    return token
}

const deleteResetToken = async (id: ResetToken["id"]) => {
    const resetToken = await db.resetToken.delete({where: {id}})
    return resetToken
}

const deleteExpiredResetTokens = async () => {
    const now = new Date().toISOString()

    const {count} = await db.resetToken.deleteMany({
        where: {
            expiresAt: {
                lt: now,
            },
        },
    })

    return count
}

export {
    createResetToken,
    deleteExpiredResetTokens,
    deleteResetToken,
    getResetToken,
}
