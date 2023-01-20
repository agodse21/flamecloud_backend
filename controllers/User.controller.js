const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SignUp = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { name, email, password } = req.body;
  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    res.send({ msg: "user Already exist" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong try after sometime" });
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
        user_ip_address: ip,
      });
      try {
        await new_user.save();
        res.send({ msg: "Signup Sucessfully" });
      } catch (err) {
        res.send({ msg: "someting went wrong,please try again" });
      }
    });
  }
};
const Login = async (req, res) => {
  const { username, id } = req.body;
  let user = {
    name: username,
    telgram_user_id: id,
  };
  const new_user = new UserModel(user);
  await new_user.save();

  if (new_user) {
    res.send({ msg: "Login Successfull!", user: new_user });
  } else {
    res.send({ msg: "Login Failed" });
  }
};

const LoginUsingTelegram = (user) => {
  const new_user = new UserModel(user);

  new_user.save();
  return "Login Successfull!";
};

const UserController = {
  Login,
  SignUp,
  LoginUsingTelegram,
};
module.exports = {
  UserController,
};
