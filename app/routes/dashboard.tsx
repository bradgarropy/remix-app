import type {LoaderFunction, MetaFunction} from "@remix-run/node"

import {requireUser} from "~/utils/auth.server"

const meta: MetaFunction = () => ({
    title: "💿 remix starter | dashboard",
})

const loader: LoaderFunction = async ({request}) => {
    return requireUser(request)
}

const DashboardRoute = () => {
    return <h2 className="text-2xl font-bold">Dashboard</h2>
}

export default DashboardRoute
export {loader, meta}
