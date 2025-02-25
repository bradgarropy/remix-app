import {mockNotes} from "~/mocks/notes"
import {mockUser} from "~/mocks/users"
import {createNote} from "~/models/notes.server"
import {createUser} from "~/models/users.server"

await createUser(mockUser)

for (const mockNote of mockNotes) {
    await createNote(mockNote)
}
