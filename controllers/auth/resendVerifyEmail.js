require("dotenv").config();

const User = require("../../models/users");
const { sendEmail } = require("../../helpers/index");

async function resendVerifyEmail (req, res, next)
{
    const { email } = req.body;

    try
    {
        const user = await User.findOne({ email });
        
        if (typeof user === "undefined")
        {
            console.log("Missing required field email!");     

            res.status(400).json({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    message: "Email not found"
                },
                messageError: "Missing required field email"
            });
        }
        if (user.verify)
        {
            console.log("Verification has already been passed!");

            return res.status(400).json({    
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    message: "Verification has already been passed"
                },
                messageError: "Verification has already been passed"
            });
        }
        await sendEmail({
            to: email,
            subject: "Сonfirm your registration",
            html: `To confirm your registration, please click on the link below: <a href="http://localhost:8000/api/users/verify/${user.verificationToken}">Click to confirm your registration</a>`,
            text: `To confirm your registration, please open the link below: http://localhost:8000/api/users/verify/${user.verificationToken}`,
        });
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
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        res.status(500).json({ message: "Internal server error!" });

        return next(error);
    }
};
module.exports = { resendVerifyEmail };