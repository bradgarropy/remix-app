import type {User} from "@prisma/client"
import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node"
import {json} from "@remix-run/node"
import {
    Form,
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import tailwindStyles from "~/styles/tailwind.css"
import {getUser} from "~/utils/auth.server"

const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "💿 remix app",
    viewport: "width=device-width,initial-scale=1",
})

const links: LinksFunction = () => {
    const links = [
        {
            rel: "stylesheet",
            href: tailwindStyles,
        },
    ]

    return links
}

type RootLoaderData = {
    user?: User
}

const loader: LoaderFunction = async ({request}) => {
    const user = await getUser(request)

    const data: RootLoaderData = {
        user,
    }

    return json<RootLoaderData>(data)
}

const App = () => {
    const {user} = useLoaderData<RootLoaderData>()

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>

            <body className="bg-remix-black text-white">
                <div className="min-h-screen grid grid-rows-layout">
                    <Header />

                    <div className="p-8">
                        <Outlet />
                    </div>

                    <Footer />
                </div>

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export default App
export {links, loader, meta}
export type {RootLoaderData}
