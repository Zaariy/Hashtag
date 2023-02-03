const express = require("express");
const userLogin = require("../model/userLogin");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

login.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({
      msg: "Please write your email ",
      status: "fail",
      error: "email",
    });
  }
  if (!password) {
    return res.send({
      msg: "Please write your password ",
      status: "fail",
      error: "email",
    });
  }
  if (password.length < 8) {
    return res.send({
      msg: "Please passwrod must be biger than 8 character",
      status: "fail",
      error: "password",
    });
  }
  const user = await userLogin.findOne({ email: email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return res.send({
        status: "ok",
        id_user_platform: user.id_user_platform,
        token: jwt.sign(
          {
            id_user_platform: user.id_user_platform,
            fullName: user.fullName,
          },
          process.env.SECRIT_KEY_JWT
        ),
        msg: "login seccess",
      });
    } else {
      return res.send({
        status: "fail",
        msg: "password / email is not correct",
      });
    }
  } else {
    return res.send({
      status: "fail",
      msg: "password / email is not correct",
    });
  }
});

module.exports = login;
