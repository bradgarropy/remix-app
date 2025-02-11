import type {User} from "@prisma/client"
import {redirect} from "@remix-run/node"
import bcrypt from "bcryptjs"

import {
    createSession,
    deleteSession,
    getUserFromSession,
} from "~/utils/session.server"
import {createUser, getUserByEmail} from "~/utils/users.server"

type SignUpParams = {
    request: Request
    email: User["email"]
    password: User["password"]
    passwordConfirmation: User["password"]
}

const signUp = async ({
    request,
    email,
    password,
    passwordConfirmation,
}: SignUpParams) => {
    const userExists = await getUserByEmail(email)

    if (userExists) {
        throw new Error("User already exists")
    }

    if (password !== passwordConfirmation) {
        throw new Error("Passwords do not match")
    }

    const user = await createUser({email, password})

    console.log(`${user.email} signed up`)
    return createSession({request, userId: user.id})
}

type SignInParams = {
    request: Request
    email: User["email"]
    password: User["password"]
}

const signIn = async ({request, email, password}: SignInParams) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error("User not found")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error("Invalid password")
    }

    console.log(`${user.email} signed in`)
    return createSession({request, userId: user.id})
}

type SignOutParams = {
    request: Request
}

const signOut = async ({request}: SignOutParams) => {
    const user = await getUserFromSession(request)

    if (!user) {
        return deleteSession(request)
    }

    console.log(`${user.email} signed out`)
    return deleteSession(request)
}

const requireUser = async (request: Request) => {
    const user = await getUserFromSession(request)

    if (!user) {
        console.log(redirect("/signin"))
        throw redirect("/signin")
    }

    return user
}

export {requireUser, signIn, signOut, signUp}
