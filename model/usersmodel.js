const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  _id: Schema.Types.ObjectId,
  Username: Schema.Types.String,
  Fan: Schema.Types.Number,
  Following: Schema.Types.Number,
  About: Schema.Types.String,
});

module.exports = usersmodel = mongoose.model("users", users, "users");
