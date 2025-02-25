import type {Note} from "@prisma/client"

import {mockUser} from "./users"

const mockNotes: Note[] = [
    {
        id: 1,
        content: "First note",
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        content: "Second note",
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        content: "Third note",
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const mockNote: Note = mockNotes[0]

export {mockNote, mockNotes}
