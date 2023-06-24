import type {LinksFunction, LoaderArgs, V2_MetaFunction} from "@remix-run/node"
import {json} from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import tailwindStyles from "~/styles/tailwind.css"
import {getUser} from "~/utils/auth.server"

export const meta: V2_MetaFunction = () => {
    return [
        {charset: "utf-8"},
        {title: "💿 remix app"},
        {viewport: "width=device-width,initial-scale=1"},
    ]
}

export const links: LinksFunction = () => {
    const links = [
        {
            rel: "stylesheet",
            href: tailwindStyles,
        },
    ]

    return links
}

export const loader = async ({request}: LoaderArgs) => {
    const user = await getUser(request)
    return json({user})
}

const App = () => {
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
