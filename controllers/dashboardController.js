const user = require("../models/UserModel");
const audio = require("../models/AudioBookModel");

exports.getDashboard = async (req, res) => {
  Promise.all([
    user.count().exec(),
    audio.count({ ispodcast: false }).exec(),
    audio.count({ ispodcast: true }).exec(),
  ])
    .then((counts) => {
      console.log("user count %d", counts[0]);
      console.log("Audio Book count %d", counts[1]);
      console.log("Podcast count %d", counts[2]);
      res.status(200).json({
        message: "record fetch successfully",
        userCount: counts[0],
        audioBookCount: counts[1],
        PodcastCount: counts[2],
      });
    })
    .then((err) => {
      console.log("err", err);
      res.status(204).json({
        message: "error",
      });
    });
};
