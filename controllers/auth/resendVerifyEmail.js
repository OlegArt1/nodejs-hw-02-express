require("dotenv").config();

const User = require("../../models/users");
const { HttpError, sendEmail } = require("../../helpers/index");

const { BASE_URL } = process.env;

async function resendVerifyEmail (req, res, next)
{
    const { email } = req.body;

    const user = await User.findOne({email});

    if (!user)
    {
        throw HttpError(401, "Email not found"); 
    };
    if (user.verify)
    {
        throw HttpError(400, "Verification has already been passed"); 
    }
    const verifyEmail =
    {
        to: email,
        subject: "Сonfirm your registration",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to confirm your registration</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(200).json ({
        message: "Verification email sent",
    });
};
module.exports = { resendVerifyEmail };