import {render, screen} from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import {expect, test, vitest} from "vitest"

import * as auth from "~/utils/auth"

const useAuthSpy = vitest.spyOn(auth, "useAuth")

import Navigation from "~/components/Navigation"
import {mockUser} from "~/mocks/users"

test("shows unauthenticated routes", () => {
    useAuthSpy.mockReturnValueOnce(null)

    render(
        <MemoryRouter>
            <Navigation />
        </MemoryRouter>,
    )

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.queryByText("Notes")).not.toBeInTheDocument()
    expect(screen.getByText("Sign up")).toBeInTheDocument()
    expect(screen.getByText("Sign in")).toBeInTheDocument()
    expect(screen.queryByText("Sign out")).not.toBeInTheDocument()
    expect(screen.getByText("Sentry")).toBeInTheDocument()
})

test("shows authenticated routes", () => {
    useAuthSpy.mockReturnValueOnce(mockUser)

    render(
        <MemoryRouter>
            <Navigation />
        </MemoryRouter>,
    )

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Notes")).toBeInTheDocument()
    expect(screen.queryByText("Sign up")).not.toBeInTheDocument()
    expect(screen.queryByText("Sign in")).not.toBeInTheDocument()
    expect(screen.getByText("Sign out")).toBeInTheDocument()
    expect(screen.getByText("Sentry")).toBeInTheDocument()
})
