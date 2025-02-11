import type {User} from "@prisma/client"

import {db} from "~/utils/database.server"

const getUserById = async (id: User["id"]) => {
    const user = await db.user.findUnique({where: {id}})
    return user
}

const getUserByEmail = async (email: User["email"]) => {
    const user = await db.user.findUnique({where: {email}})
    return user
}

type CreateUserParams = {
    email: User["email"]
    password: User["password"]
}

const createUser = async ({email, password}: CreateUserParams) => {
    const user = await db.user.create({data: {email, password}})
    return user
}

export {createUser, getUserByEmail, getUserById}
