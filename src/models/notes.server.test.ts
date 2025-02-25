import {describe, expect, test} from "vitest"

import {mockDb} from "~/mocks/db"
import {mockNote, mockNotes} from "~/mocks/notes"
import {homer} from "~/mocks/users"
import {createNote, getNotes} from "~/models/notes.server"

describe("getNotes", () => {
    test("gets notes", async () => {
        mockDb.note.findMany.mockResolvedValueOnce(mockNotes)

        const notes = await getNotes({userId: homer.id})
        expect(notes).toEqual(mockNotes)
    })
})

describe("createNote", () => {
    test("creates note", async () => {
        mockDb.note.create.mockResolvedValueOnce(mockNote)

        const note = await createNote(mockNote)
        expect(note).toEqual(mockNote)
    })
})
