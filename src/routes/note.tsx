import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node"
import {Form, redirect, useLoaderData} from "@remix-run/react"

import {deleteNote, getNote, updateNote} from "~/models/notes.server"
import {requireUser} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | note",
    },
]

export const action = async ({request, params}: ActionFunctionArgs) => {
    const user = await requireUser(request)

    if (!params.id) {
        throw new Error("Note not found")
    }

    const id = Number(params.id)
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const formData = await request.formData()
            const content = String(formData.get("content"))

            await updateNote({id, userId: user.id, content})
            return redirect("/notes")
        }

        case "delete": {
            await deleteNote({id, userId: user.id})
            return redirect("/notes")
        }

        default: {
            throw new Error("Unknown action")
        }
    }
}

export const loader = async ({request, params}: LoaderFunctionArgs) => {
    const user = await requireUser(request)

    if (!params.id) {
        throw new Error("Note not found")
    }

    const id = Number(params.id)
    const note = await getNote({id, userId: user.id})

    if (!note) {
        throw new Error("Note not found")
    }

    return {note}
}

const Route = () => {
    const {note} = useLoaderData<typeof loader>()

    return (
        <>
            <h2 className="text-2xl font-bold mb-2">Update note</h2>
            <Form method="delete">
                <button
                    type="submit"
                    className="inline-block mb-8 hover:text-purple-500"
                >
                    ⊖ Delete note
                </button>
            </Form>

            <Form method="post" className="grid max-w-xs">
                <label htmlFor="content">Note</label>
                <textarea
                    required
                    id="content"
                    name="content"
                    defaultValue={note.content}
                    className="px-4 py-2 border-2 border-black rounded-md mb-4"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-purple-500"
                >
                    Update
                </button>
            </Form>
        </>
    )
}

export default Route
