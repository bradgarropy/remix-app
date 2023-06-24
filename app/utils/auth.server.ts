import {redirect} from "@remix-run/node"
import {compare, hash} from "bcryptjs"
import {getXataClient} from "~/xata"

import {deleteSession, getUserIdFromSession} from "~/utils/session.server"

type Credentials = {
    email: string
    password: string
}

const signup = async (credentials: Credentials) => {
    const hashedPassword = await hash(credentials.password, 10)

    const xata = getXataClient()
    const user = await xata.db.users.create({
        email: credentials.email,
        password: hashedPassword,
    })

    return user
}

const login = async (credentials: Credentials) => {
    const xata = getXataClient()

    const user = await xata.db.users
        .filter({email: credentials.email})
        .getFirst()

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

const getUser = async (request: Request) => {
    const userId = await getUserIdFromSession(request)

    if (!userId) {
        return null
    }

    const xata = getXataClient()
    const user = await xata.db.users.filter({id: userId}).getFirst()
    return user
}

const requireUser = async (request: Request) => {
    const userId = await getUserIdFromSession(request)

    if (!userId) {
        throw redirect("/login")
    }

    return userId
}

export {getUser, login, logout, requireUser, signup}
