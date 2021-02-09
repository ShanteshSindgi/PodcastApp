const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const featureAreaSchema = new mongoose.Schema({
  featureName: {
    type: String,
    required: true,
  },
  featurePosition: {
    type: Number,
    default: 0,
  },
  featureAudios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "audio_books",
    },
  ],
});
module.exports = mongoose.model("featureArea", featureAreaSchema);
