import type {Note, User} from "@prisma/client"

import {db} from "~/utils/database.server"

type GetNotesParams = {
    userId: User["id"]
}

const getNotes = async ({userId}: GetNotesParams) => {
    const notes = await db.note.findMany({
        where: {id: userId},
        orderBy: {createdAt: "asc"},
    })

    return notes
}

type CreateNoteParams = {
    userId: User["id"]
    content: Note["content"]
}

const createNote = async ({userId, content}: CreateNoteParams) => {
    const note = await db.note.create({data: {userId, content}})
    return note
}

export {createNote, getNotes}
