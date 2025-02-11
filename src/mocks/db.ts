import type {PrismaClient} from "@prisma/client"
import {mockDeep} from "vitest-mock-extended"

const mockDb = mockDeep<PrismaClient>()
export {mockDb}
