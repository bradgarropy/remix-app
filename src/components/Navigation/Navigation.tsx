import {NavLink} from "@remix-run/react"

const Navigation = () => {
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

            <NavLink to="/signup" prefetch="intent">
                Sign up
            </NavLink>

            <NavLink to="/signin" prefetch="intent">
                Sign in
            </NavLink>

            <NavLink to="/signout" prefetch="none">
                Sign out
            </NavLink>

            <NavLink to="/sentry" prefetch="intent">
                Sentry
            </NavLink>
        </nav>
    )
}

export default Navigation
