import type {User} from "@prisma/client"

const mockUser: User = {
    id: 1,
    email: "homer@gmail.com",
    password: "password",
}

export {mockUser}
