const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userLikes: [],
  subscriptionTaken: [
    {
      subscriptionid: {
        type: String,
        default: "NA",
      },
      subscriptionPurchasedDate: {
        type: Date,
      },
    },
  ],
  playLists: [
    {
      playlistName: {
        type: String,
      },
      playlistSongs: [
        {
          audioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "audio_books",
          },
          episodeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "audio_books",
          },
        },
      ],
    },
  ],
});
module.exports = mongoose.model("Users", UserSchema);
UserSchema.plugin(uniqueValidator);
