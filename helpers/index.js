const nodemailer = require("nodemailer");

async function sendEmail (message)
{
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth:
        {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });
    message["from"] = "art777oleg@gmail.com";

    return transport.sendMail(message);
}
module.exports = { sendEmail };