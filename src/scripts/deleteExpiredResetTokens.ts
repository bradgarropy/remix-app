import {deleteExpiredResetTokens} from "~/models/resetTokens.server"

console.log("Deleting expired reset tokens...")
const count = await deleteExpiredResetTokens()
console.log(`Deleted ${count} expired reset tokens`)
