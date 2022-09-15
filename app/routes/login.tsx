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

const action: ActionFunction = async ({request, params}) => {
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
        <Form method="post">
            <span>{actionData?.error ?? ""}</span>

            <div className="grid">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="text-black"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="text-black"
                />
            </div>

            <button type="submit">Login</button>
        </Form>
    )
}

export default LoginRoute
export {action, meta}
