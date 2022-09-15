import {Form, NavLink, useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import type {RootLoaderData} from "~/root"

const Navigation: FC = () => {
    const {user} = useLoaderData<RootLoaderData>()

    return (
        <nav className="flex gap-4 font-bold">
            <NavLink to="/" end prefetch="intent">
                Home
            </NavLink>

            <NavLink to="/dashboard" prefetch="intent">
                Dashboard
            </NavLink>

            {user ? (
                <Form action="/logout" method="post">
                    <button type="submit" className="button">
                        Logout
                    </button>
                </Form>
            ) : (
                <>
                    <NavLink to="/signup" prefetch="intent">
                        Sign Up
                    </NavLink>

                    <NavLink to="/login" prefetch="intent">
                        Login
                    </NavLink>
                </>
            )}
        </nav>
    )
}

export default Navigation
