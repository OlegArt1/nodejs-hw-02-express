const express = require("express");
const auth = require("../middleware/auth");

const postRegisterAuthController = require("../controllers/auth/authRegister");
const postLoginAuthController = require("../controllers/auth/authLogin");
const postLogoutAuthController = require("../controllers/auth/authLogout");
const getCurrentAuthController = require("../controllers/auth/authCurrent");
const patchUpdateStatusAuthController = require("../controllers/auth/authUpdateStatus");

const router = express.Router();

router.use(express.json());
router.post("/register", postRegisterAuthController.registered);
router.post("/login", postLoginAuthController.login);
router.post("/logout", auth, postLogoutAuthController.logout);
router.get("/current", auth, getCurrentAuthController.current);
router.patch("/", patchUpdateStatusAuthController.updateStatusAuth);

module.exports = router;