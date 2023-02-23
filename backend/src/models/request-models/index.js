const userValidate = require("./user-request-model");
const loginValidate = require("./login-request-model");

const validators = {
  userSchemaValidate: userValidate,
  loginSchemaValidate: loginValidate,
};

module.exports = validators;
