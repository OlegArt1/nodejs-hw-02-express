const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const User = require("../../models/users");

async function registered (req, res, next)
{
    const { email, password, subscription } = req.body;
  
    try
    {
        const user = await User.findOne({ email });
  
        const users = await User.find().select({ id: 1 });

        if (typeof email !== "string")
        {
            console.log("Registration validation error!");
        
            res.status(400).send({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody:
                {
                    message: "Validation error"
                },
                messageError: "Registration validation error"
            });
        }
        else if (user !== null)
        {
            console.log("Registration conflict error!");

            return res.status(409).json({
                status: "Conflict",
                code: 409,
                contentType: "application/json",
                responseBody:
                {
                    message: "Email in use"
                },
                messageError: "Registration conflict error"
            });
        }
        else
        {
            const passwordHash = await bcrypt.hash(password, 10);
      
            const avatarUrl = gravatar.url(email, { protocol: 'https', format: 'png' });
      
            console.log("You are now registered!");
            
            await User.create({ email, password: passwordHash, subscription, avatarURL: avatarUrl });

            return res.status(201).json({
                status: "Created",
                code: 201,
                contentType: "application/json",
                responseBody:
                {
                    user:
                    {
                        email: req.body.email,
                        subscription: req.body.subscription
                    },
                },
                message: "You are now registered"
            });
        }
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
                message: "Validation error!"
            },
            messageError: "Registration validation error!"
        });
        return next(error);
    }
};
module.exports = { registered };