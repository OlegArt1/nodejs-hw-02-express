const Registration = require("./authRegister");
const Login = require("./authLogin");
const Logout = require("./authLogout");
const Current = require("./authCurrent");
const Avatar = require("./updateAvatar");
const VerificationEmail = require("./verifyEmail");
const ResendVerificationEmail = require("./resendVerifyEmail");

module.exports =
{
    Registration,
    Login,
    Logout,
    Current,
    Avatar,
    VerificationEmail,
    ResendVerificationEmail,
};