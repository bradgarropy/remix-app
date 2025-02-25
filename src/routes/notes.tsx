import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react"

import {getNotes} from "~/models/notes.server"
import {requireUser} from "~/utils/auth.server"

export const meta: MetaFunction = () => [
    {
        title: "💿 remix app | notes",
    },
]

export const action = async () => {
    // TODO: implement delete note
    return {}
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

            <div className="grid gap-y-4 justify-items-start">
                {notes.map(note => (
                    <Link
                        to={`/note/${note.id}`}
                        key={note.id}
                        className="hover:text-purple-500"
                    >
                        {note.content}
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Route
