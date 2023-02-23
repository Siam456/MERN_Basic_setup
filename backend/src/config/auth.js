const jwt = require("jsonwebtoken");
const genToken = async (payload) => {
  return await jwt.sign({ payload }, process.env.JWT_SECRATE, {
    expiresIn: "3d",
  });
};

module.exports = { genToken };
