const mongoose = require("mongoose");
const comments = require("./userComments");

const postes = new mongoose.Schema({
  image: String,
  id_post: String,
  title: String,
  poster_img: String,
  body: String,
  id_user_platform: String,
  full_Name: String,
  date: { type: Date, default: Date.now },
  likes: Number,
  comments: [comments],
});

module.exports = postes;
