const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  msg: String,
  img: String,
  id_user_platform: String,
});

module.exports = comments;
