import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"
import {z} from "zod"

import {forgotPassword} from "~/utils/auth.server"
import {parseFormData} from "~/utils/forms"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | forgot",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const schema = z.object({
        email: z.string().email(),
    })

    const {email} = await parseFormData(request, schema)
    return forgotPassword({request, email})
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
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">{data?.errors?.email}</p>

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Reset
                </button>
            </Form>

            {data?.message ? (
                <p>Check your email for a password reset link.</p>
            ) : null}
        </>
    )
}

export default Route
