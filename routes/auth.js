const express = require("express");
const auth = require("../middleware/auth");
const
{
    Registration, Login, Logout,
}
= require("../controllers/auth/index");

const router = express.Router();

router.use(express.json());
router.post("/register", Registration.registered);
router.post("/login", Login.login);
router.post("/logout", auth, Logout.logout);

module.exports = router;