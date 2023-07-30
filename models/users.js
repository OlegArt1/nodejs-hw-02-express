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
    verify:
    {
        type: Boolean,
        default: false,
    },
    verificationToken:
    {
        type: String,
        required: [true, 'Verify token is required'],
        default: null,
    }
},
{
    versionKey: false,
});
module.exports = mongoose.model("User", userSchema);