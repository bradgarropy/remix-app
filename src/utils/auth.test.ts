import * as remix from "@remix-run/react"
import {renderHook} from "@testing-library/react"
import {describe, expect, test, vitest} from "vitest"

import {homer} from "~/mocks/users"
import {useAuth} from "~/utils/auth"

const useRouteLoaderDataSpy = vitest.spyOn(remix, "useRouteLoaderData")

describe("useAuth", () => {
    test("uses authentication", () => {
        useRouteLoaderDataSpy.mockReturnValueOnce({user: homer})

        const {result} = renderHook(() => useAuth())
        expect(result.current).toEqual(homer)
    })

    test("handles no user", () => {
        useRouteLoaderDataSpy.mockReturnValueOnce(null)

        const {result} = renderHook(() => useAuth())
        expect(result.current).toEqual(null)
    })
})
