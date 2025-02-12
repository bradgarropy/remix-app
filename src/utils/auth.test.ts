import * as remix from "@remix-run/react"
import {renderHook} from "@testing-library/react"
import {describe, expect, test, vitest} from "vitest"

import {mockUser} from "~/mocks/users"
import {useAuth} from "~/utils/auth"

const useRouteLoaderDataSpy = vitest.spyOn(remix, "useRouteLoaderData")

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
