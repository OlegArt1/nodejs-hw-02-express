const jwt = require("jsonwebtoken");
const User = require("../models/users");

//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'd5hddr4h43hgf5gfgfdh';

function authorization (req, res, next)
{
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== "string")
    {
        console.log("No token provided!");

        return res.status(401).json({ error: "No token provided!" });
    }
    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer")
    {
        console.log("No token provided!");

        return res.status(401).json({ error: "No token provided!" });
    }
    jwt.verify(token, JWT_SECRET, async (err, decode) =>
    {
        if (err)
        {
            if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
            {
                console.log("Token error!");

                return res.status(401).json({ error: "Token error!" });
            }
            return next(err);
        }
        try
        {
            const user = await User.findOne({ token: token });

            if (user === null)
            {
                console.log("Token error!");

                return res.status(401).json({ error: "Token error!" });
            }
            if (user.verify !== true)
            {
                console.log("Token expired!");
                
                return res.status(401).json({ error: "Token expired!" });
            }
            console.log(decode);

            req.user = { id: user._id, name: user.name };

            next();
        }
        catch (error)
        {
            console.log(error);

            res.status(500).send({ message: "Internal server error!" });

            return next(error);
        }
    });
};
module.exports = authorization;