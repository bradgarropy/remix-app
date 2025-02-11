import {mockUser} from "~/mocks/users"
import {createUser} from "~/utils/users.server"

await createUser(mockUser)
