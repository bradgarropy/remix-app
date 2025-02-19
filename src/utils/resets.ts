import type {Reset} from "@prisma/client"
import bcrypt from "bcryptjs"

import {db} from "~/utils/database.server"

type CreateResetParams = {
    userId: Reset["userId"]
    token: Reset["token"]
}

const createReset = async ({userId, token}: CreateResetParams) => {
    const salt = await bcrypt.genSalt()
    const hashedToken = await bcrypt.hash(token, salt)

    const user = await db.reset.create({data: {userId, token: hashedToken}})
    return user
}

export {createReset}
