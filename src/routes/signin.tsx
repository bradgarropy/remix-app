import type {ActionFunctionArgs} from "@remix-run/node"
import {Form, Link, useActionData, useSearchParams} from "@remix-run/react"
import {z} from "zod"

import {signIn} from "~/utils/auth.server"
import {parseFormData} from "~/utils/forms"

export const action = async ({request}: ActionFunctionArgs) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        redirectUrl: z.string(),
    })

    const {email, password, redirectUrl} = await parseFormData(request, schema)
    return signIn({request, email, password, redirectUrl})
}

const Route = () => {
    const data = useActionData<typeof action>()
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl") ?? "/"

    return (
        <>
            <title>💿 remix app | sign in</title>
            <h2 className="text-2xl font-bold mb-8">Sign in</h2>

            <Form method="post" className="grid max-w-xs mb-8">
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

                <input type="hidden" name="redirectUrl" value={redirectUrl} />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Sign in
                </button>
            </Form>

            <Link to="/forgot" className="text-sm hover:text-purple-500">
                Forgot password?
            </Link>
        </>
    )
}

export default Route
