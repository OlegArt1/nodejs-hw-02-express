require("dotenv").config();

const User = require("../../models/users");
const
{
//  HttpError,
    sendEmail
}
= require("../../helpers/index");

async function resendVerifyEmail (req, res, next)
{
    const { email } = req.body;

    try
    {
        const user = await User.findOne({ email });
    
        if (user === null)
        {
            console.log("Email not found!");
    
            return res.status(401).json({
                status: "Bad Request",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    message: "Not found"
                },
                messageError: "Email not found"
            });
        }
        else if (user.verify)
        {
            console.log("Resend email for verified user!");

            return res.status(400).json({    
                status: "Bad Request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    message: "Verification has already been passed"
                },
                messageError: "Resend email for verified user"
            });
        }
        else
        {
            const verifyEmail =
            {
                to: email,
                subject: "Сonfirm your registration",
                html: `<a target="_blank" href="http://localhost:8000/api/users/verify/${user.verificationToken}">Click to confirm your registration</a>`,
            };
            await sendEmail(verifyEmail);

            console.log("Resending a email success response!");
    
            return res.status(200).json ({    
                status: "OK",
                code: 200,
                contentType: "application/json",
                responseBody:
                {
                    message: "Verification email sent"
                }
            });
        }
    }
    catch (error)
    {
        return next(error);
    }
};
module.exports = { resendVerifyEmail };