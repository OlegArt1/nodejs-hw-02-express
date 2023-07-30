const User = require("../../models/users");

async function verify (req, res, next)
{
    const { token } = req.params;
  
    try
    {
        const user = await User.findOne({ verificationToken: token });

        if (!user)
        {
            console.log("Verification user not found!");

            return res.status(404).json({
                status: "Not found",
                code: 404,
                responseBody:
                {
                    message: "User not found"
                },
                messageError: "Verification user not found"
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
        console.log("Internal server error!");
        console.log(error);

        res.status(404).json({ message: "Internal server error!" });

        return next(error);
    }
};
module.exports = { verify };