import {PrismaClient} from "@prisma/client"
import {hash} from "bcryptjs"

const db = new PrismaClient()

const seed = async () => {
    await db.user.create({
        data: {
            email: "bradgarropy@gmail.com",
            password: await hash("password", 10),
        },
    })
}

seed()
