import {mockUser} from "~/mocks/users"
import {createUser} from "~/models/users.server"

await createUser(mockUser)
