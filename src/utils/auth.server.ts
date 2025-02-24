import type {ResetToken, User} from "@prisma/client"
import {redirect} from "@remix-run/node"
import bcrypt from "bcryptjs"

import {deleteResetToken, getResetToken} from "~/models/resetTokens.server"
import {
    createSession,
    deleteSession,
    getUserFromSession,
} from "~/utils/session.server"
import {
    createUser,
    getUserByEmail,
    getUserById,
    updatePassword,
} from "~/models/users.server"

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

    return createSession({
        request,
        userId: user.id,
        remember: false,
        redirectUrl: "/",
    })
}

type SignInParams = {
    request: Request
    email: User["email"]
    password: User["password"]
    redirectUrl: string
}

const signIn = async ({
    request,
    email,
    password,
    redirectUrl,
}: SignInParams) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error("User not found")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error("Invalid password")
    }

    console.log(`${user.email} signed in`)

    return createSession({
        request,
        userId: user.id,
        remember: true,
        redirectUrl,
    })
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
    const url = new URL(request.url)
    const user = await getUserFromSession(request)

    if (!user) {
        throw redirect(`/signin?redirectUrl=${url.pathname}`)
    }

    return user
}

type ResetPasswordParams = {
    request: Request
    token: ResetToken["token"]
    newPassword: User["password"]
    newPasswordConfirmation: User["password"]
}

const resetPassword = async ({
    request,
    token,
    newPassword,
    newPasswordConfirmation,
}: ResetPasswordParams) => {
    const resetToken = await getResetToken(token)

    if (!resetToken) {
        throw new Error("Invalid reset token")
    }

    const isExpired = resetToken.expiresAt < new Date()

    if (isExpired) {
        await deleteResetToken(resetToken.id)
        throw new Error("Reset token is expired")
    }

    const userExists = await getUserById(resetToken.userId)

    if (!userExists) {
        throw new Error("User not found")
    }

    if (newPassword !== newPasswordConfirmation) {
        throw new Error("Passwords do not match")
    }

    const user = await updatePassword({
        id: resetToken.userId,
        password: newPassword,
    })

    await deleteResetToken(resetToken.id)

    return signIn({
        request,
        email: user.email,
        password: newPassword,
        redirectUrl: "/",
    })
}

export {requireUser, resetPassword, signIn, signOut, signUp}
