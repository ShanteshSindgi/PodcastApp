const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.get("/getuserplaylist/:userId", playlistController.getuserplaylist);
router.post("/createplaylist", playlistController.createPlaylist);
router.post("/addmediatoplaylist", playlistController.addmediatoplaylist);
router.delete(
  "/removesongfromplaylist/:userId",
  playlistController.removesongfromplaylist
);
module.exports = router;
