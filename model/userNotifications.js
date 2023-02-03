const mongoose = require("mongoose");

const notificitions = new mongoose.Schema({
  id_notification: String,
  id_person: String,
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = notificitions;
