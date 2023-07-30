const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    token:
    {
        type: String,
        default: null,
    },
    avatar:
    {
        type: String,
        default: null,
    },
    verified:
    {
        type: Boolean,
        default: false,
    },
    verifyToken:
    {
        type: String,
        default: null,
    }
},
{
    versionKey: false,
});
module.exports = mongoose.model("User", userSchema);