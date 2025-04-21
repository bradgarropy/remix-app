import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {Form, useActionData} from "@remix-run/react"

import {resetPassword} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | reset",
    },
]

export const action = async ({request, params}: ActionFunctionArgs) => {
    if (!params.token) {
        throw new Error("No password reset token provided")
    }

    const formData = await request.formData()

    const newPassword = String(formData.get("newPassword"))

    const newPasswordConfirmation = String(
        formData.get("newPasswordConfirmation"),
    )

    return resetPassword({
        request,
        token: params.token,
        newPassword,
        newPasswordConfirmation,
    })
}

const Route = () => {
    const data = useActionData<typeof action>()

    return (
        <>
            <h2 className="text-2xl font-bold mb-8">Reset password</h2>

            <Form method="post" className="grid max-w-xs">
                <label htmlFor="newPassword">New password</label>
                <input
                    required
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">{data?.errors.newPassword}</p>

                <label htmlFor="newPasswordConfirmation">
                    Confirm new password
                </label>
                <input
                    required
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    className="px-4 py-2 border-2 border-black rounded-md"
                />
                <p className="text-red-500 mb-4">
                    {data?.errors.newPasswordConfirmation}
                </p>

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
