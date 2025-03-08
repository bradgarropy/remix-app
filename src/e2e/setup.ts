import {execSync} from "node:child_process"

import {test} from "@playwright/test"

test("database", async () => {
    execSync("npm run db:reset:force", {
        stdio: "inherit",
    })
})
