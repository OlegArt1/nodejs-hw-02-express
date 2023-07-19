const express = require("express");
const auth = require("../middleware/auth");
const
{
    authRegister,
    authLogin,
    authLogout,
    authCurrent,
} = require("../controllers/auth");

const router = express.Router();

router.use(express.json());
router.post("/register", authRegister.registered);
router.post("/login", authLogin.login);
router.post("/logout", auth, authLogout.logout);
router.get("/current", auth, authCurrent.current);

module.exports = router;