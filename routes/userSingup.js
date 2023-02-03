const express = require("express");
const singup = express.Router();
const userLogin = require("../model/userLogin");
const userMain = require("../model/userMain");
const bcrypt = require("bcrypt");

singup.post("/singup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const uniqueIduser = `${new Date().getTime()}${fullName}`;

  if (fullName.length < 4) {
    return res.send({
      msg: "Please fullName must be biger than 5 character",
      status: "fail",
      error: "fullName",
    });
  }

  if (fullName.length === 0) {
    return res.send({
      msg: "Please write fullName ",
      status: "fail",
      error: "fullName",
    });
  }

  if (password.length < 8) {
    return res.send({
      msg: "Please passwrod must be biger than 8 character",
      status: "fail",
      error: "password",
    });
  }

  if ((await userLogin.findOne({ email: email })) !== null) {
    return res.send({
      msg: "Sorry this email has already been used",
      status: "fail",
      error: "email",
    });
  }

  if ((await userLogin.findOne({ full_Name: fullName })) !== null) {
    return res.send({
      msg: "Sorry this fullName has already been used",
      status: "fail",
      error: "fullName",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  await userLogin.create({
    full_Name: fullName,
    email: email,
    password: hashpassword,
    id_user_platform: uniqueIduser,
  });

  await userMain.create({
    id_user_platform: uniqueIduser,
    full_Name: fullName,
    poster_img: "/uploads/images/unknown.jpg",
    background_img: "/uploads/images/unknown.jpg",
    information: {
      about: "Unknown",
      mobile: "Unknown",
      address: "Unknown",
      brith_date: "Unknown",
      live_in: "Unknown",
      gender: "Unknown",
      website: "Unknown",
      socil_link: "Unknown",
    },

    friends: [],
    postes: [],
    followers: 0,
    following: 0,
    postes_count: 0,
    notifications: [],
    settings: {
      mode: "light",
    },
  });

  return res.send({
    msg: "You have been registered successfully",
    status: "ok",
    error: "",
  });
});

module.exports = singup;
