import {mockNotes} from "~/mocks/notes"
import {mockUser} from "~/mocks/users"
import {createNote} from "~/models/notes.server"
import {createUser} from "~/models/users.server"

await createUser(mockUser)

const mockNotesPromises = mockNotes.map(note =>
    createNote({userId: note.userId, content: note.content}),
)

await Promise.all(mockNotesPromises)
