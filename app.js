const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
var multer = require("multer");
var upload = multer();
app.use(
  bodyparser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(express.static(__dirname));

const userroute = require("./routes/users");
const notificationroute = require("./routes/notifications");
const tagroute = require("./routes/tags");
const audiobookroute = require("./routes/audiobooks");

const port = process.env.PORT;
const cookieSession = require("cookie-session");
const passport = require("passport");

//require('./../Nodemon.json').config();
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//Routes
app.use("/users", userroute);
app.use("/notifications", notificationroute);
app.use("/tags", tagroute);
app.use("/audiobooks", audiobookroute);
app.use("/", (req, res) => {
  res.json("WELCOME TO SERVER");
});

// console.log(process.env.S)
// console.log(process.env.MONGO_CONNECTION);
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
console.log("port", process.env.PORT);
app.listen(port, () => {
  console.log("running");
});
