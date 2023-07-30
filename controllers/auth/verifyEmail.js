const User = require("../../models/users");

async function verify (req, res, next)
{
    const { token } = req.params;
  
    try
    {
        const user = await User.findOne({ verificationToken: token });
  console.log(`User - ${user}; Token - ${token};`);
        if (user === null)
        {
            console.log("Verification user not found!");

            return res.status(404).json({
                status: "Not found",
                code: 404,
                responseBody:
                {
                    message: "User not found"
                },
                messageError: "Invalid token"
            });
        }
        else
        {
            await User.findByIdAndUpdate(user._id,
            {
                verify: true,
                verificationToken: null,
            });
            console.log("Verification success response!");

            return res.status(200).json({
                status: "OK",
                code: 200,
                responseBody:
                {
                    message: "Verification successful"
                }
            });
        }
    }
    catch (error)
    {
        return next(error);
    }
};
module.exports = { verify };