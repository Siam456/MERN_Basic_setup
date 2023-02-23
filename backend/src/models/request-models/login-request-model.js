const Joi = require("joi");

const schema = Joi.object().keys({
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(8).required(),
});

const loginValidate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

module.exports = loginValidate;
