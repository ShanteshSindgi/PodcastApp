const user = require("../models/UserModel");
const audiobooks = require("../models/AudioBookModel");

exports.getuserplaylist = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId", userId);
  if (!userId) {
    res.status(404).json({
      message: "Invalid Params",
    });
  } else {
    user
      .findById(
        { _id: userId },
        { status: 0, date: 0, password: 0, subscriptionTaken: 0, userLikes: 0 }
      )
      .populate({
        path: "playLists.playlistSongs.audioId",
        model: audiobooks,
      })
      .then((data) => {
        if (data.length <= 0) {
          res.status(404).json({
            message: "No Data Available",
            data: data,
          });
        } else {
          const resultData = data.playLists.map((playlist) => {
            playlist.playlistSongs = playlist.playlistSongs.map((audio) => {
              audio.audioId.audioEpsodes = audio.audioId.audioEpsodes.filter(
                (episode) => {
                  console.log(String(episode._id), String(audio.episodeId));
                  return String(episode._id) === String(audio.episodeId);
                }
              );
              return audio;
            });
            return playlist;
          });
          res.status(200).json({
            message: "PlayList fetched successfully",
            data: resultData,
          });
        }
      });
  }
};
exports.createPlaylist = async (req, res) => {
  const userId = req.body.userId;
  const playlistName = req.body.playlistName;
  if (!userId || !playlistName) {
    res.status(404).json({
      message: "Invalid Params",
    });
  } else {
    user
      .findByIdAndUpdate(
        { _id: userId },
        { $push: { playLists: { playlistName: playlistName } } }
      )
      .then((success) => {
        res.status(200).json({
          message: "Playlist created successfully",
        });
      });
  }
};
exports.addmediatoplaylist = async (req, res) => {
  const playlistId = req.body.playlistId;
  const audioId = req.body.audioId;
  const episodeId = req.body.episodeId;
  const userId = req.body.userId;
  if (!playlistId || !audioId || !episodeId || !userId) {
    res.status(403).json({
      message: "invalid Params",
    });
  } else {
    user
      .findOneAndUpdate(
        { _id: userId, "playLists._id": playlistId },
        {
          $push: {
            "playLists.$[].playlistSongs": {
              audioId: audioId,
              episodeId: episodeId,
            },
          },
        }
      )
      .then((success) => {
        res.status(200).json({
          message: "audio added to playlist successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "something went wrong",
        });
      });
  }
};
exports.removesongfromplaylist = async (req, res) => {
  const playlistId = req.body.playlistId;
  const itemId = req.body.itemId;
  const userId = req.params.userId;
  console.log(playlistId);
  console.log(itemId);
  console.log(userId);
  if (!playlistId || !itemId || !userId) {
    res.status(403).json({
      message: "invalid Params",
    });
  } else {
    user
      .findOneAndUpdate(
        { _id: userId, "playLists._id": playlistId },
        {
          $pull: {
            "playLists.$[].playlistSongs": {
              _id: itemId,
            },
          },
        }
      )
      .then((success) => {
        res.status(200).json({
          message: "audio removed from playlist successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "something went wrong",
        });
      });
  }
};
