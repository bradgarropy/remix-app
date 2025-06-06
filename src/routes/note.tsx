import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node"
import {Form, redirect, useLoaderData} from "@remix-run/react"
import {z} from "zod"

import {deleteNote, getNote, updateNote} from "~/models/notes.server"
import {requireUser} from "~/utils/auth.server"
import {parseFormData} from "~/utils/forms"

export const action = async ({request, params}: ActionFunctionArgs) => {
    const user = await requireUser(request)

    const schema = z.object({
        id: z.string({required_error: "Note not found"}).transform(Number),
    })

    const {id} = schema.parse(params)
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const schema = z.object({
                content: z.string(),
            })

            const {content} = await parseFormData(request, schema)

            await updateNote({id, userId: user.id, content})
            return redirect("/notes")
        }

        case "delete": {
            await deleteNote({id, userId: user.id})
            return redirect("/notes")
        }

        default: {
            return redirect("/notes")
        }
    }
}

export const loader = async ({request, params}: LoaderFunctionArgs) => {
    const user = await requireUser(request)

    const schema = z.object({
        id: z.string({required_error: "Note not found"}).transform(Number),
    })

    const {id} = schema.parse(params)
    const note = await getNote({id, userId: user.id})

    if (!note) {
        throw new Response("Note not found", {status: 404})
    }

    return {note}
}

const Route = () => {
    const {note} = useLoaderData<typeof loader>()

    return (
        <>
            <title>💿 remix app | note</title>
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
