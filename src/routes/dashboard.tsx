import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {requireUser} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | dashboard",
    },
]

export const loader = async ({request}: LoaderFunctionArgs) => {
    const user = await requireUser(request)
    return {user}
}

const Route = () => {
    const {user} = useLoaderData<typeof loader>()

    return (
        <>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p>{`Hello ${user.email}`}</p>
        </>
    )
}

export default Route
