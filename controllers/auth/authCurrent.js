const User = require("../../models/users");

async function current (req, res, next)
{
    try
    {
        const user = await User.find({ _id: req.user.id });

        if (user === null)
        {
            console.log("Current user unauthorized error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    message: "Not authorized."
                },
                message: "Current user unauthorized error!"
            });
        }
        else
        {
            console.log("Current user success response!");

            res.status(200).json({
                status: "OK",
                code: 200,
                contentType: "application/json",
                responseBody:
                {
                    email: req.body.email,
                    subscription: req.body.subscription
                }
            });
        }
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);

        res.status(500).send({ message: "Internal server error!" });

        return next(error);
    }
}
module.exports = { current };