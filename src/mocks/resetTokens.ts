import type {ResetToken} from "@prisma/client"

const mockResetToken: ResetToken = {
    id: 1,
    token: "reset-token",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 15),
}

const mockExpiredResetToken: ResetToken = {
    id: 1,
    token: "expired-reset-token",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 15),
}

export {mockExpiredResetToken, mockResetToken}
