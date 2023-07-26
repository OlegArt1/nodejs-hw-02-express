const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const User = require("../../models/users");
const { resizeImage } = require("../../middleware/resizeImage");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function updateAvatar (req, res)
{
    const { id } = req.body;

    const { path: tempUpload, originalname } = req.file;

    await resizeImage(tempUpload);

    const filename = `${id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = path.join("avatars", filename);

    const avatar = await User.findByIdAndUpdate(id, { avatarURL: avatarUrl });

    res.status(200).json({ avatar: avatarUrl });
};
module.exports = { updateAvatar };