const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const singup = require("./routes/userSingup");
const login = require("./routes/userLogin");
const uploads = require("./routes/handle_postes");
const handleInfoUser = require("./routes/userHandelInfo");
require("dotenv").config();
// connect Mongodb
const URI = "mongodb://localhost:27017/hashtag";
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE_URL || URI)
  .then(() => console.log("Database connected."))
  .catch((err) => {
    console.log("Database Not Connected.");
  });

app.use(bodyParser.json());
app.use("/api", singup);
app.use("/api", login);
app.use("/uploads", uploads);
app.use("/api", handleInfoUser);
// this medelware for searching files // """ For Test  """
app.use((req, res, next) => {
  var imagepath = path.join(__dirname, req.url || "none");
  fs.stat(imagepath, (err, info) => {
    if (err) {
      next();
      return;
    }
    if (info.isFile()) {
      res.sendFile(imagepath);
    } else {
      next();
    }
  });
});

app.get("/uploads", (req, res) => {
  res.end();
});

app.listen(process.env.PORT | 8080, () => {
  console.log("Server connected.");
});
