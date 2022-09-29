import type {
    ActionFunction,
    HtmlMetaDescriptor,
    MetaFunction,
} from "@remix-run/node"
import {json} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"
import type {FC} from "react"

import {login} from "~/utils/auth.server"
import {createSession} from "~/utils/session.server"

const meta: MetaFunction = () => {
    const meta: HtmlMetaDescriptor = {}
    return meta
}

const action: ActionFunction = async ({request}) => {
    const form = await request.formData()

    const email = form.get("email") as string
    const password = form.get("password") as string

    const user = await login({email, password})

    if (!user) {
        return json({error: "Incorrect username or password."})
    }

    return createSession(user.id)
}

const LoginRoute: FC = () => {
    const actionData = useActionData()

    return (
        <Form method="post" className="max-w-lg m-auto">
            <span>{actionData?.error ?? ""}</span>

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
                Login
            </button>
        </Form>
    )
}

export default LoginRoute
export {action, meta}
