import {describe, expect, test} from "vitest"
import {z, ZodError} from "zod"

import {homer} from "~/mocks/users"

import {parseFormData} from "./forms"

describe("parseFormData", () => {
    test("parses correct form data", async () => {
        const formData = new FormData()

        formData.set("email", homer.email)
        formData.set("password", homer.password)

        const request = new Request("https://example.com", {
            method: "post",
            body: formData,
        })

        const schema = z.object({
            email: z.string().email(),
            password: z.string(),
        })

        const data = await parseFormData(request, schema)

        expect(data).toEqual({
            email: homer.email,
            password: homer.password,
        })
    })

    test("parses incorrect form data", async () => {
        const formData = new FormData()

        formData.set("email", "invalid-email")
        formData.set("password", homer.password)

        const request = new Request("https://example.com", {
            method: "post",
            body: formData,
        })

        const schema = z.object({
            email: z.string().email(),
            password: z.string(),
        })

        const promise = parseFormData(request, schema)
        await expect(promise).rejects.toThrowError(ZodError)
    })
})
