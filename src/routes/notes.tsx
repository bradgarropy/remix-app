import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react"

import {getNotes} from "~/models/notes.server"
import {requireUser, resetPassword} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | notes",
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

export const loader = async ({request}: LoaderFunctionArgs) => {
    const user = await requireUser(request)

    const notes = await getNotes({userId: user.id})
    return {notes}
}

const Route = () => {
    const {notes} = useLoaderData<typeof loader>()

    return (
        <>
            <h2 className="text-2xl font-bold mb-2">Notes</h2>

            <Link
                to="/notes/new"
                className="inline-block mb-8 hover:text-purple-500"
            >
                ⊕ New note
            </Link>

            <ul>
                {notes.map(note => (
                    <li key={note.id} className="mb-4">
                        {note.content}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Route
