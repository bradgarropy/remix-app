import {NavLink, useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import Navigation from "~/components/Navigation"
import {loader} from "~/root"

const Header: FC = () => {
    const {user} = useLoaderData<typeof loader>()

    return (
        <header className="flex justify-between items-center px-8 py-12">
            <div className="flex items-baseline gap-4">
                <NavLink to="/" prefetch="intent">
                    <h1 className="text-3xl font-bold">💿 Remix App</h1>
                </NavLink>

                {user ? <span>{user.email}</span> : null}
            </div>

            <Navigation />
        </header>
    )
}

export default Header
