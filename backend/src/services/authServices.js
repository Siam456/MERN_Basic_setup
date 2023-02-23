const models = require("../models/data-models");
const bcrypt = require("bcrypt");
const { genToken } = require("../config/auth");

const registerUser = async (userData) => {
  const { password, ...rest } = userData;
  const salt = await bcrypt.genSalt(10);

  const hashPass = await bcrypt.hash(password, salt);

  const user = new models.User({
    password: hashPass,
    ...rest,
  });
  const _user = await user.save();

  const { _id, username, email, phone } = _user;
  const token = await genToken({ _id, username, email, phone });

  return {
    user: {
      _id,
      username,
      email,
      phone,
    },
    token: token,
  };
};
const loginUser = async (userData) => {
  const _user = await models.User.findOne({ email: userData.email });

  if (_user !== null) {
    const checkPass = await bcrypt.compare(userData.password, _user?.password);
    if (checkPass) {
      const { _id, username, email, phone } = _user;
      const token = await genToken({ _id, username, email, phone });

      return {
        user: {
          _id,
          username,
          email,
          phone,
        },
        token: token,
      };
    }
  }
};

module.exports = { registerUser, loginUser };
