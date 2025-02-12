import {render, screen} from "@testing-library/react"
import {MemoryRouter} from "react-router"
import {expect, test, vitest} from "vitest"

import Header from "~/components/Header"
import * as Navigation from "~/components/Navigation"

const NavigationSpy = vitest.spyOn(Navigation, "default")

test("shows header", () => {
    NavigationSpy.mockReturnValueOnce(<p>navigation</p>)

    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>,
    )

    expect(screen.getByText("remix app")).toBeInTheDocument()
})
