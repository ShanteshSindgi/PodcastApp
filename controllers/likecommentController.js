import audioBook from "../models/AudioBookModel";
exports.getUserlikesAndComments = async (req, res) => {
  const userId = req.body.userID;
  audioBook.find({});
};
