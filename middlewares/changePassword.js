const Joi = require("joi");

const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  oldPassword: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = changePasswordSchema;
