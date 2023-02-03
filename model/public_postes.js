const mongoose = require("mongoose");
const postes = require("./userPostes");

const public_pst = new mongoose.Schema({
  postes: [postes],
});

module.exports = mongoose.model("public_postes", public_pst);
