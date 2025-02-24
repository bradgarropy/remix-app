import {expect, test, vitest} from "vitest"

import {createRelease} from "~/utils/sentry"

vitest.mock("../../package.json", () => {
    const pkg = {
        name: "test",
        version: "1.2.3",
    }

    return {default: pkg}
})

test("creates release", () => {
    const release = createRelease()
    expect(release).toEqual("test@1.2.3")
})
