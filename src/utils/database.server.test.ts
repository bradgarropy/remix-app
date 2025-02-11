import {expect, test} from "vitest"

import {db} from "~/utils/database.server"

test("initializes database", () => {
    expect(db).toBeInstanceOf(Object)
})
