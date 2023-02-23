const Joi = require("joi");

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string()
    .min(11)
    .pattern(/^[0-9]+$/),
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(8).required(),
});

const userValidate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

module.exports = userValidate;
