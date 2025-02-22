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
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === "production",
    },
})

const getSession = async (request: Request) => {
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
    const session = await getSession(request)
    session.set("userId", userId)

    const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7
    const maxAge = remember ? SEVEN_DAYS_IN_SECONDS : undefined
    const cookie = await sessionStorage.commitSession(session, {maxAge})

    return redirect(redirectUrl, {headers: {"set-cookie": cookie}})
}

const deleteSession = async (request: Request) => {
    const session = await getSession(request)
    const cookie = await sessionStorage.destroySession(session)

    return redirect("/", {headers: {"set-cookie": cookie}})
}

const getUserFromSession = async (request: Request) => {
    const session = await getSession(request)
    const userId = session.get("userId")

    if (!userId) {
        return null
    }

    const user = await getUserById(userId)
    return user
}

export {createSession, deleteSession, getSession, getUserFromSession}
