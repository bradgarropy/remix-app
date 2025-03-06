import {describe, expect, test, vitest} from "vitest"

import {mockEmail} from "~/mocks/email"
import {homer} from "~/mocks/users"
import {sendEmail} from "~/utils/email.server"

vitest.mock("nodemailer", () => {
    return {
        default: {
            createTransport: vitest.fn().mockReturnValueOnce({
                sendMail: vitest.fn().mockReturnValueOnce(mockEmail),
            }),
        },
    }
})

describe("sendEmail", () => {
    test("sends email", async () => {
        const email = await sendEmail({
            to: homer.email,
            from: "remix-app@gmail.com",
            subject: "Test email subject",
            text: "Test text email.",
            html: "Test html email.",
        })

        expect(email).toEqual(mockEmail)
    })
})
