const Joi = require("joi");

const acceptFPSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  providedCode: Joi.number().required(),
  newPassword: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = acceptFPSchema;
