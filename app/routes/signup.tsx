import type {
    ActionFunction,
    HtmlMetaDescriptor,
    MetaFunction,
} from "@remix-run/node"
import {json} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"
import type {FC} from "react"

import {signup} from "~/utils/auth.server"
import {db} from "~/utils/db.server"
import {createSession} from "~/utils/session.server"

const meta: MetaFunction = () => {
    const meta: HtmlMetaDescriptor = {
        title: "💿 remix starter | about",
    }

    return meta
}

const action: ActionFunction = async ({request, params}) => {
    const form = await request.formData()

    const email = form.get("email") as string
    const password = form.get("password") as string

    const existingUser = await db.user.findUnique({where: {email}})

    if (existingUser) {
        return json({error: "User with that email already exists."})
    }

    const user = await signup({email, password})

    return createSession(user.id)
}

const SignUpRoute: FC = () => {
    const actionData = useActionData()

    return (
        <Form method="post">
            <div className="grid">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="text-black"
                />
                <span>{actionData?.error ?? ""}</span>

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="text-black"
                />
            </div>

            <button type="submit">Sign Up</button>
        </Form>
    )
}

export default SignUpRoute
export {action, meta}
