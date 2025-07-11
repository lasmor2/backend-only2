const joi = require("joi");

signInSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi
    .string()
    .min(8)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = signInSchema;
