import type {User} from "@prisma/client"

const homer: User = {
    id: 1,
    email: "homer@gmail.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
}

const marge: User = {
    id: 2,
    email: "marge@gmail.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
}

const mockUsers = [homer, marge]

export {homer, marge, mockUsers}
