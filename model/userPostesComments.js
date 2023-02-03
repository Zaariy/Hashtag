const mongoose = require("mongoose");
const comments = require("./userComments");

const postesComments = new mongoose.Schema({
  id_post: String,
  comments: [comments],
});

module.exports = mongoose.model("postesComments", postesComments);
