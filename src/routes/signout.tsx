import type {LoaderFunctionArgs} from "@remix-run/node"

import {signOut} from "~/utils/auth.server"

export const loader = async ({request}: LoaderFunctionArgs) => {
    return signOut({request})
}
