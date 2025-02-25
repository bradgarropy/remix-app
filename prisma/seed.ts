import {mockNotes} from "~/mocks/notes"
import {mockUsers} from "~/mocks/users"
import {createNote} from "~/models/notes.server"
import {createUser} from "~/models/users.server"

for (const mockUser of mockUsers) {
    await createUser(mockUser)
}

for (const mockNote of mockNotes) {
    await createNote(mockNote)
}
