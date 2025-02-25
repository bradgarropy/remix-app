import type {Note} from "@prisma/client"

import {homer} from "./users"

const mockNotes: Note[] = [
    {
        id: 1,
        content: "First note",
        userId: homer.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        content: "Second note",
        userId: homer.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        content: "Third note",
        userId: homer.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const mockNote: Note = mockNotes[0]

export {mockNote, mockNotes}
