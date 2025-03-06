import {NavLink} from "@remix-run/react"

import {useAuth} from "~/utils/auth"

const Navigation = () => {
    const user = useAuth()

    return (
        <nav className="flex gap-4 font-bold">
            <NavLink to="/" prefetch="intent">
                Home
            </NavLink>

            {user ? (
                <>
                    <NavLink to="/notes" prefetch="intent">
                        Notes
                    </NavLink>

                    <NavLink to="/signout" prefetch="none">
                        Sign out
                    </NavLink>
                </>
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
