const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string().min(6).max(60).required(),
  description: Joi.string().min(6).max(500).required(),
  userId: Joi.string().required(),
});

module.exports = createPostSchema;
