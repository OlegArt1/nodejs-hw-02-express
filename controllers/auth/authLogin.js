const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'd5hddr4h43hgf5gfg';

async function login (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (typeof subscription !== "string" && typeof subscription !== "undefined")
        {
            console.log("Login validation error!");
        
            return res.status(400).send({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    error: "Validation error."
                },
                message: "Login validation error!"
            });
        }
        else if (user === null)
        {
            console.log("Login auth error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    error: "Email or password is wrong."
                },
                message: "Login auth error!"
            });
        }
        else if (isMatch === false)
        {
            console.log("Login auth error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    error: "Email or password is wrong."
                },
                message: "Login auth error!"
            });
        }
        else
        {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

            await User.updateOne({ _id: user._id }, { $set: { token } });

            console.log("Login success response!");

            return res.status(200).json({
                status: "OK",
                code: 200,
                contentType: "application/json",
                responseBody:
                {
                    token: token,
                    user:
                    {
                        email: req.body.email,
                        subscription: req.body.subscription
                    }
                },
                message: "Login success response!"
            });
        }
    }
    catch (error)
    {
        console.log("Login validation error!");
        console.log(error);
        
        res.status(400).send({
            status: "Bad request",
            code: 400,
            contentType: "application/json",
            responseBody:
            {
                error: "Validation error."
            },
            message: "Login validation error!"
        });
        return next(error);
    }
};
module.exports = { login };