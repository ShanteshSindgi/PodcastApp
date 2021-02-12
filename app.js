const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
const multer = require("multer");
const upload = multer();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(bodyparser.urlencoded());
app.use(
  bodyparser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(express.static(__dirname));

const options = {
  definition: {
    info: {
      title: "Podcast Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "Shantesh Sindgi",
        url: "",
        email: "sindgishantesh@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3200/",
      },
    ],
  },
  apis: [
    "./routes/users.js",
    "./routes/notifications.js",
    "./routes/tags.js",
    "./routes/subscription.js",
    "./routes/category.js",
    "./routes/paymentDetails.js",
    "./routes/likecomment.js",
    "./routes/featureArea.js",
    "./routes/playlist.js",
  ],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
console.log(specs);
const audiobookroute = require("./routes/audiobooks");
const userroute = require("./routes/users");
const notificationroute = require("./routes/notifications");
const tagroute = require("./routes/tags");
const subscriptionroute = require("./routes/subscription");
const categoryroute = require("./routes/category");
const paymentroute = require("./routes/paymentDetails");
const likecomment = require("./routes/likecomment");
const featureArea = require("./routes/featureArea");
const playlist = require("./routes/playlist");
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
app.use("/subscriptions", subscriptionroute);
app.use("/categories", categoryroute);
app.use("/payments", paymentroute);
app.use("/likecomment", likecomment);
app.use("/featureArea", featureArea);
app.use("/playlist", playlist);
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
