import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: import.meta.env.VITE_SMTP_USERNAME,
        pass: import.meta.env.VITE_SMTP_PASSWORD,
    },
})

type SendEmailParams = {
    to: string
    from: string
    subject: string
    text: string
    html: string
}

const sendEmail = async ({to, from, subject, text, html}: SendEmailParams) => {
    const email = await transport.sendMail({
        to,
        from,
        subject,
        text,
        html,
    })

    console.log(`Sent email to ${to}: ${subject}`)
    return email
}

export {sendEmail}
