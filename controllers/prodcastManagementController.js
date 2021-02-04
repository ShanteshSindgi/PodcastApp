const podcastmodel = require("../model/podcastmodel");
exports.getpodcastbyusers = (req, res) => {
  const userID = req.query.userID;
  podcastmodel.find({ PodcastHost: userID }, function (err, data) {
    console.log(userID);
    if (err) {
      console.error("prodcastManagement", err);
      res.json({ status: "Failed" });
    } else {
      res.json({ status: "success", Data: data });
    }
  });
};
exports.getpodcast = (req, res) => {
  podcastmodel.find(function (err, data) {
    if (err) {
      console.error("prodcastManagement", err);
      res.json({ status: "Failed" });
    } else {
      res.json({ status: "success", Data: data });
    }
  });
};
