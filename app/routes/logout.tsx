import type {ActionFunction} from "@remix-run/node"

import {logout} from "~/utils/auth.server"

const action: ActionFunction = async ({request}) => {
    return logout(request)
}

export {action}
