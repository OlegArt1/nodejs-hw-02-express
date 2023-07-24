const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const { UsersModel } = require("../../models/users");
const { resizeImage } = require("../../middleware/resizeImage");

const avatarsDir = path.join(__dirname, "tmp");

async function updateAvatar (req, res, next)
{
    const { tempUpload, originalname } = req.file;
console.log(`Original name -- ${originalname};`);
        console.log(`Temp upload name -- ${tempUpload};`);
    try
    {
        
    /*
        const { path: tempUpload, originalname } = req.file;
    
        await resizeImage(tempUpload);

        const filename = `${_id}_${originalname}`;
    
        const resultUpload = path.join(avatarsDir, filename);
    
        await fs.rename(tempUpload, resultUpload);

        const avatarUrl = path.join("avatars", filename);
    
        await UsersModel.findByIdAndUpdate(_id, {avatarUrl});

        return res.status(200).json({
            status: "OK",
            code: 200,
            contentType: "application/json",
            responseBody:
            {
                avatarURL: avatarUrl
            }
        });
    */
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
}
module.exports = { updateAvatar };