import type {
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node"
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react"
import {withSentry} from "@sentry/remix"

import Error from "~/components/ErrorBoundary"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import tailwindStyles from "~/styles/tailwind.css?url"
import {getUserFromSession} from "~/utils/session.server"

export const meta: MetaFunction = () => [
    {charset: "utf-8"},
    {title: "💿 remix app"},
    {viewport: "width=device-width,initial-scale=1"},
]

export const links: LinksFunction = () => {
    const links = [
        {
            rel: "stylesheet",
            href: tailwindStyles,
        },
    ]

    return links
}

export const loader = async ({request}: LoaderFunctionArgs) => {
    const user = await getUserFromSession(request)
    return {user}
}

const App = () => {
    return (
        <html lang="en">
            <head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html;charset=utf-8"
                />

                <Meta />
                <Links />
            </head>

            <body className="bg-white text-black">
                <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
                    <Header />

                    <div className="p-8">
                        <Outlet />
                    </div>

                    <Footer />
                </div>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export const ErrorBoundary = () => {
    return (
        <html lang="en">
            <head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html;charset=utf-8"
                />

                <Meta />
                <Links />
            </head>

            <body className="bg-white text-black">
                <Error />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default withSentry(App)
