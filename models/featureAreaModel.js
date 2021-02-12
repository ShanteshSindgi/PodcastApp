const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
var uniqueValidator = require("mongoose-unique-validator");

const featureAreaSchema = new mongoose.Schema({
  featureName: {
    type: String,
    required: true,
  },
  featurePosition: {
    type: Number,
    unique:true,
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
featureAreaSchema.plugin(uniqueValidator);

