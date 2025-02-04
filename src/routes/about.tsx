import type {MetaFunction} from "@remix-run/node"

const meta: MetaFunction = () => [
    {
        title: "💿 remix app | about",
    },
]

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold">About</h2>
        </>
    )
}

export default Route
export {meta}
