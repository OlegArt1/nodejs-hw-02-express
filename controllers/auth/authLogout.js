const Users = require("../../models/users");

async function logout (req, res, next)
{
    try
    {
        const user = await Users.updateOne({ _id: req.user.id }, { $set: { token: null } });

        if (user === null)
        {
            console.log("Logout unauthorized error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    error: "Not authorized."
                },
                message: "Logout unauthorized error!"
            });
        }
        console.log("Logout success response!");

        return res.status(204).end();
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        res.status(500).send({ message: "Internal server error!" });
        
        return next(error);
    }
};
module.exports = { logout };