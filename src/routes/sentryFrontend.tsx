import type {MetaFunction} from "@remix-run/node"

export const meta: MetaFunction = () => [
    {
        title: "remix app | sentry",
    },
]

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Sentry | Frontend Error</h2>

            <button
                type="button"
                className="bg-purple-500 text-white px-4 py-2 font-bold hover:bg-purple-600"
                onClick={() => {
                    throw new Error("Sentry Frontend Error")
                }}
            >
                Throw error
            </button>
        </>
    )
}

export default Route
