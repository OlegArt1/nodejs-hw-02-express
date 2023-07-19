const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");

const JWT_SECRET = 'h5Gd3kf7Fg3H35gDm7Ngd2hd'; // ffgdfgh56vgghh \\

async function registered (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await Users.findOne({ email });

        if (typeof subscription !== "string" && typeof subscription !== "undefined")
        {
            console.log("Registration validation error!");
        
            return res.status(400).send({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    error: "Validation error."
                },
                message: "Registration validation error!"
            });
        }
        if (user !== null)
        {
            console.log("Registration conflict error!");

            return res.status(409).json({
                status: "Conflict",
                code: 409,
                contentType: "application/json",
                responseBody:
                {
                    error: "Email in use."
                },
                message: "Registration conflict error!"
            });
        }
        const passwordHash = await bcrypt.hash(password, 10);

        await Users.create({ email, password: passwordHash, subscription });
  
        console.log("Registration success response!");
  
        res.status(201).json({
            status: "Created",
            code: 201,
            contentType: "application/json",
            responseBody:
            {
                user:
                {
                    email: req.body.email,
                    subscription: req.body.subscription
                }
            },
            message: "Registration success response!"
        });
    }
    catch (error)
    {
        console.log("Registration validation error!");
        console.log(error);

        res.status(400).send({
            status: "Bad request",
            code: 400,
            contentType: "application/json",
            responseBody:
            {
                error: "Validation error."
            },
            message: "Registration validation error!"
        });
        return next(error);
    }
};
async function login (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await Users.findOne({ email });

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
        if (user === null)
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
        if (isMatch === false)
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
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        await Users.updateOne({ _id: user._id }, { $set: { token } });

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
module.exports =
{
    registered,
    login,
    logout,
};