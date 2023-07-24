const Jimp = require("jimp");

async function resizeImage (tempUpload)
{
    await Jimp.read(tempUpload)
        .then((avatar) =>
        {
            return avatar.resize(250, 250).write(tempUpload);
        })
        .catch((err) =>
        {
            throw err;
        });

    return tempUpload;
};
module.exports = resizeImage;