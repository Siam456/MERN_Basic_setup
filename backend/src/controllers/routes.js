const express = require("express");
const userRoutes = require("./userController");
const authRoutes = require("./authController");

let router = express.Router();

router.use("/users", userRoutes);
router.use("/", authRoutes);

module.exports = router;
