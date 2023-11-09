//external import
const user = require("../models/usersSchema");
const { loginController } = require("../controller/loginControler");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/user/userErrorHandler");
const getUser = require("../middlewares/user/addUser");
//internal import
const express = require("express");
const mongoose = require("mongoose");
const avatarUpload = require("../middlewares/user/avatarUpload");
//router init
const router = express.Router();
//route
//create user
router.post(
  "/signin",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  getUser
);
router.post("/login", loginController);
module.exports = router;
