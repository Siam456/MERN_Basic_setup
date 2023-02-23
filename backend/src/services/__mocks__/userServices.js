const models = require("../../models/data-models");

let users = [
  {
    _id: "1",
    userName: "siam",
  },
];

const getUsers = async () => {
  return users;
};

const saveUser = async (userData) => {
  const user = new models.User(userData);
  users.push(user);

  return user;
};

const getUserById = async (id) => {
  let model = users.find((x) => x._id.toString() === id);

  return model;
};

const update = async (user) => {
  users[0].userName = user.userName;
  users[0].createdAt = new Date();
};

const deleteById = async (id) => {
  const newUsers = users.filter((x) => x._id !== id);
  users = newUsers;
};

module.exports = { getUsers, saveUser, getUserById, update, deleteById };
