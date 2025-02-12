import type {MetaFunction} from "@remix-run/node"
import {Link} from "@remix-run/react"

export const meta: MetaFunction = () => [
    {
        title: "remix app | sentry",
    },
]

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Sentry</h2>

            <p>
                This application uses{" "}
                <Link
                    to="https://sentry.io"
                    className="underline decoration-purple-500 decoration-2 underline-offset-2"
                >
                    Sentry
                </Link>{" "}
                to catch errors.
            </p>

            <p className="mb-4">
                Use the links below to simulate errors in different sections of
                the application.
            </p>

            <ul className="list-disc pl-8">
                <li>
                    <Link
                        to={"/sentry/frontend"}
                        className="underline decoration-purple-500 decoration-2 underline-offset-2"
                    >
                        Frontend
                    </Link>
                </li>

                <li>
                    <Link
                        to={"/sentry/loader"}
                        className="underline decoration-purple-500 decoration-2 underline-offset-2"
                    >
                        Loader
                    </Link>
                </li>

                <li>
                    <Link
                        to={"/sentry/action"}
                        className="underline decoration-purple-500 decoration-2 underline-offset-2"
                    >
                        Action
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default Route
