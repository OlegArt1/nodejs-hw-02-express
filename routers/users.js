const multer = require("multer");
const express = require("express");

const path = require("node:path");
const crypto = require("node:crypto");

const
{
    UploadAvatar, UpdateAvatar,
}
= require("../controllers/avatar/index");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (__, ___, cb) {
        cb(null, path.join(__dirname, "..", "tmp"));
    },
    filename: function (req, file, cb)
    {
     // 560fc0fd-8092-41ad-ab08-bb6094071f09
        const uniqueSuffix = crypto.randomUUID();
     // file.originalname: TrevorPhilips-GTAV.png
        const ext = path.extname(file.originalname); // .png \\

     // TrevorPhilips-GTAV
        const baseName = path.basename(file.originalname, ext);

     // TrevorPhilips-GTAV-560fc0fd-8092-41ad-ab08-bb6094071f09.png
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});
const upload = multer({ storage, limits: { fileSize: 1000000 } }); // 1 MB \\

router.post("/:id/avatars", upload.single("image"), UploadAvatar.uploadAvatar);
router.patch("/avatars", upload.single("image", UpdateAvatar.updateAvatar));

module.exports = router;