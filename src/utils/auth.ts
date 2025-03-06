import {useRouteLoaderData} from "@remix-run/react"

import type {loader as rootLoader} from "~/root"

const useAuth = () => {
    const data = useRouteLoaderData<typeof rootLoader>("root")

    if (!data) {
        return null
    }

    const {user} = data
    return user
}

export {useAuth}
