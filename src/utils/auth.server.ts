import type {ResetToken, User} from "@prisma/client"
import {data, redirect} from "@remix-run/node"
import bcrypt from "bcryptjs"
import type SMTPTransport from "nodemailer/lib/smtp-transport"

import {
    createResetToken,
    deleteResetToken,
    getResetToken,
} from "~/models/resetTokens.server"
import {
    createUser,
    getUserByEmail,
    getUserById,
    updatePassword,
} from "~/models/users.server"
import {sendEmail} from "~/utils/email.server"
import type {Errors} from "~/utils/errors"
import {
    createSession,
    deleteSession,
    getUserFromSession,
} from "~/utils/session.server"

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
    const errors: Errors = {}
    const userExists = await getUserByEmail(email)

    if (userExists) {
        errors.email = "User already exists"
        return data({errors}, {status: 400})
    }

    if (password !== passwordConfirmation) {
        errors.password = "Passwords do not match"
        errors.passwordConfirmation = "Passwords do not match"
        return data({errors}, {status: 400})
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
    const errors: Errors = {}
    const user = await getUserByEmail(email)

    if (!user) {
        errors.email = "User not found"
        return data({errors}, {status: 400})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        errors.password = "Invalid password"
        return data({errors}, {status: 400})
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

type ForgotPasswordParams = {
    request: Request
    email: User["email"]
}

type ForgotPasswordResponse = {
    message?: SMTPTransport.SentMessageInfo
    errors?: Errors
}

const forgotPassword = async ({request, email}: ForgotPasswordParams) => {
    const errors: Errors = {}
    const user = await getUserByEmail(email)

    if (!user) {
        errors.email = "User not found"

        return data<ForgotPasswordResponse>(
            {message: undefined, errors},
            {status: 400},
        )
    }

    const token = await createResetToken({userId: user.id})

    const {origin} = new URL(request.url)
    const url = `${origin}/reset/${token}`

    const message = await sendEmail({
        to: user.email,
        from: "Remix App <remix-app@gmail.com>",
        subject: "Reset your password",
        text: `Click this link to reset your password: ${url}`,
        html: `<p>Click <a href="${url}">this link</a> to reset your password.</p>`,
    })

    return data<ForgotPasswordResponse>({message, errors})
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
    const errors: Errors = {}
    const resetToken = await getResetToken(token)

    if (!resetToken) {
        errors.newPassword = "Invalid reset token"
        return data({errors}, {status: 400})
    }

    const isExpired = resetToken.expiresAt < new Date()

    if (isExpired) {
        await deleteResetToken(resetToken.id)
        errors.newPassword = "Reset token is expired"
        return data({errors}, {status: 400})
    }

    const userExists = await getUserById(resetToken.userId)

    if (!userExists) {
        errors.newPassword = "User not found"
        return data({errors}, {status: 400})
    }

    if (newPassword !== newPasswordConfirmation) {
        errors.newPassword = "Passwords do not match"
        errors.newPasswordConfirmation = "Passwords do not match"
        return data({errors}, {status: 400})
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

export {forgotPassword, requireUser, resetPassword, signIn, signOut, signUp}
