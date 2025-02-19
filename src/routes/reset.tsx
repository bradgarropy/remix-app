import crypto from "node:crypto"

import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, Link, useActionData} from "@remix-run/react"

import {createReset} from "~/utils/resets"
import {getUserByEmail} from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | reset",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData()

    const email = String(formData.get("email"))
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error("User not found")
    }

    const token = crypto.randomUUID()
    await createReset({userId: user.id, token})

    return {token}
}

const Route = () => {
    const data = useActionData<typeof action>()

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Reset password</h2>

            <Form method="post" className="grid max-w-xs mb-8">
                <label htmlFor="email">Email</label>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Reset
                </button>
            </Form>

            {data?.token ? (
                <Link
                    to={`/reset/token/${data.token}`}
                    className="hover:text-purple-500"
                >
                    Click this link to reset your password
                </Link>
            ) : null}
        </>
    )
}

export default Route
