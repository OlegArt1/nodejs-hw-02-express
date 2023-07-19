const mongoose = require("mongoose");

const User = require("./users");

const contactSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email:
    {
        type: String,
    },
    phone:
    {
        type: String,
    },
    favorite:
    {
        type: Boolean,
        default: false,
    },
    owner:
    {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
},
{ versionKey: false });

module.exports = mongoose.model("Contacts", contactSchema);