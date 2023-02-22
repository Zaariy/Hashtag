const express = require("express");
const uploads = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const randomSt = require("random-string");
const userLogin = require("../model/userLogin");
const userMain = require("../model/userMain");
const public_postes = require("../model/public_postes");

var RANDOM_STRING; // Name of image.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "uploads", "images"));
  },

  filename: (req, file, cb) => {
    const RANDOM = randomSt({
      length: 20,
      letters: true,
      specail: false,
      numeric: true,
    });
    RANDOM_STRING = `${RANDOM}${file.originalname}`;
    cb(null, `${RANDOM}${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage });
uploads.post("/post", uploadFile.single("img"), async (req, res) => {
  // Jimp is libary fro editing Images
  Jimp.read(
    path.resolve(__dirname, "../", "uploads", "images", RANDOM_STRING)
  ).then((img) =>
    img
      // When user upload his image then we try to resize it .
      .resize(320, Jimp.AUTO)
      .write(path.resolve(__dirname, "../", "uploads", "images", RANDOM_STRING))
  );
  const { id_user_platform, artical_post = "", token } = req.body;
  if (!token) {
    return res.send({
      status: "fail",
      msg: "Please add token",
      error: "token",
    });
  }
  if (!id_user_platform) {
    return res.send({
      status: "fail",
      msg: "Please add id user",
      error: "id",
    });
  }
  if (
    (await userLogin.findOne({ id_user_platform: id_user_platform })) === null
  ) {
    return res.send({
      status: "fail",
      msg: "Please check id user",
      error: "id",
    });
  }
  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const user = await userMain.findOne({
        id_user_platform: id_user_platform,
      });
      const data = {
        image: RANDOM_STRING,
        id_post: randomSt({
          length: 15,
          letters: true,
          specail: false,
          numeric: true,
        }),
        body: artical_post,
        full_Name: user.full_Name,
        id_user_platform: user.id_user_platform,
        poster_img: user.poster_img,
      };
      user.postes.push(data);
      user.postes_count = user.postes_count + 1;
      // These lines below its job to add data to public_data in database
      const newpost = await public_postes.findOne({});
      if (newpost) {
        newpost.postes.push(data);
        newpost.save();
      } else {
        await public_postes.create({ postes: data });
      }

      user.save();

      return res.send({
        status: "ok",
        msg: "artical has posted seccessfuly",
        error: "",
      });
    }
  } catch (err) {
    return res.send({
      status: "ok",
      msg: "artical has not posted  please check token",
      error: "token",
    });
  }
});

//
uploads.post("/public_postes", async (req, res) => {
  const { token } = req.body;
  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const public_data = await public_postes.findOne({});
      if (public_data) {
        return res.send({ postes: public_data.postes });
      } else {
        const responseFromCreate = await public_postes.create({});
        return res.send({ postes: responseFromCreate.postes });
      }
    }
  } catch (er) {
    return res.send({
      status: "fail",
      msg: "Please check token",
      err: "token",
    });
  }
});

module.exports = uploads;
