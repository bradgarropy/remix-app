import type {MetaFunction} from "@remix-run/node"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | dashboard",
    },
]

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold">Dashboard</h2>
        </>
    )
}

export default Route
