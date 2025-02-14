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
}

const createSession = async ({request, userId}: CreateSessionParams) => {
    console.log("createSession")
    const session = await getSession(request)
    session.set("userId", userId)
    console.log(`set userId: ${userId}`)

    // const cookie = await sessionStorage.commitSession(session, {
    //     // https://github.com/remix-run/indie-stack/blob/main/app/session.server.ts#L66
    // })
    console.log(`set cookie: ${"fjkdsla"}`)

    return redirect("/dashboard", {
        status: 303,
        headers: {"set-cookie": "fjslkd"},
    })
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
