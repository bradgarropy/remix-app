import type {User} from "@prisma/client"

const mockUser: User = {
    id: 1,
    email: "homer@gmail.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
}

export {mockUser}
