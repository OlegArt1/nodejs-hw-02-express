const Joi = require("joi");

const UsersSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});
module.exports = UsersSchema;