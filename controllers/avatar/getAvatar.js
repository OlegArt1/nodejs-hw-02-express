const UsersModel = require("../../models/users");

async function getAvatarById (req, res, next)
{
    const { id } = req.params;

    try
    {
        const user = await UsersModel.findById(id).select({ name: 1, email: 1, avatar: 1 });

        if (user === null)
        {
            console.log("User not found!");

            return res.status(404).json({ message: "User not found!" });
        }
        else
        {
            return res.status(200).json(user);
        }
    }
    catch (error)
    {
        console.log(error);
        
        return next(error);
    }
};
module.exports = { getAvatarById };