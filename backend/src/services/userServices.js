const models = require("../models/data-models");
const viewModel = require("../models/view-Models");
const { NotFound } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { genToken } = require("../config/auth");

const saveUser = async (userData) => {
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
    data: {
      _id,
      username,
      email,
      phone,
    },
    token: token,
    message: "User create successfully!",
  };
};

const getUsers = async () => {
  const User = models.User;
  const Users = await User.find();
  const letViewModel = Users.map((user) => new viewModel.UserViewModel(user));

  return letViewModel;
};

const update = async (user, id) => {
  const User = await models.User.findByIdAndUpdate(id, {
    $set: {
      ...user,
    },
  });

  if (user) {
    return User._id;
  }

  throw new NotFound("User not found by the id: " + id);
};

const deleteById = async (id) => {
  const User = models.User;
  let model = await User.findById({ _id: id });
  if (model) {
    let result = await User.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("User not found by the id: " + id);
};

const getUserById = async (id) => {
  const User = models.User;
  let model = await User.findById(id);
  let newViewModel = new viewModel.UserViewModel(model);
  return newViewModel;
};
module.exports = { saveUser, getUsers, update, deleteById, getUserById };
