const express = require("express");

const validators = require("../models/request-models");
const { handleValidations } = require("../middlewares/handleValidations");

const { registerUser, loginUser } = require("../services/authServices");
const router = express.Router();

const registerHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const { user, token } = await registerUser(body);
    res.status(201).send({
      data: { user, token },
      message: "User create successfully!",
    });
  } catch (error) {
    return next(error, req, res);
  }
};
const loginHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await loginUser(body);
    if (data) {
      res.status(201).send({
        data,
        message: "Login successfully!",
      });
    } else {
      res.status(201).send({
        message: "cannot find user!",
      });
    }
  } catch (error) {
    return next(error, req, res);
  }
};

router.post(
  "/login",
  handleValidations(validators.loginSchemaValidate),
  loginHandler
);
router.post(
  "/register",
  handleValidations(validators.userSchemaValidate),
  registerHandler
);

module.exports = router;
