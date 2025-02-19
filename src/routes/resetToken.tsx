import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, useParams} from "@remix-run/react"

import {signUp} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | reset",
    },
]

export const action = async ({request, params}: ActionFunctionArgs) => {
    const formData = await request.formData()

    const newPassword = String(formData.get("newPassword"))

    const newPasswordConfirmation = String(
        formData.get("newPasswordConfirmation"),
    )

    const {token} = params

    // ensure passwords match
    // update password
    // delete reset token
    // sign in user

    // return signUp({request, email, password, passwordConfirmation})
}

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Reset password</h2>

            <Form method="post" className="grid max-w-xs">
                <label htmlFor="password">New password</label>
                <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />
                <label htmlFor="password">Confirm new password</label>{" "}
                <input
                    required
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Reset
                </button>
            </Form>
        </>
    )
}

export default Route
