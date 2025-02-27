import {render, screen} from "@testing-library/react"
import {MemoryRouter} from "react-router"
import {expect, test, vitest} from "vitest"

import Header from "~/components/Header"
import * as Navigation from "~/components/Navigation"
import {homer} from "~/mocks/users"
import * as auth from "~/utils/auth"

const useAuthSpy = vitest.spyOn(auth, "useAuth")
const NavigationSpy = vitest.spyOn(Navigation, "default")

test("shows header with user", () => {
    useAuthSpy.mockReturnValueOnce(homer)
    NavigationSpy.mockReturnValueOnce(<p>navigation</p>)

    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>,
    )

    expect(screen.getByText("remix app")).toBeInTheDocument()
    expect(screen.getByText(homer.email)).toBeInTheDocument()
})

test("shows header without user", () => {
    useAuthSpy.mockReturnValueOnce(null)
    NavigationSpy.mockReturnValueOnce(<p>navigation</p>)

    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>,
    )

    expect(screen.getByText("remix app")).toBeInTheDocument()
    expect(screen.queryByText(homer.email)).not.toBeInTheDocument()
})
