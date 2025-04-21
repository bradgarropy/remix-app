import {describe, expect, test} from "vitest"

import {createErrorStack, hasErrors} from "~/utils/errors"

describe("createErrorStack", () => {
    test("creates error stack", () => {
        const error = new Error("Internal server error")
        const stack = createErrorStack(error)

        expect(stack).toContain("Error: Internal server error")
    })

    test("handles empty error", () => {
        const error = new Error()
        error.stack = undefined

        const stack = createErrorStack(error)

        expect(stack).toEqual("")
    })
})

describe("hasErrors", () => {
    test("has errors", () => {
        const errors = {
            email: "User already exists",
        }

        const result = hasErrors(errors)
        expect(result).toBe(true)
    })

    test("does not have errors", () => {
        const errors = {}

        const result = hasErrors(errors)
        expect(result).toBe(false)
    })
})
