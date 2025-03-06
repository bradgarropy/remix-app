import type {MetaFunction} from "@remix-run/node"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | sentry",
    },
]

export const loader = () => {
    throw new Error("Sentry Loader Error")
}

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold">Sentry | Loader Error</h2>
        </>
    )
}

export default Route
