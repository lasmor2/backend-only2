const joi = require("joi");

acceptSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  providedCode: joi.number().required(),
});
module.exports = acceptSchema;
