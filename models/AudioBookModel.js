const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const commentSchema = new mongoose.Schema({
  userId: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [],
});
const commentsSchema = new mongoose.Schema({
  userId: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [],
  response: [commentSchema],
});
const AudioBookSchema = new mongoose.Schema({
  audioTitle: {
    type: String,
    required: true,
  },
  audioDescription: {
    type: String,
    required: false,
  },
  audioImage: {
    type: String,
  },
  audioDate: {
    type: Date,
    default: Date.now(),
  },
  audioTag: [String],
  audioTotalSubscriptions: {
    type: Number,
    default: 0,
  },
  audioTotalViews: {
    type: Number,
    default: 0,
  },
  audiouploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  audioverify: { type: Boolean, default: false },
  audioblock: { type: Boolean, default: false },
  audioComments: [commentsSchema],
  audioEpsodes: [
    {
      title: String,
      description: String,
      streamUrl: String,
      likes: Number,
      epsodeImage: String,
      epsodeComments: [commentsSchema],
      addedon: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});
module.exports = mongoose.model("audio_books", AudioBookSchema);
