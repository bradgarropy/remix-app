import "@testing-library/jest-dom/vitest"

import {cleanup} from "@testing-library/react"
import {afterEach, beforeEach, vitest} from "vitest"
import {mockReset} from "vitest-mock-extended"

import {mockDb} from "~/mocks/db"

vitest.mock("~/utils/database.server", () => {
    return {
        __esModule: true,
        db: mockDb,
    }
})

beforeEach(() => {
    mockReset(mockDb)
})

afterEach(() => {
    cleanup()
})
