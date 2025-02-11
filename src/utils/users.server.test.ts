import {describe, expect, test} from "vitest"

import {mockDb} from "~/mocks/db"
import {mockUser} from "~/mocks/users"
import {createUser, getUserByEmail, getUserById} from "~/utils/users.server"

describe("createUser", () => {
    test("creates user", async () => {
        mockDb.user.create.mockResolvedValueOnce(mockUser)

        const user = await createUser({
            email: mockUser.email,
            password: mockUser.password,
        })

        expect(user).toEqual(mockUser)
    })
})

describe("getUserById", () => {
    test("gets user by id", async () => {
        mockDb.user.findUnique.mockResolvedValueOnce(mockUser)

        const user = await getUserById(mockUser.id)
        expect(user).toEqual(mockUser)
    })
})

describe("getUserByEmail", () => {
    test("gets user by email", async () => {
        mockDb.user.findUnique.mockResolvedValueOnce(mockUser)

        const user = await getUserByEmail(mockUser.email)
        expect(user).toEqual(mockUser)
    })
})
