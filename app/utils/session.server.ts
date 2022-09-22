import type {User} from "@prisma/client"
import {redirect} from "@remix-run/node"

import {sessionStorage} from "~/utils/sessionStorage.server"

const getSession = (request: Request) => {
    const cookie = request.headers.get("Cookie")
    const session = sessionStorage.getSession(cookie)

    return session
}

const createSession = async (userId: User["id"]) => {
    const session = await sessionStorage.getSession()
    session.set("userId", userId)
    const cookie = await sessionStorage.commitSession(session)

    return redirect("/todos", {
        headers: {
            "Set-Cookie": cookie,
        },
    })
}

const deleteSession = async (request: Request) => {
    const session = await getSession(request)
    const cookie = await sessionStorage.destroySession(session)

    return redirect("/", {
        headers: {
            "Set-Cookie": cookie,
        },
    })
}

const getUserIdFromSession = async (request: Request): Promise<number> => {
    const session = await getSession(request)
    const userId: number = session.get("userId")
    return userId
}

export {createSession, deleteSession, getSession, getUserIdFromSession}
