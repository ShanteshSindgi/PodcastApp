const audioBook = require("../models/AudioBookModel");
const user = require("../models/UserModel");
exports.getUserlikesAndComments = async (req, res) => {
  const userId = req.params.userID;
  if (!userId) {
    res.status(204).json({
      message: "Invalid params",
    });
  } else {
    user
      .find({ _id: userId }, "username email")
      .populate("userLikes", "audioTitle audioDescription", audioBook)
      .then((data) => {
        res.status(200).json({
          message: "User Likes",
          data: data,
        });
      })
      .catch((err) => {
        res.status(203).json({
          message: "error",
          data: [],
        });
      });
  }
};
exports.getUserComments = async (req, res) => {
  const userId = req.params.userID;
  if (!userId) {
    res.status(204).json({
      message: "Invalid params",
    });
  } else {
    audioBook
      .find(
        {
          $or: [
            { "audioComments._id": userId },
            { "audioComments.response.userId": userId },
          ],
        },
        "audioTitle audioDescription audioComments"
      )
      .then((data) => {
        res.status(200).json({
          message: "User Comment",
          data: data,
        });
      })
      .catch((err) => {
        res.status(203).json({
          message: "error",
          data: [],
        });
      });
  }
};
