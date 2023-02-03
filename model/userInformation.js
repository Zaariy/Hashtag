const mongoose = require("mongoose");

const userInformation = new mongoose.Schema({
  about: String,
  mobile: String,
  address: String,
  brith_date: String,
  live_in: String,
  gender: String,
  website: String,
  socil_link: String,
});

module.exports = userInformation;
