import type SMTPTransport from "nodemailer/lib/smtp-transport"

import {homer} from "~/mocks/users"

const mockEmail: SMTPTransport.SentMessageInfo = {
    accepted: [homer.email],
    rejected: [],
    pending: [],
    response: "OK",
    envelope: {from: "remix-app@gmail.com", to: [homer.email]},
    messageId: "<message-id@gmail.com>",
}

export {mockEmail}
