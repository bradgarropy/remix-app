import {describe, expect, test} from "vitest"

import {mockDb} from "~/mocks/db"
import {homer} from "~/mocks/users"
import {
    createUser,
    getUserByEmail,
    getUserById,
    updatePassword,
} from "~/models/users.server"

describe("createUser", () => {
    test("creates user", async () => {
        mockDb.user.create.mockResolvedValueOnce(homer)

        const user = await createUser({
            email: homer.email,
            password: homer.password,
        })

        expect(user).toEqual(homer)
    })
})

describe("getUserById", () => {
    test("gets user by id", async () => {
        mockDb.user.findUnique.mockResolvedValueOnce(homer)

        const user = await getUserById(homer.id)
        expect(user).toEqual(homer)
    })
})

describe("getUserByEmail", () => {
    test("gets user by email", async () => {
        mockDb.user.findUnique.mockResolvedValueOnce(homer)

        const user = await getUserByEmail(homer.email)
        expect(user).toEqual(homer)
    })
})

describe("updatePassword", () => {
    test("updates password", async () => {
        mockDb.user.update.mockResolvedValueOnce(homer)

        const user = await updatePassword({
            id: homer.id,
            password: homer.password,
        })

        expect(user).toEqual(homer)
    })
})
