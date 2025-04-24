import type {ActionFunctionArgs} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"
import {z} from "zod"

import {signUp} from "~/utils/auth.server"
import {parseFormData} from "~/utils/forms"

export const action = async ({request}: ActionFunctionArgs) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        passwordConfirmation: z.string(),
    })

    const {email, password, passwordConfirmation} = await parseFormData(
        request,
        schema,
    )

    return signUp({request, email, password, passwordConfirmation})
}

const Route = () => {
    const data = useActionData<typeof action>()

    return (
        <>
            <title>💿 remix app | sign up</title>
            <h2 className="text-2xl font-bold mb-8">Sign up</h2>

            <Form method="post" className="grid max-w-xs">
                <label htmlFor="email">Email</label>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">{data?.errors.email}</p>

                <label htmlFor="password">Password</label>
                <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">{data?.errors.password}</p>

                <label htmlFor="passwordConfirmation">Confirm password</label>
                <input
                    required
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">
                    {data?.errors.passwordConfirmation}
                </p>

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Sign up
                </button>
            </Form>
        </>
    )
}

export default Route
