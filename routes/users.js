const crypto = require("node:crypto");
const path = require("node:path");

const multer = require("multer");
const express = require("express");

const
{
    Avatar, VerificationEmail,
}
= require("../controllers/auth/index");

const router = express.Router();

const storage = multer.diskStorage(
{
    destination: function (__, ___, cb)
    {
        cb(null, path.join(__dirname, "..", "tmp"));
    },
    filename: function (req, file, cb)
    {
        const uniqueSuffix = crypto.randomUUID();
    
        const ext = path.extname(file.originalname);

        const baseName = path.basename(file.originalname, ext);

        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});
const upload = multer({ storage, limits: { fileSize: 1000000 } });

router.get("/verify/:token", VerificationEmail.verify);
router.patch("/avatar", upload.single("image"), Avatar.updateAvatar);

module.exports = router;