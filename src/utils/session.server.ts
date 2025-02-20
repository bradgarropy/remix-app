import type {User} from "@prisma/client"
import {createCookieSessionStorage, redirect} from "@remix-run/node"

import {getUserById} from "~/utils/users.server"

type UserSession = {
    userId: User["id"]
}

const sessionStorage = createCookieSessionStorage<UserSession>({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: false,
        secrets: [process.env.SESSION_SECRET!],
        secure: false,
    },
})

const getSession = async (request: Request) => {
    console.log("getSession")
    const cookie = request.headers.get("Cookie")
    const session = await sessionStorage.getSession(cookie)

    return session
}

type CreateSessionParams = {
    request: Request
    userId: User["id"]
    remember?: boolean
    redirectUrl: string
}

const createSession = async ({
    request,
    userId,
    remember = false,
    redirectUrl,
}: CreateSessionParams) => {
    console.log("createSession")
    const session = await getSession(request)
    console.log({session})
    session.set("userId", userId)
    console.log(`set userId: ${userId}`)

    const maxAge = remember ? 60 * 60 * 24 * 7 : undefined
    const cookie = await sessionStorage.commitSession(session, {maxAge})

    console.log({cookie})

    return redirect(redirectUrl, {headers: {"set-cookie": cookie}})
}

const deleteSession = async (request: Request) => {
    const session = await getSession(request)
    const cookie = await sessionStorage.destroySession(session)

    return redirect("/", {headers: {"set-cookie": cookie}})
}

const getUserFromSession = async (request: Request) => {
    console.log("getUserFromSession")
    const session = await getSession(request)
    console.log({session})
    const userId = session.get("userId")
    console.log({userId})

    if (!userId) {
        console.log("no userId")
        return null
    }

    const user = await getUserById(userId)
    console.log({user})
    return user
}

export {createSession, deleteSession, getSession, getUserFromSession}
