const User = require("../../models/users");

async function verify (req, res, next)
{
    const { token } = req.params;
  
    try
    {
        const user = await User.findOne({ verifyToken: token });
  
        if (user === null)
        {
            return res.status(401).json({ message: "Invalid token" });
        }
        await User.findByIdAndUpdate(user._id,
        {
            verified: true,
            verifyToken: null,
        });
        return res.json({ message: "User verified" });
    }
    catch (error)
    {
        return next(error);
    }
};
module.exports = { verify };