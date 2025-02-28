import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, Link, useActionData} from "@remix-run/react"

import {createResetToken} from "~/models/resetTokens.server"
import {getUserByEmail} from "~/models/users.server"
import {sendEmail} from "~/utils/email.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | forgot",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData()

    const email = String(formData.get("email"))
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error("User not found")
    }

    const token = await createResetToken({userId: user.id})

    const {origin} = new URL(request.url)
    const url = `${origin}/reset/${token}`

    await sendEmail({
        to: user.email,
        from: "Remix App <remix-app@gmail.com>",
        subject: "Reset your password",
        text: `Click this link to reset your password: ${url}`,
        html: `<p>Click <a href="${url}">this link</a> to reset your password.</p>`,
    })

    return {token}
}

const Route = () => {
    const data = useActionData<typeof action>()

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Forgot password</h2>

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
                    to={`/reset/${data.token}`}
                    className="hover:text-purple-500"
                >
                    Click this link to reset your password
                </Link>
            ) : null}
        </>
    )
}

export default Route
