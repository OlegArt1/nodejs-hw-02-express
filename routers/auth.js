const express = require("express");

const
{
    Registration, Login, Logout, Current,
}
= require("../controllers/auth/index");

const auth = require("../middleware/auth");

const router = express.Router();

router.use(express.json());
router.post("/register", Registration.registered);
router.post("/login", Login.login);
router.post("/logout", auth, Logout.logout);
router.get("/current", auth, Current.current);

module.exports = router;