import type {V2_MetaFunction} from "@remix-run/node"

const meta: V2_MetaFunction = () => {
    return [
        {
            title: "💿 remix app | home",
        },
    ]
}

const IndexRoute = () => {
    return <h2 className="text-2xl font-bold">Home</h2>
}

export default IndexRoute
export {meta}
