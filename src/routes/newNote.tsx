import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node"
import {Form, redirect} from "@remix-run/react"
import {z} from "zod"

import {createNote} from "~/models/notes.server"
import {requireUser} from "~/utils/auth.server"
import {parseFormData} from "~/utils/forms"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | new note",
    },
]

export const action = async ({request}: ActionFunctionArgs) => {
    const user = await requireUser(request)

    const schema = z.object({
        content: z.string(),
    })

    const {content} = await parseFormData(request, schema)

    await createNote({userId: user.id, content})
    return redirect("/notes")
}

export const loader = async ({request}: LoaderFunctionArgs) => {
    const user = await requireUser(request)
    return {user}
}

const Route = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-8">New note</h2>

            <Form method="post" className="grid max-w-xs">
                <label htmlFor="content">Note</label>
                <textarea
                    required
                    id="content"
                    name="content"
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Create
                </button>
            </Form>
        </>
    )
}

export default Route
