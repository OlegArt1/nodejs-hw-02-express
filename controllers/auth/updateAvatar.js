const path = require("path");
const fs = require("fs/promises");
const crypto = require("node:crypto");

require("dotenv").config();

const User = require("../../models/users");
const { resizeImage } = require("../../middleware/resizeImage");

async function updateAvatar (req, res, next)
{
    const { id } = req.body;

    try
    {
        const pathAvatar = path.join(__dirname, "../../", "public", "avatars");
    
        const { path: tempUpload, originalname } = req.file;
    
        await resizeImage(tempUpload);
    
        const filename = `${crypto.randomUUID()}_${originalname}`;
    
        const result = path.join(pathAvatar, filename);
    
        await fs.rename(tempUpload, result);
    
        const avatarUrl = path.join("avatars", filename);
    
        const avatar = await User.findByIdAndUpdate(id, { avatarURL: avatarUrl }, { new: true });
    
        if (avatar === null)
        {
            console.log("Unauthorized!");

            res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    message: "Not authorized"
                }
            });
        }
        else
        {
            res.status(200).json({
                status: "OK",
                code: 200,
                contentType: "application/json",
                responseBody:
                {
                    avatarURL: avatarUrl
                }
            });
        }
    }
    catch (error)
    {
        console.log(error);

        res.status(401).json({
            status: "Unauthorized",
            code: 401,
            contentType: "application/json",
            responseBody:
            {
                message: "Not authorized"
            }
        });
        return next(error);
    }
};
module.exports = { updateAvatar };