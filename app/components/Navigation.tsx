import {Form, NavLink, useLoaderData} from "@remix-run/react"
import type {FC} from "react"
import {loader} from "~/root"

const Navigation: FC = () => {
    const {user} = useLoaderData<typeof loader>()

    return (
        <nav className="flex gap-4 font-bold">
            {user ? (
                <>
                    <NavLink to="/todos" prefetch="intent">
                        Todos
                    </NavLink>

                    <Form action="/logout" method="post">
                        <button type="submit" className="button">
                            Logout
                        </button>
                    </Form>
                </>
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
