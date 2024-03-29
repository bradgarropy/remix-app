import type {ActionFunction, V2_MetaFunction} from "@remix-run/node"
import {json} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"
import type {FC} from "react"

import {signup} from "~/utils/auth.server"
import {createSession} from "~/utils/session.server"
import {getXataClient} from "~/xata"

export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "💿 remix app | about",
        },
    ]
}

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()

    const email = form.get("email") as string
    const password = form.get("password") as string

    const xata = getXataClient()
    const existingUser = await xata.db.users.filter({email}).getFirst()

    if (existingUser) {
        return json({error: "User with that email already exists."})
    }

    const user = await signup({email, password})
    return createSession(user.id)
}

const SignUpRoute: FC = () => {
    const actionData = useActionData()

    return (
        <Form method="post" className="max-w-lg m-auto">
            <div className="grid w-full">
                <label htmlFor="email" className="text-lg font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="text-white border-b-4 border-b-remix-blue bg-neutral-900 p-6 text-lg mb-8 focus:outline-remix-blue rounded-t-md"
                />
                <span>{actionData?.error ?? ""}</span>

                <label htmlFor="password" className="text-lg font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="text-white border-b-4 border-b-remix-blue bg-neutral-900 p-6 text-lg mb-12 focus:outline-remix-blue rounded-t-md"
                />
            </div>

            <button
                type="submit"
                className="p-6 bg-remix-blue text-remix-black font-bold uppercase text-xl w-full rounded-md"
            >
                Sign Up
            </button>
        </Form>
    )
}

export default SignUpRoute
