const express = require("express");

const validators = require("../models/request-models");
const { handleValidations } = require("../middlewares/handleValidations");

const {
  saveUser,
  getUsers,
  getUserById,
  update,
  deleteById,
} = require("../services/userServices.js");
const { NotFound } = require("../utils/errors");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const getHandler = async (req, res) => {
  const users = await getUsers();
  res.send(users);
};

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFound("User not found by the id: " + id);
    }
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await saveUser(body);
    res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await update(body, req.params.id);
    res.status(200).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).send("User deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", authMiddleware, getHandler);
router.get("/:id", getByIdHandler);
router.post("/", handleValidations(validators.userSchemaValidate), postHandler);
router.put("/:id", putHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
