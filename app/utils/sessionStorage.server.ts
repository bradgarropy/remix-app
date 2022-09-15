import {createCookieSessionStorage} from "@remix-run/node"

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
    throw new Error("Must set SESSION_SECRET environment variable.")
}

const sessionStorage = createCookieSessionStorage({
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        name: "remix-app-session",
        path: "/",
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true,
    },
})

export {sessionStorage}
