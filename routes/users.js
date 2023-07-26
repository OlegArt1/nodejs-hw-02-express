const multer = require("multer");
const express = require("express");

const path = require("node:path");
const crypto = require("node:crypto");

const { UpdateAvatar } = require("../controllers/auth/index");

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

router.patch("/avatars", upload.single("image"), UpdateAvatar.updateAvatar);

module.exports = router;