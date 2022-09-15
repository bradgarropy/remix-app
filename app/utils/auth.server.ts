import type {User} from "@prisma/client"
import {redirect} from "@remix-run/node"
import {compare, hash} from "bcryptjs"

import {db} from "~/utils/db.server"
import {deleteSession, getSession} from "~/utils/session.server"

type Credentials = {
    email: string
    password: string
}

const signup = async (credentials: Credentials): Promise<User> => {
    const hashedPassword = await hash(credentials.password, 10)

    const user = await db.user.create({
        data: {
            email: credentials.email,
            password: hashedPassword,
        },
    })

    return user
}

const login = async (credentials: Credentials): Promise<User | null> => {
    const user = await db.user.findUnique({where: {email: credentials.email}})

    if (!user) {
        return null
    }

    const match = await compare(credentials.password, user.password)

    if (!match) {
        return null
    }

    return user
}

const logout = (request: Request) => {
    return deleteSession(request)
}

const getUser = async (request: Request): Promise<User | null> => {
    const session = await getSession(request)
    const userId = session.get("userId")

    if (!userId) {
        return null
    }

    const user = await db.user.findUnique({where: {id: userId}})
    return user
}

const requireUser = async (request: Request) => {
    const user = await getUser(request)

    if (!user) {
        throw redirect("/login")
    }

    return user
}

export {getUser, login, logout, requireUser, signup}
