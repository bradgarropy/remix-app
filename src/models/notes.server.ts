import type {Note, User} from "@prisma/client"

import {db} from "~/utils/database.server"

type GetNotesParams = {
    userId: User["id"]
}

const getNotes = async ({userId}: GetNotesParams) => {
    const notes = await db.note.findMany({
        where: {userId},
        orderBy: {createdAt: "asc"},
    })

    return notes
}

type GetNoteParams = {
    id: Note["id"]
    userId: User["id"]
}

const getNote = async ({id, userId}: GetNoteParams) => {
    const notes = await db.note.findUnique({where: {id, userId}})
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

type UpdateNoteParams = {
    id: Note["id"]
    userId: User["id"]
    content: Note["content"]
}

const updateNote = async ({id, userId, content}: UpdateNoteParams) => {
    const note = await db.note.update({
        where: {id, userId},
        data: {content},
    })

    return note
}

type DeleteNoteParams = {
    id: Note["id"]
    userId: User["id"]
}

const deleteNote = async ({id, userId}: DeleteNoteParams) => {
    const note = await db.note.delete({where: {id, userId}})
    return note
}

export {createNote, deleteNote, getNote, getNotes, updateNote}
