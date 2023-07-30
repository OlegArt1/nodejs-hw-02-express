const crypto = require("node:crypto");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const User = require("../../models/users");
const { sendEmail } = require("../../helpers/index");

async function registered (req, res, next)
{
    const { email, password, subscription } = req.body;
  
    try
    {
        const user = await User.findOne({ email });
  
        if (typeof email !== "string")
        {
            console.log("Registration validation error!");
        
            return res.status(400).send({
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
        if (user !== null)
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

            const verifyToken = crypto.randomUUID();
        
            const avatarUrl = gravatar.url(email, { protocol: 'https', format: 'png' });

            await User.create({
                email,
                password: passwordHash,
                subscription,
                avatarURL: avatarUrl,
                verificationToken: verifyToken,
            });
            await sendEmail({
                to: email,
                subject: `Welcome on board, ${email}`,
                html: `To confirm your registration, please click on the link below: <a href="http://localhost:8000/api/users/verify/${verifyToken}">Click to confirm your registration</a>`,
                text: `To confirm your registration, please open the link below: http://localhost:8000/api/users/verify/${verifyToken}`,
            });
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