const UsersModel = require("../../models/users");

async function updateAvatar (req, res, next)
{
    const { id } = req.params;
  
    try
    {
        const user = await UsersModel.findByIdAndUpdate(id,
            
            { avatarURL: req.file.filename },
            
            { new: true }).select({ name: 1, email: 1, avatarURL: 1 });
  
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
module.exports = { updateAvatar };