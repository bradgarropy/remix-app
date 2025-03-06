import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, Link, useSearchParams} from "@remix-run/react"

import {signIn} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | sign in",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData()

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))
    const redirectUrl = String(formData.get("redirectUrl")) || "/notes"

    return signIn({request, email, password, redirectUrl})
}

const Route = () => {
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl")

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Sign in</h2>

            <Form method="post" className="grid max-w-xs mb-8">
                <label htmlFor="email">Email</label>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />

                <label htmlFor="password">Password</label>
                <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />

                <input
                    type="hidden"
                    name="redirectUrl"
                    value={redirectUrl ?? undefined}
                />

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
