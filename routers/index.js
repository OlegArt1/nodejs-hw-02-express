const express = require("express");

const auth = require("../middleware/auth");

const authRoutes = require("./auth");
const userRoutes = require("./users");
const bookRoutes = require("./books");
const contactsRoutes = require("./contacts");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", auth, bookRoutes);
router.use("/contacts", auth, contactsRoutes);

module.exports = router;