import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, redirect} from "@remix-run/react"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | signin",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData()

    const email = formData.get("email")
    const password = formData.get("password")

    console.log({email, password})
    return redirect("/dashboard")
}

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Sign in</h2>

            <Form method="post" className="grid max-w-xs">
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

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Sign in
                </button>
            </Form>
        </>
    )
}

export default Route
