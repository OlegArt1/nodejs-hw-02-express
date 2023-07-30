const nodemailer = require("nodemailer");

function sendEmail (message)
{
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth:
        {
            user: '35656b9059b1e0',
            pass: 'c9b34baa48ad8e',
        },
    });
    message["from"] = "art777oleg@gmail.com";

    return transport.sendMail(message);
}
module.exports = { sendEmail };