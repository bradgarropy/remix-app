import {describe, expect, test} from "vitest"

import {mockDb} from "~/mocks/db"
import {mockNote, mockNotes} from "~/mocks/notes"
import {homer} from "~/mocks/users"
import {
    createNote,
    deleteNote,
    getNote,
    getNotes,
    updateNote,
} from "~/models/notes.server"

describe("getNotes", () => {
    test("gets notes", async () => {
        mockDb.note.findMany.mockResolvedValueOnce(mockNotes)

        const notes = await getNotes({userId: homer.id})
        expect(notes).toEqual(mockNotes)
    })
})

describe("getNote", () => {
    test("gets note", async () => {
        mockDb.note.findUnique.mockResolvedValueOnce(mockNote)

        const notes = await getNote({id: mockNote.id, userId: homer.id})
        expect(notes).toEqual(mockNote)
    })
})

describe("createNote", () => {
    test("creates note", async () => {
        mockDb.note.create.mockResolvedValueOnce(mockNote)

        const note = await createNote(mockNote)
        expect(note).toEqual(mockNote)
    })
})

describe("updateNote", () => {
    test("updates note", async () => {
        mockDb.note.update.mockResolvedValueOnce(mockNote)

        const note = await updateNote({
            id: mockNote.id,
            userId: homer.id,
            content: "Updated note",
        })

        expect(note).toEqual(mockNote)
    })
})

describe("deleteNote", () => {
    test("deletes note", async () => {
        mockDb.note.delete.mockResolvedValueOnce(mockNote)

        const note = await deleteNote({
            id: mockNote.id,
            userId: homer.id,
        })

        expect(note).toEqual(mockNote)
    })
})
