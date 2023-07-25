const express = require("express");

const auth = require("../middleware/auth");

const authRoutes = require("./auth");
const userRoutes = require("./users");
const contactsRoutes = require("./contacts");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/contacts", auth, contactsRoutes);

module.exports = router;