const express = require("express");
const router = express.Router();
const likecommentController = require("./../controllers/likecommentController");

router.get("/userLikes/:userID", likecommentController.getUserlikesAndComments);
router.get("/userComment/:userID", likecommentController.getUserComments);
module.exports = router;
