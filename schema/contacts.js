const Joi = require("joi");

const ContactsSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});
module.exports = ContactsSchema;