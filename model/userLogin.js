const mongoose = require("mongoose");

const user = new mongoose.Schema({
  id_user_platform: String,
  email: { type: String, require: true },
  password: String,
  full_Name: String,
  date_login: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", user);
