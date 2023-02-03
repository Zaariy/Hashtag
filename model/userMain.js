const mongoose = require("mongoose");
const userInformation = require("./userInformation");
const postes = require("./userPostes");
const userNotifications = require("./userNotifications");
const settingsUser = new mongoose.Schema({
  mode: String,
});

const userAllInfo = new mongoose.Schema({
  full_Name: String,
  id_user_platform: String,
  poster_img: String,
  background_img: String,
  information: userInformation,
  friends: Array,
  postes: [postes],
  followers: Number,
  following: Number,
  postes_count: Number,
  notifications: [userNotifications],
  settings: settingsUser,
});

module.exports = mongoose.model("userInformation", userAllInfo);
