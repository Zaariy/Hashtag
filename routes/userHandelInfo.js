const express = require("express");
const handleInfoUser = express.Router();
const jwt = require("jsonwebtoken");
const userLogin = require("../model/userLogin");
const userMain = require("../model/userMain");
const randomSt = require("random-string");
const multer = require("multer");
const path = require("path");
const public_postes = require("../model/public_postes");

handleInfoUser.post("/userinfo", async (req, res) => {
  const { token, id_user_platform } = req.body;

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
    if (jwt.verify(token, await process.env.SECRIT_KEY_JWT)) {
      const user = await userMain.findOne({
        id_user_platform: id_user_platform,
      });

      return res.send(user);
    }
  } catch {
    return res.send({
      status: "fail",
      msg: "Please check token ",
      error: "token",
    });
  }
});

handleInfoUser.post("/usersearch", async (req, res) => {
  const { id_user_platform, token } = req.body;
  if (!id_user_platform) {
    return res.send({
      status: "fail",
      msg: "Please check Id",
      err: "Id",
    });
  }
  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const usersearch = await userMain.findOne({
        id_user_platform: id_user_platform,
      });
      return res.send(usersearch);
    }
  } catch {
    return res.send({
      status: "fail",
      msg: "Please check token",
      err: "token",
    });
  }
});

handleInfoUser.post("/post_comment", async (req, res) => {
  const { token, id_post, data_comment } = req.body;
  if (!id_post) {
    res.send({
      status: "fail",
      msg: "Please check id of post",
      err: "id_post",
    });
  }
  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const searchcomment = await userMain.findOne({
        postes: { $elemMatch: { id_post: id_post } },
      });
      const searchcommentpublic_postes = await public_postes.findOne({
        postes: { $elemMatch: { id_post: id_post } },
      });
      if (!searchcomment && !searchcommentpublic_postes) {
        return res.send({
          status: "fail",
          msg: "comment has not posted ",
          err: "id",
        });
      }
      /*
       * Here I am trying to find exact comment by its id
       * and then i will push the new comment
       *  /\ => I don't know how to do it with mongoose query so I decided to do it manuly
       * I'll change it in futuer if know how to do it .
       */

      for (let i = 0; i < searchcomment.postes.length; i++) {
        if (searchcomment.postes[i].id_post === id_post) {
          const comment = {
            name: data_comment.name,
            msg: data_comment.msg,
            img: data_comment.poster_img,
            id_user_platform: data_comment.id_user_platform,
          };
          searchcomment.postes[i].comments.push(comment);
          searchcomment.save();
          searchcommentpublic_postes.postes[i].comments.push(comment);
          searchcommentpublic_postes.save();
        }
      }
      // successfully posted comment response
      res.send({
        status: "ok",
        msg: "comment has posted successfully",
        err: "",
      });
    }
  } catch (err) {
    // if comment does not posted
    res.send({
      status: "fail",
      msg: "Please check token",
      err: "token",
    });
  }
});
handleInfoUser.post("/updateinformationuser", async (req, res) => {
  const { token, id_user_platform, dataupdate } = req.body;
  if (!id_user_platform) {
    res.send({
      status: "fail",
      msg: "Please check id of user platform",
      err: "id_user_platform",
    });
  }
  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const user = await userMain.findOne({
        id_user_platform: id_user_platform,
      });
      if (user) {
        user.information = dataupdate;
        user.save();
        res.send({
          status: "ok",
          msg: "information has updated seccussfully",
          err: "",
        });
      }
    }
  } catch {
    return res.send({
      status: "fail",
      msg: "Please check token",
      err: "token",
    });
  }
});

handleInfoUser.post("/user_search_by_name", async (req, res) => {
  const { token, full_Name } = req.body;
  if (!token) {
    return res.send({
      status: "fail",
      msg: "Please add token",
      error: "token",
    });
  }

  if (!full_Name) {
    return res.send({
      status: "fail",
      msg: "Please add full Name of user",
      err: "full_Name",
    });
  }

  try {
    if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
      const user = await userMain.find({ full_Name: full_Name });
      if (user.length !== 0) {
        res.send({
          status: "ok",
          msg: "user founded",
          data: user,
          err: "",
        });
      } else {
        res.send({
          status: "fail",
          msg: "user not founded",
          err: "",
        });
      }
    }
  } catch {
    return res.send({
      status: "fail",
      msg: "Please check token",
      err: "token",
    });
  }
});

var NAME_IMG;
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
    NAME_IMG = `${RANDOM}${file.originalname}`;
    cb(null, NAME_IMG);
  },
});

const uploadFile = multer({ storage: storage });

handleInfoUser.post(
  "/update_image_profile",
  uploadFile.single("img"),
  async (req, res) => {
    const { token, id_user_platform } = req.body;
    if (!id_user_platform) {
      res.send({
        status: "fail",
        msg: "Please check id user",
        err: "id user platform ",
      });
    }
    if (!token) {
      res.send({
        status: "fail",
        msg: "Please check user token ",
        err: "token",
      });
    }
    try {
      if (jwt.verify(token, process.env.SECRIT_KEY_JWT)) {
        const user = await userMain.findOne({
          id_user_platform: id_user_platform,
        });
        if (user) {
          user.poster_img = `/uploads/images/${NAME_IMG}`;
          user.save();
          return res.send({
            status: "ok",
            msg: "image profile has updated seccussfully",
            err: "",
          });
        }
      }
    } catch {
      res.send({
        status: "fail",
        msg: "Please check user token ",
        err: "token",
      });
    }
  }
);

module.exports = handleInfoUser;
