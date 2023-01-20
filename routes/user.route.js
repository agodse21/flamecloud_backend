const express = require("express");
const { UserController } = require("../controllers/User.controller");
// const { Authentication } = require("../middlewares/Authentication");

const UserRouter = express.Router();
UserRouter.post("/login", UserController.Login);
UserRouter.post("/signup", UserController.SignUp);

module.exports = {
  UserRouter,
};
