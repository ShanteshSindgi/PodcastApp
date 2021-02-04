const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const podcast = new Schema({
  _id: Schema.Types.ObjectId,
  PodcastHost: Schema.Types.String,
  PodcastUrl: Schema.Types.String,
  Description: Schema.Types.String,
  ShowID: Schema.Types.String,
});
module.exports = mongoose.model("podcast", podcast, "podcast");
