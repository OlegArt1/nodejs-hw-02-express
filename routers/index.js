const express = require("express");
const auth = require("../middleware/auth");
const contactRoutes = require("./contacts");
const authRoutes = require("./auth");

const router = express.Router();

router.use("/users", authRoutes);
router.use("/contacts", contactRoutes);

module.exports = router;