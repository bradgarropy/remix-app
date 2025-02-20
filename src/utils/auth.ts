import {useRouteLoaderData} from "@remix-run/react"

import type {loader as rootLoader} from "~/root"

const useAuth = () => {
    console.log("useAuth")
    const data = useRouteLoaderData<typeof rootLoader>("root")
    console.log({data})

    if (!data) {
        console.log("no data")
        return null
    }

    const {user} = data
    console.log({user})
    return user
}

export {useAuth}
