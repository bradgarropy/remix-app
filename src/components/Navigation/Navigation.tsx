import {NavLink} from "@remix-run/react"

import {useAuth} from "~/utils/auth.server"

const Navigation = () => {
    const user = useAuth()

    return (
        <nav className="flex gap-4 font-bold">
            <NavLink to="/" prefetch="intent">
                Home
            </NavLink>

            <NavLink to="/about" prefetch="intent">
                About
            </NavLink>

            <NavLink to="/dashboard" prefetch="intent">
                Dashboard
            </NavLink>

            {user ? (
                <NavLink to="/signout" prefetch="none">
                    Sign out
                </NavLink>
            ) : (
                <>
                    <NavLink to="/signup" prefetch="intent">
                        Sign up
                    </NavLink>

                    <NavLink to="/signin" prefetch="intent">
                        Sign in
                    </NavLink>
                </>
            )}

            <NavLink to="/sentry" prefetch="intent">
                Sentry
            </NavLink>
        </nav>
    )
}

export default Navigation
