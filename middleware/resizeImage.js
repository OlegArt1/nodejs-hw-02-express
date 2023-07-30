const Jimp = require("jimp");

async function resizeImage (sizeImage)
{
    await Jimp.read(sizeImage)
    
        .then((avatar) =>
        {
            return avatar.resize(250, 250).write(sizeImage);
        })
        .catch((err) =>
        {
            throw err;
        });

    return sizeImage;
};
module.exports = { resizeImage };